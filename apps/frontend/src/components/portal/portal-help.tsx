"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, MessageSquare, Phone, Mail, Clock, CheckCircle2, X } from "lucide-react";

export interface SupportTicket {
  id: string;
  ticketCode: string;
  senderName: string;
  contact: string;
  subject: string;
  category: "tour_advice" | "partner" | "billing" | "custom";
  categoryLabel: string;
  time: string;
  priority: "Cao" | "Bình thường";
  status: "Active" | "Inactive";
  content: string;
}

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: "tk-1",
    ticketCode: "TK-VN-1042",
    senderName: "Hoàng Anh Tuấn (VinFast Group)",
    contact: "0912 345 678",
    subject: "Yêu cầu lịch trình riêng cho đoàn 12 khách VIP Vịnh Hạ Long",
    category: "tour_advice",
    categoryLabel: "Tư vấn Tour VIP",
    time: "10 phút trước",
    priority: "Cao",
    status: "Active",
    content: "Đoàn cần xuất hóa đơn VAT công ty và yêu cầu đầu bếp nấu riêng thực đơn ăn kiêng.",
  },
  {
    id: "tk-2",
    ticketCode: "TK-VN-1041",
    senderName: "Du thuyền Paradise Hạ Long",
    contact: "partner@paradisevietnam.com",
    subject: "Hợp đồng phân phối độc quyền quỹ phòng du thuyền mùa cao điểm 2026",
    category: "partner",
    categoryLabel: "Đối tác Lữ hành",
    time: "45 phút trước",
    priority: "Cao",
    status: "Active",
    content: "Paradise Vietnam gửi bảng giá net và chính sách hoa hồng cho các đối tác cấp 1.",
  },
  {
    id: "tk-3",
    ticketCode: "TK-VN-1040",
    senderName: "Emma Watson",
    contact: "emma.w@britishcouncil.org",
    subject: "Tư vấn dịch vụ xe đón tiễn sân bay Liên Khương về khách sạn Đà Lạt",
    category: "tour_advice",
    categoryLabel: "Dịch vụ Đưa đón",
    time: "2 giờ trước",
    priority: "Bình thường",
    status: "Active",
    content: "Chuyến bay hạ cánh lúc 08:30 sáng, cần xe 7 chỗ đời mới có ghế trẻ em.",
  },
  {
    id: "tk-4",
    ticketCode: "TK-VN-1039",
    senderName: "Trần Đức Minh",
    contact: "minh.td@vng.com.vn",
    subject: "Xác nhận lịch lặn ngắm san hô Cù Lao Chàm trong tour Hội An",
    category: "tour_advice",
    categoryLabel: "Xác nhận Dịch vụ",
    time: "Hôm qua",
    priority: "Bình thường",
    status: "Inactive",
    content: "Đã gọi điện tư vấn và hướng dẫn chuẩn bị trang phục lặn biển an toàn.",
  },
  {
    id: "tk-5",
    ticketCode: "TK-VN-1038",
    senderName: "Khách sạn Mường Thanh Đà Nẵng",
    contact: "sales.dn@muongthanh.vn",
    subject: "Cập nhật bảng giá phòng ưu đãi hội nghị khách hàng",
    category: "partner",
    categoryLabel: "Đối tác Khách sạn",
    time: "Hôm qua",
    priority: "Bình thường",
    status: "Inactive",
    content: "Đã cập nhật hệ thống liên kết đặt phòng tự động cho quản trị viên.",
  },
  {
    id: "tk-6",
    ticketCode: "TK-VN-1037",
    senderName: "Sarah Jenkins",
    contact: "sarah.j@traveloka.com",
    subject: "Hỗ trợ thủ tục hoàn cọc tour Mekong Delta do đổi lịch bay",
    category: "billing",
    categoryLabel: "Hoàn cọc & Đổi lịch",
    time: "2 ngày trước",
    priority: "Bình thường",
    status: "Inactive",
    content: "Đã xử lý lệnh hoàn tiền 5.400.000 ₫ qua cổng thanh toán VNPay.",
  },
];

