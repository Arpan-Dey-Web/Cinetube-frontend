import { MovieCard } from "@/components/modules/HomePage/MovieCard";
import { Search, SlidersHorizontal, ArrowUpRight } from "lucide-react";

// Generated Mock Data for your Archive
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

export default function ArchivePage() {
  return (
    <div className="relative min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* 1. ATMOSPHERIC BACKGROUND OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grain texture using the data-uri fix we discussed */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        <div className="absolute top-0 right-0 h-150 w-150 bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* 2. BOLD EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-border/50 pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                Master Index
              </span>
            </div>
            <h1 className="text-[clamp(3rem,10vw,7rem)] font-black italic uppercase tracking-tighter leading-[0.75] text-foreground">
              Film <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/20">
                Archive.
              </span>
            </h1>
          </div>

          {/* Technical Metadata Display */}
          <div className="flex items-center gap-8">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                Index Status
              </p>
              <p className="text-xl font-black text-foreground uppercase italic tracking-tighter">
                Verified_2026
              </p>
            </div>
            <div className="h-16 w-px bg-border/50" />
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                File Count
              </p>
              <p className="text-4xl font-black text-primary tracking-tighter italic leading-none">
                0{ARCHIVE_DATA.length}
              </p>
            </div>
          </div>
        </div>

        {/* 3. FUNCTIONAL UTILITIES (Filters & Search) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {[
              "All Entries",
              "Critically Acclaimed",
              "Recently Digitized",
              "Noir Collection",
              "Sci-Fi",
            ].map((tag, i) => (
              <button
                key={tag}
                className={`group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] transition-all ${i === 0 ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tag}
                <ArrowUpRight
                  className={`h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ${i === 0 ? "opacity-100" : ""}`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group w-full md:w-72">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                placeholder="SEARCH CATALOGUE..."
                className="w-full bg-transparent border-b border-border/50 focus:border-primary py-2 pl-8 text-[9px] font-black tracking-widest uppercase outline-none transition-all placeholder:text-muted-foreground/30"
              />
            </div>
            <button className="p-3 border border-border hover:border-primary hover:bg-primary/5 transition-all">
              <SlidersHorizontal className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* 4. THE VAULT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-20">
          {ARCHIVE_DATA.map((movie) => (
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

        {/* 5. EDITORIAL FOOTER */}
        <div className="mt-32 pt-16 border-t border-border/30 flex flex-col items-center">
          <div className="h-1 w-1 bg-primary mb-8" />
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground mb-6">
            End of Index
          </p>
          <button className="group relative px-16 py-5 overflow-hidden border border-border">
            <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-[10px] font-black uppercase tracking-widest group-hover:text-background transition-colors">
              Synchronize More Data
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
