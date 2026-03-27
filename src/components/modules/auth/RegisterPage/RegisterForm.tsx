"use client";
import { useTransition, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { registerUserAction } from "@/services/register";
import { redirect, useRouter } from "next/navigation";

// 1. REGISTER THE VALIDATION SCHEMA
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

// Infer the type for our error state
type RegisterInput = z.infer<typeof registerSchema>;
type FieldErrors = Partial<Record<keyof RegisterInput, string>>;

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setServerMessage(null);

    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData);
    const result = registerSchema.safeParse(rawData);

    if (!result.success) {
      const formattedErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof RegisterInput;
        if (!formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    // Transform data to lowercase
    formData.set("name", (formData.get("name") as string).toLowerCase());
    formData.set("email", (formData.get("email") as string).toLowerCase());
   

    // 4. Execute Server Action
    startTransition(async () => {
      try {
        const response = await registerUserAction(formData);

        if (response.success) {
          setServerMessage("Account created! Redirecting...");
          router.push("/login");
          router.refresh();
        } else {
          setServerMessage(response.message);
        }
      } catch (err) {
        setServerMessage("An unexpected error occurred.");
      }
    });
  };;
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
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
            className="w-full bg-transparent border-b border-border py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
          />
          {errors.name && (
            <p className="text-[10px] text-destructive font-bold uppercase tracking-wider mt-1 animate-in fade-in slide-in-from-top-1">
              {errors.name}
            </p>
          )}
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
            className="w-full bg-transparent border-b border-border py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
          />
          {errors.email && (
            <p className="text-[10px] text-destructive font-bold uppercase tracking-wider mt-1 animate-in fade-in slide-in-from-top-1">
              {errors.email}
            </p>
          )}
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
          {errors.password && (
            <p className="text-[10px] text-destructive font-bold uppercase tracking-wider mt-1 animate-in fade-in slide-in-from-top-1">
              {errors.password}
            </p>
          )}
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
