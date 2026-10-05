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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#16C098] bg-[#E7F8F4] px-2.5 py-0.5 rounded-full">
              <Lock className="size-3" />
              <span>BẢN GHI BẤT BIẾN (IMMUTABLE LOGS)</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Nhật Ký Thẩm Định & Truy Vết Hoạt Động (Audit Log)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Lưu vết chi tiết toàn bộ các hành động thay đổi dữ liệu, cấp quyền đối tác, kiểm duyệt đánh giá và cấu hình hệ thống.
          </p>
        </div>

        <Badge variant="purple">
          {events.length} sự kiện kiểm toán
        </Badge>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col lg:flex-row gap-3 items-center justify-between">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo nhân sự, hành động, đối tượng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
          />
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Thực Thể (Entity)</option>
            <option value="destination">Danh Thắng (destination)</option>
            <option value="place">Địa Điểm (place)</option>
            <option value="partner">Đối Tác (partner)</option>
            <option value="article">Bài Viết (article)</option>
            <option value="review">Đánh Giá (review)</option>
            <option value="lead">Khách Hàng / Lead</option>
            <option value="knowledge">Cơ Sở Tri Thức (knowledge)</option>
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Vai Trò (Role)</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="ADMIN">ADMIN</option>
            <option value="CONTENT_EDITOR">CONTENT_EDITOR</option>
            <option value="PARTNER_REVIEWER">PARTNER_REVIEWER</option>
            <option value="MODERATOR">MODERATOR</option>
            <option value="OPERATIONS_MANAGER">OPERATIONS_MANAGER</option>
          </select>

          <span className="text-xs text-slate-400 font-semibold">{filtered.length} sự kiện</span>
        </div>
      </div>

      {/* Audit Events Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F9FBFF] border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Nhân Sự & Vai Trò</th>
                <th className="py-3.5 px-4">Mã Lệnh Thao Tác (Action)</th>
                <th className="py-3.5 px-4">Thực Thể Tác Động</th>
                <th className="py-3.5 px-4">Thời Điểm Ghi Nhận</th>
                <th className="py-3.5 px-4">Địa Chỉ IP / Phiên</th>
                <th className="py-3.5 px-4 text-right">Chi Tiết Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                        {ev.actor.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{ev.actor}</div>
                        <Badge variant="purple" className="text-[10px] py-0 px-1.5">{ev.actorRole}</Badge>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                      {ev.action}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{ev.entityName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      type: {ev.entityType} • id: {ev.entityId}
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3 text-slate-400" />
                      <span>{ev.timestamp}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                    {ev.ipAddress}
                  </td>

                  <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-500">
                    {Object.keys(ev.metadata).length > 0 ? (
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 truncate max-w-xs inline-block">
                        {JSON.stringify(ev.metadata)}
                      </span>
                    ) : (
                      <span className="text-slate-300">none</span>
                    )}
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
