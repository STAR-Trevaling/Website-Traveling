import { Users, UserCheck, Monitor, ArrowUp, ArrowDown } from "lucide-react";

export function StatCards() {
  return (
    <section
      aria-label="Thống kê tổng quan"
      className="w-full bg-white rounded-[30px] p-7 md:p-8 shadow-[0px_10px_60px_rgba(226,236,249,0.50)] font-poppins mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#F0F0F0]">
        {/* Card 1: Total Customers */}
        <div className="flex items-center gap-5 pb-6 md:pb-0 md:pr-6">
          {/* Icon Circle 84px with gradient background from template */}
          <div className="size-[84px] shrink-0 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center shadow-xs">
            <Users className="size-8 text-[#00AC4F] stroke-[1.8]" />
          </div>

          <div className="flex flex-col">
            <span className="text-[14px] font-normal text-[#ACACAC] mb-1">
              Total Customers
            </span>
            <span className="text-[32px] font-semibold text-[#333333] leading-none mb-2">
              5,423
            </span>
            <div className="flex items-center gap-1 text-[12px]">
              <ArrowUp className="size-3.5 text-[#00AC4F] stroke-[2.5]" />
              <span className="font-bold text-[#00AC4F]">16%</span>
              <span className="font-normal text-[#292D32]">this month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Members */}
        <div className="flex items-center gap-5 py-6 md:py-0 md:px-8">
          {/* Icon Circle 84px with gradient background */}
          <div className="size-[84px] shrink-0 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center shadow-xs">
            <UserCheck className="size-8 text-[#00AC4F] stroke-[1.8]" />
          </div>

          <div className="flex flex-col">
            <span className="text-[14px] font-normal text-[#ACACAC] mb-1">
              Members
            </span>
            <span className="text-[32px] font-semibold text-[#333333] leading-none mb-2">
              1,893
            </span>
            <div className="flex items-center gap-1 text-[12px]">
              <ArrowDown className="size-3.5 text-[#D0004B] stroke-[2.5]" />
              <span className="font-bold text-[#D0004B]">1%</span>
              <span className="font-normal text-[#292D32]">this month</span>
            </div>
          </div>
        </div>

        {/* Card 3: Active Now */}
        <div className="flex items-center gap-5 pt-6 md:pt-0 md:pl-8">
          {/* Icon Circle 84px with gradient background */}
          <div className="size-[84px] shrink-0 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center shadow-xs">
            <Monitor className="size-8 text-[#00AC4F] stroke-[1.8]" />
          </div>

          <div className="flex flex-col">
            <span className="text-[14px] font-normal text-[#ACACAC] mb-1">
              Active Now
            </span>
            <span className="text-[32px] font-semibold text-[#333333] leading-none mb-2">
              189
            </span>

            {/* Overlapping active user avatars matching template */}
            <div className="flex items-center -space-x-2 pt-0.5">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80"
                alt="Active member 1"
                className="size-6 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80"
                alt="Active member 2"
                className="size-6 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80"
                alt="Active member 3"
                className="size-6 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64&q=80"
                alt="Active member 4"
                className="size-6 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=64&h=64&q=80"
                alt="Active member 5"
                className="size-6 rounded-full border-2 border-white object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
