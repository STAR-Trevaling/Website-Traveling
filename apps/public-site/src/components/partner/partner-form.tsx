"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Building2 } from "lucide-react";
import { submitPartnerApplication } from "@/app/actions";
import { useLanguage } from "@/lib/i18n/context";
import { getStoredUtm } from "@/lib/utm";

export function PartnerForm() {
  const { t, isEnglish } = useLanguage();
  const f = t.partnerPage.form;

  const [pending, start] = useTransition();
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const utmData = getStoredUtm();
    start(async () => {
      const res = await submitPartnerApplication({
        business_name: String(formData.get("business_name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        website: String(formData.get("website") || ""),
        message: String(formData.get("message") || ""),
        metadata: utmData ? { utm: utmData } : undefined,
      });

      setMsg(res.message);
      if (res.ok) {
        setSuccess(true);
      }
    });
  };

  if (success) {
    return (
      <div className="rounded-[2px] bg-white p-8 md:p-10 text-center shadow-sm border border-slate-100">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="display-title mt-5 text-2xl font-bold text-[#1e293b]">
          {f.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm font-light text-slate-600 leading-relaxed">
          {msg || f.successDesc}
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setMsg("");
          }}
          className="mt-6 bg-[#da251d] text-white px-6 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          {isEnglish ? "Submit Another Application" : "Gửi Thêm Hồ Sơ Khác"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          {f.companyName} *
        </label>
        <div className="relative">
          <input
            name="business_name"
            required
            placeholder={f.companyNamePlaceholder}
            className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            {f.email} *
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder={f.emailPlaceholder}
            className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            {f.phone} *
          </label>
          <input
            name="phone"
            required
            placeholder={f.phonePlaceholder}
            className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          {f.portfolioLink}
        </label>
        <input
          name="website"
          type="url"
          placeholder={f.portfolioLinkPlaceholder}
          className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          {f.notes} *
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={f.notesPlaceholder}
          className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#da251d] text-white py-3.5 text-xs md:text-sm font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
      >
        <Building2 className="size-4" />
        <span>
          {pending
            ? isEnglish
              ? "SUBMITTING APPLICATION..."
              : "ĐANG GỬI HỒ SƠ THẨM ĐỊNH…"
            : f.submitBtn.toUpperCase()}
        </span>
      </button>

      {msg && !success && (
        <p className="text-xs text-red-500 font-medium text-center">{msg}</p>
      )}
    </form>
  );
}
