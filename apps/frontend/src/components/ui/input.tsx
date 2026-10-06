import * as React from "react";
import { cn } from "@/lib/utils";
export const Input=React.forwardRef<HTMLInputElement,React.ComponentProps<"input">>(({className,type,...props},ref)=><input type={type} ref={ref} className={cn("flex h-10 w-full border border-input bg-white/90 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-[#0098a2] disabled:opacity-50",className)} {...props}/>); Input.displayName="Input";
