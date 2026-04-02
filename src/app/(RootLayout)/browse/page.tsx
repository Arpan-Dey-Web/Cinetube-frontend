import { MovieCard } from "@/components/modules/HomePage/MovieCard";
import { movieService } from "@/services/module/movie/movie.service";
import { Search, SlidersHorizontal } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  rating: number;
  year: string;
  genres: string[];
  posterUrl: string;
}

export default async function BrowsePage() {
  const movies: Movie[] = await movieService.getAllMovies();
  console.log(movies);

  return (
    <div className="relative min-h-screen bg-background">
      {/* BACKGROUND ELEMENTS REMAIN THE SAME */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[20%] -left-[5%] h-150 w-150 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-border/50 pb-10">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] text-foreground">
              Browse <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/20">
                Cinema.
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Collection Count
              </p>
              <p className="text-2xl font-black italic text-foreground tracking-tighter">
                {movies.length.toString().padStart(3, "0")}
              </p>
            </div>
            {/* Filter Toggle Button */}
            <button className="h-14 w-14 border border-border flex items-center justify-center hover:bg-primary group transition-all duration-500">
              <SlidersHorizontal className="h-5 w-5 text-foreground group-hover:text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* 3. FILTER & SEARCH (Note: For real search, you'd move this to a Client Component) */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-12">
          {/* Map your categories/filters here */}
          <div className="relative group w-full md:w-64">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="FILTER BY KEYWORD..."
              className="w-full bg-transparent border-b border-border/50 py-2 pl-8 text-[9px] font-black tracking-widest uppercase outline-none"
            />
          </div>
        </div>

        {/* 4. MOVIE GRID - NOW DYNAMIC */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-16">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.rating}
              year={movie.year}
              image={movie.posterUrl} 
              category={movie.genres[0] || "Cinema"} 
            />
          ))}
        </div>

        {/* 5. FOOTER */}
        <div className="mt-24 pt-12 border-t border-border/50 flex flex-col items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">
            End of Current Archive
          </p>
        </div>
      </main>
    </div>
  );
}
