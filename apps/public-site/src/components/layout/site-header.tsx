import { getCurrentUser } from "@/lib/auth";
import { SiteHeaderClient } from "./site-header-client";

interface SiteHeaderProps {
  overlay?: boolean;
}

export async function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const user = await getCurrentUser();
  return <SiteHeaderClient user={user} overlay={overlay} />;
}
