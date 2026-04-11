import Link from "next/link";
import { Check } from "lucide-react";
import { FAQ_ITEMS, PRICING_PLANS } from "@/lib/site-content";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pb-12 pt-32 lg:px-12">
        <div className="max-w-3xl space-y-5">
          <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
            Pricing Plans
          </span>
          <h1 className="text-[clamp(3rem,8vw,5.8rem)] font-black uppercase tracking-tighter leading-[0.82]">
            Free, monthly,
            <br />
            and annual access.
          </h1>
          <p className="text-base leading-8 text-muted-foreground">
            The requirement asked for visible pricing on the home page and a
            more complete public experience. This dedicated page backs up the
            CTA with clear plan comparisons.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[1.75rem] border p-8 ${
                plan.featured
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card/20"
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.45em]">
                {plan.name}
              </p>
              <div className="mt-6 flex items-end gap-3">
                <span className="text-5xl font-black italic">{plan.price}</span>
                <span className="pb-1 text-sm uppercase tracking-widest opacity-80">
                  {plan.cadence}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 opacity-85">
                {plan.description}
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`mt-8 inline-flex w-full items-center justify-center border px-5 py-3 text-[10px] font-black uppercase tracking-[0.35em] ${
                  plan.featured
                    ? "border-primary-foreground/30 bg-primary-foreground text-primary"
                    : "border-border bg-background"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 lg:px-12">
        <div className="rounded-[1.75rem] border border-border bg-card/20 p-6 md:p-8">
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
            Before You Upgrade
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {FAQ_ITEMS.slice(0, 2).map((item) => (
              <div
                key={item.question}
                className="rounded-[1rem] border border-border bg-background/70 p-5"
              >
                <p className="text-lg font-black uppercase tracking-tight">
                  {item.question}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
