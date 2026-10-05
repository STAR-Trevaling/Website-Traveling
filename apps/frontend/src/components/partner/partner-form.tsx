"use client";

import { useState, useTransition } from "react";
import { Send, CheckCircle2, Building2 } from "lucide-react";
import { submitPartnerApplication } from "@/app/actions";

export function PartnerForm() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    start(async () => {
      const res = await submitPartnerApplication({
        business_name: String(formData.get("business_name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        website: String(formData.get("website") || ""),
        message: String(formData.get("message") || ""),
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
          Đăng Ký Thành Công
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm font-light text-slate-600 leading-relaxed">
          {msg || "Hồ sơ của bạn đã được gửi tới Ban Thẩm Định Đối Tác Star Travels. Chúng tôi sẽ phản hồi qua email và liên hệ xác minh trong vòng 24 giờ."}
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setMsg("");
          }}
          className="mt-6 bg-[#0098a2] text-white px-6 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          Gửi Thêm Hồ Sơ Khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Tên doanh nghiệp / Đơn vị tổ chức *
        </label>
        <div className="relative">
          <input
            name="business_name"
            required
            placeholder="Ví dụ: Du Thuyền Di Sản Hạ Long Heritage Cruise"
            className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Email liên hệ công việc *
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="partnership@cruisecompany.vn"
            className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Số điện thoại / Hotline *
          </label>
          <input
            name="phone"
            required
            placeholder="024 3988 7766 / 0912..."
            className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Website / Kênh quảng bá chính thức
        </label>
        <input
          name="website"
          type="url"
          placeholder="https://heritagecruise.vn hoặc Fanpage"
          className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Mô tả dịch vụ & trải nghiệm dự kiến cung cấp *
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Giới thiệu năng lực phục vụ, số lượng phòng/thuyền/xe, chứng chỉ lữ hành quốc tế/nội địa, và các tour độc quyền bạn mong muốn phân phối qua Star Travels..."
          className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#0098a2] text-white py-3.5 text-xs md:text-sm font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
      >
        <Building2 className="size-4" />
        <span>{pending ? "ĐANG GỬI HỒ SƠ THẨM ĐỊNH…" : "NỘP HỒ SƠ ĐỐI TÁC CHÍNH THỨC"}</span>
      </button>

      {msg && !success && (
        <p className="text-xs text-red-500 font-medium text-center">{msg}</p>
      )}
    </form>
  );
}
