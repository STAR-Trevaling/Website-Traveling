import React, { useState } from "react";
import {
  Search,
  Edit,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { Place, PlaceType, PublicationStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { formatVND } from "@/lib/utils";
import { useAuth } from "@/auth/auth-context";

export function PlacesListPage() {
  const { user, canPerformAction } = useAuth();
  const [places, setPlaces] = useState<Place[]>(() => adminStore.getPlaces());
  const [destinations] = useState(() => adminStore.getDestinations());

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [destFilter, setDestFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Place>>({});

  const refreshList = () => {
    setPlaces(adminStore.getPlaces());
  };

  const handleOpenEdit = (place: Place) => {
    setSelectedPlace(place);
    setFormData({ ...place, attributes: { ...place.attributes } });
    setIsEditModalOpen(true);
  };

  const handleToggleVerification = (place: Place) => {
    adminStore.updatePlace(place.id, { isVerified: !place.isVerified }, user?.name);
    refreshList();
  };

  const handleStatusTransition = (place: Place, status: PublicationStatus) => {
    adminStore.updatePlace(place.id, { status }, user?.name);
    refreshList();
  };

  const handleSavePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlace) return;
    adminStore.updatePlace(selectedPlace.id, formData, user?.name);
    setIsEditModalOpen(false);
    refreshList();
  };

  const handleToggleAttribute = (key: keyof Place["attributes"]) => {
    if (!formData.attributes) return;
    setFormData({
      ...formData,
      attributes: {
        ...formData.attributes,
        [key]: !formData.attributes[key],
      },
    });
  };

  // Filtering
  const filtered = places.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.destinationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "ALL" || p.type === typeFilter;
    const matchesDest =
      destFilter === "ALL" ||
      p.destinationSlug === destFilter ||
      p.destinationId === destFilter;
    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;

    return matchesSearch && matchesType && matchesDest && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-['Poppins',sans-serif]">
      {/* Main Places Card - Exact Match to Figma Template */}
      <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        {/* Card Header: All Places & Subtitle with Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-semibold text-black tracking-tight leading-tight">
              All Places
            </h1>
            <p className="text-[14px] text-[#16C098] font-normal mt-0.5">
              Active Locations & AI Attributes ({filtered.length} locations)
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative w-56">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7E7E7E]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[12px] text-[#292D32] placeholder:text-[#B5B7C0] focus:border-[#5932EA] focus:outline-hidden transition"
              />
            </div>

            {/* Type filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-[12px] py-2 px-3 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Mọi Thể Loại</option>
              <option value="ATTRACTION">Thắng Cảnh</option>
              <option value="RESTAURANT">Nhà Hàng</option>
              <option value="CAFE">Quán Cafe</option>
              <option value="HOTEL">Khách Sạn</option>
              <option value="EXPERIENCE">Trải Nghiệm</option>
            </select>

            {/* Destination filter */}
            <select
              value={destFilter}
              onChange={(e) => setDestFilter(e.target.value)}
              className="text-[12px] py-2 px-3 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Mọi Danh Thắng</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-[12px] py-2 px-3 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Mọi Trạng Thái</option>
              <option value="PUBLISHED">Published</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
        </div>

        {/* Places Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Địa Điểm / Cơ Sở</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Phân Loại</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Danh Thắng</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Khoảng Giá</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Xác Minh</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">AI Attributes</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center">Trạng Thái</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((place) => (
                <tr key={place.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    <div className="flex items-center gap-3">
                      <img
                        src={place.coverImage || place.imageUrl}
                        alt={place.name}
                        className="size-10 rounded-xl object-cover shrink-0 border border-slate-100"
                      />
                      <div>
                        <div className="font-semibold text-black text-[14px] flex items-center gap-1.5">
                          <span>{place.name}</span>
                          {place.isVerified && (
                            <span title="Đã thẩm định">
                              <ShieldCheck className="size-3.5 text-[#16C098]" />
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-[#B5B7C0] truncate max-w-xs">{place.address}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-[13px] font-medium text-[#292D32]">
                    <span className="bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] px-2.5 py-1 rounded-[6px] text-[11px] font-semibold">
                      {place.type}
                    </span>
                  </td>

                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    {place.destinationName}
                  </td>

                  <td className="py-4 text-[13px] font-mono text-[#7E7E7E]">
                    {place.priceRange ? (
                      typeof place.priceRange === "object" ? (
                        `${formatVND(place.priceRange.min)} - ${formatVND(place.priceRange.max)}`
                      ) : (
                        place.priceRange
                      )
                    ) : (
                      <span className="text-[#B5B7C0]">Chưa rõ</span>
                    )}
                  </td>

                  <td className="py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleVerification(place)}
                      className={`px-3 py-0.5 rounded-full text-[11px] font-medium cursor-pointer transition ${
                        place.isVerified
                          ? "bg-[rgba(22,192,152,0.15)] text-[#008767] border border-[#00B087]"
                          : "bg-slate-100 text-[#B5B7C0] hover:bg-slate-200"
                      }`}
                    >
                      {place.isVerified ? "✓ Đã Duyệt" : "Chưa Duyệt"}
                    </button>
                  </td>

                  {/* AI Recommendation Tags */}
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 flex-wrap max-w-xs">
                      {place.attributes?.family_friendly && (
                        <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-[4px]">Gia đình</span>
                      )}
                      {place.attributes?.sea_view && (
                        <span className="text-[11px] bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-[4px]">View biển</span>
                      )}
                      {place.attributes?.romantic && (
                        <span className="text-[11px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-[4px]">Lãng mạn</span>
                      )}
                      {place.attributes?.wifi && (
                        <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-[4px]">Wifi</span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 text-center">
                    <Badge variant={place.status}>
                      {place.status === "PUBLISHED" && "Active"}
                      {place.status === "IN_REVIEW" && "Pending"}
                      {place.status === "DRAFT" && "Draft"}
                    </Badge>
                  </td>

                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="size-7 p-0"
                        title="Chỉnh sửa chi tiết & thuộc tính AI"
                        onClick={() => handleOpenEdit(place)}
                      >
                        <Edit className="size-3.5 text-slate-600" />
                      </Button>

                      {place.status === "IN_REVIEW" && canPerformAction("publish") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-[#16C098] hover:bg-emerald-50 px-2 py-1 font-semibold"
                          onClick={() => handleStatusTransition(place, "PUBLISHED")}
                        >
                          Duyệt
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
            Showing data 1 to {filtered.length} of {places.length} entries
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

      {/* Edit Place & AI Recommendation Attributes Modal */}
      {isEditModalOpen && selectedPlace && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Biên Tập Địa Điểm: ${selectedPlace.name}`}
          size="lg"
        >
          <form onSubmit={handleSavePlace} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên Cơ Sở / Địa Điểm
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
                  Phân Loại
                </label>
                <select
                  value={formData.type || "ATTRACTION"}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as PlaceType })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
                >
                  <option value="ATTRACTION">Thắng Cảnh (Attraction)</option>
                  <option value="RESTAURANT">Nhà Hàng (Restaurant)</option>
                  <option value="CAFE">Quán Cafe (Cafe)</option>
                  <option value="HOTEL">Khách Sạn / Resort</option>
                  <option value="EXPERIENCE">Trải Nghiệm / Tour</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Địa Chỉ Thực Tế
              </label>
              <input
                type="text"
                value={formData.address || ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
              />
            </div>

            {/* AI Recommendation Attributes Checklist */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="size-4 text-[#5932EA]" />
                <span className="text-xs font-bold text-slate-900">
                  Thuộc Tính Phục Vụ AI & Recommendation Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Các thuộc tính này trực tiếp định hình thuật toán gợi ý hành trình cá nhân hoá cho du khách trên trang công khai.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.attributes?.family_friendly}
                    onChange={() => handleToggleAttribute("family_friendly")}
                    className="rounded text-[#5932EA] focus:ring-0"
                  />
                  <span>Gia đình thân thiện</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.attributes?.quiet}
                    onChange={() => handleToggleAttribute("quiet")}
                    className="rounded text-[#5932EA] focus:ring-0"
                  />
                  <span>Yên tĩnh / Thư giãn</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.attributes?.romantic}
                    onChange={() => handleToggleAttribute("romantic")}
                    className="rounded text-[#5932EA] focus:ring-0"
                  />
                  <span>Lãng mạn (Cặp đôi)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.attributes?.sea_view}
                    onChange={() => handleToggleAttribute("sea_view")}
                    className="rounded text-[#5932EA] focus:ring-0"
                  />
                  <span>View biển (Sea View)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.attributes?.wifi}
                    onChange={() => handleToggleAttribute("wifi")}
                    className="rounded text-[#5932EA] focus:ring-0"
                  />
                  <span>Wifi tốc độ cao</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.attributes?.parking}
                    onChange={() => handleToggleAttribute("parking")}
                    className="rounded text-[#5932EA] focus:ring-0"
                  />
                  <span>Bãi đỗ xe ô tô</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.attributes?.indoor}
                    onChange={() => handleToggleAttribute("indoor")}
                    className="rounded text-[#5932EA] focus:ring-0"
                  />
                  <span>Không gian trong nhà</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.attributes?.outdoor}
                    onChange={() => handleToggleAttribute("outdoor")}
                    className="rounded text-[#5932EA] focus:ring-0"
                  />
                  <span>Không gian ngoài trời</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.attributes?.wheelchair_accessible}
                    onChange={() => handleToggleAttribute("wheelchair_accessible")}
                    className="rounded text-[#5932EA] focus:ring-0"
                  />
                  <span>Hỗ trợ xe lăn</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mô Tả Giới Thiệu
              </label>
              <textarea
                rows={3}
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
                Cập Nhật Địa Điểm
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
