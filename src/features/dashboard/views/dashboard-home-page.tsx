"use client";
import { useAuth } from "@/providers/auth-provider";
import { OverviewCards } from "@/features/dashboard/components/OverviewCards";
import { ActivityChart } from "@/features/dashboard/components/ActivityChart";
import { GenreDonutChart } from "@/features/dashboard/components/GenreDonutChart";
import { RecentActivityTable } from "@/features/dashboard/components/RecentActivityTable";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-3 w-3 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">
              {isAdmin ? "Admin Terminal" : "User Terminal"}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-foreground">
            Main <br />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/20">
              Control.
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4 p-4 border border-border bg-card/20 backdrop-blur-sm">
          <div className="h-10 w-10 bg-primary/10 flex items-center justify-center border border-primary/20">
            <LayoutDashboard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
              Session Active
            </p>
            <p className="text-sm font-bold uppercase tracking-tighter text-foreground">
              {user?.name || "Loading..."}
            </p>
            <p className="text-[8px] font-bold uppercase text-primary tracking-widest">
              {user?.role || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <OverviewCards isAdmin={isAdmin} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <GenreDonutChart />
        </div>
      </div>

      {/* Recent Activity Table */}
      <RecentActivityTable />
    </div>
  );
}
