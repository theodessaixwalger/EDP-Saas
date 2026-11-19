"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deferred } from "@/components/shared/deferred";
import { Profile } from "@/types";
import { ThemeToggle } from "./theme-toggle";
import { DemoToggle } from "@/features/demo/demo-toggle";
import { useDemo } from "@/features/demo/demo-context";
import { PageSearch } from "./page-search";
import { findNavItem } from "./nav-config";
import type { DashboardSidebarProps } from "./dashboard-sidebar";
import {
  AccountTrigger,
  MobileNavTrigger,
  NotificationsTrigger,
  closedMenuTriggerAttrs,
} from "./header-triggers";

interface DashboardHeaderProps {
  user?: Profile | null;
  sidebar: DashboardSidebarProps;
}

// Menus Radix chargés à la première interaction (voir deferred.tsx) : déclencheurs identiques en attendant.
const MobileNav = deferred<{ sidebar: DashboardSidebarProps }>(
  () => import("./header-menus").then((m) => m.MobileNav),
  function MobileNavPlaceholder({ trigger }) {
    return <MobileNavTrigger aria-haspopup="dialog" aria-expanded={false} data-state="closed" {...trigger} />;
  }
);

const NotificationsMenu = deferred<Record<never, never>>(
  () => import("./header-menus").then((m) => m.NotificationsMenu),
  function NotificationsPlaceholder({ trigger }) {
    const demo = useDemo();
    return <NotificationsTrigger demo={demo} {...closedMenuTriggerAttrs} {...trigger} />;
  }
);

const AccountMenu = deferred<{ user?: Profile | null }>(
  () => import("./header-menus").then((m) => m.AccountMenu),
  function AccountPlaceholder({ user, trigger }) {
    return <AccountTrigger user={user} {...closedMenuTriggerAttrs} {...trigger} />;
  }
);

export function DashboardHeader({ user, sidebar }: DashboardHeaderProps) {
  const pathname = usePathname() ?? "/dashboard";
  const current = findNavItem(pathname);

  return (
    <header className="relative z-30 flex h-14 w-full shrink-0 items-center gap-3 border-b bg-background px-4 sm:px-6">
      {/* Navigation mobile */}
      <MobileNav sidebar={sidebar} />

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

        <NotificationsMenu />

        <div className="mx-1 hidden h-5 w-px bg-border sm:block" aria-hidden />

        {/* Compte */}
        <AccountMenu user={user} />
      </div>
    </header>
  );
}
