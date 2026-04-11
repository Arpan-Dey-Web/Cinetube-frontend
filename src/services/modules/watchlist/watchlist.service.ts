const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function isMovieInWatchlist(
  movieId: string,
  cookieHeader?: string | null,
): Promise<boolean> {
  if (!cookieHeader) {
    return false;
  }

  try {
    const res = await fetch(`${BASE_URL}/watchlist/`, {
      cache: "no-store",
      credentials: "include",
      headers: { Cookie: cookieHeader },
    });

    if (!res.ok) {
      return false;
    }

    const json = await res.json();
    const rows = Array.isArray(json.data) ? json.data : [];
    return rows.some(
      (entry: { movieId?: string }) => entry.movieId === movieId,
    );
  } catch {
    return false;
  }
}
