"use server";
import { cookies } from "next/headers";
export async function loginUserAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        // 1. MATCH YOUR BACKEND SCHEMA: { body: { email, password } }
        const payload = {
            email: email.toLowerCase(),
            password: password,
        };

        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
    } catch (err) {
        return { success: false, message: "Backend is currently offline." };
    }
}