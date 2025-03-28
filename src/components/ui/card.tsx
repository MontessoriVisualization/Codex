import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circle";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border bg-card text-card-foreground shadow",
        variant === "circle" &&
          "rounded-full p-4 flex items-center justify-center",
        variant === "default" && "rounded-xl",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
