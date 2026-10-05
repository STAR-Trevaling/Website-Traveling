import { NextResponse } from "next/server";
import { portalStore } from "@/lib/portal-sync";

export async function GET() {
  const inquiries = portalStore.getInquiries();
  return NextResponse.json({
    ok: true,
    total: inquiries.length,
    inquiries,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json(
        { ok: false, message: "Họ tên và Email không được để trống" },
        { status: 400 }
      );
    }

    const created = portalStore.addInquiry({
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      destination: body.destination || "Tư vấn tổng quát",
      travelDate: body.travelDate || "Chưa xác định",
      guests: body.guests || "1",
      message: body.message || "Yêu cầu tư vấn tour du lịch",
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Yêu cầu tư vấn của bạn đã được gửi thành công đến Star Travels CRM.",
        inquiry: created,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ ok: false, message: "Lỗi xử lý yêu cầu" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ ok: false, message: "Thiếu id hoặc status" }, { status: 400 });
    }

    portalStore.updateInquiryStatus(id, status);
    return NextResponse.json({ ok: true, message: "Đã cập nhật trạng thái yêu cầu" });
  } catch {
    return NextResponse.json({ ok: false, message: "Lỗi cập nhật" }, { status: 500 });
  }
}
