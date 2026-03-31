"use client";
import { useTransition, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Uppercase required")
    .regex(/[a-z]/, "Lowercase required")
    .regex(/[0-9]/, "Number required"),
});

type RegisterInput = z.infer<typeof registerSchema>;
type FieldErrors = Partial<Record<keyof RegisterInput, string>>;

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        formattedErrors[path] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    // Execute Better Auth Sign Up
    startTransition(async () => {
      const { name, email, password } = result.data;
      // Better Auth Client Call
      const { data, error } = await authClient.signUp.email(
        {
          name,
          email: email.toLowerCase(),
          password: password,
          callbackURL: "/login", 
        },
        {
          // This ensures the browser handles the cookies sent by Express
          onRequest: () => {
          },
          onSuccess: () => {
            setServerMessage("Account created! Redirecting...");
            router.push("/"); // Usually redirect to home/dashboard
            router.refresh();
          },
          onError: (ctx) => {
            setServerMessage(ctx.error.message || "Registration failed.");
          },
        },
      );
    });
  };

  return (
    <div className="w-full">
      {/* Show Server Message (Success or Error) */}
      {serverMessage && (
        <div
          className={`p-3 mb-4 text-[10px] font-bold uppercase tracking-widest border ${
            serverMessage.includes("success") ||
            serverMessage.includes("Redirecting")
              ? "border-green-500 text-green-500"
              : "border-destructive text-destructive"
          }`}
        >
          {serverMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* FULL NAME */}
        <div className="group relative space-y-1">
          <div className="absolute -left-4 top-6 bottom-1 w-px bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-500 origin-top" />
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-primary transition-colors">
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
            <p className="text-[10px] text-destructive font-bold uppercase mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="group relative space-y-1">
          <div className="absolute -left-4 top-6 bottom-1 w-px bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-500 origin-top" />
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-primary transition-colors">
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
            <p className="text-[10px] text-destructive font-bold uppercase mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="group relative space-y-1">
          <div className="absolute -left-4 top-6 bottom-1 w-px bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-500 origin-top" />
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-primary transition-colors">
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
            <p className="text-[10px] text-destructive font-bold uppercase mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* SUBMIT */}
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
          </button>
        </div>
      </form>
    </div>
  );
}
