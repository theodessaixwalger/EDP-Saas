"use client";
// Source : Atlas magic-ui/border-beam (Magic UI, MIT — Copyright (c) Magic UI).
// Adapté : syntaxe Tailwind v3, masques en style inline, segment de couleur unie (sans dégradé).
// Animation : figée si prefers-reduced-motion, suspendue hors écran.
//
// Performance : `offset-distance` n'est pas animable par le compositeur (recalcul et repeinture
// à chaque image sur le thread principal). Le même trajet — rectangle arrondi `rect(0 auto auto 0
// round <size>px)`, sens horaire depuis la fin de l'arrondi haut-gauche — est donc échantillonné
// en images clés `transform` (Web Animations API), exécutées sur le GPU. Au premier rendu, la
// position de départ est donnée par `offset-path` statique, sans animation.

import { useEffect, useRef } from "react";
import { useInViewport, usePrefersReducedMotion } from "@/lib/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderWidth?: number;
}

/** Pas d'échantillonnage du contour (px) : écart à la courbe réelle < 0,02 px. */
const SAMPLE_STEP_PX = 3;

/** Point du contour (coordonnées de la boîte de bordure) à la distance `d` du départ. */
function pointOnRoundedRect(width: number, height: number, radius: number, d: number): [number, number] {
  const r = radius;
  const top = width - 2 * r;
  const side = height - 2 * r;
  const arc = (Math.PI * r) / 2;
  const segments: Array<[number, (t: number) => [number, number]]> = [
    [top, (t) => [r + t, 0]],
    [arc, (t) => corner(width - r, r, -Math.PI / 2, t)],
    [side, (t) => [width, r + t]],
    [arc, (t) => corner(width - r, height - r, 0, t)],
    [top, (t) => [width - r - t, height]],
    [arc, (t) => corner(r, height - r, Math.PI / 2, t)],
    [side, (t) => [0, height - r - t]],
    [arc, (t) => corner(r, r, Math.PI, t)],
  ];
  function corner(cx: number, cy: number, start: number, t: number): [number, number] {
    const angle = start + (r > 0 ? t / r : 0);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  }
  let rest = d;
  for (const [length, at] of segments) {
    if (rest <= length) return at(rest);
    rest -= length;
  }
  return [r, 0];
}

function beamKeyframes(width: number, height: number, size: number, border: number, fromPct: number, toPct: number) {
  // Arrondis réduits proportionnellement s'ils dépassent la boîte (règle CSS des border-radius).
  const radius = size * Math.min(1, width / (2 * size), height / (2 * size));
  const perimeter = 2 * (width - 2 * radius) + 2 * (height - 2 * radius) + 2 * Math.PI * radius;
  const span = Math.abs(toPct - fromPct) / 100;
  const steps = Math.max(8, Math.ceil((perimeter * span) / SAMPLE_STEP_PX));
  const frames: Keyframe[] = [];
  for (let i = 0; i <= steps; i++) {
    const pct = fromPct + ((toPct - fromPct) * i) / steps;
    const d = ((((pct % 100) + 100) % 100) / 100) * perimeter;
    const [x, y] = pointOnRoundedRect(width, height, radius, d);
    // Le faisceau est positionné depuis le coin de la boîte de remplissage ; on centre le disque sur le tracé.
    frames.push({ transform: `translate(${(x - border - size / 2).toFixed(2)}px, ${(y - border - size / 2).toFixed(2)}px)` });
  }
  return frames;
}

/** Faisceau lumineux qui parcourt le contour du conteneur parent (relative + rounded). */
export const BorderBeam = ({
  className,
  size = 90,
  delay = 0,
  duration = 8,
  color = "hsl(var(--primary))",
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}: BorderBeamProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const inView = useInViewport(ref);
  const inViewRef = useRef(inView);
  const reduce = usePrefersReducedMotion();
  const mask = "linear-gradient(transparent, transparent), linear-gradient(#000, #000)";
  const fromPct = reverse ? 100 - initialOffset : initialOffset;
  const toPct = reverse ? -initialOffset : 100 + initialOffset;

  useEffect(() => {
    const host = ref.current;
    const beam = beamRef.current;
    if (!host || !beam || reduce || typeof beam.animate !== "function") return;

    let measured = { width: 0, height: 0 };
    const build = () => {
      const width = host.offsetWidth;
      const height = host.offsetHeight;
      if (!width || !height || (width === measured.width && height === measured.height)) return;
      measured = { width, height };
      const previous = animationRef.current;
      const time = previous ? Number(previous.currentTime ?? 0) : delay * 1000;
      previous?.cancel();
      beam.style.offsetPath = "none";
      const animation = beam.animate(beamKeyframes(width, height, size, borderWidth, fromPct, toPct), {
        duration: duration * 1000,
        iterations: Infinity,
        easing: "linear",
      });
      animation.currentTime = time;
      if (!inViewRef.current) animation.pause();
      animationRef.current = animation;
    };

    const observer = new ResizeObserver(build);
    observer.observe(host);
    return () => {
      observer.disconnect();
      animationRef.current?.cancel();
      animationRef.current = null;
      beam.style.offsetPath = `rect(0 auto auto 0 round ${size}px)`;
    };
  }, [reduce, size, borderWidth, duration, delay, fromPct, toPct]);

  useEffect(() => {
    inViewRef.current = inView;
    const animation = animationRef.current;
    if (!animation) return;
    if (inView) animation.play();
    else animation.pause();
  }, [inView]);

  return (
    <div
      ref={ref}
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
      <div
        ref={beamRef}
        className={cn("absolute aspect-square rounded-full bg-[var(--beam-color)] will-change-transform", className)}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            offsetDistance: `${initialOffset}%`,
            "--beam-color": color,
            ...style,
          } as React.CSSProperties
        }
      />
    </div>
  );
};
