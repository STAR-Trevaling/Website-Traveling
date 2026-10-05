import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  MapPin,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Flag,
  UserPlus,
  Bot,
  Search,
  ChevronDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { adminStore } from "@/api/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Monthly activity data for BarChart (12 months)
const MONTHLY_DATA = [
  { month: "Jan", activity: 420, active: false },
  { month: "Feb", activity: 380, active: false },
  { month: "Mar", activity: 560, active: false },
  { month: "Apr", activity: 490, active: false },
  { month: "May", activity: 610, active: false },
  { month: "Jun", activity: 390, active: false },
  { month: "Jul", activity: 520, active: false },
  { month: "Aug", activity: 780, active: true }, // Highlighted current peak
  { month: "Sep", activity: 640, active: false },
  { month: "Oct", activity: 580, active: false },
  { month: "Nov", activity: 490, active: false },
  { month: "Dec", activity: 630, active: false },
];

// Donut data for Regional & Destination distribution
const REGION_DATA = [
  { name: "Miền Bắc (Hạ Long, Sa Pa, Hà Giang)", value: 45, color: "#5932EA" },
  { name: "Miền Trung (Hội An, Đà Lạt, Huế)", value: 35, color: "#16C098" },
  { name: "Miền Nam (Phú Quốc, TP.HCM, Mekong)", value: 20, color: "#29BAF9" },
];

