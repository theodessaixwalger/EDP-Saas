import { CalendarRange, CheckCircle2, CloudSun, TrendingDown, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/shared/page-header";
import { ConnectorRow } from "@/components/shared/connector-row";
import { getDashboardContext } from "@/features/organizations/dashboard-context";
import { currentSetupSignals, evaluateSetupRules } from "@/features/marketing-actions/setup-rules";
import { RecommendedActionCard } from "@/features/marketing-actions/recommended-action-card";

export const metadata = { title: "Plan d'actions — LocalBoost" };

/** Familles de règles du Module 4 (docs/PRODUCT.md) et leur disponibilité. */
const RULE_FAMILIES = [
  { family: "Mise en route du compte", source: "État du compte LocalBoost", status: "active" as const },
  { family: "Conditions météo", source: "Open-Meteo", status: "Phase 3" },
  { family: "Vacances scolaires & calendrier", source: "Calendrier officiel", status: "Phase 3" },
  { family: "Baisse de fréquentation", source: "Transactions de fidélité", status: "Phase 3" },
  { family: "Jours creux", source: "Transactions de fidélité", status: "Phase 3" },
];

export default async function ActionsPage() {
  const { establishments } = await getDashboardContext();
  const actions = evaluateSetupRules(currentSetupSignals(establishments.length));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plan d'actions"
        description="Des recommandations concrètes issues de règles explicites : chaque suggestion affiche sa règle et sa justification."
      />

      <section aria-labelledby="todo-title" className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 id="todo-title" className="font-display text-base font-semibold">
            Recommandations du moment
          </h2>
          <Badge variant="secondary">{actions.length}</Badge>
        </div>
        {actions.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="Rien à signaler"
            description="Aucune règle ne se déclenche avec les données actuelles."
          />
        ) : (
          <div className="space-y-3">
            {actions.map((action, i) => (
              <RecommendedActionCard key={action.code} action={action} highlighted={i === 0} />
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader className="px-5 py-4">
            <CardTitle>Catalogue de règles</CardTitle>
            <CardDescription>Moteur 100 % déterministe, auditable et reproductible</CardDescription>
          </CardHeader>
          <div className="border-t">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Famille de règles</TableHead>
                  <TableHead>Source de signal</TableHead>
                  <TableHead className="text-right">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RULE_FAMILIES.map((r) => (
                  <TableRow key={r.family}>
                    <TableCell className="font-medium">{r.family}</TableCell>
                    <TableCell className="text-muted-foreground">{r.source}</TableCell>
                    <TableCell className="text-right">
                      {r.status === "active" ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="outline">{r.status}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="h-fit">
          <CardHeader className="px-5 py-4">
            <CardTitle>Sources de signaux</CardTitle>
            <CardDescription>Données externes consultées par le moteur</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 px-5 pb-5 pt-0">
            <ConnectorRow name="Météo (Open-Meteo)" status="disconnected" description="Prévu en Phase 3" icon={CloudSun} />
            <ConnectorRow name="Calendrier scolaire" status="disconnected" description="Prévu en Phase 3" icon={CalendarRange} />
            <ConnectorRow name="Fréquentation" status="disconnected" description="Requiert la fidélité (Phase 2)" icon={TrendingDown} />
            <ConnectorRow
              name="Établissements"
              status="connected"
              description={`${establishments.length} enregistré${establishments.length > 1 ? "s" : ""}`}
              icon={Users}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
