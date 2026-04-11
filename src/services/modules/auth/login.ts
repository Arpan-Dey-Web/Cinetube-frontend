"use server";
import { cookies } from "next/headers";
export async function loginUserAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const payload = {
            email: email.toLowerCase(),
            password: password,
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-in/email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, message: result.message || "Invalid credentials" };
        }

        // 2. SET THE COOKIE IN NEXT.JS 
        // Since Express res.cookie only works for the Next server in this flow,
        // we manually copy the token to the browser's cookie jar.
        const cookieStore = await cookies();

        // Check where your backend sends the token (result.token or result.data.token)
        const token = result.token || result.data?.token;

        if (token) {
            cookieStore.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 7 * 24 * 60 * 60, // 7 Days
            });
        }

        return { success: true };
    } catch {
        return { success: false, message: "Backend is currently offline." };
    }
}
