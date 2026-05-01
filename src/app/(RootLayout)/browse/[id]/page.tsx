import { cookies } from "next/headers";
import { RelatedTitlesSection } from "@/components/modules/MoviePage/RelatedTitlesSection";
import { movieService } from "@/services/modules/movie/movie.service";
import { getReviewsForMovie } from "@/services/modules/review/review.service";
import { isMovieInWatchlist } from "@/services/modules/watchlist/watchlist.service";
import { ReviewSection } from "@/components/modules/MoviePage/ReviewSection";
import { MovieHero } from "@/components/modules/MoviePage/MovieHero";
import { PaymentReturnNotice } from "@/components/modules/MoviePage/PaymentReturnNotice";
import { VideoPlayer } from "@/components/modules/MoviePage/VideoPlayer";
import { MovieSidebar } from "@/components/modules/MoviePage/MovieSidebar";
import { notFound } from "next/navigation";
import type { Movie } from "@/types/types";

async function getMovieDetails(
  id: string,
  cookieHeader: string
): Promise<Movie | null> {
  const movie = await movieService.getMovieById(id, cookieHeader);
  return movie ?? null;
}

export default async function MovieDetails({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string; session_id?: string }>;
}) {
  const { id } = await params;
  const { payment, session_id } = await searchParams;
  const cookieStore = await cookies();

  const paymentStatus =
    payment === "success" || payment === "cancel" ? payment : null;

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const movie = await getMovieDetails(id, cookieHeader);

  if (!movie) {
    return notFound();
  }

  const [reviews, relatedMovies, inWatchlist] = await Promise.all([
    getReviewsForMovie(id, cookieHeader || undefined),
    movieService.getRelatedMovies(movie, 4, cookieHeader || undefined),
    isMovieInWatchlist(id, cookieHeader || undefined),
  ]);

  // Reviews come from GET /review/:movieId (with per-user like state), not embedded on movie.
  const { reviews: _embeddedMovieReviews, ...movieFields } = movie;
  void _embeddedMovieReviews;

  const movieData = {
    ...movieFields,
    backdrop: movie.backdropUrl,
    poster: movie.posterUrl,
    hasAccess: movie.hasAccess ?? movie.status === "FREE",
  };

  return (
    <main className="min-h-screen bg-background">
      <MovieHero
        data={movieData}
        movieId={movie.id}
        initialInWatchlist={inWatchlist}
      />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 py-12 px-4 md:px-8">
        <div className="lg:col-span-2 space-y-16">
          <PaymentReturnNotice
            movieId={movie.id}
            paymentStatus={paymentStatus}
            sessionId={session_id ?? null}
            hasAccess={movieData.hasAccess}
          />

          <section className="rounded-4xl border border-border bg-card/20 p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
                  Overview
                </p>
                <h2 className="mt-4 text-3xl font-black uppercase tracking-tight">
                  Story & Viewing Context
                </h2>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">
                  {movie.description}
                </p>
              </div>

              <div className="space-y-4 rounded-3xl border border-border bg-background/70 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary">
                  Quick Specs
                </p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                    <span>Release</span>
                    <span className="font-semibold text-foreground">
                      {movie.year}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                    <span>Platform</span>
                    <span className="font-semibold text-foreground">
                      {movie.platform}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                    <span>Access</span>
                    <span className="font-semibold text-foreground">
                      {movie.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Genres</span>
                    <span className="text-right font-semibold text-foreground">
                      {movie.genres.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Movie Play */}
          <section id="video-player" className="scroll-mt-24">
            <VideoPlayer
              streamingUrl={movieData.streamingUrl}
              hasAccess={movieData.hasAccess}
            />
          </section>

          {/* Reviews */}
          <ReviewSection movieId={movie.id} initialReviews={reviews} />

          {/* Related Movie */}
          <RelatedTitlesSection movies={relatedMovies} />
        </div>

        <aside>
          <MovieSidebar
            movieId={movie.id}
            cast={movieData.cast}
            director={movieData.director}
            duration={movieData.duration}
            platform={movieData.platform}
            rating={movieData.rating}
            year={movieData.year}
            status={movieData.status}
            price={movieData.price}
            hasAccess={movieData.hasAccess}
          />
        </aside>
      </div>
    </main>
  );
}
