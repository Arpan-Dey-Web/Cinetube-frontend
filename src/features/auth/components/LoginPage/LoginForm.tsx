"use client";
import Link from "next/link";
import { useTransition, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { DEMO_ACCOUNTS } from "@/lib/site-content";
import { AuthSocialButtons } from "../AuthSocialButtons";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerMessage(null);

    startTransition(async () => {
      await authClient.signIn.email(
        {
          email: formValues.email.toLowerCase(),
          password: formValues.password,
          callbackURL: "/",
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

  const applyDemo = (account: (typeof DEMO_ACCOUNTS)[keyof typeof DEMO_ACCOUNTS]) => {
    setFormValues({
      email: account.email,
      password: account.password,
    });
    setServerMessage(`${account.label} credentials applied.`);
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

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {Object.values(DEMO_ACCOUNTS).map((account) => (
          <button
            key={account.email}
            type="button"
            onClick={() => applyDemo(account)}
            className="border border-border bg-background px-4 py-3 text-left transition-colors hover:border-primary"
          >
            <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-primary">
              {account.label}
            </span>
            <span className="mt-1 block text-[11px] font-semibold text-foreground">
              {account.email}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group relative space-y-1">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            value={formValues.email}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
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
              value={formValues.password}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
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

        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          <span>Use demo buttons for quick review</span>
          <Link href="/help" className="transition-colors hover:text-primary">
            Need help?
          </Link>
        </div>
      </form>

      <div className="mt-8">
        <AuthSocialButtons />
      </div>
    </div>
  );
}
