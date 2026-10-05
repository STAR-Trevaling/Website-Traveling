import { NextResponse } from "next/server";
import { portalStore } from "@/lib/portal-sync";

export async function GET() {
  const tours = portalStore.getTours().filter((t) => t.status === "Active");
  return NextResponse.json({
    ok: true,
    total: tours.length,
    tours,
  });
}
