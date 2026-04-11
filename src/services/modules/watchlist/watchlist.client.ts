const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function toggleWatchlistRequest(movieId: string) {
  const res = await fetch(`${BASE_URL}/watchlist/toggle`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieId }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (json as { message?: string }).message || "Could not update watchlist.",
    );
  }
  return json;
}
