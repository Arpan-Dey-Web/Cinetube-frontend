// ──────────────────────────────────────────────────────────────────────────────
// MOCK DATA — Replace all entries with real API calls to the backend
// Backend base: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
// ──────────────────────────────────────────────────────────────────────────────

import { BlogPost, Category, HeroSlide, Movie, Review, Testimonial } from "@/types/types";

// TODO: fetch from backend → GET /api/movie?filter=featured&limit=5
export const MOCK_HERO_SLIDES: HeroSlide[] = [
  {
    id: "1",
    title: "Dune: Part Two",
    genre: "Sci-Fi // Epic",
    year: "2024",
    rating: 9.2,
    description:
      "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    backdrop:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071",
    poster:
      "https://m.media-amazon.com/images/M/MV5BN2P2MjA0OGUtZWExOS00M2VjLTgzMjQtNjkwZTM2MjYwNTRiXkEyXkFqcGc@._V1_.jpg",
    movieId: "t1",
  },
  {
    id: "2",
    title: "Oppenheimer",
    genre: "Drama // Biography",
    year: "2023",
    rating: 8.9,
    description:
      "The story of J. Robert Oppenheimer and his pivotal role in the development of the atomic bomb during World War II.",
    backdrop:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzhmODhlNjMyMzI0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    movieId: "t2",
  },
  {
    id: "3",
    title: "Interstellar",
    genre: "Sci-Fi // Adventure",
    year: "2014",
    rating: 8.7,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    backdrop:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    movieId: "t3",
  },
];

// TODO: fetch from backend → GET /api/movie/genres with count
export const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Action",
    count: 142,
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=1740",
    slug: "action",
  },
  {
    id: "2",
    name: "Sci-Fi",
    count: 98,
    image:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1740",
    slug: "sci-fi",
  },
  {
    id: "3",
    name: "Drama",
    count: 215,
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1740",
    slug: "drama",
  },
  {
    id: "4",
    name: "Thriller",
    count: 87,
    image:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1740",
    slug: "thriller",
  },
  {
    id: "5",
    name: "Comedy",
    count: 176,
    image:
      "https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=1740",
    slug: "comedy",
  },
  {
    id: "6",
    name: "Horror",
    count: 63,
    image:
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1740",
    slug: "horror",
  },
];

