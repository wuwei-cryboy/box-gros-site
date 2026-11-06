import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { VitePWA } from "vite-plugin-pwa";
// ponytail: dev-only visual-edit bridge; dynamic import so prod builds (without the dep) still load.
let visualEditFn: ((o: { allowedOrigins: string[] }) => Plugin) | undefined;
try {
  const mod = await import("dsh-visual-edit/vite");
  visualEditFn = mod.visualEdit;
} catch { /* not installed in prod */ }
// TanStack Start SSR HTML bypasses vite's index.html pipeline, so the bridge's
// transformIndexHtml tag never lands in the SSR response. Inject the inspector
// manually; native DSH mode ignores this and uses its own in-memory injection.
function visualEditSsrPlugin(): Plugin {
  return {
    name: "dsh-visual-edit-ssr",
    apply: "serve",
    enforce: "post",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0] ?? "";
        const isHtml = url === "/" || url.endsWith(".html") || (req.headers.accept ?? "").includes("text/html");
        if (isHtml) {
          let buf = "";
          const origWrite = res.write.bind(res);
          const origEnd = res.end.bind(res);
          res.write = (chunk: any, ...rest: any[]) => {
            try {
              if (typeof chunk === "string") buf += chunk;
            } catch {
              /* ignore */
            }
            return origWrite(chunk, ...rest);
          };
          res.end = (chunk: any, ...rest: any[]) => {
            try {
              if (typeof chunk === "string") buf += chunk;
              if (buf.includes("</body>")) {
                // inject just before </body>
              }
            } catch {
              /* ignore */
            }
            return origEnd(chunk, ...rest);
          };
          // post-process: the HTML is streamed, so we can't retrofit mid-stream.
          // Instead, intercept the streamed bytes by wrapping the stream itself.
        }
        next();
      });
    },
  };
}
// @ts-expect-error JS plugin alongside the TS vite config
import { grokPwaPlugin } from "./scripts/grok-pwa-plugin.mjs";
// @ts-expect-error JS plugin alongside the TS vite config
import { appEnvPlugin } from "./scripts/app-env-plugin.mjs";
import { isMigrationFile } from "./scripts/migration-plan.mjs";

/** The files `src/lib/db.ts` globs — same directory, same non-recursive scope. */
function hasGlobbedMigrations(root: string): boolean {
  try {
    return readdirSync(join(root, "migrations")).some(isMigrationFile);
  } catch {
    return false;
  }
}

/**
 * Finish PGLite bootstrap during dev-server setup (before traffic). Vite awaits
 * async `configureServer` hooks. Production: `src/lib/db` kicks `ensureDbReady`
 * on import.
 *
 * Vite awaiting the hook puts this on time-to-first-render, so an app with no
 * migrations — no schema to apply — skips it entirely rather than paying for a
 * PGLite instance it never queries.
 */
function pgliteBootstrapPlugin(): Plugin {
  return {
    name: "app-builder:pglite-bootstrap",
    apply: "serve",
    async configureServer(server) {
      if (!hasGlobbedMigrations(server.config.root)) return;
      try {
        const mod = (await server.ssrLoadModule("/src/lib/db.ts")) as {
          ensureDbReady?: () => Promise<void>;
        };
        if (typeof mod.ensureDbReady === "function") {
          await mod.ensureDbReady();
        }
      } catch (err) {
        console.error("[app-builder] DB bootstrap failed:", err);
        throw err;
      }
    },
  };
}

/**
 * Live-preview OAuth popup — handled HERE so the agent never has to create a
 * `/auth/popup` route (and cannot break it by scaffolding a React page that
 * paints the full app shell in the popup).
 *
 * `signIn` (client.ts) opens `/auth/popup?providerId=…` in a top-level window.
 * This middleware runs before TanStack Start, calls `handleAuthPopupRequest`,
 * and returns the 302 / completion HTML. Deployed apps do not use the popup
 * (full-page OAuth redirect), so `apply: "serve"` is enough.
 */
