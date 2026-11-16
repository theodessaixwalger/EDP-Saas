"use client";

/**
 * Graphique de tendance à période sélectionnable.
 * Adapté de Atlas shadcn/chart-area-interactive (shadcn/ui, MIT — Copyright (c) 2023 shadcn) :
 * données passées en props (aucun jeu de démonstration), libellés FR,
 * état vide explicite quand la source ne renvoie aucune donnée.
 */

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { LineChart } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatedGridPattern } from "@/components/effects/animated-grid-pattern";

export interface TrendPoint {
  /** YYYY-MM-DD */
  date: string;
  [series: string]: number | string;
}

interface TrendChartProps {
  title: string;
  description?: string;
  data: TrendPoint[];
  config: ChartConfig;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

const RANGES = [
  { value: "90", label: "3 derniers mois" },
  { value: "30", label: "30 derniers jours" },
  { value: "7", label: "7 derniers jours" },
] as const;

const shortDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

export function TrendChart({
  title,
  description,
  data,
  config,
  emptyTitle = "Aucune donnée sur la période",
  emptyDescription = "Les points apparaîtront dès les premières transactions enregistrées.",
  className,
}: TrendChartProps) {
  const [range, setRange] = React.useState<string>("30");
  const seriesKeys = Object.keys(config);

  const filtered = React.useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - Number(range));
    return data.filter((point) => new Date(`${point.date}T00:00:00`) >= start);
  }, [data, range]);

  const isEmpty = filtered.length === 0;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col gap-3 space-y-0 border-b px-5 py-4 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-full rounded-lg sm:ml-auto sm:w-[170px]" aria-label="Période affichée">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {RANGES.map((r) => (
              <SelectItem key={r.value} value={r.value} className="rounded-lg">
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="relative px-2 pt-4 sm:px-5 sm:pt-5">
        {isEmpty ? (
          <div className="relative isolate h-[240px] w-full overflow-hidden rounded-lg">
            {/* Grille animée : la structure du graphique, sans valeur inventée */}
            <AnimatedGridPattern
              width={40}
              height={40}
              numSquares={16}
              className="-z-10 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_75%)]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border bg-card text-foreground shadow-raised dark:shadow-none">
                <LineChart className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden />
              </span>
              <p className="font-display text-base font-semibold text-foreground">{emptyTitle}</p>
              <p className="mt-1 max-w-xs text-13 text-muted-foreground">{emptyDescription}</p>
            </div>
          </div>
        ) : (
          <ChartContainer config={config} className="aspect-auto h-[240px] w-full">
            <AreaChart data={filtered} margin={{ left: 0, right: 8 }}>
              <CartesianGrid vertical={false} />
              <YAxis tickLine={false} axisLine={false} width={32} allowDecimals={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={shortDate}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent labelFormatter={(v) => shortDate(String(v))} indicator="dot" />}
              />
              {seriesKeys.map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="monotone"
                  fill={`var(--color-${key})`}
                  fillOpacity={0.12}
                  stroke={`var(--color-${key})`}
                  strokeWidth={2}
                />
              ))}
              {seriesKeys.length > 1 && <ChartLegend content={<ChartLegendContent />} />}
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
