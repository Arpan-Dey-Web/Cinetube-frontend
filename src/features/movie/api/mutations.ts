import { apiClient } from "@/shared/api/client";
import type { Movie } from "@/types/types";

export type MovieMutationPayload = Partial<Omit<Movie, "id" | "reviews">>;

export const movieMutations = {
  createMovie: (payload: MovieMutationPayload) =>
    apiClient.post<Movie>("/movie", payload),
  updateMovie: (id: string, payload: MovieMutationPayload) =>
    apiClient.patch<Movie>(`/movie/${id}`, payload),
  deleteMovie: (id: string) => apiClient.delete<Movie>(`/movie/${id}`),
};
