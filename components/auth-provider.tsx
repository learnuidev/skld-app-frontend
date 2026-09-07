"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getAuth, login as persistLogin, logout as persistLogout, type AuthUser } from "@/modules/auth";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setUser(getAuth());
      setLoading(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const login = () => {
    setUser(persistLogin());
    setLoading(false);
  };

  const logout = () => {
    persistLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
