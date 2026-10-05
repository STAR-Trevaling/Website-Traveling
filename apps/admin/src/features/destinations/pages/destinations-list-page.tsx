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
    <div className="space-y-6 animate-in fade-in duration-300 font-['Poppins',sans-serif]">
      {/* Main Container Card */}
      <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-semibold text-black tracking-tight leading-tight">
              All Destinations
            </h1>
            <p className="text-[14px] text-[#16C098] font-normal mt-0.5">
              Danh Lam & Thắng Cảnh Việt Nam
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative w-56">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7E7E7E]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-[12px] rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#292D32] placeholder:text-[#B5B7C0] focus:outline-hidden focus:border-[#5932EA]"
              />
            </div>

            {/* Region Filter */}
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="text-[12px] py-2 px-3 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] focus:outline-hidden"
            >
              <option value="ALL">Mọi Vùng Miền</option>
              <option value="Miền Bắc">Miền Bắc</option>
              <option value="Miền Trung">Miền Trung</option>
              <option value="Miền Nam">Miền Nam</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-[12px] py-2 px-3 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] focus:outline-hidden"
            >
              <option value="ALL">Mọi Trạng Thái</option>
              <option value="PUBLISHED">Published</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">Archived</option>
            </select>

            {canPerformAction("publish") && (
              <Button
                variant="primary"
                size="sm"
                className="rounded-[10px] text-xs gap-1.5 bg-[#5932EA]"
                onClick={() => {
                  setFormData({ region: "Miền Bắc", status: "DRAFT" });
                  setIsCreateModalOpen(true);
                }}
              >
                <Plus className="size-3.5" />
                <span>Thêm Mới</span>
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Điểm Đến & Tỉnh Thành</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Vùng Miền</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Toạ Độ (Lat, Long)</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Nổi Bật</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center">Trạng Thái</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((dest) => (
                <tr key={dest.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    <div className="flex items-center gap-3">
                      <img
                        src={dest.coverImage || dest.imageUrl}
                        alt={dest.name}
                        className="size-10 rounded-xl object-cover shrink-0 border border-slate-100"
                      />
                      <div>
                        <div className="font-semibold text-black text-[14px]">{dest.name}</div>
                        <div className="text-[12px] text-[#B5B7C0]">{dest.province} • /{dest.slug}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    {dest.region}
                  </td>

                  <td className="py-4 font-mono text-[12px] text-[#7E7E7E]">
                    {(dest.latitude ?? dest.center?.lat ?? 0).toFixed(4)}, {(dest.longitude ?? dest.center?.lng ?? 0).toFixed(4)}
                  </td>

                  <td className="py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(dest)}
                      className={`px-3 py-0.5 rounded-full text-[11px] font-medium cursor-pointer transition-all duration-200 ${
                        dest.isFeatured
                          ? "bg-amber-100 text-amber-800 border border-amber-200 hover:bg-white hover:shadow-[0px_4px_14px_rgba(245,158,11,0.25)] hover:-translate-y-0.5"
                          : "bg-slate-100 text-[#B5B7C0] hover:bg-white hover:border-slate-300 hover:shadow-[0px_4px_14px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
                      }`}
                    >
                      {dest.isFeatured ? "★ Nổi Bật" : "Thường"}
                    </button>
                  </td>

                  <td className="py-4 text-center">
                    <Badge variant={dest.status}>
                      {dest.status === "PUBLISHED" && "Active"}
                      {dest.status === "IN_REVIEW" && "Pending"}
                      {dest.status === "DRAFT" && "Draft"}
                      {dest.status === "ARCHIVED" && "Archived"}
                    </Badge>
                  </td>

                  <td className="py-4 text-right">
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
                          className="text-[11px] text-[#5932EA] hover:bg-white hover:shadow-[0px_4px_14px_rgba(89,50,234,0.20)] hover:-translate-y-0.5 px-2.5 py-1 rounded-[6px] transition-all duration-200"
                          onClick={() => handleStatusTransition(dest, "IN_REVIEW")}
                        >
                          Gửi Duyệt
                        </Button>
                      )}

                      {dest.status === "IN_REVIEW" && canPerformAction("publish") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-[#16C098] hover:bg-white hover:shadow-[0px_4px_14px_rgba(22,192,152,0.25)] hover:-translate-y-0.5 px-2.5 py-1 rounded-[6px] font-semibold transition-all duration-200"
                          onClick={() => handleStatusTransition(dest, "PUBLISHED")}
                        >
                          Xuất Bản
                        </Button>
                      )}

                      {dest.status === "PUBLISHED" && canPerformAction("publish") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-rose-500 hover:bg-white hover:shadow-[0px_4px_14px_rgba(223,4,4,0.20)] hover:-translate-y-0.5 px-2.5 py-1 rounded-[6px] transition-all duration-200"
                          onClick={() => handleStatusTransition(dest, "ARCHIVED")}
                        >
                          Lưu Trữ
                        </Button>
                      )}

                      {dest.status === "ARCHIVED" && canPerformAction("publish") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-slate-600 hover:bg-white hover:shadow-[0px_4px_14px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 px-2.5 py-1 rounded-[6px] transition-all duration-200"
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

        {/* Table Footer: Showing data + Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4">
          <p className="text-[14px] font-medium text-[#B5B7C0]">
            Showing data 1 to {filtered.length} of {destinations.length} entries
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
