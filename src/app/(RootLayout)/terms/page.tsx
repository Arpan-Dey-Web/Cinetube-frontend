const TERMS_SECTIONS = [
  {
    title: "Community Conduct",
    body: "Users must keep reviews respectful, mark spoilers accurately, and avoid abusive or discriminatory content.",
  },
  {
    title: "Access Rules",
    body: "Premium titles require an active entitlement. Free titles may still be subject to regional or moderation controls.",
  },
  {
    title: "Admin Enforcement",
    body: "Admins may unpublish reviews, remove content, or suspend access when submissions violate platform rules.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto max-w-4xl px-6 pb-10 pt-32 lg:px-12">
        <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
          Terms of Service
        </span>
        <h1 className="mt-5 text-[clamp(3rem,8vw,5rem)] font-black uppercase tracking-tighter leading-[0.84]">
          The operating rules for Flicks.
        </h1>
      </section>

      <section className="container mx-auto max-w-4xl px-6 py-6 lg:px-12">
        <div className="space-y-6">
          {TERMS_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-[1.5rem] border border-border bg-card/20 p-6"
            >
              <h2 className="text-2xl font-black uppercase tracking-tight">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
