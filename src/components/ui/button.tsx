import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand text-brand-foreground hover:bg-brand/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        secondary: "border border-line bg-surface text-ink hover:bg-canvas",
        ghost: "bg-transparent text-ink hover:bg-brand/5",
        danger: "bg-danger text-danger-foreground hover:bg-danger/90",
      },
      size: {
        md: "min-h-11 px-4 text-sm",
        sm: "min-h-10 px-3 text-sm",
        lg: "min-h-12 px-5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    busy?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild,
  busy,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (asChild) {
    return (
      <Slot className={classes} {...props}>
        {children}
      </Slot>
    );
  }
  return (
    <button
      className={classes}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      type="button"
      {...props}
    >
      {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}

export { buttonVariants };
