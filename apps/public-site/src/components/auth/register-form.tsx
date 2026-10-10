"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface RegisterFormProps {
  returnUrl?: string;
}

export function RegisterForm({ returnUrl }: RegisterFormProps) {
  const router = useRouter();
  const { t, isEnglish } = useLanguage();
  const a = t.authPages;

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [consentAgreed, setConsentAgreed] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!consentAgreed) {
          setMsg(
            isEnglish
              ? "Please agree to the Terms of Service and Privacy Policy to register."
              : "Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật để đăng ký."
          );
          return;
        }
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
          router.push(returnUrl ? `/login?returnUrl=${encodeURIComponent(returnUrl)}` : "/login");
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

      <div className="pt-1">
        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            required
            checked={consentAgreed}
            onChange={(e) => setConsentAgreed(e.target.checked)}
            className="mt-0.5 size-4 rounded-[2px] border-slate-300 text-[#da251d] focus:ring-[#da251d] cursor-pointer"
          />
          <span className="leading-snug">
            {isEnglish ? (
              <>
                I agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#da251d] underline hover:text-[#b81d16]">
                  Terms of Service
                </a>{" "}
                and consent to data processing per{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#da251d] underline hover:text-[#b81d16]">
                  Decree 13/2023/ND-CP
                </a>
                . *
              </>
            ) : (
              <>
                Tôi đồng ý với{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#da251d] underline hover:text-[#b81d16]">
                  Điều khoản dịch vụ
                </a>{" "}
                và cho phép xử lý dữ liệu cá nhân theo{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#da251d] underline hover:text-[#b81d16]">
                  Nghị định 13/2023/NĐ-CP
                </a>
                . *
              </>
            )}
          </span>
        </label>
      </div>

      <button
        disabled={loading || !consentAgreed}
        className="w-full bg-[#da251d] text-white py-3.5 text-xs md:text-sm font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
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
