import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/outfit";
import { Toaster } from "sonner";
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
// 注意：并发 hydration 可能在 window load 之后才跑完 useEffect，
// 那时再监听 load 永远等不到，SW 就一直注册不上（安装提示也出不来）。
// 所以 load 已触发就直接注册，否则等 load 再注册。
function registerSW() {
  if (typeof window === 'undefined') return;
  if (!FEATURE_FLAGS.SW) return;
  if (!('serviceWorker' in navigator)) return;

  const register = () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // 静默失败，不影响主流程
    });
  };
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register);
}

// 离线横幅组件
function OfflineBanner() {
  // 初始 false 与服务端渲染一致，联网状态只在客户端挂载后读取，
  // 避免服务端（navigator.onLine 未定义）与客户端渲染不一致导致 hydration 报错
  const [offline, setOffline] = React.useState(false);
  React.useEffect(() => {
    setOffline(!navigator.onLine);
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
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icons/icon-180.png" },
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
          {/*
            尽早接住 beforeinstallprompt：Chrome 可能在 React hydration 完成前就
            发出安装事件，那时 InstallAppButton 还没挂上监听，事件就丢了。
            这段内联脚本在解析 HTML 时就执行，先把事件存在 window 上，
            组件挂载后再取用；同时 preventDefault 拦下浏览器自己的迷你安装条，
            改由站内按钮唤起安装。
          */}
          <script
            dangerouslySetInnerHTML={{
              __html:
                "window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__boxgrosInstallPrompt=e;});",
            }}
          />
        </head>
        <body>
          <OfflineBanner />
          <PreviewHostBridge />
          <AuthProvider>
            <Shell>
              <Outlet />
            </Shell>
          </AuthProvider>
          {/* 加购轻提示：放顶部，避免与底部购物车栏重叠 */}
          <Toaster
            position="top-center"
            duration={1800}
            toastOptions={{
              style: {
                background: "var(--color-surface)",
                color: "var(--color-fg)",
                border: "1px solid var(--color-line)",
                borderRadius: "2px",
                boxShadow: "0 4px 16px rgba(28, 22, 18, 0.12)",
              },
            }}
          />
          <DshVisualEditInspector />
          <Scripts />
        </body>
      </html>
    );
  },
});
