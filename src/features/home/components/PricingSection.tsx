import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: ["Standard Quality", "Ads", "Community Reviews"],
  },
  {
    name: "Monthly",
    price: "$9.99",
    features: [
      "4K HDR Streaming",
      "No Ads",
      "Early Access",
      "Exclusive Badges",
    ],
    highlight: true,
  },
  {
    name: "Yearly",
    price: "$89.99",
    features: [
      "All Monthly Features",
      "2 Months Free",
      "Download to Watch Offline",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-primary uppercase tracking-tighter mb-4">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground">
          Unlock the full potential of FLICKS cinema experience.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-8 rounded-2xl border ${tier.highlight ? "border-primary shadow-2xl shadow-primary/20 scale-105 bg-card" : "border-border bg-card/50"} flex flex-col`}
          >
            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
            <div className="text-4xl font-bold mb-6 text-foreground">
              {tier.price}
              <span className="text-sm font-normal text-muted-foreground">
                /{tier.name === "Yearly" ? "yr" : "mo"}
              </span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="h-4 w-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
            <Button
              className={`w-full ${tier.highlight ? "bg-primary text-primary-foreground" : "variant-outline"}`}
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};
