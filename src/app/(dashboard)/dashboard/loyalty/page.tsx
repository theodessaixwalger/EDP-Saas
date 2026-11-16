import Link from "next/link";
import {
  Coins,
  ExternalLink,
  Footprints,
  Gift,
  History,
  KeyRound,
  ScanLine,
  ShieldCheck,
  Trophy,
  UserCheck,
  } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { MetricStrip } from "@/components/shared/metric-strip";
import { TableCard } from "@/components/shared/table-card";
import { FeatureList } from "@/components/shared/feature-list";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusPill } from "@/components/shared/data-cells";
import { getDashboardContext } from "@/features/organizations/dashboard-context";
import { demoKpis, demoRewards, demoTransactions, frDateTime, frNumber } from "@/features/demo/demo-data";
import { cn } from "@/lib/utils";

export const metadata = { title: "Fidélité QR — LocalBoost" };

const ACCRUAL_MODES = [
  {
    key: "spend",
    icon: Coins,
    title: "Au montant dépensé",
    rule: "1 € = 1 point",
    description: "Adapté aux paniers variables : boutiques, épiceries, restaurants.",
  },
  {
    key: "visit",
    icon: Footprints,
    title: "À la visite",
    rule: "1 passage = X points",
    description: "Adapté aux prestations récurrentes : coiffeurs, cafés, boulangeries.",
  },
];

export default async function LoyaltyPage() {
  const { demo } = await getDashboardContext();
  const transactions = demo ? demoTransactions : [];
  const rewards = demo ? demoRewards : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fidélité QR code"
        description="Programme sans application à télécharger, validé en caisse par votre équipe pour empêcher toute fraude."
        actions={
          <>
            <Button size="sm" variant="outline" asChild>
              <Link href="/fidelite/demo" target="_blank" rel="noopener">
                <ExternalLink className="h-4 w-4" />
                Aperçu portail client
              </Link>
            </Button>
            <PendingAction phase="Phase 2">
              <ScanLine className="h-4 w-4" />
              Ouvrir le scan employé
            </PendingAction>
          </>
        }
      />

      <MetricStrip
        metrics={[
          { label: "Membres", value: demo ? frNumber(demoKpis.loyalCustomers) : "0", hint: "Inscrits au programme" },
          { label: "Points distribués", value: demo ? frNumber(demoKpis.pointsDistributed) : "0", hint: "Depuis le lancement" },
          { label: "Récompenses échangées", value: demo ? String(demoKpis.rewardsRedeemed) : "0", hint: "Depuis le lancement" },
          { label: "Scans validés", value: demo ? frNumber(demoKpis.scans30d) : "0", hint: "30 derniers jours" },
        ]}
      />

      <Tabs defaultValue="program">
        <TabsList>
          <TabsTrigger value="program">Programme</TabsTrigger>
          <TabsTrigger value="rewards">Récompenses</TabsTrigger>
          <TabsTrigger value="history">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="program" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>Mode de cumul</CardTitle>
                    <CardDescription>Choisissez comment vos clients gagnent des points</CardDescription>
                  </div>
                  {demo ? <Badge variant="success">Au montant · actif</Badge> : <Badge variant="warning">Non configuré</Badge>}
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 p-5 pt-0 sm:grid-cols-2">
                {ACCRUAL_MODES.map(({ key, icon: Icon, title, rule, description }) => (
                  <div
                    key={key}
                    className={cn(
                      "rounded-xl border p-4",
                      demo && key === "spend" ? "border-primary bg-primary-soft/40 ring-1 ring-primary/30" : "border-dashed"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="font-mono text-xs text-muted-foreground">{rule}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{description}</p>
                  </div>
                ))}
                <div className="flex justify-end sm:col-span-2">
                  <PendingAction phase="Phase 2">Enregistrer le programme</PendingAction>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-success" aria-hidden />
                  <CardTitle>Anti-fraude</CardTitle>
                </div>
                <CardDescription>Garanties intégrées au scan</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <FeatureList
                  items={[
                    {
                      icon: UserCheck,
                      title: "Validation par un employé",
                      description: "Un QR code public seul ne crédite jamais de points.",
                    },
                    {
                      icon: KeyRound,
                      title: "Jeton à usage unique",
                      description: "Chaque scan génère un jeton qui expire après utilisation.",
                    },
                    {
                      icon: History,
                      title: "Journal d'audit",
                      description: "Qui a crédité quoi, quand, et dans quel établissement.",
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rewards">
          {rewards.length === 0 ? (
            <EmptyState
              icon={Trophy}
              title="Aucune récompense définie"
              description="Créez des paliers (ex. une boisson offerte) que vos clients débloquent avec leurs points."
            >
              <PendingAction phase="Phase 2">
                <Gift className="h-4 w-4" />
                Créer une récompense
              </PendingAction>
            </EmptyState>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {rewards.map((r) => (
                <Card key={r.id} className="p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Gift className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="mt-3 text-sm font-semibold">{r.name}</p>
                  <p className="mt-1 font-display text-2xl font-semibold tabular-nums tracking-[-0.03em]">
                    {r.cost} <span className="text-sm font-medium text-muted-foreground">points</span>
                  </p>
                  <p className="mt-1 text-2xs text-muted-foreground">{r.redeemed} échanges depuis le lancement</p>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <TableCard
            title="Transactions de fidélité"
            description="Crédits et échanges validés en caisse"
            columns={["Date", "Client", "Type", "Points", "Validé par", "Établissement"]}
            isEmpty={transactions.length === 0}
            empty={{
              icon: History,
              title: "Aucune transaction",
              description: "Chaque scan validé par un employé sera tracé ici.",
            }}
          >
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="whitespace-nowrap text-muted-foreground">{frDateTime(t.date)}</TableCell>
                <TableCell className="font-medium">{t.customer}</TableCell>
                <TableCell>
                  <StatusPill tone={t.type === "Crédit" ? "success" : "primary"}>{t.type}</StatusPill>
                </TableCell>
                <TableCell className={cn("tabular-nums font-medium", t.points < 0 && "text-muted-foreground")}>
                  {t.points > 0 ? `+${t.points}` : t.points}
                </TableCell>
                <TableCell>{t.staff}</TableCell>
                <TableCell className="text-muted-foreground">{t.establishment}</TableCell>
              </TableRow>
            ))}
          </TableCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