// TODO: fetch from backend → GET /api/movie?sort=rating&limit=8
export const MOCK_TRENDING: Movie[] = [
  {
    id: "t1",
    title: "Dune: Part Two",
    description: "Epic sci-fi sequel following Paul Atreides.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya"],
    year: "2024",
    duration: "2h 46m",
    rating: 9.2,
    genres: ["Sci-Fi"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BN2P2MjA0OGUtZWExOS00M2VjLTgzMjQtNjkwZTM2MjYwNTRiXkEyXkFqcGc@._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071",
    platform: "Cinema",
    status: "PREMIUM",
    price: 14.99,
  },
  {
    id: "t2",
    title: "Oppenheimer",
    description: "The story behind the atomic bomb.",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt"],
    year: "2023",
    duration: "3h 0m",
    rating: 8.9,
    genres: ["Drama"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzhmODhlNjMyMzI0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070",
    platform: "Prime",
    status: "PREMIUM",
    price: 12.99,
  },
  {
    id: "t3",
    title: "Interstellar",
    description: "A team travels through a wormhole in space.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    year: "2014",
    duration: "2h 49m",
    rating: 8.7,
    genres: ["Sci-Fi"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070",
    platform: "Netflix",
    status: "FREE",
  },
  {
    id: "t4",
    title: "The Batman",
    description: "Batman ventures into Gotham's underworld.",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz"],
    year: "2022",
    duration: "2h 56m",
    rating: 8.5,
    genres: ["Action"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1740",
    platform: "HBO",
    status: "FREE",
  },
  {
    id: "t5",
    title: "Blade Runner 2049",
    description: "A blade runner uncovers a long-buried secret.",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford"],
    year: "2017",
    duration: "2h 44m",
    rating: 8.0,
    genres: ["Sci-Fi"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODgzNjU3MzI@._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071",
    platform: "Netflix",
    status: "FREE",
  },
];

// TODO: fetch from backend → GET /api/movie?sort=createdAt&order=desc&limit=8
export const MOCK_NEWLY_ADDED: Movie[] = [
  {
    id: "n1",
    title: "Poor Things",
    description: "The incredible tale of Bella Baxter, brought back to life.",
    director: "Yorgos Lanthimos",
    cast: ["Emma Stone", "Mark Ruffalo"],
    year: "2023",
    duration: "2h 21m",
    rating: 8.1,
    genres: ["Comedy"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BNGIyYWMzNjUtMDg2My00YjLWFtgwMWUtZWY1M2I2Y2I3Y2I3XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=2070",
    platform: "Disney+",
    status: "FREE",
  },
  {
    id: "n2",
    title: "Arrival",
    description: "A linguist works to communicate with extraterrestrial visitors.",
    director: "Denis Villeneuve",
    cast: ["Amy Adams", "Jeremy Renner"],
    year: "2016",
    duration: "1h 56m",
    rating: 7.9,
    genres: ["Sci-Fi"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI0MjAx._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071",
    platform: "Prime",
    status: "FREE",
  },
  {
    id: "n3",
    title: "The Northman",
    description: "A Viking prince seeks revenge for his father's murder.",
    director: "Robert Eggers",
    cast: ["Alexander Skarsgård", "Anya Taylor-Joy"],
    year: "2022",
    duration: "2h 17m",
    rating: 7.1,
    genres: ["Action"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMzVjMmYwN2ItY2VlNy00N2VmLWJlZjAtN2FmZDM5MzVlZTUyXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=1740",
    platform: "Netflix",
    status: "PREMIUM",
    price: 9.99,
  },
  {
    id: "n4",
    title: "Past Lives",
    description: "Two childhood friends reunite after decades apart.",
    director: "Celine Song",
    cast: ["Greta Lee", "Teo Yoo"],
    year: "2023",
    duration: "1h 45m",
    rating: 7.8,
    genres: ["Drama"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BZjE3YTU0YjItMjQ3NS00NjZlLWEzNWMtMzg0NTNjYjdhOTUwXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1740",
    platform: "A24",
    status: "FREE",
  },
];

// TODO: fetch from backend → GET /api/review/featured (approved reviews with high likes)
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "FLICKS transformed how I experience cinema. The review system is incredibly thoughtful — spoiler warnings, tagging, community discussion. It's the IMDb I always wanted.",
    name: "Marcus Webb",
    role: "Film Critic · The Reel Review",
    avatar: "https://i.pravatar.cc/100?u=marcus-webb",
    rating: 10,
  },
  {
    id: "2",
    quote:
      "I've tried every streaming aggregator out there. Nothing comes close to FLICKS for discovering hidden gems. The editor's picks alone introduced me to 20 films this year.",
    name: "Priya Sharma",
    role: "Cinema Enthusiast · 500+ Reviews",
    avatar: "https://i.pravatar.cc/100?u=priya-sharma",
    rating: 9,
  },
  {
    id: "3",
    quote:
      "The premium subscription is worth every penny. 4K HDR, no ads, and early access to new additions. This is exactly what the modern cinema experience should be.",
    name: "James Kowalski",
    role: "Premium Member · Since 2025",
    avatar: "https://i.pravatar.cc/100?u=james-kowalski",
    rating: 10,
  },
];

// TODO: fetch from blog API or CMS
export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    slug: "practical-effects-lost-art",
    title: "The Art of Practical Effects: A Lost Cinema Tradition",
    excerpt:
      "From Star Wars miniatures to Blade Runner's cityscape, practical effects defined an era. We explore why CGI hasn't fully replaced the magic of real craftsmanship.",
    coverImage:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1740",
    author: "Elara Mitchell",
    authorImage: "https://i.pravatar.cc/80?u=elara-mitchell",
    date: "April 8, 2026",
    readTime: "7 min read",
    category: "Craft",
  },
  {
    slug: "scifi-predictions",
    title: "10 Sci-Fi Films That Predicted Our Future",
    excerpt:
      "From smartphone addiction to surveillance states, these films saw what was coming decades before we did. A deep dive into cinema's prophetic imagination.",
    coverImage:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1740",
    author: "Rohan Das",
    authorImage: "https://i.pravatar.cc/80?u=rohan-das",
    date: "April 5, 2026",
    readTime: "9 min read",
    category: "Analysis",
  },
  {
    slug: "nolan-visual-language",
    title: "Christopher Nolan's Visual Language: A Deep Dive",
    excerpt:
      "Non-linear timelines, IMAX immersion, practical stunts. We decode the recurring motifs that make a Christopher Nolan film unmistakably his.",
    coverImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070",
    author: "Sasha Ivanov",
    authorImage: "https://i.pravatar.cc/80?u=sasha-ivanov",
    date: "April 2, 2026",
    readTime: "11 min read",
    category: "Directors",
  },
];

// TODO: fetch from backend → GET /api/admin/dashboard-stats
export const MOCK_DASHBOARD_STATS = {
  totalMovies: 5247,
  totalReviews: 124820,
  totalUsers: 52410,
  premiumUsers: 14320,
  totalRevenue: 143200,
  pendingReviews: 38,
  newMoviesThisMonth: 42,
  activeUsersToday: 1820,
};

// TODO: fetch from backend → GET /api/admin/analytics/reviews-by-month
export const MOCK_CHART_DATA = [
  { month: "May", reviews: 820, ratings: 4.2 },
  { month: "Jun", reviews: 1240, ratings: 6.1 },
  { month: "Jul", reviews: 980, ratings: 5.4 },
  { month: "Aug", reviews: 1560, ratings: 7.8 },
  { month: "Sep", reviews: 1120, ratings: 5.9 },
  { month: "Oct", reviews: 1840, ratings: 8.2 },
  { month: "Nov", reviews: 2100, ratings: 9.1 },
  { month: "Dec", reviews: 1780, ratings: 8.5 },
  { month: "Jan", reviews: 1450, ratings: 7.2 },
  { month: "Feb", reviews: 1680, ratings: 8.0 },
  { month: "Mar", reviews: 2240, ratings: 9.6 },
  { month: "Apr", reviews: 1920, ratings: 8.8 },
];

// TODO: fetch from backend → GET /api/admin/analytics/genre-distribution
export const MOCK_GENRE_DATA = [
  { genre: "Drama", count: 215, fill: "var(--chart-1)" },
  { genre: "Action", count: 142, fill: "var(--chart-2)" },
  { genre: "Comedy", count: 176, fill: "var(--chart-3)" },
  { genre: "Sci-Fi", count: 98, fill: "var(--chart-4)" },
  { genre: "Thriller", count: 87, fill: "var(--chart-5)" },
];

// TODO: fetch from backend → GET /api/admin/movies?limit=10
export const MOCK_ADMIN_MOVIES = [
  {
    id: "m1",
    title: "Dune: Part Two",
    genre: "Sci-Fi",
    status: "PREMIUM" as const,
    rating: 9.2,
    reviews: 4820,
    year: "2024",
    director: "Denis Villeneuve",
    isPublished: true,
  },
  {
    id: "m2",
    title: "Oppenheimer",
    genre: "Drama",
    status: "PREMIUM" as const,
    rating: 8.9,
    reviews: 6140,
    year: "2023",
    director: "Christopher Nolan",
    isPublished: true,
  },
  {
    id: "m3",
    title: "Interstellar",
    genre: "Sci-Fi",
    status: "FREE" as const,
    rating: 8.7,
    reviews: 8920,
    year: "2014",
    director: "Christopher Nolan",
    isPublished: true,
  },
  {
    id: "m4",
    title: "The Batman",
    genre: "Action",
    status: "FREE" as const,
    rating: 8.5,
    reviews: 5210,
    year: "2022",
    director: "Matt Reeves",
    isPublished: false,
  },
  {
    id: "m5",
    title: "Poor Things",
    genre: "Comedy",
    status: "FREE" as const,
    rating: 8.1,
    reviews: 2840,
    year: "2023",
    director: "Yorgos Lanthimos",
    isPublished: true,
  },
];

// TODO: fetch from backend → GET /api/review?status=PENDING&limit=10
export const MOCK_ADMIN_REVIEWS: Review[] = [
  {
    id: "r1",
    user: { id: "u1", name: "Alex Chen", role: "USER" },
    movieId: "m1",
    rating: 9,
    comment:
      "A visually stunning epic that redefines the science fiction genre. Villeneuve has crafted something truly remarkable.",
    isSpoiler: false,
    tags: ["masterpiece", "epic"],
    status: "PENDING",
    likes: 42,
    createdAt: "2026-04-09T14:22:00Z",
  },
  {
    id: "r2",
    user: { id: "u2", name: "Sarah Mills", role: "USER" },
    movieId: "m2",
    rating: 10,
    comment:
      "Three hours felt like thirty minutes. Murphy's performance is absolutely transcendent. This is cinema.",
    isSpoiler: true,
    tags: ["must-watch", "oscar-worthy"],
    status: "PENDING",
    likes: 87,
    createdAt: "2026-04-08T09:15:00Z",
  },
  {
    id: "r3",
    user: { id: "u3", name: "David Park", role: "USER" },
    movieId: "m3",
    rating: 8,
    comment:
      "Still holds up after a decade. The practical effects and Hans Zimmer score create an overwhelming experience.",
    isSpoiler: false,
    tags: ["classic", "timeless"],
    status: "APPROVED",
    likes: 156,
    createdAt: "2026-04-07T18:44:00Z",
  },
];

// TODO: fetch from backend → GET /api/watchlist (authenticated user)
export const MOCK_USER_WATCHLIST: Movie[] = [
  {
    id: "t1",
    title: "Dune: Part Two",
    description: "Epic sci-fi sequel following Paul Atreides.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya"],
    year: "2024",
    duration: "2h 46m",
    rating: 9.2,
    genres: ["Sci-Fi"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BN2P2MjA0OGUtZWExOS00M2VjLTgzMjQtNjkwZTM2MjYwNTRiXkEyXkFqcGc@._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071",
    platform: "Cinema",
    status: "PREMIUM",
    price: 14.99,
  },
  {
    id: "t4",
    title: "The Batman",
    description: "Batman ventures into Gotham's underworld.",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz"],
    year: "2022",
    duration: "2h 56m",
    rating: 8.5,
    genres: ["Action"],
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
    backdropUrl:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1740",
    platform: "HBO",
    status: "FREE",
  },
];

// TODO: fetch from backend → GET /api/review?userId=me&limit=10
export const MOCK_USER_REVIEWS: Review[] = [
  {
    id: "ur1",
    user: { id: "me", name: "You", role: "USER" },
    movieId: "m1",
    rating: 9,
    comment:
      "A visually stunning sequel that exceeds the original in scope and emotional depth.",
    isSpoiler: false,
    tags: ["epic", "must-watch"],
    status: "APPROVED",
    likes: 12,
    createdAt: "2026-04-05T10:30:00Z",
  },
  {
    id: "ur2",
    user: { id: "me", name: "You", role: "USER" },
    movieId: "m3",
    rating: 10,
    comment:
      "My all-time favourite. The score, the visuals, the philosophical depth — unmatched.",
    isSpoiler: false,
    tags: ["masterpiece", "timeless"],
    status: "APPROVED",
    likes: 28,
    createdAt: "2026-03-20T16:45:00Z",
  },
  {
    id: "ur3",
    user: { id: "me", name: "You", role: "USER" },
    movieId: "m5",
    rating: 7,
    comment: "Interesting experiment but not for everyone. Emma Stone is incredible.",
    isSpoiler: true,
    tags: ["experimental"],
    status: "PENDING",
    likes: 3,
    createdAt: "2026-04-09T09:00:00Z",
  },
];

export const ALL_GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Thriller",
  "Horror",
  "Romance",
  "Documentary",
  "Animation",
  "Noir",
];

export const ALL_PLATFORMS = [
  "Netflix",
  "Prime",
  "Disney+",
  "HBO",
  "Apple TV+",
  "Cinema",
];
