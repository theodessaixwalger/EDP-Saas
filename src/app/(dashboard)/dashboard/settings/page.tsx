"use client";

import React, { useState } from "react";
import { Settings, Check, Sliders, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [modules, setModules] = useState([
    {
      id: "content",
      name: "Module 1 & 2 — Contenus & Calendrier",
      description: "Gestion des publications, photos, vidéos et calendrier éditorial.",
      enabled: true,
      category: "Marketing",
    },
    {
      id: "loyalty",
      name: "Module 3 — Fidélité QR Code",
      description: "Programme de fidélité dématérialisé avec scan ultra-rapide en caisse.",
      enabled: true,
      category: "Fidélisation",
    },
    {
      id: "marketing_actions",
      name: "Module 4 — Plan d'actions déterministe",
      description: "Moteur de recommandations basé sur la météo, le calendrier et la fréquentation.",
      enabled: true,
      category: "Pilotage",
    },
    {
      id: "campaigns",
      name: "Module 5 — Campagnes & Offres",
      description: "Modèles d'offres et segmentation automatique des clients.",
      enabled: true,
      category: "Marketing",
    },
    {
      id: "automations",
      name: "Module 6 — Relances automatiques",
      description: "Détection des clients inactifs et réactivation par email conforme RGPD.",
      enabled: true,
      category: "Fidélisation",
    },
    {
      id: "diagnostics",
      name: "Module 7 — Diagnostic de présence (Score /100)",
      description: "Audit Google Business Profile et performance de votre site.",
      enabled: true,
      category: "Visibilité",
    },
    {
      id: "analytics",
      name: "Module 8 — Tableau de bord analytique",
      description: "Indicateurs réels de passage, fidélité et rapport mensuel PDF.",
      enabled: true,
      category: "Pilotage",
    },
    {
      id: "competitors",
      name: "Module 9 — Surveillance de la concurrence",
      description: "Comparaison des notes Google et avis des commerces locaux.",
      enabled: false,
      category: "Visibilité",
    },
    {
      id: "reviews",
      name: "Module 11 — Avis clients Google",
      description: "Centralisation des avis et modèles de réponses pré-rédigés.",
      enabled: true,
      category: "Visibilité",
    },
    {
      id: "website",
      name: "Module 12 — Créateur de site vitrine",
      description: "Site internet localisé optimisé SEO Schema.org LocalBusiness.",
      enabled: false,
      category: "Visibilité",
    },
  ]);

  const toggleModule = (id: string) => {
    setModules(
      modules.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Configuration des Modules
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Activez ou désactivez les fonctionnalités de LocalBoost adaptées à votre commerce
          </p>
        </div>

        <Button onClick={handleSave} size="sm" className="gap-1.5 shadow-sm">
          <Check className="h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </div>

      {savedSuccess && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2">
          <Check className="h-4 w-4 text-emerald-600" />
          Paramètres enregistrés avec succès pour cet établissement.
        </div>
      )}

      {/* Sector Profile Header */}
      <Card className="border-slate-200">
        <CardHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Sliders className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">Profil Sectoriel Actif</CardTitle>
                <CardDescription className="text-xs">
                  Boulangeries & Pâtisseries (Artisans de proximité)
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              Cumul : 1 passage = 10 pts
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Modules Toggles List */}
      <Card className="border-slate-200">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-base">Modules Activables par Établissement</CardTitle>
          <CardDescription className="text-xs">
            Personnalisez votre tableau de bord selon vos priorités actuelles
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors"
              >
                <div className="max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      {mod.name}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {mod.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    mod.enabled
                      ? "bg-brand-50 text-brand-700 border border-brand-200"
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}
                >
                  {mod.enabled ? (
                    <>
                      <ToggleRight className="h-4 w-4 text-brand-600" />
                      <span>Activé</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-4 w-4 text-slate-400" />
                      <span>Désactivé</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
