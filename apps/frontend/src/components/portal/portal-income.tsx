"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, CreditCard, ArrowUp, ArrowDown, Download, CheckCircle2, Clock } from "lucide-react";

export interface Transaction {
  id: string;
  txCode: string;
  customerName: string;
  service: string;
  method: string;
  date: string;
  amount: string;
  status: "Active" | "Inactive"; // Active = Thành công, Inactive = Chờ thanh toán / Hoàn tiền
  statusLabel: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    txCode: "TX-VN-9842",
    customerName: "Jane Cooper (Microsoft)",
    service: "Du thuyền 5 sao Vịnh Hạ Long (3N2Đ)",
    method: "VNPay QR",
    date: "02/05/2026 14:32",
    amount: "57.750.000 ₫",
    status: "Active",
    statusLabel: "Thành công",
  },
  {
    id: "tx-2",
    txCode: "TX-VN-9841",
    customerName: "Hoàng Anh Tuấn (VinFast Group)",
    service: "Đoàn doanh nghiệp Vịnh Hạ Long 12 khách",
    method: "VietQR Banking",
    date: "01/05/2026 09:15",
    amount: "174.000.000 ₫",
    status: "Active",
    statusLabel: "Thành công",
  },
  {
    id: "tx-3",
    txCode: "TX-VN-9840",
    customerName: "Emma Watson (British Council)",
    service: "Đà Lạt Ngàn Hoa & Săn Mây Cầu Đất",
    method: "Visa Int.",
    date: "29/04/2026 18:40",
    amount: "7.500.000 ₫",
    status: "Active",
    statusLabel: "Thành công",
  },
  {
    id: "tx-4",
    txCode: "TX-VN-9839",
    customerName: "Trần Đức Minh (VNG Corporation)",
    service: "Phố cổ Hội An & Lặn biển Cù Lao Chàm",
    method: "MoMo QR",
    date: "28/04/2026 11:20",
    amount: "8.900.000 ₫",
    status: "Active",
    statusLabel: "Thành công",
  },
  {
    id: "tx-5",
    txCode: "TX-VN-9838",
    customerName: "David Wilson (Cathay Pacific)",
    service: "Chinh phục đỉnh Fansipan Sa Pa",
    method: "Mastercard",
    date: "26/04/2026 16:05",
    amount: "11.200.000 ₫",
    status: "Active",
    statusLabel: "Thành công",
  },
  {
    id: "tx-6",
    txCode: "TX-VN-9837",
    customerName: "Floyd Miles (Yahoo)",
    service: "Phú Quốc Luxury Beach Retreat",
    method: "Chuyển khoản SWIFT",
    date: "25/04/2026 10:50",
    amount: "44.500.000 ₫",
    status: "Inactive",
    statusLabel: "Chờ đối soát",
  },
  {
    id: "tx-7",
    txCode: "TX-VN-9836",
    customerName: "Nguyễn Thị Mai Phương (Vietcombank)",
    service: "Tràng An - Hang Múa - Tam Cốc",
    method: "VietQR Banking",
    date: "24/04/2026 15:22",
    amount: "6.800.000 ₫",
    status: "Active",
    statusLabel: "Thành công",
  },
  {
    id: "tx-8",
    txCode: "TX-VN-9835",
    customerName: "Sarah Jenkins (Traveloka Partner)",
    service: "Chợ nổi Cái Răng & Miệt vườn Sông nước",
    method: "VNPay Refund",
    date: "22/04/2026 08:30",
    amount: "5.400.000 ₫",
    status: "Inactive",
    statusLabel: "Đã hoàn tiền",
  },
];

