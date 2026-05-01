export const createPaymentIntent = async (movieId: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-intent`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ movieId }),
        }
    );

    if (!res.ok) {
        throw new Error("Failed to create payment");
    }

    const json = await res.json();
    return json.data;
  };