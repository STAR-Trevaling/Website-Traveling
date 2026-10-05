import { NextResponse } from "next/server";
import { portalStore } from "@/lib/portal-sync";

export async function GET() {
  const destinations = portalStore.getDestinations();
  return NextResponse.json({
    ok: true,
    total: destinations.length,
    destinations,
  });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...partial } = body;
    if (!id) {
      return NextResponse.json({ ok: false, message: "Thiếu destination id" }, { status: 400 });
    }

    portalStore.updateDestination(id, partial);
    return NextResponse.json({ ok: true, message: "Đã cập nhật danh thắng thành công" });
  } catch {
    return NextResponse.json({ ok: false, message: "Lỗi cập nhật danh thắng" }, { status: 500 });
  }
}
