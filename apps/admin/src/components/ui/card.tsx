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
        "bg-white rounded-[30px] p-6 sm:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)] border-none transition-all",
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
    return <div className={cn("mb-6", className)}>{children}</div>;
  }

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-4 mb-6 pb-2", className)}>
      <div>
        <h2 className="text-[22px] font-semibold text-black tracking-tight font-['Poppins',sans-serif] leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[14px] text-[#16C098] font-normal mt-0.5 font-['Poppins',sans-serif]">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h3 className={cn("text-[20px] font-semibold text-black font-['Poppins',sans-serif]", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mt-4", className)}>{children}</div>;
}
