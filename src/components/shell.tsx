import { type ReactNode, useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardList, Wifi, WifiOff } from "lucide-react";
import { SHOWROOM, t, unitGnf } from "@/data/catalog";
import { ui } from "@/data/copy";
import { useHydratedLang, useStoresReady } from "@/lib/hydrate";
import { useLang } from "@/lib/lang-store";
import { formatGnf } from "@/lib/money";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/cn";
import { getProduct } from "@/data/catalog";
import { getDataSaver, setDataSaver } from "@/lib/network";
import { InstallAppButton } from "@/components/install-app-button";

const homeSearch = { cat: "tous" as const, q: "", vue: "grille" as const };

export function Shell({ children }: { children: ReactNode }) {
  const lang = useHydratedLang();
  const setLang = useLang((state) => state.setLang);
  const copy = ui[lang];
  const ready = useStoresReady();
  const lines = useQuote((state) => state.lines);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const showDock = ready && lines.length > 0 && path !== "/devis";
  const [dataSaver, setDataSaverState] = useState(getDataSaver());

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "fr";
    document.title = lang === "zh" ? "Box Gros — 科纳克里批发" : "Box Gros — Grossiste à Conakry";
  }, [lang]);

  // 监听跨标签同步
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'box-gros:data-saver') {
        setDataSaverState(e.newValue === '1');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleDataSaver = () => {
    const next = !dataSaver;
    setDataSaverState(next);
    setDataSaver(next);
  };

  const total = lines.reduce((sum, line) => {
    const product = getProduct(line.slug);
    if (!product) return sum;
    return sum + unitGnf(product, line.qty) * line.qty;
  }, 0);

  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur">
        <div className="h-1 bg-primary" />
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" search={homeSearch} className="flex items-baseline gap-2">
            <span className="font-display text-xl leading-none">Box</span>
            <span className={cn("text-xs text-muted", lang === "fr" && "tracking-widest")}>GROS</span>
          </Link>
          <div className="flex items-center gap-1">
            <div className="flex h-11 items-center text-sm">
              <button
                type="button"
                className={cn("px-2", lang === "fr" ? "font-medium text-fg" : "text-muted")}
                onClick={() => setLang("fr")}
              >
                FR
              </button>
              <span className="text-muted">/</span>
              <button
                type="button"
                className={cn("px-2", lang === "zh" ? "font-medium text-fg" : "text-muted")}
                onClick={() => setLang("zh")}
              >
                中文
              </button>
            </div>
            {/* 省流模式开关 */}
            <button
              type="button"
              onClick={toggleDataSaver}
              className={cn(
                "inline-flex h-11 items-center gap-1.5 px-2 text-xs",
                dataSaver ? "text-primary" : "text-muted hover:text-fg"
              )}
              aria-label={dataSaver ? copy.dataSaverOn : copy.dataSaverOff}
              title={dataSaver ? copy.dataSaverOn : copy.dataSaverOff}
            >
              {dataSaver ? <WifiOff className="size-4" /> : <Wifi className="size-4" />}
              <span className="hidden sm:inline">{dataSaver ? copy.dataSaverOn : copy.dataSaverOff}</span>
            </button>
            {/* 安装到桌面：安卓唤起系统安装，iPhone 弹出分享菜单三步指引；不支持时不显示 */}
            <InstallAppButton />
            <Link
              to="/devis"
              id="quote-header-link"
              className="pressable inline-flex h-11 items-center gap-2 px-2 text-sm"
            >
              <ClipboardList className="size-5" />
              <span className="hidden sm:inline">{copy.quote}</span>
              {ready && lines.length > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs tabular-nums text-primary-fg">
                  {lines.length}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </header>
      <div className={cn("flex-1 transition-[padding-bottom] duration-300 ease-out", showDock ? "pb-28" : "pb-8")}>{children}</div>
      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl">Box Gros</p>
            <p className="mt-2 text-sm text-muted">{copy.address}</p>
            <p className="mt-1 text-sm text-muted">{copy.hours}</p>
            <a href={`tel:${SHOWROOM.tel}`} className="mt-3 inline-flex h-11 items-center text-sm">
              {SHOWROOM.telDisplay}
            </a>
          </div>
          <div className="text-sm text-muted">
            <p>{copy.pay1}</p>
            <p className="mt-2">{copy.pay2}</p>
            <p className="mt-2">{copy.pay3}</p>
          </div>
          <div className="text-sm text-muted">
            <p>{copy.footerNote}</p>
            <p className="mt-3">{copy.rateNote}</p>
          </div>
        </div>
      </footer>
      {/* 购物车栏常驻挂载：隐藏时滑出屏幕外，出现/消失都有 300ms 滑入滑出过渡；
          内容区 padding 变化也同步过渡，避免首次加购时内容突然上跳约 80px。
          视觉改版：悬浮圆角托盘（左右留边、底部留边、四角圆角 + 柔和阴影），
          滑入动画与 padding 过渡保持不变 */}
      <div
        aria-hidden={!showDock}
        className={cn(
          "dock-pad fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-line bg-surface/95 shadow-card backdrop-blur transition-transform duration-300 ease-out",
          showDock ? "translate-y-0" : "pointer-events-none translate-y-full",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-sm">
              {lines.length} {copy.refs}
            </p>
            <p className="font-display text-xl tabular-nums text-primary">{formatGnf(total, lang)}</p>
          </div>
          <Link
            to="/devis"
            id="quote-dock-cta"
            tabIndex={showDock ? undefined : -1}
            className="pressable inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg"
          >
            {copy.seeQuote}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function useConfirmClear() {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const id = window.setTimeout(() => setArmed(false), 2500);
    return () => window.clearTimeout(id);
  }, [armed]);
  return { armed, setArmed };
}
