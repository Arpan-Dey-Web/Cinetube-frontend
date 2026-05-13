import Image from "next/image";
import Link from "next/link";
import { movieService } from "@/features/movie/api/api";
import type { Category } from "@/types/types";

const genreImage =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1740";

export async function CategoriesSection() {
  let categories: Category[] = [];
  let error = false;

  try {
    categories = await movieService.getMovieGenres();
  } catch {
    error = true;
  }

  return (
    <section className="container mx-auto px-6 lg:px-12 py-20">
      <div className="flex items-end justify-between border-b border-border pb-6 mb-12">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
          Browse by <span className="text-primary not-italic">Genre.</span>
        </h2>
        <Link
          href="/browse"
          className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-colors mb-2"
        >
          All Genres →
        </Link>
      </div>

      {error ? (
        <SectionState label="Unable to load genres" />
      ) : categories.length === 0 ? (
        <SectionState label="No genres available" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/browse?genre=${cat.slug}`}
            className="group relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src={cat.image || genreImage}
              alt={cat.name}
              fill
              sizes="(max-width: 1024px) 50vw, 16vw"
              className="absolute inset-0 object-cover grayscale scale-110 transition-all duration-700 group-hover:scale-100 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-background/70 group-hover:bg-background/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h3 className="text-base font-black uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                {cat.count} Films
              </p>
            </div>
            {/* Active bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>
        ))}
        </div>
      )}
    </section>
  );
}

function SectionState({ label }: { label: string }) {
  return (
    <div className="border border-border bg-card/20 p-10 text-center text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
      {label}
    </div>
  );
}
