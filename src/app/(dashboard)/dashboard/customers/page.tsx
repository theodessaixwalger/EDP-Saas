import { Contact, FileUp, ShieldCheck, UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { TableCard } from "@/components/shared/table-card";
import { FeatureList } from "@/components/shared/feature-list";
import { SEGMENTS } from "@/features/customers/segments";
import { MetricStrip } from "@/components/shared/metric-strip";
import { TableCell, TableRow } from "@/components/ui/table";
import { Initials, StatusPill } from "@/components/shared/data-cells";
import { getDashboardContext } from "@/features/organizations/dashboard-context";
import { demoCustomers, demoSegmentCounts, frDate } from "@/features/demo/demo-data";

export const metadata = { title: "Clients — LocalBoost" };

export default async function CustomersPage() {
  const { demo } = await getDashboardContext();
  // Fiches clients créées à l'inscription au programme de fidélité (table `customers`, Phase 2).
  const customers = demo ? demoCustomers : [];
  const segmentLabel = (key: string) => SEGMENTS.find((s) => s.key === key)?.label ?? key;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Fiches clients, historique de transactions et consentements, segmentés automatiquement."
        actions={
          <>
            <PendingAction phase="Phase 2" variant="outline">
              <FileUp className="h-4 w-4" />
              Importer
            </PendingAction>
            <PendingAction phase="Phase 2">
              <UserPlus className="h-4 w-4" />
              Ajouter un client
            </PendingAction>
          </>
        }
      />

      <MetricStrip
        metrics={SEGMENTS.map((s) => ({ label: s.label, value: demo ? String(demoSegmentCounts[s.key]) : "0", hint: s.rule }))}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TableCard
          className="xl:col-span-2"
          title="Fichier clients"
          description={demo ? "248 clients enregistrés · 7 plus récents" : "0 client enregistré"}
          columns={["Client", "Segment", "Points", "Dernier passage", "Email marketing"]}
          isEmpty={customers.length === 0}
          empty={{
            icon: Contact,
            title: "Aucun client pour le moment",
            description:
              "Vos clients apparaissent ici dès leur inscription au programme de fidélité, en boutique ou via le QR code.",
          }}
        >
          {customers.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <span className="flex items-center gap-2.5">
                  <Initials name={c.name} />
                  <span className="min-w-0">
                    <span className="block font-medium">{c.name}</span>
                    <span className="block text-2xs text-muted-foreground">{c.email}</span>
                  </span>
                </span>
              </TableCell>
              <TableCell>
                <StatusPill tone={c.segment === "inactive" ? "warning" : c.segment === "near_reward" ? "primary" : "neutral"}>
                  {segmentLabel(c.segment)}
                </StatusPill>
              </TableCell>
              <TableCell className="tabular-nums font-medium">{c.points}</TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">{frDate(c.lastVisit)}</TableCell>
              <TableCell>
                {c.marketing ? <StatusPill tone="success">Consenti</StatusPill> : <StatusPill tone="neutral">Non consenti</StatusPill>}
              </TableCell>
            </TableRow>
          ))}
        </TableCard>

        <Card className="h-fit">
          <CardHeader className="px-5 py-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" aria-hidden />
              <CardTitle>Consentements RGPD</CardTitle>
            </div>
            <CardDescription>Privacy by design, sur chaque fiche</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <FeatureList
              items={[
                {
                  title: "Fidélité ≠ prospection",
                  description: "L'adhésion au programme ne vaut jamais consentement aux emails commerciaux.",
                },
                {
                  title: "Traçabilité complète",
                  description: "Horodatage, canal de collecte, empreinte IP et version du texte accepté.",
                },
                {
                  title: "Liste d'opposition",
                  description: "Un client désinscrit n'est plus jamais sollicité, même après réimport.",
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
