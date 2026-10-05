import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Building2,
  FileCheck,
  Flag,
  UserPlus,
  Bot,
  MapPin,
  Compass,
  Users,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const [destinations] = useState(() => adminStore.getDestinations());
  const [places] = useState(() => adminStore.getPlaces());
  const [applications] = useState(() => adminStore.getPartnerApplications());
  const [reviews] = useState(() => adminStore.getReviews());
  const [leads] = useState(() => adminStore.getLeads());
  const [auditLogs] = useState(() => adminStore.getAuditEvents().slice(0, 7));
  const [docs] = useState(() => adminStore.getKnowledgeDocuments());

  // Operational Queue metrics
  const pendingApps = applications.filter((a) => a.status === "SUBMITTED" || a.status === "UNDER_REVIEW");
  const urgentApps = pendingApps.filter((a) => a.riskFlags.length > 0 || a.submittedAt.includes("2026-03-28"));
  const pendingDestinations = destinations.filter((d) => d.status === "IN_REVIEW" || d.status === "DRAFT");
  const reportedReviews = reviews.filter((r) => r.status === "REPORTED");
  const unassignedLeads = leads.filter((l) => !l.assignedStaff || l.status === "NEW");
  const failedDocs = docs.filter((d) => d.indexStatus === "FAILED");

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E7F8F4] text-[#16C098] tracking-wide">
              HỆ THỐNG ĐANG HOẠT ĐỘNG
            </span>
            <span className="text-xs text-slate-400">• Cập nhật thời gian thực</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Bàn Điều Hành Trung Tâm
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Bảng điều phối vận hành dữ liệu du lịch, thẩm định đối tác, kiểm duyệt cộng đồng và tri thức AI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/audit">
            <Button variant="outline" size="sm" className="gap-2">
              <ShieldCheck className="size-4 text-[#5932EA]" />
              <span>Xem Nhật Ký Thẩm Định</span>
            </Button>
          </Link>
          <Link to="/partners/applications">
            <Button variant="primary" size="sm" className="gap-2">
              <Building2 className="size-4" />
              <span>Duyệt Đối Tác ({pendingApps.length})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* SECTION 1: OPERATIONAL QUEUE (What requires attention right now?) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">Hàng Đợi Vận Hành Cần Xử Lý Ngay</h2>
            <span className="text-xs text-slate-400">({pendingApps.length + reportedReviews.length + unassignedLeads.length + failedDocs.length} tác vụ đang chờ)</span>
          </div>
          <span className="text-xs text-slate-400">Ưu tiên theo mức độ khẩn cấp</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Partner Applications */}
          <div className="bg-white border-2 border-amber-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Building2 className="size-5" />
              </div>
              <Badge variant="warning">{pendingApps.length} hồ sơ chờ</Badge>
            </div>
            <h3 className="text-sm font-bold text-slate-800">Đăng Ký Đối Tác Mới</h3>
            <p className="text-xs text-slate-500 mt-1">
              {urgentApps.length} hồ sơ có cờ rủi ro / quá hạn 48 giờ cần thẩm định.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-amber-700">Khẩn cấp</span>
              <Link
                to="/partners/applications"
                className="text-xs font-semibold text-[#5932EA] hover:underline flex items-center gap-1"
              >
                <span>Thẩm định ngay</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Card 2: Reported Reviews */}
          <div className="bg-white border border-rose-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
                <Flag className="size-5" />
              </div>
              <Badge variant="destructive">{reportedReviews.length} báo cáo</Badge>
            </div>
            <h3 className="text-sm font-bold text-slate-800">Đánh Giá Bị Báo Cáo</h3>
            <p className="text-xs text-slate-500 mt-1">
              Phát hiện ngôn từ công kích hoặc nghi vấn quảng cáo sai lệch.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-rose-600">Kiểm duyệt</span>
              <Link
                to="/reviews"
                className="text-xs font-semibold text-[#5932EA] hover:underline flex items-center gap-1"
              >
                <span>Xử lý vi phạm</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Card 3: Unassigned Leads */}
          <div className="bg-white border border-indigo-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-[#5932EA]">
                <UserPlus className="size-5" />
              </div>
              <Badge variant="purple">{unassignedLeads.length} leads mới</Badge>
            </div>
            <h3 className="text-sm font-bold text-slate-800">Leads Khách Hàng Chưa Gán</h3>
            <p className="text-xs text-slate-500 mt-1">
              Yêu cầu tư vấn tour du lịch từ kênh Zalo, Facebook và Trợ lý AI.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#5932EA]">CRM-lite</span>
              <Link
                to="/crm/leads"
                className="text-xs font-semibold text-[#5932EA] hover:underline flex items-center gap-1"
              >
                <span>Phân bổ nhân sự</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Card 4: Failed RAG Docs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
                <Bot className="size-5" />
              </div>
              <Badge variant={failedDocs.length > 0 ? "destructive" : "success"}>
                {failedDocs.length > 0 ? `${failedDocs.length} lỗi vector` : "Hoàn tất"}
              </Badge>
            </div>
            <h3 className="text-sm font-bold text-slate-800">Đồng Bộ Tri Thức AI</h3>
            <p className="text-xs text-slate-500 mt-1">
              {failedDocs.length > 0 ? "Có tài liệu chưa vector hoá vào RAG Knowledge." : "Hệ thống AI retrieval ổn định."}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">Vector Embeddings</span>
              <Link
                to="/knowledge"
                className="text-xs font-semibold text-[#5932EA] hover:underline flex items-center gap-1"
              >
                <span>Xem kho RAG</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PLATFORM OVERVIEW (Dense Operational KPI Cards) */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4">Tổng Quan Quy Mô Dữ Liệu Nền Tảng</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Danh Thắng</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{destinations.length}</div>
            <div className="text-[11px] text-[#16C098] font-medium mt-1">100% Việt Nam</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Địa Điểm / Quán</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{places.length}</div>
            <div className="text-[11px] text-[#16C098] font-medium mt-1">+12 tuần này</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Đối Tác Hoạt Động</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">42</div>
            <div className="text-[11px] text-indigo-600 font-medium mt-1">98% xác minh</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Khách Du Lịch</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">12,840</div>
            <div className="text-[11px] text-[#16C098] font-medium mt-1">+8.4% tháng này</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Leads CRM Mới</div>
            <div className="text-2xl font-bold text-[#5932EA] mt-1">{leads.length}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Tỷ lệ chốt 34%</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Đánh Giá Hôm Nay</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">18</div>
            <div className="text-[11px] text-amber-600 font-medium mt-1">4.8 / 5.0 ⭐</div>
          </div>
        </div>
      </div>

      {/* SECTION 3: RECENT ACTIVITY TIMELINE & TRENDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline of Immutable Audit Logs */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Dòng Sự Kiện Thẩm Định Vận Hành Mới Nhất</h3>
              <p className="text-xs text-slate-400 mt-0.5">Nhật ký bất biến ghi nhận theo chuẩn an toàn thông tin ISO/Audit</p>
            </div>
            <Link to="/audit" className="text-xs font-semibold text-[#5932EA] hover:underline">
              Xem toàn bộ ({adminStore.getAuditEvents().length})
            </Link>
          </div>

          <div className="space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3.5 pb-3.5 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="mt-1 size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 text-xs font-bold">
                  {log.actor.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-800">{log.actor}</span>
                    <Badge variant="purple" className="text-[10px] py-0 px-1.5">{log.actorRole}</Badge>
                    <span className="text-xs text-slate-600 font-medium">thực hiện</span>
                    <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Đối tượng: <strong className="text-slate-700">{log.entityName}</strong> ({log.entityType})
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
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

        {/* Operational Trends & Service Level */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">Mục Tiêu SLA Vận Hành</h3>
            <p className="text-xs text-slate-400 mb-4">Cam kết dịch vụ phê duyệt đối tác & hỗ trợ du khách</p>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Tốc độ duyệt đối tác (&lt;24h)</span>
                  <span className="font-bold text-[#16C098]">92%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#16C098] rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Tỷ lệ phản hồi lead CRM (&lt;15p)</span>
                  <span className="font-bold text-[#5932EA]">88%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#5932EA] rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Xử lý đánh giá vi phạm (&lt;2h)</span>
                  <span className="font-bold text-amber-500">96%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "96%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Độ bao phủ tri thức RAG AI</span>
                  <span className="font-bold text-[#0098a2]">94.5%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0098a2] rounded-full" style={{ width: "94.5%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#5932EA] to-[#0098a2] rounded-2xl p-6 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="size-5 text-amber-300" />
              <h4 className="font-bold text-sm">Kiểm Tra Tính Nhất Quán Dữ Liệu</h4>
            </div>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Dữ liệu danh thắng và địa điểm trên cổng Admin Portal được đồng bộ với trang du khách công khai (`apps/frontend`).
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold bg-white/20 px-3 py-2 rounded-xl backdrop-blur-xs">
              <CheckCircle2 className="size-4 text-emerald-300" />
              <span>3,842 điểm đến đã xác minh bản quyền</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
