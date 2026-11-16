import * as React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "./button";
import { Ripple } from "@/components/effects/ripple";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  /** Actions personnalisées (remplace actionLabel). */
  children?: React.ReactNode;
  /** `bare` : sans cadre, pour un usage à l'intérieur d'une Card. */
  variant?: "default" | "bare";
  className?: string;
}

/** État vide : ondes Ripple qui respirent autour de l'icône. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  children,
  variant = "default",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative isolate flex flex-col items-center justify-center overflow-hidden px-6 py-14 text-center",
        variant === "default" && "rounded-xl border border-dashed border-border bg-card",
        className
      )}
    >
      <Ripple className="-z-10 inset-x-0 bottom-auto top-[-102px] h-[360px]" mainCircleSize={96} numCircles={5} />
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border bg-card text-foreground shadow-raised dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)]">
        <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden />
      </span>
      <h3 className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-foreground">{title}</h3>
      <p className="mt-1 max-w-[23rem] text-pretty text-13 text-muted-foreground">{description}</p>
      {children ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">{children}</div>
      ) : (
        actionLabel && (
          <div className="mt-5">
            {actionHref ? (
              <Button size="sm" asChild>
                <Link href={actionHref}>{actionLabel}</Link>
              </Button>
            ) : (
              <Button size="sm" onClick={onAction}>
                {actionLabel}
              </Button>
            )}
          </div>
        )
      )}
    </div>
  );
}
