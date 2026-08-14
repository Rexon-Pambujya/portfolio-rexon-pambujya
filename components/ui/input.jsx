import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      // 16px on mobile — anything smaller makes iOS Safari zoom on focus
      "flex h-12 w-full rounded-lg border border-input bg-background px-4 text-base",
      "placeholder:text-muted-foreground/60",
      "transition-colors focus-visible:border-primary focus-visible:outline-none",
      "focus-visible:ring-1 focus-visible:ring-primary",
      "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
