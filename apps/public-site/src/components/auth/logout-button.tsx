"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function LogoutButton() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <button
      className="inline-flex items-center gap-1.5 border border-slate-300 bg-white text-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
        router.refresh();
      }}
    >
      <LogOut className="size-3.5" />
      <span>{t.authPages.logoutBtn.toUpperCase()}</span>
    </button>
  );
}
