"use client";

import { useState, useTransition } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authClient } from "@/features/auth/utils/auth-session";

const PROVIDERS = [
  { id: "google", label: "Google", icon: FaGoogle },
  { id: "github", label: "GitHub", icon: FaGithub },
] as const;

export function AuthSocialButtons() {
  const [isPending, startTransition] = useTransition();
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  const handleSocialSignIn = (provider: (typeof PROVIDERS)[number]["id"]) => {
    setActiveProvider(provider);
    startTransition(async () => {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[9px] font-black uppercase tracking-[0.35em] text-muted-foreground">
          Social Sign In
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PROVIDERS.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => handleSocialSignIn(provider.id)}
            disabled={isPending}
            className="flex h-12 items-center justify-center gap-3 border border-border bg-background text-[10px] font-black uppercase tracking-[0.25em] transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
          >
            <provider.icon className="h-4 w-4" />
            {activeProvider === provider.id && isPending
              ? `Opening ${provider.label}`
              : provider.label}
          </button>
        ))}
      </div>
    </div>
  );
}
