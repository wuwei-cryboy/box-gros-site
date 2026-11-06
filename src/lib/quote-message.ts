import { cities, t, unitGnf, type Product } from "@/data/catalog";
import type { Lang } from "@/lib/lang-store";
import { formatGnf } from "@/lib/money";

export type QuoteDraftLine = { product: Product; qty: number };

export function buildQuoteMessage(input: {
  lang: Lang;
  lines: QuoteDraftLine[];
  boutique: string;
  cityId: string;
  tel: string;
  note: string;
}): string {
  const { lang, lines, boutique, cityId, tel, note } = input;
  const city = cities.find((item) => item.id === cityId);
  const cityLabel = city ? t(lang, city.label) : cityId;
  const rows = lines.map((line) => {
    const unit = unitGnf(line.product, line.qty);
    const total = unit * line.qty;
    return `- ${line.product.name} (${line.product.sku}) × ${line.qty} — ${formatGnf(unit, lang)} — ${formatGnf(total, lang)}`;
  });
  const grand = lines.reduce((sum, line) => sum + unitGnf(line.product, line.qty) * line.qty, 0);
  const noteLine = note.trim();

  if (lang === "zh") {
    return [
      "你好，Box Gros，",
      "询价。",
      `店铺：${boutique.trim()}`,
      `城市：${cityLabel}`,
      `电话：${tel.trim()}`,
      "",
      "明细：",
      ...rows,
      "",
      `参考合计：${formatGnf(grand, lang)}`,
      noteLine ? "" : null,
      noteLine ? `备注：${noteLine}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");
  }

  return [
    "Bonjour Box Gros,",
    "Demande de devis.",
    `Boutique : ${boutique.trim()}`,
    `Ville : ${cityLabel}`,
    `Téléphone : ${tel.trim()}`,
    "",
    "Références :",
    ...rows,
    "",
    `Total indicatif : ${formatGnf(grand, lang)}`,
    noteLine ? "" : null,
    noteLine ? `Note : ${noteLine}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function waHref(message: string): string {
  return `https://wa.me/224622184055?text=${encodeURIComponent(message)}`;
}
