import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  allowedDevOrigins: ["localhost:3000", "192.168.1.6:3000", "192.168.1.6"],
  eslint: {
    // ESLint 9 uses flat config (eslint.config.mjs); lint is verified via 'pnpm lint'
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "c.animaapp.com" }
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  async rewrites() {
    return [
      {
        source: "/packages",
        destination: "/experiences",
      },
    ];
  },
};

export default nextConfig;
