import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { categories, products, t, type CategoryId } from "@/data/catalog";
import { ui } from "@/data/copy";
import { useHydratedLang } from "@/lib/hydrate";
import { cn } from "@/lib/cn";
import { ProductCard } from "@/components/product-card";

export type CatFilter = "tous" | CategoryId;
export type Vue = "grille" | "liste";

export function CatalogBrowser({
  cat,
  q,
  vue,
  onChange,
}: {
  cat: CatFilter;
  q: string;
  vue: Vue;
  onChange: (next: Partial<{ cat: CatFilter; q: string; vue: Vue }>) => void;
}) {
  const lang = useHydratedLang();
  const copy = ui[lang];
  // 搜索框本地态：输入立即回显，只把同步到 URL 的 onChange 防抖 250ms，
  // 避免每敲一个字就推一条历史记录并全量重渲染
  const [localQ, setLocalQ] = useState(q);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setLocalQ(q);
  }, [q]);
  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );
  function handleSearchInput(value: string) {
    setLocalQ(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange({ q: value }), 250);
  }
  const query = q.trim().toLowerCase();
  const visible = products.filter((product) => {
    if (cat !== "tous" && product.category !== cat) return false;
    if (!query) return true;
    const category = categories.find((item) => item.id === product.category);
    const hay = [
      product.name,
      product.sku,
      product.blurb.fr,
      product.blurb.zh,
      category ? category.label.fr : "",
      category ? category.label.zh : "",
    ]
      .join(" ")
      .toLowerCase();
    return query.split(/\s+/).every((word) => hay.includes(word));
  });

  const filters: { id: CatFilter; label: string }[] = [
    { id: "tous", label: copy.filterAll },
    ...categories.map((item) => ({ id: item.id, label: t(lang, item.label) })),
  ];

  return (
    <section id="catalogue" className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl">{copy.catalogTitle}</h2>
        <div className="flex h-11 overflow-hidden rounded-full border border-line">
          <button
            type="button"
            className={cn("px-3 text-sm", vue === "grille" ? "bg-fg text-bg" : "text-muted")}
            onClick={() => onChange({ vue: "grille" })}
          >
            {copy.viewGrid}
          </button>
          <button
            type="button"
            className={cn("px-3 text-sm", vue === "liste" ? "bg-fg text-bg" : "text-muted")}
            onClick={() => onChange({ vue: "liste" })}
          >
            {copy.viewList}
          </button>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto scroll-clean">
        {filters.map((filter) => {
          const active = filter.id === cat;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChange({ cat: filter.id })}
              className={cn(
                "h-11 shrink-0 rounded-full border px-4 text-sm",
                active ? "border-primary bg-primary text-primary-fg" : "border-line bg-surface text-muted",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-4">
        <label htmlFor="catalog-q" className="sr-only">
          {copy.searchLabel}
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
        <input
          id="catalog-q"
          value={localQ}
          onChange={(event) => handleSearchInput(event.target.value)}
          placeholder={copy.searchPlaceholder}
          className="h-11 w-full rounded-full border border-line bg-surface pr-3 pl-10 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      {visible.length === 0 ? (
        <p key={cat} className="animate-fade-up mt-8 text-muted">{copy.emptyCatalog}</p>
      ) : (
        <div
          key={cat}
          className={cn(
            "grid-fade mt-6 grid gap-4",
            vue === "grille" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
          )}
        >
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} layout={vue === "liste" ? "row" : "tile"} />
          ))}
        </div>
      )}
    </section>
  );
}
