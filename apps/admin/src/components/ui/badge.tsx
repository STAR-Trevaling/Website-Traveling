import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant?:
    | "active"
    | "inactive"
    | "pending"
    | "draft"
    | "outline"
    | "info"
    | "warning"
    | "destructive"
    | "purple"
    | "success"
    | string;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "outline", className, children }: BadgeProps) {
  const v = variant.toLowerCase();

  let style = "bg-white text-slate-700 border border-slate-200";

  if (v === "active" || v === "published" || v === "approved" || v === "indexed" || v === "converted" || v === "success") {
    style = "bg-[rgba(22,192,152,0.18)] text-[#008767] border border-[#00B087]/50";
  } else if (v === "inactive" || v === "rejected" || v === "failed" || v === "removed" || v === "suspended" || v === "lost" || v === "destructive") {
    style = "bg-rose-50 text-[#DF0404] border border-rose-200";
  } else if (v === "pending" || v === "under_review" || v === "pending_review" || v === "submitted" || v === "changes_requested" || v === "reported" || v === "assigned" || v === "warning") {
    style = "bg-amber-50 text-[#B54708] border border-amber-200";
  } else if (v === "draft" || v === "not_indexed" || v === "archived") {
    style = "bg-slate-100 text-slate-600 border border-slate-200";
  } else if (v === "purple" || v === "lead") {
    style = "bg-indigo-50 text-[#5932EA] border border-indigo-200";
  } else if (v === "info") {
    style = "bg-blue-50 text-blue-700 border border-blue-200";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide select-none",
        style,
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={status}>{status}</Badge>;
}
