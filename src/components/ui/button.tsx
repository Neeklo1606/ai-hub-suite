import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-slate-950 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 will-change-transform active:scale-[0.98]",
  {
    variants: {
      variant: {
        // PRIMARY CTA - gradient indigo to purple
        default: "rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold shadow-lg shadow-indigo-500/30 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/50",
        // SECONDARY - transparent with border
        secondary: "rounded-xl bg-transparent border-2 border-slate-500/30 text-slate-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white",
        // OUTLINE - similar to secondary but lighter
        outline: "rounded-xl border-2 border-slate-600/50 bg-transparent text-slate-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white",
        // GHOST - minimal, for icon buttons and subtle actions
        ghost: "rounded-lg bg-transparent text-slate-400 hover:bg-slate-800/50 hover:text-white",
        // LINK - text button style
        link: "text-slate-400 hover:text-indigo-400 underline-offset-4 hover:underline bg-transparent",
        // DESTRUCTIVE
        destructive: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-red-500/20",
        // HERO variant - same as default but larger shadow
        hero: "rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold shadow-lg shadow-indigo-500/40 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/60",
        // HERO OUTLINE - for secondary hero actions
        heroOutline: "rounded-xl bg-transparent border-2 border-slate-600 text-slate-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white",
        // NEON - special effect button
        neon: "rounded-xl relative bg-transparent border-2 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400",
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
