"use client";
// Source : Atlas magic-ui/animated-grid-pattern (Magic UI, MIT — Copyright (c) Magic UI).
// Adapté : couleurs par tokens (currentColor), respect de prefers-reduced-motion.

import { useCallback, useEffect, useId, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface AnimatedGridPatternProps extends ComponentPropsWithoutRef<"svg"> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

type Square = { id: number; pos: [number, number]; iteration: number };

/** Grille fine dont quelques cases s'allument et s'éteignent en boucle. */
export function AnimatedGridPattern({
  width = 36,
  height = 36,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 24,
  className,
  maxOpacity = 0.22,
  duration = 4,
  repeatDelay = 0.6,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const reduce = useReducedMotion();
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Array<Square>>([]);

  const getPos = useCallback((): [number, number] => {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }, [dimensions.height, dimensions.width, height, width]);

  const updateSquarePosition = useCallback(
    (squareId: number) => {
      setSquares((current) => {
        const sq = current[squareId];
        if (!sq || sq.id !== squareId) return current;
        const next = current.slice();
        next[squareId] = { ...sq, pos: getPos(), iteration: sq.iteration + 1 };
        return next;
      });
    },
    [getPos]
  );

  useEffect(() => {
    if (dimensions.width && dimensions.height && !reduce) {
      setSquares(Array.from({ length: numSquares }, (_, i) => ({ id: i, pos: getPos(), iteration: 0 })));
    }
  }, [dimensions.width, dimensions.height, getPos, numSquares, reduce]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions((d) =>
          d.width === entry.contentRect.width && d.height === entry.contentRect.height
            ? d
            : { width: entry.contentRect.width, height: entry.contentRect.height }
        );
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-foreground/[0.12] stroke-foreground/[0.14] text-primary dark:stroke-foreground/[0.11]",
        className
      )}
      {...props}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} stroke="none" />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [sx, sy], id: sid, iteration }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{ duration, repeat: 1, delay: index * 0.12, repeatType: "reverse", repeatDelay }}
            onAnimationComplete={() => updateSquarePosition(sid)}
            key={`${sid}-${iteration}`}
            width={width - 1}
            height={height - 1}
            x={sx * width + 1}
            y={sy * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}
