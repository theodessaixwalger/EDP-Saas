"use client";
// Source : Atlas magic-ui/magic-card (Magic UI, MIT — Copyright (c) Magic UI).
// Adapté : Tailwind v3, tokens LocalBoost, halo monochrome (aucune couleur).
// Sans bibliothèque d'animation : la position du pointeur est écrite dans des variables CSS
// (aucun re-rendu React, aucun JS chargé en plus).

import React, { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  /** Halo intérieur qui suit le pointeur. */
  gradientColor?: string;
  gradientOpacity?: number;
  /** Bordure éclairée qui suit le pointeur. */
  borderColor?: string;
}

export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientColor = "hsl(var(--foreground) / 0.035)",
  gradientOpacity = 1,
  borderColor = "hsl(var(--foreground) / 0.28)",
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const offscreen = `${-gradientSize}px`;

  const setPointer = useCallback((x: string, y: string) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", x);
    el.style.setProperty("--my", y);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setPointer(`${e.clientX - rect.left}px`, `${e.clientY - rect.top}px`);
    },
    [setPointer]
  );

  const reset = useCallback(() => setPointer(offscreen, offscreen), [setPointer, offscreen]);

  const spot = `${gradientSize}px circle at var(--mx) var(--my)`;

  return (
    <div
      ref={ref}
      className={cn("group relative isolate overflow-hidden border border-transparent", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={
        {
          "--mx": offscreen,
          "--my": offscreen,
          background: `linear-gradient(hsl(var(--card)) 0 0) padding-box, radial-gradient(${spot}, ${borderColor}, hsl(var(--border)) 100%) border-box`,
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-px -z-10 rounded-[inherit] bg-card" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-px -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(${spot}, ${gradientColor}, transparent 100%)`, opacity: gradientOpacity }}
      />
      {children}
    </div>
  );
}
