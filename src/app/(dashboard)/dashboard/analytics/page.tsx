import { FileDown, Gift, MousePointerClick, Percent, QrCode, Send, TicketPercent } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { MetricStrip } from "@/components/shared/metric-strip";
import { TrendChart } from "@/components/charts/trend-chart";

import { isDemoMode } from "@/features/demo/demo-mode";
import { demoKpis, demoTrend, frNumber } from "@/features/demo/demo-data";

export const metadata = { title: "Analytics" };

export default async function AnalyticsPage() {
  // Seul le mode démo est utile ici : lecture du cookie, sans aller-retour Supabase (session vérifiée par le middleware).
  const demo = await isDemoMode();
  const k = demoKpis;
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Des indicateurs calculés uniquement à partir de vos transactions et envois réels. Aucun chiffre estimé."
        actions={
          <PendingAction phase="Phase 4" variant="outline">
            <FileDown className="h-4 w-4" />
            Rapport mensuel PDF
          </PendingAction>
        }
      />

      <section aria-labelledby="loyalty-kpis" className="space-y-3">
        <h2 id="loyalty-kpis" className="font-display text-base font-semibold">
          Fidélisation
        </h2>
        <MetricStrip
          metrics={[
            { label: "Clients uniques", value: demo ? frNumber(k.uniqueCustomers30d) : "0", hint: "30 derniers jours" },
            { label: "Nouveaux clients", value: demo ? String(k.newCustomers30d) : "0", hint: "30 derniers jours" },
            { label: "Taux de récurrence", value: demo ? `${k.recurrenceRate} %` : "—", hint: demo ? "Clients revenus au moins 2 fois" : "Calculable dès 2 passages" },
            { label: "Récompenses échangées", value: demo ? String(k.rewardsRedeemed) : "0", hint: "30 derniers jours" },
          ]}
        />
      </section>

      <TrendChart
        title="Fréquentation"
        description="Passages validés et nouveaux clients par jour"
        data={demo ? demoTrend() : []}
        config={{
          visits: { label: "Passages", color: "hsl(var(--chart-1))" },
          newCustomers: { label: "Nouveaux clients", color: "hsl(var(--chart-2))" },
        }}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="px-5 py-4">
            <CardTitle>Performance des campagnes</CardTitle>
            <CardDescription>Données de délivrabilité Brevo et codes saisis en caisse</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
            {[
              { label: "Emails délivrés", value: demo ? frNumber(k.emailsDelivered) : "0", icon: Send },
              { label: "Taux de clic", value: demo ? "6,4 %" : "—", icon: MousePointerClick },
              { label: "Codes utilisés", value: demo ? String(k.codesUsed) : "0", icon: TicketPercent },
              { label: "Taux de conversion", value: demo ? "4,0 %" : "—", icon: Percent },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-card p-3.5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  <p className="text-xs font-medium">{label}</p>
                </div>
                <p className="mt-1.5 font-display text-xl font-bold tabular-nums">{value}</p>
              </div>
            ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-5 py-4">
            <CardTitle>Points de fidélité</CardTitle>
            <CardDescription>Émis vs. consommés sur la période</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
            {[
              { label: "Points émis", value: demo ? frNumber(k.pointsDistributed) : "0", icon: QrCode },
              { label: "Points consommés", value: demo ? frNumber(k.pointsRedeemed) : "0", icon: Gift },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-card p-3.5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  <p className="text-xs font-medium">{label}</p>
                </div>
                <p className="mt-1.5 font-display text-xl font-bold tabular-nums">{value}</p>
              </div>
            ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Le solde en circulation représente votre engagement envers vos clients : il est suivi pour éviter les
              surprises lors des échanges.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
