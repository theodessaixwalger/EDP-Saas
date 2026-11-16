import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ConnectorStatus = "connected" | "disconnected" | "error" | "manual";

const statusMeta: Record<ConnectorStatus, { label: string; dot: string }> = {
  connected: { label: "Connecté", dot: "bg-success" },
  disconnected: { label: "Non connecté", dot: "bg-muted-foreground/40" },
  error: { label: "Erreur de synchronisation", dot: "bg-destructive" },
  manual: { label: "Mode manuel", dot: "bg-warning" },
};

interface ConnectorRowProps {
  name: string;
  description?: string;
  status: ConnectorStatus;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

export function ConnectorRow({ name, description, status, icon: Icon, action, className }: ConnectorRowProps) {
  const meta = statusMeta[status];
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg bg-muted/60 px-3 py-2.5 transition-colors hover:bg-muted",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        {Icon ? (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-card text-foreground shadow-raised dark:shadow-none">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        ) : null}
        <div className="min-w-0">
          <p className="truncate text-13 font-medium text-foreground">{name}</p>
          <p className="flex items-center gap-1.5 text-2xs text-muted-foreground">
            <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", meta.dot)} aria-hidden />
            <span className="truncate">{description ?? meta.label}</span>
          </p>
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
