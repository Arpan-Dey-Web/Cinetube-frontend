"use client";

import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/shared/api/client";
import type { Review } from "@/types/types";
import { useEffect, useMemo, useState } from "react";

export default function DashboardReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const approved = useMemo(
    () => reviews.filter((review) => review.status === "APPROVED"),
    [reviews],
  );
  const pending = useMemo(
    () => reviews.filter((review) => review.status === "PENDING"),
    [reviews],
  );

  useEffect(() => {
    apiClient
      .get<Review[]>("/review", {
        query: { userId: "me", status: "ALL" },
        cache: "no-store",
      })
      .then((response) => setReviews(response.data))
      .catch(() => setReviews([]));
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Reviews", value: reviews.length },
          { label: "Approved", value: approved.length },
          { label: "Pending", value: pending.length },
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

      <div className="rounded-[1.5rem] border border-border bg-card/20 p-6">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          My Reviews
        </h1>
        <div className="mt-6 space-y-4">
          {reviews.length === 0 ? (
            <div className="rounded-[1rem] border border-border bg-background/70 p-8 text-center text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
              No reviews yet
            </div>
          ) : reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-[1rem] border border-border bg-background/70 p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-black uppercase tracking-tight text-foreground">
                      Movie {review.movieId.slice(-6)}
                    </p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                      Submitted {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{review.rating}/10</Badge>
                    <Badge>{review.status}</Badge>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {review.comment}
                </p>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}
