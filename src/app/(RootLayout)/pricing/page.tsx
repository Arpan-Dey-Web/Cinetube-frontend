"use client";
import { Check } from "lucide-react";
import { FAQ_ITEMS, PRICING_PLANS } from "@/lib/site-content";
import { useAuth } from "@/provider/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NoticeState = {
  type: "success" | "error" | "info";
  message: string;
} | null;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getPriceAmount = (price: string) => Number(price.replace(/[^0-9.]/g, ""));

export default function PricingPage() {
  const { user, isPending, refreshSession } = useAuth();
  const router = useRouter();
  const handledReturnRef = useRef(false);
  const [loadingPrice, setLoadingPrice] = useState<string | null>(null);
  const [isConfirmingPremium, setIsConfirmingPremium] = useState(false);
  const [notice, setNotice] = useState<NoticeState>(null);

  useEffect(() => {
    if (handledReturnRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const premiumStatus = params.get("premium");
    const sessionId = params.get("session_id");

    if (!premiumStatus) return;

    handledReturnRef.current = true;

    if (premiumStatus === "cancel") {
      setNotice({
        type: "error",
        message: "Premium checkout was cancelled. Your account was not changed.",
      });
      window.history.replaceState(null, "", "/pricing");
      return;
    }

    if (premiumStatus !== "success" || !sessionId) {
      setNotice({
        type: "error",
        message: "Stripe returned without a valid premium checkout session.",
      });
      window.history.replaceState(null, "", "/pricing");
      return;
    }

    let isCancelled = false;

    const confirmPremiumAccess = async () => {
      setIsConfirmingPremium(true);
      setNotice({
        type: "info",
        message: "Finalizing your premium access...",
      });

      try {
        const res = await fetch(`${API_URL}/payment/confirm-checkout`, {
          method: "POST",
          credentials: "include",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(
            data?.message || "Premium payment could not be confirmed.",
          );
        }

        await refreshSession();

        if (!isCancelled) {
          setNotice({
            type: "success",
            message: "Premium access is active. All premium movies are unlocked.",
          });
          router.refresh();
          window.history.replaceState(null, "", "/pricing");
        }
      } catch (error) {
        if (!isCancelled) {
          setNotice({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : "Premium payment could not be confirmed.",
          });
        }
      } finally {
        if (!isCancelled) {
          setIsConfirmingPremium(false);
        }
      }
    };

    void confirmPremiumAccess();

    return () => {
      isCancelled = true;
    };
  }, [refreshSession, router]);

  const handlePremiumAccess = async (price: string) => {
    const amount = getPriceAmount(price);

    if (amount <= 0) {
      router.push(user ? "/browse?status=FREE" : "/login");
      return;
    }

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.contentStatus === "PREMIUM") {
      setNotice({
        type: "success",
        message: "You already have Premium access to all movies.",
      });
      return;
    }

    setLoadingPrice(price);
    setNotice(null);

    try {
      const res = await fetch(`${API_URL}/payment/premium-checkout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.message || "Could not start premium checkout.",
        );
      }

      const checkoutUrl = data?.data?.url;

      if (!checkoutUrl) {
        throw new Error("Stripe checkout URL was not returned.");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not start premium checkout.",
      });
      setLoadingPrice(null);
    }
  };



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
          {notice && (
            <div
              className={`border px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] ${notice.type === "success"
                  ? "border-emerald-500/40 text-emerald-500"
                  : notice.type === "info"
                    ? "border-primary/40 text-primary"
                    : "border-destructive/40 text-destructive"
                }`}
            >
              {notice.message}
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-6 py-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[1.75rem] border p-8 ${plan.featured
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
              <button
                onClick={() => handlePremiumAccess(plan.price)}
                disabled={isPending || isConfirmingPremium || Boolean(loadingPrice)}
                className={`mt-8 inline-flex w-full items-center justify-center border px-5 py-3 text-[10px] font-black uppercase tracking-[0.35em] disabled:pointer-events-none disabled:opacity-60 ${plan.featured
                  ? "border-primary-foreground/30 bg-primary-foreground text-primary"
                  : "border-border bg-background"
                  }`}
              >
                {loadingPrice === plan.price ? "Redirecting..." : plan.cta}
              </button>
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
                className="rounded-2xl border border-border bg-background/70 p-5"
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
