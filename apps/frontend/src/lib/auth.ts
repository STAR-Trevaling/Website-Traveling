import "server-only";
import { cookies } from "next/headers";
import type { CurrentUser } from "@/lib/types";

const BASE = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

export async function authenticatedFetch(path:string, init:RequestInit={}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("travel_access")?.value;
  if (!token) throw new Error("AUTH_REQUIRED");
  return fetch(`${BASE}${path}`, { ...init, cache: "no-store", headers: { "Content-Type":"application/json", ...(init.headers||{}), Authorization:`Bearer ${token}` } });
}

export async function getCurrentUser():Promise<CurrentUser|null> {
  try {
    const response = await authenticatedFetch("/auth/me/");
    if (!response.ok) return null;
    return response.json();
  } catch { return null; }
}
