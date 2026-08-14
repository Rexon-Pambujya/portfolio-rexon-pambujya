import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-base",
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
Textarea.displayName = "Textarea";

export { Textarea };
