export type CustomerStatus = "Active" | "Inactive";

export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: CustomerStatus;
  avatarUrl?: string;
  tourPackage?: string;
  joinDate?: string;
  totalSpent?: string;
  notes?: string;
}

export interface StatMetric {
  title: string;
  value: string;
  trendText: string;
  trendDirection: "up" | "down" | "neutral";
  iconType: "users" | "member-check" | "active-screen";
  subtext?: string;
}
