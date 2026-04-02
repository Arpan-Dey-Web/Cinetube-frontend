import { MovieCard } from "@/components/modules/HomePage/MovieCard";
import { Bookmark, Clock, PlayCircle, Trash2 } from "lucide-react";

// Mock Data for the User's Watchlist
const WATCHLIST_DATA = [
  {
    id: "1",
    title: "Dune: Part Two",
    rating: 9.2,
    year: "2024",
    category: "Sci-Fi",
    image:
      "https://m.media-amazon.com/images/M/MV5BN2P2MjA0OGUtZWExOS00M2VjLTgzMjQtNjkwZTM2MjYwNTRiXkEyXkFqcGc@._V1_.jpg",
    addedDate: "MAR 28, 2026",
  },
  {
    id: "3",
    title: "Oppenheimer",
    rating: 8.9,
    year: "2023",
    category: "Drama",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzhmODhlNjMyMzI0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    addedDate: "APR 01, 2026",
  },
  {
    id: "5",
    title: "Blade Runner 2049",
    rating: 8.0,
    year: "2017",
    category: "Noir",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODgzNjU3MzI@._V1_.jpg",
    addedDate: "FEB 12, 2026",
  },
];

export default function WatchListPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* 1. BACKGROUND ATMOSPHERE */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="noise-overlay" />
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* 2. HEADER: PRIVATE COLLECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-border/50 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Bookmark className="h-3 w-3 text-primary fill-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                Personal Vault
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] text-foreground">
              Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/20 text-5xl md:text-7xl">
                Watchlist.
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                Queue Status
              </p>
              <div className="flex items-center gap-2 justify-end">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <p className="text-sm font-bold uppercase tracking-widest text-foreground">
                  Active_Sync
                </p>
              </div>
            </div>
            <div className="h-14 w-px bg-border/50" />
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                Items
              </p>
              <p className="text-3xl font-black italic text-primary leading-none tracking-tighter">
                0{WATCHLIST_DATA.length}
              </p>
            </div>
          </div>
        </div>

        {/* 3. WATCHLIST CONTENT */}
        {WATCHLIST_DATA.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {WATCHLIST_DATA.map((movie) => (
              <div key={movie.id} className="group relative">
                {/* Remove Action */}
                <button className="absolute top-4 right-4 z-20 h-10 w-10 bg-background/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive hover:text-white border border-border">
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Vertical Meta Information */}
                <div className="absolute -left-4 top-0 bottom-0 flex flex-col justify-between py-2 z-10 pointer-events-none">
                  <div className="h-1 w-1 bg-primary" />
                  <p className="[writing-mode:vertical-rl] text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 rotate-180">
                    Added: {movie.addedDate}
                  </p>
                </div>

                <MovieCard
                  title={movie.title}
                  rating={movie.rating}
                  year={movie.year}
                  image={movie.image}
                  category={movie.category}
                />

                {/* Watch Now Shortcut */}
                <button className="w-full mt-4 h-12 border border-border text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group/btn">
                  <PlayCircle className="h-4 w-4" />
                  Initiate Playback
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[40vh] border border-dashed border-border flex flex-col items-center justify-center space-y-6">
            <Clock className="h-8 w-8 text-muted-foreground opacity-20" />
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground">
                The Vault is Empty
              </p>
              <p className="text-[9px] font-medium text-muted-foreground/50 mt-2 uppercase tracking-widest">
                Add titles from the archive to begin your collection
              </p>
            </div>
          </div>
        )}

        {/* 4. RECOMMENDATION CTA */}
        <div className="mt-32 p-12 border border-border/50 bg-card/10 backdrop-blur-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 h-24 w-24 border-t-2 border-r-2 border-primary/20" />
          <div className="space-y-2 relative z-10">
            <h3 className="text-xl font-black uppercase italic tracking-tighter">
              Looking for more?
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Explore the algorithm's latest selections for your taste profile.
            </p>
          </div>
          <button className="px-10 py-4 bg-foreground text-background text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-colors relative z-10">
            Back to Archive
          </button>
        </div>
      </main>
    </div>
  );
}
