import React from "react";
import Link from "next/link";
import { ChevronRight, Facebook, Mail, MapPin, MessageSquareOff, PlusCircle, QrCode } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { MetricStrip } from "@/components/shared/metric-strip";
import { ConnectorRow } from "@/components/shared/connector-row";
import { TrendChart } from "@/components/charts/trend-chart";
import { getDashboardContext } from "@/features/organizations/dashboard-context";
import {
  currentSetupSignals,
  evaluateSetupRules,
  onboardingSteps,
} from "@/features/marketing-actions/setup-rules";
import { RecommendedActionCard } from "@/features/marketing-actions/recommended-action-card";
import { WelcomeHero } from "@/features/marketing-actions/welcome-hero";
import { IntegrationsOrbit } from "@/features/marketing-actions/integrations-orbit";
import { demoActions, demoKpis, demoReviews, demoSignals, demoTrend, frNumber } from "@/features/demo/demo-data";
import { ReviewItem } from "@/features/reviews/review-item";

export const metadata = { title: "Tableau de bord" };

export default async function DashboardOverviewPage() {
  const { profile, organization, establishments, demo } = await getDashboardContext();

  // Gouvernance des données : chaque valeur provient de l'état réel du compte.
  const signals = demo ? demoSignals : currentSetupSignals(establishments.length);
  const steps = onboardingSteps(signals);
  const [topAction] = demo ? demoActions : evaluateSetupRules(signals);
  const firstName = profile.full_name?.split(" ")[0];
  const todayRaw = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
  const today = todayRaw.charAt(0).toUpperCase() + todayRaw.slice(1);

  const connectLink = (href: string, label = "Connecter") => (
    <Button size="sm" variant="ghost" asChild className="h-7 px-2 text-primary hover:text-primary">
      <Link href={href}>{label}</Link>
    </Button>
  );

  return (
    <div className="space-y-6">
      <WelcomeHero
        steps={steps}
        title={firstName ? `Bonjour ${firstName}` : "Tableau de bord"}
        subtitle={
          <>
            <span>{today}</span>
            <span className="mx-1.5 text-muted-foreground/50" aria-hidden>
              ·
            </span>
            {organization.name}
          </>
        }
        actions={
          <>
            <Button size="sm" variant="outline" asChild>
              <Link href="/dashboard/content">
                <PlusCircle />
                Nouvelle publication
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard/loyalty">
                <QrCode />
                Scanner un QR client
              </Link>
            </Button>
          </>
        }
      />

      <MetricStrip
        metrics={[
          ...(demo
            ? [
                { label: "Clients fidélisés", value: frNumber(demoKpis.loyalCustomers), hint: `+${demoKpis.newCustomers30d} sur 30 jours` },
                { label: "Points distribués", value: frNumber(demoKpis.pointsDistributed), hint: `${frNumber(demoKpis.scans30d)} scans sur 30 jours` },
                { label: "Note Google", value: "4,7", hint: `${demoKpis.googleReviews} avis` },
                { label: "Score diagnostic", value: `${demoKpis.diagnosticScore}`, hint: "Dernier audit il y a 2 jours" },
              ]
            : [
                { label: "Clients fidélisés", value: "0", hint: "Aucun client enregistré" },
                { label: "Points distribués", value: "0", hint: "0 transaction en caisse" },
                { label: "Note Google", value: "—", hint: "Fiche non connectée" },
                { label: "Score diagnostic", value: "—", hint: "En attente du premier audit" },
              ]),
        ]}
      />

      {topAction && <RecommendedActionCard action={topAction} highlighted />}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TrendChart
          className="xl:col-span-2"
          title="Passages en caisse"
          description="Scans QR validés par votre équipe"
          data={demo ? demoTrend().map(({ date, visits }) => ({ date, visits })) : []}
          config={{ visits: { label: "Passages", color: "hsl(var(--chart-1))" } }}
          emptyDescription="Les passages apparaîtront dès le premier scan validé en caisse."
        />

        <Card className="flex flex-col">
          <CardHeader className="px-5 py-4">
            <CardTitle>Connexions</CardTitle>
            <CardDescription>Intégrations officielles du compte</CardDescription>
          </CardHeader>
          <IntegrationsOrbit />
          <CardContent className="flex-1 space-y-2 px-5 pb-5 pt-0">
            <ConnectorRow
              name="Google Business Profile"
              status={demo ? "connected" : "disconnected"}
              description={demo ? "Synchronisé il y a 12 min" : undefined}
              icon={MapPin}
              action={connectLink("/dashboard/channels", demo ? "Gérer" : "Connecter")}
            />
            <ConnectorRow
              name="Instagram & Facebook"
              status={demo ? "connected" : "disconnected"}
              description={demo ? "2 comptes connectés" : undefined}
              icon={Facebook}
              action={connectLink("/dashboard/channels", demo ? "Gérer" : "Connecter")}
            />
            <ConnectorRow
              name="Brevo (emails)"
              status={demo ? "connected" : "disconnected"}
              description={demo ? "Expéditeur vérifié" : "Non configuré"}
              icon={Mail}
              action={connectLink("/dashboard/automations", demo ? "Gérer" : "Configurer")}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 py-4">
          <div>
            <CardTitle>Derniers avis Google</CardTitle>
            <CardDescription>Synchronisés dès la connexion de votre fiche</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
            <Link href="/dashboard/reviews">
              Tous les avis
              <ChevronRight />
            </Link>
          </Button>
        </CardHeader>
        {demo ? (
          <ul className="divide-y border-t">
            {demoReviews.slice(0, 3).map((r) => (
              <ReviewItem key={r.id} review={r} />
            ))}
          </ul>
        ) : (
        <EmptyState
          variant="bare"
          icon={MessageSquareOff}
          title="Aucun avis synchronisé"
          description="Connectez votre fiche Google Business Profile pour rapatrier vos avis et y répondre avec des modèles."
          actionLabel="Connecter Google Business"
          actionHref="/dashboard/channels"
          className="border-t py-10"
        />
        )}
      </Card>
    </div>
  );
}
