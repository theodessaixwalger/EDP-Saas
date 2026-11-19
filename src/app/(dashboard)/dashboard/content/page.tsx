import Link from "next/link";
import { CalendarDays, FileText, ImageIcon, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableCell, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { TableCard } from "@/components/shared/table-card";
import { MetricStrip, type MetricTone } from "@/components/shared/metric-strip";
import { ChannelIcons, Initials, StatusPill, type PillTone } from "@/components/shared/data-cells";
import { isDemoMode } from "@/features/demo/demo-mode";
import { demoContents, demoMedia, frDateTime, type DemoContentStatus } from "@/features/demo/demo-data";

export const metadata = { title: "Contenus" };

/** Statuts du Module 1 (cf. docs/PRODUCT.md). */
const STATUSES = [
  { key: "draft", label: "Brouillon", tone: "neutral", pill: "neutral" },
  { key: "review", label: "À valider", tone: "warning", pill: "warning" },
  { key: "approved", label: "Validé", tone: "info", pill: "primary" },
  { key: "scheduled", label: "Programmé", tone: "primary", pill: "primary" },
  { key: "published", label: "Publié", tone: "success", pill: "success" },
  { key: "failed", label: "Échec", tone: "destructive", pill: "destructive" },
] as const satisfies ReadonlyArray<{ key: DemoContentStatus; label: string; tone: MetricTone; pill: PillTone }>;

export default async function ContentPage() {
  // Seul le mode démo est utile ici : lecture du cookie, sans aller-retour Supabase (session vérifiée par le middleware).
  const demo = await isDemoMode();
  // Table `contents` livrée en Phase 2 : vide hors mode démo.
  const contents = demo ? demoContents : [];
  const media = demo ? demoMedia : [];
  const countBy = (key: DemoContentStatus) => contents.filter((c) => c.status === key).length;
  const statusOf = (key: DemoContentStatus) => STATUSES.find((s) => s.key === key)!;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contenus"
        description="Rédigez, faites valider et programmez vos publications. Chaque changement de statut est historisé."
        actions={
          <>
            <Button size="sm" variant="outline" asChild>
              <Link href="/dashboard/calendar">
                <CalendarDays className="h-4 w-4" />
                Voir le calendrier
              </Link>
            </Button>
            <PendingAction phase="Phase 2">
              <Plus className="h-4 w-4" />
              Nouvelle publication
            </PendingAction>
          </>
        }
      />

      <MetricStrip metrics={STATUSES.map((s) => ({ label: s.label, value: String(countBy(s.key)), tone: s.tone }))} />

      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">
            <FileText /> Publications
          </TabsTrigger>
          <TabsTrigger value="media">
            <ImageIcon /> Médiathèque
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <TableCard
            title="Publications"
            description="Tous statuts confondus, triées par date prévue"
            columns={["Titre", "Canaux", "Statut", "Date prévue", "Auteur"]}
            isEmpty={contents.length === 0}
            empty={{
              icon: FileText,
              title: "Aucune publication",
              description:
                "Vos brouillons, contenus à valider et publications programmées s'afficheront ici avec leur historique de statut.",
            }}
          >
            {contents.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.title}</TableCell>
                <TableCell>
                  <ChannelIcons channels={c.channels} />
                </TableCell>
                <TableCell>
                  <StatusPill tone={statusOf(c.status).pill}>{statusOf(c.status).label}</StatusPill>
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">{frDateTime(c.date)}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <Initials name={c.author} className="h-6 w-6 text-[10px]" />
                    {c.author}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableCard>
        </TabsContent>

        <TabsContent value="media">
          {media.length === 0 ? (
            <EmptyState
              icon={Upload}
              title="Médiathèque vide"
              description="Photos et vidéos importées pour vos publications, stockées par établissement dans Supabase Storage."
            >
              <PendingAction phase="Phase 2" variant="outline">
                <Upload className="h-4 w-4" />
                Importer des médias
              </PendingAction>
            </EmptyState>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {media.map((m, i) => (
                <Card key={m.id} className="overflow-hidden">
                  <div
                    className="flex aspect-[4/3] items-center justify-center bg-muted text-muted-foreground"
                    style={{ backgroundColor: `hsl(var(--chart-${(i % 5) + 1}) / 0.14)` }}
                  >
                    <ImageIcon className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="truncate text-13 font-medium">{m.name}</p>
                    <p className="text-2xs text-muted-foreground">{m.kind}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
