"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, Plus, Tag, Calendar, Percent, X, Check } from "lucide-react";

export interface Promotion {
  id: string;
  code: string;
  name: string;
  discount: string;
  targetService: string;
  usedCount: number;
  maxUsage: number;
  expDate: string;
  status: "Active" | "Inactive";
}

const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: "pro-1",
    code: "STARTRAVEL2026",
    name: "Ưu đãi Mở bán Tour Hè Vịnh Hạ Long",
    discount: "Giảm 15%",
    targetService: "Du thuyền 5 sao Vịnh Hạ Long",
    usedCount: 450,
    maxUsage: 500,
    expDate: "30/06/2026",
    status: "Active",
  },
  {
    id: "pro-2",
    code: "HERITAGEVN",
    name: "Khám phá Di sản Miền Trung (Hội An - Huế)",
    discount: "Tặng 500.000 ₫",
    targetService: "Tour Cố đô Huế & Phố cổ Hội An",
    usedCount: 280,
    maxUsage: 300,
    expDate: "15/07/2026",
    status: "Active",
  },
  {
    id: "pro-3",
    code: "FAMILYSUMMER",
    name: "Gói Tour Gia đình khám phá Tràng An",
    discount: "Giảm 10%",
    targetService: "Danh thắng Tràng An - Tam Cốc",
    usedCount: 125,
    maxUsage: 200,
    expDate: "31/08/2026",
    status: "Active",
  },
  {
    id: "pro-4",
    code: "VIPPARTNER",
    name: "Chiết khấu Đại lý Lữ hành Hạng Vàng",
    discount: "Hoa hồng +8%",
    targetService: "Toàn bộ danh mục Tour đối tác",
    usedCount: 42,
    maxUsage: 50,
    expDate: "31/12/2026",
    status: "Active",
  },
  {
    id: "pro-5",
    code: "SAPAFANSIPAN",
    name: "Chinh phục Nóc nhà Đông Dương",
    discount: "Tặng vé Cáp treo",
    targetService: "Tour Fansipan & Bản Cát Cát",
    usedCount: 95,
    maxUsage: 120,
    expDate: "10/05/2026",
    status: "Active",
  },
  {
    id: "pro-6",
    code: "EARLYBIRD",
    name: "Đặt tour sớm giảm ngay 300k",
    discount: "Giảm 300.000 ₫",
    targetService: "Tất cả các tour khởi hành tháng 6",
    usedCount: 180,
    maxUsage: 200,
    expDate: "20/04/2026",
    status: "Inactive",
  },
  {
    id: "pro-7",
    code: "PHUQUOCSUNSET",
    name: "Gói Nghỉ dưỡng Hoàng hôn Đảo Ngọc",
    discount: "Giảm 20%",
    targetService: "Phú Quốc Sunset Town & Hòn Thơm",
    usedCount: 210,
    maxUsage: 250,
    expDate: "15/08/2026",
    status: "Active",
  },
  {
    id: "pro-8",
    code: "MEKONGDISCOVERY",
    name: "Trải nghiệm Chợ nổi Cái Răng Miền Tây",
    discount: "Giảm 12%",
    targetService: "Tour Cần Thơ - Bến Tre 2N1Đ",
    usedCount: 60,
    maxUsage: 100,
    expDate: "01/04/2026",
    status: "Inactive",
  },
];

