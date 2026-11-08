import { useMemo, useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { cities, getProduct, t, unitGnf } from "@/data/catalog";
import { ui } from "@/data/copy";
import { useHydratedLang, useStoresReady } from "@/lib/hydrate";
import { formatGnf, MIN_ORDER_GNF } from "@/lib/money";
import { buildQuoteMessage, waHref } from "@/lib/quote-message";
import { useQuote } from "@/lib/quote-store";
import { Button } from "@/components/ui/button";
import { QuoteFormSkeleton } from "@/components/skeletons";
import { srcSetFor } from "@/lib/img";
import { useConfirmClear } from "@/components/shell";
import { enqueueSubmission, flushQueue, initOfflineQueue, getQueueLength } from "@/lib/offline-queue";

export const Route = createFileRoute("/devis")({
  component: DevisPage,
});

function DevisPage() {
  const lang = useHydratedLang();
  const copy = ui[lang];
  const ready = useStoresReady();
  const lines = useQuote((state) => state.lines);
  const setQty = useQuote((state) => state.setQty);
  const remove = useQuote((state) => state.remove);
  const clear = useQuote((state) => state.clear);
  const { armed, setArmed } = useConfirmClear();

  const [boutique, setBoutique] = useState("");
  const [cityId, setCityId] = useState(cities[0]?.id ?? "kaloum");
  const [tel, setTel] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [sig, setSig] = useState("");
  const [copied, setCopied] = useState(false);
  const [queueLen, setQueueLen] = useState(0);

  // 初始化离线队列 + 定时刷新队列长度
  useEffect(() => {
    initOfflineQueue();
    const timer = setInterval(() => getQueueLength().then(setQueueLen), 5000);
    getQueueLength().then(setQueueLen);
    return () => clearInterval(timer);
  }, []);

  const resolved = useMemo(
    () =>
      lines.flatMap((line) => {
        const product = getProduct(line.slug);
        if (!product) return [];
        const unit = unitGnf(product, line.qty);
        return [{ ...line, product, unit, total: unit * line.qty }];
      }),
    [lines],
  );

  const grand = resolved.reduce((sum, line) => sum + line.total, 0);
  const signature = JSON.stringify({
    lines: resolved.map((line) => [line.slug, line.qty]),
    boutique,
    cityId,
    tel,
    note,
    lang,
  });
  const stale = message.length > 0 && sig !== signature;

  function prepare() {
    if (!boutique.trim() || !tel.trim()) {
      setError(copy.required);
      return;
    }
    if (tel.replace(/\D/g, "").length < 8) {
      setError(copy.badPhone);
      return;
    }
    setError("");
    const linesPayload = resolved.map((line) => ({ product: line.product, qty: line.qty }));
    const next = buildQuoteMessage({
      lang,
      lines: linesPayload,
      boutique,
      cityId,
      tel,
      note,
    });
    setMessage(next);
    setSig(signature);
    setCopied(false);

    // 离线队列：入队 + 尝试即时刷单
    const payload = { lang, lines: linesPayload, boutique, cityId, tel, note };
    enqueueSubmission(payload).then(() => {
      getQueueLength().then(setQueueLen);
      if (navigator.onLine) flushQueue().then(() => getQueueLength().then(setQueueLen));
    });
  }

  if (!ready) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <QuoteFormSkeleton />
      </main>
    );
  }

  if (resolved.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-4xl">{copy.quoteTitle}</h1>
        <p className="mt-3 text-muted">{copy.emptyQuote}</p>
        <Button asChild className="mt-6">
          <Link to="/" search={{ cat: "tous", q: "", vue: "grille" }}>
            {copy.emptyQuoteCta}
          </Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-4xl">{copy.quoteTitle}</h1>
      <p className="mt-3 text-muted">{copy.quoteLead}</p>

      <ul className="mt-8 grid gap-3">
        {resolved.map((line) => (
          <li key={line.slug} className="grid grid-cols-[4.5rem_1fr] gap-3 border border-line bg-surface p-3">
            <img
              src={line.product.image}
              srcSet={srcSetFor(line.product.image)}
              sizes="72px"
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xl leading-tight">{line.product.name}</p>
                  <p className="text-xs text-muted">{line.product.sku}</p>
                </div>
                <button type="button" className="h-11 text-sm text-muted" onClick={() => remove(line.slug)}>
                  {copy.remove}
                </button>
              </div>
              <p className="mt-1 text-sm tabular-nums text-muted">
                {formatGnf(line.unit, lang)} {copy.perPiece}
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center border border-line">
                  <button
                    type="button"
                    className="inline-flex size-11 items-center justify-center"
                    aria-label={copy.decrease}
                    onClick={() => {
                      if (line.qty - 1 < line.product.moq) remove(line.slug);
                      else setQty(line.slug, line.qty - 1);
                    }}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-12 text-center text-base tabular-nums">{line.qty}</span>
                  <button
                    type="button"
                    className="inline-flex size-11 items-center justify-center"
                    aria-label={copy.increase}
                    onClick={() => setQty(line.slug, line.qty + 1)}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <p className="font-display text-xl tabular-nums">{formatGnf(line.total, lang)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between gap-3 border-t border-line pt-4">
        <div>
          <p className="text-sm text-muted">{copy.subtotal}</p>
          <p className="font-display text-3xl tabular-nums text-primary">{formatGnf(grand, lang)}</p>
          <p className="text-sm text-muted tabular-nums">
            {copy.about} {formatGnf(grand, lang)}
          </p>
        </div>
        <button
          type="button"
          className="h-11 text-sm text-muted"
          onClick={() => {
            if (!armed) {
              setArmed(true);
              return;
            }
            clear();
            setArmed(false);
            setMessage("");
          }}
        >
          {armed ? copy.confirmClear : copy.clear}
        </button>
      </div>
      {grand < MIN_ORDER_GNF ? <p className="mt-3 text-sm text-primary">{copy.underMin}</p> : null}
      <p className="mt-2 text-sm text-muted">{copy.mixNote}</p>
      {queueLen > 0 && (
        <p className="mt-2 text-sm text-muted flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-muted" />
          离线队列：{queueLen} 条待发送
        </p>
      )}

      <form
        className="mt-8 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          prepare();
        }}
      >
        <label className="grid gap-1 text-sm">
          {copy.boutique}
          <input
            value={boutique}
            onChange={(event) => setBoutique(event.target.value)}
            required
            className="h-11 border border-line bg-surface px-3 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </label>
        <label className="grid gap-1 text-sm">
          {copy.city}
          <select
            value={cityId}
            onChange={(event) => setCityId(event.target.value)}
            className="h-11 border border-line bg-surface px-3 text-base outline-none"
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {t(lang, city.label)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          {copy.phone}
          <input
            value={tel}
            onChange={(event) => setTel(event.target.value)}
            inputMode="tel"
            autoComplete="tel"
            required
            className="h-11 border border-line bg-surface px-3 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </label>
        <label className="grid gap-1 text-sm">
          {copy.note}
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder={copy.notePlaceholder}
            rows={3}
            className="border border-line bg-surface px-3 py-2 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </label>
        {error ? <p className="text-sm text-primary">{error}</p> : null}
        <Button type="submit">{copy.prepare}</Button>
      </form>

      {message ? (
        <div className="mt-6">
          <p className="text-sm">{copy.preview}</p>
          {stale ? <p className="mt-2 text-sm text-primary">{copy.stale}</p> : null}
          <textarea readOnly value={message} rows={10} className="mt-2 w-full border border-line bg-surface p-3 text-sm" />
          <div className="mt-3 flex flex-wrap gap-3">
            <Button asChild>
              <a href={waHref(message)} target="_blank" rel="noreferrer">
                {copy.sendWa}
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                void navigator.clipboard.writeText(message).then(() => setCopied(true));
              }}
            >
              {copied ? copy.copied : copy.copyMsg}
            </Button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
