"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  CircleAlert,
  CircleX,
  LoaderCircle,
} from "lucide-react";

type PaymentStatus = "success" | "cancel";

export const PaymentReturnNotice = ({
  movieId,
  paymentStatus,
  sessionId,
  hasAccess,
}: {
  movieId: string;
  paymentStatus: PaymentStatus | null;
  sessionId: string | null;
  hasAccess: boolean;
}) => {
  const router = useRouter();
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const shouldConfirmAccess = paymentStatus === "success" && !hasAccess;
  const [isCheckingAccess, setIsCheckingAccess] = useState(
    shouldConfirmAccess
  );

  useEffect(() => {
    if (!shouldConfirmAccess) {
      return;
    }

    let isCancelled = false;

    const pollAccess = async () => {
      if (sessionId) {
        try {
          const confirmRes = await fetch(`${apiUrl}/payment/confirm-checkout`, {
            method: "POST",
            credentials: "include",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          });

          if (confirmRes.ok) {
            if (!isCancelled) {
              setIsCheckingAccess(false);
              router.refresh();
            }
            return;
          }
        } catch {
          // Fall back to access polling when explicit confirmation fails.
        }
      }

      for (let attempt = 0; attempt < 6; attempt += 1) {
        try {
          const res = await fetch(`${apiUrl}/purchase/check-access/${movieId}`, {
            credentials: "include",
            cache: "no-store",
          });

          if (res.ok) {
            const json = await res.json();

            if (json?.data?.hasAccess) {
              if (!isCancelled) {
                setIsCheckingAccess(false);
                router.refresh();
              }
              return;
            }
          }
        } catch {
          // Ignore transient polling failures while Stripe webhook is still syncing.
        }

        await new Promise((resolve) => window.setTimeout(resolve, 2000));
      }

      if (!isCancelled) {
        setIsCheckingAccess(false);
      }
    };

    void pollAccess();

    return () => {
      isCancelled = true;
    };
  }, [apiUrl, movieId, router, sessionId, shouldConfirmAccess]);

  if (!paymentStatus) {
    return null;
  }

  if (paymentStatus === "cancel") {
    return (
      <div className="mb-8 flex items-start gap-3 rounded-3xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
        <CircleX className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
        <div>
          <p className="font-semibold text-amber-200">Payment canceled.</p>
          <p className="mt-1 text-amber-100/80">
            The movie is still locked. Complete checkout to unlock the stream.
          </p>
        </div>
      </div>
    );
  }

  if (hasAccess) {
    return (
      <div className="mb-8 flex items-start gap-3 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-100">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
        <div>
          <p className="font-semibold text-emerald-200">Payment successful.</p>
          <p className="mt-1 text-emerald-100/80">
            Your access is active now. The video player has been unlocked.
          </p>
        </div>
      </div>
    );
  }

  if (isCheckingAccess) {
    return (
      <div className="mb-8 flex items-start gap-3 rounded-3xl border border-primary/30 bg-primary/10 px-5 py-4 text-sm text-primary-foreground">
        <LoaderCircle className="mt-0.5 h-5 w-5 shrink-0 animate-spin text-primary" />
        <div>
          <p className="font-semibold text-foreground">
            Finalizing your purchase.
          </p>
          <p className="mt-1 text-muted-foreground">
            Stripe returned successfully. Waiting for access to sync to this
            movie.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 flex items-start gap-3 rounded-3xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-100">
      <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
      <div>
        <p className="font-semibold text-red-200">Payment needs confirmation.</p>
        <p className="mt-1 text-red-100/80">
          Stripe redirected back, but access is still locked. Refresh shortly if
          it does not unlock automatically.
        </p>
      </div>
    </div>
  );
};
