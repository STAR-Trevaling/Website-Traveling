import React, { useState } from "react";
import {
  Search,
  Heart,
  Star,
  Map,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CustomerUser } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/auth/auth-context";
import { adminStore } from "@/api/client";

const INITIAL_CUSTOMERS: (CustomerUser & { company: string; country: string })[] = [
  {
    id: "cus-1",
    fullName: "Jane Cooper",
    company: "Microsoft",
    email: "jane@microsoft.com",
    phone: "(225) 555-0118",
    country: "United States",
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
    fullName: "Floyd Miles",
    company: "Yahoo",
    email: "floyd@yahoo.com",
    phone: "(205) 555-0100",
    country: "Kiribati",
    status: "SUSPENDED",
    createdAt: "04/02/2026",
    favoritesCount: 2,
    reviewsCount: 1,
    savedTripsCount: 0,
    inquiriesCount: 0,
    recentActivity: "Tài khoản tạm khoá do vi phạm tiêu chuẩn cộng đồng",
  },
  {
    id: "cus-3",
    fullName: "Ronald Richards",
    company: "Adobe",
    email: "ronald@adobe.com",
    phone: "(302) 555-0107",
    country: "Israel",
    status: "SUSPENDED",
    createdAt: "15/02/2026",
    favoritesCount: 5,
    reviewsCount: 2,
    savedTripsCount: 1,
    inquiriesCount: 0,
    recentActivity: "Tạm khoá theo yêu cầu bảo mật thông tin",
  },
  {
    id: "cus-4",
    fullName: "Marvin McKinney",
    company: "Tesla",
    email: "marvin@tesla.com",
    phone: "(252) 555-0126",
    country: "Iran",
    status: "ACTIVE",
    createdAt: "22/03/2026",
    favoritesCount: 24,
    reviewsCount: 8,
    savedTripsCount: 4,
    inquiriesCount: 3,
    recentActivity: "Yêu cầu tư vấn du thuyền vịnh Hạ Long 2 ngày 1 đêm",
  },
  {
    id: "cus-5",
    fullName: "Jerome Bell",
    company: "Google",
    email: "jerome@google.com",
    phone: "(629) 555-0129",
    country: "Réunion",
    status: "ACTIVE",
    createdAt: "28/03/2026",
    favoritesCount: 32,
    reviewsCount: 12,
    savedTripsCount: 6,
    inquiriesCount: 1,
    recentActivity: "Đã đánh giá 5 sao cho Nhà hàng Cá Hồi Sa Pa",
  },
  {
    id: "cus-6",
    fullName: "Kathryn Murphy",
    company: "IBM",
    email: "kathryn@ibm.com",
    phone: "(406) 555-0120",
    country: "Curaçao",
    status: "ACTIVE",
    createdAt: "01/04/2026",
    favoritesCount: 15,
    reviewsCount: 3,
    savedTripsCount: 2,
    inquiriesCount: 1,
    recentActivity: "Đặt tour khám phá hang động Phong Nha",
  },
  {
    id: "cus-7",
    fullName: "Jacob Jones",
    company: "Yahoo",
    email: "jacob@yahoo.com",
    phone: "(208) 555-0112",
    country: "Brazil",
    status: "ACTIVE",
    createdAt: "02/04/2026",
    favoritesCount: 19,
    reviewsCount: 5,
    savedTripsCount: 3,
    inquiriesCount: 2,
    recentActivity: "Lưu khách sạn InterContinental Danang Sun Peninsula",
  },
  {
    id: "cus-8",
    fullName: "Kristin Watson",
    company: "Facebook",
    email: "kristin@facebook.com",
    phone: "(704) 555-0127",
    country: "Åland Islands",
    status: "SUSPENDED",
    createdAt: "03/04/2026",
    favoritesCount: 4,
    reviewsCount: 0,
    savedTripsCount: 0,
    inquiriesCount: 0,
    recentActivity: "Chưa hoàn tất xác minh danh tính",
  },
];

