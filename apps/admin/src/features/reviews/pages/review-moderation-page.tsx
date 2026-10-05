import React, { useState } from "react";
import {
  Star,
  Search,
  Flag,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { ModeratedReview } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/auth/auth-context";

export function ReviewModerationPage() {
  const { user, canPerformAction } = useAuth();
  const [reviews, setReviews] = useState<ModeratedReview[]>(() => adminStore.getReviews());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [selectedReview, setSelectedReview] = useState<ModeratedReview | null>(null);
  const [actionToConfirm, setActionToConfirm] = useState<"Keep" | "Hide" | "Remove" | "Restore" | null>(null);
  const [reasonInput, setReasonInput] = useState("");

  const refreshList = () => {
    setReviews(adminStore.getReviews());
    if (selectedReview) {
      setSelectedReview(adminStore.getReviews().find((r) => r.id === selectedReview.id) || null);
    }
  };

  const handleOpenActionModal = (review: ModeratedReview, action: "Keep" | "Hide" | "Remove" | "Restore") => {
    setSelectedReview(review);
    setActionToConfirm(action);
    setReasonInput("");
  };

  const handleExecuteModeration = () => {
    if (!selectedReview || !actionToConfirm) return;
    adminStore.moderateReview(selectedReview.id, actionToConfirm, user?.name, reasonInput);
    refreshList();
    setActionToConfirm(null);
    setSelectedReview(null);
  };

  const filtered = reviews.filter((r) => {
    const content = r.content || r.body || "";
    const matchesSearch =
      r.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.placeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-['Poppins',sans-serif]">
      {/* Main Card - Exact Match to Figma Template */}
      <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        {/* Card Header: Review Moderation & Subtitle with Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-semibold text-black tracking-tight leading-tight">
              Review Moderation
            </h1>
            <p className="text-[14px] text-[#16C098] font-normal mt-0.5">
              Community Trust & Safety Governance ({filtered.length} đánh giá)
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
              <option value="REPORTED">Bị Báo Cáo</option>
              <option value="PUBLISHED">Công Khai</option>
              <option value="HIDDEN">Đã Ẩn</option>
              <option value="REMOVED">Đã Xoá</option>
            </select>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Tác Giả & Địa Điểm</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Điểm Đánh Giá</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Nội Dung</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Báo Cáo Vi Phạm</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center">Trạng Thái</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Thời Gian</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-right">Kiểm Duyệt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((rev) => (
                <tr key={rev.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    <div className="font-semibold text-black text-[14px]">{rev.authorName}</div>
                    <div className="text-[12px] text-[#5932EA] font-medium">{rev.placeName}</div>
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-1 font-semibold text-amber-500 text-[13px]">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </td>

                  <td className="py-4 max-w-xs text-[13px] text-[#292D32]">
                    <p className="line-clamp-2 italic text-[#555]">"{rev.content || rev.body}"</p>
                  </td>

                  <td className="py-4">
                    {rev.reportCount > 0 ? (
                      <div className="flex items-center gap-1 text-[#DF0404] font-medium text-[12px]">
                        <Flag className="size-3.5 fill-[#DF0404] text-[#DF0404]" />
                        <span>
                          {rev.reportCount} lần ({rev.reportReason || (rev.reportReasons && rev.reportReasons.join(", ")) || "Nghi vấn vi phạm"})
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#B5B7C0] text-[12px]">Không có</span>
                    )}
                  </td>

                  <td className="py-4 text-center">
                    <Badge variant={rev.status}>
                      {rev.status === "PUBLISHED" && "Active"}
                      {rev.status === "REPORTED" && "Pending"}
                      {rev.status === "HIDDEN" && "Inactive"}
                      {rev.status === "REMOVED" && "Rejected"}
                    </Badge>
                  </td>

                  <td className="py-4 font-mono text-[13px] text-[#7E7E7E]">
                    {rev.createdAt}
                  </td>

                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Keep action */}
                      {rev.status === "REPORTED" && canPerformAction("moderate") && (
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-[6px] text-[#16C098] hover:bg-white hover:shadow-[0px_4px_14px_rgba(22,192,152,0.25)] hover:-translate-y-0.5 text-[12px] font-semibold transition-all duration-200 cursor-pointer"
                          onClick={() => handleOpenActionModal(rev, "Keep")}
                          title="Bỏ qua báo cáo, giữ lại đánh giá"
                        >
                          Giữ
                        </button>
                      )}

                      {/* Hide action */}
                      {rev.status !== "HIDDEN" && rev.status !== "REMOVED" && canPerformAction("moderate") && (
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-[6px] text-amber-600 hover:bg-white hover:shadow-[0px_4px_14px_rgba(245,158,11,0.25)] hover:-translate-y-0.5 text-[12px] font-medium transition-all duration-200 cursor-pointer"
                          onClick={() => handleOpenActionModal(rev, "Hide")}
                          title="Tạm ẩn đánh giá"
                        >
                          Ẩn
                        </button>
                      )}

                      {/* Remove destructive action */}
                      {rev.status !== "REMOVED" && canPerformAction("moderate") && (
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-[6px] text-[#DF0404] hover:bg-white hover:shadow-[0px_4px_14px_rgba(223,4,4,0.20)] hover:-translate-y-0.5 text-[12px] font-medium transition-all duration-200 cursor-pointer"
                          onClick={() => handleOpenActionModal(rev, "Remove")}
                          title="Xoá vĩnh viễn vi phạm"
                        >
                          Xoá
                        </button>
                      )}

                      {/* Restore action */}
                      {(rev.status === "HIDDEN" || rev.status === "REMOVED") && canPerformAction("moderate") && (
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-[6px] text-[#5932EA] hover:bg-white hover:shadow-[0px_4px_14px_rgba(89,50,234,0.20)] hover:-translate-y-0.5 text-[12px] font-medium transition-all duration-200 cursor-pointer"
                          onClick={() => handleOpenActionModal(rev, "Restore")}
                        >
                          Phục Hồi
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Showing data + Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4">
          <p className="text-[14px] font-medium text-[#B5B7C0]">
            Showing data 1 to {filtered.length} of {reviews.length} entries
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

      {/* Confirmation & Reason Dialog */}
      {actionToConfirm && selectedReview && (
        <Modal
          isOpen={!!actionToConfirm}
          onClose={() => setActionToConfirm(null)}
          title={`Xác Nhận Thao Tác Kiểm Duyệt: ${actionToConfirm.toUpperCase()}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <p><strong>Người đánh giá:</strong> {selectedReview.authorName}</p>
              <p><strong>Địa điểm:</strong> {selectedReview.placeName}</p>
              <p className="mt-1 italic text-slate-600">"{selectedReview.content || selectedReview.body}"</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Lý Do Kiểm Duyệt (Bắt buộc để lưu vết thẩm định)
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Đánh giá chứa từ ngữ xúc phạm danh dự doanh nghiệp..."
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setActionToConfirm(null)}>
                Huỷ Bỏ
              </Button>
              <Button
                type="button"
                variant={actionToConfirm === "Remove" ? "destructive" : "primary"}
                onClick={handleExecuteModeration}
              >
                Xác Nhận {actionToConfirm}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
