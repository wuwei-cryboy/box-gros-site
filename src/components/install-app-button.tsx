import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Download } from "lucide-react";
import { ui } from "@/data/copy";
import { useHydratedLang } from "@/lib/hydrate";

/** Chrome / Edge 在可安装时触发的事件：先拦下来，由站内按钮主动唤起安装。 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    appinstalled: Event;
  }
  interface Window {
    /** __root.tsx 的内联脚本先接住的安装事件（见该处注释）。 */
    __boxgrosInstallPrompt?: BeforeInstallPromptEvent;
  }
}

/** 是否已在独立应用模式打开（桌面图标点进来的）。 */
function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  return (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

/** iPhone / iPad：Safari 没有安装提示，只能走分享菜单手动添加。 */
function isIos(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return true;
  return /Macintosh/.test(ua) && window.navigator.maxTouchPoints > 1;
}

const buttonClass =
  "pressable inline-flex h-11 items-center gap-1.5 px-2 text-xs text-muted hover:text-fg";

/**
 * 站内“安装到桌面”入口，放在顶栏。
 * - 安卓 / 桌面 Chrome：收到 beforeinstallprompt 后显示按钮，点一下唤起系统安装。
 * - iPhone / iPad：显示按钮，点开三步指引（分享 → 添加到主屏幕 → 添加）。
 * - 已安装、或浏览器不支持安装时不显示。
 * 客户端挂载后才读 navigator / matchMedia，避免与服务端渲染不一致。
 */
export function InstallAppButton() {
  const lang = useHydratedLang();
  const copy = ui[lang];
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [iosOpen, setIosOpen] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (isStandalone()) {
      setInstalled(true);
      return;
    }
    setIos(isIos());
    // 内联脚本可能已经先接住了安装事件（hydration 晚于事件时）。
    if (window.__boxgrosInstallPrompt) setDeferred(window.__boxgrosInstallPrompt);
    const onBeforeInstall = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      window.__boxgrosInstallPrompt = e;
      setDeferred(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
      window.__boxgrosInstallPrompt = undefined;
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  // iOS Safari：没有安装提示，点开三步指引。
  if (!deferred && ios) {
    const steps = [copy.installIosStep1, copy.installIosStep2, copy.installIosStep3];
    return (
      <Dialog.Root open={iosOpen} onOpenChange={setIosOpen}>
        <Dialog.Trigger asChild>
          <button type="button" className={buttonClass} aria-label={copy.installApp} title={copy.installApp}>
            <Download className="size-4" />
            <span className="hidden sm:inline">{copy.installApp}</span>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-surface p-5 shadow-card outline-none">
            <Dialog.Title className="font-display text-lg leading-snug">{copy.installTitle}</Dialog.Title>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-fg">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <Dialog.Close asChild>
              <button
                type="button"
                className="pressable mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-fg"
              >
                {copy.installClose}
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  if (!deferred) return null;

  const onInstall = async () => {
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") {
      setDeferred(null);
      window.__boxgrosInstallPrompt = undefined;
    }
  };

  return (
    <button type="button" onClick={onInstall} className={buttonClass} aria-label={copy.installApp} title={copy.installApp}>
      <Download className="size-4" />
      <span className="hidden sm:inline">{copy.installApp}</span>
    </button>
  );
}
