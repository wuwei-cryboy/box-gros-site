import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "@/data/catalog";

export type QuoteLine = { slug: string; qty: number };

type QuoteState = {
  lines: QuoteLine[];
  add: (slug: string, qty: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

export const useQuote = create<QuoteState>()(
  persist(
    (set) => ({
      lines: [],
      add: (slug, qty) => {
        const product = getProduct(slug);
        if (!product || !useQuote.persist.hasHydrated()) return;
        const next = Math.max(product.moq, Math.floor(qty));
        set((state) => {
          const exists = state.lines.some((line) => line.slug === slug);
          if (!exists) return { lines: [...state.lines, { slug, qty: next }] };
          return {
            lines: state.lines.map((line) => (line.slug === slug ? { ...line, qty: next } : line)),
          };
        });
      },
      setQty: (slug, qty) => {
        const product = getProduct(slug);
        if (!product || !useQuote.persist.hasHydrated()) return;
        const next = Math.floor(qty);
        if (next < product.moq) return;
        set((state) => ({
          lines: state.lines.map((line) => (line.slug === slug ? { ...line, qty: next } : line)),
        }));
      },
      remove: (slug) => {
        if (!useQuote.persist.hasHydrated()) return;
        set((state) => ({ lines: state.lines.filter((line) => line.slug !== slug) }));
      },
      clear: () => {
        if (!useQuote.persist.hasHydrated()) return;
        set({ lines: [] });
      },
    }),
    { name: "kaloum-gros-devis", skipHydration: true },
  ),
);
