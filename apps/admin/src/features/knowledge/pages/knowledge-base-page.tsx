import React, { useState } from "react";
import {
  Bot,
  Search,
  Database,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  FileText,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Layers,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { KnowledgeDocument, KnowledgeSource } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/auth-context";

export function KnowledgeBasePage() {
  const { user, canPerformAction } = useAuth();
  const [sources] = useState<KnowledgeSource[]>(() => adminStore.getKnowledgeSources());
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(() =>
    adminStore.getKnowledgeDocuments()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [reindexingId, setReindexingId] = useState<string | null>(null);

  const handleReindex = (docId: string) => {
    setReindexingId(docId);
    setTimeout(() => {
      adminStore.reindexDocument(docId, user?.name);
      setDocuments(adminStore.getKnowledgeDocuments());
      setReindexingId(null);
    }, 800);
  };

  const filtered = documents.filter((doc) => {
    const sourceName = doc.source || doc.sourceName || "";
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sourceName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || doc.indexStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Cơ Sở Tri Thức AI & RAG (Retrieval-Augmented Generation)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quản trị dữ liệu nguồn tin cậy cung cấp bối cảnh cho trợ lý du lịch AI: cẩm nang lịch sử, toạ độ di sản và chỉ số vector hoá.
          </p>
        </div>

        <Badge variant="purple">
          {documents.filter((d) => d.indexStatus === "INDEXED").length}/{documents.length} tài liệu đã vector hoá
        </Badge>
      </div>

      {/* SECTION: KNOWLEDGE SOURCES (Nguồn Dữ Liệu Được Cấp Phép) */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Database className="size-4 text-[#5932EA]" />
          <span>Nguồn Dữ Liệu Được Cấp Phép (Authorized Knowledge Sources)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sources.map((src) => (
            <div
              key={src.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                    {src.type}
                  </span>
                  <Badge variant={src.status === "ACTIVE" ? "success" : "neutral"}>
                    {src.status}
                  </Badge>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{src.name}</h3>
                <p className="text-xs text-slate-400 truncate mt-1">{src.sourceUrl}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Mức độ tin cậy:</span>
                <span className="font-bold text-[#16C098] bg-[#E7F8F4] px-2 py-0.5 rounded-full text-[11px]">
                  {src.trustLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: KNOWLEDGE DOCUMENTS & INDEXING STATUS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="size-4 text-[#0098a2]" />
            <span>Tài Liệu Tri Thức & Trạng Thái Vector Hoá</span>
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tài liệu, điểm đến..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">Mọi Trạng Thái Vector</option>
              <option value="INDEXED">Đã Vector Hoá (INDEXED)</option>
              <option value="PENDING">Đang Xử Lý (PENDING)</option>
              <option value="FAILED">Thất Bại (FAILED)</option>
            </select>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-[#F9FBFF] border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Tài Liệu Tri Thức</th>
                  <th className="py-3.5 px-4">Điểm Đến Trực Thuộc</th>
                  <th className="py-3.5 px-4">Phân Loại Dữ Liệu</th>
                  <th className="py-3.5 px-4">Nguồn Dữ Liệu</th>
                  <th className="py-3.5 px-4">Xác Minh</th>
                  <th className="py-3.5 px-4">Trạng Thái Vector RAG</th>
                  <th className="py-3.5 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <FileText className="size-3.5 text-[#5932EA]" />
                        <span>{doc.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Ngôn ngữ: {doc.language.toUpperCase()} • Cập nhật: {doc.lastUpdated}</div>
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-800">
                      {doc.destination}
                    </td>

                    <td className="py-3 px-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[11px]">
                        {doc.contentType}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600">
                      {doc.source}
                    </td>

                    <td className="py-3 px-4">
                      {doc.verified ? (
                        <span className="text-[#16C098] font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle className="size-3.5" />
                          <span>Đã xác minh</span>
                        </span>
                      ) : (
                        <span className="text-amber-600 font-medium text-[11px]">Chờ xác minh</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <Badge variant={doc.indexStatus}>
                        {doc.indexStatus === "INDEXED" && "Đã Vector Hoá"}
                        {doc.indexStatus === "PENDING" && "Đang Index..."}
                        {doc.indexStatus === "FAILED" && "Lỗi Nhúng Vector"}
                        {doc.indexStatus === "NOT_INDEXED" && "Chưa Index"}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-right">
                      {canPerformAction("edit") && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs gap-1"
                          disabled={reindexingId === doc.id}
                          onClick={() => handleReindex(doc.id)}
                        >
                          <RefreshCw className={`size-3 text-[#5932EA] ${reindexingId === doc.id ? "animate-spin" : ""}`} />
                          <span>{reindexingId === doc.id ? "Đang Index..." : "Re-Index"}</span>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
