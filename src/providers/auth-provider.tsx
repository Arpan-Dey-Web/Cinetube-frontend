"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authClient } from "@/features/auth/utils/auth-session";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";


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

  const [isPending, setIsPending] = useState(true);

  const refreshSession = async () => {
    try {
      const { data } = await authClient.getSession();


      if (data && data?.user) {
        const sessionUser = data.user as unknown as User;

        try {
          const profileRes = await fetch(`${API_URL}/user/profile`, {
            credentials: "include",
            cache: "force-cache",
          });
          // console.log(profileRes);

          if (profileRes.ok) {
            const profileJson = await profileRes.json();
            console.log(profileJson);
            setUser(profileJson.data as User);
          } else {
            setUser(sessionUser);
          }
        } catch {
          setUser(sessionUser);
        }
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
