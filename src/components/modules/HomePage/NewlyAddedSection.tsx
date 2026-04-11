import { MovieCard } from "./MovieCard";
import { MOCK_NEWLY_ADDED } from "@/lib/mock-data";

// TODO: fetch from backend → GET /api/movie?sort=createdAt&order=desc&limit=8

export function NewlyAddedSection() {
  return (
    <section className="container mx-auto px-6 lg:px-12 py-20">
      <div className="flex items-end justify-between border-b border-border pb-6 mb-12">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
          Newly <span className="text-primary not-italic">Added.</span>
        </h2>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
            Fresh in the Archive
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        {MOCK_NEWLY_ADDED.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.rating}
            year={movie.year}
            image={movie.posterUrl}
            category={movie.genres[0] || "Cinema"}
          />
        ))}
      </div>
    </section>
  );
}
