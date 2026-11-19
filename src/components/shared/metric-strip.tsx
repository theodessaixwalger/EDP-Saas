import * as React from "react";
import { MagicCard } from "@/components/effects/magic-card";
import { cn } from "@/lib/utils";

export type MetricTone = "neutral" | "primary" | "success" | "warning" | "destructive" | "info";

export interface Metric {
  label: string;
  /** Toujours issue d'une donnée réelle ; « — » quand la source n'existe pas encore. */
  value: string;
  hint?: string;
  tone?: MetricTone;
}

const toneDot: Record<MetricTone, string> = {
  neutral: "bg-muted-foreground/40",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  info: "bg-chart-2",
};

const columnsClass = {
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 lg:grid-cols-5 max-lg:[&>*:last-child:nth-child(odd)]:col-span-2",
  6: "grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
} as const;

/** Indicateurs : cartes à halo qui suit le pointeur (Magic Card). */
export function MetricStrip({ metrics, className }: { metrics: Metric[]; className?: string }) {
  const cols = columnsClass[metrics.length as keyof typeof columnsClass] ?? columnsClass[4];
  return (
    <div className={cn("grid gap-3", cols, className)}>
      {metrics.map((m) => (
        <MagicCard key={m.label} className="rounded-xl px-5 py-4 dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)]">
          <dl>
          <dt className="flex items-center gap-2 text-13 text-muted-foreground">
            {m.tone && <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", toneDot[m.tone])} aria-hidden />}
            <span className="line-clamp-1 sm:line-clamp-none">{m.label}</span>
          </dt>
          <dd className="mt-2.5 font-display text-[2rem] font-semibold leading-none tracking-[-0.04em] tabular-nums text-foreground">
            {m.value}
          </dd>
          {m.hint && <dd className="mt-2 line-clamp-2 text-2xs text-muted-foreground">{m.hint}</dd>}
          </dl>
        </MagicCard>
      ))}
    </div>
  );
}
