import type { MetadataRoute } from "next";
import {
  ALL_VIETNAM_DESTINATIONS,
  VIETNAM_TOURS,
  VIETNAM_EXPERIENCES,
  VIETNAM_STORIES,
} from "@/data/seed";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://startravels.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/destinations", priority: 0.9, changeFrequency: "daily" },
    { path: "/experiences", priority: 0.9, changeFrequency: "daily" },
    { path: "/tours", priority: 0.85, changeFrequency: "weekly" },
    { path: "/stories", priority: 0.8, changeFrequency: "weekly" },
    { path: "/partner", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  ];

  const destinationRoutes = ALL_VIETNAM_DESTINATIONS.map((d) => ({
    path: `/destinations/${d.slug}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
  }));

  const tourRoutes = VIETNAM_TOURS.map((t) => ({
    path: `/tours/${t.slug}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
  }));

  const experienceRoutes = VIETNAM_EXPERIENCES.map((e) => ({
    path: `/experiences/${e.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  const storyRoutes = VIETNAM_STORIES.map((s) => ({
    path: `/stories/${s.slug}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  }));

  const allRoutes = [
    ...staticRoutes,
    ...destinationRoutes,
    ...tourRoutes,
    ...experienceRoutes,
    ...storyRoutes,
  ];

  return allRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
