import React, { useState } from "react";
import {
  GitPullRequest,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  Search,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { PartnerContentSubmission } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { DiffViewer } from "@/components/ui/diff-viewer";
import { useAuth } from "@/auth/auth-context";

export function PartnerSubmissionsPage() {
  const { user, canPerformAction } = useAuth();
  const [submissions, setSubmissions] = useState<PartnerContentSubmission[]>(() =>
    adminStore.getPartnerSubmissions()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [selectedSub, setSelectedSub] = useState<PartnerContentSubmission | null>(null);
  const [isDiffModalOpen, setIsDiffModalOpen] = useState(false);

  const refreshList = () => {
    setSubmissions(adminStore.getPartnerSubmissions());
    if (selectedSub) {
      const updated = adminStore.getPartnerSubmissions().find((s) => s.id === selectedSub.id);
      setSelectedSub(updated || null);
    }
  };

  const handleOpenDiff = (sub: PartnerContentSubmission) => {
    setSelectedSub(sub);
    setIsDiffModalOpen(true);
  };

  const handleResolve = (action: "APPROVED" | "REJECTED" | "CHANGES_REQUESTED") => {
    if (!selectedSub) return;
    adminStore.resolveSubmission(selectedSub.id, action, user?.name);
    refreshList();
    setIsDiffModalOpen(false);
  };

  const filtered = submissions.filter((sub) => {
    const matchesSearch =
      sub.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.changeType && sub.changeType.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Thẩm Định Đề Xuất Thay Đổi (Side-by-Side Diff)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            So sánh dữ liệu hiện tại trên hệ thống với đề xuất mới của đối tác lữ hành trước khi ghi đè vào website công khai.
          </p>
        </div>

        <Badge variant="purple">
          {submissions.filter((s) => s.status === "PENDING" || s.status === "PENDING_REVIEW").length} đề xuất chờ so khớp
        </Badge>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo đối tác, địa điểm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Trạng Thái</option>
            <option value="PENDING">Chờ Đối Soát (PENDING)</option>
            <option value="APPROVED">Đã Áp Dụng (APPROVED)</option>
            <option value="REJECTED">Từ Chối (REJECTED)</option>
            <option value="CHANGES_REQUESTED">Yêu Cầu Sửa Lại (CHANGES_REQUESTED)</option>
          </select>

          <span className="text-xs text-slate-400 font-semibold">{filtered.length} đề xuất</span>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F9FBFF] border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Đối Tác Đề Xuất</th>
                <th className="py-3.5 px-4">Địa Điểm Đích</th>
                <th className="py-3.5 px-4">Loại Thay Đổi</th>
                <th className="py-3.5 px-4">Số Trường Khác Biệt</th>
                <th className="py-3.5 px-4">Thời Gian Nộp</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4 text-right">So Sánh Diff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((sub) => {
                const diffCount = Object.keys(sub.proposedData).filter(
                  (key) => JSON.stringify(sub.proposedData[key]) !== JSON.stringify(sub.currentData[key])
                ).length;

                return (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <Building2 className="size-3.5 text-[#5932EA]" />
                        <span>{sub.partnerName}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-800">
                      {sub.entityName}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                        {sub.changeType}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {diffCount} trường sửa đổi
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {sub.submittedAt}
                    </td>

                    <td className="py-3 px-4">
                      <Badge variant={sub.status}>
                        {(sub.status === "PENDING" || sub.status === "PENDING_REVIEW") && "Chờ So Sánh"}
                        {sub.status === "APPROVED" && "Đã Đồng Bộ"}
                        {sub.status === "REJECTED" && "Đã Từ Chối"}
                        {sub.status === "CHANGES_REQUESTED" && "Yêu Cầu Sửa"}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Button
                        size="sm"
                        variant="primary"
                        className="text-xs gap-1.5"
                        onClick={() => handleOpenDiff(sub)}
                      >
                        <GitPullRequest className="size-3.5" />
                        <span>So Sánh Diff</span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Diff Comparison Modal */}
      {isDiffModalOpen && selectedSub && (
        <Modal
          isOpen={isDiffModalOpen}
          onClose={() => setIsDiffModalOpen(false)}
          title={`Đối Soát Đề Xuất Thay Đổi: ${selectedSub.entityName}`}
          size="xl"
        >
          <div className="space-y-6">
            {/* Context Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <p><strong>Đối tác đề xuất:</strong> {selectedSub.partnerName}</p>
                <p className="mt-0.5"><strong>Loại điều chỉnh:</strong> {selectedSub.changeType}</p>
              </div>
              <div className="sm:text-right">
                <p><strong>Thời gian nộp:</strong> {selectedSub.submittedAt}</p>
                <p className="mt-0.5"><strong>Trạng thái:</strong> <Badge variant={selectedSub.status}>{selectedSub.status}</Badge></p>
              </div>
            </div>

            {/* High-Value Operational Side-by-Side Diff Viewer */}
            <DiffViewer
              currentData={selectedSub.currentData}
              proposedData={selectedSub.proposedData}
            />

            {/* Explicit Actions: Approve / Reject / Request changes */}
            {(selectedSub.status === "PENDING" || selectedSub.status === "PENDING_REVIEW") && canPerformAction("review") ? (
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDiffModalOpen(false)}>
                  Đóng
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-amber-600 border-amber-200 hover:bg-amber-50 gap-1.5"
                    onClick={() => handleResolve("CHANGES_REQUESTED")}
                  >
                    <AlertCircle className="size-3.5" />
                    <span>Yêu Cầu Sửa Lại</span>
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    className="gap-1.5"
                    onClick={() => handleResolve("REJECTED")}
                  >
                    <XCircle className="size-3.5" />
                    <span>Từ Chối Thay Đổi</span>
                  </Button>

                  <Button
                    type="button"
                    variant="success"
                    className="gap-1.5"
                    onClick={() => handleResolve("APPROVED")}
                  >
                    <CheckCircle2 className="size-3.5" />
                    <span>Duyệt & Đồng Bộ Công Khai</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDiffModalOpen(false)}>
                  Đóng
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
