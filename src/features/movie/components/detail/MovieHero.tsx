"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  MessageSquare,
  Play,
  Plus,
  ShieldAlert,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { toggleWatchlistRequest } from "@/features/watchlist/api/mutations";
import type { Movie, Review } from "@/types";

interface MovieData extends Movie {
  backdrop: string;
  poster: string;
  reviews?: Review[];
}

export const MovieHero = ({
  data,
  movieId,
  initialInWatchlist,
}: {
  data: MovieData;
  movieId: string;
  initialInWatchlist: boolean;
}) => {
  const { user } = useAuth();
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);
  const [watchlistBusy, setWatchlistBusy] = useState(false);

  useEffect(() => {
    setInWatchlist(initialInWatchlist);
  }, [initialInWatchlist, movieId]);

  const handleWatchlist = async () => {
    if (!user || watchlistBusy) {
      return;
    }
    setWatchlistBusy(true);
    try {
      const result = await toggleWatchlistRequest(movieId);
      setInWatchlist(result.added);
    } catch {
      // Request failed; state unchanged
    } finally {
      setWatchlistBusy(false);
    }
  };
  return (
    <div className="relative h-[70vh] w-full overflow-hidden flex items-end">
      {/* Backdrop with Blur & Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 blur-[2px] opacity-40 transition-all duration-1000"
        style={{ backgroundImage: `url(${data.backdrop})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 pb-12 flex flex-col md:flex-row gap-8 items-end">
        {/* Poster */}
        <div className="relative hidden md:block w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-border/50 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
          <Image
            src={data.poster}
            alt={data.title}
            fill
            sizes="256px"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary text-primary-foreground font-bold italic tracking-tighter">
              {data.status}
            </Badge>
            {data.genres.map((g: string) => (
              <Badge
                key={g}
                variant="outline"
                className="bg-background/20 text-foreground border-border/50 backdrop-blur-md uppercase tracking-tighter"
              >
                {g}
              </Badge>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-foreground">
            {data.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-muted-foreground uppercase tracking-widest">
            <div className="flex items-center gap-1.5 text-primary">
              <Star className="h-5 w-5 fill-primary" /> {data.rating}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {data.year}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {data.duration}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {/* Main Action Button */}
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:opacity-90 h-14 px-8 rounded-xl font-bold uppercase italic shadow-lg shadow-primary/20"
              onClick={() => {
                if (data.hasAccess) {
                  document
                    .getElementById("video-player")
                    ?.scrollIntoView({ behavior: "smooth" });
                } else {
                  document
                    .getElementById("checkout-card")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {data.hasAccess ? (
                <>
                  <Play className="mr-2 h-5 w-5 fill-current" /> Watch Now
                </>
              ) : (
                <>
                  <ShieldAlert className="mr-2 h-5 w-5" /> Buy Premium
                </>
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              disabled={!user || watchlistBusy}
              title={!user ? "Sign in to save to your watchlist" : undefined}
              className="h-14 px-8 rounded-xl border-border bg-background/50 backdrop-blur-sm font-bold uppercase tracking-widest hover:bg-background disabled:opacity-60"
              onClick={handleWatchlist}
            >
              {inWatchlist ? (
                <Check className="mr-2 h-5 w-5" />
              ) : (
                <Plus className="mr-2 h-5 w-5" />
              )}
              {inWatchlist ? "Saved" : "Watchlist"}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-xl border-border bg-background/50 backdrop-blur-sm font-bold uppercase tracking-widest hover:bg-background"
              onClick={() =>
                document
                  .getElementById("reviews")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <MessageSquare className="mr-2 h-5 w-5" /> Reviews
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
