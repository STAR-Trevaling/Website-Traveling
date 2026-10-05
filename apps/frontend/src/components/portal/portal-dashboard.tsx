"use client";

import { useState, useEffect } from "react";
import { Users, TrendingUp, Luggage, MapPin, Calendar, ArrowUp, ArrowRight } from "lucide-react";
import { NavItemKey } from "./portal-sidebar";

interface PortalDashboardProps {
  onNavigateTab: (tab: NavItemKey) => void;
}

export function PortalDashboard({ onNavigateTab }: PortalDashboardProps) {
  const [stats, setStats] = useState({
    totalCustomers: 256,
    activeMembers: 189,
    totalInquiries: 5,
    activeTours: 7,
    totalTours: 8,
    totalBookings: 1248,
    revenueText: "842.5M ₫",
    growthMonth: "24.5%",
    travelersOnTour: 189,
  });

  useEffect(() => {
    fetch("/api/portal/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.stats) {
          setStats(data.stats);
        }
      })
      .catch((err) => console.error("Could not fetch portal stats:", err));
  }, []);

  return (
    <div className="space-y-8 font-poppins">
      {/* 3 Overview Stat Cards */}
      <section className="w-full bg-white rounded-[30px] p-7 md:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#F0F0F0]">
          <div className="flex items-center gap-5 pb-6 md:pb-0 md:pr-6">
            <div className="size-[84px] shrink-0 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center">
              <TrendingUp className="size-8 text-[#00AC4F] stroke-[1.8]" />
            </div>
            <div>
              <span className="text-[14px] text-[#ACACAC] block mb-1">Tổng doanh thu du lịch</span>
              <span className="text-[32px] font-semibold text-[#333333] leading-none block mb-2">
                {stats.revenueText}
              </span>
              <div className="flex items-center gap-1 text-[12px]">
                <ArrowUp className="size-3.5 text-[#00AC4F] stroke-[2.5]" />
                <span className="font-bold text-[#00AC4F]">{stats.growthMonth}</span>
                <span className="text-[#292D32]">tăng trưởng tháng này</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 py-6 md:py-0 md:px-8">
            <div className="size-[84px] shrink-0 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center">
              <Luggage className="size-8 text-[#00AC4F] stroke-[1.8]" />
            </div>
            <div>
              <span className="text-[14px] text-[#ACACAC] block mb-1">Lượt đặt tour thành công</span>
              <span className="text-[32px] font-semibold text-[#333333] leading-none block mb-2">
                {stats.totalBookings.toLocaleString("vi-VN")}
              </span>
              <div className="flex items-center gap-1 text-[12px]">
                <ArrowUp className="size-3.5 text-[#00AC4F] stroke-[2.5]" />
                <span className="font-bold text-[#00AC4F]">{stats.activeTours} Tours</span>
                <span className="text-[#292D32]">đang mở nhận khách</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 pt-6 md:pt-0 md:pl-8">
            <div className="size-[84px] shrink-0 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center">
              <Users className="size-8 text-[#00AC4F] stroke-[1.8]" />
            </div>
            <div>
              <span className="text-[14px] text-[#ACACAC] block mb-1">Hồ sơ khách hàng CRM</span>
              <span className="text-[32px] font-semibold text-[#333333] leading-none block mb-2">
                {stats.totalCustomers}
              </span>
              <div className="flex items-center gap-1 text-[12px]">
                <span className="font-bold text-[#00AC4F]">{stats.activeMembers} Active</span>
                <span className="text-[#292D32]">du khách & đối tác</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div
          onClick={() => onNavigateTab("customers")}
          className="p-6 rounded-[24px] bg-white border border-slate-100 shadow-[0px_10px_40px_rgba(226,236,249,0.40)] hover:border-indigo-300 transition group cursor-pointer"
        >
          <span className="text-xs font-semibold text-[#5932EA] uppercase tracking-wider block mb-1">
            Khách hàng & Leads
          </span>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#5932EA] transition-colors mb-2">
            Quản lý Khách Hàng (CRM)
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Theo dõi danh sách khách hàng doanh nghiệp, khách lẻ và phân luồng trạng thái Active.
          </p>
          <span className="text-xs font-semibold text-[#5932EA] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Truy cập CRM</span>
            <ArrowRight className="size-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigateTab("product")}
          className="p-6 rounded-[24px] bg-white border border-slate-100 shadow-[0px_10px_40px_rgba(226,236,249,0.40)] hover:border-indigo-300 transition group cursor-pointer"
        >
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block mb-1">
            Danh mục Tour
          </span>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">
            Tours & Điểm Đến (CMS)
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Quản lý gói tour Hạ Long, Tràng An, Hội An, Phú Quốc, Sa Pa, cập nhật giá và số chỗ trống.
          </p>
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Truy cập CMS Tour</span>
            <ArrowRight className="size-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigateTab("income")}
          className="p-6 rounded-[24px] bg-white border border-slate-100 shadow-[0px_10px_40px_rgba(226,236,249,0.40)] hover:border-indigo-300 transition group cursor-pointer"
        >
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block mb-1">
            Dòng tiền & Kế toán
          </span>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
            Báo cáo Doanh thu (Income)
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Kiểm tra các giao dịch thanh toán qua VietQR, VNPay, thẻ tín dụng và đối soát đối tác.
          </p>
          <span className="text-xs font-semibold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Truy cập Sổ cái</span>
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>

      {/* Recent Tour Bookings Table */}
      <div className="w-full bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-[22px] font-semibold text-black leading-tight">
              Recent Tour Bookings
            </h2>
            <p className="text-[14px] font-normal text-[#16C098] mt-1">
              Đơn đặt chỗ mới nhất hôm nay
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("customers")}
            className="text-xs font-semibold text-[#5932EA] hover:underline cursor-pointer"
          >
            Xem tất cả &rarr;
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[18%]">
                  Mã Đặt Chỗ
                </th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[24%]">
                  Hành Khách
                </th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[26%]">
                  Tour Đăng Ký
                </th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[18%]">
                  Tổng Tiền
                </th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center w-[14%]">
                  Trạng Thái
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EEEEEE]">
              {[
                {
                  code: "BK-HL-1092",
                  traveler: "Jane Cooper (Microsoft)",
                  tour: "Du thuyền 5 sao Vịnh Hạ Long (3N2Đ)",
                  amount: "57.750.000 ₫",
                  status: "Active",
                  label: "Đã thanh toán",
                },
                {
                  code: "BK-TA-1091",
                  traveler: "Hoàng Anh Tuấn (VinFast)",
                  tour: "Tràng An - Bái Đính - Tam Cốc",
                  amount: "174.000.000 ₫",
                  status: "Active",
                  label: "Đã thanh toán",
                },
                {
                  code: "BK-HA-1090",
                  traveler: "Jerome Bell (Google)",
                  tour: "Phố cổ Hội An & Thả đèn hoa đăng",
                  amount: "16.800.000 ₫",
                  status: "Active",
                  label: "Đã thanh toán",
                },
                {
                  code: "BK-SP-1089",
                  traveler: "David Wilson (Cathay Pacific)",
                  tour: "Fansipan Sa Pa & Bản Cát Cát",
                  amount: "11.200.000 ₫",
                  status: "Active",
                  label: "Đã thanh toán",
                },
                {
                  code: "BK-PQ-1088",
                  traveler: "Floyd Miles (Yahoo)",
                  tour: "Phú Quốc Sunset & Cáp treo Hòn Thơm",
                  amount: "44.500.000 ₫",
                  status: "Inactive",
                  label: "Chờ xác nhận",
                },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 pr-2 font-mono text-[13px] font-medium text-[#5932EA]">
                    {row.code}
                  </td>
                  <td className="py-4 pr-2 text-[14px] font-medium text-[#292D32]">
                    {row.traveler}
                  </td>
                  <td className="py-4 pr-2 text-[14px] font-medium text-[#292D32]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-[#5932EA] shrink-0" />
                      <span>{row.tour}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-2 text-[14px] font-semibold text-[#292D32]">
                    {row.amount}
                  </td>
                  <td className="py-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center min-w-[80px] px-3 py-1 rounded-[4px] text-[14px] font-medium tracking-[0.14px] ${
                        row.status === "Active"
                          ? "bg-[rgba(22,192,152,0.38)] outline-1 outline-[#00B087] -outline-offset-1 text-[#008767]"
                          : "bg-[#FFC5C5] outline-1 outline-[#DF0404] -outline-offset-1 text-[#DF0404]"
                      }`}
                    >
                      {row.status === "Active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
