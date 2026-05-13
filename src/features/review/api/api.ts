import { apiClient } from "@/shared/api/client";

export type FeaturedReview = {
  id: string;
  rating: number;
  comment: string;
  likes: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string | null;
  };
  movie?: {
    id: string;
    title: string;
    posterUrl: string;
    year: string;
  };
};

export async function getFeaturedReviews(limit = 6) {
  const response = await apiClient.get<FeaturedReview[]>("/review/featured", {
    query: { limit },
    next: { revalidate: 60, tags: ["featured-reviews"] },
  });

  return response.data;
}
