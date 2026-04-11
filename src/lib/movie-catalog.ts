import {
  MOCK_ADMIN_REVIEWS,
  MOCK_NEWLY_ADDED,
  MOCK_TRENDING,
  MOCK_USER_REVIEWS,
} from "@/lib/mock-data";
import { Movie, Review } from "@/types/types";

const reviewFallbacks: Record<string, Review[]> = {
  t1: [
    {
      id: "t1-r1",
      user: { id: "u-curator", name: "Aria Lane", role: "USER" },
      movieId: "t1",
      rating: 9,
      comment:
        "The scale is huge, but the emotional tension never gets lost. It feels premium in every frame.",
      isSpoiler: false,
      tags: ["epic", "immersive"],
      status: "APPROVED",
      likes: 64,
      createdAt: "2026-04-08T09:10:00Z",
    },
    {
      id: "t1-r2",
      user: { id: "u-critic", name: "Mina Roy", role: "USER" },
      movieId: "t1",
      rating: 8,
      comment:
        "A confident sequel with striking production design and a lot more urgency than the first chapter.",
      isSpoiler: false,
      tags: ["blockbuster", "worldbuilding"],
      status: "APPROVED",
      likes: 39,
      createdAt: "2026-04-06T12:35:00Z",
    },
  ],
  t2: [
    {
      id: "t2-r1",
      user: { id: "u-director", name: "Leo Grant", role: "USER" },
      movieId: "t2",
      rating: 10,
      comment:
        "Dense, sharp, and unusually tense for a historical drama. It rewards attention all the way through.",
      isSpoiler: true,
      tags: ["intense", "award-season"],
      status: "APPROVED",
      likes: 88,
      createdAt: "2026-04-09T18:20:00Z",
    },
  ],
  t3: [
    {
      id: "t3-r1",
      user: { id: "u-fan", name: "Noah Reed", role: "USER" },
      movieId: "t3",
      rating: 10,
      comment:
        "Still one of the best blends of spectacle and heart. The score alone makes it worth revisiting.",
      isSpoiler: false,
      tags: ["classic", "rewatchable"],
      status: "APPROVED",
      likes: 102,
      createdAt: "2026-04-07T15:00:00Z",
    },
  ],
};

const rawCatalog = [...MOCK_TRENDING, ...MOCK_NEWLY_ADDED];

export const MOVIE_CATALOG: Movie[] = Array.from(
  new Map(rawCatalog.map((movie) => [movie.id, movie])).values(),
);

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

export function getFallbackReviews(movieId: string) {
  return (
    reviewFallbacks[movieId] ??
    [...MOCK_ADMIN_REVIEWS, ...MOCK_USER_REVIEWS]
      .filter((review) => review.status === "APPROVED" || review.status === "PENDING")
      .slice(0, 3)
  );
}
