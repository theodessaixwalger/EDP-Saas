import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Squelettes de chargement des pages du dashboard.
 * Chaque primitive reprend le gabarit exact du composant réel (bordures, marges, grilles)
 * pour que le passage squelette → page ne provoque aucun saut de mise en page.
 * Purement décoratifs : seul `SkeletonPage` est annoncé aux lecteurs d'écran.
 */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** Bloc gris animé. */
export function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={cn("rounded-md bg-muted motion-safe:animate-pulse", className)} style={style} />;
}

/** Conteneur de page : annonce le chargement, masque les blocs décoratifs. */
export function SkeletonPage({ label = "Chargement de la page…", children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6" role="status" aria-live="polite" aria-busy>
      <span className="sr-only">{label}</span>
      <div className="contents" aria-hidden>
        {children}
      </div>
    </div>
  );
}

/** Carte vide au style de `Card`. */
export function SkeletonCard({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("rounded-xl border bg-card", className)}>{children}</div>;
}

/** Titre + description d'un `CardHeader` (px-5 py-4). */
export function CardHeaderSkeleton({
  titleWidth = "w-40",
  description = true,
  aside,
  className,
}: {
  titleWidth?: string;
  description?: boolean;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-3 px-5 py-4", className)}>
      <div className="min-w-0 flex-1">
        <Bone className={cn("h-4", titleWidth)} />
        {description && <Bone className="mt-2 h-3.5 w-64 max-w-full" />}
      </div>
      {aside}
    </div>
  );
}

