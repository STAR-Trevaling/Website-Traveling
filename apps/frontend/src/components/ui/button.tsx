import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", { variants:{ variant:{ default:"bg-[#0098a2] text-white hover:bg-[#087c86]", outline:"border border-current bg-transparent hover:bg-white/10", ghost:"bg-transparent hover:bg-black/5", light:"bg-white text-[#222] hover:bg-white/90" }, size:{ default:"h-10 px-5", sm:"h-8 px-3 text-xs", lg:"h-12 px-8" } }, defaultVariants:{ variant:"default", size:"default" } });
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?:boolean }
export const Button = React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant,size,asChild=false,...props},ref)=>{ const Comp=asChild?Slot:"button"; return <Comp ref={ref} className={cn(buttonVariants({variant,size}),className)} {...props}/>; });
Button.displayName="Button";
export { buttonVariants };
