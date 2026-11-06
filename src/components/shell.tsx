import { type ReactNode, useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { SHOWROOM, t, unitGnf } from "@/data/catalog";
import { ui } from "@/data/copy";
import { useHydratedLang, useStoresReady } from "@/lib/hydrate";
import { useLang } from "@/lib/lang-store";
import { formatGnf } from "@/lib/money";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/cn";
import { getProduct } from "@/data/catalog";

const homeSearch = { cat: "tous" as const, q: "", vue: "grille" as const };

export function Shell({ children }: { children: ReactNode }) {
  const lang = useHydratedLang();
  const setLang = useLang((state) => state.setLang);
  const copy = ui[lang];
  const ready = useStoresReady();
  const lines = useQuote((state) => state.lines);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const showDock = ready && lines.length > 0 && path !== "/devis";

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "fr";
    document.title = lang === "zh" ? "Kaloum Gros — 科纳克里批发" : "Kaloum Gros — Grossiste à Conakry";
  }, [lang]);

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
            <Link
              to="/devis"
              className="inline-flex h-11 items-center gap-2 px-2 text-sm"
            >
              <ClipboardList className="size-5" />
              <span className="hidden sm:inline">{copy.quote}</span>
              {ready && lines.length > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center bg-primary px-1 text-xs tabular-nums text-primary-fg">
                  {lines.length}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </header>
      <div className={cn("flex-1", showDock ? "pb-28" : "pb-8")}>{children}</div>
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
      {showDock ? (
        <div className="dock-pad fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm">
                {lines.length} {copy.refs}
              </p>
              <p className="font-display text-xl tabular-nums text-primary">{formatGnf(total, lang)}</p>
            </div>
            <Link
              to="/devis"
              className="inline-flex h-11 items-center bg-primary px-4 text-sm font-medium text-primary-fg"
            >
              {copy.seeQuote}
            </Link>
          </div>
        </div>
      ) : null}
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
