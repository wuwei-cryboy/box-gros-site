#!/usr/bin/env node
/**
 * 静态站预渲染：起已构建好的 Nitro node-server（.output/server），
 * 逐个请求路由，把 SSR 出来的 HTML 写进 .output/public。
 *
 * 为什么不用 Nitro 自带的 prerender 配置：Nitro 3 的预渲染器会用 rolldown
 * 单独再打一份服务端，而平台中间件 server/middleware/grok-pwa.ts 用了
 * Vite 专属写法（?raw、virtual:grok-og-identity、?url），rolldown 打不动
 *（实测报错 Could not load scripts/install-page.html?raw）。这里直接用
 * Vite 打好的服务端渲染，结果和线上 SSR 完全一致，还保留了中间件注入
 * 的品牌脚本与 OG 头信息。做法与 TanStack Start 自带预渲染的思路相同
 *（起已构建的服务，逐页抓取），只是这个版本（1.168.60）的插件里没有
 * prerender 选项，所以用脚本实现。
 *
 * 用法：npm run build 的一部分（见 package.json），也可以单独跑：
 *   node scripts/prerender-static.mjs
 * 任意一页抓取失败即非零退出，构建跟着失败。
 */
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SERVER_ENTRY = join(ROOT, ".output", "server", "index.mjs");
const PUBLIC_DIR = join(ROOT, ".output", "public");
const CATALOG = join(ROOT, "src", "data", "catalog.ts");
const PORT = Number(process.env.PRERENDER_PORT || 8123);
const BASE = `http://127.0.0.1:${PORT}`;
const READY_TIMEOUT_MS = 30_000;

// 商品 slug 直接从 catalog 取（正则提取），避免手写一份会漂移的清单。
function productSlugs() {
  const text = readFileSync(CATALOG, "utf8");
  const slugs = [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (slugs.length === 0) {
    throw new Error(`[prerender] no product slugs found in ${CATALOG}`);
  }
  return slugs;
}

function outPath(route) {
  const rel = route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`;
  return join(PUBLIC_DIR, rel);
}

async function waitReady() {
  const start = Date.now();
  while (Date.now() - start < READY_TIMEOUT_MS) {
    try {
      const res = await fetch(`${BASE}/`, { headers: { Accept: "text/html" } });
      if (res.ok) return;
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`[prerender] server did not become ready on ${BASE} within ${READY_TIMEOUT_MS}ms`);
}

async function main() {
  const routes = ["/", "/devis", ...productSlugs().map((s) => `/produit/${s}`)];
  console.log(`[prerender] ${routes.length} routes (${routes.length - 2} products)`);

  const server = spawn(process.execPath, [SERVER_ENTRY], {
    env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1", NITRO_PORT: String(PORT), NITRO_HOST: "127.0.0.1" },
    stdio: "ignore",
  });

  try {
    await waitReady();
    for (const route of routes) {
      const res = await fetch(`${BASE}${route}`, {
        headers: { Accept: "text/html,application/xhtml+xml" },
      });
      if (!res.ok) {
        throw new Error(`[prerender] ${route} -> HTTP ${res.status}`);
      }
      const html = await res.text();
      if (!html.includes("<html")) {
        throw new Error(`[prerender] ${route} -> response is not HTML`);
      }
      const dest = outPath(route);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, html);
      console.log(`[prerender] ${route} -> ${dest} (${(html.length / 1024).toFixed(1)} KiB)`);
    }
    console.log(`[prerender] done: ${routes.length} pages written to ${PUBLIC_DIR}`);
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
