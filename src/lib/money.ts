import type { Lang } from "@/lib/lang-store";

export const USD_TO_GNF = 8830;
export const MIN_ORDER_USD = 500;

export function formatUsd(value: number, lang: Lang): string {
  const rounded = Math.round(value * 100) / 100;
  const cents = Math.round(rounded * 100) % 100 !== 0;
  const formatted = new Intl.NumberFormat(lang === "zh" ? "zh-CN" : "fr-FR", {
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(rounded);
  return `${formatted} USD`;
}

export function formatGnfFromUsd(usd: number, lang: Lang): string {
  const n = Math.round(usd * USD_TO_GNF);
  return `${n.toLocaleString(lang === "zh" ? "zh-CN" : "fr-FR")} GNF`;
}
