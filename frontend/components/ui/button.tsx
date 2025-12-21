import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border-2 border-border text-sm font-display uppercase tracking-widest font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-0 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:-translate-y-0.5 hover:translate-x-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_var(--color-navy)] hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-[4px_4px_0px_0px_var(--color-navy)] hover:bg-destructive/90",
        outline:
          "bg-background text-foreground shadow-[4px_4px_0px_0px_var(--color-navy)] hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[4px_4px_0px_0px_var(--color-navy)] hover:bg-secondary/80",
        ghost:
          "border-transparent shadow-none hover:bg-accent hover:text-accent-foreground active:translate-x-0 active:translate-y-0",
        link: "text-primary underline-offset-4 shadow-none border-none hover:underline active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
