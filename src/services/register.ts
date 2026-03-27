"use server";
import { cookies } from "next/headers";

export async function registerUserAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await fetch("http://localhost:8000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, message: result.message };
        }

        // --- AUTOMATIC LOGIN LOGIC ---
        // Save the token received from Express into Next.js Cookies
        const cookieStore = await cookies();
        cookieStore.set("accessToken", result.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return { success: true, message: "Welcome!" };
    } catch (error) {
        return { success: false, message: "Connection error" };
    }
}