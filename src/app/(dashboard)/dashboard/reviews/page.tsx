import Link from "next/link";
import { MessageSquareOff, Plus, LibraryBig } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { MetricStrip } from "@/components/shared/metric-strip";
import { isDemoMode } from "@/features/demo/demo-mode";
import { demoKpis, demoReviews, demoReviewTemplates } from "@/features/demo/demo-data";
import { ReviewItem, type ReviewItemData } from "@/features/reviews/review-item";

export const metadata = { title: "Avis clients" };

export default async function ReviewsPage() {
  // Seul le mode démo est utile ici : lecture du cookie, sans aller-retour Supabase (session vérifiée par le middleware).
  const demo = await isDemoMode();
  // Avis rapatriés via Google Business Profile API (Phase 4) : vides hors mode démo.
  const reviews: ReviewItemData[] = demo ? demoReviews : [];
  const templates = demo ? demoReviewTemplates : [];
  const unanswered = reviews.filter((r) => !r.replied);
  const answered = reviews.filter((r) => r.replied);
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

  const list = (items: ReviewItemData[]) =>
    reviews.length === 0 ? (
      emptyInbox
    ) : (
      <Card className="overflow-hidden">
        <ul className="divide-y">
          {[...items]
            .sort((a, b) => a.rating - b.rating)
            .map((r) => (
              <ReviewItem key={r.id} review={r} />
            ))}
        </ul>
      </Card>
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Avis clients"
        description="Centralisez vos avis Google, priorisez les plus sensibles et répondez avec vos modèles."
      />

      <MetricStrip
        metrics={[
          { label: "Note moyenne", value: demo ? "4,7" : "—", hint: demo ? "Sur 5, toutes fiches" : "Fiche non connectée" },
          { label: "Avis reçus", value: demo ? String(demoKpis.googleReviews) : "0", hint: "Tous établissements" },
          { label: "Sans réponse", value: String(unanswered.length), hint: "À traiter", tone: "warning" },
          { label: "Alertes 1 et 2 étoiles", value: String(alerts), hint: "Priorité haute", tone: "destructive" },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Tabs defaultValue="todo">
            <TabsList>
              <TabsTrigger value="todo">À traiter ({unanswered.length})</TabsTrigger>
              <TabsTrigger value="all">Tous ({reviews.length})</TabsTrigger>
              <TabsTrigger value="answered">Répondus ({answered.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="todo">{list(unanswered)}</TabsContent>
            <TabsContent value="all">{list(reviews)}</TabsContent>
            <TabsContent value="answered">{list(answered)}</TabsContent>
          </Tabs>
        </div>

        <Card className="h-fit">
          <CardHeader className="px-5 py-4">
            <CardTitle>Réponses types</CardTitle>
            <CardDescription>Modèles paramétrables par tonalité et par secteur</CardDescription>
          </CardHeader>
          {templates.length === 0 ? (
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
          ) : (
            <ul className="divide-y border-t">
              {templates.map((t) => (
                <li key={t.id} className="px-5 py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-13 font-semibold">{t.name}</p>
                    <Badge variant="outline">{t.tone}</Badge>
                  </div>
                  <p className="mt-1 text-13 text-muted-foreground">{t.text}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
