const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function createReviewRequest(payload: {
  movieId: string;
  comment: string;
  rating?: number;
  parentId?: string;
  tags?: string[];
  isSpoiler?: boolean;
}) {
  const res = await fetch(`${BASE_URL}/review`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (json as { message?: string }).message || "Could not submit review.",
    );
  }
  return json;
}

export async function toggleReviewLikeRequest(reviewId: string): Promise<{
  liked: boolean;
  likes: number;
}> {
  const res = await fetch(`${BASE_URL}/review/like/${reviewId}`, {
    method: "POST",
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (json as { message?: string }).message || "Could not update like.",
    );
  }
  const data = (json as { data?: { liked: boolean; likes: number } }).data;
  if (!data) {
    throw new Error("Invalid like response.");
  }
  return data;
}
