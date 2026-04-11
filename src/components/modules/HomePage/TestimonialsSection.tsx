import Image from "next/image";
import { Quote } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/lib/mock-data";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between border-b border-border pb-6 mb-12">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">
            What Critics <span className="text-primary not-italic">Say.</span>
          </h2>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-2">
            Verified Members
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="group relative p-8 border border-border bg-card hover:border-primary transition-all duration-500 overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-700" />

              {/* Quote icon */}
              <Quote className="h-8 w-8 text-primary/20 mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-3 ${i < t.rating ? "bg-primary" : "bg-border"}`}
                  />
                ))}
              </div>

              <blockquote className="text-sm text-muted-foreground leading-relaxed italic mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full border border-border object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-foreground">
                    {t.name}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
