import React, { useState } from "react";
import {
  MapPin,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  Archive,
  ArrowUpRight,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { Destination, PublicationStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/auth/auth-context";

export function DestinationsListPage() {
  const { user, canPerformAction } = useAuth();
  const [destinations, setDestinations] = useState<Destination[]>(() => adminStore.getDestinations());
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Selected destination for view/edit modal
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states for edit/create
  const [formData, setFormData] = useState<Partial<Destination>>({});

  const refreshList = () => {
    setDestinations(adminStore.getDestinations());
  };

  const handleStatusTransition = (dest: Destination, nextStatus: PublicationStatus) => {
    adminStore.updateDestination(dest.id, { status: nextStatus }, user?.name);
    refreshList();
  };

  const handleToggleFeatured = (dest: Destination) => {
    adminStore.updateDestination(dest.id, { isFeatured: !dest.isFeatured }, user?.name);
    refreshList();
  };

  const handleOpenEdit = (dest: Destination) => {
    setSelectedDest(dest);
    setFormData({ ...dest });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDest) return;
    adminStore.updateDestination(selectedDest.id, formData, user?.name);
    setIsEditModalOpen(false);
    refreshList();
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.province) return;

    adminStore.createDestination(
      {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
        region: formData.region || "Miền Bắc",
        province: formData.province,
        summary: formData.summary || "",
        description: formData.description || "",
        history: formData.history || "",
        culturalSignificance: formData.culturalSignificance || "",
        coverImage: formData.coverImage || "https://images.unsplash.com/photo-1528127269322-539801943592",
        gallery: [],
        status: "DRAFT",
        isFeatured: false,
        latitude: Number(formData.latitude) || 21.0285,
        longitude: Number(formData.longitude) || 105.8542,
        seoTitle: `${formData.name} - Cẩm Nang Du Lịch Star Travels`,
        seoDescription: formData.summary || "",
      },
      user?.name
    );

    setIsCreateModalOpen(false);
    setFormData({});
    refreshList();
  };

  // Filtered destinations
  const filtered = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = regionFilter === "ALL" || dest.region === regionFilter;
    const matchesStatus = statusFilter === "ALL" || dest.status === statusFilter;

    return matchesSearch && matchesRegion && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Quản Lý Danh Thắng & Điểm Đến
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Điều phối nội dung danh lam, tỉnh thành, toạ độ địa lý, ảnh bìa và trạng thái xuất bản công khai.
          </p>
        </div>

        {canPerformAction("publish") && (
          <Button
            variant="primary"
            className="gap-2"
            onClick={() => {
              setFormData({ region: "Miền Bắc", status: "DRAFT" });
              setIsCreateModalOpen(true);
            }}
          >
            <Plus className="size-4" />
            <span>Thêm Điểm Đến Mới</span>
          </Button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên điểm đến, tỉnh thành..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          {/* Region filter */}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Vùng Miền</option>
            <option value="Miền Bắc">Miền Bắc</option>
            <option value="Miền Trung">Miền Trung</option>
            <option value="Miền Nam">Miền Nam</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Trạng Thái</option>
            <option value="PUBLISHED">Đã Xuất Bản</option>
            <option value="IN_REVIEW">Đang Duyệt</option>
            <option value="DRAFT">Bản Nháp</option>
            <option value="ARCHIVED">Lưu Trữ</option>
          </select>

          <span className="text-xs font-semibold text-slate-400">
            {filtered.length} kết quả
          </span>
        </div>
      </div>

      {/* Destinations Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F9FBFF] border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Điểm Đến & Tỉnh Thành</th>
                <th className="py-3.5 px-4">Vùng Miền</th>
                <th className="py-3.5 px-4">Toạ Độ (Lat, Long)</th>
                <th className="py-3.5 px-4">Nổi Bật</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">Cập Nhật</th>
                <th className="py-3.5 px-4 text-right">Thao Tác Vận Hành</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((dest) => (
                <tr key={dest.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={dest.coverImage}
                        alt={dest.name}
                        className="size-11 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{dest.name}</div>
                        <div className="text-[11px] text-slate-400">{dest.province} • /{dest.slug}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-700">{dest.region}</span>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {(dest.latitude ?? dest.center?.lat ?? 0).toFixed(4)}, {(dest.longitude ?? dest.center?.lng ?? 0).toFixed(4)}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(dest)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition ${
                        dest.isFeatured
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      {dest.isFeatured ? "★ Nổi Bật" : "Thường"}
                    </button>
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={dest.status}>
                      {dest.status === "PUBLISHED" && "Đã Xuất Bản"}
                      {dest.status === "IN_REVIEW" && "Đang Duyệt"}
                      {dest.status === "DRAFT" && "Bản Nháp"}
                      {dest.status === "ARCHIVED" && "Đã Lưu Trữ"}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-[11px] text-slate-400">
                    {new Date(dest.updatedAt).toLocaleDateString("vi-VN")}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="size-7 p-0"
                        title="Chỉnh sửa nội dung"
                        onClick={() => handleOpenEdit(dest)}
                      >
                        <Edit className="size-3.5 text-slate-600" />
                      </Button>

                      {/* State Transitions: Submit -> Publish -> Archive */}
                      {dest.status === "DRAFT" && canPerformAction("edit") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-[#5932EA] hover:bg-indigo-50 px-2 py-1"
                          onClick={() => handleStatusTransition(dest, "IN_REVIEW")}
                        >
                          Gửi Duyệt
                        </Button>
                      )}

                      {dest.status === "IN_REVIEW" && canPerformAction("publish") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-[#16C098] hover:bg-emerald-50 px-2 py-1 font-semibold"
                          onClick={() => handleStatusTransition(dest, "PUBLISHED")}
                        >
                          Xuất Bản
                        </Button>
                      )}

                      {dest.status === "PUBLISHED" && canPerformAction("publish") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-rose-500 hover:bg-rose-50 px-2 py-1"
                          onClick={() => handleStatusTransition(dest, "ARCHIVED")}
                        >
                          Lưu Trữ
                        </Button>
                      )}

                      {dest.status === "ARCHIVED" && canPerformAction("publish") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-slate-600 hover:bg-slate-100 px-2 py-1"
                          onClick={() => handleStatusTransition(dest, "PUBLISHED")}
                        >
                          Tái Kích Hoạt
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

      {/* Edit Modal */}
      {isEditModalOpen && selectedDest && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Chỉnh Sửa Danh Thắng: ${selectedDest.name}`}
          size="lg"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên Điểm Đến
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tỉnh Thành / Đô Thị
                </label>
                <input
                  type="text"
                  value={formData.province || ""}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vùng Miền
                </label>
                <select
                  value={formData.region || "Miền Bắc"}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
                >
                  <option value="Miền Bắc">Miền Bắc</option>
                  <option value="Miền Trung">Miền Trung</option>
                  <option value="Miền Nam">Miền Nam</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vĩ độ (Latitude)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.latitude || ""}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kinh độ (Longitude)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.longitude || ""}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tóm Tắt Ngắn (Meta Summary)
              </label>
              <textarea
                rows={2}
                value={formData.summary || ""}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mô Tả Chi Tiết & Giá Trị Văn Hoá
              </label>
              <textarea
                rows={4}
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Huỷ Bỏ
              </Button>
              <Button type="submit" variant="primary">
                Lưu Thay Đổi
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Tạo Mới Điểm Đến Du Lịch"
          size="lg"
        >
          <form onSubmit={handleCreateNew} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên Điểm Đến *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cù Lao Chàm"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tỉnh Thành *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Quảng Nam"
                  value={formData.province || ""}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vùng Miền
                </label>
                <select
                  value={formData.region || "Miền Trung"}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
                >
                  <option value="Miền Bắc">Miền Bắc</option>
                  <option value="Miền Trung">Miền Trung</option>
                  <option value="Miền Nam">Miền Nam</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ảnh Bìa URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.coverImage || ""}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tóm Tắt Điểm Đến
              </label>
              <textarea
                rows={2}
                placeholder="Giới thiệu khái quát đặc trưng địa lý..."
                value={formData.summary || ""}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Huỷ Bỏ
              </Button>
              <Button type="submit" variant="primary">
                Tạo Bản Nháp
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
