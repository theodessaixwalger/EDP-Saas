import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { EditorialCalendar, type EditorialEvent } from "@/features/calendar/editorial-calendar";
import { getDashboardContext } from "@/features/organizations/dashboard-context";
import { demoCalendarEvents } from "@/features/demo/demo-data";

export const metadata = { title: "Calendrier éditorial — LocalBoost" };

export default async function CalendarPage() {
  const { demo } = await getDashboardContext();
  // Alimenté par les contenus au statut « Programmé » (table `contents`, Phase 2).
  const events: EditorialEvent[] = demo ? demoCalendarEvents : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendrier éditorial"
        description="Visualisez vos publications programmées par réseau, en vue mois, semaine, jour ou liste."
        actions={
          <Button size="sm" variant="outline" asChild>
            <Link href="/dashboard/content">
              <FileText className="h-4 w-4" />
              Gérer les contenus
            </Link>
          </Button>
        }
      />
      <EditorialCalendar events={events} />
    </div>
  );
}
