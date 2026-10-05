import React, { useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Edit,
  CheckCircle,
  Archive,
  Eye,
  Calendar,
  User,
  Sparkles,
  Tag,
} from "lucide-react";
import { adminStore } from "@/api/client";
import { Article, PublicationStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/auth/auth-context";

export function ArticlesPage() {
  const { user, canPerformAction } = useAuth();
  const [articles, setArticles] = useState<Article[]>(() => adminStore.getArticles());
  const [destinations] = useState(() => adminStore.getDestinations());

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Article>>({});

  const refreshList = () => {
    setArticles(adminStore.getArticles());
  };

  const handleOpenEdit = (article: Article) => {
    setSelectedArticle(article);
    setFormData({ ...article });
    setIsEditModalOpen(true);
  };

  const handleStatusTransition = (article: Article, nextStatus: PublicationStatus) => {
    adminStore.updateArticle(article.id, { status: nextStatus }, user?.name);
    refreshList();
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArticle) return;
    adminStore.updateArticle(selectedArticle.id, formData, user?.name);
    setIsEditModalOpen(false);
    refreshList();
  };

  const filtered = articles.filter((art) => {
    const summary = art.summary || art.excerpt || "";
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "ALL" || art.category === categoryFilter;
    const matchesStatus = statusFilter === "ALL" || art.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Quản Lý Bài Viết & Cẩm Nang Du Lịch
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quy trình biên tập nội dung chuyên sâu, văn hoá bản địa, cẩm nang ẩm thực và thông tin di sản.
          </p>
        </div>

        <Badge variant="purple">
          {articles.length} bài viết biên tập
        </Badge>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, tác giả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Chuyên Mục</option>
            <option value="Cẩm nang du lịch">Cẩm nang du lịch</option>
            <option value="Ẩm thực">Ẩm thực</option>
            <option value="Lịch sử văn hoá">Lịch sử văn hoá</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Trạng Thái</option>
            <option value="PUBLISHED">Đã Xuất Bản</option>
            <option value="IN_REVIEW">Đang Kiểm Duyệt</option>
            <option value="DRAFT">Bản Nháp</option>
            <option value="ARCHIVED">Lưu Trữ</option>
          </select>

          <span className="text-xs text-slate-400 font-semibold">{filtered.length} bài viết</span>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F9FBFF] border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Bài Viết</th>
                <th className="py-3.5 px-4">Chuyên Mục</th>
                <th className="py-3.5 px-4">Tác Giả</th>
                <th className="py-3.5 px-4">Điểm Đến Liên Quan</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">Cập Nhật</th>
                <th className="py-3.5 px-4 text-right">Quy Trình Duyệt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="size-11 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm line-clamp-1">{art.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">{art.summary}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px]">
                      {art.category}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-medium text-slate-800">
                    {art.author}
                  </td>

                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {art.destinationSlug}
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={art.status}>
                      {art.status === "PUBLISHED" && "Đã Xuất Bản"}
                      {art.status === "IN_REVIEW" && "Chờ Kiểm Duyệt"}
                      {art.status === "DRAFT" && "Bản Nháp"}
                      {art.status === "ARCHIVED" && "Đã Lưu Trữ"}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {new Date(art.updatedAt).toLocaleDateString("vi-VN")}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="size-7 p-0"
                        title="Biên tập bài viết"
                        onClick={() => handleOpenEdit(art)}
                      >
                        <Edit className="size-3.5 text-slate-600" />
                      </Button>

                      {art.status === "DRAFT" && canPerformAction("edit") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-[#5932EA] hover:bg-indigo-50 px-2 py-1"
                          onClick={() => handleStatusTransition(art, "IN_REVIEW")}
                        >
                          Gửi Duyệt
                        </Button>
                      )}

                      {art.status === "IN_REVIEW" && canPerformAction("publish") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-[#16C098] hover:bg-emerald-50 px-2 py-1 font-semibold"
                          onClick={() => handleStatusTransition(art, "PUBLISHED")}
                        >
                          Phê Duyệt
                        </Button>
                      )}

                      {art.status === "PUBLISHED" && canPerformAction("publish") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[11px] text-rose-500 hover:bg-rose-50 px-2 py-1"
                          onClick={() => handleStatusTransition(art, "ARCHIVED")}
                        >
                          Lưu Trữ
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Article Modal */}
      {isEditModalOpen && selectedArticle && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Biên Tập Bài Viết: ${selectedArticle.title}`}
          size="lg"
        >
          <form onSubmit={handleSaveArticle} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tiêu Đề Bài Viết
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chuyên Mục
                </label>
                <select
                  value={formData.category || "Cẩm nang du lịch"}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
                >
                  <option value="Cẩm nang du lịch">Cẩm nang du lịch</option>
                  <option value="Ẩm thực">Ẩm thực</option>
                  <option value="Lịch sử văn hoá">Lịch sử văn hoá</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tác Giả Biên Soạn
                </label>
                <input
                  type="text"
                  value={formData.author || ""}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tóm Tắt Bài Viết (Lead paragraph)
              </label>
              <textarea
                rows={2}
                value={formData.summary || ""}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nội Dung Chi Tiết (Markdown Content)
              </label>
              <textarea
                rows={6}
                value={formData.body || ""}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden font-mono"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Huỷ Bỏ
              </Button>
              <Button type="submit" variant="primary">
                Cập Nhật Nội Dung
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
