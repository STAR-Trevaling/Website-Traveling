import { Customer } from "@/components/portal/types";
import { TEMPLATE_CUSTOMERS, VIETNAM_TRAVEL_CUSTOMERS, PARTNER_INQUIRIES } from "@/components/portal/data";
import { VIETNAM_TOURS } from "@/lib/tours-data";
import { VIETNAM_DESTINATIONS_PAGES } from "@/lib/destinations-data";
import type { Destination } from "@/lib/types";

/**
 * Shared singleton in-memory data store for Star Travels Admin & Public sync.
 * Uses globalThis to ensure state is truly shared across all Next.js API route handlers,
 * Server Actions, and SSR contexts.
 */

export interface InquiryItem {
  id: string;
  ticketCode?: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate?: string;
  guests?: string;
  message: string;
  category?: "tour_advice" | "partner" | "billing" | "custom";
  priority?: "Cao" | "Bình thường";
  createdAt: string;
  status: "Active" | "Inactive";
}

export interface SyncTourProduct {
  id: string;
  code: string;
  name: string;
  destination: string;
  region: "north" | "central" | "south";
  duration: string;
  price: string;
  numericPrice: number;
  bookings: number;
  maxSlots: number;
  status: "Active" | "Inactive";
  description: string;
}

interface GlobalPortalData {
  customers: Customer[];
  partners: Customer[];
  inquiries: InquiryItem[];
  tours: SyncTourProduct[];
  destinations: Destination[];
}

const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: "inq-1",
    ticketCode: "TK-VN-1042",
    name: "Hoàng Anh Tuấn",
    email: "tuan.hoang@vinfast.vn",
    phone: "0912 345 678",
    destination: "Vịnh Hạ Long",
    travelDate: "15/05/2026",
    guests: "12",
    category: "tour_advice",
    priority: "Cao",
    message: "Yêu cầu phòng Tổng Thống và thực đơn gala dinner hải sản riêng trên du thuyền cho đoàn VIP.",
    createdAt: "10 phút trước",
    status: "Active",
  },
  {
    id: "inq-2",
    ticketCode: "TK-VN-1041",
    name: "Du thuyền Paradise Hạ Long",
    email: "partner@paradisevietnam.com",
    phone: "024 3988 7766",
    destination: "Vịnh Hạ Long",
    travelDate: "Mùa hè 2026",
    guests: "Đoàn đối tác",
    category: "partner",
    priority: "Cao",
    message: "Hợp đồng phân phối độc quyền quỹ phòng du thuyền mùa cao điểm 2026 với chính sách hoa hồng đối tác cấp 1.",
    createdAt: "45 phút trước",
    status: "Active",
  },
  {
    id: "inq-3",
    ticketCode: "TK-VN-1040",
    name: "Emma Watson",
    email: "emma.w@britishcouncil.org",
    phone: "+44 7700 900123",
    destination: "Đà Lạt",
    travelDate: "20/05/2026",
    guests: "2",
    category: "tour_advice",
    priority: "Bình thường",
    message: "Tư vấn tour ngắm bình minh đồi chè Cầu Đất và xe 7 chỗ đời mới đón tiễn sân bay Liên Khương.",
    createdAt: "2 giờ trước",
    status: "Active",
  },
  {
    id: "inq-4",
    ticketCode: "TK-VN-1039",
    name: "Trần Đức Minh",
    email: "minh.td@vng.com.vn",
    phone: "0988 765 432",
    destination: "Hội An",
    travelDate: "10/06/2026",
    guests: "4",
    category: "tour_advice",
    priority: "Bình thường",
    message: "Xác nhận lịch lặn ngắm san hô Cù Lao Chàm trong tour Hội An & thả đèn hoa đăng sông Hoài.",
    createdAt: "Hôm qua",
    status: "Inactive",
  },
  {
    id: "inq-5",
    ticketCode: "TK-VN-1038",
    name: "David Wilson",
    email: "david.w@cathaypacific.com",
    phone: "+852 9123 4567",
    destination: "Sa Pa Fansipan",
    travelDate: "28/05/2026",
    guests: "4",
    category: "tour_advice",
    priority: "Cao",
    message: "Cần hướng dẫn viên leo núi tiếng Anh chuyên nghiệp cho cung trekking Fansipan.",
    createdAt: "2 ngày trước",
    status: "Active",
  },
];

