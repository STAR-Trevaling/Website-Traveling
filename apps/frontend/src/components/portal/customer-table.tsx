"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Customer } from "./types";
import {
  TEMPLATE_CUSTOMERS,
  VIETNAM_TRAVEL_CUSTOMERS,
  PARTNER_INQUIRIES,
} from "./data";
import { CustomerModal } from "./customer-modal";

type DatasetKey = "template" | "vietnam-travelers" | "partners";
type SortOption = "Newest" | "Oldest" | "Name A-Z" | "Active First";

import { useEffect } from "react";

export function CustomerTable() {
  const [currentDataset, setCurrentDataset] = useState<DatasetKey>("template");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Editable lists per dataset
  const [templateList, setTemplateList] = useState<Customer[]>(TEMPLATE_CUSTOMERS);
  const [vietnamList, setVietnamList] = useState<Customer[]>(VIETNAM_TRAVEL_CUSTOMERS);
  const [partnerList, setPartnerList] = useState<Customer[]>(PARTNER_INQUIRIES);

  // Load latest data from API route on mount
  useEffect(() => {
    fetch("/api/portal/customers")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.customers?.length) {
          const vnOnly = data.customers.filter((c: Customer) =>
            c.id.startsWith("vn-") || c.id.startsWith("lead-")
          );
          if (vnOnly.length) {
            setVietnamList(vnOnly);
          }
        }
        if (data?.partners?.length) {
          setPartnerList(data.partners);
        }
      })
      .catch(() => {
        // Fallback to initial local datasets
      });
  }, []);

  // Active list based on dataset
  const rawList = useMemo(() => {
    switch (currentDataset) {
      case "vietnam-travelers":
        return vietnamList;
      case "partners":
        return partnerList;
      case "template":
      default:
        return templateList;
    }
  }, [currentDataset, templateList, vietnamList, partnerList]);

  // Filtered and sorted customers
  const filteredCustomers = useMemo(() => {
    let result = [...rawList];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.phone.includes(q)
      );
    }

    if (sortBy === "Name A-Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Active First") {
      result.sort((a, b) => (a.status === "Active" ? -1 : 1));
    } else if (sortBy === "Oldest") {
      result.reverse();
    }

    return result;
  }, [rawList, searchQuery, sortBy]);

  // Toggle Active/Inactive status and sync via API
  const handleToggleStatus = (customerId: string) => {
    let nextStatus: "Active" | "Inactive" = "Active";

    const updater = (prev: Customer[]): Customer[] =>
      prev.map((c) => {
        if (c.id === customerId) {
          nextStatus = c.status === "Active" ? "Inactive" : "Active";
          return {
            ...c,
            status: nextStatus,
          };
        }
        return c;
      });

    if (currentDataset === "template") setTemplateList(updater);
    else if (currentDataset === "vietnam-travelers") setVietnamList(updater);
    else setPartnerList(updater);

    if (selectedCustomer && selectedCustomer.id === customerId) {
      setSelectedCustomer((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "Active" ? "Inactive" : "Active",
            }
          : null
      );
    }

    // Fire-and-forget sync to backend API
    fetch("/api/portal/customers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: customerId, status: nextStatus }),
    }).catch(() => {});
  };

  return (
    <div className="w-full bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)] font-poppins relative">
      {/* Category Tabs for Project Integration */}
      <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
          Chế độ dữ liệu:
        </span>
        <button
          type="button"
          onClick={() => {
            setCurrentDataset("template");
            setSearchQuery("");
            setCurrentPage(1);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
            currentDataset === "template"
              ? "bg-[#5932EA] text-white shadow-xs"
              : "bg-[#F9FBFF] text-slate-600 hover:bg-slate-100"
          }`}
        >
          All Customers (Template Demo)
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentDataset("vietnam-travelers");
            setSearchQuery("");
            setCurrentPage(1);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
            currentDataset === "vietnam-travelers"
              ? "bg-[#5932EA] text-white shadow-xs"
              : "bg-[#F9FBFF] text-slate-600 hover:bg-slate-100"
          }`}
        >
          Khách du lịch Việt Nam (CRM Leads)
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentDataset("partners");
            setSearchQuery("");
            setCurrentPage(1);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
            currentDataset === "partners"
              ? "bg-[#5932EA] text-white shadow-xs"
              : "bg-[#F9FBFF] text-slate-600 hover:bg-slate-100"
          }`}
        >
          Mạng lưới Đối tác (Partners)
        </button>
      </div>

      {/* Header Row: Title & Subtitle + Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-[22px] font-semibold text-black leading-tight">
            All Customers
          </h2>
          <p className="text-[14px] font-normal text-[#16C098] mt-1">
            Active Members
          </p>
        </div>

        {/* Right: Search Box + Sort Dropdown */}
        <div className="flex items-center flex-wrap gap-4">
          {/* Search Input Box matching template:
              width: 216px, height: 38px, background: #F9FBFF, border-radius: 10px
          */}
          <div className="relative w-full sm:w-[216px] h-[38px] bg-[#F9FBFF] rounded-[10px] flex items-center px-3.5 gap-2 border border-slate-100 focus-within:border-indigo-300 transition">
            <Search className="size-4 text-[#7E7E7E] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-[12px] text-[#292D32] placeholder-[#B5B7C0] outline-hidden font-normal"
            />
          </div>

          {/* Sort By Dropdown matching template:
              width: 154px, height: 38px, background: #F9FBFF, border-radius: 10px
          */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="h-[38px] px-3.5 bg-[#F9FBFF] rounded-[10px] flex items-center gap-1.5 text-[12px] border border-slate-100 hover:border-slate-200 transition cursor-pointer"
            >
              <span className="text-[#7E7E7E] font-normal">Short by : </span>
              <span className="text-[#3D3C42] font-semibold">{sortBy}</span>
              <ChevronDown className="size-3.5 text-[#3D3C42] ml-1" />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-11 z-20 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                {(["Newest", "Oldest", "Name A-Z", "Active First"] as SortOption[]).map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSortBy(opt);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs transition cursor-pointer ${
                        sortBy === opt
                          ? "bg-indigo-50 text-[#5932EA] font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Responsive Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-[#EEEEEE]">
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[18%]">
                Customer Name
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[14%]">
                Company
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[16%]">
                Phone Number
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[22%]">
                Email
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[16%]">
                Country
              </th>
              <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center w-[14%]">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EEEEEE]">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-slate-400">
                  Không tìm thấy khách hàng nào phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((cust) => {
                const isActive = cust.status === "Active";

                return (
                  <tr
                    key={cust.id}
                    onClick={() => setSelectedCustomer(cust)}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  >
                    {/* Customer Name */}
                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                      <div className="flex items-center gap-2">
                        <span className="group-hover:text-[#5932EA] transition-colors">
                          {cust.name}
                        </span>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                      {cust.company}
                    </td>

                    {/* Phone Number */}
                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                      {cust.phone}
                    </td>

                    {/* Email */}
                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2 truncate max-w-[200px]">
                      {cust.email}
                    </td>

                    {/* Country */}
                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                      {cust.country}
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 text-center">
                      <span
                        className={`inline-flex items-center justify-center min-w-[80px] px-3 py-1 rounded-[4px] text-[14px] font-medium tracking-[0.14px] transition select-none ${
                          isActive
                            ? "bg-[rgba(22,192,152,0.38)] outline-1 outline-[#00B087] -outline-offset-1 text-[#008767]"
                            : "bg-[#FFC5C5] outline-1 outline-[#DF0404] -outline-offset-1 text-[#DF0404]"
                        }`}
                      >
                        {cust.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching template:
          Left: Showing data 1 to 8 of 256K entries
          Right: < [1] [2] [3] [4] ... [40] >
      */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-7 pt-2">
        <p className="text-[14px] font-medium text-[#B5B7C0]">
          Showing data 1 to {Math.min(filteredCustomers.length, 8)} of 256K entries
        </p>

        <div className="flex items-center gap-2">
          {/* Prev Button */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52] hover:bg-slate-200 transition cursor-pointer"
            aria-label="Trang trước"
          >
            &lt;
          </button>

          {/* Page 1 (Active) */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`size-7 rounded-[4px] flex items-center justify-center text-[12px] font-medium transition cursor-pointer ${
              currentPage === 1
                ? "bg-[#5932EA] outline-1 outline-[#5932EA] -outline-offset-1 text-white font-semibold"
                : "bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 text-[#404B52] hover:bg-slate-200"
            }`}
          >
            1
          </button>

          {/* Page 2 */}
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`size-7 rounded-[4px] flex items-center justify-center text-[12px] font-medium transition cursor-pointer ${
              currentPage === 2
                ? "bg-[#5932EA] outline-1 outline-[#5932EA] -outline-offset-1 text-white font-semibold"
                : "bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 text-[#404B52] hover:bg-slate-200"
            }`}
          >
            2
          </button>

          {/* Page 3 */}
          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className={`size-7 rounded-[4px] flex items-center justify-center text-[12px] font-medium transition cursor-pointer ${
              currentPage === 3
                ? "bg-[#5932EA] outline-1 outline-[#5932EA] -outline-offset-1 text-white font-semibold"
                : "bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 text-[#404B52] hover:bg-slate-200"
            }`}
          >
            3
          </button>

          {/* Page 4 */}
          <button
            type="button"
            onClick={() => setCurrentPage(4)}
            className={`size-7 rounded-[4px] flex items-center justify-center text-[12px] font-medium transition cursor-pointer ${
              currentPage === 4
                ? "bg-[#5932EA] outline-1 outline-[#5932EA] -outline-offset-1 text-white font-semibold"
                : "bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 text-[#404B52] hover:bg-slate-200"
            }`}
          >
            4
          </button>

          {/* Ellipsis */}
          <span className="text-[12px] font-medium text-black px-0.5 select-none">
            ...
          </span>

          {/* Page 40 */}
          <button
            type="button"
            onClick={() => setCurrentPage(40)}
            className={`size-7 rounded-[4px] flex items-center justify-center text-[12px] font-medium transition cursor-pointer ${
              currentPage === 40
                ? "bg-[#5932EA] outline-1 outline-[#5932EA] -outline-offset-1 text-white font-semibold"
                : "bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 text-[#404B52] hover:bg-slate-200"
            }`}
          >
            40
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(40, p + 1))}
            className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52] hover:bg-slate-200 transition cursor-pointer"
            aria-label="Trang tiếp theo"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Customer Detail Modal */}
      <CustomerModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}
