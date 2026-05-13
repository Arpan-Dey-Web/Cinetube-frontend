import { Movie, Review } from "@/types/types";

export const MOVIE_CATALOG: Movie[] = [];

export function findMovieInCatalog(id: string) {
  return MOVIE_CATALOG.find((movie) => movie.id === id) ?? null;
}

export function getRelatedMovies(movie: Movie, limit = 4) {
  return MOVIE_CATALOG.filter(
    (candidate) =>
      candidate.id !== movie.id &&
      candidate.genres.some((genre) => movie.genres.includes(genre)),
  ).slice(0, limit);
}

export function getFallbackReviews(): Review[] {
  return [];
}
