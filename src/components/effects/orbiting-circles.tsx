// Source : Atlas magic-ui/orbiting-circles (Magic UI, MIT — Copyright (c) Magic UI).
// Adapté : Tailwind v3 (taille en style inline), trajectoire aux couleurs des tokens.
import React from "react";

import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
          <circle
            className="stroke-foreground/25"
            strokeDasharray="2 5"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                width: iconSize,
                height: iconSize,
              } as React.CSSProperties
            }
            className={cn(
              "absolute flex transform-gpu animate-orbit items-center justify-center rounded-full",
              reverse && "[animation-direction:reverse]",
              className
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