export function DashboardPage() {
  const [destinations] = useState(() => adminStore.getDestinations());
  const [places] = useState(() => adminStore.getPlaces());
  const [applications] = useState(() => adminStore.getPartnerApplications());
  const [reviews] = useState(() => adminStore.getReviews());
  const [leads] = useState(() => adminStore.getLeads());
  const [auditLogs] = useState(() => adminStore.getAuditEvents().slice(0, 6));
  const [timeframe, setTimeframe] = useState("Quý này");

  // Operational Queue metrics
  const pendingApps = applications.filter(
    (a) => a.status === "SUBMITTED" || a.status === "UNDER_REVIEW"
  );
  const reportedReviews = reviews.filter((r) => r.status === "REPORTED");
  const unassignedLeads = leads.filter((l) => !l.assignedStaff || l.status === "NEW");

  return (
    <div className="space-y-10 animate-in fade-in duration-300 font-['Poppins',sans-serif]">
      {/* SECTION 1: TOP 3-4 KPI CARDS (Matching User's Figma Template Style) */}
      <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* Card 1: Total Customers */}
          <div className="flex items-center gap-5 py-4 lg:py-0 lg:px-6 first:pl-0">
            <div className="size-20 rounded-full bg-[#D3FFE7] flex items-center justify-center shrink-0">
              <Users className="size-9 text-[#00AC4F]" />
            </div>
            <div>
              <span className="text-[14px] text-[#ACACAC] font-normal block">Tổng Du Khách</span>
              <div className="text-[32px] font-bold text-[#333333] tracking-tight leading-tight mt-0.5">
                5,423
              </div>
              <div className="text-[12px] font-normal text-[#00AC4F] flex items-center gap-1 mt-1">
                <TrendingUp className="size-3.5" />
                <span className="font-bold">16%</span>
                <span className="text-[#292D32]">tháng này</span>
              </div>
            </div>
          </div>

          {/* Card 2: Active Partners */}
          <div className="flex items-center gap-5 py-4 lg:py-0 lg:px-6">
            <div className="size-20 rounded-full bg-[#E7F6FF] flex items-center justify-center shrink-0">
              <Building2 className="size-9 text-[#29BAF9]" />
            </div>
            <div>
              <span className="text-[14px] text-[#ACACAC] font-normal block">Đối Tác Hoạt Động</span>
              <div className="text-[32px] font-bold text-[#333333] tracking-tight leading-tight mt-0.5">
                1,893
              </div>
              <div className="text-[12px] font-normal text-[#D0004B] flex items-center gap-1 mt-1">
                <TrendingDown className="size-3.5" />
                <span className="font-bold">1%</span>
                <span className="text-[#292D32]">tháng này</span>
              </div>
            </div>
          </div>

          {/* Card 3: Active Places */}
          <div className="flex items-center gap-5 py-4 lg:py-0 lg:px-6">
            <div className="size-20 rounded-full bg-[#ECE7FF] flex items-center justify-center shrink-0">
              <MapPin className="size-9 text-[#5932EA]" />
            </div>
            <div>
              <span className="text-[14px] text-[#ACACAC] font-normal block">Điểm Đến & Quán</span>
              <div className="text-[32px] font-bold text-[#333333] tracking-tight leading-tight mt-0.5">
                {places.length + 185}
              </div>
              <div className="text-[12px] font-normal text-[#00AC4F] flex items-center gap-1 mt-1">
                <TrendingUp className="size-3.5" />
                <span className="font-bold">8%</span>
                <span className="text-[#292D32]">tháng này</span>
              </div>
            </div>
          </div>

          {/* Card 4: New Leads */}
          <div className="flex items-center gap-5 py-4 lg:py-0 lg:px-6 last:pr-0">
            <div className="size-20 rounded-full bg-[#FFF0E6] flex items-center justify-center shrink-0">
              <UserPlus className="size-9 text-[#FF9053]" />
            </div>
            <div>
              <span className="text-[14px] text-[#ACACAC] font-normal block">Leads Tư Vấn Mới</span>
              <div className="text-[32px] font-bold text-[#333333] tracking-tight leading-tight mt-0.5">
                {leads.length + 120}
              </div>
              <div className="text-[12px] font-normal text-[#00AC4F] flex items-center gap-1 mt-1">
                <TrendingUp className="size-3.5" />
                <span className="font-bold">24%</span>
                <span className="text-[#292D32]">tuần này</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE CHARTS (Requested by User) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart 1: Monthly Overview BarChart (Takes 2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="text-[22px] font-semibold text-black tracking-tight">
                  Overview
                </h3>
                <span className="text-[14px] text-[#ACACAC] font-normal">
                  Lưu Lượng Truy Cập & Đặt Chỗ Hàng Tháng
                </span>
              </div>

              {/* Timeframe Dropdown */}
              <div className="relative">
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="appearance-none bg-[#F9FBFF] border border-slate-100 rounded-[10px] px-3.5 py-2 pr-8 text-[12px] font-medium text-[#7E7E7E] focus:outline-hidden cursor-pointer"
                >
                  <option value="Hàng tháng">Hàng tháng</option>
                  <option value="Quý này">Quý này</option>
                  <option value="Năm 2026">Năm 2026</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#7E7E7E] pointer-events-none" />
              </div>
            </div>

            {/* Recharts Bar Chart Container */}
            <div className="h-72 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_DATA} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#ACACAC", fontSize: 13, fontFamily: "Poppins" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#ACACAC", fontSize: 12, fontFamily: "Poppins" }}
                  />
                  <Tooltip
                    cursor={{ fill: "#F8FAFC" }}
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      boxShadow: "0px 10px 40px rgba(226,236,249,0.9)",
                      border: "none",
                      fontSize: "12px",
                      fontFamily: "Poppins",
                    }}
                    formatter={(val: any) => [`${val} lượt tương tác`, "Chỉ số"]}
                  />
                  <Bar
                    dataKey="activity"
                    radius={[8, 8, 8, 8]}
                    barSize={28}
                  >
                    {MONTHLY_DATA.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.active ? "#5932EA" : "#F2EFFF"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#ACACAC]">
            <span>Đỉnh lưu lượng: <strong>Tháng 8 (Mùa cao điểm hè)</strong></span>
            <span className="text-[#5932EA] font-semibold">Tăng trưởng +32.4% YoY</span>
          </div>
        </div>

        {/* Chart 2: Customers / Regional Breakdown Donut Chart (1 Column) */}
        <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)] flex flex-col justify-between">
          <div>
            <h3 className="text-[22px] font-semibold text-black tracking-tight">
              Customers
            </h3>
            <span className="text-[14px] text-[#ACACAC] font-normal block mb-4">
              Cơ Cấu Du Khách Theo Vùng Miền
            </span>

            {/* Donut Chart with Centered Text */}
            <div className="relative h-60 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      boxShadow: "0px 10px 40px rgba(226,236,249,0.9)",
                      border: "none",
                      fontSize: "12px",
                      fontFamily: "Poppins",
                    }}
                  />
                  <Pie
                    data={REGION_DATA}
                    innerRadius={65}
                    outerRadius={92}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {REGION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center percentage label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[26px] font-bold text-black tracking-tight">65%</span>
                <span className="text-[11px] text-[#ACACAC] font-medium text-center px-4 leading-tight">
                  Tỷ lệ quay lại
                </span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2 mt-4 text-xs font-medium">
              {REGION_DATA.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[#292D32] truncate max-w-[170px]">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-[#16C098] font-medium">
              ✓ Đồng bộ dữ liệu du lịch 100% Việt Nam
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 3: OPERATIONAL QUEUE (What requires attention right now?) */}
      <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2">
          <div>
            <h3 className="text-[22px] font-semibold text-black tracking-tight">
              Hàng Đợi Vận Hành Cần Xử Lý Ngay
            </h3>
            <span className="text-[14px] text-[#16C098] font-normal">
              {pendingApps.length + reportedReviews.length + unassignedLeads.length} tác vụ đang chờ xử lý
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/audit">
              <Button variant="outline" size="sm" className="gap-2 rounded-[10px] text-xs">
                <ShieldCheck className="size-4 text-[#5932EA]" />
                <span>Xem Nhật Ký Audit</span>
              </Button>
            </Link>
            <Link to="/partners/applications">
              <Button variant="primary" size="sm" className="gap-2 rounded-[10px] text-xs bg-[#5932EA]">
                <Building2 className="size-4" />
                <span>Duyệt Đối Tác ({pendingApps.length})</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Partner Apps */}
          <div className="border border-slate-100 rounded-[20px] p-5 bg-[#FAFBFF] hover:border-[#5932EA]/40 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="size-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Building2 className="size-5" />
              </span>
              <Badge variant="warning">{pendingApps.length} hồ sơ</Badge>
            </div>
            <h4 className="text-[16px] font-semibold text-black">Hồ Sơ Đăng Ký Đối Tác</h4>
            <p className="text-[12px] text-[#7E7E7E] mt-1">
              Doanh nghiệp du lịch nộp hồ sơ xin cấp phép niêm yết cần thẩm định MST & giấy phép.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-600">Ưu tiên cao</span>
              <Link
                to="/partners/applications"
                className="text-[12px] font-semibold text-[#5932EA] hover:underline flex items-center gap-1"
              >
                <span>Xử lý ngay</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Reported Reviews */}
          <div className="border border-slate-100 rounded-[20px] p-5 bg-[#FAFBFF] hover:border-rose-300 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="size-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <Flag className="size-5" />
              </span>
              <Badge variant="destructive">{reportedReviews.length} báo cáo</Badge>
            </div>
            <h4 className="text-[16px] font-semibold text-black">Đánh Giá Bị Báo Cáo</h4>
            <p className="text-[12px] text-[#7E7E7E] mt-1">
              Phát hiện ngôn từ xúc phạm hoặc đánh giá mạo danh từ phía cộng đồng du khách.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-rose-600">Kiểm duyệt</span>
              <Link
                to="/reviews"
                className="text-[12px] font-semibold text-[#5932EA] hover:underline flex items-center gap-1"
              >
                <span>Xử lý vi phạm</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Unassigned Leads */}
          <div className="border border-slate-100 rounded-[20px] p-5 bg-[#FAFBFF] hover:border-[#5932EA]/40 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="size-10 rounded-xl bg-indigo-50 text-[#5932EA] flex items-center justify-center font-bold">
                <UserPlus className="size-5" />
              </span>
              <Badge variant="purple">{unassignedLeads.length} leads mới</Badge>
            </div>
            <h4 className="text-[16px] font-semibold text-black">Leads CRM Chưa Phân Bổ</h4>
            <p className="text-[12px] text-[#7E7E7E] mt-1">
              Yêu cầu đặt tour, booking phòng từ website, Zalo và Trợ lý AI chưa có nhân sự xử lý.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#5932EA]">CRM-lite</span>
              <Link
                to="/crm/leads"
                className="text-[12px] font-semibold text-[#5932EA] hover:underline flex items-center gap-1"
              >
                <span>Phân bổ nhân sự</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: RECENT AUDIT LOG TIMELINE */}
      <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-[22px] font-semibold text-black tracking-tight">
              Dòng Sự Kiện Thẩm Định Vận Hành Mới Nhất
            </h3>
            <span className="text-[14px] text-[#16C098] font-normal">
              Nhật ký bất biến ghi nhận theo chuẩn an toàn thông tin
            </span>
          </div>

          <Link to="/audit" className="text-[13px] font-semibold text-[#5932EA] hover:underline">
            Xem toàn bộ ({adminStore.getAuditEvents().length})
          </Link>
        </div>

        <div className="space-y-4">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-4 pb-3.5 border-b border-slate-100 last:border-0 last:pb-0"
            >
              <div className="size-9 rounded-full bg-[#ECE7FF] flex items-center justify-center text-[#5932EA] shrink-0 text-xs font-bold font-['Poppins',sans-serif]">
                {log.actor.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[14px] font-medium text-black">{log.actor}</span>
                  <Badge variant="purple" className="text-[11px] py-0 px-2">{log.actorRole}</Badge>
                  <span className="text-[13px] text-[#7E7E7E]">thực hiện</span>
                  <span className="text-[12px] font-mono font-semibold text-[#5932EA] bg-[#ECE7FF] px-2 py-0.5 rounded-[4px]">
                    {log.action}
                  </span>
                </div>
                <p className="text-[13px] text-[#292D32] mt-1">
                  Đối tượng: <strong className="text-black">{log.entityName}</strong> ({log.entityType})
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#ACACAC]">
                  <Clock className="size-3" />
                  <span>{log.timestamp}</span>
                  <span>•</span>
                  <span>{log.ipAddress}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
