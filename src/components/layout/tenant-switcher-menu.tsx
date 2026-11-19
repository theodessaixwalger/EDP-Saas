"use client";

/** Menu Radix du sélecteur d'établissement, chargé à la demande par tenant-switcher.tsx. */

import React from "react";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TenantSwitcherTrigger, type TenantSwitcherProps } from "./tenant-switcher";

export function TenantSwitcherMenu({
  currentOrganization,
  establishments,
  currentEstablishment,
  onSelectEstablishment,
  defaultOpen = false,
}: TenantSwitcherProps & { defaultOpen?: boolean }) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        <TenantSwitcherTrigger
          currentOrganization={currentOrganization}
          establishments={establishments}
          currentEstablishment={currentEstablishment}
        />
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
