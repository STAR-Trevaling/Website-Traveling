"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { submitInquiry } from "@/app/actions";

export function ContactForm() {
  const { t, isEnglish } = useLanguage();
  const f = t.contactPage.form;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "ha-long",
    travelDate: "",
    guests: "2",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await submitInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      destination: formData.destination,
      travelDate: formData.travelDate,
      guests: formData.guests,
      message: formData.message,
      inquiry_type: "consultation",
    });
    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      alert(res.message);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[2px] bg-white p-8 md:p-12 text-center shadow-sm border border-slate-100">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="display-title mt-6 text-2xl font-bold text-[#1e293b]">
          {f.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm md:text-base font-light text-slate-600 leading-relaxed">
          {f.successDesc}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              destination: "ha-long",
              travelDate: "",
              guests: "2",
              message: "",
            });
          }}
          className="mt-8 bg-[#da251d] text-white px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          {isEnglish ? "Submit Another Request" : "Gửi Yêu Cầu Khác"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            {f.fullName} *
          </label>
          <input
            type="text"
            required
            placeholder={f.fullNamePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            {f.phone} *
          </label>
          <input
            type="tel"
            required
            placeholder={f.phonePlaceholder}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            {f.email} *
          </label>
          <input
            type="email"
            required
            placeholder={f.emailPlaceholder}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            {f.destination} *
          </label>
          <select
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
          >
            <option value="ha-long">
              {isEnglish ? "Ha Long Bay (Heritage Cruise)" : "Vịnh Hạ Long (Du thuyền di sản)"}
            </option>
            <option value="sapa">
              {isEnglish ? "Sa Pa & Fansipan (Cloud Hunting & Trekking)" : "Sa Pa - Fansipan (Săn mây & Trekking)"}
            </option>
            <option value="da-nang">
              {isEnglish ? "Da Nang & Hoi An (Ancient Town & Beaches)" : "Đà Nẵng - Hội An (Phố cổ & Bãi biển)"}
            </option>
            <option value="phu-quoc">
              {isEnglish ? "Phu Quoc Pearl Island (Coral Reef & Resorts)" : "Đảo Ngọc Phú Quốc (Lặn san hô & Resort)"}
            </option>
            <option value="mekong">
              {isEnglish ? "Mekong Riverways (Floating Market & Orchards)" : "Miền Tây Sông Nước (Chợ nổi & Sinh thái)"}
            </option>
            <option value="other">
              {isEnglish ? "Custom Grand Vietnam Journey" : "Tư vấn hành trình xuyên Việt riêng biệt"}
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            {isEnglish ? "Estimated Departure Date" : "Ngày dự kiến khởi hành"}
          </label>
          <input
            type="date"
            value={formData.travelDate}
            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            {f.guests}
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          {f.message}
        </label>
        <textarea
          rows={4}
          placeholder={f.messagePlaceholder}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#da251d] focus:ring-1 focus:ring-[#da251d] rounded-[2px]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#da251d] text-white py-4 text-xs md:text-sm font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
      >
        <Send className="size-4" />
        <span>
          {loading
            ? isEnglish
              ? "Submitting request..."
              : "Đang gửi yêu cầu..."
            : f.submitBtn}
        </span>
      </button>
    </form>
  );
}
