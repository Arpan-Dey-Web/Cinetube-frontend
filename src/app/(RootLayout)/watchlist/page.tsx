"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bookmark, Clock, PlayCircle, Trash2 } from "lucide-react";
import { MovieCard } from "@/components/modules/HomePage/MovieCard";

const WATCHLIST_DATA = [
  {
    id: "1",
    title: "Dune: Part Two",
    rating: 9.2,
    year: "2024",
    category: "Sci-Fi",
    image:
      "https://m.media-amazon.com/images/M/MV5BN2P2MjA0OGUtZWExOS00M2VjLTgzMjQtNjkwZTM2MjYwNTRiXkEyXkFqcGc@._V1_.jpg",
    addedDate: "MAR 28, 2026",
  },
  {
    id: "3",
    title: "Oppenheimer",
    rating: 8.9,
    year: "2023",
    category: "Drama",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzhmODhlNjMyMzI0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    addedDate: "APR 01, 2026",
  },
  {
    id: "5",
    title: "Blade Runner 2049",
    rating: 8.0,
    year: "2017",
    category: "Noir",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODgzNjU3MzI@._V1_.jpg",
    addedDate: "FEB 12, 2026",
  },
] as const;

export default function WatchListPage() {
  const [watchlist, setWatchlist] = useState([...WATCHLIST_DATA]);

  const watchCount = useMemo(() => watchlist.length, [watchlist]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 pb-24 pt-32 lg:px-12">
        <div className="mb-20 flex flex-col gap-8 border-b border-border/50 pb-12 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Bookmark className="h-3 w-3 fill-primary text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                Personal Vault
              </span>
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.8] text-foreground md:text-8xl">
              Your <br />
              <span className="bg-linear-to-b from-foreground to-foreground/20 bg-clip-text text-5xl text-transparent md:text-7xl">
                Watchlist.
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-right">
              <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                Queue Status
              </p>
              <div className="flex items-center justify-end gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                <p className="text-sm font-bold uppercase tracking-widest text-foreground">
                  Active Sync
                </p>
              </div>
            </div>
            <div className="h-14 w-px bg-border/50" />
            <div className="text-right">
              <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                Items
              </p>
              <p className="text-3xl font-black italic leading-none tracking-tighter text-primary">
                {String(watchCount).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {watchlist.map((movie) => (
              <div key={movie.id} className="group relative">
                <button
                  onClick={() =>
                    setWatchlist((current) =>
                      current.filter((item) => item.id !== movie.id),
                    )
                  }
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-border bg-background/80 backdrop-blur-md opacity-0 transition-all hover:bg-destructive hover:text-white group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="pointer-events-none absolute bottom-0 top-0 -left-4 z-10 flex flex-col justify-between py-2">
                  <div className="h-1 w-1 bg-primary" />
                  <p className="rotate-180 text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 [writing-mode:vertical-rl]">
                    Added: {movie.addedDate}
                  </p>
                </div>

                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  rating={movie.rating}
                  year={movie.year}
                  image={movie.image}
                  category={movie.category}
                />

                <Link
                  href={`/browse/${movie.id}`}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-3 border border-border text-[10px] font-black uppercase tracking-widest transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <PlayCircle className="h-4 w-4" />
                  Initiate Playback
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[40vh] flex-col items-center justify-center space-y-6 border border-dashed border-border">
            <Clock className="h-8 w-8 opacity-20 text-muted-foreground" />
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground">
                The Vault is Empty
              </p>
              <p className="mt-2 text-[9px] font-medium uppercase tracking-widest text-muted-foreground/50">
                Add titles from the archive to begin your collection
              </p>
            </div>
            <Link
              href="/browse"
              className="text-[10px] font-black uppercase tracking-[0.35em] text-primary"
            >
              Browse titles
            </Link>
          </div>
        )}

        <div className="relative mt-32 flex flex-col items-center justify-between gap-8 overflow-hidden border border-border/50 bg-card/10 p-12 backdrop-blur-sm md:flex-row">
          <div className="absolute right-0 top-0 h-24 w-24 border-r-2 border-t-2 border-primary/20" />
          <div className="relative z-10 space-y-2">
            <h3 className="text-xl font-black uppercase italic tracking-tighter">
              Looking for more?
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Explore the latest recommendations for your viewing profile.
            </p>
          </div>
          <Link
            href="/archive"
            className="relative z-10 bg-foreground px-10 py-4 text-[10px] font-black uppercase tracking-widest text-background transition-colors hover:bg-primary hover:text-white"
          >
            Back to Archive
          </Link>
        </div>
      </main>
    </div>
  );
}
