import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Luxury frosted-glass breadcrumb pill
 * Ensures 100% WCAG contrast and crystal-clear legibility against any background image
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white/95 backdrop-blur-md border border-white/90 shadow-[0_2px_12px_rgba(0,152,162,0.06)] text-xs transition-all duration-200 select-none ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-1.5 sm:gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-slate-700 hover:text-[#0098a2] font-semibold transition-colors truncate max-w-[140px] sm:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-bold truncate max-w-[160px] sm:max-w-none">
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight className="size-3 text-slate-400 stroke-[2] shrink-0" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