const INITIAL_TOURS: SyncTourProduct[] = VIETNAM_TOURS.map((t, idx) => ({
  id: t.id,
  code: `TOUR-${t.region.toUpperCase().slice(0, 2)}-0${idx + 1}`,
  name: t.title,
  destination: t.destination,
  region: t.region,
  duration: t.duration,
  price: `${t.price.toLocaleString("vi-VN")} ₫`,
  numericPrice: t.price,
  bookings: Math.floor(t.reviewCount * 0.7),
  maxSlots: Math.max(100, t.reviewCount + 50),
  status: "Active" as const,
  description: t.overview,
}));

// Initialize singleton on globalThis
const store: GlobalPortalData = ((globalThis as unknown as { __starTravelsPortalStore?: GlobalPortalData }).__starTravelsPortalStore ||= {
  customers: [...TEMPLATE_CUSTOMERS, ...VIETNAM_TRAVEL_CUSTOMERS],
  partners: [...PARTNER_INQUIRIES],
  inquiries: [...INITIAL_INQUIRIES],
  tours: [...INITIAL_TOURS],
  destinations: VIETNAM_DESTINATIONS_PAGES.flat(),
});

export const portalStore = {
  // Customers
  getCustomers: () => [...store.customers],
  getPartners: () => [...store.partners],
  addCustomer: (cust: Customer) => {
    store.customers = [cust, ...store.customers];
    return cust;
  },
  updateCustomerStatus: (id: string, status: "Active" | "Inactive") => {
    store.customers = store.customers.map((c) => (c.id === id ? { ...c, status } : c));
    store.partners = store.partners.map((p) => (p.id === id ? { ...p, status } : p));
  },

  // Inquiries & Support Tickets
  getInquiries: () => [...store.inquiries],
  addInquiry: (inq: Omit<InquiryItem, "id" | "createdAt" | "status" | "ticketCode"> & { category?: InquiryItem["category"]; priority?: InquiryItem["priority"] }) => {
    const ticketNum = 1043 + store.inquiries.length;
    const item: InquiryItem = {
      ...inq,
      id: `inq-${Date.now()}`,
      ticketCode: `TK-VN-${ticketNum}`,
      category: inq.category || "tour_advice",
      priority: inq.priority || "Cao",
      createdAt: "Vừa xong",
      status: "Active",
    };
    store.inquiries = [item, ...store.inquiries];

    // Automatically create a corresponding lead in CRM
    const isPartner = inq.category === "partner" || inq.destination.toLowerCase().includes("đối tác");
    const newCustomerLead: Customer = {
      id: `lead-${item.id}`,
      name: item.name,
      company: isPartner ? item.name : "Khách Đăng Ký Trực Tuyến",
      phone: item.phone,
      email: item.email,
      country: `Việt Nam (${item.destination})`,
      status: "Active",
      tourPackage: isPartner ? "Hồ sơ thẩm định đối tác" : `Tư vấn Tour ${item.destination}`,
      joinDate: new Date().toLocaleDateString("vi-VN"),
      totalSpent: isPartner ? "Thỏa thuận hoa hồng" : "Chờ xác nhận cọc",
      notes: item.message,
    };
    store.customers = [newCustomerLead, ...store.customers];

    if (isPartner) {
      store.partners = [newCustomerLead, ...store.partners];
    }

    return item;
  },
  updateInquiryStatus: (id: string, status: "Active" | "Inactive") => {
    store.inquiries = store.inquiries.map((i) => (i.id === id ? { ...i, status } : i));
  },

  // Tours CMS
  getTours: () => [...store.tours],
  addTour: (tour: SyncTourProduct) => {
    store.tours = [tour, ...store.tours];
    return tour;
  },
  updateTourStatus: (id: string, status: "Active" | "Inactive") => {
    store.tours = store.tours.map((t) => (t.id === id ? { ...t, status } : t));
  },

  // Destinations CMS
  getDestinations: () => [...store.destinations],
  updateDestination: (id: string, partial: Partial<Destination>) => {
    store.destinations = store.destinations.map((d) => (d.id === id ? { ...d, ...partial } : d));
  },

  // Aggregated Realtime Stats for Dashboard
  getStats: () => {
    const totalCustomers = store.customers.length;
    const activeMembers = store.customers.filter((c) => c.status === "Active").length;
    const totalInquiries = store.inquiries.length;
    const activeTours = store.tours.filter((t) => t.status === "Active").length;
    const totalBookings = store.tours.reduce((acc, t) => acc + t.bookings, 0);

    return {
      totalCustomers,
      activeMembers,
      totalInquiries,
      activeTours,
      totalTours: store.tours.length,
      totalBookings,
      revenueText: "842.5M ₫",
      growthMonth: "24.5%",
      travelersOnTour: 189,
      recentInquiries: store.inquiries.slice(0, 5),
    };
  },
};
