import {
  Activity,
  Film,
  Star,
  Clock,
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock Stats
const USER_STATS = [
  { label: "Films Rated", value: "42", icon: Star, color: "text-primary" },
  {
    label: "Hours Archived",
    value: "128",
    icon: Clock,
    color: "text-foreground",
  },
  { label: "Rank", value: "Critic", icon: TrendingUp, color: "text-primary" },
];

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* 1. ATMOSPHERIC LAYERS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-full w-full opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        <div className="absolute top-[10%] right-[5%] h-96 w-96 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* 2. HEADER: COMMAND CENTER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-border/50 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                User Terminal
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] text-foreground">
              Main <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/20">
                Control.
              </span>
            </h1>
          </div>

          {/* USER QUICK INFO */}
          <div className="flex items-center gap-6 p-4 border border-border bg-card/20 backdrop-blur-md">
            <div className="h-12 w-12 bg-primary/10 flex items-center justify-center border border-primary/20">
              <Film className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Session Active
              </p>
              <p className="text-sm font-bold uppercase tracking-tighter text-foreground">
                Member_ID: 99281
              </p>
            </div>
          </div>
        </div>

        {/* 3. KEY METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {USER_STATS.map((stat) => (
            <div
              key={stat.label}
              className="group relative p-8 border border-border bg-card/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-16 w-16 bg-primary/5 -translate-y-8 translate-x-8 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform" />
              <stat.icon className={`h-5 w-5 ${stat.color} mb-6`} />
              <p className="text-4xl font-black italic tracking-tighter text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 4. ACTIVITY SECTIONS */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* RECENT ACTIVITY LOG */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-foreground flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Recent Syncs
              </h3>
              <Link
                href="/archive"
                className="text-[9px] font-black uppercase tracking-widest text-primary hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-6 bg-card/5 border border-border/50 group hover:bg-card/20 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-10 bg-muted overflow-hidden">
                      <Image
                        src="https://m.media-amazon.com/images/M/MV5BN2P2MjA0OGUtZWExOS00M2VjLTgzMjQtNjkwZTM2MjYwNTRiXkEyXkFqcGc@._V1_.jpg"
                        className="h-full w-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                        alt="movie"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground">
                        Rated Dune Part Two
                      </p>
                      <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest mt-1">
                        2 hours ago // system_log_04
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR: SYSTEM ALERTS / RECOMMENDATIONS */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 border border-primary/20 bg-primary/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-primary" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">
                Elite Critic Access
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed italic mb-6">
                Your recent review of Oppenheimer was cited in the top 5% of
                the archive intellectual contributions.
              </p>
              <button className="w-full py-3 border border-primary/30 text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Upgrade Profile
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                Quick Shortcuts
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {["Watchlist", "Settings", "Archive", "History"].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="p-4 border border-border text-[9px] font-black uppercase tracking-widest text-center hover:border-primary transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
