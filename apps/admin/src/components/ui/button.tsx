import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "success"
    | "ghost"
    | "destructive"
    | "purple";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#5932EA] text-white hover:bg-[#522de0] hover:shadow-[0px_8px_25px_rgba(89,50,234,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    purple:
      "bg-[#5932EA] text-white hover:bg-[#522de0] hover:shadow-[0px_8px_25px_rgba(89,50,234,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-[0px_8px_25px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    outline:
      "bg-white text-slate-700 border border-slate-200/90 hover:bg-white hover:border-slate-300 hover:text-slate-900 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:translate-y-0",
    danger:
      "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-white hover:border-rose-300 hover:shadow-[0px_8px_25px_rgba(223,4,4,0.20)] hover:-translate-y-0.5 active:translate-y-0",
    destructive:
      "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-white hover:border-rose-300 hover:shadow-[0px_8px_25px_rgba(223,4,4,0.20)] hover:-translate-y-0.5 active:translate-y-0",
    success:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-white hover:border-emerald-300 hover:shadow-[0px_8px_25px_rgba(22,192,152,0.25)] hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-transparent text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 active:translate-y-0",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 size-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
