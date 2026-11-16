import Link from "next/link";
import { MessageSquareOff, Plus, LibraryBig } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { MetricStrip } from "@/components/shared/metric-strip";

export const metadata = { title: "Avis clients — LocalBoost" };

type Review = { id: string; rating: number; replied: boolean };

export default function ReviewsPage() {
  // Avis rapatriés via Google Business Profile API (Phase 4) — aucun avis fictif.
  const reviews: Review[] = [];
  const unanswered = reviews.filter((r) => !r.replied).length;
  const alerts = reviews.filter((r) => r.rating <= 2).length;

  const emptyInbox = (
    <EmptyState
      icon={MessageSquareOff}
      title="Aucun avis synchronisé"
      description="Connectez votre fiche Google : les avis 1 et 2 étoiles et ceux sans réponse remonteront en priorité."
    >
      <Button size="sm" asChild>
        <Link href="/dashboard/channels">Connecter Google Business</Link>
      </Button>
    </EmptyState>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Avis clients"
        description="Centralisez vos avis Google, priorisez les plus sensibles et répondez avec vos modèles."
      />

      <MetricStrip
        metrics={[
          { label: "Note moyenne", value: "—", hint: "Fiche non connectée" },
          { label: "Avis reçus", value: String(reviews.length), hint: "Tous établissements" },
          { label: "Sans réponse", value: String(unanswered), hint: "À traiter", tone: "warning" },
          { label: "Alertes 1 et 2 étoiles", value: String(alerts), hint: "Priorité haute", tone: "destructive" },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Tabs defaultValue="todo">
            <TabsList>
              <TabsTrigger value="todo">À traiter ({unanswered})</TabsTrigger>
              <TabsTrigger value="all">Tous ({reviews.length})</TabsTrigger>
              <TabsTrigger value="answered">Répondus ({reviews.length - unanswered})</TabsTrigger>
            </TabsList>
            <TabsContent value="todo">{emptyInbox}</TabsContent>
            <TabsContent value="all">{emptyInbox}</TabsContent>
            <TabsContent value="answered">{emptyInbox}</TabsContent>
          </Tabs>
        </div>

        <Card className="h-fit">
          <CardHeader className="px-5 py-4">
            <CardTitle>Réponses types</CardTitle>
            <CardDescription>Modèles paramétrables par tonalité et par secteur</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <EmptyState
              icon={LibraryBig}
              title="Aucun modèle"
              description="Créez des réponses réutilisables : remerciement, excuse, invitation à revenir."
              variant="bare"
              className="py-8"
            >
              <PendingAction phase="Phase 4" variant="outline">
                <Plus className="h-4 w-4" />
                Créer un modèle
              </PendingAction>
            </EmptyState>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
