import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "fr" | "zh";

type LangState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const useLang = create<LangState>()(
  persist(
    (set) => ({
      lang: "fr",
      setLang: (lang) => set({ lang }),
    }),
    { name: "kaloum-gros-lang", skipHydration: true },
  ),
);
