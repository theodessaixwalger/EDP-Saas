"use client";

import React, { useState } from "react";
import { Store, ChevronDown, Check, Building2, Plus } from "lucide-react";
import { Establishment, Organization } from "@/types";

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
}: TenantSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200/90 bg-white p-2.5 text-left text-sm shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      >
        <div className="flex items-center gap-3 truncate">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
            <Store className="h-4 w-4" />
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-slate-900 truncate">
              {currentEstablishment?.name || (establishments.length === 0 ? "Aucun établissement" : "Tous les établissements")}
            </p>
            <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
              <Building2 className="h-3 w-3 inline" />
              {currentOrganization.name}
            </p>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full z-50 mt-1.5 w-64 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
            <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Établissements ({establishments.length})
            </div>
            <div className="max-h-48 overflow-y-auto space-y-0.5">
              {establishments.length === 0 ? (
                <p className="px-2.5 py-3 text-xs text-slate-400 text-center italic">
                  Aucun établissement configuré
                </p>
              ) : (
                establishments.map((est) => {
                  const isSelected = est.id === currentEstablishment?.id;
                  return (
                    <button
                      key={est.id}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-left transition-colors ${
                        isSelected
                          ? "bg-brand-50 text-brand-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="truncate">
                        <p className="truncate">{est.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {est.city || "Point de vente"}
                        </p>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-brand-600 shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>

            <div className="border-t border-slate-100 mt-1.5 pt-1.5">
              <a
                href="/dashboard/establishments"
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-brand-600 hover:bg-brand-50 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Plus className="h-3.5 w-3.5" />
                Gérer les établissements
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
