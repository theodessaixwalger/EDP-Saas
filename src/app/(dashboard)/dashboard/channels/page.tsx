import { Download, Facebook, Instagram, ListOrdered, MapPin, RefreshCcw, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { TableCard } from "@/components/shared/table-card";
import { FeatureList } from "@/components/shared/feature-list";

import { isDemoMode } from "@/features/demo/demo-mode";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusPill } from "@/components/shared/data-cells";
import { demoQueue, frDateTime } from "@/features/demo/demo-data";

export const metadata = { title: "Réseaux connectés" };

const CONNECTORS = [
  {
    name: "Google Business Profile",
    api: "Google Business Profile API",
    icon: MapPin,
    enables: ["Avis", "Réponses officielles", "Publications Google", "Diagnostic de fiche"],
  },
  {
    name: "Page Facebook",
    api: "Meta Graph API",
    icon: Facebook,
    enables: ["Publication programmée", "Statistiques de portée"],
  },
  {
    name: "Compte Instagram Business",
    api: "Instagram Graph API",
    icon: Instagram,
    enables: ["Publication programmée", "Régularité de publication"],
  },
];

export default async function ChannelsPage() {
  // Seul le mode démo est utile ici : lecture du cookie, sans aller-retour Supabase (session vérifiée par le middleware).
  const demo = await isDemoMode();
  const queue = demo ? demoQueue : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Réseaux connectés"
        description="Connexions OAuth 2.0 officielles uniquement. Vos identifiants ne transitent jamais par LocalBoost."
      />

      <Card className="overflow-hidden">
        <CardHeader className="px-5 py-4">
          <CardTitle>Comptes</CardTitle>
          <CardDescription>
            {demo ? CONNECTORS.length : 0} compte{demo ? "s" : ""} connecté{demo ? "s" : ""} sur {CONNECTORS.length}
          </CardDescription>
        </CardHeader>
        <ul className="divide-y border-t">
          {CONNECTORS.map(({ name, api, icon: Icon, enables }) => (
            <li key={name} className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-card text-foreground shadow-raised dark:shadow-none">
                  <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{name}</p>
                    {demo ? (
                      <StatusPill tone="success">Connecté</StatusPill>
                    ) : (
                      <Badge variant="outline" className="gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" aria-hidden />
                        Non connecté
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-13 text-muted-foreground">
                    {api} · {enables.join(", ")}
                  </p>
                </div>
              </div>
              <PendingAction phase="Phase 5" variant="outline" className="shrink-0 self-start md:self-center">
                {demo ? "Gérer" : "Connecter"}
              </PendingAction>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TableCard
          className="xl:col-span-2"
          title="File de publication"
          description="Envois en attente, en cours ou en échec"
          columns={["Publication", "Réseau", "Prévu le", "Tentatives", "État"]}
          isEmpty={queue.length === 0}
          empty={{
            icon: ListOrdered,
            title: "File vide",
            description: "Les publications programmées entreront dans la file à leur date d'envoi.",
          }}
        >
          {queue.map((q) => (
            <TableRow key={q.id}>
              <TableCell className="font-medium">{q.title}</TableCell>
              <TableCell className="text-muted-foreground">{q.channel}</TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">{frDateTime(q.date)}</TableCell>
              <TableCell className="tabular-nums">{q.attempts}</TableCell>
              <TableCell>
                <StatusPill tone={q.state.startsWith("Échec") ? "destructive" : "primary"}>{q.state}</StatusPill>
              </TableCell>
            </TableRow>
          ))}
        </TableCard>

        <Card className="h-fit">
          <CardHeader className="px-5 py-4">
            <CardTitle>Fiabilité des envois</CardTitle>
            <CardDescription>Si une API est indisponible</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <FeatureList
              items={[
                {
                  icon: RefreshCcw,
                  title: "Relance exponentielle",
                  description: "Les erreurs transitoires sont retentées avec un délai croissant.",
                },
                {
                  icon: Download,
                  title: "Mode manuel de secours",
                  description: "En cas d'échec définitif, le contenu est préparé pour un export manuel et vous êtes notifié.",
                },
                {
                  icon: ShieldCheck,
                  title: "Aucun scraping",
                  description: "Uniquement les APIs officielles Google et Meta, journalisées.",
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
