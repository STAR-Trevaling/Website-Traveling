"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Layers,
  Compass,
  Cpu,
  Database,
  Network,
  GitBranch,
  ShieldCheck,
  Server,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  Code2,
} from "lucide-react";

interface DiagramTab {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  icon: typeof Layers;
  svgPath: string;
  drawioPath: string;
  category: string;
  summary: string;
  summaryEn: string;
  invariants: string[];
}

const DIAGRAM_TABS: DiagramTab[] = [
  {
    id: "use-case",
    number: "01",
    title: "Sơ Đồ Use Case Tổng Thể",
    titleEn: "Master Use Case Diagram",
    icon: Compass,
    svgPath: "/diagrams/01-use-case-diagram.svg",
    drawioPath: "/docs/diagrams/01-use-case-diagram.drawio",
    category: "Chức năng & Tác nhân",
    summary: "Xác định 5 tác nhân (Traveler, Partner, Admin, Payment Gateway, Odoo ERP) và 11 Use Case cốt lõi với ranh giới hệ thống phân định rõ ràng.",
    summaryEn: "Defines 5 actors and 11 core use cases within the STAR Travels Platform system boundary.",
    invariants: [
      "Traveler tương tác trực tiếp với Khám phá, Đặt Tour, Tiếp thị liên kết và AI Concierge",
      "UC-3 Đặt Tour luôn «include» UC-3.1 Thanh toán trực tuyến VNPay / VietQR",
      "UC-4 Tiếp thị liên kết đối tác luôn «include» UC-4.1 Đồng bộ CRM Lead sang Odoo 18",
      "Phân quyền RBAC chặt chẽ cho Quản trị viên và Đối tác lữ hành B2B"
    ]
  },
  {
    id: "class-diagram",
    number: "02",
    title: "Sơ Đồ Lớp Miền Nghiệp Vụ",
    titleEn: "Domain Class Diagram",
    icon: Database,
    svgPath: "/diagrams/02-domain-class-diagram.svg",
    drawioPath: "/docs/diagrams/02-domain-class-diagram.drawio",
    category: "Mô hình Dữ liệu (DDD)",
    summary: "10 thực thể dữ liệu chính thuộc 13 Bounded Contexts, định nghĩa cấu trúc 3 ngăn chuẩn OMG UML 2.5 và quan hệ Composition chặt chẽ.",
    summaryEn: "10 core domain entities across 13 bounded contexts with 3-compartment standard layout and composition diamonds.",
    invariants: [
      "Destination sở hữu vòng đời của Tour, Accommodation và Restaurant (Composition)",
      "Tour có giá thẩm quyền (Authority price) được tính toán hoàn toàn phía máy chủ",
      "Booking lưu trữ BookingItemTypeEnum ('tour' | 'accommodation_referral' | 'restaurant_referral')",
      "PaymentTransaction xác thực chữ ký HMAC SHA-512 đối soát độc lập với Booking"
    ]
  },
  {
    id: "seq-booking",
    number: "03",
    title: "Tuần Tự: Đặt Tour & Thanh Toán",
    titleEn: "Seq: Tour Booking & Online Payment",
    icon: Cpu,
    svgPath: "/diagrams/03-seq-tour-booking.svg",
    drawioPath: "/docs/diagrams/03-seq-tour-booking.drawio",
    category: "Luồng Giao Dịch Tài Chính",
    summary: "Quy trình đặt tour trực tuyến khép kín với cơ chế phòng vệ chống sửa giá client-side và thanh toán bảo mật VNPay / VietQR.",
    summaryEn: "End-to-end direct tour booking with server-side price protection and HMAC IPN webhook verification.",
    invariants: [
      "BFF Proxy chuyển tiếp HttpOnly Cookie thành Bearer JWT Header an toàn",
      "API truy vấn Tour.price thật từ PostgreSQL 17, bỏ qua hoàn toàn giá client gửi lên",
      "IPN Webhook Server-to-Server xác thực chữ ký HMAC trước khi chuyển trạng thái 'confirmed'",
      "Cập nhật sổ cái giao dịch PaymentTransaction atomic trong một transaction duy nhất"
    ]
  },
  {
    id: "seq-referral",
    number: "04",
    title: "Tuần Tự: Tiếp Thị Liên Kết Đối Tác",
    titleEn: "Seq: Affiliate Referral Tracking",
    icon: Network,
    svgPath: "/diagrams/04-seq-referral-tracking.svg",
    drawioPath: "/docs/diagrams/04-seq-referral-tracking.drawio",
    category: "Tiếp Thị Liên Kết",
    summary: "Cơ chế theo dõi chuyển đổi đối tác (Booking.com, Agoda, TableCheck) sử dụng navigator.sendBeacon không gây nghẽn trình duyệt.",
    summaryEn: "Non-blocking referral tracking modal with 1.5s transparent countdown and Odoo CRM Lead synchronization.",
    invariants: [
      "Hiển thị ReferralAdvisoryModal cảnh báo minh bạch người dùng đang chuyển sang đối tác chính thức",
      "navigator.sendBeacon() gửi tracking ngầm không làm chậm luồng điều hướng",
      "Lưu trữ Booking record ('accommodation_referral') mà không phát sinh giao dịch thanh toán",
      "Transactional Outbox phát sự kiện đẩy CRM Lead sang Odoo 18"
    ]
  },
  {
    id: "seq-gps",
    number: "05",
    title: "Tuần Tự: Định Vị Vị Trí GPS",
    titleEn: "Seq: GPS Geolocation & Haversine",
    icon: Compass,
    svgPath: "/diagrams/05-seq-gps-geolocation.svg",
    drawioPath: "/docs/diagrams/05-seq-gps-geolocation.drawio",
    category: "Không Gian & Bản Đồ",
    summary: "Quy trình phát hiện vị trí địa lý tuân thủ Nghị định 13/2023/NĐ-CP (PDPD) và thuật toán khoảng cách Haversine tính toán client-side.",
    summaryEn: "Explicit consent geolocation flow compliant with Decree 13/2023 and client-side Haversine distance engine.",
    invariants: [
      "Tuyệt đối không định vị ngầm; yêu cầu người dùng bấm nút và cấp quyền tường minh",
      "Tính toán công thức Haversine trực tiếp trên trình duyệt, không gửi tọa độ lên máy chủ nếu không cần thiết",
      "Tự động định dạng khoảng cách chuẩn m / km và sắp xếp địa điểm gần nhất lên đầu",
      "Gắn huy hiệu '✦ GỢI Ý STAR HÀNG ĐẦU (~850 m)' trực quan cho du khách"
    ]
  },
  {
    id: "component",
    number: "06",
    title: "Kiến Trúc Thành Phần & Gói",
    titleEn: "Component & Package Architecture",
    icon: Layers,
    svgPath: "/diagrams/06-component-architecture.svg",
    drawioPath: "/docs/diagrams/06-component-architecture.drawio",
    category: "Cấu Trúc Hệ Thống",
    summary: "Kiến trúc Modular Monolith phân định rõ Presentation (Next.js 15), Shared Contracts (@travel/contracts) và 13 Bounded Contexts (Django 5.2).",
    summaryEn: "Modular Monolith layering separating Presentation, Shared Contracts, and 13 Django Bounded Contexts.",
    invariants: [
      "Presentation Layer gồm 25 Routes App Router, SSR và React Server Components",
      "Contracts Layer chứa Type TypeScript dùng chung và đặc tả OpenAPI 3.1",
      "Backend Modular Monolith tổ chức 13 Bounded Contexts theo nguyên lý Clean Architecture",
      "Giao tiếp thông qua REST API versioned /api/v1/ và cơ chế BFF Proxy an toàn"
    ]
  },
  {
    id: "state-machine",
    number: "07",
    title: "Máy Trạng Thái Nghiệp Vụ",
    titleEn: "UML State Machine Diagram",
    icon: GitBranch,
    svgPath: "/diagrams/07-state-machine-diagram.svg",
    drawioPath: "/docs/diagrams/07-state-machine-diagram.drawio",
    category: "Vòng Đời Trạng Thái",
    summary: "Vòng đời trạng thái đơn đặt chỗ (Booking Lifecycle) và vòng đời xét duyệt hồ sơ đối tác B2B (Partner Application Lifecycle).",
    summaryEn: "Formal state transitions with Trigger [Guard] / Action syntax for bookings and partner applications.",
    invariants: [
      "Booking: Initial -> Pending Payment -> Confirmed / Paid -> Completed hoặc Failed",
      "Khóa giữ chỗ tự động giải phóng sau 15 phút nếu không nhận được thanh toán",
      "Partner Application: Submitted -> Under Review -> Approved (Atomic Org Creation) hoặc Rejected",
      "Mọi chuyển đổi trạng thái đặc quyền đều ghi nhận nhật ký kiểm toán AuditEvent bất biến"
    ]
  },
  {
    id: "deployment",
    number: "08",
    title: "Sơ Đồ Triển Khai Hạ Tầng",
    titleEn: "Infrastructure Deployment Diagram",
    icon: Server,
    svgPath: "/diagrams/08-deployment-diagram.svg",
    drawioPath: "/docs/diagrams/08-deployment-diagram.drawio",
    category: "Hạ Tầng & Triển Khai",
    summary: "Mô hình triển khai vật lý phân định Thiết bị khách («device»), Máy chủ biên Vercel/Cloudflare («execution environment») và Docker Compose Pod trên Ubuntu Linux.",
    summaryEn: "Physical and execution architecture across Client Device, Vercel Edge CDN, and Production Docker Pod.",
    invariants: [
      "Client giao tiếp qua HTTPS TLS 1.3 / Port 443 mã hóa đầu cuối",
      "Edge Node chạy Node.js 20 LTS thực thi SSR và quản lý HttpOnly Cookie BFF",
      "Docker Pod cô lập mạng nội bộ: backend (Gunicorn 8000), worker (Celery), redis (6379), db (5432)",
      "PostgreSQL 17 lưu trữ dữ liệu PostGIS SRID 4326 và vector embeddings 1536 chiều"
    ]
  }
];

