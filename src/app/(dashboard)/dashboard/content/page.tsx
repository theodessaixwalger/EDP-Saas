import Link from "next/link";
import {
  CalendarDays,
  FileText,
  ImageIcon,
  Plus,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { PendingAction } from "@/components/shared/pending-action";
import { TableCard } from "@/components/shared/table-card";
import { MetricStrip, type MetricTone } from "@/components/shared/metric-strip";

export const metadata = { title: "Contenus — LocalBoost" };

/** Statuts du Module 1 (cf. docs/PRODUCT.md). */
const STATUSES = [
  { key: "draft", label: "Brouillon", tone: "neutral" },
  { key: "review", label: "À valider", tone: "warning" },
  { key: "approved", label: "Validé", tone: "info" },
  { key: "scheduled", label: "Programmé", tone: "primary" },
  { key: "published", label: "Publié", tone: "success" },
  { key: "failed", label: "Échec", tone: "destructive" },
] as const satisfies ReadonlyArray<{ key: string; label: string; tone: MetricTone }>;

type ContentItem = {
  id: string;
  title: string;
  channels: string[];
  status: (typeof STATUSES)[number]["key"];
  scheduledAt: string | null;
  author: string;
};

export default function ContentPage() {
  // Table `contents` livrée en Phase 2 : aucune publication tant qu'elle n'existe pas.
  const contents: ContentItem[] = [];
  const countBy = (key: ContentItem["status"]) => contents.filter((c) => c.status === key).length;

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
          />
        </TabsContent>

        <TabsContent value="media">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
