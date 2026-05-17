"use client";

import { authClient } from "@/features/auth/utils/auth-session";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();
  const { refreshSession } = useAuth();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          refreshSession();
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-[10px] font-black uppercase tracking-widest text-destructive hover:opacity-70 transition-opacity"
    >
      Sign Out
    </button>
  );
};
