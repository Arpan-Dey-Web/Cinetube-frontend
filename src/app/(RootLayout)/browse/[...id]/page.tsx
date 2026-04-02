import { movieService } from "@/services/module/movie/movie.service";
import { ReviewSection } from "@/components/modules/MoviePage/ReviewSection";
import { MovieHero } from "@/components/modules/MoviePage/MovieHero";
import { VideoPlayer } from "@/components/modules/MoviePage/VideoPlayer";
import { MovieSidebar } from "@/components/modules/MoviePage/MovieSidebar";
import { notFound } from "next/navigation";

export default async function MovieDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const movie = await movieService.getMovieById(id);
  console.log(movie);
  if (!movie) return notFound();

  const movieData = {
    ...movie,
    backdrop: movie.backdropUrl,
    poster: movie.posterUrl,
  };

  return (
    <main className="min-h-screen bg-background">
      <MovieHero data={movieData} />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 py-12 px-4 md:px-8">
        <div className="lg:col-span-2 space-y-16">
          <section id="video-player" className="scroll-mt-24">
            <VideoPlayer
              streamingUrl={movieData.streamingUrl}
              hasAccess={movieData.hasAccess}
            />
          </section>

          <ReviewSection movieId={id} initialReviews={movie.reviews || []} />
        </div>

        <aside>
          <MovieSidebar
            cast={movieData.cast}
            director={movieData.director}
            status={movieData.status}
            price={movieData.price}
            hasAccess={movieData.hasAccess}
          />
        </aside>
      </div>
    </main>
  );
}
