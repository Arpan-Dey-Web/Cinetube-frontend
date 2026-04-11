"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// TODO: wire to backend → POST /api/newsletter/subscribe

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: POST /api/newsletter/subscribe { email }
    setSubmitted(true);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="relative p-12 lg:p-20 border border-border bg-card overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 border-primary/40" />
          <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-primary/40" />
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">
                Weekly Dispatch
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>

            <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter leading-[0.9]">
              Stay in the{" "}
              <span className="text-primary not-italic">Loop.</span>
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              New releases, editor picks, and exclusive reviews — delivered to
              your inbox every Friday. No spam. Unsubscribe anytime.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 text-primary py-4">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-[11px] font-black uppercase tracking-widest">
                  You&apos;re on the list. Welcome to the archive.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 rounded-none border-border bg-background text-[11px] font-bold uppercase tracking-wider h-12"
                />
                <Button
                  type="submit"
                  className="rounded-none bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-8 h-12 hover:opacity-90 gap-2"
                >
                  <Send className="h-3.5 w-3.5" />
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Joined by 12,400+ film enthusiasts worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
