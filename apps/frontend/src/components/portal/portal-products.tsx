"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, Plus, MapPin, Calendar, Users, X, Check } from "lucide-react";

export interface TourProduct {
  id: string;
  code: string;
  name: string;
  destination: string;
  region: "north" | "central" | "south";
  duration: string;
  price: string;
  bookings: number;
  maxSlots: number;
  status: "Active" | "Inactive";
  description: string;
}

const INITIAL_TOURS: TourProduct[] = [
  {
    id: "tour-1",
    code: "TOUR-HL-01",
    name: "Du thuyền 5 sao Vịnh Hạ Long",
    destination: "Vịnh Hạ Long, Quảng Ninh",
    region: "north",
    duration: "3 Ngày 2 Đêm",
    price: "3.850.000 ₫",
    bookings: 142,
    maxSlots: 200,
    status: "Active",
    description: "Hành trình vịnh di sản UNESCO, phòng ban công riêng, chèo kayak hang Luồn & thưởng thức tiệc nướng hải sản hoàng hôn.",
  },
  {
    id: "tour-2",
    code: "TOUR-TA-02",
    name: "Quần thể Danh thắng Tràng An - Tam Cốc",
    destination: "Ninh Bình",
    region: "north",
    duration: "2 Ngày 1 Đêm",
    price: "1.950.000 ₫",
    bookings: 98,
    maxSlots: 150,
    status: "Active",
    description: "Thuyền nan khám phá hang động kỳ vĩ, chinh phục đỉnh núi Ngọa Long Hang Múa ngắm trọn thung lũng lúa vàng.",
  },
  {
    id: "tour-3",
    code: "TOUR-HA-03",
    name: "Phố cổ Hội An & Thả đèn Hoa đăng",
    destination: "Hội An, Quảng Nam",
    region: "central",
    duration: "3 Ngày 2 Đêm",
    price: "2.400.000 ₫",
    bookings: 186,
    maxSlots: 220,
    status: "Active",
    description: "Đi thuyền sông Hoài đêm rằm, trải nghiệm làm lồng đèn truyền thống, thưởng thức cao lầu & lặn ngắm san hô Cù Lao Chàm.",
  },
  {
    id: "tour-4",
    code: "TOUR-HUE-04",
    name: "Kỳ quan Di sản Cố đô Huế & Ca Huế",
    destination: "Thừa Thiên Huế",
    region: "central",
    duration: "2 Ngày 1 Đêm",
    price: "2.200.000 ₫",
    bookings: 75,
    maxSlots: 120,
    status: "Active",
    description: "Thăm Đại Nội Kinh Thành, lăng tẩm Khải Định - Tự Đức và nghe nhã nhạc cung đình Huế trên thuyền rồng sông Hương.",
  },
  {
    id: "tour-5",
    code: "TOUR-SP-05",
    name: "Săn mây Fansipan & Bản Cát Cát Sa Pa",
    destination: "Sa Pa, Lào Cai",
    region: "north",
    duration: "3 Ngày 2 Đêm",
    price: "2.890.000 ₫",
    bookings: 110,
    maxSlots: 160,
    status: "Active",
    description: "Chinh phục nóc nhà Đông Dương bằng cáp treo 3 dây, đi bộ qua ruộng bậc thang thung lũng Mường Hoa & giao lưu văn hóa H'Mông.",
  },
  {
    id: "tour-6",
    code: "TOUR-PQ-06",
    name: "Phú Quốc Sunset Town & Cáp treo Hòn Thơm",
    destination: "Phú Quốc, Kiên Giang",
    region: "south",
    duration: "4 Ngày 3 Đêm",
    price: "4.500.000 ₫",
    bookings: 215,
    maxSlots: 250,
    status: "Active",
    description: "Cáp treo vượt biển dài nhất thế giới, lặn biển ngắm rạn san hô Nam Đảo và xem show diễn Cầu Hôn Kiss Bridge trứ danh.",
  },
  {
    id: "tour-7",
    code: "TOUR-DL-07",
    name: "Đà Lạt Ngàn Hoa & Săn Mây Cầu Đất",
    destination: "Đà Lạt, Lâm Đồng",
    region: "south",
    duration: "3 Ngày 2 Đêm",
    price: "2.650.000 ₫",
    bookings: 89,
    maxSlots: 140,
    status: "Active",
    description: "Đón bình minh tại đồi chè Cầu Đất, cắm trại rừng thông hồ Tuyền Lâm và trải nghiệm hái dâu tây hữu cơ công nghệ cao.",
  },
  {
    id: "tour-8",
    code: "TOUR-MT-08",
    name: "Chợ nổi Cái Răng & Miệt vườn Sông nước",
    destination: "Cần Thơ - Bến Tre",
    region: "south",
    duration: "2 Ngày 1 Đêm",
    price: "1.850.000 ₫",
    bookings: 64,
    maxSlots: 100,
    status: "Inactive",
    description: "Khám phá nét đẹp văn hóa thương hồ Tây Đô, thưởng thức trái cây miệt vườn và chèo xuồng ba lá len lỏi rừng dừa nước.",
  },
];

