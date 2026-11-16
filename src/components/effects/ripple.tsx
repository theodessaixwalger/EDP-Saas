// Source : Atlas magic-ui/ripple (Magic UI, MIT — Copyright (c) Magic UI).
// Adapté : Tailwind v3 (masque inline), couleurs par tokens, cercles plus discrets.
import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

/** Ondes concentriques qui respirent autour d'un point focal. */
export const Ripple = React.memo(function Ripple({
  mainCircleSize = 120,
  mainCircleOpacity = 0.18,
  numCircles = 6,
  className,
  style,
  ...props
}: RippleProps) {
  const mask = "radial-gradient(circle at center, #000 0%, transparent 70%)";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 select-none overflow-hidden", className)}
      style={{ maskImage: mask, WebkitMaskImage: mask, ...style }}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 64;
        return (
          <div
            key={i}
            className="absolute animate-ripple rounded-full border bg-primary/[0.09]"
            style={
              {
                "--i": i,
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.max(mainCircleOpacity - i * 0.025, 0.03) * 4,
                animationDelay: `${i * 0.06}s`,
                borderColor: `hsl(var(--foreground) / ${Math.max(0.28 - i * 0.04, 0.08)})`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
