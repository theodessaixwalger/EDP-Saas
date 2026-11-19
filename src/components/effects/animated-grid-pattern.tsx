"use client";
// Source : Atlas magic-ui/animated-grid-pattern (Magic UI, MIT — Copyright (c) Magic UI).
// Adapté : couleurs par tokens (currentColor), respect de prefers-reduced-motion,
// animation CSS native (aucune bibliothèque) suspendue hors écran.
// Les cases sont des <div> (et non des <rect> SVG) : leur animation d'opacité est alors prise
// en charge par le compositeur (GPU), sans recalcul de style ni repeinture à chaque image.

import { useCallback, useEffect, useId, useRef, useState, type ComponentPropsWithoutRef } from "react";

import { useInViewport, usePrefersReducedMotion } from "@/lib/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

export interface AnimatedGridPatternProps extends ComponentPropsWithoutRef<"div"> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
}

type Square = { id: number; pos: [number, number]; iteration: number };

/**
 * Grille fine dont quelques cases s'allument et s'éteignent en boucle.
 * Cycle d'une case (keyframes `lb-grid-square`, globals.css) : apparition 4 s,
 * pause 0,6 s, extinction 4 s, puis la case change de position.
 */
export function AnimatedGridPattern({
  width = 36,
  height = 36,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 24,
  className,
  maxOpacity = 0.22,
  style,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const reduce = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInViewport(containerRef);
  const active = inView && !reduce;
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
    if (!active) {
      setSquares((current) => (current.length ? [] : current));
      return;
    }
    if (dimensions.width && dimensions.height) {
      setSquares(Array.from({ length: numSquares }, (_, i) => ({ id: i, pos: getPos(), iteration: 0 })));
    }
  }, [active, dimensions.width, dimensions.height, getPos, numSquares]);

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
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-hidden fill-foreground/[0.12] stroke-foreground/[0.14] text-primary dark:stroke-foreground/[0.11]",
        className
      )}
      style={{ ...style, "--grid-max-opacity": maxOpacity } as React.CSSProperties}
      {...props}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
            <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} stroke="none" />
      </svg>
      {squares.map(({ pos: [sx, sy], id: sid, iteration }, index) => (
        <div
          key={`${sid}-${iteration}`}
          className="absolute animate-grid-square bg-current opacity-0"
          style={{
            left: sx * width + 1 + x,
            top: sy * height + 1 + y,
            width: width - 1,
            height: height - 1,
            animationDelay: `${index * 0.12}s`,
          }}
          onAnimationEnd={() => updateSquarePosition(sid)}
        />
      ))}
    </div>
  );
}
