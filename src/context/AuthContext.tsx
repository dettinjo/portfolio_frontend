// src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "@/i18n/navigation";

interface AuthUser {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  jwt: string | null;
  loading: boolean;
  login: (token: string, userData: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This effect runs once on component mount to check for a stored session
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then(async (res) => {
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
            setJwt(storedToken);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem("jwt");
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string, userData: AuthUser) => {
    localStorage.setItem("jwt", token);
    setJwt(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setJwt(null);
    setUser(null);
    router.push("/login"); // Redirect to login page on logout
  };

  const value = { user, jwt, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
