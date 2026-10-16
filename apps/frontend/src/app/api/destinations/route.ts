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
