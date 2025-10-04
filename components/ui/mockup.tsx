import * as React from "react"

import { cn } from "@/lib/utils"

const Mockup: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={cn("flex relative z-10 overflow-hidden shadow-2xl border border-border/5 border-t-border/15 rounded-md", className)}>
    {children}
  </div>
);

export { Mockup }