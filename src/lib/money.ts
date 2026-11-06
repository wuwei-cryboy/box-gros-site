import type { Lang } from "@/lib/lang-store";

export const MIN_ORDER_GNF = 4_415_000;

export function formatGnf(value: number, lang: Lang): string {
  const locale = lang === "zh" ? "zh-CN" : "fr-FR";
  return `${Math.round(value).toLocaleString(locale)} GNF`;
}
