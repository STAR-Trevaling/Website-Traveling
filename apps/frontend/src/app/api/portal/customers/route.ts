import { NextResponse } from "next/server";
import { portalStore } from "@/lib/portal-sync";

export async function GET() {
  const customers = portalStore.getCustomers();
  const partners = portalStore.getPartners();
  return NextResponse.json({
    ok: true,
    total: customers.length,
    customers,
    partners,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json(
        { ok: false, message: "Tên và Email không được để trống" },
        { status: 400 }
      );
    }

    const created = portalStore.addCustomer({
      id: `cust-${Date.now()}`,
      name: body.name,
      company: body.company || "Cá nhân",
      phone: body.phone || "",
      email: body.email,
      country: body.country || "Việt Nam",
      status: body.status || "Active",
      tourPackage: body.tourPackage || "Chưa chọn tour",
      joinDate: new Date().toLocaleDateString("vi-VN"),
      totalSpent: body.totalSpent || "0 ₫",
      notes: body.notes || "",
    });

    return NextResponse.json({ ok: true, customer: created }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, message: "Lỗi xử lý dữ liệu" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ ok: false, message: "Thiếu id hoặc status" }, { status: 400 });
    }

    portalStore.updateCustomerStatus(id, status);
    return NextResponse.json({ ok: true, message: "Đã cập nhật trạng thái thành công" });
  } catch {
    return NextResponse.json({ ok: false, message: "Lỗi cập nhật" }, { status: 500 });
  }
}
