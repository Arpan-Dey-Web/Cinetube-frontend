import { Movie } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export type MoviesListMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type GetAllMoviesQuery = Record<string, string | number | undefined>;

const getAllMovies = async (query?: GetAllMoviesQuery) => {
    const params = new URLSearchParams();
    if (query) {
        for (const [key, value] of Object.entries(query)) {
            if (value === undefined || value === null || value === "") continue;
            params.set(key, String(value));
        }
    }

    const qs = params.toString();
    const res = await fetch(`${BASE_URL}/movie${qs ? `?${qs}` : ""}`, {
        next: {
            revalidate: 10,
            tags: ["movies"],
        },
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch movies from archive.");
    }

    const json = await res.json();
    return {
        data: json.data as Movie[],
        meta: json.meta as MoviesListMeta | undefined,
    };
};

const getMovieById = async (id: string, cookieHeader?: string | null) => {
    const headers: HeadersInit = {};
    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }

    const res = await fetch(`${BASE_URL}/movie/${id}`, {
        next: { revalidate: 60, tags: [`movie-${id}`] },
        credentials: "include",
        headers: Object.keys(headers).length ? headers : undefined,
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
};

const getRelatedMovies = async (
    movie: Movie,
    limit: number,
    cookieHeader?: string | null,
) => {
    const primaryGenre = movie.genres?.[0];
    if (!primaryGenre) {
        return [] as Movie[];
    }

    const headers: HeadersInit = {};
    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }

    const params = new URLSearchParams({
        genres: primaryGenre,
        limit: String(limit + 6),
        page: "1",
        sortBy: "rating",
        sortOrder: "desc",
    });

    const res = await fetch(`${BASE_URL}/movie?${params.toString()}`, {
        next: { revalidate: 120, tags: ["movies", `related-${movie.id}`] },
        credentials: "include",
        headers: Object.keys(headers).length ? headers : undefined,
    });

    if (!res.ok) {
        return [] as Movie[];
    }

    const json = await res.json();
    const data = (json.data as Movie[]) ?? [];
    return data.filter((m) => m.id !== movie.id).slice(0, limit);
};

export const movieService = {
    getAllMovies,
    getMovieById,
    getRelatedMovies,
};