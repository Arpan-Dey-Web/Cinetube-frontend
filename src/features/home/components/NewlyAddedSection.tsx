import { MovieCard } from "./MovieCard";
import { movieService } from "@/features/movie/api/api";
import type { Movie } from "@/types/types";

export async function NewlyAddedSection() {
  let movies: Movie[] = [];
  let error = false;

  try {
    movies = (await movieService.getAllMovies({ "newly-added": true, limit: 8 })).data;
  } catch {
    error = true;
  }

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

      {error ? (
        <SectionState label="Unable to load new releases" />
      ) : movies.length === 0 ? (
        <SectionState label="No new releases available" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        {movies.map((movie) => (
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
      )}
    </section>
  );
}

function SectionState({ label }: { label: string }) {
  return (
    <div className="border border-border bg-card/20 p-10 text-center text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
      {label}
    </div>
  );
}
