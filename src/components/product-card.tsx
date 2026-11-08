import { Link } from "@tanstack/react-router";
import { categoryById, t, unitGnf, type Product } from "@/data/catalog";
import { ui } from "@/data/copy";
import { useHydratedLang, useStoresReady } from "@/lib/hydrate";
import { formatGnf } from "@/lib/money";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/cn";
import { srcSetFor } from "@/lib/img";
import { notifyAdded } from "@/lib/add-feedback";
import { Button } from "@/components/ui/button";
import { CatalogPhoto } from "@/components/catalog-photo";
import { useState, useCallback, useRef } from "react";

export function ProductCard({ product, layout }: { product: Product; layout: "tile" | "row" }) {
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

  const handleAdd = useCallback(
    (sourceEl: HTMLElement | null) => {
      if (adding || !ready) return;
      setAdding(true);
      // 乐观 UI：先更新本地状态，再同步到 store
      if (!line) {
        add(product.slug, product.moq);
      } else {
        add(product.slug, line.qty + product.carton);
      }
      // 加购反馈：商品图飞向购物车栏 + 轻提示
      notifyAdded(sourceEl, copy.added);
      // 防抖：300ms 后恢复按钮状态
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => setAdding(false), 300);
    },
    [line, add, product, ready, adding, copy.added],
  );

  return (
    <article
      className={cn(
        "pressable overflow-hidden rounded-2xl bg-surface shadow-card",
        row ? "flex gap-3 p-4" : "flex flex-col",
      )}
    >
      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className={cn("block shrink-0", row ? "w-24" : "")}
      >
        {row ? (
          <img
            src={product.image}
            srcSet={srcSetFor(product.image)}
            sizes="96px"
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full rounded-xl object-cover"
          />
        ) : (
          <CatalogPhoto src={product.image} alt={product.name} sizes="(max-width: 1024px) 50vw, 400px" />
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
        <p
          className={cn(
            "mt-3 font-display font-semibold tabular-nums text-primary",
            // 平铺卡片内容区只有约 139px：7 位 GNF 价格用 3xl 会把数字截断，
            // 所以平铺保持 2xl（只加粗）；行布局够宽，用 3xl 放大
            row ? "text-3xl" : "text-2xl",
          )}
        >
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
            onClick={(event) => handleAdd(event.currentTarget)}
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
