import type { BlogPost } from "@/types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-a-premium-movie-library",
    title: "Building a Premium Movie Library",
    excerpt:
      "How curated shelves, access checks, and review context shape a streaming catalogue that feels intentional.",
    coverImage:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1740",
    author: "Cinetube Editorial",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300",
    date: "May 1, 2026",
    readTime: "5 min read",
    category: "Product",
  },
  {
    slug: "moderation-that-protects-story",
    title: "Moderation That Protects Story",
    excerpt:
      "Spoiler-aware review workflows help communities stay useful without flattening real audience reactions.",
    coverImage:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1740",
    author: "Cinetube Editorial",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
    date: "April 24, 2026",
    readTime: "4 min read",
    category: "Community",
  },
  {
    slug: "from-watchlist-to-library",
    title: "From Watchlist to Library",
    excerpt:
      "A practical look at turning saved movies, purchases, and playback progress into a useful member dashboard.",
    coverImage:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1740",
    author: "Cinetube Editorial",
    authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300",
    date: "April 15, 2026",
    readTime: "6 min read",
    category: "UX",
  },
];
