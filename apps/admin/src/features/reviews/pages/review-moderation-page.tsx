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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Kiểm Duyệt Đánh Giá Cộng Đồng
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Bảo vệ tính khách quan của nền tảng du lịch: xử lý báo cáo vi phạm, ngôn từ tiêu cực hoặc đánh giá mạo danh.
          </p>
        </div>

        <Badge variant="destructive">
          {reviews.filter((r) => r.status === "REPORTED").length} đánh giá bị báo cáo
        </Badge>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo nội dung, tác giả, địa điểm..."
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
            <option value="REPORTED">Bị Báo Cáo (REPORTED)</option>
            <option value="PUBLISHED">Công Khai (PUBLISHED)</option>
            <option value="HIDDEN">Đã Ẩn (HIDDEN)</option>
            <option value="REMOVED">Đã Xoá Vi Phạm (REMOVED)</option>
          </select>

          <span className="text-xs text-slate-400 font-semibold">{filtered.length} đánh giá</span>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F9FBFF] border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Tác Giả & Địa Điểm</th>
                <th className="py-3.5 px-4">Điểm Đánh Giá</th>
                <th className="py-3.5 px-4">Nội Dung Đánh Giá</th>
                <th className="py-3.5 px-4">Báo Cáo Vi Phạm</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">Thời Gian</th>
                <th className="py-3.5 px-4 text-right">Hành Động Kiểm Duyệt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((rev) => (
                <tr key={rev.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 text-sm">{rev.authorName}</div>
                    <div className="text-[11px] text-indigo-600 font-semibold">{rev.placeName}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 max-w-xs">
                    <p className="line-clamp-2 text-slate-700 italic">"{rev.content || rev.body}"</p>
                  </td>

                  <td className="py-3 px-4">
                    {rev.reportCount > 0 ? (
                      <div className="flex items-center gap-1.5 text-rose-600 font-bold text-[11px]">
                        <Flag className="size-3.5 fill-rose-500 text-rose-500" />
                        <span>
                          {rev.reportCount} lần ({rev.reportReason || (rev.reportReasons && rev.reportReasons.join(", ")) || "Nghi vấn vi phạm"})
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400">Không có</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={rev.status}>
                      {rev.status === "PUBLISHED" && "Công Khai"}
                      {rev.status === "REPORTED" && "Chờ Xử Lý"}
                      {rev.status === "HIDDEN" && "Đã Tạm Ẩn"}
                      {rev.status === "REMOVED" && "Đã Xoá Bỏ"}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {rev.createdAt}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Keep action */}
                      {rev.status === "REPORTED" && canPerformAction("moderate") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#16C098] hover:bg-emerald-50 px-2 py-1 text-[11px]"
                          onClick={() => handleOpenActionModal(rev, "Keep")}
                          title="Bỏ qua báo cáo, giữ lại đánh giá"
                        >
                          Giữ Lại
                        </Button>
                      )}

                      {/* Hide action */}
                      {rev.status !== "HIDDEN" && rev.status !== "REMOVED" && canPerformAction("moderate") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-amber-600 hover:bg-amber-50 px-2 py-1 text-[11px]"
                          onClick={() => handleOpenActionModal(rev, "Hide")}
                          title="Tạm ẩn đánh giá"
                        >
                          Tạm Ẩn
                        </Button>
                      )}

                      {/* Remove destructive action */}
                      {rev.status !== "REMOVED" && canPerformAction("moderate") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-rose-600 hover:bg-rose-50 px-2 py-1 text-[11px]"
                          onClick={() => handleOpenActionModal(rev, "Remove")}
                          title="Xoá vĩnh viễn vi phạm"
                        >
                          Xoá
                        </Button>
                      )}

                      {/* Restore action */}
                      {(rev.status === "HIDDEN" || rev.status === "REMOVED") && canPerformAction("moderate") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-indigo-600 hover:bg-indigo-50 px-2 py-1 text-[11px]"
                          onClick={() => handleOpenActionModal(rev, "Restore")}
                          title="Khôi phục đánh giá"
                        >
                          Khôi Phục
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
