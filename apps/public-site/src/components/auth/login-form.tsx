"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/providers/auth-provider";

interface LoginFormProps {
  returnUrl?: string;
}

export function LoginForm({ returnUrl }: LoginFormProps) {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();
  const { login } = useAuth();
  const a = t.authPages;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await login(username, password);
        setLoading(false);
        if (res.success) {
          router.push(returnUrl || "/account");
        } else {
          setMsg(
            res.error ||
              (isEnglish
                ? "Invalid username or password."
                : "Tài khoản hoặc mật khẩu không chính xác.")
          );
        }
      }}
    >
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        {a.usernameLabel}
        <input
          required
          placeholder={a.usernamePlaceholder}
          className="mt-1.5 h-11 w-full rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#da251d]"
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
          className="mt-1.5 h-11 w-full rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#da251d]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button
        disabled={loading}
        className="w-full bg-[#da251d] text-white py-3.5 text-xs md:text-sm font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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
