"use client";

import React from "react";
import { Building2, ChevronsUpDown, Store } from "lucide-react";
import { Establishment, Organization } from "@/types";
import { deferred } from "@/components/shared/deferred";
import { closedMenuTriggerAttrs } from "./header-triggers";

export interface TenantSwitcherProps {
  organizations: Organization[];
  currentOrganization: Organization;
  establishments: Establishment[];
  currentEstablishment?: Establishment;
  onSelectEstablishment?: (establishmentId: string) => void;
}

/** Déclencheur partagé entre la version statique et le menu Radix (tenant-switcher-menu.tsx). */
export const TenantSwitcherTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & Pick<TenantSwitcherProps, "currentOrganization" | "establishments" | "currentEstablishment">
>(({ currentOrganization, establishments, currentEstablishment, ...props }, ref) => {
  const title =
    currentEstablishment?.name ||
    (establishments.length === 0 ? "Aucun établissement" : "Tous les établissements");

  return (
    <button
      ref={ref}
      type="button"
      className="group flex w-full items-center gap-2.5 rounded-lg border border-sidebar-border bg-card p-1.5 pr-2 text-left shadow-raised transition-colors hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:shadow-none"
      {...props}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
        <Store className="h-4 w-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-13 font-semibold leading-tight text-foreground">{title}</span>
        <span className="flex items-center gap-1 truncate text-2xs text-muted-foreground">
          <Building2 className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{currentOrganization.name}</span>
        </span>
      </span>
      <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
    </button>
  );
});
TenantSwitcherTrigger.displayName = "TenantSwitcherTrigger";

// Menu Radix chargé à la première interaction (voir deferred.tsx).
export const TenantSwitcher = deferred<TenantSwitcherProps>(
  () => import("./tenant-switcher-menu").then((m) => m.TenantSwitcherMenu),
  function TenantSwitcherPlaceholder({ trigger, currentOrganization, establishments, currentEstablishment }) {
    return (
      <TenantSwitcherTrigger
        currentOrganization={currentOrganization}
        establishments={establishments}
        currentEstablishment={currentEstablishment}
        {...closedMenuTriggerAttrs}
        {...trigger}
      />
    );
  }
);
