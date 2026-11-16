import * as React from "react";
import { AnimatedGridPattern } from "@/components/effects/animated-grid-pattern";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const gridMask = "radial-gradient(ellipse 60% 120% at 100% 0%, #000 0%, transparent 70%)";

/** En-tête de page : surface avec grille animée côté droit. */
export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative isolate overflow-hidden rounded-xl border bg-card dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)]",
        className
      )}
    >
      <AnimatedGridPattern
        numSquares={22}
        maxOpacity={0.26}
        className="-z-10 [mask-image:var(--grid-mask)]"
        style={{ "--grid-mask": gridMask } as React.CSSProperties}
      />
      <div className="flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7 sm:py-7">
        <div className="min-w-0">
          <h1 className="text-balance font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 max-w-[42rem] text-pretty text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

/** Titre de section à l'intérieur d'une page. */
export function SectionTitle({
  children,
  aside,
  id,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-3 mt-2 flex items-center justify-between gap-3">
      <h2 id={id} className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em]">
        {children}
      </h2>
      {aside}
    </div>
  );
}
