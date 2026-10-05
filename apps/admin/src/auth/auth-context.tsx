import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AdminRole, AdminUser } from "@/types";

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  role: AdminRole;
  switchRole: (role: AdminRole) => void;
  hasPermission: (permission: string) => boolean;
  canAccessModule: (module: string) => boolean;
  canPerformAction: (action: string) => boolean;
  login: (email: string, role?: AdminRole) => void;
  logout: () => void;
}

const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  SUPER_ADMIN: ["*"],
  ADMIN: [
    "dashboard.view",
    "destinations.view",
    "destinations.edit",
    "destinations.publish",
    "places.view",
    "places.edit",
    "places.publish",
    "partners.view",
    "partners.review",
    "partners.approve",
    "articles.view",
    "articles.edit",
    "articles.publish",
    "reviews.view",
    "reviews.moderate",
    "customers.view",
    "customers.edit",
    "crm.view",
    "crm.manage",
    "knowledge.view",
    "knowledge.edit",
    "analytics.view",
    "audit.view",
    "settings.view",
  ],
  CONTENT_EDITOR: [
    "dashboard.view",
    "destinations.view",
    "destinations.edit",
    "destinations.publish",
    "places.view",
    "places.edit",
    "articles.view",
    "articles.edit",
    "articles.publish",
    "knowledge.view",
    "knowledge.edit",
  ],
  PARTNER_REVIEWER: [
    "dashboard.view",
    "partners.view",
    "partners.review",
    "partners.approve",
    "audit.view",
  ],
  MODERATOR: [
    "dashboard.view",
    "reviews.view",
    "reviews.moderate",
    "audit.view",
  ],
  OPERATIONS_MANAGER: [
    "dashboard.view",
    "customers.view",
    "crm.view",
    "crm.manage",
    "partners.view",
    "analytics.view",
    "audit.view",
  ],
};

const MODULE_REQUIRED_PERMISSIONS: Record<string, string> = {
  dashboard: "dashboard.view",
  destinations: "destinations.view",
  places: "places.view",
  articles: "articles.view",
  partners: "partners.view",
  reviews: "reviews.view",
  customers: "customers.view",
  crm: "crm.view",
  knowledge: "knowledge.view",
  analytics: "analytics.view",
  audit: "audit.view",
  settings: "settings.view",
};

const DEFAULT_ADMIN: AdminUser = {
  id: "usr-super-01",
  username: "superadmin",
  name: "Vũ Đình Toàn",
  email: "toan.vu@startravels.vn",
  role: "SUPER_ADMIN",
  isStaff: true,
  permissions: ["*"],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser>(() => {
    const saved = localStorage.getItem("star_admin_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback to default
      }
    }
    return DEFAULT_ADMIN;
  });

  useEffect(() => {
    localStorage.setItem("star_admin_user", JSON.stringify(user));
  }, [user]);

  const switchRole = (newRole: AdminRole) => {
    setUser((prev) => ({
      ...prev,
      role: newRole,
      permissions: ROLE_PERMISSIONS[newRole],
    }));
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.role === "SUPER_ADMIN") return true;
    const permissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.includes("*") || permissions.includes(permission);
  };

  const canAccessModule = (module: string): boolean => {
    if (!user) return false;
    if (user.role === "SUPER_ADMIN") return true;
    const req = MODULE_REQUIRED_PERMISSIONS[module];
    if (!req) return true;
    return hasPermission(req);
  };

  const canPerformAction = (action: string): boolean => {
    if (!user) return false;
    if (user.role === "SUPER_ADMIN") return true;
    if (action === "publish") {
      return hasPermission("destinations.publish") || hasPermission("articles.publish");
    }
    if (action === "edit") {
      return (
        hasPermission("destinations.edit") ||
        hasPermission("places.edit") ||
        hasPermission("articles.edit") ||
        hasPermission("customers.edit") ||
        hasPermission("knowledge.edit")
      );
    }
    if (action === "review" || action === "approve") {
      return hasPermission("partners.review") || hasPermission("partners.approve");
    }
    if (action === "moderate") {
      return hasPermission("reviews.moderate");
    }
    return hasPermission(action);
  };

  const login = (email: string, role: AdminRole = "SUPER_ADMIN") => {
    const loggedUser: AdminUser = {
      id: `usr-${Date.now()}`,
      username: email.split("@")[0],
      name: email.split("@")[0].toUpperCase(),
      email,
      role,
      isStaff: true,
      permissions: ROLE_PERMISSIONS[role],
    };
    setUser(loggedUser);
  };

  const logout = () => {
    setUser(DEFAULT_ADMIN);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user.role,
        switchRole,
        hasPermission,
        canAccessModule,
        canPerformAction,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