export function PortalIncome() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"Newest" | "Amount High-Low">("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (selectedMethod !== "all") {
      result = result.filter((t) => t.method.toLowerCase().includes(selectedMethod.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.customerName.toLowerCase().includes(q) ||
          t.txCode.toLowerCase().includes(q) ||
          t.service.toLowerCase().includes(q) ||
          t.method.toLowerCase().includes(q)
      );
    }

    if (sortBy === "Amount High-Low") {
      result.sort((a, b) => parseInt(b.amount.replace(/\D/g, "")) - parseInt(a.amount.replace(/\D/g, "")));
    }

    return result;
  }, [transactions, selectedMethod, searchQuery, sortBy]);

  return (
    <div className="space-y-8 font-poppins">
      {/* 3 Metric Cards for Income */}
      <section className="w-full bg-white rounded-[30px] p-7 md:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#F0F0F0]">
          <div className="flex items-center gap-5 pb-6 md:pb-0 md:pr-6">
            <div className="size-[84px] shrink-0 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center">
              <CreditCard className="size-8 text-[#00AC4F] stroke-[1.8]" />
            </div>
            <div>
              <span className="text-[14px] text-[#ACACAC] block mb-1">Doanh thu tháng này</span>
              <span className="text-[32px] font-semibold text-[#333333] leading-none block mb-2">
                842.5M ₫
              </span>
              <div className="flex items-center gap-1 text-[12px]">
                <ArrowUp className="size-3.5 text-[#00AC4F] stroke-[2.5]" />
                <span className="font-bold text-[#00AC4F]">24.5%</span>
                <span className="text-[#292D32]">so với tháng 3</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 py-6 md:py-0 md:px-8">
            <div className="size-[84px] shrink-0 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center">
              <CheckCircle2 className="size-8 text-[#00AC4F] stroke-[1.8]" />
            </div>
            <div>
              <span className="text-[14px] text-[#ACACAC] block mb-1">Giao dịch thành công</span>
              <span className="text-[32px] font-semibold text-[#333333] leading-none block mb-2">
                1,248
              </span>
              <div className="flex items-center gap-1 text-[12px]">
                <ArrowUp className="size-3.5 text-[#00AC4F] stroke-[2.5]" />
                <span className="font-bold text-[#00AC4F]">18%</span>
                <span className="text-[#292D32]">tăng trưởng đơn</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 pt-6 md:pt-0 md:pl-8">
            <div className="size-[84px] shrink-0 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center">
              <Clock className="size-8 text-[#00AC4F] stroke-[1.8]" />
            </div>
            <div>
              <span className="text-[14px] text-[#ACACAC] block mb-1">Chờ đối soát đối tác</span>
              <span className="text-[32px] font-semibold text-[#333333] leading-none block mb-2">
                115.8M ₫
              </span>
              <div className="flex items-center gap-1 text-[12px]">
                <span className="font-semibold text-slate-500">Chu kỳ ngày 15 & 30</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Transactions Table Card */}
      <div className="w-full bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)]">
        {/* Method Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
              Cổng thanh toán:
            </span>
            {[
              { key: "all", label: "Tất cả phương thức" },
              { key: "vietqr", label: "VietQR Banking" },
              { key: "vnpay", label: "VNPay QR" },
              { key: "momo", label: "MoMo" },
              { key: "visa", label: "Thẻ Quốc tế (Visa/Mastercard)" },
            ].map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setSelectedMethod(m.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  selectedMethod === m.key
                    ? "bg-[#5932EA] text-white shadow-xs"
                    : "bg-[#F9FBFF] text-slate-600 hover:bg-slate-100"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => alert("Xuất file báo cáo tài chính định dạng Excel (.xlsx) thành công.")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            <Download className="size-3.5 text-[#5932EA]" />
            <span>Xuất sao kê Excel</span>
          </button>
        </div>

        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
          <div>
            <h2 className="text-[22px] font-semibold text-black leading-tight">
              All Transactions
            </h2>
            <p className="text-[14px] font-normal text-[#16C098] mt-1">
              Confirmed Tour Bookings & Incomes
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-4">
            <div className="relative w-full sm:w-[216px] h-[38px] bg-[#F9FBFF] rounded-[10px] flex items-center px-3.5 gap-2 border border-slate-100 focus-within:border-indigo-300 transition">
              <Search className="size-4 text-[#7E7E7E] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transaction..."
                className="w-full bg-transparent text-[12px] text-[#292D32] placeholder-[#B5B7C0] outline-hidden font-normal"
              />
            </div>

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
                <div className="absolute right-0 top-11 z-20 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5">
                  {(["Newest", "Amount High-Low"] as const).map((opt) => (
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#EEEEEE]">
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[18%]">
                  Transaction Code
                </th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[22%]">
                  Customer & Organization
                </th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[22%]">
                  Tour Service
                </th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[14%]">
                  Payment Method
                </th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] w-[14%]">
                  Amount
                </th>
                <th className="pb-4 text-[14px] font-medium text-[#B5B7C0] text-center w-[10%]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EEEEEE]">
              {filteredTransactions.map((tx) => {
                const isActive = tx.status === "Active";

                return (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-5 pr-2">
                      <span className="font-mono text-[13px] font-medium text-[#5932EA]">
                        {tx.txCode}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {tx.date}
                      </span>
                    </td>

                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                      {tx.customerName}
                    </td>

                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2 truncate max-w-[200px]">
                      {tx.service}
                    </td>

                    <td className="py-5 text-[14px] font-medium text-[#292D32] pr-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-semibold">
                        {tx.method}
                      </span>
                    </td>

                    <td className="py-5 text-[14px] font-semibold text-[#292D32] pr-2">
                      {tx.amount}
                    </td>

                    <td className="py-5 text-center">
                      <span
                        className={`inline-flex items-center justify-center min-w-[80px] px-3 py-1 rounded-[4px] text-[14px] font-medium tracking-[0.14px] transition select-none ${
                          isActive
                            ? "bg-[rgba(22,192,152,0.38)] outline-1 outline-[#00B087] -outline-offset-1 text-[#008767]"
                            : "bg-[#FFC5C5] outline-1 outline-[#DF0404] -outline-offset-1 text-[#DF0404]"
                        }`}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-7 pt-2">
          <p className="text-[14px] font-medium text-[#B5B7C0]">
            Showing data 1 to {Math.min(filteredTransactions.length, 8)} of 1,248 entries
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52]"
            >
              &lt;
            </button>
            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#5932EA] outline-1 outline-[#5932EA] -outline-offset-1 flex items-center justify-center text-[12px] font-semibold text-white"
            >
              1
            </button>
            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52]"
            >
              2
            </button>
            <span className="text-[12px] font-medium text-black px-0.5">...</span>
            <button
              type="button"
              className="size-7 rounded-[4px] bg-[#F5F5F5] outline-1 outline-[#EEEEEE] -outline-offset-1 flex items-center justify-center text-[12px] font-medium text-[#404B52]"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
