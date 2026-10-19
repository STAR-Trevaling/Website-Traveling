import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 1. Check Vercel edge geolocation headers
    const vercelLat = request.headers.get("x-vercel-ip-latitude");
    const vercelLng = request.headers.get("x-vercel-ip-longitude");
    const vercelCity = request.headers.get("x-vercel-ip-city");
    const vercelCountry = request.headers.get("x-vercel-ip-country");

    if (vercelLat && vercelLng) {
      const lat = parseFloat(vercelLat);
      const lng = parseFloat(vercelLng);
      if (!isNaN(lat) && !isNaN(lng)) {
        return NextResponse.json({
          source: "vercel_edge",
          lat,
          lng,
          city: vercelCity ? decodeURIComponent(vercelCity) : undefined,
          country: vercelCountry || "VN",
        });
      }
    }

    // 2. Fallback to client IP lookup if not on Vercel or headers missing
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "";

    // Ignore localhost
    if (clientIp && clientIp !== "127.0.0.1" && clientIp !== "::1") {
      try {
        const ipRes = await fetch(`https://ipapi.co/${clientIp}/json/`, {
          signal: AbortSignal.timeout(2500),
        });
        if (ipRes.ok) {
          const data = await ipRes.json();
          if (data?.latitude && data?.longitude) {
            return NextResponse.json({
              source: "ip_lookup",
              lat: Number(data.latitude),
              lng: Number(data.longitude),
              city: data.city || data.region,
              country: data.country_name || "VN",
            });
          }
        }
      } catch {
        // Fallback continues
      }
    }

    // 3. Default fallback: Hanoi center coordinates
    return NextResponse.json({
      source: "default_fallback",
      lat: 21.0285,
      lng: 105.8542,
      city: "Hà Nội",
      country: "VN",
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        source: "fallback",
        lat: 21.0285,
        lng: 105.8542,
        city: "Hà Nội",
        country: "VN",
      },
      { status: 200 }
    );
  }
}
