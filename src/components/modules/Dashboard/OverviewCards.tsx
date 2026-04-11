import { Film, Star, Bookmark, TrendingUp, Users, DollarSign, Clock, ShieldCheck } from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  subtext: string;
  icon: React.ElementType;
  color: string;
}

interface Props {
  isAdmin?: boolean;
  // TODO: fetch from backend:
  // User: GET /api/user/stats
  // Admin: GET /api/admin/dashboard-stats
  stats?: Record<string, number>;
}

const USER_CARDS: StatCard[] = [
  { label: "Films Rated", value: "42", subtext: "+3 this week", icon: Star, color: "text-primary" },
  { label: "Watchlist", value: "18", subtext: "5 unwatched", icon: Bookmark, color: "text-foreground" },
  { label: "Approved Reviews", value: "29", subtext: "Critic Score: A", icon: ShieldCheck, color: "text-primary" },
];

const ADMIN_CARDS: StatCard[] = [
  { label: "Total Movies", value: "5,247", subtext: "+42 this month", icon: Film, color: "text-primary" },
  { label: "Total Reviews", value: "124.8K", subtext: "+1.2K this week", icon: Star, color: "text-foreground" },
  { label: "Active Users", value: "52.4K", subtext: "+820 today", icon: Users, color: "text-primary" },
  { label: "Revenue", value: "$143.2K", subtext: "+12% vs last month", icon: DollarSign, color: "text-foreground" },
  { label: "Pending Reviews", value: "38", subtext: "Needs moderation", icon: Clock, color: "text-destructive" },
  { label: "Premium Users", value: "14.3K", subtext: "27% of total", icon: TrendingUp, color: "text-primary" },
];

export function OverviewCards({ isAdmin }: Props) {
  const cards = isAdmin ? ADMIN_CARDS : USER_CARDS;

  return (
    <div className={`grid gap-4 ${isAdmin ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-3"}`}>
      {cards.map((card) => (
        <div
          key={card.label}
          className="group relative p-6 border border-border bg-card/20 hover:border-primary/50 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-12 w-12 bg-primary/5 -translate-y-6 translate-x-6 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform" />
          <div className="flex items-start justify-between mb-4">
            <card.icon className={`h-5 w-5 ${card.color}`} />
          </div>
          <p className="text-3xl font-black italic tracking-tighter text-foreground mb-1">
            {card.value}
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
            {card.label}
          </p>
          <p className="text-[9px] font-medium text-muted-foreground/60 mt-2 uppercase tracking-wider">
            {card.subtext}
          </p>
        </div>
      ))}
    </div>
  );
}
