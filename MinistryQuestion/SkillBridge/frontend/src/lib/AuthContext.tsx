"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
  provider: "local" | "google";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "skillbridge_auth_user";
const USERS_KEY = "skillbridge_registered_users";

interface StoredUser {
  name: string;
  email: string;
  passwordHash: string;
  provider: "local" | "google";
  avatar?: string;
}

// Demo-grade password hashing (prototype only, NOT cryptographically secure).
// An XOR-shift string hash is deterministic so registered hashes survive reruns,
// but it is trivially collidable — replace with a proper KDF (e.g. Web Crypto
// SHA-256 with a per-user salt, or a server-side argon2/bcrypt) before real auth.
function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return "h_" + Math.abs(hash).toString(36);
}

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (u): u is StoredUser =>
        !!u &&
        typeof u === "object" &&
        typeof (u as StoredUser).name === "string" &&
        typeof (u as StoredUser).email === "string" &&
        typeof (u as StoredUser).passwordHash === "string"
    );
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && typeof (parsed as User).email === "string") {
          setUser(parsed as User);
          return;
        }
      }
    } catch {
      // fall through to cleanup
    }
    localStorage.removeItem(STORAGE_KEY);
    setIsLoading(false);
  }, []);

  const persistUser = useCallback((u: User) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === hashPassword(password)
    );
    if (!found) {
      return { success: false, error: "Invalid email or password" };
    }
    persistUser({ name: found.name, email: found.email, provider: found.provider, avatar: found.avatar });
    return { success: true };
  }, [persistUser]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const users = getStoredUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists" };
    }
    const newUser: StoredUser = {
      name,
      email,
      passwordHash: hashPassword(password),
      provider: "local",
    };
    users.push(newUser);
    saveStoredUsers(users);
    persistUser({ name, email, provider: "local" });
    return { success: true };
  }, [persistUser]);

  const loginWithGoogle = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 800));
    const googleUser: User = {
      name: "Google User",
      email: "user@gmail.com",
      provider: "google",
      avatar: undefined,
    };
    persistUser(googleUser);
    return { success: true };
  }, [persistUser]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    // Prototype: simulates dispatching a reset link — nothing is actually emailed.
    // The response is identical for known and unknown addresses so the form cannot
    // be used to enumerate which accounts exist.
    void email;
    await new Promise((r) => setTimeout(r, 600));
    return { success: true };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, loginWithGoogle, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
