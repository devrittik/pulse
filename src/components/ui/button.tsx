import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent px-5 py-2.5 text-white hover:brightness-110",
        outline:
          "border border-border bg-card/70 px-5 py-2.5 hover:border-accent",
        ghost: "px-4 py-2 hover:bg-card",
      },
      size: {
        default: "text-sm",
        lg: "px-6 py-3 text-base",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
export { buttonVariants };
