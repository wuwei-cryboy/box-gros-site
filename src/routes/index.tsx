import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products, t } from "@/data/catalog";
import { ui } from "@/data/copy";
import { useHydratedLang } from "@/lib/hydrate";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { CatalogBrowser, type CatFilter, type Vue } from "@/components/catalog-browser";

const CATS = ["tous", "telephones", "montres", "lunettes", "parfums"] as const;

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const cat = CATS.includes(search.cat as CatFilter) ? (search.cat as CatFilter) : "tous";
    const q = typeof search.q === "string" ? search.q : "";
    const vue: Vue = search.vue === "liste" ? "liste" : "grille";
    return { cat, q, vue };
  },
  component: Home,
});

function Home() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const lang = useHydratedLang();
  const copy = ui[lang];

  function setSearch(next: Partial<{ cat: CatFilter; q: string; vue: Vue }>) {
    void navigate({
      search: { ...search, ...next },
      resetScroll: false,
    });
  }

  function openCategory(cat: CatFilter) {
    setSearch({ cat });
    document.getElementById("catalogue")?.scrollIntoView({ block: "start" });
  }

  const stats = [
    { value: copy.statMoqValue, label: copy.statMoqLabel },
    { value: copy.statCityValue, label: copy.statCityLabel },
    { value: copy.statMinValue, label: copy.statMinLabel },
  ];

  const steps = [
    { n: "01", title: copy.step1t, body: copy.step1b },
    { n: "02", title: copy.step2t, body: copy.step2b },
    { n: "03", title: copy.step3t, body: copy.step3b },
  ];

  const terms = [copy.term1, copy.term2, copy.term3, copy.term4];

  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-end gap-8 px-4 pt-8 sm:pt-14 lg:grid-cols-2">
        <div>
          <p className={cn("flex items-center gap-3 text-xs text-muted", lang === "fr" && "tracking-widest uppercase")}>
            <span className="h-px w-8 bg-primary" />
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-none sm:text-6xl">{copy.heroTitle}</h1>
          <p className="mt-4 max-w-md text-base text-muted">{copy.heroLead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" onClick={() => openCategory("tous")}>
              {copy.ctaCatalog}
            </Button>
            <Button asChild variant="outline">
              <Link to="/devis">{copy.ctaQuote}</Link>
            </Button>
          </div>
          <dl className="mt-8 grid grid-cols-3 border-t border-line">
            {stats.map((stat) => (
              <div key={stat.label} className="py-4 pr-2">
                <dt className="font-display text-lg tabular-nums sm:text-2xl">{stat.value}</dt>
                <dd className="mt-1 text-xs text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure>
          <img src="/catalog/hero.jpg" alt={copy.heroAlt} className="aspect-video w-full object-cover" />
          <figcaption className="mt-2 text-xs text-muted">{copy.thisWeek}</figcaption>
        </figure>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="font-display text-3xl">{copy.familiesTitle}</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {categories.map((category) => {
            const count = products.filter((product) => product.category === category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => openCategory(category.id)}
                className="text-left"
              >
                <img
                  src={category.image}
                  alt={t(lang, category.label)}
                  className="aspect-square w-full object-cover"
                />
                <p className="mt-2 font-display text-xl">{t(lang, category.label)}</p>
                <p className="text-sm text-muted">
                  {count} {copy.countLabel}
                </p>
                <p className="text-sm text-muted">{t(lang, category.line)}</p>
              </button>
            );
          })}
        </div>
      </section>

      <CatalogBrowser cat={search.cat} q={search.q} vue={search.vue} onChange={setSearch} />

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">{copy.howTitle}</h2>
            <ol className="mt-6 grid gap-5">
              {steps.map((step) => (
                <li key={step.n} className="grid grid-cols-[3rem_1fr] gap-3 border-t border-line pt-4">
                  <span className="font-display text-lg text-primary">{step.n}</span>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="mt-1 text-sm text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-display text-3xl">{copy.zoneTitle}</h2>
            <div className="mt-6 border-t border-line pt-4">
              <p className="font-medium">{copy.zoneConakryT}</p>
              <p className="mt-1 text-sm text-muted">{copy.zoneConakryB}</p>
            </div>
            <div className="mt-4 border-t border-line pt-4">
              <p className="font-medium">{copy.zoneInteriorT}</p>
              <p className="mt-1 text-sm text-muted">{copy.zoneInteriorB}</p>
            </div>
            <h2 className="mt-10 font-display text-3xl">{copy.termsTitle}</h2>
            <ul className="mt-4 grid gap-3">
              {terms.map((term) => (
                <li key={term} className="border-t border-line pt-3 text-sm text-muted">
                  {term}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">{copy.mixNote}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
