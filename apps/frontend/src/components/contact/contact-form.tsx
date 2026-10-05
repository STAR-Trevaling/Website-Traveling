"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="rounded-[2px] bg-white p-8 md:p-12 text-center shadow-sm border border-slate-100">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="display-title mt-6 text-2xl font-bold text-[#1e293b]">
          Yêu Cầu Đã Được Tiếp Nhận
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm md:text-base font-light text-slate-600 leading-relaxed">
          Cảm ơn bạn, <strong>{formData.name}</strong>! Chuyên viên tư vấn điểm đến của Star Travels sẽ liên hệ qua điện thoại ({formData.phone}) hoặc email ({formData.email}) trong vòng 2 giờ làm việc để gửi lịch trình chi tiết và báo giá ưu đãi.
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
          className="mt-8 bg-[#0098a2] hover:bg-[#087c86] text-white px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase transition rounded-[2px]"
        >
          Gửi Yêu Cầu Khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Họ và tên *
          </label>
          <input
            type="text"
            required
            placeholder="Ví dụ: Nguyễn Văn An"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Số điện thoại / Zalo *
          </label>
          <input
            type="tel"
            required
            placeholder="Ví dụ: 0912 345 678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Địa chỉ Email *
          </label>
          <input
            type="email"
            required
            placeholder="Ví dụ: vanan@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Điểm đến quan tâm *
          </label>
          <select
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
          >
            <option value="ha-long">Vịnh Hạ Long (Du thuyền di sản)</option>
            <option value="sapa">Sa Pa - Fansipan (Săn mây & Trekking)</option>
            <option value="da-nang">Đà Nẵng - Hội An (Phố cổ & Bãi biển)</option>
            <option value="phu-quoc">Đảo Ngọc Phú Quốc (Lặn san hô & Resort)</option>
            <option value="mekong">Miền Tây Sông Nước (Chợ nổi & Sinh thái)</option>
            <option value="other">Tư vấn hành trình xuyên Việt riêng biệt</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Ngày dự kiến khởi hành
          </label>
          <input
            type="date"
            value={formData.travelDate}
            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Số lượng khách (Người lớn & Trẻ em)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          Ghi chú yêu cầu riêng (Sở thích, phòng nghỉ, ăn uống,...)
        </label>
        <textarea
          rows={4}
          placeholder="Hãy chia sẻ mong muốn đặc biệt của bạn cho chuyến đi này (ví dụ: tour riêng tư, phòng view biển, ăn chay, kỷ niệm ngày cưới...)"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0098a2] hover:bg-[#087c86] disabled:opacity-70 text-white py-4 text-xs md:text-sm font-semibold tracking-widest uppercase transition rounded-[2px] shadow-sm flex items-center justify-center gap-2 cursor-pointer"
      >
        <Send className="size-4" />
        <span>{loading ? "Đang gửi yêu cầu..." : "Gửi Yêu Cầu Tư Vấn Ngay"}</span>
      </button>
    </form>
  );
}
