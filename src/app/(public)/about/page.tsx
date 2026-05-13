import { FEATURE_PILLARS } from "@/lib/site-content";
import { Film, ShieldCheck, Star, Users } from "lucide-react";

const ABOUT_STATS = [
  { label: "Library Titles", value: "5.2K+" },
  { label: "Community Reviews", value: "124K" },
  { label: "Premium Members", value: "14K" },
  { label: "Moderated Daily", value: "380+" },
];

const OPERATING_POINTS = [
  {
    title: "Discovery First",
    description:
      "We design every feed, filter, and category to help members find their next great watch faster.",
    icon: Film,
  },
  {
    title: "Trust Through Moderation",
    description:
      "Spoiler flags, review approvals, and admin tooling keep the portal clean and safe to use.",
    icon: ShieldCheck,
  },
  {
    title: "Cinema Community",
    description:
      "Ratings, watchlists, and thoughtful writing turn passive browsing into real community participation.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pb-16 pt-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
              About Flicks
            </span>
            <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black uppercase tracking-tighter leading-[0.82]">
              Built for discovery,
              <br />
              moderation, and
              <br />
              movie culture.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              Flicks is a movie rating and streaming portal designed around the
              full experience: discovering titles, reviewing them responsibly,
              saving them to a watchlist, and managing the whole ecosystem from
              an admin dashboard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ABOUT_STATS.map((item) => (
              <div
                key={item.label}
                className="border border-border bg-card/40 p-6 backdrop-blur-sm"
              >
                <p className="text-3xl font-black italic tracking-tight text-foreground">
                  {item.value}
                </p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 lg:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          {OPERATING_POINTS.map((point) => (
            <div
              key={point.title}
              className="border border-border bg-card/30 p-8 shadow-sm"
            >
              <point.icon className="h-8 w-8 text-primary" />
              <h2 className="mt-6 text-2xl font-black uppercase tracking-tight">
                {point.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 lg:px-12">
        <div className="rounded-[2rem] border border-border bg-card/20 p-8 md:p-12">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
                Product Direction
              </p>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight">
              What still matters most
            </h2>
            <p className="text-base leading-8 text-muted-foreground">
              The README asks for a production-ready portal, so the frontend now
              focuses on connected flows instead of disconnected mock screens:
              usable navigation, complete public pages, working browse filters,
              better auth affordances, and dashboard destinations that match the
              menu.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {FEATURE_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="border border-border/70 bg-background/70 p-6"
              >
                <pillar.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-xl font-black uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
