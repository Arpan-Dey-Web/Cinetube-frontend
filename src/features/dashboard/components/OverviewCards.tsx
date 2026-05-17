
"use client";

import { useEffect, useMemo, useState } from "react";
import type { ElementType } from "react";
import {
  Film,
  Star,
  Bookmark,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { dashboardService } from "@/features/dashboard/api/api";

interface StatCard {
  label: string;
  value: string;
  subtext: string;
  icon: ElementType;
  color: string;
}

interface Props {
  isAdmin?: boolean;
  stats?: Record<string, number>;
}

const USER_CARDS: StatCard[] = [
  {
    label: "Films Rated",
    value: "42",
    subtext: "+3 this week",
    icon: Star,
    color: "text-primary",
  },
  {
    label: "Watchlist",
    value: "18",
    subtext: "5 unwatched",
    icon: Bookmark,
    color: "text-foreground",
  },
  {
    label: "Approved Reviews",
    value: "29",
    subtext: "Critic Score: A",
    icon: ShieldCheck,
    color: "text-primary",
  },
];

const ADMIN_CARDS: StatCard[] = [
  {
    label: "Total Movies",
    value: "5,247",
    subtext: "+42 this month",
    icon: Film,
    color: "text-primary",
  },
  {
    label: "Total Reviews",
    value: "124.8K",
    subtext: "+1.2K this week",
    icon: Star,
    color: "text-foreground",
  },
  {
    label: "Active Users",
    value: "52.4K",
    subtext: "+820 today",
    icon: Users,
    color: "text-primary",
  },
  {
    label: "Revenue",
    value: "$143.2K",
    subtext: "+12% vs last month",
    icon: DollarSign,
    color: "text-foreground",
  },
  {
    label: "Pending Reviews",
    value: "38",
    subtext: "Needs moderation",
    icon: Clock,
    color: "text-destructive",
  },
  {
    label: "Premium Users",
    value: "14.3K",
    subtext: "27% of total",
    icon: TrendingUp,
    color: "text-primary",
  },
];

const formatNumber = (value = 0) =>
  new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1,
  }).format(value);

const withStats = (
  cards: StatCard[],
  stats: Record<string, number> | undefined,
  isAdmin?: boolean,
) => {
  if (!stats) return cards;

  const values = isAdmin
    ? [
        formatNumber(stats.movieCount),
        formatNumber(stats.reviewCount),
        formatNumber(stats.userCount),
        formatCurrency(stats.revenue),
        formatNumber(stats.pendingReviewCount),
        formatNumber(stats.premiumUserCount),
      ]
    : [
        formatNumber(stats.totalReviews),
        formatNumber(stats.watchlistCount),
        formatNumber(stats.approvedReviews),
      ];

  const subtexts = isAdmin
    ? [
        "Movies in library",
        `${formatNumber(stats.publishedReviewCount)} approved`,
        "Registered active users",
        "Paid purchases",
        "Needs moderation",
        "Active subscriptions",
      ]
    : [
        `${formatNumber(stats.pendingReviews)} pending`,
        `${formatNumber(stats.purchaseCount)} purchased`,
        `Avg rating: ${Number(stats.averageRating || 0).toFixed(1)}`,
      ];

  return cards.map((card, index) => ({
    ...card,
    value: values[index] ?? card.value,
    subtext: subtexts[index] ?? card.subtext,
  }));
};

export function OverviewCards({ isAdmin, stats }: Props) {
  const baseCards = isAdmin ? ADMIN_CARDS : USER_CARDS;
  const [remoteStats, setRemoteStats] = useState<Record<string, number> | undefined>();
  const cards = useMemo(
    () => withStats(baseCards, remoteStats ?? stats, isAdmin),
    [baseCards, isAdmin, remoteStats, stats],
  );

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      const data = isAdmin
        ? await dashboardService.getAdminDashboardStats()
        : await dashboardService.getUserStats();

      if (isMounted) setRemoteStats(data);
    };

    fetchStats().catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [isAdmin]);

  return (
    <div
      className={`grid gap-4 ${isAdmin ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-3"}`}
    >
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
