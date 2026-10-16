import { NextResponse } from "next/server";

const BASE = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

export async function POST(request: Request) {
  const input = await request.json();

  try {
    const r = await fetch(`${BASE}/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      cache: "no-store",
    });

    const body = await r.json();
    if (!r.ok) {
      return NextResponse.json({ message: body?.error?.message || body }, { status: r.status });
    }
    return NextResponse.json(body, { status: 201 });
  } catch {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { message: "Registration service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }
    // If backend is offline in local dev, allow registration to succeed for demo
    return NextResponse.json({ ok: true, username: input.username }, { status: 201 });
  }
}
