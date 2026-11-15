"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  FileText,
  CalendarDays,
  QrCode,
  Target,
  Megaphone,
  MailCheck,
  Activity,
  BarChart3,
  TrendingUp,
  Share2,
  Star,
  Globe,
  Settings,
  Users,
  CreditCard,
  Store,
} from "lucide-react";
import { TenantSwitcher } from "./tenant-switcher";
import { Establishment, Organization } from "@/types";

interface DashboardSidebarProps {
  currentOrganization: Organization;
  organizations: Organization[];
  establishments: Establishment[];
  currentEstablishment?: Establishment;
}

export function DashboardSidebar({
  currentOrganization,
  organizations,
  establishments,
  currentEstablishment,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const mainNav = [
    { label: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
    { label: "Contenus", href: "/dashboard/content", icon: FileText },
    { label: "Calendrier", href: "/dashboard/calendar", icon: CalendarDays },
    { label: "Fidélité QR", href: "/dashboard/loyalty", icon: QrCode },
    { label: "Plan d'actions", href: "/dashboard/actions", icon: Target },
    { label: "Campagnes", href: "/dashboard/campaigns", icon: Megaphone },
    { label: "Relances", href: "/dashboard/automations", icon: MailCheck },
    { label: "Diagnostic", href: "/dashboard/diagnostic", icon: Activity },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Concurrents", href: "/dashboard/competitors", icon: TrendingUp },
    { label: "Réseaux connectés", href: "/dashboard/channels", icon: Share2 },
    { label: "Avis clients", href: "/dashboard/reviews", icon: Star },
    { label: "Site vitrine", href: "/dashboard/website", icon: Globe },
  ];

  const settingsNav = [
    { label: "Établissements", href: "/dashboard/establishments", icon: Store },
    { label: "Équipe & Rôles", href: "/dashboard/team", icon: Users },
    { label: "Abonnement", href: "/dashboard/billing", icon: CreditCard },
    { label: "Paramètres", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200/90 bg-white flex flex-col justify-between h-screen sticky top-0">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Brand Header */}
        <div className="flex h-16 items-center px-6 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Local<span className="text-brand-600">Boost</span>
            </span>
          </Link>
        </div>

        {/* Tenant Switcher */}
        <div className="p-4 border-b border-slate-100">
          <TenantSwitcher
            currentOrganization={currentOrganization}
            organizations={organizations}
            establishments={establishments}
            currentEstablishment={currentEstablishment}
          />
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Copilote Marketing
            </p>
            <nav className="space-y-0.5">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-brand-50 text-brand-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-brand-600" : "text-slate-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Organisation
            </p>
            <nav className="space-y-0.5">
              {settingsNav.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-brand-50 text-brand-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-brand-600" : "text-slate-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
