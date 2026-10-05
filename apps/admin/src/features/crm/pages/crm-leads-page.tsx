import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  UserCheck,
  Phone,
  Mail,
  Calendar,
  Send,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { CustomerLead, LeadStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/auth/auth-context";

const OPERATING_STAFF = [
  "Trần Văn Bình (Điều Hành Miền Bắc)",
  "Lê Hoàng Anh (Tư Vấn Tour Cao Cấp)",
  "Phạm Mỹ Linh (CSKH & Zalo OA)",
  "Hoàng Quốc Bảo (Đối Tác & Khách Đoàn)",
];

export function CrmLeadsPage() {
  const { user, canPerformAction } = useAuth();
  const [leads, setLeads] = useState<CustomerLead[]>(() => adminStore.getLeads());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sourceFilter, setSourceFilter] = useState<string>("ALL");

  const [selectedLead, setSelectedLead] = useState<CustomerLead | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [staffToAssign, setStaffToAssign] = useState(OPERATING_STAFF[0]);

  const refreshList = () => {
    setLeads(adminStore.getLeads());
    if (selectedLead) {
      setSelectedLead(adminStore.getLeads().find((l) => l.id === selectedLead.id) || null);
    }
  };

  const handleOpenDetail = (lead: CustomerLead) => {
    setSelectedLead(lead);
    setNoteInput("");
    setIsDetailModalOpen(true);
  };

  const handleStatusTransition = (nextStatus: LeadStatus) => {
    if (!selectedLead) return;
    adminStore.updateLeadStatus(selectedLead.id, nextStatus, user?.name);
    refreshList();
  };

  const handleAssignStaff = () => {
    if (!selectedLead) return;
    adminStore.assignLead(selectedLead.id, staffToAssign, user?.name);
    refreshList();
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !noteInput.trim()) return;
    adminStore.addLeadNote(selectedLead.id, noteInput.trim(), user?.name);
    setNoteInput("");
    refreshList();
  };

  const filtered = leads.filter((lead) => {
    const details = lead.inquiryDetails || lead.message || "";
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "ALL" || lead.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-['Poppins',sans-serif]">
      {/* Main Card - Exact Match to Figma Template */}
      <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        {/* Card Header: CRM Leads & Subtitle with Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-semibold text-black tracking-tight leading-tight">
              CRM Leads & Inquiries
            </h1>
            <p className="text-[14px] text-[#16C098] font-normal mt-0.5">
              Active Pipeline & Inquiries ({filtered.length} leads)
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7E7E7E]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[12px] text-[#292D32] placeholder:text-[#B5B7C0] focus:border-[#5932EA] focus:outline-hidden transition"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-[12px] py-2 px-3 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Mọi Phễu</option>
              <option value="NEW">Mới Tiếp Nhận</option>
              <option value="ASSIGNED">Đã Gán</option>
              <option value="CONTACTED">Đã Trao Đổi</option>
              <option value="QUALIFIED">Tiềm Năng Cao</option>
              <option value="CONVERTED">Thành Công</option>
              <option value="LOST">Thất Bại</option>
            </select>

            {/* Source Filter */}
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="text-[12px] py-2 px-3 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Mọi Kênh</option>
              <option value="website">Website</option>
              <option value="ai_assistant">Trợ Lý AI</option>
              <option value="zalo">Zalo OA</option>
              <option value="facebook">Facebook</option>
              <option value="partner">Đối Tác</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Khách Hàng Nhu Cầu</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Nguồn Kênh</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Nội Dung Yêu Cầu</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Nhân Sự Phụ Trách</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center">Trạng Thái Phễu</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Ghi Chú</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    <div className="font-semibold text-black text-[14px]">{lead.name}</div>
                    <div className="text-[12px] text-[#B5B7C0] font-mono">{lead.phone} • {lead.email}</div>
                  </td>

                  <td className="py-4 text-[13px] font-medium text-[#292D32]">
                    <span className="bg-[#F9FBFF] border border-slate-100 text-[#5932EA] px-2.5 py-1 rounded-[6px] text-[11px] font-semibold">
                      {lead.source}
                    </span>
                  </td>

                  <td className="py-4 max-w-xs text-[13px] text-[#292D32]">
                    <p className="line-clamp-2 text-[#555]">{lead.inquiryDetails}</p>
                  </td>

                  <td className="py-4 text-[13px] font-medium text-[#292D32]">
                    {lead.assignedStaff ? (
                      <span className="text-[#292D32]">{lead.assignedStaff}</span>
                    ) : (
                      <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-[4px] text-[11px] font-medium border border-amber-200">
                        Chưa gán
                      </span>
                    )}
                  </td>

                  <td className="py-4 text-center">
                    <Badge variant={lead.status}>
                      {lead.status === "NEW" && "Active"}
                      {lead.status === "ASSIGNED" && "Pending"}
                      {lead.status === "CONTACTED" && "In Progress"}
                      {lead.status === "QUALIFIED" && "Active"}
                      {lead.status === "CONVERTED" && "Converted"}
                      {lead.status === "LOST" && "Inactive"}
                    </Badge>
                  </td>

                  <td className="py-4 text-[13px] text-[#7E7E7E]">
                    {lead.internalNotes.length} lượt
                  </td>

                  <td className="py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(lead)}
                      className="px-2.5 py-1 rounded-[6px] text-[12px] font-medium text-[#5932EA] hover:bg-white hover:shadow-[0px_4px_14px_rgba(89,50,234,0.18)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                      Xử Lý Lead
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Showing data + Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4">
          <p className="text-[14px] font-medium text-[#B5B7C0]">
            Showing data 1 to {filtered.length} of {leads.length} entries
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="size-7 rounded-[6px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-white hover:border-slate-300 hover:shadow-[0px_4px_14px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              &lt;
            </button>
            <button
              type="button"
              className="size-7 rounded-[6px] bg-[#5932EA] border border-[#5932EA] text-white text-[12px] font-medium flex items-center justify-center shadow-[0px_4px_14px_rgba(89,50,234,0.35)] cursor-pointer"
            >
              1
            </button>
            <button
              type="button"
              className="size-7 rounded-[6px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-white hover:border-slate-300 hover:shadow-[0px_4px_14px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Lead Detail & Pipeline Modal */}
      {isDetailModalOpen && selectedLead && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Hồ Sơ Yêu Cầu Tư Vấn: ${selectedLead.name}`}
          size="lg"
        >
          <div className="space-y-5 text-xs">
            {/* Top metadata */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3 text-slate-700">
              <div>
                <p><strong>Khách hàng:</strong> {selectedLead.name}</p>
                <p><strong>Số điện thoại:</strong> {selectedLead.phone}</p>
                <p><strong>Email:</strong> {selectedLead.email}</p>
              </div>
              <div>
                <p><strong>Nguồn lead:</strong> <Badge variant="purple">{selectedLead.source}</Badge></p>
                <p><strong>Ngày tiếp nhận:</strong> {selectedLead.createdAt}</p>
                <p><strong>Trạng thái:</strong> <Badge variant={selectedLead.status}>{selectedLead.status}</Badge></p>
              </div>
            </div>

            {/* Inquiry details */}
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
              <h4 className="font-bold text-[#5932EA] mb-1">Nhu Cầu Du Lịch Khách Hàng Nêu:</h4>
              <p className="text-slate-800 leading-relaxed">{selectedLead.inquiryDetails}</p>
            </div>

            {/* Assignment Section */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-slate-700 block">Nhân Sự Phụ Trách:</span>
                <span className="text-slate-500">{selectedLead.assignedStaff || "Chưa có nhân sự xử lý"}</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={staffToAssign}
                  onChange={(e) => setStaffToAssign(e.target.value)}
                  className="py-1 px-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
                >
                  {OPERATING_STAFF.map((staff) => (
                    <option key={staff} value={staff}>
                      {staff}
                    </option>
                  ))}
                </select>
                <Button size="sm" variant="outline" onClick={handleAssignStaff}>
                  Gán Nhân Sự
                </Button>
              </div>
            </div>

            {/* Pipeline Stage Transitions */}
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Chuyển Bước Phễu Bán Hàng (Sales Pipeline)</h4>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Button
                  size="sm"
                  variant={selectedLead.status === "CONTACTED" ? "primary" : "outline"}
                  onClick={() => handleStatusTransition("CONTACTED")}
                >
                  Đã Gọi Điện
                </Button>
                <Button
                  size="sm"
                  variant={selectedLead.status === "QUALIFIED" ? "primary" : "outline"}
                  onClick={() => handleStatusTransition("QUALIFIED")}
                >
                  Đủ Điều Kiện
                </Button>
                <Button
                  size="sm"
                  variant={selectedLead.status === "CONVERTED" ? "success" : "outline"}
                  className="text-emerald-700"
                  onClick={() => handleStatusTransition("CONVERTED")}
                >
                  ✓ Chốt Booking
                </Button>
                <Button
                  size="sm"
                  variant={selectedLead.status === "LOST" ? "destructive" : "outline"}
                  className="text-rose-600"
                  onClick={() => handleStatusTransition("LOST")}
                >
                  ✗ Huỷ / Thất Bại
                </Button>
              </div>
            </div>

            {/* Internal Notes History */}
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Ghi Chú Tiến Độ Nội Bộ</h4>
              <div className="space-y-2 mb-3 max-h-36 overflow-y-auto">
                {selectedLead.internalNotes.length === 0 ? (
                  <p className="text-slate-400 italic">Chưa có ghi chú nào.</p>
                ) : (
                  selectedLead.internalNotes.map((note) => (
                    <div key={note.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                        <strong className="text-slate-700">{note.author}</strong>
                        <span>{note.createdAt}</span>
                      </div>
                      <p className="text-slate-700">{note.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Thêm nhanh ghi chú cuộc gọi, thỏa thuận giảm giá..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
                />
                <Button type="submit" variant="primary" size="sm" className="gap-1">
                  <Send className="size-3" />
                  <span>Gửi</span>
                </Button>
              </form>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                Đóng
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
