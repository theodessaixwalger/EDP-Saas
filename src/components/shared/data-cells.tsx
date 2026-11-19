import * as React from "react";
import { Facebook, Instagram, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Note sur 5 en étoiles pleines / vides. */
export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span role="img" className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn("h-3.5 w-3.5", i < Math.round(rating) ? "fill-warning text-warning" : "text-muted-foreground/40")}
          aria-hidden
        />
      ))}
    </span>
  );
}

const tones = {
  neutral: "bg-secondary text-secondary-foreground",
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  destructive: "bg-destructive-soft text-destructive",
} as const;

export type PillTone = keyof typeof tones;

/** Pastille de statut avec point coloré. */
export function StatusPill({ tone, children }: { tone: PillTone; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-2xs font-medium", tones[tone])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {children}
    </span>
  );
}

const channelMeta = {
  instagram: { icon: Instagram, label: "Instagram" },
  facebook: { icon: Facebook, label: "Facebook" },
  google: { icon: MapPin, label: "Google Business" },
} as const;

/** Icônes des réseaux d'une publication. */
export function ChannelIcons({ channels }: { channels: Array<keyof typeof channelMeta> }) {
  return (
    <span className="inline-flex items-center gap-1">
      {channels.map((c) => {
        const { icon: Icon, label } = channelMeta[c];
        return (
          <span key={c} title={label} className="flex h-6 w-6 items-center justify-center rounded-md border bg-card text-muted-foreground">
            <Icon className="h-3 w-3" aria-hidden />
            <span className="sr-only">{label}</span>
          </span>
        );
      })}
    </span>
  );
}

/** Initiales dans un rond (avatar sans image). */
export function Initials({ name, className }: { name: string; className?: string }) {
  const parts = name.trim().split(/\s+/);
  const text = ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
  return (
    <span
      aria-hidden
      className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-2xs font-semibold text-secondary-foreground", className)}
    >
      {text}
    </span>
  );
}
