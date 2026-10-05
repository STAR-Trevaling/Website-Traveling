import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Search,
  Eye,
  Heart,
  Map,
  Users,
  Building2,
  Calendar,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d");
  const [destinationFilter, setDestinationFilter] = useState("ALL");

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Chỉ Số Vận Hành Nền Tảng (Operational Analytics)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Báo cáo lưu lượng tìm kiếm, lượt quan tâm điểm đến, tỷ lệ chuyển đổi leads và hoạt động đối tác thực tế.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="90d">Quý này (90 ngày)</option>
          </select>

          <select
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Toàn Quốc (Việt Nam)</option>
            <option value="ha-long">Vịnh Hạ Long</option>
            <option value="hoi-an">Phố Cổ Hội An</option>
            <option value="phu-quoc">Đảo Ngọc Phú Quốc</option>
            <option value="sa-pa">Thị Trấn Sa Pa</option>
            <option value="da-lat">Thành Phố Đà Lạt</option>
          </select>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Lượt Tìm Kiếm Địa Điểm</span>
            <Search className="size-4 text-[#5932EA]" />
          </div>
          <div className="text-2xl font-bold text-slate-900">142,850</div>
          <div className="text-xs text-[#16C098] font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="size-3" />
            <span>+14.2% so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Lượt Xem Thắng Cảnh</span>
            <Eye className="size-4 text-[#0098a2]" />
          </div>
          <div className="text-2xl font-bold text-slate-900">388,400</div>
          <div className="text-xs text-[#16C098] font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="size-3" />
            <span>+8.7% điểm đến biển đảo</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Lịch Trình Tạo Mới</span>
            <Map className="size-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">1,940</div>
          <div className="text-xs text-[#5932EA] font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="size-3" />
            <span>Bình quân 3.4 ngày / chuyến</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Tỷ Lệ Chốt Leads Đối Tác</span>
            <Building2 className="size-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">34.8%</div>
          <div className="text-xs text-[#16C098] font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="size-3" />
            <span>Thời gian phản hồi &lt;15 phút</span>
          </div>
        </div>
      </div>

      {/* Operational Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Searched Destinations */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">Top Điểm Đến Được Tra Cứu Nhiều Nhất</h3>
          <p className="text-xs text-slate-400 mb-4">Dựa trên từ khoá tìm kiếm trên trang du khách công khai</p>

          <div className="space-y-3">
            {[
              { name: "Phố Cổ Hội An (Quảng Nam)", views: "64,200", growth: "+18%", share: 85 },
              { name: "Vịnh Hạ Long (Quảng Ninh)", views: "52,400", growth: "+12%", share: 72 },
              { name: "Đảo Ngọc Phú Quốc (Kiên Giang)", views: "48,900", growth: "+22%", share: 68 },
              { name: "Thị Trấn Sa Pa (Lào Cai)", views: "36,800", growth: "+9%", share: 54 },
              { name: "Tràng An - Tam Cốc (Ninh Bình)", views: "29,100", growth: "+15%", share: 44 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <span className="font-mono text-slate-600">{item.views} lượt ({item.growth})</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#5932EA] to-[#0098a2] rounded-full" style={{ width: `${item.share}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Conversion Sources */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">Kênh Tiếp Nhận Leads & Chuyển Đổi</h3>
          <p className="text-xs text-slate-400 mb-4">Tỷ lệ khách hàng booking dịch vụ theo nguồn tiếp cận</p>

          <div className="space-y-3">
            {[
              { source: "Trợ Lý AI Star Travels", leads: 184, conversion: "41.2%", tag: "Cao nhất" },
              { source: "Zalo Official Account", leads: 245, conversion: "38.5%", tag: "Ổn định" },
              { source: "Website Booking Form", leads: 312, conversion: "31.0%", tag: "Quy mô lớn" },
              { source: "Facebook Fanpage", leads: 96, conversion: "24.6%", tag: "Cần cải thiện" },
              { source: "Đối Tác Giới Thiệu (B2B)", leads: 42, conversion: "52.4%", tag: "Chất lượng" },
            ].map((ch, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{ch.source}</span>
                  <span className="text-slate-400">{ch.leads} leads tiếp nhận</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-indigo-700 font-mono text-sm">{ch.conversion}</span>
                  <span className="text-[10px] text-slate-500 block">{ch.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
