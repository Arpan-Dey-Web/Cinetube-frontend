"use client";
import { useTransition, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const { data, error } = await authClient.signIn.email(
        {
          email: email.toLowerCase(),
          password: password,
          callbackURL: "/", // Redirect to home after login
        },
        {
          onSuccess: () => {
            setServerMessage("Login successful! Redirecting...");
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            // This will trigger if the password in the Account table doesn't match
            setServerMessage(ctx.error.message || "Invalid email or password.");
          },
        },
      );
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {serverMessage && (
        <div
          className={`p-3 mb-4 text-[10px] font-bold uppercase tracking-widest border ${
            serverMessage.includes("successful")
              ? "border-green-500 text-green-500"
              : "border-destructive text-destructive"
          }`}
        >
          {serverMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group relative space-y-1">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-all"
          />
        </div>

        <div className="group relative space-y-1">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary py-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Verifying..." : "Login"}
        </button>
      </form>
    </div>
  );
}
