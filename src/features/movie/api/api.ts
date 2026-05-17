import { apiClient } from "@/shared/api/client";
import { Category, Movie } from "@/types";

export const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "");

export type MoviesListMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type GetAllMoviesQuery = Record<string, string | number | boolean | undefined>;

type GenreResponse = {
    name: string;
    count: number;
};

const getAllMovies = async (query?: GetAllMoviesQuery) => {
    const json = await apiClient.get<Movie[]>("/movie", {
        query,
        next: {
            revalidate: 10,
            tags: ["movies"],
        },
    });
    return {
        data: json.data,
        meta: json.meta as MoviesListMeta | undefined,
    };
};

const getMovieById = async (id: string, cookieHeader?: string | null) => {
    const headers: HeadersInit = {};
    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }

    const res = await fetch(`${BASE_URL}/movie/${id}`, {
        cache: "no-store",
        credentials: "include",
        headers: Object.keys(headers).length ? headers : undefined,
    });
    if (res.status === 404) return null;
    if (!res.ok) {
        throw new Error(`Failed to fetch movie ${id}: ${res.status}`);
    }
    const json = await res.json();
    return json.data;
};

const getRelatedMovies = async (
    movie: Movie,
    limit: number,
    cookieHeader?: string | null,
) => {
    void cookieHeader;
    const primaryGenre = movie.genres?.[0];
    if (!primaryGenre) {
        return [] as Movie[];
    }

    const { data } = await getAllMovies({
        genres: primaryGenre,
        limit: limit + 6,
        page: 1,
        sortBy: "rating",
        sortOrder: "desc",
    });

    return data.filter((m) => m.id !== movie.id).slice(0, limit);
};

const getMovieGenres = async (): Promise<Category[]> => {
    const json = await apiClient.get<GenreResponse[]>("/movie/genres", {
        next: { revalidate: 300, tags: ["movie-genres"] },
    });

    return json.data.map((genre) => ({
        id: genre.name,
        name: genre.name,
        count: genre.count,
        slug: genre.name.toLowerCase(),
        image: "",
    }));
};

export const movieService = {
    getAllMovies,
    getMovieById,
    getRelatedMovies,
    getMovieGenres,
};
