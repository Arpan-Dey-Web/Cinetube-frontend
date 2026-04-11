import { HeroCarousel } from "@/components/modules/HomePage/HeroCarousel";
import { StatsSection } from "@/components/modules/HomePage/StatsSection";
import { CategoriesSection } from "@/components/modules/HomePage/CategoriesSection";
import { MovieCard } from "@/components/modules/HomePage/MovieCard";
import { NewlyAddedSection } from "@/components/modules/HomePage/NewlyAddedSection";
import { TrendingSection } from "@/components/modules/HomePage/TrendingSection";
import { EditorsPicks } from "@/components/modules/HomePage/EditorsPicks";
import { TestimonialsSection } from "@/components/modules/HomePage/TestimonialsSection";
import { BlogPreviewSection } from "@/components/modules/HomePage/BlogPreviewSection";
import { PricingSection } from "@/components/modules/HomePage/PricingSection";
import { NewsletterSection } from "@/components/modules/HomePage/NewsletterSection";
import { FAQSection } from "@/components/modules/HomePage/FAQSection";
import { MOCK_TRENDING } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Global atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-[-200%] opacity-[0.025] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        <div className="absolute top-[20%] -left-[10%] h-[600px] w-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] h-[600px] w-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Section 1: Hero Carousel */}
        <HeroCarousel />

        {/* Section 2: Stats */}
        <StatsSection />

        {/* Section 3: Categories */}
        <CategoriesSection />

        {/* Section 4: Top Rated */}
        <section className="container mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-end justify-between border-b border-border pb-6 mb-12">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">
              Top <span className="text-primary not-italic">Rated.</span>
            </h2>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-2">
              Weekly Archive
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
            {MOCK_TRENDING.map((movie) => (
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
        </section>

        {/* Section 5: Newly Added */}
        <NewlyAddedSection />

        {/* Section 6: Trending */}
        <TrendingSection />

        {/* Section 7: Editor's Picks */}
        <EditorsPicks />

        {/* Section 8: Testimonials */}
        <TestimonialsSection />

        {/* Section 9: Blog Preview */}
        <BlogPreviewSection />

        {/* Section 10: Pricing */}
        <div id="pricing">
          <PricingSection />
        </div>

        {/* Section 11: Newsletter */}
        <NewsletterSection />

        {/* Section 12: FAQ */}
        <FAQSection />
      </div>
    </main>
  );
}
