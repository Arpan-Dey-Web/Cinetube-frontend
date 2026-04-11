"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { MovieCard } from "@/components/modules/HomePage/MovieCard";

const ARCHIVE_DATA = [
  {
    id: "1",
    title: "Dune: Part Two",
    rating: 9.2,
    year: "2024",
    category: "Sci-Fi",
    image:
      "https://m.media-amazon.com/images/M/MV5BN2P2MjA0OGUtZWExOS00M2VjLTgzMjQtNjkwZTM2MjYwNTRiXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: "2",
    title: "The Batman",
    rating: 8.5,
    year: "2022",
    category: "Action",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
  },
  {
    id: "3",
    title: "Oppenheimer",
    rating: 8.9,
    year: "2023",
    category: "Drama",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzhmODhlNjMyMzI0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
  },
  {
    id: "4",
    title: "Interstellar",
    rating: 8.7,
    year: "2014",
    category: "Sci-Fi",
    image:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
  },
  {
    id: "5",
    title: "Blade Runner 2049",
    rating: 8.0,
    year: "2017",
    category: "Noir",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODgzNjU3MzI@._V1_.jpg",
  },
  {
    id: "6",
    title: "Poor Things",
    rating: 8.1,
    year: "2023",
    category: "Comedy",
    image:
      "https://m.media-amazon.com/images/M/MV5BNGIyYWMzNjUtMDg2My00YjLWFtgwMWUtZWY1M2I2Y2I3Y2I3XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
  },
  {
    id: "7",
    title: "Arrival",
    rating: 7.9,
    year: "2016",
    category: "Sci-Fi",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI0MjAx._V1_.jpg",
  },
  {
    id: "8",
    title: "The Northman",
    rating: 7.1,
    year: "2022",
    category: "Action",
    image:
      "https://m.media-amazon.com/images/M/MV5BMzVjMmYwN2ItY2VlNy00N2VmLWJlZjAtN2FmZDM5MzVlZTUyXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
  },
];

const FILTERS = [
  "All Entries",
  "Critically Acclaimed",
  "Recently Digitized",
  "Noir Collection",
  "Sci-Fi",
] as const;

export default function ArchivePage() {
  const [selectedFilter, setSelectedFilter] =
    useState<(typeof FILTERS)[number]>("All Entries");
  const [search, setSearch] = useState("");

  const filteredArchive = useMemo(() => {
    let result = [...ARCHIVE_DATA];

    if (selectedFilter === "Noir Collection") {
      result = result.filter((movie) => movie.category === "Noir");
    }

    if (selectedFilter === "Sci-Fi") {
      result = result.filter((movie) => movie.category === "Sci-Fi");
    }

    if (selectedFilter === "Critically Acclaimed") {
      result = result.filter((movie) => movie.rating >= 8.5);
    }

    if (selectedFilter === "Recently Digitized") {
      result = result.filter((movie) => Number(movie.year) >= 2022);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query) ||
          movie.category.toLowerCase().includes(query),
      );
    }

    return result;
  }, [search, selectedFilter]);

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        <div className="absolute right-0 top-0 h-150 w-150 rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 pb-24 pt-32 lg:px-12">
        <div className="mb-20 flex flex-col gap-12 border-b border-border/50 pb-12 md:flex-row md:items-end md:justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                Master Index
              </span>
            </div>
            <h1 className="text-[clamp(3rem,10vw,7rem)] font-black uppercase tracking-tighter leading-[0.75] text-foreground">
              Film <br />
              <span className="bg-linear-to-b from-foreground to-foreground/20 bg-clip-text text-transparent">
                Archive.
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden text-right sm:block">
              <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                Index Status
              </p>
              <p className="text-xl font-black uppercase tracking-tighter text-foreground">
                Verified 2026
              </p>
            </div>
            <div className="h-16 w-px bg-border/50" />
            <div className="text-right">
              <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                File Count
              </p>
              <p className="text-4xl font-black italic leading-none tracking-tighter text-primary">
                {String(filteredArchive.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {FILTERS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedFilter(tag)}
                className={`group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] transition-all ${selectedFilter === tag
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tag}
                <ArrowUpRight
                  className={`h-3 w-3 transition-opacity ${selectedFilter === tag ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="group relative w-full md:w-72">
              <Search className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="SEARCH CATALOGUE..."
                className="w-full border-b border-border/50 bg-transparent py-2 pl-8 text-[9px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-muted-foreground/30 focus:border-primary"
              />
            </div>
            <button
              onClick={() => {
                setSearch("");
                setSelectedFilter("All Entries");
              }}
              className="border border-border p-3 transition-all hover:border-primary hover:bg-primary/5"
            >
              <SlidersHorizontal className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-20 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filteredArchive.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.rating}
              year={movie.year}
              image={movie.image}
              category={movie.category}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