export function PortalHelp() {
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    if (selectedCategory !== "all") {
      result = result.filter((t) => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.senderName.toLowerCase().includes(q) ||
          t.ticketCode.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q)
      );
    }

    return result;
  }, [tickets, selectedCategory, searchQuery]);

  const handleToggleStatus = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" }
          : t
      )
    );

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket((prev) =>
        prev
          ? { ...prev, status: prev.status === "Active" ? "Inactive" : "Active" }
          : null
      );
    }
  };

  return (
    <div className="w-full bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)] font-poppins relative">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Phân loại yêu cầu:
          </span>
          {[
            { key: "all", label: "Tất cả yêu cầu" },
            { key: "tour_advice", label: "Tư vấn Tour & Lịch trình" },
            { key: "partner", label: "Hợp tác Đối tác & Lữ hành" },
            { key: "billing", label: "Hóa đơn & Hoàn cọc" },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-[#5932EA] text-white shadow-xs"
                  : "bg-[#F9FBFF] text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-[216px] h-[38px] bg-[#F9FBFF] rounded-[10px] flex items-center px-3.5 gap-2 border border-slate-100 focus-within:border-indigo-300 transition">
          <Search className="size-4 text-[#7E7E7E] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticket..."
            className="w-full bg-transparent text-[12px] text-[#292D32] placeholder-[#B5B7C0] outline-hidden font-normal"
          />
        </div>
      </div>

      {/* Header Row */}
      <div className="mb-7">
        <h2 className="text-[22px] font-semibold text-black leading-tight">
          Help & Customer Inquiries
        </h2>
        <p className="text-[14px] font-normal text-[#16C098] mt-1">
          Open Support Tickets & Partner Inbound Queue
        </p>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-[#EEEEEE]">
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[16%]">
                Ticket ID
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[22%]">
                Sender & Contact
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[32%]">
                Subject
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[16%]">
                Category
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center w-[14%]">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EEEEEE]">
            {filteredTickets.map((t) => {
              const isActive = t.status === "Active";

              return (
                <tr
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                >
                  <td className="py-5 pr-2">
                    <span className="font-mono text-[13px] font-medium text-[#5932EA]">
                      {t.ticketCode}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {t.time}
                    </span>
                  </td>

                  <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                    <div className="group-hover:text-[#5932EA] transition-colors">{t.senderName}</div>
                    <span className="text-xs text-slate-400">{t.contact}</span>
                  </td>

                  <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2 max-w-[280px]">
                    <div className="truncate">{t.subject}</div>
                    <span className={`text-[11px] font-semibold mt-0.5 inline-block ${
                      t.priority === "Cao" ? "text-rose-600" : "text-slate-400"
                    }`}>
                      Độ ưu tiên: {t.priority}
                    </span>
                  </td>

                  <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-semibold">
                      {t.categoryLabel}
                    </span>
                  </td>

                  <td className="py-5 text-center">
                    <span
                      className={`inline-flex items-center justify-center min-w-[80px] px-3 py-1 rounded-[4px] text-[14px] font-medium tracking-[0.14px] transition select-none ${
                        isActive
                          ? "bg-[rgba(22,192,152,0.38)] outline-1 outline-[#00B087] -outline-offset-1 text-[#008767]"
                          : "bg-slate-100 outline-1 outline-slate-200 -outline-offset-1 text-slate-500"
                      }`}
                    >
                      {isActive ? "Đang xử lý" : "Đã xong"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-7 pt-2">
        <p className="text-[14px] font-medium text-[#B5B7C0]">
          Showing data 1 to {Math.min(filteredTickets.length, 8)} of {filteredTickets.length} tickets
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52]"
          >
            &lt;
          </button>
          <button
            type="button"
            className="size-7 rounded-[4px] bg-[#5932EA] outline-1 outline-[#5932EA] -outline-offset-1 flex items-center justify-center text-[12px] font-semibold text-white"
          >
            1
          </button>
          <button
            type="button"
            className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52]"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Ticket Modal */}
      {selectedTicket && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-poppins"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#5932EA] uppercase tracking-wider mb-1">
              <span>{selectedTicket.ticketCode}</span>
              <span className="text-slate-300">•</span>
              <span>{selectedTicket.categoryLabel}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {selectedTicket.subject}
            </h3>

            <div className="p-4 rounded-2xl bg-[#F9FBFF] border border-slate-100 grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <span className="text-slate-400 block mb-0.5">Người gửi</span>
                <span className="font-semibold text-slate-800">{selectedTicket.senderName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Liên hệ</span>
                <span className="font-semibold text-slate-800">{selectedTicket.contact}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Thời gian gửi</span>
                <span className="font-semibold text-slate-800">{selectedTicket.time}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Trạng thái</span>
                <span className="font-semibold text-emerald-600">
                  {selectedTicket.status === "Active" ? "Đang xử lý" : "Đã hoàn thành"}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Nội dung chi tiết yêu cầu
              </span>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {selectedTicket.content}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleToggleStatus(selectedTicket.id)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                {selectedTicket.status === "Active" ? "Đánh dấu đã xử lý" : "Mở lại yêu cầu"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-[#5932EA] text-white hover:bg-[#4a26d4] transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
