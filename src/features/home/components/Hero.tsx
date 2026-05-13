import { Button } from "@/components/ui/button";

import { Play, Info, Star } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative h-[90vh] max-w-7xl mx-auto  overflow-hidden flex items-center bg-background">
      {/* 1. Cinematic Background with Noise Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070')`,
          }}
        />
        {/* The Film Grain Overlay (matching Login page) */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 px-6 lg:px-12">
        <div className="space-y-8 max-w-4xl">
          {/* Tagline */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              Featured Premiere
            </span>
          </div>

          {/* Large Editorial Title */}
          <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.8] tracking-tighter text-foreground uppercase italic">
            The Last <br />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground via-foreground to-foreground/20">
              Cinema.
            </span>
          </h1>

          <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-1.5 text-primary">
              <Star className="fill-primary h-3.5 w-3.5" /> 9.8 Rating
            </div>
            <span>•</span>
            <span>2026 Archive</span>
            <span>•</span>
            <span className="text-foreground">Sci-Fi // Action</span>
          </div>

          <p className="max-w-md text-sm md:text-base text-muted-foreground leading-relaxed italic font-medium">
            In a world where memories are digital currency, one man discovers a
            hidden analog library that could rewrite history.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground gap-3 h-14 px-10 text-[11px] font-black uppercase tracking-widest hover:opacity-90"
            >
              <Play className="fill-current h-4 w-4" /> Start Watching
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-3 h-14 px-10 text-[11px] font-black uppercase tracking-widest border-border hover:bg-foreground hover:text-background transition-colors"
            >
              <Info className="h-4 w-4" /> Film Details
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Side Text */}
      <div className="absolute right-12 bottom-12 hidden xl:block opacity-20">
        <p className="[writing-mode:vertical-rl] text-[9px] font-black uppercase tracking-[0.6em] text-foreground rotate-180">
          Vol. 01 // Global Premiere
        </p>
      </div>
    </div>
  );
};
