"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MOCK_CHART_DATA } from "@/lib/mock-data";

// TODO: fetch from backend → GET /api/admin/analytics/reviews-by-month

const chartConfig = {
  reviews: {
    label: "Reviews",
    color: "var(--primary)",
  },
};

export function ActivityChart() {
  return (
    <div className="p-6 border border-border bg-card/10 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground">
            Review Activity
          </h3>
          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
            Reviews submitted per month
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black italic tracking-tighter text-primary">
            124.8K
          </p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
            Total
          </p>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-56 w-full">
        <BarChart data={MOCK_CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 9, fontWeight: 900, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fontWeight: 900, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="reviews"
            fill="var(--primary)"
            radius={[2, 2, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
