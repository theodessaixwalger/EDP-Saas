"use client";

import React from "react";
import Link from "next/link";
import { Bell, Search, User, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Profile } from "@/types";

interface DashboardHeaderProps {
  user?: Profile | null;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/90 bg-white px-6">
      {/* Search Bar / Context Indicator */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une campagne, un client, un contenu..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Customer Loyalty Portal preview */}
        <Link href="/fidelite/demo" target="_blank">
          <Button variant="ghost" size="sm" className="text-xs text-slate-600 gap-1.5">
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            Portail client mobile
          </Button>
        </Link>

        {/* Notification Bell */}
        <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-600 ring-2 ring-white" />
        </button>

        <div className="h-4 w-px bg-slate-200" />

        {/* User Pill */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-medium text-xs">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-900 leading-tight">
              {user?.full_name || "Commerçant"}
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              {user?.email || "propriétaire"}
            </p>
          </div>
          <Link href="/login">
            <button
              title="Déconnexion"
              className="ml-2 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
