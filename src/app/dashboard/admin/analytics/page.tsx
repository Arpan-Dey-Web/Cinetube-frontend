"use client";

import { ActivityChart } from "@/features/dashboard/components/Dashboard/ActivityChart";
import { GenreDonutChart } from "@/features/dashboard/components/Dashboard/GenreDonutChart";
import { dashboardService, DashboardStats } from "@/features/dashboard/api/api";
import { useEffect, useState } from "react";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    dashboardService
      .getAdminDashboardStats()
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
          Performance
        </p>
        <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">
          Platform Analytics
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Revenue", value: `$${stats?.revenue ?? 0}` },
          { label: "Pending Reviews", value: stats?.pendingReviewCount ?? 0 },
          { label: "Total Users", value: stats?.userCount ?? 0 },
          { label: "Premium Users", value: stats?.premiumUserCount ?? 0 },
        ].map((item) => (
          <div key={item.label} className="border border-border bg-card/20 p-5">
            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-black italic tracking-tight text-foreground">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <GenreDonutChart />
      </div>
    </div>
  );
}
