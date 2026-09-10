"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * The lesson call to action: a pill that sits proud of the page and drops onto
 * its own shadow when pressed. The bottom shadow is what sells the lift, so
 * every variant carries one.
 */
export const pillVariants = cva(
  "relative inline-flex h-12 min-w-24 shrink-0 cursor-pointer items-center justify-center rounded-full px-6 text-base font-medium whitespace-nowrap transition-[background-color,box-shadow,transform,opacity] duration-150 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        /** Dark board CTA — "Check", "Continue" before an answer. */
        primary:
          "bg-lesson-cta text-lesson-cta-fg shadow-[0_4px_0_0_var(--lesson-cta-shadow)] hover:opacity-90 active:shadow-[0_2px_0_0_var(--lesson-cta-shadow)]",
        /** Green CTA — the design's confirmed-correct "Continue". */
        success:
          "bg-lesson-correct text-white shadow-[0_4px_0_0_var(--lesson-correct-deep)] hover:opacity-90 active:shadow-[0_2px_0_0_var(--lesson-correct-deep)]",
        /** Quiet pill — "Why?", "Try again". */
        secondary:
          "bg-lesson-soft text-foreground shadow-none hover:bg-lesson-line active:translate-y-0",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export function PillButton({
  className,
  variant = "primary",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof pillVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="pill-button"
      data-variant={variant}
      className={cn(pillVariants({ variant, className }))}
      {...props}
    />
  );
}
