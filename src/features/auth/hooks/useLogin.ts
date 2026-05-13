

"use client";

import { useState } from "react";
import { login, LoginPayload } from "../api/login";
import { useRouter } from "next/navigation";

export function useLogin() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(data: LoginPayload) {
        setLoading(true);
        setError(null);

        try {
            const res = await login(data);

            // Example side effect: redirect after login
            router.push("/dashboard");

            return res;
        } catch (err:any) {
            const message =
                err?.response?.data?.message || "Login failed. Try again.";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        login: handleLogin,
        loading,
        error,
    };
}