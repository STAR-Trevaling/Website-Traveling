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
    <div className="space-y-6 animate-in fade-in duration-300 font-['Poppins',sans-serif]">
      {/* Main Card - Exact Match to Figma Template */}
      <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        {/* Card Header: Content Submissions & Subtitle with Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-semibold text-black tracking-tight leading-tight">
              Content Submissions
            </h1>
            <p className="text-[14px] text-[#16C098] font-normal mt-0.5">
              Side-by-Side Diff Resolution ({filtered.length} submissions)
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
              <option value="PENDING">Chờ Đối Soát</option>
              <option value="APPROVED">Đã Duyệt</option>
              <option value="REJECTED">Từ Chối</option>
              <option value="CHANGES_REQUESTED">Yêu Cầu Sửa</option>
            </select>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Đối Tác Đề Xuất</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Địa Điểm Đích</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Loại Thay Đổi</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Trường Thay Đổi</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Thời Gian Nộp</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center">Trạng Thái</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-right">So Sánh Diff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((sub) => {
                const diffCount = Object.keys(sub.proposedData).filter(
                  (key) => JSON.stringify(sub.proposedData[key]) !== JSON.stringify(sub.currentData[key])
                ).length;

                return (
                  <tr key={sub.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 text-[14px] font-medium text-[#292D32]">
                      <div className="font-semibold text-black text-[14px] flex items-center gap-1.5">
                        <Building2 className="size-3.5 text-[#5932EA]" />
                        <span>{sub.partnerName}</span>
                      </div>
                    </td>

                    <td className="py-4 text-[14px] font-medium text-[#292D32]">
                      {sub.entityName}
                    </td>

                    <td className="py-4 text-[13px] font-medium text-[#292D32]">
                      <span className="bg-[#F9FBFF] border border-slate-100 text-[#5932EA] px-2.5 py-1 rounded-[6px] text-[11px] font-semibold">
                        {sub.changeType}
                      </span>
                    </td>

                    <td className="py-4">
                      <span className="font-mono text-[12px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-[4px] border border-amber-200">
                        {diffCount} trường sửa đổi
                      </span>
                    </td>

                    <td className="py-4 font-mono text-[13px] text-[#7E7E7E]">
                      {sub.submittedAt}
                    </td>

                    <td className="py-4 text-center">
                      <Badge variant={sub.status}>
                        {(sub.status === "PENDING" || sub.status === "PENDING_REVIEW") && "Pending"}
                        {sub.status === "APPROVED" && "Approved"}
                        {sub.status === "REJECTED" && "Rejected"}
                        {sub.status === "CHANGES_REQUESTED" && "Needs Info"}
                      </Badge>
                    </td>

                    <td className="py-4 text-right">
                      <Button
                        size="sm"
                        className="text-xs gap-1.5 bg-[#5932EA] text-white rounded-[8px]"
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

        {/* Table Footer: Showing data + Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4">
          <p className="text-[14px] font-medium text-[#B5B7C0]">
            Showing data 1 to {filtered.length} of {submissions.length} entries
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
