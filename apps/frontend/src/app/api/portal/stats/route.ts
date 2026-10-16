import { NextResponse } from "next/server";
import { portalStore } from "@/lib/portal-sync";

export async function GET() {
  const stats = portalStore.getStats();
  return NextResponse.json({
    ok: true,
    stats,
  });
}
