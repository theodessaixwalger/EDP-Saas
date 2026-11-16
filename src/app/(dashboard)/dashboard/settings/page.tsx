"use client";

import React, { useState } from "react";
import { Check, Sliders } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/shared/page-header";

const sectorsList = [
  { code: "general", name: "Commerce ou service de proximité (général)" },
  { code: "restaurants", name: "Restaurants & restauration rapide" },
  { code: "cafes_bars", name: "Cafés & bars" },
  { code: "boulangeries", name: "Boulangeries & pâtisseries" },
  { code: "coiffeurs_barbiers", name: "Coiffeurs & barbiers" },
  { code: "instituts_beaute", name: "Instituts de beauté & spas" },
  { code: "salles_sport", name: "Salles de sport & studios" },
  { code: "boutiques_mode", name: "Boutiques de mode & accessoires" },
  { code: "commerces_alimentaires", name: "Commerces alimentaires & épiceries" },
  { code: "fleuristes", name: "Fleuristes de proximité" },
];

export default function SettingsPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedSector, setSelectedSector] = useState("general");
  const [modules, setModules] = useState([
    { id: "content", name: "Contenus & calendrier", module: "Modules 1 & 2", description: "Gestion des publications, photos, vidéos et calendrier éditorial.", enabled: true, category: "Marketing" },
    { id: "loyalty", name: "Fidélité QR code", module: "Module 3", description: "Programme de fidélité dématérialisé avec scan rapide en caisse.", enabled: true, category: "Fidélisation" },
    { id: "marketing_actions", name: "Plan d'actions déterministe", module: "Module 4", description: "Recommandations basées sur la météo, le calendrier et la fréquentation.", enabled: true, category: "Pilotage" },
    { id: "campaigns", name: "Campagnes & offres", module: "Module 5", description: "Modèles d'offres et segmentation automatique des clients.", enabled: true, category: "Marketing" },
    { id: "automations", name: "Relances automatiques", module: "Module 6", description: "Détection des clients inactifs et réactivation par email conforme RGPD.", enabled: true, category: "Fidélisation" },
    { id: "diagnostics", name: "Diagnostic de présence", module: "Module 7", description: "Audit Google Business Profile et performance de votre site.", enabled: true, category: "Visibilité" },
    { id: "analytics", name: "Tableau de bord analytique", module: "Module 8", description: "Indicateurs réels de passage, fidélité et rapport mensuel PDF.", enabled: true, category: "Pilotage" },
    { id: "competitors", name: "Veille concurrentielle", module: "Module 9", description: "Comparaison des notes Google et avis des commerces locaux.", enabled: false, category: "Visibilité" },
    { id: "reviews", name: "Avis clients Google", module: "Module 11", description: "Centralisation des avis et modèles de réponses.", enabled: true, category: "Visibilité" },
    { id: "website", name: "Site vitrine", module: "Module 12", description: "Site internet localisé optimisé SEO Schema.org LocalBusiness.", enabled: false, category: "Visibilité" },
  ]);

  const toggleModule = (id: string) => {
    setModules(modules.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const enabledCount = modules.filter((m) => m.enabled).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Paramètres"
        description="Adaptez LocalBoost à votre métier et activez les modules utiles à votre commerce."
        actions={
          <Button onClick={handleSave} size="sm">
            <Check className="h-4 w-4" />
            Enregistrer
          </Button>
        }
      />

      {savedSuccess && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg border border-success/30 bg-success-soft p-3 text-sm text-success animate-in fade-in-0 slide-in-from-top-1"
        >
          <Check className="h-4 w-4" aria-hidden />
          Paramètres enregistrés pour cet établissement.
        </div>
      )}

      <Card>
        <CardHeader className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Sliders className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <CardTitle>Profil sectoriel</CardTitle>
                <CardDescription>Définit les règles de fidélité et les modèles de campagnes adaptés</CardDescription>
              </div>
            </div>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full rounded-lg sm:w-[22rem]" aria-label="Secteur d'activité">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sectorsList.map((s) => (
                  <SelectItem key={s.code} value={s.code}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>Modules de l&apos;établissement</CardTitle>
              <CardDescription>Personnalisez votre espace selon vos priorités</CardDescription>
            </div>
            <Badge variant="secondary">
              {enabledCount} / {modules.length} actifs
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y border-t">
            {modules.map((mod) => (
              <li key={mod.id} className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/40">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <label htmlFor={`mod-${mod.id}`} className="cursor-pointer text-sm font-semibold">
                      {mod.name}
                    </label>
                    <span className="text-xs text-muted-foreground">{mod.module}</span>
                    <Badge variant="outline">{mod.category}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{mod.description}</p>
                </div>
                <Switch id={`mod-${mod.id}`} checked={mod.enabled} onCheckedChange={() => toggleModule(mod.id)} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
