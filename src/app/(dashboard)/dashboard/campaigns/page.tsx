import { CalendarHeart, Cake, Hand, Megaphone, RotateCcw, Zap, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { TableCard } from "@/components/shared/table-card";
import { SEGMENTS } from "@/features/customers/segments";

import { isDemoMode } from "@/features/demo/demo-mode";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusPill } from "@/components/shared/data-cells";
import { demoCampaigns, demoSegmentCounts } from "@/features/demo/demo-data";

export const metadata = { title: "Campagnes" };

/** Modèles préconfigurés du Module 5 (docs/PRODUCT.md). */
const TEMPLATES = [
  { name: "Bienvenue", icon: Hand, target: "Nouveaux", description: "Accueillez chaque nouveau membre avec une offre de premier retour." },
  { name: "Anniversaire", icon: Cake, target: "Date d'anniversaire", description: "Une attention personnalisée envoyée le mois de l'anniversaire." },
  { name: "Réactivation", icon: RotateCcw, target: "Inactifs", description: "Faites revenir les clients sans transaction depuis plus de 30 jours." },
  { name: "Offre saisonnière", icon: CalendarHeart, target: "Actifs", description: "Fêtes, rentrée, soldes : une offre calée sur le calendrier commercial." },
  { name: "Offre flash", icon: Zap, target: "Réguliers", description: "Une promotion courte pour remplir un créneau creux." },
];

export default async function CampaignsPage() {
  // Seul le mode démo est utile ici : lecture du cookie, sans aller-retour Supabase (session vérifiée par le middleware).
  const demo = await isDemoMode();
  const campaigns = demo ? demoCampaigns : [];
  const statusTone = (s: string) => (s === "En cours" ? "success" : s === "Programmée" ? "primary" : "neutral") as "success" | "primary" | "neutral";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campagnes & offres"
        description="Partez d'un modèle, ciblez un segment calculé automatiquement, mesurez les codes utilisés en caisse."
        actions={
          <PendingAction phase="Phase 3">
            <Plus className="h-4 w-4" />
            Nouvelle campagne
          </PendingAction>
        }
      />

      <Card className="overflow-hidden">
        <CardHeader className="px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle id="templates-title">Modèles prêts à l&apos;emploi</CardTitle>
              <CardDescription>Chaque modèle cible un segment calculé automatiquement</CardDescription>
            </div>
            <Badge variant="outline">Envoi disponible en Phase 3</Badge>
          </div>
        </CardHeader>
        <ul className="divide-y border-t" aria-labelledby="templates-title">
          {TEMPLATES.map(({ name, icon: Icon, target, description }) => (
            <li key={name} className="flex flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-13 font-semibold">{name}</p>
                <p className="text-13 text-muted-foreground">{description}</p>
              </div>
              <Badge variant="outline" className="w-fit shrink-0">
                {target}
              </Badge>
              <PendingAction phase="Phase 3" showPhase={false} variant="outline" className="shrink-0">
                Utiliser
              </PendingAction>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TableCard
          className="xl:col-span-2"
          title="Historique des campagnes"
          columns={["Campagne", "Segment", "Envoyés", "Clics", "Codes utilisés", "Statut"]}
          isEmpty={campaigns.length === 0}
          empty={{
            icon: Megaphone,
            title: "Aucune campagne envoyée",
            description: "Les performances (délivrabilité, clics, codes promo utilisés en caisse) s'afficheront ici.",
          }}
        >
          {campaigns.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell className="text-muted-foreground">{c.segment}</TableCell>
              <TableCell className="tabular-nums">{c.sent}</TableCell>
              <TableCell className="tabular-nums">{c.clicks}</TableCell>
              <TableCell className="tabular-nums">{c.codes}</TableCell>
              <TableCell>
                <StatusPill tone={statusTone(c.status)}>{c.status}</StatusPill>
              </TableCell>
            </TableRow>
          ))}
        </TableCard>

        <Card className="h-fit">
          <CardHeader className="px-5 py-4">
            <CardTitle>Segments disponibles</CardTitle>
            <CardDescription>Recalculés à chaque transaction</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <ul className="divide-y rounded-lg border">
              {SEGMENTS.map(({ key, label, rule, icon: Icon }) => (
                <li key={key} className="flex items-center gap-3 px-3 py-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="truncate text-xs text-muted-foreground">{rule}</p>
                  </div>
                  <span className="font-display text-sm font-semibold tabular-nums">{demo ? demoSegmentCounts[key] : 0}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
