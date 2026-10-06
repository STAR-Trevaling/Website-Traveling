"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function LoginForm() {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();
  const a = t.authPages;

  const [username, setUsername] = useState("traveler_demo");
  const [password, setPassword] = useState("TravelerDemo123!");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const r = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        setLoading(false);
        if (r.ok) {
          router.push("/account");
          router.refresh();
        } else {
          setMsg(
            isEnglish
              ? "Invalid username or password."
              : "Tài khoản hoặc mật khẩu không chính xác."
          );
        }
      }}
    >
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        {a.usernameLabel}
        <input
          required
          placeholder={a.usernamePlaceholder}
          className="mt-1.5 h-11 w-full rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#0098a2]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        {a.passwordLabel}
        <input
          type="password"
          required
          placeholder={a.passwordPlaceholder}
          className="mt-1.5 h-11 w-full rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#0098a2]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button
        disabled={loading}
        className="w-full bg-[#0098a2] text-white py-3.5 text-xs md:text-sm font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        <LogIn className="size-4" />
        <span>
          {loading
            ? isEnglish
              ? "SIGNING IN…"
              : "ĐANG ĐĂNG NHẬP…"
            : a.signInBtn.toUpperCase()}
        </span>
      </button>

      {msg && <p className="text-xs text-red-600 font-medium text-center">{msg}</p>}
    </form>
  );
}