function authPopupPlugin(): Plugin {
  return {
    name: "app-builder:auth-popup",
    apply: "serve",
    configureServer(server) {
      // Register immediately (not in a returned post-hook) so we run BEFORE
      // TanStack Start / the SPA HTML fallback. A model-authored
      // `src/routes/auth/popup.tsx` React page must never win this path.
      server.middlewares.use(async (req, res, next) => {
        try {
          const rawUrl = req.url ?? "";
          const pathOnly = rawUrl.split("?", 1)[0] ?? "";
          if (pathOnly !== "/auth/popup") {
            next();
            return;
          }
          if ((req.method ?? "GET").toUpperCase() !== "GET") {
            res.statusCode = 405;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("Method Not Allowed");
            return;
          }

          const host = String(
            req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost:8080",
          );
          const proto = String(
            req.headers["x-forwarded-proto"] ??
              ((req.socket as { encrypted?: boolean } | undefined)?.encrypted ? "https" : "http"),
          );
          const requestHeaders = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              for (const v of value) requestHeaders.append(key, v);
            } else {
              requestHeaders.set(key, value);
            }
          }
          // Ensure Host is the public preview host so Better Auth's dynamic
          // baseURL / redirect_uri match the popup origin.
          if (!requestHeaders.has("host")) requestHeaders.set("host", host);

          const request = new Request(`${proto}://${host}${rawUrl}`, {
            method: "GET",
            headers: requestHeaders,
          });

          const mod = (await server.ssrLoadModule("/src/lib/auth/popup.server.ts")) as {
            handleAuthPopupRequest: (req: Request) => Promise<Response>;
          };
          const response = await mod.handleAuthPopupRequest(request);

          res.statusCode = response.status;
          // Preserve multiple Set-Cookie headers (OAuth state + session).
          const setCookies =
            typeof response.headers.getSetCookie === "function"
              ? response.headers.getSetCookie()
              : [];
          response.headers.forEach((value, key) => {
            if (key.toLowerCase() === "set-cookie") return;
            res.setHeader(key, value);
          });
          for (const cookie of setCookies) {
            res.appendHeader("set-cookie", cookie);
          }
          const body = Buffer.from(await response.arrayBuffer());
          res.end(body);
        } catch (err) {
          console.error("[app-builder] /auth/popup handler failed:", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("auth popup failed");
          }
        }
      });
    },
  };
}

// `0.0.0.0:8080` is the live-preview contract — don't change host/port.
// The dev server starts once `src/router.tsx` and `src/routes/` exist — see
// AGENTS.md § "First scaffold".
export default defineConfig(({ command, isPreview }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    pgliteBootstrapPlugin(),
    // Before tanstackStart so /auth/popup never falls through to the SPA.
    authPopupPlugin(),
    // Dev-only /__app-env, read by scripts/check-auth-invariant.mjs.
    appEnvPlugin(),
    // PWA head + ?install=1 tutorial page; runs before Start/Nitro.
    grokPwaPlugin(),
    tailwindcss(),
    tanstackStart(),
    // Service Worker (生产构建时注入，开发模式不生成)
    ...(command === "build" || isPreview
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'catalog/hero.jpg'],
            manifest: {
              name: 'Box Gros',
              short_name: 'Box Gros',
              description: 'Grossiste à Conakry : téléphones, montres, lunettes et parfums. Prix carton, seuil clair, livraison en Guinée.',
              theme_color: '#f3eee6',
              background_color: '#f3eee6',
              display: 'standalone',
              scope: '/',
              start_url: '/',
              icons: [
                { src: '/__grok/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
                { src: '/__grok/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
              ],
            },
            workbox: {
              // 预缓存：HTML、CSS、JS、关键图片
              globPatterns: ['**/*.{html,js,css,svg,png,jpg,webp,woff2}'],
              // 运行时缓存策略
              runtimeCaching: [
                {
                  // 产品详情页 API / 页面
                  urlPattern: /^https?.*\/produit\/.*/,
                  handler: 'StaleWhileRevalidate',
                  options: { cacheName: 'produit-pages', expiration: { maxEntries: 50, maxAgeSeconds: 86400 } },
                },
                {
                  // 图片资源
                  urlPattern: /^https?.*\/catalog\/.*\.(png|jpg|jpeg|webp|svg)$/,
                  handler: 'CacheFirst',
                  options: { cacheName: 'catalog-images', expiration: { maxEntries: 200, maxAgeSeconds: 604800 } },
                },
                {
                  // Google Fonts
                  urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
                  handler: 'StaleWhileRevalidate',
                  options: { cacheName: 'google-fonts-styles', expiration: { maxEntries: 10, maxAgeSeconds: 604800 } },
                },
                {
                  urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
                  handler: 'CacheFirst',
                  options: { cacheName: 'google-fonts-webfonts', expiration: { maxEntries: 30, maxAgeSeconds: 31536000 } },
                },
              ],
              // 不缓存 HTML（始终网络优先，避免部署后用户看旧版）
              navigateFallbackDenylist: [/^\/$/],
            },
          }),
        ]
      : []),
    // dsh-visual-edit dev bridge; dev-mode only, so production builds are untouched.
    ...(command === "build" || isPreview ? [] : visualEditFn ? [visualEditFn({ allowedOrigins: ["http://127.0.0.1:43129"] }), visualEditSsrPlugin()] : []),
    ...(command === "build" || isPreview
      ? [
          nitro({
            preset: "vercel",
            serverDir: "./server",
          }),
        ]
      : []),
    viteReact(),
  ],
}));
