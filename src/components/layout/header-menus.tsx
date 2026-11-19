"use client";

/**
 * Menus interactifs du header (Radix). Module chargé à la demande par dashboard-header.tsx :
 * voir src/components/shared/deferred.tsx.
 */

import * as React from "react";
import Link from "next/link";
import { BellOff, CreditCard, LogOut, Settings, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Profile } from "@/types";
import { useDemo } from "@/features/demo/demo-context";
import { demoNotifications } from "@/features/demo/demo-data";
import { SidebarBrand, SidebarNav, type DashboardSidebarProps } from "./dashboard-sidebar";
import { AccountTrigger, MobileNavTrigger, NotificationsTrigger } from "./header-triggers";

export function MobileNav({ sidebar, defaultOpen = false }: { sidebar: DashboardSidebarProps; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MobileNavTrigger />
      </SheetTrigger>
      <SheetContent side="left" className="flex w-72 flex-col gap-0 border-sidebar-border bg-sidebar p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex h-14 shrink-0 items-center px-5">
          <SidebarBrand />
        </div>
        <SidebarNav {...sidebar} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

/** Notifications : aucune source branchée, aucun badge non-lu fictif (hors mode démo signalé). */
export function NotificationsMenu({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const demo = useDemo();

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        <NotificationsTrigger demo={demo} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
        </div>
        {demo ? (
          <ul className="divide-y">
            {demoNotifications.map((n) => (
              <li key={n.id} className="px-4 py-3">
                <p className="text-13 font-medium">{n.title}</p>
                <p className="mt-0.5 text-2xs text-muted-foreground">
                  {n.detail} · {n.when}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center px-6 py-8 text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <BellOff className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-sm font-medium">Vous êtes à jour</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Avis à traiter, échecs de publication et alertes de synchronisation apparaîtront ici.
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AccountMenu({ user, defaultOpen = false }: { user?: Profile | null; defaultOpen?: boolean }) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        <AccountTrigger user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-medium">{user?.full_name || "Commerçant"}</p>
          <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <Settings /> Paramètres
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/team">
            <Users /> Équipe & rôles
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">
            <CreditCard /> Abonnement
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action="/auth/signout" method="post">
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full text-destructive focus:text-destructive">
              <LogOut /> Se déconnecter
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
