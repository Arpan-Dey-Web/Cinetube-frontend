import Link from "next/link";
import { MovieCard } from "@/components/modules/HomePage/MovieCard";
import { MOCK_USER_WATCHLIST } from "@/lib/mock-data";

export default function DashboardWatchlistPage() {
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
          {MOCK_USER_WATCHLIST.length} titles saved
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {MOCK_USER_WATCHLIST.map((movie) => (
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
