export type PriceType = "FREE" | "PREMIUM";
export type UserRole = "USER" | "ADMIN";
export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";
export type ContentStatus = "FREE" | "PREMIUM";

export interface Movie {
  id: string;
  title: string;
  description: string;
  director: string;
  cast: string[];
  year: string;
  duration: string;
  rating: number;
  genres: string[];
  posterUrl: string;
  backdropUrl: string;
  trailerUrl?: string | null;
  streamingUrl?: string | null;
  platform: string;
  status: PriceType;
  price?: number;
  isTrending?: boolean;
  isPublished?: boolean;
  hasAccess?: boolean;
  reviews?: Review[];
}

export interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    image?: string | null;
    role: UserRole;
  };
  movieId: string;
  rating: number;
  comment: string;
  isSpoiler: boolean;
  tags: string[];
  status: ReviewStatus;
  likes: number;
  createdAt: string;
  /** Nested replies (same shape, rating may be 0 for top-level replies) */
  children?: Review[];
  /** Present when the session user has liked this review (from API) */
  likedByMe?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  genre: string;
  year: string;
  rating: number;
  description: string;
  backdrop: string;
  poster: string;
  movieId: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  slug: string;
}
