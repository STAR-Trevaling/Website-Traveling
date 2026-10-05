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
    <div className="space-y-8 animate-in fade-in duration-300 font-['Poppins',sans-serif]">
      {/* SECTION 1: KNOWLEDGE SOURCES (Nguồn Dữ Liệu Được Cấp Phép) */}
      <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-semibold text-black tracking-tight leading-tight">
              AI Knowledge Sources
            </h1>
            <p className="text-[14px] text-[#16C098] font-normal mt-0.5">
              Authorized Grounding & RAG Datasets
            </p>
          </div>
          <Badge variant="purple">
            {documents.filter((d) => d.indexStatus === "INDEXED").length}/{documents.length} Vector Indexed
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sources.map((src) => (
            <div
              key={src.id}
              className="bg-[#F9FBFF] rounded-[20px] border border-slate-100 p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] bg-white border border-slate-200 text-[#7E7E7E] px-2 py-0.5 rounded-[4px] font-semibold">
                    {src.type}
                  </span>
                  <Badge variant={src.status === "ACTIVE" ? "success" : "neutral"}>
                    {src.status === "ACTIVE" ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <h3 className="font-semibold text-black text-[14px]">{src.name}</h3>
                <p className="text-[12px] text-[#B5B7C0] truncate mt-1">{src.sourceUrl}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[12px]">
                <span className="text-[#7E7E7E]">Độ tin cậy:</span>
                <span className="font-semibold text-[#008767] bg-[rgba(22,192,152,0.15)] px-2.5 py-0.5 rounded-[4px] text-[11px]">
                  {src.trustLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: KNOWLEDGE DOCUMENTS & VECTOR INDEX */}
      <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        {/* Card Header: Knowledge Documents & Vector RAG with Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[22px] font-semibold text-black tracking-tight leading-tight">
              Knowledge Documents
            </h2>
            <p className="text-[14px] text-[#16C098] font-normal mt-0.5">
              Vector Embeddings & Heritage Grounding ({filtered.length} tài liệu)
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

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-[12px] py-2 px-3 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Mọi Trạng Thái Vector</option>
              <option value="INDEXED">Đã Vector Hoá</option>
              <option value="PENDING">Đang Xử Lý</option>
              <option value="FAILED">Thất Bại</option>
            </select>
          </div>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Tài Liệu Tri Thức</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Điểm Đến</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Phân Loại</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Nguồn Dữ Liệu</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Xác Minh</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center">Trạng Thái Vector RAG</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    <div className="font-semibold text-black text-[14px] flex items-center gap-1.5">
                      <FileText className="size-3.5 text-[#5932EA]" />
                      <span>{doc.title}</span>
                    </div>
                    <div className="text-[12px] text-[#B5B7C0]">Ngôn ngữ: {doc.language.toUpperCase()} • {doc.lastUpdated}</div>
                  </td>

                  <td className="py-4 text-[14px] font-medium text-[#292D32]">
                    {doc.destination}
                  </td>

                  <td className="py-4 text-[13px] font-medium text-[#292D32]">
                    <span className="bg-[#F9FBFF] border border-slate-100 text-[#7E7E7E] px-2.5 py-1 rounded-[6px] text-[11px] font-semibold">
                      {doc.contentType}
                    </span>
                  </td>

                  <td className="py-4 text-[13px] text-[#292D32]">
                    {doc.source}
                  </td>

                  <td className="py-4">
                    {doc.verified ? (
                      <span className="text-[#008767] font-medium text-[12px] flex items-center gap-1">
                        <CheckCircle className="size-3.5 text-[#16C098]" />
                        <span>Đã xác minh</span>
                      </span>
                    ) : (
                      <span className="text-amber-600 font-medium text-[12px]">Chờ xác minh</span>
                    )}
                  </td>

                  <td className="py-4 text-center">
                    <Badge variant={doc.indexStatus}>
                      {doc.indexStatus === "INDEXED" && "Active"}
                      {doc.indexStatus === "PENDING" && "Pending"}
                      {doc.indexStatus === "FAILED" && "Inactive"}
                      {doc.indexStatus === "NOT_INDEXED" && "Inactive"}
                    </Badge>
                  </td>

                  <td className="py-4 text-right">
                    {canPerformAction("edit") && (
                      <button
                        type="button"
                        disabled={reindexingId === doc.id}
                        onClick={() => handleReindex(doc.id)}
                        className="px-2.5 py-1 rounded-[6px] text-[12px] font-medium text-[#5932EA] hover:bg-white hover:shadow-[0px_4px_14px_rgba(89,50,234,0.18)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer inline-flex items-center gap-1"
                      >
                        <RefreshCw className={`size-3 text-[#5932EA] ${reindexingId === doc.id ? "animate-spin" : ""}`} />
                        <span>{reindexingId === doc.id ? "Index..." : "Re-Index"}</span>
                      </button>
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
            Showing data 1 to {filtered.length} of {documents.length} entries
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
