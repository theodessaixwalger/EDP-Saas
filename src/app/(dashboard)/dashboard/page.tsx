import React from "react";
import Link from "next/link";
import {
  Users,
  QrCode,
  Star,
  Activity,
  ArrowUpRight,
  Target,
  PlusCircle,
  Share2,
  Calendar,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverviewPage() {
  const metrics = [
    {
      title: "Clients fidélisés",
      value: "482",
      change: "+14%",
      period: "vs mois précédent",
      icon: Users,
      trend: "up",
    },
    {
      title: "Points distribués",
      value: "5 840",
      change: "112 récompenses",
      period: "échangées en caisse",
      icon: QrCode,
      trend: "neutral",
    },
    {
      title: "Note Google Business",
      value: "4.8 / 5",
      change: "68 avis",
      period: "98% avec réponse",
      icon: Star,
      trend: "up",
    },
    {
      title: "Score Diagnostic Local",
      value: "84 / 100",
      change: "Optimisé",
      period: "Google & PageSpeed validés",
      icon: Activity,
      trend: "up",
    },
  ];

  const recentReviews = [
    {
      author: "Sophie B.",
      rating: 5,
      date: "Il y a 2 jours",
      comment: "Pain au levain exceptionnel et viennoiseries fraîches ! L'équipe est toujours accueillante.",
      hasReply: true,
    },
    {
      author: "Julien M.",
      rating: 4,
      date: "Il y a 4 jours",
      comment: "Très bonne boulangerie artisanale. Un peu d'attente le samedi matin mais cela vaut le coup.",
      hasReply: true,
    },
    {
      author: "Claire D.",
      rating: 5,
      date: "Il y a 6 jours",
      comment: "Le programme de fidélité sur smartphone est super pratique, plus besoin de carte en carton.",
      hasReply: false,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Onboarding Progress Bar (Section 12) */}
      <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Installation de votre commerce : 80% complété
                </h3>
                <Badge variant="default" className="text-[10px]">
                  Étape 4 / 5
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Connectez votre compte Instagram pour activer la synchronisation des publications.
              </p>
            </div>
          </div>
          <Link href="/dashboard/channels">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs font-medium">
              Connecter Instagram
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-4 overflow-hidden">
          <div className="bg-brand-600 h-1.5 rounded-full" style={{ width: "80%" }} />
        </div>
      </div>

      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tableau de Bord Marketing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pilotage opérationnel de <strong className="text-slate-800">Boulangerie du Marché — Centre</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/dashboard/loyalty/scan">
            <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
              <QrCode className="h-4 w-4" />
              Scanner un QR client
            </Button>
          </Link>
          <Link href="/dashboard/content/new">
            <Button size="sm" variant="outline" className="gap-1.5">
              <PlusCircle className="h-4 w-4 text-slate-500" />
              Nouvelle publication
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics Grid */}
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
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span className="font-semibold text-emerald-600">{m.change}</span>
                    <span>{m.period}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Priority Action (Module 4 - Deterministic Recommendation Engine) */}
      <Card className="border-brand-200 bg-brand-50/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-[10px]">
                    Action Déterministe Recommandée
                  </Badge>
                  <span className="text-xs text-slate-400">Règle : INACTIVITY_30D</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mt-1">
                  Relance de 42 clients réguliers absents depuis plus de 30 jours
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  <strong>Justification calculée :</strong> Vos statistiques montrent une baisse de passage
                  de 42 membres actifs ayant plus de 5 visites antérieures. Une offre de retour
                  (mini-viennoiserie offerte dès 5€ d&apos;achat) augmente le taux de réactivation de 28%.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/dashboard/campaigns/new?rule=INACTIVITY_30D">
                <Button size="sm" className="gap-1.5 shadow-sm">
                  Lancer la campagne Brevo
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Split Section: Reviews & Active Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Google Reviews (Module 11) */}
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader className="p-6 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Derniers avis Google Business</CardTitle>
              <CardDescription className="text-xs">
                Synchronisé automatiquement via l&apos;API officielle
              </CardDescription>
            </div>
            <Link href="/dashboard/reviews">
              <Button variant="ghost" size="sm" className="text-xs text-brand-600">
                Voir tous les avis
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            {recentReviews.map((rev, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-lg border border-slate-100 p-4 bg-slate-50/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">{rev.author}</span>
                    <div className="flex text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, si) => (
                        <Star key={si} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
                <p className="text-xs text-slate-600">{rev.comment}</p>
                <div className="flex items-center justify-between pt-1">
                  {rev.hasReply ? (
                    <Badge variant="success" className="text-[10px] gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Répondu
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="text-[10px] gap-1">
                      <Clock className="h-3 w-3" />
                      En attente de réponse
                    </Badge>
                  )}
                  {!rev.hasReply && (
                    <Link href="/dashboard/reviews">
                      <Button size="sm" variant="ghost" className="text-[11px] h-7 text-brand-600">
                        Répondre avec modèle
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Integration Status (Section 18) */}
        <Card className="border-slate-200">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-base">État des Connexions</CardTitle>
            <CardDescription className="text-xs">
              Connecteurs officiels actifs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">Google Business</p>
                  <p className="text-[10px] text-slate-400">Avis & informations synchronisés</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px]">Actif</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">Brevo (Emails)</p>
                  <p className="text-[10px] text-slate-400">Relances & conformité RGPD</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px]">Actif</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">Meta / Instagram</p>
                  <p className="text-[10px] text-slate-400">En attente de connexion</p>
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
                  <p className="text-xs font-semibold text-slate-900">Stripe Billing</p>
                  <p className="text-[10px] text-slate-400">Abonnement Pro actif</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px]">Actif</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
