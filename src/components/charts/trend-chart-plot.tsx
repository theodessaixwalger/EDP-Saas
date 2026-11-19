"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { TrendPoint } from "./trend-chart";

const shortDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

/** Tracé Recharts du graphique de tendance (chargé à la demande par TrendChart). */
export function TrendChartPlot({ data: filtered, config }: { data: TrendPoint[]; config: ChartConfig }) {
  const seriesKeys = Object.keys(config);
  return (
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
  );
}
