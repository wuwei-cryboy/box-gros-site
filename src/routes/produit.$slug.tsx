import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { categoryById, getProduct, products, t, unitGnf } from "@/data/catalog";
import { ui } from "@/data/copy";
import { useHydratedLang, useStoresReady } from "@/lib/hydrate";
import { formatGnf } from "@/lib/money";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { CatalogPhoto } from "@/components/catalog-photo";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { notifyAdded } from "@/lib/add-feedback";

export const Route = createFileRoute("/produit/$slug")({
  head: ({ params }) => {
    const product = getProduct(params.slug);
    return {
      meta: [{ title: product ? `${product.name} — Kaloum Gros` : "Kaloum Gros" }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const lang = useHydratedLang();
  const copy = ui[lang];
  const ready = useStoresReady();
  const line = useQuote((state) => state.lines.find((item) => item.slug === slug));
  const add = useQuote((state) => state.add);
  const [qty, setQty] = useState(product?.moq ?? 1);
  const [text, setText] = useState(String(product?.moq ?? 1));
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return;
    const next = ready && line ? line.qty : product.moq;
    setQty(next);
    setText(String(next));
  }, [slug, ready, line?.qty, product, line]);

  useEffect(() => {
    if (!added) return;
    const id = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(id);
  }, [added]);

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <p>{copy.missing}</p>
        <Link to="/" search={{ cat: "tous", q: "", vue: "grille" }} className="mt-4 inline-flex h-11 items-center text-sm">
          {copy.back}
        </Link>
      </main>
    );
  }

  const category = categoryById(product.category);
  const unit = unitGnf(product, qty);
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug);

  function commit(next: number) {
    const clamped = Math.max(product!.moq, Math.floor(next));
    setQty(clamped);
    setText(String(clamped));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <Link
        to="/"
        search={{ cat: product.category, q: "", vue: "grille" }}
        className="inline-flex h-11 items-center text-sm text-muted"
      >
        {copy.back}
      </Link>
      <div className="mt-2 grid gap-8 lg:grid-cols-2">
        {product.gallery ? (
          <ProductGallery key={slug} src={product.image} gallery={product.gallery} alt={product.name} />
        ) : (
          <CatalogPhoto src={product.image} alt={product.name} eager />
        )}
        <div>
          <p className={cn("text-xs text-muted", lang === "fr" && "tracking-widest uppercase")}>
            {t(lang, category.label)} · {product.sku}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-none sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-muted">{t(lang, product.story)}</p>
          <p className="mt-4 text-sm">{t(lang, product.stockLabel)}</p>
          <p className="mt-6 font-display text-4xl tabular-nums text-primary">{formatGnf(unit, lang)}</p>
          <p className="mt-1 text-sm text-muted tabular-nums">
            {copy.about} {formatGnf(unit, lang)} {copy.perPiece}
          </p>

          <div className="mt-6 border border-line">
            <div className="grid grid-cols-2 px-3 py-2 text-xs text-muted">
              <span>{copy.qtyCol}</span>
              <span className="text-right">{copy.priceCol}</span>
            </div>
            {product.tiers.map((tier) => {
              const active = unit === tier.gnf;
              return (
                <div
                  key={tier.min}
                  className={cn(
                    "grid grid-cols-2 border-t border-line px-3 py-2 text-sm tabular-nums",
                    active && "bg-fg/5",
                  )}
                >
                  <span>
                    {tier.min}+ {copy.pieces}
                  </span>
                  <span className="text-right">{formatGnf(tier.gnf, lang)}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-line bg-surface">
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center"
                aria-label={copy.decrease}
                onClick={() => commit(qty - 1)}
              >
                <Minus className="size-4" />
              </button>
              <input
                inputMode="numeric"
                aria-label={copy.qty}
                value={text}
                onChange={(event) => setText(event.target.value.replace(/[^\d]/g, ""))}
                onBlur={() => commit(Number(text))}
                className="w-16 bg-transparent text-center text-base tabular-nums outline-none"
              />
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center"
                aria-label={copy.increase}
                onClick={() => commit(qty + 1)}
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              disabled={!ready}
              onClick={(event) => {
                add(product.slug, qty);
                setAdded(true);
                notifyAdded(event.currentTarget, copy.added);
              }}
            >
              {added ? copy.added : copy.addToQuote}
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted">
            {copy.moqShort} {product.moq} · {copy.cartonOf} {product.carton}
          </p>
          {product.note ? <p className="mt-3 text-sm text-muted">{t(lang, product.note)}</p> : null}

          <h2 className="mt-8 font-display text-2xl">{copy.specs}</h2>
          <dl className="mt-3">
            {product.specs.map((spec) => (
              <div key={spec.label.fr} className="grid grid-cols-2 gap-3 border-t border-line py-2 text-sm">
                <dt className="text-muted">{t(lang, spec.label)}</dt>
                <dd className="text-right">{t(lang, spec.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl">{copy.related}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} layout="row" />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
