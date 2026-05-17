import { HeroCarousel } from "@/features/home/components/HeroCarousel";
import { CategoriesSection } from "@/features/home/components/CategoriesSection";
import { MovieCard } from "@/features/home/components/MovieCard";
import { NewlyAddedSection } from "@/features/home/components/NewlyAddedSection";
import { TrendingSection } from "@/features/home/components/TrendingSection";
import { PricingSection } from "@/features/home/components/PricingSection";
import { FeaturedReviewsSection } from "@/features/review/components/FeaturedReviewsSection";
import { PageTransition } from "@/shared/components/PageTransition";
import { loadHomeMovies } from "@/features/home/api/load-home-movies";

export default async function Home() {
  const { featured, topRated } = await loadHomeMovies();

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Global atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-[-200%] opacity-[0.025] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        <div className="absolute top-[20%] -left-[10%] h-[600px] w-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] h-[600px] w-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <PageTransition>
        <div className="relative z-10">
          <HeroCarousel slides={featured} />

          <ContinueWatchingSection />

          <TrendingSection />

          <section className="container mx-auto px-6 lg:px-12 py-20">
            <div className="flex items-end justify-between border-b border-border pb-6 mb-12">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                Top <span className="text-primary not-italic">Rated.</span>
              </h2>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-2">
                Weekly Archive
              </span>
            </div>
            {topRated.length === 0 ? (
              <SectionState label="No top rated movies available" />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
                {topRated.map((movie) => (
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
            )}
          </section>

          <NewlyAddedSection />

          <CategoriesSection />

          <FeaturedReviewsSection />

          <div id="pricing">
            <PricingSection />
          </div>
        </div>
      </PageTransition>
    </main>
  );
}

function ContinueWatchingSection() {
  return (
    <section className="container mx-auto px-6 lg:px-12 py-16">
      <div className="flex items-end justify-between border-b border-border pb-6 mb-8">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
          Continue <span className="text-primary not-italic">Watching.</span>
        </h2>
      </div>
      <SectionState label="Sign in and start watching to build your queue" />
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
