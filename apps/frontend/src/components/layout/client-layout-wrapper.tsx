"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { SiteFooter } from "./site-footer";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal") || pathname?.startsWith("/admin");

  if (isPortal) {
    return (
      <div className="min-h-screen w-full bg-[#FAFBFF] text-[#292D32] font-poppins relative z-10">
        {children}
      </div>
    );
  }

  return (
    <>
      {/* Global background: Nha Trang beach for user pages only */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden select-none">
        <Image
          src="/assets/nha-trang-beach-bg.jpg"
          alt="Bãi biển Nha Trang — Star Travels Vietnam"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#eaf4f2]/30" />
      </div>

      <div className="flex-1 relative z-0">{children}</div>
      <SiteFooter />
    </>
  );
}