export function PortalPromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>(INITIAL_PROMOTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"Newest" | "Usage High-Low">("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [newPromo, setNewPromo] = useState({
    code: "",
    name: "",
    discount: "Giảm 10%",
    targetService: "Tất cả tour",
    maxUsage: 100,
    expDate: "30/08/2026",
  });

  const filteredPromotions = useMemo(() => {
    let result = [...promotions];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.code.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.targetService.toLowerCase().includes(q)
      );
    }

    if (sortBy === "Usage High-Low") {
      result.sort((a, b) => b.usedCount - a.usedCount);
    }

    return result;
  }, [promotions, searchQuery, sortBy]);

  const handleToggleStatus = (promoId: string) => {
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === promoId
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromo.code.trim() || !newPromo.name.trim()) return;

    const created: Promotion = {
      id: `pro-${Date.now()}`,
      code: newPromo.code.toUpperCase(),
      name: newPromo.name,
      discount: newPromo.discount,
      targetService: newPromo.targetService,
      usedCount: 0,
      maxUsage: Number(newPromo.maxUsage) || 100,
      expDate: newPromo.expDate,
      status: "Active",
    };

    setPromotions((prev) => [created, ...prev]);
    setIsCreateOpen(false);
    setNewPromo({
      code: "",
      name: "",
      discount: "Giảm 10%",
      targetService: "Tất cả tour",
      maxUsage: 100,
      expDate: "30/08/2026",
    });
  };

  return (
    <div className="w-full bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)] font-poppins relative">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-[22px] font-semibold text-black leading-tight">
            Promotions & Discount Codes
          </h2>
          <p className="text-[14px] font-normal text-[#16C098] mt-1">
            Active Marketing Campaigns & Vouchers
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-4">
          <div className="relative w-full sm:w-[216px] h-[38px] bg-[#F9FBFF] rounded-[10px] flex items-center px-3.5 gap-2 border border-slate-100 focus-within:border-indigo-300 transition">
            <Search className="size-4 text-[#7E7E7E] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search voucher code..."
              className="w-full bg-transparent text-[12px] text-[#292D32] placeholder-[#B5B7C0] outline-hidden font-normal"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5932EA] text-white text-xs font-semibold rounded-xl hover:bg-[#4a26d4] transition cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Tạo Mã Ưu Đãi</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-[#EEEEEE]">
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[20%]">
                Promo Code
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[26%]">
                Campaign Name
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[14%]">
                Discount Value
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[14%]">
                Redemptions
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[14%]">
                Expires
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center w-[12%]">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EEEEEE]">
            {filteredPromotions.map((p) => {
              const isActive = p.status === "Active";

              return (
                <tr
                  key={p.id}
                  onClick={() => handleToggleStatus(p.id)}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  title="Nhấp để đổi trạng thái Active / Inactive"
                >
                  <td className="py-5 pr-2">
                    <div className="flex items-center gap-2">
                      <Tag className="size-3.5 text-[#5932EA]" />
                      <span className="font-mono text-[13px] font-bold text-[#5932EA] bg-indigo-50 px-2 py-0.5 rounded-md">
                        {p.code}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 pr-2 text-[14px] font-medium text-[#292D32]">
                    <div>{p.name}</div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Áp dụng: {p.targetService}
                    </span>
                  </td>

                  <td className="py-5 text-[14px] font-semibold text-emerald-600 pr-2">
                    {p.discount}
                  </td>

                  <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-semibold">
                      {p.usedCount} / {p.maxUsage}
                    </span>
                  </td>

                  <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                    {p.expDate}
                  </td>

                  <td className="py-5 text-center">
                    <span
                      className={`inline-flex items-center justify-center min-w-[80px] px-3 py-1 rounded-[4px] text-[14px] font-medium tracking-[0.14px] transition select-none ${
                        isActive
                          ? "bg-[rgba(22,192,152,0.38)] outline-1 outline-[#00B087] -outline-offset-1 text-[#008767]"
                          : "bg-[#FFC5C5] outline-1 outline-[#DF0404] -outline-offset-1 text-[#DF0404]"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-7 pt-2">
        <p className="text-[14px] font-medium text-[#B5B7C0]">
          Showing data 1 to {Math.min(filteredPromotions.length, 8)} of {filteredPromotions.length} entries
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52]"
          >
            &lt;
          </button>
          <button
            type="button"
            className="size-7 rounded-[4px] bg-[#5932EA] outline-1 outline-[#5932EA] -outline-offset-1 flex items-center justify-center text-[12px] font-semibold text-white"
          >
            1
          </button>
          <button
            type="button"
            className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52]"
          >
            2
          </button>
          <button
            type="button"
            className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52]"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-poppins"
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Tạo Mã Ưu Đãi Mới
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Phát hành mã voucher giảm giá cho du khách đặt tour
            </p>

            <form onSubmit={handleCreate} className="space-y-4 text-xs font-medium">
              <div>
                <label className="text-slate-600 block mb-1">Mã Voucher (Code)</label>
                <input
                  type="text"
                  required
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                  placeholder="VD: VIETNAM2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA] uppercase font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Tên Chiến Dịch</label>
                <input
                  type="text"
                  required
                  value={newPromo.name}
                  onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
                  placeholder="Ưu đãi mừng mùa du lịch hè"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1">Mức giảm</label>
                  <input
                    type="text"
                    value={newPromo.discount}
                    onChange={(e) => setNewPromo({ ...newPromo, discount: e.target.value })}
                    placeholder="Giảm 15% hoặc 500k"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA]"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Số lượt tối đa</label>
                  <input
                    type="number"
                    value={newPromo.maxUsage}
                    onChange={(e) => setNewPromo({ ...newPromo, maxUsage: Number(e.target.value) })}
                    placeholder="100"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Hạn sử dụng</label>
                <input
                  type="text"
                  value={newPromo.expDate}
                  onChange={(e) => setNewPromo({ ...newPromo, expDate: e.target.value })}
                  placeholder="30/08/2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFF] outline-hidden focus:border-[#5932EA]"
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
                  Phát Hành
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