export function CustomersPage() {
  const { user, canPerformAction } = useAuth();
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Newest");

  const [selectedCustomer, setSelectedCustomer] = useState<(typeof INITIAL_CUSTOMERS)[0] | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleToggleStatus = (customer: (typeof INITIAL_CUSTOMERS)[0]) => {
    const nextStatus: "ACTIVE" | "SUSPENDED" = customer.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    const updated = customers.map((c) =>
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
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.phone ? c.phone.includes(searchTerm) : false);

    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-['Poppins',sans-serif]">
      {/* Main Customers Card - Exact Match to User's Figma Template */}
      <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        {/* Card Header: All Customers & Active Members with Search & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-semibold text-black tracking-tight leading-tight">
              All Customers
            </h1>
            <p className="text-[14px] text-[#16C098] font-normal mt-0.5">
              Active Members
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Search Input */}
            <div className="relative w-56">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7E7E7E]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-[10px] bg-[#F9FBFF] border border-slate-100 text-[12px] text-[#292D32] placeholder:text-[#B5B7C0] focus:border-[#5932EA] focus:outline-hidden transition"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#F9FBFF] border border-slate-100 rounded-[10px] px-3.5 py-2 pr-8 text-[12px] font-medium text-[#7E7E7E] focus:outline-hidden cursor-pointer"
              >
                <option value="Newest">Short by : Newest</option>
                <option value="Oldest">Short by : Oldest</option>
                <option value="Active">Short by : Active</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#7E7E7E] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Customer Name</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Company</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Phone Number</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Email</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0]">Country</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center">Status</th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-5 text-[14px] font-medium text-[#292D32]">
                    {c.fullName}
                  </td>

                  <td className="py-5 text-[14px] font-medium text-[#292D32]">
                    {c.company}
                  </td>

                  <td className="py-5 text-[14px] font-medium text-[#292D32]">
                    {c.phone}
                  </td>

                  <td className="py-5 text-[14px] font-medium text-[#292D32]">
                    {c.email}
                  </td>

                  <td className="py-5 text-[14px] font-medium text-[#292D32]">
                    {c.country}
                  </td>

                  <td className="py-5 text-center">
                    {c.status === "ACTIVE" ? (
                      <span className="bg-[rgba(22,192,152,0.38)] border border-[#00B087] text-[#008767] rounded-[4px] px-4 py-1 text-[13px] font-medium inline-block min-w-20">
                        Active
                      </span>
                    ) : (
                      <span className="bg-[#FFC5C5] border border-[#DF0404] text-[#DF0404] rounded-[4px] px-4 py-1 text-[13px] font-medium inline-block min-w-20">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCustomer(c);
                          setIsDetailModalOpen(true);
                        }}
                        className="text-[12px] font-medium text-[#5932EA] hover:underline cursor-pointer"
                      >
                        Detail
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(c)}
                        className={`text-[12px] font-medium cursor-pointer ${
                          c.status === "ACTIVE"
                            ? "text-rose-500 hover:underline"
                            : "text-[#16C098] hover:underline"
                        }`}
                      >
                        {c.status === "ACTIVE" ? "Lock" : "Unlock"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Showing data 1 to 8 of 256K entries + Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4">
          <p className="text-[14px] font-medium text-[#B5B7C0]">
            Showing data 1 to 8 of 256K entries
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            >
              <ChevronLeft className="size-3.5" />
            </button>

            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#5932EA] border border-[#5932EA] text-white text-[12px] font-medium flex items-center justify-center shadow-xs cursor-pointer"
            >
              1
            </button>

            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            >
              2
            </button>

            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            >
              3
            </button>

            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            >
              4
            </button>

            <span className="text-[12px] text-[#404B52] px-1 font-medium">...</span>

            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            >
              40
            </button>

            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] border border-[#EEEEEE] text-[#404B52] text-[12px] font-medium flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {isDetailModalOpen && selectedCustomer && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Hồ Sơ Du Khách: ${selectedCustomer.fullName}`}
          size="md"
        >
          <div className="space-y-4 text-xs font-['Poppins',sans-serif]">
            <div className="p-4 bg-[#FAFBFF] rounded-[20px] border border-slate-100 space-y-2 text-[#292D32]">
              <p><strong>Khách hàng:</strong> {selectedCustomer.fullName}</p>
              <p><strong>Công ty:</strong> {selectedCustomer.company}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Số điện thoại:</strong> {selectedCustomer.phone}</p>
              <p><strong>Quốc gia:</strong> {selectedCustomer.country}</p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <Badge variant={selectedCustomer.status === "ACTIVE" ? "active" : "inactive"}>
                  {selectedCustomer.status === "ACTIVE" ? "Active" : "Inactive"}
                </Badge>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white border border-slate-100 rounded-[14px]">
                <div className="text-base font-bold text-black">{selectedCustomer.favoritesCount}</div>
                <div className="text-[11px] text-[#B5B7C0]">Địa Điểm Đã Lưu</div>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-[14px]">
                <div className="text-base font-bold text-black">{selectedCustomer.reviewsCount}</div>
                <div className="text-[11px] text-[#B5B7C0]">Đánh Giá Đã Viết</div>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-[14px]">
                <div className="text-base font-bold text-black">{selectedCustomer.savedTripsCount}</div>
                <div className="text-[11px] text-[#B5B7C0]">Lịch Trình Đã Lưu</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-1">Hoạt Động Gần Nhất</h4>
              <p className="p-3 bg-[#FAFBFF] border border-slate-100 rounded-[14px] text-slate-600">
                {selectedCustomer.recentActivity}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <Button
                type="button"
                variant={selectedCustomer.status === "ACTIVE" ? "destructive" : "success"}
                onClick={() => handleToggleStatus(selectedCustomer)}
              >
                {selectedCustomer.status === "ACTIVE" ? "Khóa Tài Khoản" : "Kích Hoạt Tài Khoản"}
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
