"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authClient } from "@/lib/auth-client";

// 1. Define the User type to match your Prisma + Better Auth
interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;

  role: "USER" | "ADMIN";
  contentStatus: "FREE" | "PREMIUM";
}

interface AuthContextType {
  user: User | null;
  isPending: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Initialize as true so the app knows we are checking the session on boot
  const [isPending, setIsPending] = useState(true);

  const refreshSession = async () => {
    try {
      const { data } = await authClient.getSession();

      if (data && data?.user) {
        setUser(data.user as unknown as User);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Session fetch failed", error);
      setUser(null);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isPending, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
