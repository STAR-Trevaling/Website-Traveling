import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  Clock,
  User,
  Activity,
  FileCode,
  Lock,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { AuditLogEvent } from "@/types";
import { Badge } from "@/components/ui/badge";

export function AuditLogPage() {
  const [events] = useState<AuditLogEvent[]>(() => adminStore.getAuditEvents());
  const [searchTerm, setSearchTerm] = useState("");
  const [entityFilter, setEntityFilter] = useState<string>("ALL");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  const filtered = events.filter((ev) => {
    const matchesSearch =
      ev.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.entityName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEntity = entityFilter === "ALL" || ev.entityType === entityFilter;
    const matchesRole = roleFilter === "ALL" || ev.actorRole === roleFilter;

    return matchesSearch && matchesEntity && matchesRole;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-['Poppins',sans-serif]">
      {/* Main Card - Exact Match to Figma Template */}
      <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        {/* Card Header: Audit Trail & Subtitle with Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#008767] bg-[rgba(22,192,152,0.15)] px-2.5 py-0.5 rounded-full">
                <Lock className="size-3" />
                <span>IMMUTABLE AUDIT TRAIL</span>
              </span>
            </div>
            <h1 className="text-[22px] font-semibold text-black tracking-tight leading-tight">
              Audit Logs & Security Trail
            </h1>
            <p className="text-[14px] text-[#16C098] font-normal mt-0.5">
              Traceability & Compliance Records ({filtered.length} sự kiện)
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7E7E7E]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[12px] text-[#292D32] placeholder:text-[#B5B7C0] focus:border-[#5932EA] focus:outline-hidden transition"
              />
            </div>

            {/* Entity Filter */}
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="text-[12px] py-2 px-3 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Mọi Thực Thể</option>
              <option value="destination">Danh Thắng</option>
              <option value="place">Địa Điểm</option>
              <option value="partner">Đối Tác</option>
              <option value="article">Bài Viết</option>
              <option value="review">Đánh Giá</option>
              <option value="lead">Khách Hàng / Lead</option>
              <option value="knowledge">Cơ Sở Tri Thức</option>
            </select>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-[12px] py-2 px-3 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Mọi Vai Trò</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CONTENT_EDITOR">CONTENT_EDITOR</option>
              <option value="PARTNER_REVIEWER">PARTNER_REVIEWER</option>
              <option value="MODERATOR">MODERATOR</option>
              <option value="OPERATIONS_MANAGER">OPERATIONS_MANAGER</option>
            </select>
          </div>
        </div>

        {/* Audit Events Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Nhân Sự & Vai Trò</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Hành Động (Action)</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Thực Thể Tác Động</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Thời Điểm</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">IP / Session</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-right">Chi Tiết Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-full bg-[#ECE7FF] flex items-center justify-center font-bold text-[#5932EA] text-[12px]">
                        {ev.actor.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-black text-[14px]">{ev.actor}</div>
                        <span className="text-[11px] text-[#7E7E7E]">{ev.actorRole}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-[13px]">
                    <span className="font-mono text-[12px] font-medium text-[#5932EA] bg-[#F9FBFF] border border-slate-100 px-2 py-0.5 rounded-[4px]">
                      {ev.action}
                    </span>
                  </td>

                  <td className="py-4 text-[14px] text-[#292D32]">
                    <div className="font-semibold text-black">{ev.entityName}</div>
                    <div className="text-[12px] text-[#B5B7C0] font-mono">
                      type: {ev.entityType} • id: {ev.entityId}
                    </div>
                  </td>

                  <td className="py-4 font-mono text-[13px] text-[#7E7E7E]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3 text-[#B5B7C0]" />
                      <span>{ev.timestamp}</span>
                    </div>
                  </td>

                  <td className="py-4 font-mono text-[12px] text-[#7E7E7E]">
                    {ev.ipAddress}
                  </td>

                  <td className="py-4 text-right font-mono text-[12px] text-[#7E7E7E]">
                    {Object.keys(ev.metadata).length > 0 ? (
                      <span className="bg-[#F9FBFF] border border-slate-100 px-2 py-0.5 rounded-[4px] text-[#7E7E7E] truncate max-w-xs inline-block">
                        {JSON.stringify(ev.metadata)}
                      </span>
                    ) : (
                      <span className="text-[#B5B7C0]">none</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Showing data + Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4">
          <p className="text-[14px] font-medium text-[#B5B7C0]">
            Showing data 1 to {filtered.length} of {events.length} entries
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="size-7 rounded-[6px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-white hover:border-slate-300 hover:shadow-[0px_4px_14px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              &lt;
            </button>
            <button
              type="button"
              className="size-7 rounded-[6px] bg-[#5932EA] border border-[#5932EA] text-white text-[12px] font-medium flex items-center justify-center shadow-[0px_4px_14px_rgba(89,50,234,0.35)] cursor-pointer"
            >
              1
            </button>
            <button
              type="button"
              className="size-7 rounded-[6px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-white hover:border-slate-300 hover:shadow-[0px_4px_14px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
