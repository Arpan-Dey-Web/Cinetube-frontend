"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Clapperboard,
  Film,
  PlayCircle,
  Search,
  Sparkles,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { MovieCard } from "@/features/home/components/MovieCard";
import { apiClient } from "@/shared/api/client";
import { Movie } from "@/types/types";

const MOOD_FILTERS = [
  {
    label: "All Moods",
    description: "Every title currently indexed in the archive.",
  },
  {
    label: "Neon Future",
    description: "Sci-fi worlds, cosmic scale, and strange signals.",
  },
  {
    label: "Character Heat",
    description: "People under pressure, moral fallout, and emotional stakes.",
  },
  {
    label: "Edge of Impact",
    description: "Action-led titles with velocity and tension.",
  },
  {
    label: "Members Only",
    description: "Premium entries for a deliberate movie night.",
  },
] as const;

const ERA_FILTERS = [
  {
    label: "All Eras",
    description: "The full active collection.",
  },
  {
    label: "2010s",
    description: "Modern titles released from 2010 to 2019.",
  },
  {
    label: "2020s",
    description: "Recent releases and newly digitized entries.",
  },
] as const;

const CURATOR_NOTES = [
  {
    title: "Archive First",
    description:
      "Use this page for discovery. The archive is where collections, moods, and editor context live before you jump into deeper browsing.",
  },
  {
    title: "Mixed Access",
    description:
      "Free and premium titles sit in the same stack on purpose, so new viewers and paying members can discover films in one uninterrupted flow.",
  },
  {
    title: "Built for Rewatching",
    description:
      "Director groupings, top-rated shelves, and era filters make it easier to revisit patterns instead of only chasing the newest release.",
  },
] as const;

type MoodFilter = (typeof MOOD_FILTERS)[number]["label"];
type EraFilter = (typeof ERA_FILTERS)[number]["label"];

function parseDurationMinutes(duration: string) {
  const match = duration.match(/(?:(\d+)h)?\s*(?:(\d+)m)?/i);
  if (!match) {
    return 0;
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);

  return hours * 60 + minutes;
}

function ArchiveStatCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="border border-border/50 bg-card/40 p-5 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-[9px] font-black uppercase tracking-[0.35em] text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="text-3xl font-black uppercase tracking-tighter text-foreground">
        {value}
      </p>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {note}
      </p>
    </div>
  );
}

function ArchiveShelf({
  eyebrow,
  title,
  description,
  movies,
}: {
  eyebrow: string;
  title: string;
  description: string;
  movies: Movie[];
}) {
  if (!movies.length) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
            {eyebrow}
          </p>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-foreground md:text-4xl">
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-foreground transition-colors hover:text-primary"
        >
          Open full catalogue
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard
            key={`${eyebrow}-${movie.id}`}
            id={movie.id}
            title={movie.title}
            rating={movie.rating}
            year={movie.year}
            image={movie.posterUrl}
            category={movie.genres[0] || movie.platform || "Movie"}
          />
        ))}
      </div>
    </section>
  );
}

