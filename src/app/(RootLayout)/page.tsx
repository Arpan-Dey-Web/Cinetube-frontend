import { EditorsPicks } from "@/components/modules/HomePage/EditorsPicks";
import { FAQSection } from "@/components/modules/HomePage/FAQSection";
import { Hero } from "@/components/modules/HomePage/Hero";
import { MovieCard } from "@/components/modules/HomePage/MovieCard";
import { PricingSection } from "@/components/modules/HomePage/PricingSection";
import { StatsSection } from "@/components/modules/HomePage/StatsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Shared Global Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-[-200%] opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        <div className="absolute top-[20%] -left-[10%] h-150 w-150 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] h-150 w-150 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Hero />
        <StatsSection />

        <section className="container mx-auto px-6 lg:px-12 py-24 space-y-32">
          {/* Section Heading Style */}
          <div className="space-y-12">
            <div className="flex items-end justify-between border-b border-border pb-6">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                Top <span className="text-primary not-italic">Rated.</span>
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-2">
                Weekly Archive
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12">
              <MovieCard
                title="Dune: Part Two"
                rating={9.2}
                year="2024"
                image="https://m.media-amazon.com/images/M/MV5BN2P2MjA0OGUtZWExOS00M2VjLTgzMjQtNjkwZTM2MjYwNTRiXkEyXkFqcGc@._V1_.jpg"
                category="Sci-Fi"
              />
              {/* More cards... */}
            </div>
          </div>

          <EditorsPicks />
        </section>

        <PricingSection />
        <FAQSection />
      </div>
    </main>
  );
}
