import Link from "next/link";
import { SUPPORT_CHANNELS, SUPPORT_GUIDES } from "@/lib/site-content";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pb-12 pt-32 lg:px-12">
        <div className="max-w-3xl space-y-5">
          <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
            Help Center
          </span>
          <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-black uppercase tracking-tighter leading-[0.82]">
            Support for login, playback,
            <br />
            and review moderation.
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-6 py-8 lg:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          {SUPPORT_GUIDES.map((guide) => (
            <div
              key={guide.title}
              className="rounded-[1.5rem] border border-border bg-card/20 p-6"
            >
              <guide.icon className="h-7 w-7 text-primary" />
              <h2 className="mt-5 text-2xl font-black uppercase tracking-tight">
                {guide.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {guide.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 lg:px-12">
        <div className="rounded-[1.75rem] border border-border bg-card/20 p-6 md:p-8">
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
            Contact Paths
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SUPPORT_CHANNELS.map((channel) => (
              <Link
                key={channel.title}
                href={channel.href}
                className="rounded-[1rem] border border-border bg-background/70 p-5 transition-colors hover:border-primary/40"
              >
                <p className="text-lg font-black uppercase tracking-tight">
                  {channel.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {channel.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
