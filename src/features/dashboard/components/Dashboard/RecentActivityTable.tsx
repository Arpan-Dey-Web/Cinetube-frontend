"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, ChevronRight } from "lucide-react";
import { apiClient } from "@/shared/api/client";
import type { Review } from "@/types/types";

const STATUS_COLORS: Record<string, string> = {
  APPROVED: "bg-green-500/10 text-green-600 border-green-500/30",
  PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  REJECTED: "bg-destructive/10 text-destructive border-destructive/30",
};

export function RecentActivityTable() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    apiClient
      .get<Review[]>("/review", {
        query: { userId: "me", limit: 5 },
        cache: "no-store",
      })
      .then((response) => setReviews(response.data))
      .catch(() => setReviews([]));
  }, []);

  return (
    <div className="border border-border bg-card/10">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="text-[11px] font-black uppercase tracking-[0.4em]">
          Recent Reviews
        </h3>
        <Link
          href="/dashboard/reviews"
          className="text-[9px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1"
        >
          View All <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Movie</TableHead>
            <TableHead className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Rating</TableHead>
            <TableHead className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hidden md:table-cell">Status</TableHead>
            <TableHead className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Date</TableHead>
            <TableHead className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length === 0 ? (
            <TableRow className="border-border">
              <TableCell colSpan={5} className="py-10 text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                No recent reviews
              </TableCell>
            </TableRow>
          ) : reviews.map((review) => (
            <TableRow key={review.id} className="border-border hover:bg-card/30 transition-colors">
              <TableCell>
                <p className="text-[10px] font-black uppercase tracking-wider text-foreground truncate max-w-[120px]">
                  Movie {review.movieId.slice(-2)}
                </p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5 hidden md:block">
                  {review.tags.slice(0, 2).join(", ")}
                </p>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-sm font-black italic text-primary">{review.rating}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className={`inline-block px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border ${STATUS_COLORS[review.status]}`}>
                  {review.status}
                </span>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-[10px] font-black text-foreground">{review.likes}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
