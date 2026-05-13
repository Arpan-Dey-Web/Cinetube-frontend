"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { HeroSlide } from "@/types/types";

// TODO: fetch from backend → GET /api/movie?filter=featured&limit=5

function HeroSlideContent({ slide }: { slide: HeroSlide }) {
  return (
    <div className="relative h-[65vh] w-full overflow-hidden flex items-center bg-background">
      {/* Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.backdrop}
          alt={slide.title}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover scale-105 transition-transform duration-[10s] hover:scale-100"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')] pointer-events-none mix-blend-overlay" />
      </div>

      <div className="container relative z-10 px-6 lg:px-12">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">
              Featured Premiere
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[0.85] tracking-tighter text-foreground uppercase italic">
            {slide.title.split(" ").slice(0, -1).join(" ")} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground via-foreground to-foreground/20">
              {slide.title.split(" ").slice(-1)[0]}.
            </span>
          </h1>

          <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-1.5 text-primary">
              <Star className="fill-primary h-3.5 w-3.5" />
              {slide.rating} Rating
            </div>
            <span>·</span>
            <span>{slide.year}</span>
            <span>·</span>
            <span className="text-foreground">{slide.genre}</span>
          </div>

          <p className="max-w-md text-sm text-muted-foreground leading-relaxed italic font-medium">
            {slide.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground gap-3 h-12 px-8 text-[10px] font-black uppercase tracking-widest hover:opacity-90 rounded-none"
            >
              <Link href={`/browse/${slide.movieId}`}>
                <Play className="fill-current h-4 w-4" /> Watch Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-3 h-12 px-8 text-[10px] font-black uppercase tracking-widest border-border hover:bg-foreground hover:text-background transition-colors rounded-none"
            >
              <Link href={`/browse/${slide.movieId}`}>
                <Info className="h-4 w-4" /> Details
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Vertical decor */}
      <div className="absolute right-12 bottom-10 hidden xl:block opacity-20">
        <p className="[writing-mode:vertical-rl] text-[8px] font-black uppercase tracking-[0.6em] text-foreground rotate-180">
          {slide.genre} / {slide.year}
        </p>
      </div>
    </div>
  );
}

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (slides.length === 0) {
    return (
      <section className="container mx-auto px-6 lg:px-12 py-24">
        <div className="min-h-[55vh] border border-border bg-card/30 flex items-center justify-center text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-muted-foreground">
            No featured movies available
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="relative container mx-auto px-6 lg:px-12">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true, align: "start" }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <HeroSlideContent slide={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom prev/next */}
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 border border-border bg-background/60 backdrop-blur-md flex items-center justify-center hover:border-primary hover:bg-primary transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 group-hover:text-primary-foreground transition-colors" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 border border-border bg-background/60 backdrop-blur-md flex items-center justify-center hover:border-primary hover:bg-primary transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 group-hover:text-primary-foreground transition-colors" />
        </button>
      </Carousel>

      {/* Pagination dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`transition-all duration-300 ${
              i === current
                ? "w-8 h-1.5 bg-primary"
                : "w-1.5 h-1.5 bg-border hover:bg-primary/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
}
