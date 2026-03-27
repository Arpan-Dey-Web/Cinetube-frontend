"use client";

import { useTransition, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginUserAction } from "@/services/login";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const result = await loginUserAction(formData);

        if (result.success) {
          // Success! Sync the session and move to dashboard
          router.refresh();
          router.push("/");
        } else {
          // Show the exact error from your Express backend (e.g., "User does not exist")
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to connect to the server. Check your connection.");
      }
    });
  };

  return (
    <div className="w-full">
      {/* ERROR FEEDBACK */}
      {error && (
        <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* EMAIL FIELD */}
        <div className="group relative space-y-2">
          {/* Vertical Focus Indicator */}
          <div className="absolute -left-4 top-8 bottom-2 w-px bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-500 origin-top" />

          <label
            className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-primary transition-colors"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            autoComplete="email"
            className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-all font-medium"
          />
        </div>

        {/* PASSWORD FIELD */}
        <div className="group relative space-y-2">
          <div className="absolute -left-4 top-8 bottom-2 w-px bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-500 origin-top" />

          <div className="flex items-center justify-between">
            <label
              className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-primary transition-colors"
              htmlFor="password"
            >
              Password
            </label>
            <button
              type="button"
              className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Forgot?
            </button>
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-b border-border py-3 pr-10 text-sm text-foreground focus:outline-none focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
            >
              {showPassword ? (
                <EyeOff size={16} strokeWidth={1.5} />
              ) : (
                <Eye size={16} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4 relative">
          <button
            type="submit"
            disabled={isPending}
            className="relative group overflow-hidden w-full bg-primary py-4 text-[11px] font-black uppercase tracking-[0.3em] text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
          >
            <span
              className={`relative z-10 ${isPending ? "animate-pulse" : ""}`}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </span>

            {isPending && (
              <div className="absolute bottom-0 left-0 h-0.5 bg-primary-foreground/30 w-full overflow-hidden">
                <div className="h-full bg-primary-foreground animate-progress w-1/3" />
              </div>
            )}
          </button>

          {/* Glow effect on hover */}
          <div className="absolute -bottom-4 left-0 right-0 h-px bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </form>
    </div>
  );
}
