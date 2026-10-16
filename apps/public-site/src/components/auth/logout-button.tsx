"use client";

import { LogOut } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/providers/auth-provider";

export function LogoutButton() {
  const { t } = useLanguage();
  const { logout, isLoading } = useAuth();

  return (
    <button
      disabled={isLoading}
      className="inline-flex items-center gap-1.5 border border-slate-300 bg-white text-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60"
      onClick={async () => {
        await logout();
      }}
    >
      <LogOut className="size-3.5" />
      <span>{t.authPages.logoutBtn.toUpperCase()}</span>
    </button>
  );
}
