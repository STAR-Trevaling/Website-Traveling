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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Thẩm Định Hồ Sơ Đăng Ký Đối Tác
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quy trình phê duyệt nghiêm ngặt đối tác lữ hành, khách sạn, nhà hàng trước khi cấp quyền đưa cơ sở kinh doanh lên nền tảng.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="warning">
            {applications.filter((a) => a.status === "SUBMITTED" || a.status === "UNDER_REVIEW").length} hồ sơ chờ xử lý
          </Badge>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo doanh nghiệp, người nộp đơn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Trạng Thái</option>
            <option value="SUBMITTED">Mới Nộp (SUBMITTED)</option>
            <option value="UNDER_REVIEW">Đang Thẩm Định (UNDER_REVIEW)</option>
            <option value="CHANGES_REQUESTED">Yêu Cầu Bổ Sung (CHANGES_REQUESTED)</option>
            <option value="APPROVED">Đã Duyệt (APPROVED)</option>
            <option value="REJECTED">Từ Chối (REJECTED)</option>
          </select>
          <span className="text-xs text-slate-400 font-semibold">{filtered.length} hồ sơ</span>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F9FBFF] border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Doanh Nghiệp / Cơ Sở</th>
                <th className="py-3.5 px-4">Loại Hình</th>
                <th className="py-3.5 px-4">Người Đại Diện</th>
                <th className="py-3.5 px-4">Thời Điểm Nộp</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">Người Phụ Trách</th>
                <th className="py-3.5 px-4">Cờ Cảnh Báo</th>
                <th className="py-3.5 px-4 text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 text-sm">{app.businessName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">MST: {app.taxId}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {app.businessType}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">{app.applicantName}</div>
                    <div className="text-[11px] text-slate-400">{app.email}</div>
                  </td>

                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {app.submittedAt}
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={app.status}>
                      {app.status === "SUBMITTED" && "Chờ Tiếp Nhận"}
                      {app.status === "UNDER_REVIEW" && "Đang Thẩm Định"}
                      {app.status === "CHANGES_REQUESTED" && "Cần Bổ Sung"}
                      {app.status === "APPROVED" && "Đã Chấp Thuận"}
                      {app.status === "REJECTED" && "Từ Chối"}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {app.reviewerName || <span className="text-slate-400 italic">Chưa gán</span>}
                  </td>

                  <td className="py-3 px-4">
                    {app.riskFlags.length > 0 ? (
                      <div className="flex items-center gap-1 text-rose-600 font-semibold text-[11px]">
                        <ShieldAlert className="size-3.5" />
                        <span>{app.riskFlags.length} Cảnh báo</span>
                      </div>
                    ) : (
                      <span className="text-[#16C098] font-medium text-[11px]">An toàn</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs gap-1.5"
                      onClick={() => handleOpenDetail(app)}
                    >
                      <Eye className="size-3.5" />
                      <span>Xem Hồ Sơ</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
