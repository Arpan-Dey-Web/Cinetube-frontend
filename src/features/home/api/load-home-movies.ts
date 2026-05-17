import { movieService } from "@/features/movie/api/api";
import type { HeroSlide, Movie } from "@/types";

function toHeroSlide(movie: Movie): HeroSlide {
  return {
    id: movie.id,
    title: movie.title,
    genre: movie.genres.join(" // ") || "Cinema",
    year: movie.year,
    rating: movie.rating,
    description: movie.description,
    backdrop: movie.backdropUrl,
    poster: movie.posterUrl,
    movieId: movie.id,
  };
}

export async function loadHomeMovies() {
  const [featured, topRated] = await Promise.allSettled([
    movieService.getAllMovies({ featured: true, limit: 5 }),
    movieService.getAllMovies({ "top-rated": true, limit: 10 }),
  ]);

  return {
    featured:
      featured.status === "fulfilled" ? featured.value.data.map(toHeroSlide) : [],
    topRated: topRated.status === "fulfilled" ? topRated.value.data : [],
  };
}
