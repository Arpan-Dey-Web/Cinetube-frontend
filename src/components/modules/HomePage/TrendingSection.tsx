import Image from "next/image";
import Link from "next/link";
import { Star, TrendingUp } from "lucide-react";
import { MOCK_TRENDING } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

// TODO: fetch from backend → GET /api/movie?sort=rating&order=desc&limit=5

export function TrendingSection() {
  return (
    <section className="container mx-auto px-6 lg:px-12 py-20">
      <div className="flex items-end justify-between border-b border-border pb-6 mb-12">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
          Trending <span className="text-primary not-italic">Now.</span>
        </h2>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
            Top This Week
          </span>
        </div>
      </div>

      <div className="space-y-px">
        {MOCK_TRENDING.map((movie, index) => (
          <Link
            key={movie.id}
            href={`/browse/${movie.id}`}
            className="group flex items-center gap-6 lg:gap-10 p-5 border border-transparent hover:border-border hover:bg-card/20 transition-all duration-300"
          >
            {/* Rank Number */}
            <span className="text-[3.5rem] font-black italic tracking-tighter leading-none text-border group-hover:text-primary/30 transition-colors w-16 shrink-0 text-right">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Poster thumbnail */}
            <div className="h-16 w-11 overflow-hidden shrink-0 bg-muted">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                width={44}
                height={64}
                className="h-full w-full object-cover grayscale-[0.4] transition-all duration-500 group-hover:grayscale-0"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-black uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors truncate">
                {movie.title}
              </h3>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                {movie.director} · {movie.year}
              </p>
            </div>

            {/* Genre + Rating */}
            <div className="hidden md:flex items-center gap-6 shrink-0">
              <Badge
                variant="outline"
                className="text-[9px] font-black uppercase tracking-widest border-border rounded-none"
              >
                {movie.genres[0]}
              </Badge>
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="text-sm font-black italic text-foreground">
                  {movie.rating}
                </span>
              </div>
              <Badge
                variant={movie.status === "PREMIUM" ? "default" : "secondary"}
                className="text-[8px] font-black uppercase tracking-widest rounded-none"
              >
                {movie.status}
              </Badge>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
