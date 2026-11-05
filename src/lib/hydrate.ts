import { useEffect, useState } from "react";
import { useLang, type Lang } from "@/lib/lang-store";
import { useQuote } from "@/lib/quote-store";

let pending: Promise<void> | null = null;

function hydrateStores() {
  if (typeof window === "undefined") return Promise.resolve();
  if (!pending) {
    pending = Promise.all([useLang.persist.rehydrate(), useQuote.persist.rehydrate()]).then(
      () => undefined,
    );
  }
  return pending;
}

export function useStoresReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let on = true;
    void hydrateStores().then(() => {
      if (on) setReady(true);
    });
    return () => {
      on = false;
    };
  }, []);
  return ready;
}

export function useHydratedLang(): Lang {
  const lang = useLang((state) => state.lang);
  const ready = useStoresReady();
  return ready ? lang : "fr";
}
