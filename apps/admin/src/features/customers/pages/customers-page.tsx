import React, { useState } from "react";
import {
  Users,
  Search,
  Shield,
  Heart,
  Star,
  Map,
  MessageSquare,
  AlertTriangle,
  UserX,
  UserCheck,
  Eye,
} from "lucide-react";
import { CustomerUser } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/auth/auth-context";
import { adminStore } from "@/api/client";

const INITIAL_CUSTOMERS: CustomerUser[] = [
  {
    id: "cus-1",
    fullName: "Nguyễn Văn An",
    email: "an.nguyen@gmail.com",
    phone: "0908123456",
    status: "ACTIVE",
    createdAt: "12/01/2026",
    favoritesCount: 18,
    reviewsCount: 4,
    savedTripsCount: 3,
    inquiriesCount: 2,
    recentActivity: "Đã lưu địa điểm Chùa Bái Đính vào chuyến đi Ninh Bình",
  },
  {
    id: "cus-2",
    fullName: "Trần Thị Mai Lan",
    email: "lan.mai@gmail.com",
    phone: "0912987654",
    status: "ACTIVE",
    createdAt: "04/02/2026",
    favoritesCount: 32,
    reviewsCount: 12,
    savedTripsCount: 6,
    inquiriesCount: 1,
    recentActivity: "Đã gửi đánh giá 5 sao cho Nhà hàng Cá Hồi Sa Pa",
  },
  {
    id: "cus-3",
    fullName: "Lê Hoàng Quân",
    email: "quan.le@outlook.com",
    phone: "0987333222",
    status: "SUSPENDED",
    createdAt: "15/02/2026",
    favoritesCount: 2,
    reviewsCount: 5,
    savedTripsCount: 0,
    inquiriesCount: 0,
    recentActivity: "Tài khoản bị tạm khoá do vi phạm quy chuẩn cộng đồng",
  },
  {
    id: "cus-4",
    fullName: "Phạm Thảo Vy",
    email: "thaovy.travel@gmail.com",
    phone: "0944556677",
    status: "ACTIVE",
    createdAt: "22/03/2026",
    favoritesCount: 24,
    reviewsCount: 3,
    savedTripsCount: 4,
    inquiriesCount: 3,
    recentActivity: "Yêu cầu tư vấn tour du thuyền Hạ Long 2 ngày 1 đêm",
  },
];

export function CustomersPage() {
  const { user, canPerformAction } = useAuth();
  const [customers, setCustomers] = useState<CustomerUser[]>(INITIAL_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerUser | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleToggleStatus = (customer: CustomerUser) => {
    const nextStatus: "ACTIVE" | "SUSPENDED" = customer.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    const updated: CustomerUser[] = customers.map((c) =>
      c.id === customer.id ? { ...c, status: nextStatus } : c
    );
    setCustomers(updated);

    adminStore.recordAudit(
      user?.name || "Admin",
      "ADMIN",
      `CUSTOMER_${nextStatus}`,
      "customer",
      customer.id,
      customer.fullName
    );

    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer({ ...selectedCustomer, status: nextStatus });
    }
  };

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.phone ? c.phone.includes(searchTerm) : false);

    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Quản Lý Khách Hàng & Du Khách
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi hành vi người dùng, lượt lưu yêu thích, hành trình đã lên kế hoạch và quản trị tài khoản an toàn.
          </p>
        </div>

        <Badge variant="purple">
          {customers.length} tài khoản thành viên
        </Badge>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, email, số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#5932EA]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Mọi Trạng Thái</option>
            <option value="ACTIVE">Hoạt Động (ACTIVE)</option>
            <option value="SUSPENDED">Đã Khoá (SUSPENDED)</option>
          </select>

          <span className="text-xs text-slate-400 font-semibold">{filtered.length} tài khoản</span>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F9FBFF] border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Du Khách</th>
                <th className="py-3.5 px-4">Ngày Đăng Ký</th>
                <th className="py-3.5 px-4">Yêu Thích</th>
                <th className="py-3.5 px-4">Đánh Giá</th>
                <th className="py-3.5 px-4">Chuyến Đi</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 text-sm">{c.fullName}</div>
                    <div className="text-[11px] text-slate-400">{c.email} • {c.phone}</div>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                    {c.createdAt}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 font-semibold text-slate-700">
                      <Heart className="size-3.5 text-rose-500 fill-rose-500" />
                      <span>{c.favoritesCount}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 font-semibold text-slate-700">
                      <Star className="size-3.5 text-amber-500 fill-amber-500" />
                      <span>{c.reviewsCount}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 font-semibold text-slate-700">
                      <Map className="size-3.5 text-indigo-500" />
                      <span>{c.savedTripsCount}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={c.status === "ACTIVE" ? "success" : "destructive"}>
                      {c.status === "ACTIVE" ? "Hoạt Động" : "Bị Tạm Khoá"}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs gap-1"
                        onClick={() => {
                          setSelectedCustomer(c);
                          setIsDetailModalOpen(true);
                        }}
                      >
                        <Eye className="size-3.5" />
                        <span>Hồ Sơ</span>
                      </Button>

                      {canPerformAction("edit") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`text-xs px-2 py-1 ${
                            c.status === "ACTIVE"
                              ? "text-rose-600 hover:bg-rose-50"
                              : "text-emerald-600 hover:bg-emerald-50"
                          }`}
                          onClick={() => handleToggleStatus(c)}
                        >
                          {c.status === "ACTIVE" ? "Khoá" : "Mở Khoá"}
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

      {/* Customer Detail Modal */}
      {isDetailModalOpen && selectedCustomer && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Chi Tiết Du Khách: ${selectedCustomer.fullName}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-slate-700">
              <p><strong>Mã khách hàng:</strong> <span className="font-mono">{selectedCustomer.id}</span></p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Số điện thoại:</strong> {selectedCustomer.phone}</p>
              <p><strong>Ngày gia nhập:</strong> {selectedCustomer.createdAt}</p>
              <p><strong>Trạng thái:</strong> <Badge variant={selectedCustomer.status === "ACTIVE" ? "success" : "destructive"}>{selectedCustomer.status}</Badge></p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <div className="text-base font-bold text-slate-900">{selectedCustomer.favoritesCount}</div>
                <div className="text-[11px] text-slate-400">Địa Điểm Đã Lưu</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <div className="text-base font-bold text-slate-900">{selectedCustomer.reviewsCount}</div>
                <div className="text-[11px] text-slate-400">Đánh Giá Đã Viết</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <div className="text-base font-bold text-slate-900">{selectedCustomer.savedTripsCount}</div>
                <div className="text-[11px] text-slate-400">Lịch Trình Lưu</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-700 mb-1">Hoạt Động Gần Nhất</h4>
              <p className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-600">
                {selectedCustomer.recentActivity}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <Button
                type="button"
                variant={selectedCustomer.status === "ACTIVE" ? "destructive" : "success"}
                onClick={() => handleToggleStatus(selectedCustomer)}
              >
                {selectedCustomer.status === "ACTIVE" ? "Tạm Khoá Tài Khoản" : "Khôi Phục Tài Khoản"}
              </Button>

              <Button type="button" variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                Đóng
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
