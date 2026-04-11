import {
  Film,
  Headphones,
  LifeBuoy,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  type LucideIcon,
} from "lucide-react";

export const PUBLIC_NAV_LINKS = [
  { label: "Archive", href: "/archive" },
  { label: "Watchlist", href: "/watchlist" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_SECTIONS = [
  {
    title: "Explore",
    links: [
      { label: "Browse Library", href: "/browse" },
      { label: "Trending This Week", href: "/browse?sort=rating-desc" },
      { label: "Newly Added", href: "/browse?sort=year-desc" },
      { label: "Editor Journal", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "Pricing Plans", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Flicks", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Twitter", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
] as const;

export const DEMO_ACCOUNTS = {
  user: {
    label: "Demo User",
    email: "user@cinetube.com",
    password: "@User-123",
  },
  admin: {
    label: "Demo Admin",
    email: "admin@cinetube.com",
    password: "@Admin-123",
  },
} as const;

export const FEATURE_PILLARS: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Curated Discovery",
    description:
      "Explore editor picks, trending releases, and genre collections tuned for serious movie fans.",
    icon: Sparkles,
  },
  {
    title: "Review Moderation",
    description:
      "Spoiler-aware review publishing and moderation keep the community thoughtful and safe to browse.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Access",
    description:
      "Mix free streaming, premium rentals, and member plans without leaving the same experience.",
    icon: Ticket,
  },
  {
    title: "Member Profiles",
    description:
      "Track watchlists, ratings, purchase history, and dashboard activity in one place.",
    icon: Users,
  },
];

export const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "A starter seat for casual viewers exploring the public library.",
    cta: "Start Free",
    featured: false,
    features: [
      "Access the free library",
      "Create a watchlist",
      "Post reviews for moderation",
      "Join community discussions",
    ],
  },
  {
    name: "Monthly Premium",
    price: "$14",
    cadence: "per month",
    description: "Best for active members who want new releases and higher-quality streaming.",
    cta: "Upgrade Monthly",
    featured: true,
    features: [
      "Premium title access",
      "4K stream playback",
      "Priority review visibility",
      "Saved playback history",
    ],
  },
  {
    name: "Annual Premium",
    price: "$129",
    cadence: "per year",
    description: "A portfolio-friendly plan for cinema lovers who live inside the archive.",
    cta: "Choose Annual",
    featured: false,
    features: [
      "Everything in Monthly",
      "2 months free",
      "Priority support",
      "Early access to curated drops",
    ],
  },
] as const;

export const SUPPORT_CHANNELS: Array<{
  title: string;
  description: string;
  href: string;
  action: string;
  icon: LucideIcon;
}> = [
  {
    title: "General Support",
    description: "Questions about access, reviews, or account recovery.",
    href: "mailto:support@cinetube.com",
    action: "Email Support",
    icon: Mail,
  },
  {
    title: "Community Moderation",
    description: "Report abusive reviews, spoiler misuse, or unsafe content.",
    href: "mailto:moderation@cinetube.com",
    action: "Contact Moderation",
    icon: ShieldCheck,
  },
  {
    title: "Live Member Help",
    description: "Need a quick answer before checkout or during playback.",
    href: "/help",
    action: "Open Help Center",
    icon: LifeBuoy,
  },
];

export const FAQ_ITEMS = [
  {
    question: "How does review approval work?",
    answer:
      "Every new review enters moderation first. Admins can approve, unpublish, or remove reviews to keep quality high and spoiler tags accurate.",
  },
  {
    question: "Can users watch free and premium titles in the same account?",
    answer:
      "Yes. Free titles remain available to all members, while premium titles unlock through subscription or one-time purchase depending on the movie.",
  },
  {
    question: "Are spoiler warnings supported?",
    answer:
      "Yes. Review authors can mark spoilers and attach tags so readers understand the tone of the review before opening it.",
  },
  {
    question: "What do admins see in the dashboard?",
    answer:
      "Admins can manage the movie library, moderate reviews, monitor revenue signals, and inspect community activity from one dashboard.",
  },
] as const;

export const SUPPORT_GUIDES: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Account Recovery",
    description:
      "Need login help? Use your verified email or contact support for manual recovery and session cleanup.",
    icon: Headphones,
  },
  {
    title: "Playback Access",
    description:
      "Check whether the title is free, premium, or already purchased before opening the player.",
    icon: Film,
  },
  {
    title: "Review Etiquette",
    description:
      "Mark spoilers clearly, keep language respectful, and use tags to help others understand your perspective.",
    icon: MessageSquare,
  },
] as const;
