"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function RegisterForm() {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();
  const a = t.authPages;

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const f = new FormData(e.currentTarget);
        const payload = {
          username: String(f.get("username")),
          email: String(f.get("email")),
          password: String(f.get("password")),
        };
        const r = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setLoading(false);
        if (r.ok) {
          router.push("/login");
        } else {
          const body = await r.json();
          setMsg(
            typeof body.message === "string"
              ? body.message
              : isEnglish
              ? "Registration failed."
              : "Đăng ký không thành công."
          );
        }
      }}
    >
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        {a.usernameLabel} *
        <input
          name="username"
          required
          placeholder={a.usernamePlaceholder}
          className="mt-1.5 h-11 w-full rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#da251d]"
        />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        {a.emailLabel} *
        <input
          name="email"
          type="email"
          required
          placeholder={a.emailPlaceholder}
          className="mt-1.5 h-11 w-full rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#da251d]"
        />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        {a.passwordLabel} ({isEnglish ? "minimum 8 characters" : "tối thiểu 8 ký tự"}) *
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder={a.passwordPlaceholder}
          className="mt-1.5 h-11 w-full rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#da251d]"
        />
      </label>

      <button
        disabled={loading}
        className="w-full bg-[#da251d] text-white py-3.5 text-xs md:text-sm font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        <UserPlus className="size-4" />
        <span>
          {loading
            ? isEnglish
              ? "CREATING ACCOUNT…"
              : "ĐANG TẠO TÀI KHOẢN…"
            : a.signUpBtn.toUpperCase()}
        </span>
      </button>

      {msg && <p className="text-xs text-red-600 font-medium text-center">{msg}</p>}
    </form>
  );
}
