"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User, Plan } from "./types";

const STORAGE_KEY = "openesg_auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, company?: string) => Promise<void>;
  loginDemo: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function makeUser(email: string, name: string, company = "", plan: Plan = "free"): User {
  return {
    id: `u_${Date.now()}`,
    name,
    email,
    company,
    plan,
    createdAt: new Date().toISOString(),
  };
}

function persist(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  // Also keep autoesg compat key so existing AutoESG pages still work
  localStorage.setItem("autoesg_user", JSON.stringify({ email: user.email, name: user.name }));
}

function clear() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("autoesg_user");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* storage unavailable */
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // MVP: accept any credentials; production would call /api/auth/login
    await new Promise((r) => setTimeout(r, 700));
    const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const u = makeUser(email, name);
    persist(u);
    setUser(u);
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string, company = "") => {
    await new Promise((r) => setTimeout(r, 700));
    const u = makeUser(email, name, company);
    persist(u);
    setUser(u);
  }, []);

  const loginDemo = useCallback(() => {
    const u = makeUser("demo@openesg.io", "Demo User", "OpenESG Demo Co.", "starter");
    persist(u);
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, loginDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
