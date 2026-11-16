"use client";
// Source : Atlas magic-ui/border-beam (Magic UI, MIT — Copyright (c) Magic UI).
// Adapté : syntaxe Tailwind v3, masques en style inline, segment de couleur unie (sans dégradé).

import { motion, type MotionStyle, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  color?: string;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderWidth?: number;
}

/** Faisceau lumineux qui parcourt le contour du conteneur parent (relative + rounded). */
export const BorderBeam = ({
  className,
  size = 90,
  delay = 0,
  duration = 8,
  color = "hsl(var(--primary))",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}: BorderBeamProps) => {
  const mask = "linear-gradient(transparent, transparent), linear-gradient(#000, #000)";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent"
      style={{
        borderWidth,
        borderStyle: "solid",
        maskImage: mask,
        WebkitMaskImage: mask,
        maskClip: "padding-box, border-box",
        WebkitMaskClip: "padding-box, border-box",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <motion.div
        className={cn("absolute aspect-square rounded-full bg-[var(--beam-color)]", className)}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--beam-color": color,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{ repeat: Infinity, ease: "linear", duration, delay: -delay, ...transition }}
      />
    </div>
  );
};
