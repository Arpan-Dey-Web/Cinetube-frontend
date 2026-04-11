import { MovieCard } from "@/components/modules/HomePage/MovieCard";
import { Movie } from "@/types/types";

export function RelatedTitlesSection({ movies }: { movies: Movie[] }) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
            Suggested Next
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight">
            Related Titles
          </h2>
        </div>
        <p className="max-w-sm text-right text-sm leading-7 text-muted-foreground">
          More titles from the same lane so the details page feels like a real
          discovery flow.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.rating}
            year={movie.year}
            image={movie.posterUrl}
            category={movie.genres[0] || movie.platform}
          />
        ))}
      </div>
    </section>
  );
}
