"use client";

import { useTransition, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {
  registerAction: (formData: FormData) => Promise<void>;
}

export default function RegisterForm({ registerAction }: RegisterFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      await registerAction(formData);
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {" "}
        {/* Reduced space-y */}
        {/* FULL NAME */}
        <div className="group relative space-y-1">
          <div className="absolute -left-4 top-6 bottom-1 w-px bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-500 origin-top" />
          <label
            className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-primary transition-colors"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="w-full bg-transparent border-b border-border py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
          />
        </div>
        {/* EMAIL ADDRESS */}
        <div className="group relative space-y-1">
          <div className="absolute -left-4 top-6 bottom-1 w-px bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-500 origin-top" />
          <label
            className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-primary transition-colors"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            className="w-full bg-transparent border-b border-border py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
          />
        </div>
        {/* PASSWORD */}
        <div className="group relative space-y-1">
          <div className="absolute -left-4 top-6 bottom-1 w-px bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-500 origin-top" />
          <label
            className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-primary transition-colors"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              className="w-full bg-transparent border-b border-border py-2 pr-10 text-sm text-foreground focus:outline-none focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <div className="pt-2 relative">
          <button
            type="submit"
            disabled={isPending}
            className="relative group overflow-hidden w-full bg-primary py-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
          >
            <span
              className={`relative z-10 ${isPending ? "animate-pulse" : ""}`}
            >
              {isPending ? "Joining..." : "Create Account"}
            </span>
            {isPending && (
              <div className="absolute bottom-0 left-0 h-0.5 bg-primary-foreground/30 w-full overflow-hidden">
                <div className="h-full bg-primary-foreground animate-progress w-1/3" />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
