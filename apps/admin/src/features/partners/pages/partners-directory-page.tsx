import React, { useState } from "react";
import {
  Building2,
  Search,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { Badge } from "@/components/ui/badge";

export function PartnersDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const applications = adminStore.getPartnerApplications();
  const approvedPartners = applications.filter((a) => a.status === "APPROVED");

  const filtered = approvedPartners.filter((p) => {
    return (
      p.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.businessType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Mạng Lưới Đối Tác Hoạt Động (Directory)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Danh bạ các đơn vị kinh doanh lữ hành, khách sạn và nhà hàng đã hoàn tất thẩm định pháp lý và đang mở bán dịch vụ.
          </p>
        </div>

        <Badge variant="success">
          {approvedPartners.length} đối tác chính thức
        </Badge>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên doanh nghiệp, ngành nghề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
          />
        </div>

        <span className="text-xs text-slate-400 font-semibold">{filtered.length} đối tác</span>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="size-10 rounded-xl bg-indigo-50 text-[#5932EA] flex items-center justify-center font-black">
                  <Building2 className="size-5" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#16C098] bg-[#E7F8F4] px-2 py-0.5 rounded-full">
                  <ShieldCheck className="size-3.5" />
                  <span>Đã thẩm định</span>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-sm">{partner.businessName}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{partner.businessType} • MST: {partner.taxId || partner.licenseNumber || "N/A"}</p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{partner.address || "Việt Nam"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-slate-400 shrink-0" />
                  <span>{partner.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{partner.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Phụ trách: <strong>{partner.reviewerName || partner.reviewer || "Ban Vận Hành"}</strong></span>
              <span className="font-semibold text-[#5932EA]">Cấp phép v2</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
