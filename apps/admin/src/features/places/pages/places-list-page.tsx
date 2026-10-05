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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Quản Lý Địa Điểm & Trải Nghiệm
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kiểm soát danh mục thắng cảnh, nhà hàng, quán cafe, khách sạn và các thuộc tính phục vụ hệ thống AI gợi ý hành trình.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl font-medium">
            Tổng cộng: <strong>{places.length} địa điểm</strong>
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col lg:flex-row gap-3 items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên quán, địa danh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full lg:w-auto flex-wrap">
          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Thể Loại</option>
            <option value="ATTRACTION">Thắng Cảnh (Attraction)</option>
            <option value="RESTAURANT">Nhà Hàng (Restaurant)</option>
            <option value="CAFE">Quán Cafe (Cafe)</option>
            <option value="HOTEL">Khách Sạn / Resort</option>
            <option value="EXPERIENCE">Trải Nghiệm / Tour</option>
          </select>

          {/* Destination filter */}
          <select
            value={destFilter}
            onChange={(e) => setDestFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
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
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Trạng Thái</option>
            <option value="PUBLISHED">Đã Xuất Bản</option>
            <option value="IN_REVIEW">Chờ Duyệt</option>
            <option value="DRAFT">Bản Nháp</option>
          </select>

          <span className="text-xs text-slate-400 font-semibold">{filtered.length} kết quả</span>
        </div>
      </div>

      {/* Places Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F9FBFF] border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Địa Điểm / Cơ Sở</th>
                <th className="py-3.5 px-4">Phân Loại</th>
                <th className="py-3.5 px-4">Điểm Đến Trực Thuộc</th>
                <th className="py-3.5 px-4">Khoảng Giá</th>
                <th className="py-3.5 px-4">Xác Minh</th>
                <th className="py-3.5 px-4">AI Attributes</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((place) => (
                <tr key={place.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={place.coverImage || place.imageUrl}
                        alt={place.name}
                        className="size-11 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <span>{place.name}</span>
                          {place.isVerified && (
                            <span title="Đã thẩm định pháp lý & cơ sở thực tế">
                              <ShieldCheck className="size-3.5 text-[#0098a2]" />
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">{place.address}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                      {place.type}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800">{place.destinationName}</span>
                  </td>

                  <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                    {place.priceRange ? (
                      typeof place.priceRange === "object" ? (
                        `${formatVND(place.priceRange.min)} - ${formatVND(place.priceRange.max)}`
                      ) : (
                        place.priceRange
                      )
                    ) : (
                      <span className="text-slate-400">Chưa rõ</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleVerification(place)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition ${
                        place.isVerified
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      {place.isVerified ? "✓ Đã Duyệt" : "Chưa Duyệt"}
                    </button>
                  </td>

                  {/* AI Recommendation Tags */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 flex-wrap max-w-xs">
                      {place.attributes?.family_friendly && (
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">Gia đình</span>
                      )}
                      {place.attributes?.sea_view && (
                        <span className="text-[10px] bg-cyan-50 text-cyan-700 px-1.5 py-0.5 rounded">View biển</span>
                      )}
                      {place.attributes?.romantic && (
                        <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">Lãng mạn</span>
                      )}
                      {place.attributes?.wifi && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">Wifi</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={place.status}>
                      {place.status === "PUBLISHED" && "Hoạt Động"}
                      {place.status === "IN_REVIEW" && "Chờ Thẩm Định"}
                      {place.status === "DRAFT" && "Bản Nháp"}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-right">
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
