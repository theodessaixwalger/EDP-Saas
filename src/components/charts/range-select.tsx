"use client";

/**
 * Sélecteur de période du graphique de tendance. Le Select Radix n'est chargé qu'à la
 * première interaction (voir deferred.tsx) : en attendant, un déclencheur statique identique.
 */

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { deferred } from "@/components/shared/deferred";

export interface RangeOption {
  value: string;
  label: string;
}

export interface RangeSelectProps {
  value: string;
  options: readonly RangeOption[];
  onValueChange: (value: string) => void;
  className?: string;
  "aria-label": string;
}

/** Mêmes classes que SelectTrigger (src/components/ui/select.tsx). */
export const rangeTriggerClassName = (className?: string) =>
  cn(
    "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    className
  );

export const labelOf = (options: readonly RangeOption[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

export const RangeSelect = deferred<RangeSelectProps>(
  () => import("./range-select-menu").then((m) => m.RangeSelectMenu),
  function RangeSelectPlaceholder({ value, options, className, trigger, "aria-label": ariaLabel }) {
    return (
      <button
        type="button"
        role="combobox"
        aria-expanded={false}
        aria-autocomplete="none"
        aria-label={ariaLabel}
        dir="ltr"
        data-state="closed"
        className={rangeTriggerClassName(className)}
        {...trigger}
      >
        <span style={{ pointerEvents: "none" }}>{labelOf(options, value)}</span>
        <ChevronDown className="h-4 w-4 opacity-50" aria-hidden />
      </button>
    );
  }
);
