"use client";

/** Select Radix du sélecteur de période, chargé à la demande par range-select.tsx. */

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { labelOf, type RangeSelectProps } from "./range-select";

export function RangeSelectMenu({
  value,
  options,
  onValueChange,
  className,
  defaultOpen = false,
  "aria-label": ariaLabel,
}: RangeSelectProps & { defaultOpen?: boolean }) {
  return (
    <Select value={value} onValueChange={onValueChange} defaultOpen={defaultOpen}>
      <SelectTrigger className={className} aria-label={ariaLabel}>
        {/* Libellé explicite : affiché immédiatement, sans attendre le montage des options. */}
        <SelectValue>{labelOf(options, value)}</SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="rounded-lg">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