export default function ArchivePage() {
  const [search, setSearch] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodFilter>("All Moods");
  const [selectedEra, setSelectedEra] = useState<EraFilter>("All Eras");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    apiClient
      .get<Movie[]>("/movie", { query: { limit: 100 }, cache: "no-store" })
      .then((response) => setMovies(response.data))
      .catch(() => setMovies([]));
  }, []);

  const featuredMovie = useMemo(
    () => [...movies].sort((a, b) => b.rating - a.rating)[0] ?? null,
    [movies],
  );

  const archiveStats = useMemo(() => {
    const totalTitles = movies.length;
    const freeTitles = movies.filter((movie) => movie.status === "FREE").length;
    const premiumTitles = movies.filter(
      (movie) => movie.status === "PREMIUM",
    ).length;
    const directors = new Set(movies.map((movie) => movie.director)).size;

    return [
      {
        label: "Titles",
        value: String(totalTitles).padStart(2, "0"),
        note: "Active files in circulation",
        icon: Film,
      },
      {
        label: "Free Access",
        value: String(freeTitles).padStart(2, "0"),
        note: "Open for instant playback",
        icon: PlayCircle,
      },
      {
        label: "Premium",
        value: String(premiumTitles).padStart(2, "0"),
        note: "Reserved for members",
        icon: Ticket,
      },
      {
        label: "Directors",
        value: String(directors).padStart(2, "0"),
        note: "Distinct voices in the stack",
        icon: Clapperboard,
      },
    ] as const;
  }, [movies]);

  const filteredArchive = useMemo(() => {
    const query = search.trim().toLowerCase();

    return movies.filter((movie) => {
      if (selectedMood === "Neon Future" && !movie.genres.includes("Sci-Fi")) {
        return false;
      }

      if (
        selectedMood === "Character Heat" &&
        !movie.genres.some((genre) => genre === "Drama" || genre === "Comedy")
      ) {
        return false;
      }

      if (selectedMood === "Edge of Impact" && !movie.genres.includes("Action")) {
        return false;
      }

      if (selectedMood === "Members Only" && movie.status !== "PREMIUM") {
        return false;
      }

      const year = Number(movie.year);
      if (selectedEra === "2010s" && (year < 2010 || year >= 2020)) {
        return false;
      }

      if (selectedEra === "2020s" && year < 2020) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableText = [
        movie.title,
        movie.director,
        movie.platform,
        movie.description,
        movie.genres.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [movies, search, selectedEra, selectedMood]);

  const activeMoodDescription =
    MOOD_FILTERS.find((filter) => filter.label === selectedMood)?.description ?? "";
  const activeEraDescription =
    ERA_FILTERS.find((filter) => filter.label === selectedEra)?.description ?? "";

  const staffPicks = useMemo(
    () => [...movies].sort((a, b) => b.rating - a.rating).slice(0, 4),
    [movies],
  );
  const recentlyDigitized = useMemo(
    () =>
      [...movies]
        .sort((a, b) => Number(b.year) - Number(a.year) || b.rating - a.rating)
        .slice(0, 4),
    [movies],
  );
  const freeTonight = useMemo(
    () =>
      movies.filter((movie) => movie.status === "FREE")
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4),
    [movies],
  );
  const directorSpotlight = useMemo(
    () => movies.filter((movie) => movie.director === featuredMovie?.director),
    [featuredMovie?.director, movies],
  );
  const longFormStories = useMemo(
    () =>
      movies.filter((movie) => parseDurationMinutes(movie.duration) >= 160)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4),
    [movies],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        <div className="absolute left-[-10%] top-[15%] h-[420px] w-[420px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute right-[-5%] top-0 h-[360px] w-[360px] rounded-full bg-primary/10 blur-[140px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 pb-24 pt-32 lg:px-12">
        <section className="border-b border-border/50 pb-12">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                  Master Index
                </span>
              </div>
              <h1 className="text-[clamp(3.25rem,10vw,7rem)] font-black uppercase tracking-tighter leading-[0.8] text-foreground">
                Film
                <br />
                <span className="bg-linear-to-b from-foreground to-foreground/20 bg-clip-text text-transparent">
                  Archive.
                </span>
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                The archive is the discovery floor of Cinetube. Instead of showing
                everything the same way, it pulls films into shelves, moods, and
                spotlighted collections so the library feels intentional.
              </p>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-end">
              <div className="text-right">
                <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                  Index Status
                </p>
                <p className="text-xl font-black uppercase tracking-tighter text-foreground">
                  Verified 2026
                </p>
              </div>
              <div className="hidden h-16 w-px bg-border/50 md:block" />
              <div className="text-right">
                <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                  Active Results
                </p>
                <p className="text-4xl font-black italic leading-none tracking-tighter text-primary">
                  {String(filteredArchive.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {archiveStats.map((stat) => (
            <ArchiveStatCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              note={stat.note}
            />
          ))}
        </section>

        {featuredMovie ? (
          <section className="relative mt-16 overflow-hidden border border-border/50">
            <div className="absolute inset-0">
              <Image
                src={featuredMovie.backdropUrl}
                alt={featuredMovie.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/30" />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />
            </div>

            <div className="relative z-10 grid gap-10 p-8 lg:grid-cols-[minmax(0,1.4fr)_280px] lg:p-10">
              <div className="max-w-2xl space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.35em] text-primary">
                    <Sparkles className="h-3 w-3" />
                    Curator Spotlight
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                    Highest rated in the active archive
                  </span>
                </div>

                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground md:text-6xl">
                    {featuredMovie.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                    {featuredMovie.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {featuredMovie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="border border-border/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-foreground"
                    >
                      {genre}
                    </span>
                  ))}
                  <span className="border border-border/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
                    {featuredMovie.year}
                  </span>
                  <span className="border border-border/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
                    {featuredMovie.duration}
                  </span>
                </div>

                <div className="grid gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground md:grid-cols-3">
                  <div>
                    <p>Director</p>
                    <p className="mt-2 text-sm text-foreground">{featuredMovie.director}</p>
                  </div>
                  <div>
                    <p>Platform</p>
                    <p className="mt-2 text-sm text-foreground">{featuredMovie.platform}</p>
                  </div>
                  <div>
                    <p>Access</p>
                    <p className="mt-2 text-sm text-foreground">{featuredMovie.status}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/browse/${featuredMovie.id}`}
                    className="inline-flex items-center gap-3 bg-foreground px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Watch spotlight
                  </Link>
                  <Link
                    href="/browse"
                    className="inline-flex items-center gap-3 border border-border bg-background/40 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
                  >
                    Open full browse
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto hidden w-full max-w-[280px] lg:block">
                <div className="absolute -left-4 top-8 z-0 h-full w-full border border-primary/20" />
                <div className="relative z-10 aspect-[2/3] overflow-hidden border border-border/60 shadow-2xl shadow-background/40">
                  <Image
                    src={featuredMovie.posterUrl}
                    alt={`${featuredMovie.title} poster`}
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-20 space-y-8">
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
              Open the Stacks
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-foreground md:text-4xl">
              Search by mood, era, or name
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Keep the archive playful here. Browse handles deep filtering. This
              layer is for quick discovery and visual entry points.
            </p>
          </div>

          <div className="grid gap-6 border border-border/50 bg-card/20 p-6 backdrop-blur-sm lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="space-y-6">
              <div className="group relative max-w-xl">
                <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search title, director, platform, or genre"
                  className="w-full border-b border-border/60 bg-transparent py-3 pl-8 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                />
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                  Mood
                </p>
                <div className="flex flex-wrap gap-3">
                  {MOOD_FILTERS.map((filter) => {
                    const active = filter.label === selectedMood;
                    return (
                      <button
                        key={filter.label}
                        onClick={() => setSelectedMood(filter.label)}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] transition-colors ${active
                            ? "bg-primary text-primary-foreground"
                            : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
                          }`}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                  Era
                </p>
                <div className="flex flex-wrap gap-3">
                  {ERA_FILTERS.map((filter) => {
                    const active = filter.label === selectedEra;
                    return (
                      <button
                        key={filter.label}
                        onClick={() => setSelectedEra(filter.label)}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] transition-colors ${active
                            ? "bg-foreground text-background"
                            : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
                          }`}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-border/50 pt-6 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                  Active read
                </p>
                <p className="mt-2 text-lg font-black uppercase tracking-tighter text-foreground">
                  {selectedMood}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {activeMoodDescription}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                  Era filter
                </p>
                <p className="mt-2 text-lg font-black uppercase tracking-tighter text-foreground">
                  {selectedEra}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {activeEraDescription}
                </p>
              </div>

              <button
                onClick={() => {
                  setSearch("");
                  setSelectedMood("All Moods");
                  setSelectedEra("All Eras");
                }}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-primary transition-opacity hover:opacity-80"
              >
                Reset index
              </button>
            </div>
          </div>

          {filteredArchive.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-3 xl:grid-cols-4">
              {filteredArchive.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  rating={movie.rating}
                  year={movie.year}
                  image={movie.posterUrl}
                  category={movie.genres[0] || movie.platform || "Movie"}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 border border-dashed border-border/60 px-6 py-12 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.45em] text-muted-foreground">
                No active files
              </p>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground">
                Nothing matches this cut
              </h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Clear the search or switch mood and era to reopen the stack. The
                curated shelves below are still available if you want a faster way in.
              </p>
            </div>
          )}
        </section>

        <section className="mt-24 space-y-20">
          <ArchiveShelf
            eyebrow="Shelf 01"
            title="Staff Picks"
            description="A quick editorial entry point for the films that best represent the tone of the platform."
            movies={staffPicks}
          />

          <ArchiveShelf
            eyebrow="Shelf 02"
            title="Recently Digitized"
            description="The freshest entries in the archive, sorted by release year and trimmed to the most compelling additions."
            movies={recentlyDigitized}
          />

          <ArchiveShelf
            eyebrow="Shelf 03"
            title="Free Tonight"
            description="High-value titles available without premium access when you want something good immediately."
            movies={freeTonight}
          />

          <ArchiveShelf
            eyebrow="Shelf 04"
            title="Director Spotlight: Christopher Nolan"
            description="A focused stack for viewers who want scale, tension, and films designed for rewatching."
            movies={directorSpotlight}
          />

          <ArchiveShelf
            eyebrow="Shelf 05"
            title="Long-Form Stories"
            description="Feature-length experiences built for a committed evening, selected by runtime and rating."
            movies={longFormStories}
          />
        </section>

        <section className="mt-24 border-t border-border/50 pt-12">
          <div className="mb-8 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
              Curator Notes
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-foreground md:text-4xl">
              What makes this page different
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {CURATOR_NOTES.map((note) => (
              <div
                key={note.title}
                className="border border-border/50 bg-card/20 p-6 backdrop-blur-sm"
              >
                <p className="text-lg font-black uppercase tracking-tighter text-foreground">
                  {note.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {note.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
