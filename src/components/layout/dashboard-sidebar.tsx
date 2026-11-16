"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { TenantSwitcher } from "./tenant-switcher";
import { BrandMark } from "./brand-mark";
import { dashboardNav, isNavItemActive } from "./nav-config";
import { Establishment, Organization } from "@/types";
import { cn } from "@/lib/utils";
import { useDemo } from "@/features/demo/demo-context";

export interface DashboardSidebarProps {
  currentOrganization: Organization;
  organizations: Organization[];
  establishments: Establishment[];
  currentEstablishment?: Establishment;
}

export function SidebarBrand() {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <BrandMark className="h-7 w-7" />
      <span className="font-display text-lg font-bold tracking-[-0.02em] text-foreground">LocalBoost</span>
    </Link>
  );
}

/** Navigation partagée entre la sidebar bureau et le tiroir mobile. */
export function SidebarNav({
  currentOrganization,
  organizations,
  establishments,
  currentEstablishment,
  onNavigate,
}: DashboardSidebarProps & { onNavigate?: () => void }) {
  const pathname = usePathname() ?? "/dashboard";
  const demo = useDemo();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="px-3 pb-2">
        <TenantSwitcher
          currentOrganization={currentOrganization}
          organizations={organizations}
          establishments={establishments}
          currentEstablishment={currentEstablishment}
        />
      </div>

      <nav aria-label="Navigation principale" className="relative z-10 min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-3">
        {dashboardNav.map((group) => {
          return (
            <div key={group.label}>
              <p className="mb-1 px-2 text-2xs font-medium text-muted-foreground/70">{group.label}</p>
              <ul className="space-y-px">
                {group.items.map((item) => {
                  const active = isNavItemActive(pathname, item.href);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex h-8 items-center gap-2.5 rounded-md px-2 text-13 font-medium transition-[background-color,color,box-shadow] duration-150",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-raised ring-1 ring-sidebar-border dark:shadow-none"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            active ? "text-primary" : "text-muted-foreground/80 group-hover:text-foreground"
                          )}
                          strokeWidth={active ? 2.1 : 1.8}
                          aria-hidden
                        />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          href="/dashboard/billing"
          onClick={onNavigate}
          className="group relative flex items-center justify-between overflow-hidden rounded-lg border border-sidebar-border bg-sidebar-accent px-3 py-2 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="min-w-0">
            <span className="block text-13 font-medium text-foreground">{demo ? "Offre Pro" : "Offre gratuite"}</span>
            <span className="block truncate text-2xs text-muted-foreground">
              {demo ? "2 établissements · renouvellement mensuel" : "Aucun abonnement actif"}
            </span>
          </span>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}

export function DashboardSidebar(props: DashboardSidebarProps) {
  return (
    <aside className="hidden h-full w-60 shrink-0 flex-col lg:flex">
      <div className="flex h-14 shrink-0 items-center px-5">
        <SidebarBrand />
      </div>
      <SidebarNav {...props} />
    </aside>
  );
}
