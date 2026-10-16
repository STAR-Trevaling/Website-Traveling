import { NextResponse } from "next/server";
import { portalStore, SyncTourProduct } from "@/lib/portal-sync";

export async function GET() {
  const tours = portalStore.getTours();
  return NextResponse.json({
    ok: true,
    total: tours.length,
    tours,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.destination) {
      return NextResponse.json(
        { ok: false, message: "Tên tour và Điểm đến không được để trống" },
        { status: 400 }
      );
    }

    const created: SyncTourProduct = {
      id: `tour-${Date.now()}`,
      code: body.code || `TOUR-VN-${Math.floor(10 + Math.random() * 90)}`,
      name: body.name,
      destination: body.destination,
      region: body.region || "north",
      duration: body.duration || "3 Ngày 2 Đêm",
      price: body.price || "2.500.000 ₫",
      numericPrice: Number(body.numericPrice) || 2500000,
      bookings: 0,
      maxSlots: Number(body.maxSlots) || 100,
      status: "Active",
      description: body.description || "Gói tour chất lượng cao do Star Travels Việt Nam tổ chức.",
    };

    portalStore.addTour(created);
    return NextResponse.json({ ok: true, tour: created }, { status: 201 });
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

    portalStore.updateTourStatus(id, status);
    return NextResponse.json({ ok: true, message: "Đã cập nhật trạng thái tour thành công" });
  } catch {
    return NextResponse.json({ ok: false, message: "Lỗi cập nhật" }, { status: 500 });
  }
}
