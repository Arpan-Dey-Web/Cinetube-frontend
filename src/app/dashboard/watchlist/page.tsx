"use client";

import Link from "next/link";
import { MovieCard } from "@/features/home/components/MovieCard";
import {
  getMyWatchlist,
  WatchlistEntry,
} from "@/features/watchlist/api/queries";
import { useEffect, useState } from "react";

export default function DashboardWatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);

  useEffect(() => {
    getMyWatchlist()
      .then(setWatchlist)
      .catch(() => setWatchlist([]));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
            Personal Queue
          </p>
          <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">
            Saved Watchlist
          </h1>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
          {watchlist.length} titles saved
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {watchlist.map(({ movie }) => (
          <div key={movie.id} className="space-y-4">
            <MovieCard
              id={movie.id}
              title={movie.title}
              rating={movie.rating}
              year={movie.year}
              image={movie.posterUrl}
              category={movie.genres[0] || movie.platform}
            />
            <Link
              href={`/browse/${movie.id}`}
              className="inline-flex text-[10px] font-black uppercase tracking-[0.35em] text-primary"
            >
              Open Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
