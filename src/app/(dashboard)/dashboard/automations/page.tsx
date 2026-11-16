import { Ban, Mail, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { ConnectorRow } from "@/components/shared/connector-row";
import { MetricStrip } from "@/components/shared/metric-strip";
import { TableCard } from "@/components/shared/table-card";
import { FeatureList } from "@/components/shared/feature-list";

import { getDashboardContext } from "@/features/organizations/dashboard-context";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusPill } from "@/components/shared/data-cells";
import { demoKpis, demoSends, frDateTime } from "@/features/demo/demo-data";

export const metadata = { title: "Relances automatiques — LocalBoost" };

const RULES = [
  {
    name: "Relance d'inactivité",
    trigger: "Aucune transaction depuis N jours",
    detail: "Seuil paramétrable par secteur (ex. 30 jours pour un coiffeur, plus court pour un café).",
  },
  {
    name: "Récompense à portée",
    trigger: "Solde proche d'un palier",
    detail: "Prévient le client qu'il lui manque peu de points pour sa récompense.",
  },
];

export default async function AutomationsPage() {
  const { demo } = await getDashboardContext();
  const sends = demo ? demoSends : [];
  const sendTone = (s: string) => (s === "Rebond" ? "destructive" : s === "Cliqué" ? "success" : s === "Ouvert" ? "primary" : "neutral") as "destructive" | "success" | "primary" | "neutral";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Relances automatiques"
        description="Détection des clients inactifs et envois conformes au RGPD, uniquement aux clients ayant consenti."
      />

      <MetricStrip
        metrics={[
          { label: "Relances envoyées", value: demo ? String(demoKpis.remindersSent30d) : "0", hint: "30 derniers jours" },
          { label: "Clients réactivés", value: demo ? String(demoKpis.reactivated30d) : "0", hint: "Revenus après relance" },
          { label: "Désinscriptions", value: demo ? String(demoKpis.unsubscribed) : "0", hint: "Liste d'opposition" },
          { label: "Inactifs détectés", value: demo ? String(demoKpis.inactive) : "0", hint: "Plus de 30 jours" },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardHeader className="px-5 py-4">
              <CardTitle>Scénarios</CardTitle>
              <CardDescription>Règles déterministes, évaluées chaque nuit</CardDescription>
            </CardHeader>
            <CardContent className="divide-y border-t p-0">
              {RULES.map((r) => (
                <div key={r.name} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{r.name}</p>
                      {demo ? <Badge variant="success">Actif</Badge> : <Badge variant="secondary">Inactif</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Déclencheur : </span>
                      {r.trigger}. {r.detail}
                    </p>
                  </div>
                  <PendingAction phase="Phase 3" variant="outline" className="shrink-0">
                    Activer
                  </PendingAction>
                </div>
              ))}
            </CardContent>
          </Card>

          <TableCard
            title="Historique des envois"
            columns={["Date", "Client", "Scénario", "Statut Brevo"]}
            isEmpty={sends.length === 0}
            empty={{
              icon: Mail,
              title: "Aucun envoi",
              description: "Chaque email transactionnel ou marketing envoyé via Brevo sera journalisé ici.",
            }}
          >
            {sends.map((x) => (
              <TableRow key={x.id}>
                <TableCell className="whitespace-nowrap text-muted-foreground">{frDateTime(x.date)}</TableCell>
                <TableCell className="font-medium">{x.customer}</TableCell>
                <TableCell>{x.scenario}</TableCell>
                <TableCell>
                  <StatusPill tone={sendTone(x.status)}>{x.status}</StatusPill>
                </TableCell>
              </TableRow>
            ))}
          </TableCard>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="px-5 py-4">
              <CardTitle>Expéditeur email</CardTitle>
              <CardDescription>Envois via l&apos;API officielle Brevo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-5 pb-5 pt-0">
              <ConnectorRow
                name="Brevo"
                status={demo ? "connected" : "disconnected"}
                description={demo ? "Expéditeur bonjour@maison-lefevre.fr vérifié" : "Non configuré"}
                icon={Mail}
              />
              <PendingAction phase="Phase 3" variant="outline" className="w-full">
                Configurer Brevo
              </PendingAction>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-5 py-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" aria-hidden />
                <CardTitle>Conformité</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0">
              <FeatureList
                items={[
                  { title: "Opt-in marketing séparé", description: "Distinct de l'adhésion au programme de fidélité." },
                  { icon: Ban, title: "Désinscription en 1 clic", description: "Présente dans chaque email commercial." },
                  { title: "Liste d'opposition persistante", description: "Bounces et désinscriptions synchronisés depuis Brevo." },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
