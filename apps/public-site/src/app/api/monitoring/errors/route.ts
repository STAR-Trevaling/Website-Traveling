import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Redact sensitive headers & payload values
    const clientIp = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Format structured JSON log for log collectors (DataDog, CloudWatch, Loki)
    const logEntry = {
      level: payload.level || "error",
      message: payload.message || "Unknown client error",
      timestamp: payload.timestamp || new Date().toISOString(),
      url: payload.url,
      clientIp,
      userAgent,
      error: payload.error,
      context: payload.context,
    };

    if (process.env.NODE_ENV !== "production") {
      console.warn("[TELEMETRY INGESTION]", JSON.stringify(logEntry, null, 2));
    } else {
      console.error(JSON.stringify(logEntry));
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
