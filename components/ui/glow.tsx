import * as React from "react"

import { cn } from "@/lib/utils"

const Glow: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("absolute w-full -top-[128px]", className)}>
    <div className="absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--brand-foreground)/.5)_10%,_hsla(var(--brand-foreground)/0)_60%)] sm:h-[512px]" />
    <div className="absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--brand)/.3)_10%,_hsla(var(--brand-foreground)/0)_60%)] sm:h-[256px]" />
  </div>
);

export { Glow }