/** En-tête de page (`PageHeader`). */
export function PageHeaderSkeleton({ actions = 0, titleWidth = "w-56" }: { actions?: number; titleWidth?: string }) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7 sm:py-7">
        <div className="min-w-0 flex-1">
          <Bone className={cn("h-8", titleWidth)} />
          <Bone className="mt-3 h-4 w-full max-w-md" />
        </div>
        {actions > 0 && (
          <div className="flex shrink-0 gap-2">
            {range(actions).map((i) => (
              <Bone key={i} className="h-9 w-32 rounded-lg" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const metricColumns = {
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 lg:grid-cols-5 max-lg:[&>*:last-child:nth-child(odd)]:col-span-2",
  6: "grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
} as const;

/** Bandeau d'indicateurs (`MetricStrip`). */
export function MetricStripSkeleton({ count = 4, hint = true }: { count?: keyof typeof metricColumns; hint?: boolean }) {
  return (
    <div className={cn("grid gap-3", metricColumns[count])}>
      {range(count).map((i) => (
        <div key={i} className="rounded-xl border bg-card px-5 py-4">
          <Bone className="h-3.5 w-24" />
          <Bone className="mt-2.5 h-8 w-16" />
          {hint && <Bone className="mt-2 h-3 w-28" />}
        </div>
      ))}
    </div>
  );
}

/** Barre d'onglets (`TabsList`). */
export function TabsSkeleton({ tabs = 3 }: { tabs?: number }) {
  return (
    <div className="inline-flex h-9 items-center gap-1 rounded-lg bg-muted p-1">
      {range(tabs).map((i) => (
        <div key={i} className={cn("h-7 rounded-md", i === 0 ? "w-28 bg-card shadow-xs" : "w-24")} />
      ))}
    </div>
  );
}

/** Carte tableau (`TableCard`). */
export function TableCardSkeleton({
  columns,
  rows = 5,
  className,
  headerAction = false,
}: {
  columns: number;
  rows?: number;
  className?: string;
  headerAction?: boolean;
}) {
  return (
    <SkeletonCard className={cn("overflow-hidden", className)}>
      <CardHeaderSkeleton aside={headerAction ? <Bone className="h-8 w-28 rounded-lg" /> : undefined} />
      <div className="border-t">
        <div
          className="grid gap-4 border-b px-4 py-3"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {range(columns).map((c) => (
            <Bone key={c} className="h-3 w-16" />
          ))}
        </div>
        {range(rows).map((r) => (
          <div
            key={r}
            className="grid items-center gap-4 border-b px-4 py-3.5 last:border-b-0"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {range(columns).map((c) => (
              <Bone key={c} className={cn("h-3.5", c === 0 ? "w-4/5" : c % 2 ? "w-3/5" : "w-2/5")} />
            ))}
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}

/** Graphique d'évolution (`TrendChart`). */
export function TrendChartSkeleton({ className }: { className?: string }) {
  return (
    <SkeletonCard className={className}>
      <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Bone className="h-4 w-40" />
          <Bone className="mt-2 h-3.5 w-64 max-w-full" />
        </div>
        <Bone className="h-9 w-full rounded-lg sm:w-[170px]" />
      </div>
      <div className="px-2 pt-4 sm:px-5 sm:pt-5">
        <div className="flex h-[240px] items-end gap-2 pb-5">
          {[42, 58, 50, 66, 54, 72, 61, 80, 68, 76, 64, 85].map((h, i) => (
            <Bone key={i} className="flex-1 rounded-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </SkeletonCard>
  );
}

/** Ligne de connecteur (`ConnectorRow`). */
export function ConnectorRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/60 px-3 py-2.5">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="h-8 w-8 shrink-0 rounded-md bg-card" />
        <div className="min-w-0 flex-1">
          <Bone className="h-3.5 w-32 bg-card" />
          <Bone className="mt-1.5 h-3 w-24 bg-card" />
        </div>
      </div>
    </div>
  );
}

/** Carte latérale de connecteurs. */
export function ConnectorCardSkeleton({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <SkeletonCard className={className}>
      <CardHeaderSkeleton titleWidth="w-32" />
      <div className="space-y-2 px-5 pb-5">
        {range(rows).map((i) => (
          <ConnectorRowSkeleton key={i} />
        ))}
      </div>
    </SkeletonCard>
  );
}

/** Liste explicative (`FeatureList`). */
export function FeatureListSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {range(items).map((i) => (
        <div key={i} className="flex gap-3">
          <Bone className="mt-0.5 h-5 w-5 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <Bone className="h-3.5 w-36" />
            <Bone className="mt-1.5 h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Carte latérale avec liste explicative. */
export function FeatureCardSkeleton({ items = 4, className }: { items?: number; className?: string }) {
  return (
    <SkeletonCard className={cn("h-fit", className)}>
      <CardHeaderSkeleton titleWidth="w-36" />
      <div className="px-5 pb-5">
        <FeatureListSkeleton items={items} />
      </div>
    </SkeletonCard>
  );
}

/** Lignes séparées d'une liste en carte (`ul.divide-y`) : icône, texte, action. */
export function ListRowsSkeleton({
  rows = 4,
  icon = "square",
  action = true,
  badge = false,
  sw = false,
}: {
  rows?: number;
  icon?: "square" | "round" | "large" | false;
  action?: boolean;
  badge?: boolean;
  sw?: boolean;
}) {
  return (
    <div className="divide-y border-t">
      {range(rows).map((i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4">
          {icon === "square" && <Bone className="h-8 w-8 shrink-0" />}
          {icon === "large" && <Bone className="h-10 w-10 shrink-0 rounded-lg" />}
          {icon === "round" && <Bone className="h-8 w-8 shrink-0 rounded-full" />}
          <div className="min-w-0 flex-1">
            <Bone className="h-3.5 w-40" />
            <Bone className="mt-2 h-3 w-full max-w-sm" />
          </div>
          {badge && <Bone className="hidden h-5 w-20 shrink-0 rounded-full sm:block" />}
          {action && <Bone className="h-8 w-24 shrink-0 rounded-lg" />}
          {sw && <Bone className="h-5 w-9 shrink-0 rounded-full" />}
        </div>
      ))}
    </div>
  );
}

/** Élément d'avis (`ReviewItem`). */
export function ReviewRowsSkeleton({ rows = 3, bordered = true }: { rows?: number; bordered?: boolean }) {
  return (
    <div className={cn("divide-y", bordered && "border-t")}>
      {range(rows).map((i) => (
        <div key={i} className="flex gap-3 px-5 py-4">
          <Bone className="h-8 w-8 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <Bone className="h-3.5 w-24" />
              <Bone className="h-3.5 w-16" />
              <Bone className="h-3 w-28" />
              <Bone className="ml-auto h-5 w-20 rounded-full" />
            </div>
            <Bone className="mt-2 h-3 w-full" />
            <Bone className="mt-1.5 h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
