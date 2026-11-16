import { Globe, MapPin, Play, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { ConnectorRow } from "@/components/shared/connector-row";
import { getDashboardContext } from "@/features/organizations/dashboard-context";

export const metadata = { title: "Diagnostic marketing — LocalBoost" };

/** Axes et critères du Module 7 (docs/PRODUCT.md). Évaluation déterministe, aucun score inventé. */
const AXES = [
  {
    name: "Google Business Profile",
    source: "Google Business Profile API",
    icon: MapPin,
    criteria: ["Complétude de la fiche", "Horaires renseignés", "Photos", "Note moyenne", "Taux de réponse aux avis"],
  },
  {
    name: "Site internet",
    source: "Google PageSpeed Insights",
    icon: Globe,
    criteria: ["Performance", "Expérience mobile", "SEO technique", "Accessibilité"],
  },
  {
    name: "Présence sociale",
    source: "Meta Graph API",
    icon: Share2,
    criteria: ["Rythme de publication", "Régularité"],
  },
];

export default async function DiagnosticPage() {
  const { establishments } = await getDashboardContext();
  const websiteUrl = establishments.find((e) => e.website_url)?.website_url ?? null;
  const score: number | null = null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Diagnostic marketing"
        description="Un score sur 100 calculé par règles explicites à partir de sources officielles. Chaque point perdu est justifié."
        actions={
          <PendingAction phase="Phase 4">
            <Play />
            Lancer l&apos;audit
          </PendingAction>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="flex flex-col justify-between p-5 lg:col-span-2">
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-13 text-muted-foreground">Score global</p>
              <Badge variant="secondary">Non évalué</Badge>
            </div>
            <p className="mt-3 flex items-baseline gap-1.5 font-display tabular-nums">
              {score === null ? (
                <span className="text-4xl font-semibold leading-none tracking-[-0.03em] text-muted-foreground/70">
                  Pas encore de score
                </span>
              ) : (
                <>
                  <span className="text-6xl font-semibold leading-none tracking-[-0.04em]">{score}</span>
                  <span className="text-lg font-medium text-muted-foreground">/ 100</span>
                </>
              )}
            </p>
          </div>
          <div className="mt-8">
            {/* Jauge segmentée par axe : vide tant qu'aucun axe n'est évalué */}
            <div className="flex gap-1" aria-hidden>
              {AXES.map((a) => (
                <span key={a.name} className="h-1.5 flex-1 rounded-full bg-muted" />
              ))}
            </div>
            <p className="mt-3 text-13 text-muted-foreground">
              Le premier audit nécessite au moins une source connectée : fiche Google ou URL de site.
            </p>
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="px-5 py-4">
            <CardTitle>Sources du diagnostic</CardTitle>
            <CardDescription>Le score n&apos;est calculé que sur les axes dont la source est disponible</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 px-5 pb-5 pt-0">
            <ConnectorRow name="Google Business Profile" status="disconnected" icon={MapPin} />
            <ConnectorRow
              name="Site internet (PageSpeed Insights)"
              status={websiteUrl ? "connected" : "disconnected"}
              description={websiteUrl ?? "Aucune URL renseignée sur vos établissements"}
              icon={Globe}
            />
            <ConnectorRow name="Instagram & Facebook" status="disconnected" icon={Share2} />
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="px-5 py-4">
          <CardTitle>Grille d&apos;évaluation</CardTitle>
          <CardDescription>11 critères répartis sur 3 axes</CardDescription>
        </CardHeader>
        <div className="grid gap-px border-t bg-border lg:grid-cols-3">
          {AXES.map(({ name, source, icon: Icon, criteria }) => (
            <section key={name} className="bg-card p-5" aria-label={name}>
              <div className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                <h3 className="text-13 font-semibold">{name}</h3>
              </div>
              <p className="mt-0.5 pl-[1.625rem] text-2xs text-muted-foreground">{source}</p>
              <ul className="mt-4 space-y-2.5">
                {criteria.map((c) => (
                  <li key={c} className="flex items-center justify-between gap-3 text-13">
                    <span>{c}</span>
                    <span className="text-2xs text-muted-foreground">Non évalué</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Card>
    </div>
  );
}
