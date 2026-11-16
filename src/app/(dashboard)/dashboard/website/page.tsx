import { Code2, FileSearch, Globe, Map as MapIcon, Share2, Smartphone, Sparkles, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { FeatureList } from "@/components/shared/feature-list";
import { getDashboardContext } from "@/features/organizations/dashboard-context";

export const metadata = { title: "Site vitrine — LocalBoost" };

const SECTIONS = ["Accueil & accroche", "Horaires & coordonnées", "Carte d'accès", "Prestations / carte", "Avis clients", "Contact"];

export default async function WebsitePage() {
  const { organization, establishments } = await getDashboardContext();
  const slug = establishments[0]?.slug ?? organization.slug;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site vitrine"
        description="Un site local ultra-rapide, optimisé pour le référencement de proximité et mis à jour depuis vos données."
        actions={
          <PendingAction phase="Phase 7">
            <Sparkles className="h-4 w-4" />
            Créer mon site
          </PendingAction>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Aperçu d'adresse */}
        <Card className="overflow-hidden lg:col-span-3">
          <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            </span>
            <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Globe className="h-3 w-3 shrink-0" aria-hidden />
              <span className="truncate">{slug}.localboost.app</span>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-semibold">Site non publié</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Adresse réservée à la publication. Un domaine personnalisé pourra y être relié.
                </p>
              </div>
              <Badge variant="secondary">Brouillon</Badge>
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Sections générées depuis votre fiche établissement
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SECTIONS.map((s) => (
                <div key={s} className="rounded-lg border border-dashed px-3 py-3 text-sm text-muted-foreground">
                  {s}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="px-5 py-4">
            <CardTitle>SEO local inclus</CardTitle>
            <CardDescription>Généré automatiquement, sans configuration</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <FeatureList
              items={[
                { icon: Code2, title: "Schema.org LocalBusiness", description: "Données structurées : adresse, horaires, géolocalisation." },
                { icon: MapIcon, title: "Sitemap XML", description: "Soumis aux moteurs de recherche à chaque mise à jour." },
                { icon: FileSearch, title: "Balises meta optimisées", description: "Titre et description intégrant votre ville et votre métier." },
                { icon: Share2, title: "OpenGraph", description: "Aperçu soigné lors des partages sur les réseaux." },
                { icon: Smartphone, title: "Mobile d'abord", description: "Modèles sectoriels responsives et légers." },
                { icon: Link2, title: "Domaine personnalisé", description: "Ou sous-domaine localboost.app offert." },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