export function PortalProducts() {
  const [tours, setTours] = useState<TourProduct[]>(INITIAL_TOURS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<"all" | "north" | "central" | "south">("all");
  const [sortBy, setSortBy] = useState<"Newest" | "Price Low-High" | "Bookings">("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourProduct | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // New tour modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTour, setNewTour] = useState({
    name: "",
    destination: "",
    region: "north" as "north" | "central" | "south",
    duration: "3 Ngày 2 Đêm",
    price: "2.500.000 ₫",
    description: "",
  });

  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (selectedRegion !== "all") {
      result = result.filter((t) => t.region === selectedRegion);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q)
      );
    }

    if (sortBy === "Bookings") {
      result.sort((a, b) => b.bookings - a.bookings);
    } else if (sortBy === "Price Low-High") {
      result.sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")));
    }

    return result;
  }, [tours, selectedRegion, searchQuery, sortBy]);

  const handleToggleStatus = (tourId: string) => {
    setTours((prev) =>
      prev.map((t) =>
        t.id === tourId
          ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" }
          : t
      )
    );

    if (selectedTour && selectedTour.id === tourId) {
      setSelectedTour((prev) =>
        prev
          ? { ...prev, status: prev.status === "Active" ? "Inactive" : "Active" }
          : null
      );
    }
  };

  const handleCreateTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTour.name.trim() || !newTour.destination.trim()) return;

    const created: TourProduct = {
      id: `tour-${Date.now()}`,
      code: `TOUR-VN-${Math.floor(10 + Math.random() * 90)}`,
      name: newTour.name,
      destination: newTour.destination,
      region: newTour.region,
      duration: newTour.duration,
      price: newTour.price,
      bookings: 0,
      maxSlots: 100,
      status: "Active",
      description: newTour.description || "Gói tour chất lượng cao do Star Travels Việt Nam tổ chức.",
    };

    setTours((prev) => [created, ...prev]);
    setIsCreateOpen(false);
    setNewTour({
      name: "",
      destination: "",
      region: "north",
      duration: "3 Ngày 2 Đêm",
      price: "2.500.000 ₫",
      description: "",
    });
  };

  return (
    <div className="w-full bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)] font-poppins relative">
      {/* Category Tabs: Region Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Vùng miền:
          </span>
          {[
            { key: "all", label: "Tất cả vùng miền" },
            { key: "north", label: "Miền Bắc (Hạ Long, Sa Pa, Tràng An)" },
            { key: "central", label: "Miền Trung (Hội An, Huế)" },
            { key: "south", label: "Miền Nam & Đảo (Phú Quốc, Đà Lạt, Mekong)" },
          ].map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setSelectedRegion(r.key as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                selectedRegion === r.key
                  ? "bg-[#5932EA] text-white shadow-xs"
                  : "bg-[#F9FBFF] text-slate-600 hover:bg-slate-100"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#5932EA] text-white text-xs font-semibold rounded-xl hover:bg-[#4a26d4] transition cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Tạo Tour Mới</span>
        </button>
      </div>

      {/* Header Row: Title & Subtitle + Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-[22px] font-semibold text-black leading-tight">
            All Products & Tours
          </h2>
          <p className="text-[14px] font-normal text-[#16C098] mt-1">
            Active Vietnam Scenic Destinations
          </p>
        </div>

        {/* Right: Search Box + Sort Dropdown */}
        <div className="flex items-center flex-wrap gap-4">
          <div className="relative w-full sm:w-[216px] h-[38px] bg-[#F9FBFF] rounded-[10px] flex items-center px-3.5 gap-2 border border-slate-100 focus-within:border-indigo-300 transition">
            <Search className="size-4 text-[#7E7E7E] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tour..."
              className="w-full bg-transparent text-[12px] text-[#292D32] placeholder-[#B5B7C0] outline-hidden font-normal"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="h-[38px] px-3.5 bg-[#F9FBFF] rounded-[10px] flex items-center gap-1.5 text-[12px] border border-slate-100 hover:border-slate-200 transition cursor-pointer"
            >
              <span className="text-[#7E7E7E] font-normal">Short by : </span>
              <span className="text-[#3D3C42] font-semibold">{sortBy}</span>
              <ChevronDown className="size-3.5 text-[#3D3C42] ml-1" />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-11 z-20 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                {(["Newest", "Bookings", "Price Low-High"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSortBy(opt);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs transition cursor-pointer ${
                      sortBy === opt
                        ? "bg-indigo-50 text-[#5932EA] font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-[#EEEEEE]">
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[26%]">
                Tour Package & Code
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[20%]">
                Destination
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[14%]">
                Duration
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[14%]">
                Standard Price
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[12%]">
                Bookings
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center w-[14%]">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EEEEEE]">
            {filteredTours.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-slate-400">
                  Không tìm thấy tour nào phù hợp với bộ lọc &ldquo;{searchQuery}&rdquo;.
                </td>
              </tr>
            ) : (
              filteredTours.map((tour) => {
                const isActive = tour.status === "Active";

                return (
                  <tr
                    key={tour.id}
                    onClick={() => setSelectedTour(tour)}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  >
                    <td className="py-5 pr-2">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-medium text-[#292D32] group-hover:text-[#5932EA] transition-colors">
                          {tour.name}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {tour.code}
                        </span>
                      </div>
                    </td>

                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-[#5932EA] shrink-0" />
                        <span>{tour.destination}</span>
                      </div>
                    </td>

                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                      {tour.duration}
                    </td>

                    <td className="py-5 text-[14px] font-semibold text-[#5932EA] pr-2">
                      {tour.price}
                    </td>

                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-semibold">
                        {tour.bookings} / {tour.maxSlots}
                      </span>
                    </td>

                    <td className="py-5 text-center">
                      <span
                        className={`inline-flex items-center justify-center min-w-[80px] px-3 py-1 rounded-[4px] text-[14px] font-medium tracking-[0.14px] transition select-none ${
                          isActive
                            ? "bg-[rgba(22,192,152,0.38)] outline-1 outline-[#00B087] -outline-offset-1 text-[#008767]"
                            : "bg-[#FFC5C5] outline-1 outline-[#DF0404] -outline-offset-1 text-[#DF0404]"
                        }`}
                      >
                        {tour.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-7 pt-2">
        <p className="text-[14px] font-medium text-[#B5B7C0]">
          Showing data 1 to {Math.min(filteredTours.length, 8)} of {filteredTours.length} entries
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52] hover:bg-slate-200 transition cursor-pointer"
            aria-label="Trang trước"
          >
            &lt;
          </button>
          <button
            type="button"
            className="size-7 rounded-[4px] bg-[#5932EA] outline-1 outline-[#5932EA] -outline-offset-1 flex items-center justify-center text-[12px] font-semibold text-white cursor-pointer"
          >
            1
          </button>
          <button
            type="button"
            className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52] hover:bg-slate-200 transition cursor-pointer"
          >
            2
          </button>
          <span className="text-[12px] font-medium text-black px-0.5 select-none">
            ...
          </span>
          <button
            type="button"
            className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52] hover:bg-slate-200 transition cursor-pointer"
            aria-label="Trang tiếp theo"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Tour Detail Modal */}
      {selectedTour && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-poppins"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition cursor-pointer"
              aria-label="Đóng"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#5932EA] uppercase tracking-wider mb-1">
              <span>{selectedTour.code}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{selectedTour.destination}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {selectedTour.name}
            </h3>

            <div className="p-4 rounded-2xl bg-[#F9FBFF] border border-slate-100 grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <span className="text-slate-400 block mb-0.5">Thời lượng</span>
                <span className="font-semibold text-slate-800">{selectedTour.duration}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Giá tour trọn gói</span>
                <span className="font-bold text-[#5932EA] text-sm">{selectedTour.price}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Số chỗ đã đặt</span>
                <span className="font-semibold text-slate-800">{selectedTour.bookings} khách</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Trạng thái</span>
                <span className="font-semibold text-emerald-600">{selectedTour.status}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-6">
              {selectedTour.description}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleToggleStatus(selectedTour.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
                  selectedTour.status === "Active"
                    ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                {selectedTour.status === "Active" ? "Tạm ngưng nhận khách" : "Kích hoạt mở bán"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTour(null)}
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-[#5932EA] text-white hover:bg-[#4a26d4] transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Tour Modal */}
      {isCreateOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-poppins"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition cursor-pointer"
              aria-label="Đóng"
            >
              <X className="size-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Thêm Tour Danh Lam Thắng Cảnh Mới
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Cập nhật tuyến tour mới vào hệ thống CMS Star Travels
            </p>

            <form onSubmit={handleCreateTour} className="space-y-4 text-xs font-medium">
              <div>
                <label className="text-slate-600 block mb-1">Tên Tour</label>
                <input
                  type="text"
                  required
                  value={newTour.name}
                  onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
                  placeholder="Ví dụ: Du thuyền 5 sao Vịnh Lan Hạ & Cát Bà"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1">Điểm đến</label>
                  <input
                    type="text"
                    required
                    value={newTour.destination}
                    onChange={(e) => setNewTour({ ...newTour, destination: e.target.value })}
                    placeholder="Hải Phòng / Cát Bà"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA] text-sm"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Vùng miền</label>
                  <select
                    value={newTour.region}
                    onChange={(e) => setNewTour({ ...newTour, region: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA] text-sm"
                  >
                    <option value="north">Miền Bắc</option>
                    <option value="central">Miền Trung</option>
                    <option value="south">Miền Nam & Đảo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1">Thời lượng</label>
                  <input
                    type="text"
                    value={newTour.duration}
                    onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
                    placeholder="3 Ngày 2 Đêm"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA] text-sm"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Giá tour (VNĐ)</label>
                  <input
                    type="text"
                    value={newTour.price}
                    onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
                    placeholder="3.200.000 ₫"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Mô tả lịch trình tóm tắt</label>
                <textarea
                  rows={3}
                  value={newTour.description}
                  onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
                  placeholder="Điểm nổi bật của tour, dịch vụ bao gồm..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA] text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#5932EA] text-white font-semibold hover:bg-[#4a26d4] transition"
                >
                  Tạo Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
