import React from "react";
import Link from "next/link";
import {
  Users,
  QrCode,
  Star,
  Activity,
  PlusCircle,
  Clock,
  Sparkles,
  ChevronRight,
  MessageSquareOff,
  Store,
  Compass,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverviewPage() {
  // STRICT DATA GOVERNANCE: Zéro données inventées. Tout démarre à zéro pour un nouveau commerce.
  const metrics = [
    {
      title: "Clients fidélisés",
      value: "0",
      change: "0%",
      period: "Aucun client enregistré",
      icon: Users,
      trend: "neutral",
    },
    {
      title: "Points distribués",
      value: "0",
      change: "0 récompense",
      period: "0 transaction en caisse",
      icon: QrCode,
      trend: "neutral",
    },
    {
      title: "Note Google Business",
      value: "- / 5",
      change: "0 avis",
      period: "Fiche non connectée",
      icon: Star,
      trend: "neutral",
    },
    {
      title: "Score Diagnostic Local",
      value: "- / 100",
      change: "Non évalué",
      period: "En attente de premier audit",
      icon: Activity,
      trend: "neutral",
    },
  ];

  // Zéro avis fictifs : la liste est vide tant que l'API Google n'est pas connectée
  const recentReviews: Array<{
    author: string;
    rating: number;
    date: string;
    comment: string;
    hasReply: boolean;
  }> = [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Onboarding Progress Bar (Section 12) - Réel : Étape 1/5 */}
      <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Installation de votre commerce : 20% complété
                </h3>
                <Badge variant="default" className="text-[10px]">
                  Étape 1 / 5
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Renseignez les coordonnées de votre premier point de vente pour activer les modules.
              </p>
            </div>
          </div>
          <Link href="/dashboard/establishments">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs font-medium">
              Configurer mon établissement
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-4 overflow-hidden">
          <div className="bg-brand-600 h-1.5 rounded-full" style={{ width: "20%" }} />
        </div>
      </div>

      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tableau de Bord Marketing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pilotage opérationnel de votre commerce de proximité
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/dashboard/loyalty">
            <Button size="sm" className="gap-1.5 bg-brand-600 hover:bg-brand-700 text-white shadow-sm">
              <QrCode className="h-4 w-4" />
              Scanner un QR client
            </Button>
          </Link>
          <Link href="/dashboard/content">
            <Button size="sm" variant="outline" className="gap-1.5">
              <PlusCircle className="h-4 w-4 text-slate-500" />
              Nouvelle publication
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics Grid (Toutes les valeurs à zéro au départ) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className="border-slate-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500">{m.title}</p>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                    <Icon className="h-4 w-4 text-brand-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-slate-900">{m.value}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <span>{m.period}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Initial Deterministic Action (Module 4) - Purement basé sur la situation réelle de départ */}
      <Card className="border-brand-200 bg-brand-50/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-[10px]">
                    Action Déterministe Recommandée
                  </Badge>
                  <span className="text-xs text-slate-400">Règle : INIT_ESTABLISHMENT_SETUP</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mt-1">
                  Bienvenue sur LocalBoost : configurez votre premier établissement
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  <strong>Justification calculée :</strong> Aucun établissement n&apos;a encore été configuré.
                  Pour activer le programme de fidélité par QR code, la surveillance des avis Google
                  et les campagnes ciblées, renseignez les informations de votre premier point de vente.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/dashboard/establishments">
                <Button size="sm" className="gap-1.5 shadow-sm">
                  Ajouter un établissement
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Split Section: Reviews & Active Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Google Reviews - État vide réel sans avis inventé */}
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader className="p-6 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Derniers avis Google Business</CardTitle>
              <CardDescription className="text-xs">
                Synchronisé automatiquement dès la connexion de votre fiche
              </CardDescription>
            </div>
            <Link href="/dashboard/reviews">
              <Button variant="ghost" size="sm" className="text-xs text-brand-600">
                Gérer les avis
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            {recentReviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
                  <MessageSquareOff className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-semibold text-slate-900">Aucun avis synchronisé</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Connectez votre fiche Google Business Profile pour rapatrier vos avis et répondre avec des modèles types.
                </p>
                <Link href="/dashboard/channels" className="mt-4">
                  <Button size="sm" variant="outline" className="text-xs">
                    Connecter Google Business
                  </Button>
                </Link>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Integration Status (Section 18) - État réel des connecteurs */}
        <Card className="border-slate-200">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-base">État des Connexions</CardTitle>
            <CardDescription className="text-xs">
              Connecteurs officiels
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-slate-300" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">Google Business</p>
                  <p className="text-[10px] text-slate-400">Non connecté</p>
                </div>
              </div>
              <Link href="/dashboard/channels">
                <Button size="sm" variant="ghost" className="text-[11px] h-7 text-brand-600">
                  Connecter
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-slate-300" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">Brevo (Emails)</p>
                  <p className="text-[10px] text-slate-400">Non configuré</p>
                </div>
              </div>
              <Link href="/dashboard/settings">
                <Button size="sm" variant="ghost" className="text-[11px] h-7 text-brand-600">
                  Configurer
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-slate-300" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">Meta / Instagram</p>
                  <p className="text-[10px] text-slate-400">Non connecté</p>
                </div>
              </div>
              <Link href="/dashboard/channels">
                <Button size="sm" variant="ghost" className="text-[11px] h-7 text-brand-600">
                  Connecter
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">Abonnement</p>
                  <p className="text-[10px] text-slate-400">Période d&apos;essai gratuite (14j)</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50">
                Essai actif
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
