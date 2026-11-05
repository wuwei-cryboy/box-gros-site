import { cities, t, unitUsd, type Product } from "@/data/catalog";
import type { Lang } from "@/lib/lang-store";
import { formatGnfFromUsd, formatUsd, USD_TO_GNF } from "@/lib/money";

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
    const unit = unitUsd(line.product, line.qty);
    const total = unit * line.qty;
    return `- ${line.product.name} (${line.product.sku}) × ${line.qty} — ${formatUsd(unit, lang)} — ${formatUsd(total, lang)}`;
  });
  const grand = lines.reduce((sum, line) => sum + unitUsd(line.product, line.qty) * line.qty, 0);
  const noteLine = note.trim();

  if (lang === "zh") {
    return [
      "你好，Kaloum Gros，",
      "询价。",
      `店铺：${boutique.trim()}`,
      `城市：${cityLabel}`,
      `电话：${tel.trim()}`,
      "",
      "明细：",
      ...rows,
      "",
      `参考合计：${formatUsd(grand, lang)}`,
      `约 ${formatGnfFromUsd(grand, lang)}（展厅汇率 1 USD = ${USD_TO_GNF.toLocaleString("zh-CN")} GNF，不作结算承诺）。`,
      noteLine ? "" : null,
      noteLine ? `备注：${noteLine}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");
  }

  return [
    "Bonjour Kaloum Gros,",
    "Demande de devis.",
    `Boutique : ${boutique.trim()}`,
    `Ville : ${cityLabel}`,
    `Téléphone : ${tel.trim()}`,
    "",
    "Références :",
    ...rows,
    "",
    `Total indicatif : ${formatUsd(grand, lang)}`,
    `Soit environ ${formatGnfFromUsd(grand, lang)} (taux showroom 1 USD = ${USD_TO_GNF.toLocaleString("fr-FR")} GNF, non contractuel).`,
    noteLine ? "" : null,
    noteLine ? `Note : ${noteLine}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function waHref(message: string): string {
  return `https://wa.me/224622184055?text=${encodeURIComponent(message)}`;
}
