"use server";

export async function registerUserAction(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, message: result.message || "Registration failed" };
        }
        return { success: true, message: "User registered successfully!" };
    } catch {
        return { success: false, message: "Server connection failed" };
    }
}
