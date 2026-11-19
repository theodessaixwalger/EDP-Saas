"use client";

/**
 * Déclencheurs du header, partagés entre la version statique (affichée au chargement)
 * et la version Radix (chargée à la première interaction) : rendu strictement identique.
 */

import * as React from "react";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/types";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

/** Attributs posés par Radix sur un déclencheur fermé, repris par la version statique. */
export const closedMenuTriggerAttrs = {
  type: "button",
  "aria-haspopup": "menu",
  "aria-expanded": false,
  "data-state": "closed",
} as const;

export const MobileNavTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button ref={ref} variant="ghost" size="icon" className="-ml-1 lg:hidden" {...props}>
    <Menu className="h-5 w-5" />
    <span className="sr-only">Ouvrir la navigation</span>
  </Button>
));
MobileNavTrigger.displayName = "MobileNavTrigger";

export const NotificationsTrigger = React.forwardRef<HTMLButtonElement, ButtonProps & { demo: boolean }>(
  ({ demo, ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className="relative text-muted-foreground hover:text-foreground"
      {...props}
    >
      <Bell className="h-4 w-4" />
      {demo && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" aria-hidden />}
      <span className="sr-only">Notifications</span>
    </Button>
  )
);
NotificationsTrigger.displayName = "NotificationsTrigger";

export function initials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

export const AccountTrigger = React.forwardRef<HTMLButtonElement, ButtonProps & { user?: Profile | null }>(
  ({ user, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className="flex items-center gap-2.5 rounded-lg p-1 pr-2 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      {...props}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground font-display text-2xs font-semibold text-background ring-2 ring-background">
        {initials(user?.full_name)}
      </span>
      <span className="hidden max-w-[10rem] md:block">
        <span className="block truncate text-13 font-medium leading-tight text-foreground">
          {user?.full_name || "Commerçant"}
        </span>
        <span className="block truncate text-2xs leading-tight text-muted-foreground">
          {user?.email || "Propriétaire"}
        </span>
      </span>
    </button>
  )
);
AccountTrigger.displayName = "AccountTrigger";
