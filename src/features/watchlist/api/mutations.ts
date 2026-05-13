const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type ToggleWatchlistResponse = {
  success: boolean;
  message: string;
  data?: {
    added: boolean;
    watchlist: {
      id: string;
      userId: string;
      movieId: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export async function toggleWatchlistRequest(movieId: string) {
  const res = await fetch(`${BASE_URL}/watchlist/toggle`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieId }),
  });
  const json = (await res.json().catch(() => ({}))) as ToggleWatchlistResponse;
  if (!res.ok) {
    throw new Error(
      json.message || "Could not update watchlist.",
    );
  }

  if (!json.data) {
    throw new Error("Invalid watchlist response.");
  }

  return json.data;
}
