const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAllMovies = async () => {
    const res = await fetch(`${BASE_URL}/movie`, {
        next: {
            revalidate: 60, 
            tags: ["movies"],
        },
    });

    if (!res.ok) {
        console.error("Fetch failed:", res.statusText);
        throw new Error("Failed to fetch movies from archive.");
    }

    const json = await res.json();
    return json.data;
};

export const movieService = {
    getAllMovies,
};