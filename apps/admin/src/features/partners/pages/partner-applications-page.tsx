import React, { useState } from "react";
import {
  Building2,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileText,
  Mail,
  Phone,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { PartnerApplication, PartnerAppStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/auth/auth-context";

export function PartnerApplicationsPage() {
  const { user, canPerformAction } = useAuth();
  const [applications, setApplications] = useState<PartnerApplication[]>(() =>
    adminStore.getPartnerApplications()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [selectedApp, setSelectedApp] = useState<PartnerApplication | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const refreshList = () => {
    setApplications(adminStore.getPartnerApplications());
    if (selectedApp) {
      setSelectedApp(adminStore.getPartnerApplication(selectedApp.id) || null);
    }
  };

  const handleOpenDetail = (app: PartnerApplication) => {
    setSelectedApp(app);
    setNoteText("");
    setIsDetailModalOpen(true);
  };

  const handleTransition = (nextStatus: PartnerAppStatus) => {
    if (!selectedApp) return;
    adminStore.updateApplicationStatus(selectedApp.id, nextStatus, user?.name, noteText);
    refreshList();
    setNoteText("");
  };

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.businessType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-['Poppins',sans-serif]">
      {/* Main Card - Exact Match to Figma Template */}
      <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        {/* Card Header: Partner Applications & Subtitle with Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-semibold text-black tracking-tight leading-tight">
              Partner Applications
            </h1>
            <p className="text-[14px] text-[#16C098] font-normal mt-0.5">
              Active Onboarding & Verifications ({filtered.length} hồ sơ)
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
              <option value="ALL">Mọi Trạng Thái</option>
              <option value="SUBMITTED">Mới Nộp</option>
              <option value="UNDER_REVIEW">Đang Thẩm Định</option>
              <option value="CHANGES_REQUESTED">Cần Bổ Sung</option>
              <option value="APPROVED">Đã Duyệt</option>
              <option value="REJECTED">Từ Chối</option>
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Doanh Nghiệp / Cơ Sở</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Loại Hình</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Người Đại Diện</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Thời Điểm Nộp</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center">Trạng Thái</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Phụ Trách</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Rủi Ro</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    <div className="font-semibold text-black text-[14px]">{app.businessName}</div>
                    <div className="text-[12px] text-[#B5B7C0] font-mono">MST: {app.taxId}</div>
                  </td>

                  <td className="py-4 text-[13px] font-medium text-[#292D32]">
                    <span className="bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] px-2.5 py-1 rounded-[6px] text-[11px] font-semibold">
                      {app.businessType}
                    </span>
                  </td>

                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    <div className="font-medium text-black">{app.applicantName}</div>
                    <div className="text-[12px] text-[#B5B7C0]">{app.email}</div>
                  </td>

                  <td className="py-4 text-[13px] text-[#7E7E7E] font-mono">
                    {app.submittedAt}
                  </td>

                  <td className="py-4 text-center">
                    <Badge variant={app.status}>
                      {app.status === "SUBMITTED" && "Pending"}
                      {app.status === "UNDER_REVIEW" && "Reviewing"}
                      {app.status === "CHANGES_REQUESTED" && "Needs Info"}
                      {app.status === "APPROVED" && "Approved"}
                      {app.status === "REJECTED" && "Rejected"}
                    </Badge>
                  </td>

                  <td className="py-4 text-[13px] text-[#292D32] font-medium">
                    {app.reviewerName || <span className="text-[#B5B7C0] italic">Chưa gán</span>}
                  </td>

                  <td className="py-4">
                    {app.riskFlags.length > 0 ? (
                      <div className="flex items-center gap-1 text-[#DF0404] font-medium text-[12px]">
                        <ShieldAlert className="size-3.5" />
                        <span>{app.riskFlags.length} Cảnh báo</span>
                      </div>
                    ) : (
                      <span className="text-[#008767] font-medium text-[12px]">An toàn</span>
                    )}
                  </td>

                  <td className="py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(app)}
                      className="text-[12px] font-medium text-[#5932EA] hover:underline cursor-pointer"
                    >
                      Chi Tiết
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
            Showing data 1 to {filtered.length} of {applications.length} entries
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            >
              &lt;
            </button>
            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#5932EA] border border-[#5932EA] text-white text-[12px] font-medium flex items-center justify-center shadow-xs cursor-pointer"
            >
              1
            </button>
            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Detail & Review Modal with Explicit State Transitions */}
      {isDetailModalOpen && selectedApp && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Hồ Sơ Đăng Ký: ${selectedApp.businessName}`}
          size="xl"
        >
          <div className="space-y-6">
            {/* Top info grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Thông Tin Doanh Nghiệp
                </h4>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <p><strong>Tên pháp nhân:</strong> {selectedApp.businessName}</p>
                  <p><strong>Mã số thuế:</strong> {selectedApp.taxId}</p>
                  <p><strong>Loại hình:</strong> {selectedApp.businessType}</p>
                  <p><strong>Địa chỉ trụ sở:</strong> {selectedApp.address}</p>
                  <p><strong>Trang web / Fanpage:</strong> {selectedApp.website || "Chưa cung cấp"}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Người Đại Diện & Liên Hệ
                </h4>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <p><strong>Họ và tên:</strong> {selectedApp.applicantName}</p>
                  <p><strong>Email công vụ:</strong> {selectedApp.email}</p>
                  <p><strong>Số điện thoại:</strong> {selectedApp.phone}</p>
                  <p><strong>Trạng thái hiện tại:</strong> <Badge variant={selectedApp.status}>{selectedApp.status}</Badge></p>
                </div>
              </div>
            </div>

            {/* Risk Flags if any */}
            {selectedApp.riskFlags.length > 0 && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-2">
                  <ShieldAlert className="size-4" />
                  <span>Cảnh Báo Thẩm Định Tự Động (Risk Flags)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-rose-700 space-y-1">
                  {selectedApp.riskFlags.map((rf, idx) => (
                    <li key={idx}>{rf}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Legal Documents */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-2">Tài Liệu Pháp Lý Đính Kèm</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedApp.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-[#5932EA]" />
                      <span className="font-semibold text-slate-800">{doc.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{doc.fileType}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Timeline & Audit History */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-2">Lịch Sử Xử Lý & Tiến Trình Thẩm Định</h4>
              <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3">
                {selectedApp.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs border-b border-slate-100 last:border-0 pb-2.5 last:pb-0">
                    <Clock className="size-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">{step.step}</div>
                      <div className="text-[11px] text-slate-400">
                        {step.timestamp} bởi <strong>{step.actor}</strong>
                      </div>
                      {step.note && <div className="text-[11px] text-slate-600 mt-0.5 italic">Ghi chú: {step.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Note Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ghi Chú Thẩm Định Của Chuyên Viên (Lưu vào nhật ký bất biến)
              </label>
              <textarea
                rows={2}
                placeholder="Nhập lý do duyệt, từ chối hoặc hướng dẫn bổ sung hồ sơ..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
              />
            </div>

            {/* Explicit Command Actions - Not a generic dropdown */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                Đóng
              </Button>

              <div className="flex items-center gap-2">
                {selectedApp.status === "SUBMITTED" && canPerformAction("review") && (
                  <Button
                    type="button"
                    variant="purple"
                    className="gap-1.5"
                    onClick={() => handleTransition("UNDER_REVIEW")}
                  >
                    <Clock className="size-3.5" />
                    <span>Tiếp Nhận Thẩm Định</span>
                  </Button>
                )}

                {selectedApp.status === "UNDER_REVIEW" && canPerformAction("review") && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-amber-600 border-amber-200 hover:bg-amber-50 gap-1.5"
                      onClick={() => handleTransition("CHANGES_REQUESTED")}
                    >
                      <AlertCircle className="size-3.5" />
                      <span>Yêu Cầu Bổ Sung</span>
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      className="gap-1.5"
                      onClick={() => handleTransition("REJECTED")}
                    >
                      <XCircle className="size-3.5" />
                      <span>Từ Chối Hồ Sơ</span>
                    </Button>

                    <Button
                      type="button"
                      variant="success"
                      className="gap-1.5"
                      onClick={() => handleTransition("APPROVED")}
                    >
                      <CheckCircle className="size-3.5" />
                      <span>Phê Duyệt & Cấp Quyền</span>
                    </Button>
                  </>
                )}

                {selectedApp.status === "CHANGES_REQUESTED" && canPerformAction("review") && (
                  <Button
                    type="button"
                    variant="purple"
                    onClick={() => handleTransition("UNDER_REVIEW")}
                  >
                    Xem Xét Lại Sau Khi Bổ Sung
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
