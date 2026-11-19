"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/** `true` quand l'utilisateur demande à réduire les animations (faux côté serveur). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}

/** `true` tant que l'élément est (presque) visible : sert à suspendre les animations hors écran. */
export function useInViewport(ref: RefObject<Element | null>, rootMargin = "120px"): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
