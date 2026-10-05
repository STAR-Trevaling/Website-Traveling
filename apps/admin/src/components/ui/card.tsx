import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[24px] sm:rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)] border border-slate-100",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
  children,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  if (children) {
    return <div className={cn("mb-4", className)}>{children}</div>;
  }

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100", className)}>
      <div>
        <h2 className="text-[20px] font-semibold text-black leading-tight">{title}</h2>
        {subtitle && <p className="text-[14px] text-slate-400 mt-1 font-normal">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn("text-base font-bold text-slate-900", className)}>{children}</h3>;
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mt-2", className)}>{children}</div>;
}
