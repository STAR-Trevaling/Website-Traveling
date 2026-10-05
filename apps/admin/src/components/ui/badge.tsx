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
  const v = (variant || "").toLowerCase();

  let style = "bg-white text-slate-700 border border-slate-200";

  if (
    v === "active" ||
    v === "published" ||
    v === "approved" ||
    v === "indexed" ||
    v === "converted" ||
    v === "success"
  ) {
    style = "bg-[rgba(22,192,152,0.38)] border border-[#00B087] text-[#008767]";
  } else if (
    v === "inactive" ||
    v === "rejected" ||
    v === "failed" ||
    v === "removed" ||
    v === "suspended" ||
    v === "lost" ||
    v === "destructive"
  ) {
    style = "bg-[#FFC5C5] border border-[#DF0404] text-[#DF0404]";
  } else if (
    v === "pending" ||
    v === "under_review" ||
    v === "pending_review" ||
    v === "submitted" ||
    v === "changes_requested" ||
    v === "reported" ||
    v === "assigned" ||
    v === "warning"
  ) {
    style = "bg-[#FEF0C7] border border-[#FEDF89] text-[#B54708]";
  } else if (v === "draft" || v === "not_indexed" || v === "archived") {
    style = "bg-[#F2F4F7] border border-[#EAECF0] text-[#475467]";
  } else if (v === "purple" || v === "lead") {
    style = "bg-[#ECE7FF] border border-[#5932EA]/40 text-[#5932EA]";
  } else if (v === "info") {
    style = "bg-[#EEF4FF] border border-[#C7D7FE] text-[#3538CD]";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-3.5 py-1 rounded-[4px] text-[13px] font-medium tracking-normal select-none font-['Poppins',sans-serif]",
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
