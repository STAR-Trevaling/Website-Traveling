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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Quản Lý Leads & Yêu Cầu Tư Vấn (CRM-Lite)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quy trình tiếp nhận và chuyển hoá nhu cầu đặt tour, booking phòng, và tư vấn lịch trình từ website, chatbot AI và Zalo.
          </p>
        </div>

        <Badge variant="purple">
          {leads.filter((l) => l.status === "NEW" || l.status === "ASSIGNED").length} leads đang theo sát
        </Badge>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col lg:flex-row gap-3 items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên khách, số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full lg:w-auto flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Trạng Thái Phễu</option>
            <option value="NEW">Mới Tiếp Nhận (NEW)</option>
            <option value="ASSIGNED">Đã Phân Bổ (ASSIGNED)</option>
            <option value="CONTACTED">Đã Liên Hệ (CONTACTED)</option>
            <option value="QUALIFIED">Đủ Điều Kiện (QUALIFIED)</option>
            <option value="CONVERTED">Thành Công (CONVERTED)</option>
            <option value="LOST">Đã Thất Bại (LOST)</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Nguồn Kênh</option>
            <option value="website">Website Trực Tiếp</option>
            <option value="ai_assistant">Trợ Lý AI Star Travels</option>
            <option value="zalo">Zalo OA</option>
            <option value="facebook">Facebook Fanpage</option>
            <option value="partner">Đối Tác Giới Thiệu</option>
          </select>

          <span className="text-xs text-slate-400 font-semibold">{filtered.length} leads</span>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F9FBFF] border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Khách Hàng Nhu Cầu</th>
                <th className="py-3.5 px-4">Nguồn Tiếp Cận</th>
                <th className="py-3.5 px-4">Nội Dung Yêu Cầu</th>
                <th className="py-3.5 px-4">Nhân Sự Phụ Trách</th>
                <th className="py-3.5 px-4">Trạng Thái Phễu</th>
                <th className="py-3.5 px-4">Ghi Chú</th>
                <th className="py-3.5 px-4 text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{lead.phone} • {lead.email}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                      {lead.source}
                    </span>
                  </td>

                  <td className="py-3 px-4 max-w-xs">
                    <p className="line-clamp-2 text-slate-700">{lead.inquiryDetails}</p>
                  </td>

                  <td className="py-3 px-4">
                    {lead.assignedStaff ? (
                      <span className="font-medium text-slate-800">{lead.assignedStaff}</span>
                    ) : (
                      <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-bold">
                        Chưa gán
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={lead.status}>
                      {lead.status === "NEW" && "Tiếp Nhận"}
                      {lead.status === "ASSIGNED" && "Đã Gán"}
                      {lead.status === "CONTACTED" && "Đã Trao Đổi"}
                      {lead.status === "QUALIFIED" && "Tiềm Năng Cao"}
                      {lead.status === "CONVERTED" && "Chốt Thành Công"}
                      {lead.status === "LOST" && "Thất Bại"}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-slate-400">
                    {lead.internalNotes.length} lượt
                  </td>

                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => handleOpenDetail(lead)}
                    >
                      Xử Lý Lead
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
