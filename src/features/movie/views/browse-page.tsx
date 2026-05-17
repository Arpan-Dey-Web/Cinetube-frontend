import { BrowseMovieGrid } from "@/features/movie/components/browse/BrowseMovieGrid";
import {
  buildApiQueryFromBrowseSearchParams,
  getInitialBrowseState,
  serializeBrowseUrlParams,
  type BrowseSearchParamsInput,
} from "@/features/movie/components/browse/filter-utils";
import { MOVIE_CATALOG } from "@/constants/movie-catalog";
import {
  movieService,
  type MoviesListMeta,
} from "@/features/movie/api/api";
import { Movie } from "@/types";

async function getBrowseMovies(rawParams: BrowseSearchParamsInput): Promise<{
  movies: Movie[];
  meta: MoviesListMeta | null;
  fromApi: boolean;
}> {
  const apiQuery = buildApiQueryFromBrowseSearchParams(rawParams);
  try {
    const { data, meta } = await movieService.getAllMovies(apiQuery);
    if (Array.isArray(data) && meta && typeof meta.total === "number") {
      return { movies: data, meta, fromApi: true };
    }
  } catch {
    // Backend unavailable — static catalog + client-side filtering in the grid.
  }
  return { movies: MOVIE_CATALOG, meta: null, fromApi: false };
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<BrowseSearchParamsInput>;
}) {
  const sp = await searchParams;
  const { movies, meta, fromApi } = await getBrowseMovies(sp);
  console.log("Movies: ", movies);
  const initialBrowseState = getInitialBrowseState(sp);
  const collectionCount = fromApi && meta ? meta.total : movies.length;
  const syncKey = serializeBrowseUrlParams({
    search: initialBrowseState.search,
    filters: initialBrowseState.filters,
    page: initialBrowseState.page,
    limit: initialBrowseState.limit,
  });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[20%] -left-[5%] h-[500px] w-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-border/50 pb-10">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] text-foreground">
              Browse <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/20">
                Cinema.
              </span>
            </h1>
            <p className="text-sm text-muted-foreground italic font-medium max-w-md">
              Explore our full archive — search, filter by genre, rating, and
              platform to find your next favourite film.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Collection Count
              </p>
              <p className="text-2xl font-black italic text-foreground tracking-tighter">
                {String(collectionCount).padStart(3, "0")}
              </p>
            </div>
          </div>
        </div>

        {/* Grid with Filters */}
        <BrowseMovieGrid
          key={syncKey}
          movies={movies}
          initialSearch={initialBrowseState.search}
          initialFilters={initialBrowseState.filters}
          initialPage={initialBrowseState.page}
          browseLimit={initialBrowseState.limit}
          paginationMeta={meta}
          urlSyncKey={syncKey}
        />
      </main>
    </div>
  );
}
