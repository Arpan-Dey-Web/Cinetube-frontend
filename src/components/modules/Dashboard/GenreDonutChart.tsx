"use client";
import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { MOCK_GENRE_DATA } from "@/lib/mock-data";

// TODO: fetch from backend → GET /api/admin/analytics/genre-distribution

const chartConfig = {
  Drama: { label: "Drama", color: "var(--chart-1)" },
  Action: { label: "Action", color: "var(--chart-2)" },
  Comedy: { label: "Comedy", color: "var(--chart-3)" },
  "Sci-Fi": { label: "Sci-Fi", color: "var(--chart-4)" },
  Thriller: { label: "Thriller", color: "var(--chart-5)" },
};

export function GenreDonutChart() {
  return (
    <div className="p-6 border border-border bg-card/10 space-y-4">
      <div>
        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground">
          Genre Distribution
        </h3>
        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
          Breakdown of the archive by genre
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-56 w-full">
        <PieChart>
          <Pie
            data={MOCK_GENRE_DATA}
            dataKey="count"
            nameKey="genre"
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            paddingAngle={2}
          >
            {MOCK_GENRE_DATA.map((entry) => (
              <Cell key={entry.genre} fill={entry.fill} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent nameKey="genre" />} />
          <ChartLegend content={<ChartLegendContent nameKey="genre" />} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
