"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CardElement,  useElements, useStripe } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/services/modules/payment/payment.client";
import { Button } from "@/components/ui/button";

export const MoviePurchaseModal = ({
    movieId,
}: {
    movieId: string;
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [processing, startTransition] = useTransition();

    const handlePay = async () => {
        if (!stripe || !elements) return;

        setLoading(true);

        try {
            const { clientSecret } = await createPaymentIntent(movieId);

            const card = elements.getElement(CardElement);

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card!,
                },
            });

            if (result.error) {
                console.log(result.error.message);
            } else {
                // wait webhook sync
                startTransition(() => {
                    router.refresh();
                });
            }
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="space-y-4">
            <div className="p-4 border rounded-xl bg-background">
                <CardElement />
            </div>

            <Button
                onClick={handlePay}
                disabled={loading || processing}
                className="w-full"
            >
                {loading ? "Processing..." : "Pay Now"}
            </Button>
        </div>
    );
};