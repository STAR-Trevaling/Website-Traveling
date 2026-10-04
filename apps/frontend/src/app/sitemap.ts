import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://startravels.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/",              priority: 1.0,  changeFrequency: "daily" },
    { path: "/destinations",  priority: 0.9,  changeFrequency: "daily" },
    { path: "/experiences",   priority: 0.9,  changeFrequency: "daily" },
    { path: "/tours",         priority: 0.85, changeFrequency: "weekly" },
    { path: "/stories",       priority: 0.8,  changeFrequency: "weekly" },
    { path: "/partner",       priority: 0.7,  changeFrequency: "monthly" },
    { path: "/about",         priority: 0.6,  changeFrequency: "monthly" },
    { path: "/contact",       priority: 0.6,  changeFrequency: "monthly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
