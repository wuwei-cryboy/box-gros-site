import { Link } from "@tanstack/react-router";
import { categoryById, t, unitGnf, type Product } from "@/data/catalog";
import { ui } from "@/data/copy";
import { useHydratedLang, useStoresReady } from "@/lib/hydrate";
import { formatGnf } from "@/lib/money";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { CatalogPhoto } from "@/components/catalog-photo";
import { useState, useCallback, useRef } from "react";

export function ProductCard({ product, layout, onMouseEnter }: { product: Product; layout: "tile" | "row"; onMouseEnter?: () => void }) {
  const lang = useHydratedLang();
  const copy = ui[lang];
  const ready = useStoresReady();
  const line = useQuote((state) => state.lines.find((item) => item.slug === product.slug));
  const add = useQuote((state) => state.add);
  const category = categoryById(product.category);
  const price = unitGnf(product, product.moq);
  const row = layout === "row";
  const [adding, setAdding] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAdd = useCallback(() => {
    if (adding || !ready) return;
    setAdding(true);
    // 乐观 UI：先更新本地状态，再同步到 store
    if (!line) {
      add(product.slug, product.moq);
    } else {
      add(product.slug, line.qty + product.carton);
    }
    // 防抖：300ms 后恢复按钮状态
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setAdding(false), 300);
  }, [line, add, product, ready, adding]);

  return (
    <article
      className={cn(
        "border border-line bg-surface",
        row ? "flex gap-3 p-3" : "flex flex-col",
      )}
      onMouseEnter={onMouseEnter}
    >
      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className={cn("block shrink-0", row ? "w-24" : "")}
      >
        {row ? (
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        ) : (
          <CatalogPhoto src={product.image} alt={product.name} />
        )}
      </Link>
      <div className={cn("flex min-w-0 flex-1 flex-col", row ? "" : "gap-1 p-4")}>
        <p className={cn("text-xs text-muted", lang === "fr" && "tracking-widest uppercase")}>
          {t(lang, category.label)}
        </p>
        <Link to="/produit/$slug" params={{ slug: product.slug }} className="mt-1">
          <h3 className="font-display text-xl leading-tight">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-muted">{t(lang, product.blurb)}</p>
        <p className="mt-3 font-display text-2xl tabular-nums text-primary">
          <span className="mr-2 text-sm text-muted">{copy.from}</span>
          {formatGnf(price, lang)}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="text-xs text-muted tabular-nums">
            {copy.moqShort} {product.moq}
            {line ? ` · × ${line.qty}` : ""}
          </p>
          <Button
            variant={line ? "outline" : "primary"}
            disabled={!ready || adding}
            onClick={handleAdd}
          >
            {adding ? (
              <span className="flex items-center gap-1">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                <span>{copy.adding ?? (lang === "zh" ? "添加中..." : "Ajout...")}</span>
              </span>
            ) : line ? copy.addMore : copy.add}
          </Button>
        </div>
      </div>
    </article>
  );
}
