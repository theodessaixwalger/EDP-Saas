"use client";

import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import type { EventInput } from "@fullcalendar/core";
import { cn } from "@/lib/utils";

export type CalendarChannel = "instagram" | "facebook" | "google";

export interface EditorialEvent extends EventInput {
  id: string;
  title: string;
  start: string;
  channel: CalendarChannel;
}

const CHANNELS: Array<{ key: CalendarChannel; label: string; dot: string }> = [
  { key: "instagram", label: "Instagram", dot: "bg-chart-5" },
  { key: "facebook", label: "Facebook", dot: "bg-chart-4" },
  { key: "google", label: "Google Business", dot: "bg-chart-2" },
];

/**
 * Calendrier éditorial (Module 2) — vues Mois / Semaine / Jour / Liste.
 * Les événements proviennent des contenus programmés ; le glisser-déposer
 * sera persisté côté serveur avec la table `contents` (Phase 2).
 */
export function EditorialCalendar({ events }: { events: EditorialEvent[] }) {
  const [active, setActive] = React.useState<Set<CalendarChannel>>(
    () => new Set(CHANNELS.map((c) => c.key))
  );

  const toggle = (key: CalendarChannel) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const visible = events.filter((e) => active.has(e.channel));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer par réseau">
        <span className="mr-1 text-sm text-muted-foreground">Réseaux :</span>
        {CHANNELS.map((c) => {
          const on = active.has(c.key);
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(c.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                on
                  ? "border-border bg-card text-foreground shadow-xs"
                  : "border-dashed border-border bg-transparent text-muted-foreground"
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", c.dot, !on && "opacity-30")} aria-hidden />
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border bg-card p-3 shadow-card sm:p-5">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          locale={frLocale}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          buttonText={{ today: "Aujourd'hui", month: "Mois", week: "Semaine", day: "Jour", list: "Liste" }}
          noEventsText="Aucune publication programmée sur cette période"
          events={visible}
          height="auto"
          dayMaxEvents={3}
          nowIndicator
          firstDay={1}
        />
      </div>
    </div>
  );
}
