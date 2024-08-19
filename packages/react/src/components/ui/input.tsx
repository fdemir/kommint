import * as React from "react";
import { cn } from "src/utils/style";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "k-flex k-h-10 k-w-full k-p-0 k-rounded-md k-border k-border-input k-px-3 k-text-sm k-ring-offset-background placeholder:k-text-muted-foreground focus-visible:k-outline-none focus-visible:k-ring-2 focus-visible:k-ring-ring focus-visible:k-ring-offset-2 disabled:k-cursor-not-allowed disabled:k-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
