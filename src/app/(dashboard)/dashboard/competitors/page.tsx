import { MapPinned, Plus, ShieldCheck, Star, TrendingUp, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { TableCard } from "@/components/shared/table-card";
import { FeatureList } from "@/components/shared/feature-list";

export const metadata = { title: "Concurrents — LocalBoost" };

export default function CompetitorsPage() {
  const competitors: never[] = [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Veille concurrentielle"
        description="Comparez votre note et votre volume d'avis à ceux des commerces voisins de même catégorie."
        actions={
          <PendingAction phase="Phase 4">
            <Plus className="h-4 w-4" />
            Ajouter un concurrent
          </PendingAction>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TableCard
          className="xl:col-span-2"
          title="Comparatif local"
          description="Mis à jour quotidiennement"
          columns={["Commerce", "Note", "Avis", "Évolution 30 j", "Distance"]}
          isEmpty={competitors.length === 0}
          empty={{
            icon: MapPinned,
            title: "Aucun concurrent suivi",
            description:
              "Recherchez les commerces proches via Google Places : leur note et leur volume d'avis seront suivis dans le temps.",
          }}
        />

        <Card className="h-fit">
          <CardHeader className="px-5 py-4">
            <CardTitle>Méthodologie</CardTitle>
            <CardDescription>Ce qui est comparé, et d&apos;où viennent les données</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <FeatureList
              items={[
                { icon: Star, title: "Note moyenne", description: "Telle que publiée sur Google." },
                { icon: MessageSquare, title: "Volume d'avis", description: "Nombre total et rythme de nouveaux avis." },
                { icon: TrendingUp, title: "Dynamique", description: "Écart sur 30 jours, calculé à partir de nos relevés." },
                {
                  icon: ShieldCheck,
                  title: "Google Places API uniquement",
                  description: "Aucun scraping : uniquement des données publiques officielles.",
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
