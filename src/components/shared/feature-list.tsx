import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureListProps {
  items: Array<{ title: string; description?: string; icon?: LucideIcon }>;
  className?: string;
}

/** Liste explicative (garanties, règles, conditions) — contenu statique, pas de donnée métier. */
export function FeatureList({ items, className }: FeatureListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map(({ title, description, icon: Icon = Check }) => (
        <li key={title} className="flex gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Icon className="h-3 w-3" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{title}</p>
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
