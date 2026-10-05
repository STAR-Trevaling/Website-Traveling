"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
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
          setMsg(typeof body.message === "string" ? body.message : "Đăng ký không thành công.");
        }
      }}
    >
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        Tài khoản / Username *
        <input
          name="username"
          required
          className="mt-1.5 h-11 w-full rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#0098a2]"
        />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        Địa chỉ Email *
        <input
          name="email"
          type="email"
          required
          className="mt-1.5 h-11 w-full rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#0098a2]"
        />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
        Mật khẩu / Password (tối thiểu 8 ký tự) *
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className="mt-1.5 h-11 w-full rounded-[2px] border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#0098a2]"
        />
      </label>

      <button
        disabled={loading}
        className="w-full bg-[#0098a2] text-white py-3.5 text-xs md:text-sm font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        <UserPlus className="size-4" />
        <span>{loading ? "ĐANG TẠO TÀI KHOẢN…" : "TẠO TÀI KHOẢN MỚI"}</span>
      </button>

      {msg && <p className="text-xs text-red-600 font-medium text-center">{msg}</p>}
    </form>
  );
}
