"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { CurrentUser } from "@/lib/types";
import { ROLES, type AppRole } from "@/lib/auth-constants";

interface AuthContextType {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasRole: (role: AppRole) => boolean;
  hasAnyRole: (roles: AppRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: CurrentUser | null;
}

export function AuthProvider({ children, initialUser = null }: AuthProviderProps) {
  const [user, setUser] = useState<CurrentUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Refresh user data from /api/auth/me
  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setUser(data.user);
        router.refresh();
        return { success: true };
      }

      return { success: false, error: data.message || "Invalid credentials." };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.refresh();
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (role: AppRole): boolean => {
    if (!user) return false;
    if (user.role === ROLES.ADMIN || user.is_staff) return true;
    return user.role === role;
  };

  const hasAnyRole = (roles: AppRole[]): boolean => {
    if (!user) return false;
    if (user.role === ROLES.ADMIN || user.is_staff) return true;
    return roles.some((r) => user.role === r);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
        refreshUser,
        hasRole,
        hasAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
