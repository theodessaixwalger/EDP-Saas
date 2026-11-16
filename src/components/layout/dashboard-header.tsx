"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BellOff,
  ChevronRight,
  CreditCard,
  ExternalLink,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Profile } from "@/types";
import { ThemeToggle } from "./theme-toggle";
import { DemoToggle } from "@/features/demo/demo-toggle";
import { useDemo } from "@/features/demo/demo-context";
import { demoNotifications } from "@/features/demo/demo-data";
import { PageSearch } from "./page-search";
import { findNavItem } from "./nav-config";
import { SidebarBrand, SidebarNav, type DashboardSidebarProps } from "./dashboard-sidebar";

interface DashboardHeaderProps {
  user?: Profile | null;
  sidebar: DashboardSidebarProps;
}

function initials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

export function DashboardHeader({ user, sidebar }: DashboardHeaderProps) {
  const pathname = usePathname() ?? "/dashboard";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const current = findNavItem(pathname);
  const demo = useDemo();

  return (
    <header className="relative z-30 flex h-14 w-full shrink-0 items-center gap-3 border-b bg-background px-4 sm:px-6">
      {/* Navigation mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="-ml-1 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Ouvrir la navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex w-72 flex-col gap-0 border-sidebar-border bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex h-14 shrink-0 items-center px-5">
            <SidebarBrand />
          </div>
          <SidebarNav {...sidebar} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="hidden min-w-0 items-center gap-1.5 text-13 md:flex">
        <span className="text-muted-foreground">{current?.group ?? "Espace commerçant"}</span>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" aria-hidden />
        <span className="truncate font-medium text-foreground">{current?.label ?? "Tableau de bord"}</span>
      </nav>

      <div className="flex flex-1 justify-end md:justify-center">
        <PageSearch className="hidden sm:block" />
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" asChild className="hidden text-muted-foreground hover:text-foreground xl:inline-flex">
          <Link href="/fidelite/demo" target="_blank" rel="noopener">
            <ExternalLink className="h-3.5 w-3.5" />
            Portail client
          </Link>
        </Button>

        <DemoToggle className="mr-1" />
        <ThemeToggle />

        {/* Notifications : aucune source branchée, aucun badge non-lu fictif */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              {demo && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" aria-hidden />}
              <span className="sr-only">Notifications</span>
            </Button>
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

        <div className="mx-1 hidden h-5 w-px bg-border sm:block" aria-hidden />

        {/* Compte */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-lg p-1 pr-2 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
      </div>
    </header>
  );
}