export function DiagramsClient({ isEnglish = false }: { isEnglish?: boolean }) {
  const [activeTabId, setActiveTabId] = useState<string>("use-case");
  const [isStudioMode, setIsStudioMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const activeTab = DIAGRAM_TABS.find((t) => t.id === activeTabId) || DIAGRAM_TABS[0];

  return (
    <div className="space-y-8">
      {/* View Mode Toggle Banner */}
      <div className="rounded-[4px] bg-white p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {isEnglish ? "Interactive Architecture Portal" : "Cổng Xem Kiến Trúc Tương Tác"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isEnglish
              ? "Switch between crisp vector SVG diagrams and the live drag-and-drop Draw.io studio."
              : "Chuyển đổi giữa chế độ xem vector SVG sắc nét và xưởng vẽ kéo thả trực tiếp (Draw.io Native Studio)."}
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsStudioMode(false)}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[2px] text-xs font-bold transition-all ${
              !isStudioMode
                ? "bg-[#0f172a] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Layers className="size-3.5" />
            {isEnglish ? "Vector Diagram View" : "Xem Bản Vẽ Vector"}
          </button>

          <button
            type="button"
            onClick={() => setIsStudioMode(true)}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[2px] text-xs font-bold transition-all ${
              isStudioMode
                ? "bg-[#da251d] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Code2 className="size-3.5" />
            {isEnglish ? "Draw.io Studio (Drag & Drop)" : "Kéo Thả (Draw.io Studio)"}
          </button>
        </div>
      </div>

      {isStudioMode ? (
        /* ========================================================================= */
        /* MODE 1: LIVE INTERACTIVE DRAW.IO EMBEDDED STUDIO                          */
        /* ========================================================================= */
        <div className="rounded-[4px] bg-slate-900 border border-slate-700 overflow-hidden shadow-lg">
          <div className="bg-slate-800 px-4 sm:px-6 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-slate-200">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-[#da251d] text-white text-[11px] font-bold">
                STAR Travels
              </span>
              <span className="text-xs sm:text-sm font-semibold">
                {isEnglish ? "Live Draw.io Canvas (All 8 Tabs)" : "Bảng Vẽ Kéo Thả Trực Tiếp (8 Tab Đồ Họa)"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <a
                href="/docs/star-travels-uml.drawio"
                download="star-travels-uml.drawio"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
              >
                <Download className="size-3.5" />
                {isEnglish ? "Download .drawio" : "Tải file .drawio"}
              </a>
              <a
                href="https://app.diagrams.net/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold transition-colors"
              >
                <ExternalLink className="size-3.5" />
                {isEnglish ? "Open on Diagrams.net" : "Mở Diagrams.net"}
              </a>
            </div>
          </div>

          <div className="w-full h-[750px] relative bg-white">
            <iframe
              src="/docs/diagrams/interactive-editor.html"
              title="STAR Travels Interactive UML Editor"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* MODE 2: HIGH-RESOLUTION SVG TABBED VIEWER                                 */
        /* ========================================================================= */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Left Column: Tab Navigator */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2 mb-3">
              {isEnglish ? "8 UML Perspectives" : "8 Góc Nhìn UML Chuẩn Hóa"}
            </h3>

            <div className="space-y-1.5">
              {DIAGRAM_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabId(tab.id)}
                    className={`w-full text-left p-3 rounded-[3px] transition-all flex items-start gap-3 border ${
                      isActive
                        ? "bg-[#0f172a] text-white border-[#0f172a] shadow-sm"
                        : "bg-white text-slate-800 hover:bg-slate-50 border-slate-200/80"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded mt-0.5 ${
                        isActive
                          ? "bg-[#da251d] text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {tab.number}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Icon className={`size-3.5 shrink-0 ${isActive ? "text-[#da251d]" : "text-slate-400"}`} />
                        <span className="text-xs font-bold truncate">
                          {isEnglish ? tab.titleEn : tab.title}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                        {tab.category}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Suite Download Card */}
            <div className="rounded-[3px] bg-slate-50 p-4 border border-slate-200 text-xs space-y-2 mt-4">
              <span className="font-bold text-slate-800 block">
                {isEnglish ? "Full Architecture Suite" : "Bộ Hồ Sơ Kiến Trúc Đầy Đủ"}
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {isEnglish
                  ? "Download the raw editable XML with all 8 pages ready for Drag and Drop in Draw.io."
                  : "Tải file XML đa trang chứa toàn bộ 8 bản vẽ để kéo thả trên app.diagrams.net."}
              </p>
              <div className="pt-1 flex flex-col gap-2">
                <a
                  href="/docs/star-travels-uml.drawio"
                  download="star-travels-uml.drawio"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
                >
                  <Download className="size-3.5" />
                  {isEnglish ? "Download Complete .drawio" : "Tải star-travels-uml.drawio"}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual SVG Preview & Invariant Specs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header of Active Tab */}
            <div className="rounded-[3px] bg-white p-5 sm:p-6 shadow-sm border border-slate-200/80">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#da251d] text-white text-[11px] font-bold">
                    Tab {activeTab.number}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {activeTab.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <a
                    href={activeTab.svgPath}
                    download={`${activeTab.id}.svg`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                  >
                    <Download className="size-3.5" />
                    {isEnglish ? "Save SVG Vector" : "Lưu File SVG"}
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                  >
                    {isFullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
                    {isFullscreen ? (isEnglish ? "Collapse" : "Thu Gọn") : (isEnglish ? "Expand Full" : "Mở Rộng")}
                  </button>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                {isEnglish ? activeTab.titleEn : activeTab.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                {isEnglish ? activeTab.summaryEn : activeTab.summary}
              </p>
            </div>

            {/* Graphical Vector Rendering Container */}
            <div
              className={`rounded-[3px] bg-white border border-slate-200/80 overflow-hidden shadow-sm transition-all ${
                isFullscreen ? "fixed inset-4 z-50 p-4 bg-white/98 shadow-2xl flex flex-col" : "p-4 sm:p-6"
              }`}
            >
              {isFullscreen && (
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <span className="text-sm font-bold text-slate-900">
                    {activeTab.title} ({activeTab.number})
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(false)}
                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <Minimize2 className="size-4" />
                  </button>
                </div>
              )}

              <div className="w-full overflow-x-auto flex items-center justify-center bg-slate-50/50 p-2 sm:p-4 rounded border border-slate-100">
                <Image
                  src={activeTab.svgPath}
                  alt={activeTab.title}
                  width={1650}
                  height={1050}
                  className="w-full h-auto max-w-full drop-shadow-sm rounded select-none"
                  priority
                />
              </div>
            </div>

            {/* Architectural Invariants Callout */}
            <div className="rounded-[3px] bg-white p-5 sm:p-6 shadow-sm border border-slate-200/80">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
                <ShieldCheck className="size-4 text-[#da251d]" />
                <span>
                  {isEnglish ? "Key Architectural Invariants & Rules" : "Nguyên Tắc Bất Biến & Đặc Tả Kỹ Thuật"}
                </span>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                {activeTab.invariants.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded border border-slate-200/60">
                    <span className="text-[#da251d] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
