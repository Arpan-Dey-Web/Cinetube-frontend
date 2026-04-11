import { ActivityChart } from "@/components/modules/Dashboard/ActivityChart";
import { GenreDonutChart } from "@/components/modules/Dashboard/GenreDonutChart";
import { MOCK_DASHBOARD_STATS } from "@/lib/mock-data";

export default function AdminAnalyticsPage() {
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
          { label: "Revenue", value: `$${MOCK_DASHBOARD_STATS.totalRevenue}` },
          { label: "Pending Reviews", value: MOCK_DASHBOARD_STATS.pendingReviews },
          { label: "Active Today", value: MOCK_DASHBOARD_STATS.activeUsersToday },
          { label: "Premium Users", value: MOCK_DASHBOARD_STATS.premiumUsers },
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
