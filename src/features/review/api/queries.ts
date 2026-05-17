import type { Review, UserRole } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type RawReview = {
  id: string;
  movieId: string;
  rating: number;
  comment: string;
  isSpoiler: boolean;
  tags: string[];
  isApproved?: boolean;
  likes: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string | null;
    role: string;
  };
  children?: RawReview[];
  reviewLikes?: { id: string }[];
};

function mapRawReview(raw: RawReview): Review {
  const likedByMe = Array.isArray(raw.reviewLikes) && raw.reviewLikes.length > 0;
  const children =
    raw.children?.map((child) => mapRawReview(child as RawReview)) ?? [];

  return {
    id: raw.id,
    movieId: raw.movieId,
    rating: raw.rating,
    comment: raw.comment,
    isSpoiler: Boolean(raw.isSpoiler),
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    status: raw.isApproved === false ? "PENDING" : "APPROVED",
    likes: typeof raw.likes === "number" ? raw.likes : 0,
    createdAt:
      typeof raw.createdAt === "string"
        ? raw.createdAt
        : new Date(raw.createdAt as unknown as string).toISOString(),
    user: {
      id: raw.user.id,
      name: raw.user.name,
      image: raw.user.image,
      role: raw.user.role as UserRole,
    },
    likedByMe,
    children: children.length > 0 ? children : undefined,
  };
}

export async function getReviewsForMovie(
  movieId: string,
  cookieHeader?: string | null,
): Promise<Review[]> {
  const headers: HeadersInit = {};
  if (cookieHeader) {
    headers["Cookie"] = cookieHeader;
  }

  try {
    const res = await fetch(`${BASE_URL}/review/${movieId}`, {
      next: { revalidate: 30, tags: [`movie-reviews-${movieId}`] },
      credentials: "include",
      headers: Object.keys(headers).length ? headers : undefined,
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    const list = Array.isArray(json.data) ? json.data : [];
    return (list as RawReview[]).map((r) => mapRawReview(r));
  } catch {
    return [];
  }
}
