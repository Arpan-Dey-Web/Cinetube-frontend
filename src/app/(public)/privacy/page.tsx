const PRIVACY_POINTS = [
  {
    title: "Account Data",
    body: "We store account basics, session state, and profile information needed to run authentication and dashboard features.",
  },
  {
    title: "Review Content",
    body: "Reviews, ratings, spoiler flags, and moderation outcomes are retained so the community feed stays consistent and auditable.",
  },
  {
    title: "Payment Signals",
    body: "Premium access status and checkout references are used to control streaming access and plan management.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto max-w-4xl px-6 pb-10 pt-32 lg:px-12">
        <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
          Privacy Policy
        </span>
        <h1 className="mt-5 text-[clamp(3rem,8vw,5rem)] font-black uppercase tracking-tighter leading-[0.84]">
          How Flicks uses member data.
        </h1>
      </section>

      <section className="container mx-auto max-w-4xl px-6 py-6 lg:px-12">
        <div className="space-y-6">
          {PRIVACY_POINTS.map((point) => (
            <div
              key={point.title}
              className="rounded-[1.5rem] border border-border bg-card/20 p-6"
            >
              <h2 className="text-2xl font-black uppercase tracking-tight">
                {point.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
