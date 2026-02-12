import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 will-change-transform active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:scale-105 hover:shadow-xl hover:bg-accent hover:shadow-primary/50",
        secondary: "rounded-xl bg-secondary border border-border text-secondary-foreground hover:border-primary/50 hover:bg-primary/10",
        outline: "rounded-xl border border-border bg-transparent text-foreground hover:border-primary/50 hover:bg-primary/10",
        ghost: "rounded-lg bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-muted-foreground hover:text-primary underline-offset-4 hover:underline bg-transparent",
        destructive: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20",
        hero: "rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/40 hover:scale-105 hover:shadow-xl hover:bg-accent hover:shadow-primary/60",
        heroOutline: "rounded-xl bg-transparent border border-border text-foreground hover:border-primary/50 hover:bg-primary/10",
        neon: "rounded-xl relative bg-transparent border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
      },
      size: {
        default: "h-12 px-8 py-4 text-base",
        sm: "h-10 px-6 py-2 text-sm",
        lg: "h-14 px-10 py-5 text-base font-semibold",
        xl: "h-16 px-12 py-6 text-lg font-semibold",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">Загрузка...</span>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
