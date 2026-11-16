"use client";

/**
 * Bascule clair / sombre en un clic, avec révélation circulaire partant du bouton.
 * Adapté de Atlas magic-ui/animated-theme-toggler (Magic UI, MIT — Copyright (c) Magic UI) :
 * variante cercle uniquement, pilotée par next-themes, icônes sans écart d'hydratation,
 * respect de prefers-reduced-motion.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const DURATION = 650;

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  const animRef = useRef<Animation | null>(null);
  // Le thème n'est connu qu'au client : le libellé n'en dépend qu'après montage (pas d'écart d'hydratation).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    return () => {
      animRef.current?.cancel();
      const root = document.documentElement;
      delete root.dataset.themeVt;
      root.style.removeProperty("--theme-vt-duration");
      root.style.removeProperty("--theme-vt-clip-from");
    };
  }, []);

  const toggle = useCallback(() => {
    const button = buttonRef.current;
    const root = document.documentElement;
    if (!button || busyRef.current) return;

    const nextTheme = root.classList.contains("dark") ? "light" : "dark";
    const apply = () => {
      // Bascule synchrone de la classe : la View Transition capture le nouveau thème.
      root.classList.toggle("dark", nextTheme === "dark");
      root.style.colorScheme = nextTheme;
      setTheme(nextTheme);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition !== "function" || reduceMotion) {
      apply();
      return;
    }

    // Coordonnées en pourcentage de la boîte de référence (robuste aux échelles d'affichage fractionnaires).
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));
    const at = `${(x / vw) * 100}% ${(y / vh) * 100}%`;
    const radius = `${(maxRadius / (Math.hypot(vw, vh) / Math.SQRT2)) * 100}%`;
    const clipPath = [`circle(0% at ${at})`, `circle(${radius} at ${at})`];

    busyRef.current = true;
    root.dataset.themeVt = "active";
    root.style.setProperty("--theme-vt-duration", `${DURATION}ms`);
    root.style.setProperty("--theme-vt-clip-from", clipPath[0]);

    const cleanup = () => {
      busyRef.current = false;
      delete root.dataset.themeVt;
      root.style.removeProperty("--theme-vt-duration");
      root.style.removeProperty("--theme-vt-clip-from");
      animRef.current?.cancel();
      animRef.current = null;
    };

    const transition = document.startViewTransition(() => {
      flushSync(apply);
    });
    transition.finished.finally(cleanup).catch(() => {});
    transition.ready
      .then(() => {
        animRef.current = root.animate(
          { clipPath },
          {
            duration: DURATION,
            easing: "cubic-bezier(0.65, 0, 0.35, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {});
  }, [setTheme]);

  const isDark = mounted && resolvedTheme === "dark";
  const label = !mounted ? "Changer de thème" : isDark ? "Passer en mode clair" : "Passer en mode sombre";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {/* Les deux icônes sont rendues ; la classe .dark choisit (aucun écart d'hydratation). */}
      <Sun
        className="h-4 w-4 rotate-0 scale-100 transition-transform duration-500 ease-out-quint dark:-rotate-90 dark:scale-0"
        aria-hidden
      />
      <Moon
        className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-500 ease-out-quint dark:rotate-0 dark:scale-100"
        aria-hidden
      />
    </button>
  );
}
