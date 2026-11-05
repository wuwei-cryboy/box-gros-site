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
        <div className="flex h-11 border border-line">
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
                "h-11 shrink-0 border-b-2 px-3 text-sm",
                active ? "border-primary text-fg" : "border-transparent text-muted",
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
          value={q}
          onChange={(event) => onChange({ q: event.target.value })}
          placeholder={copy.searchPlaceholder}
          className="h-11 w-full border border-line bg-surface pr-3 pl-10 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      {visible.length === 0 ? (
        <p className="mt-8 text-muted">{copy.emptyCatalog}</p>
      ) : (
        <div
          className={cn(
            "mt-6 grid gap-3",
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
