"use client";

import React from "react";
import Link from "next/link";
import { Building2, Check, ChevronsUpDown, Plus, Store } from "lucide-react";
import { Establishment, Organization } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TenantSwitcherProps {
  organizations: Organization[];
  currentOrganization: Organization;
  establishments: Establishment[];
  currentEstablishment?: Establishment;
  onSelectEstablishment?: (establishmentId: string) => void;
}

export function TenantSwitcher({
  currentOrganization,
  establishments,
  currentEstablishment,
  onSelectEstablishment,
}: TenantSwitcherProps) {
  const title =
    currentEstablishment?.name ||
    (establishments.length === 0 ? "Aucun établissement" : "Tous les établissements");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex w-full items-center gap-2.5 rounded-lg border border-sidebar-border bg-card p-1.5 pr-2 text-left shadow-raised transition-colors hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:shadow-none">
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
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-[--radix-dropdown-menu-trigger-width] min-w-56">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Établissements ({establishments.length})
        </DropdownMenuLabel>
        {establishments.length === 0 ? (
          <p className="px-2 py-3 text-center text-sm text-muted-foreground">
            Aucun établissement configuré
          </p>
        ) : (
          establishments.map((est) => {
            const isSelected = est.id === currentEstablishment?.id;
            return (
              <DropdownMenuItem key={est.id} onSelect={() => onSelectEstablishment?.(est.id)}>
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{est.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {est.city || "Point de vente"}
                  </span>
                </span>
                {isSelected && <Check className="text-primary" />}
              </DropdownMenuItem>
            );
          })
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/establishments" className="text-primary">
            <Plus />
            Gérer les établissements
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
