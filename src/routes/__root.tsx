import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/outfit";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Shell } from "@/components/shell";
import { initNetworkFeatures, FEATURE_FLAGS } from "@/lib/network";
import appCss from "../styles.css?url";

// Dev-only: dsh-visual-edit inspector bridge. No-op in production builds.
const isDev = import.meta.env.DEV;
const DshVisualEditInspector = () =>
  isDev ? (
    <script
      src="/@dsh-visual-edit/inspector.js"
      data-origins={JSON.stringify(["http://127.0.0.1:43129"])}
    />
  ) : null;

// Service Worker 注册（仅生产 + FEATURE_FLAGS.SW 开启）
function registerSW() {
  if (typeof window === 'undefined') return;
  if (!FEATURE_FLAGS.SW) return;
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // 静默失败，不影响主流程
    });
  });
}

// 离线横幅组件
function OfflineBanner() {
  const [offline, setOffline] = React.useState(!navigator.onLine);
  React.useEffect(() => {
    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);
  if (!offline) return null;
  return <div className="offline-banner" role="status">离线模式，显示缓存数据</div>;
}

// 引入 React（用于 OfflineBanner hooks）
import React from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Box Gros — Grossiste à Conakry" },
      {
        name: "description",
        content:
          "Grossiste à Conakry : téléphones, montres, lunettes et parfums. Prix carton, seuil clair, livraison en Guinée.",
      },
      { name: "theme-color", content: "#f3eee6" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => {
    // 客户端侧效应：注册 SW + 初始化网络特性
    React.useEffect(() => {
      registerSW();
      initNetworkFeatures();
    }, []);

    return (
      <html lang="fr" suppressHydrationWarning>
        <head>
          <HeadContent />
        </head>
        <body>
          <OfflineBanner />
          <PreviewHostBridge />
          <AuthProvider>
            <Shell>
              <Outlet />
            </Shell>
          </AuthProvider>
          <DshVisualEditInspector />
          <Scripts />
        </body>
      </html>
    );
  },
});
