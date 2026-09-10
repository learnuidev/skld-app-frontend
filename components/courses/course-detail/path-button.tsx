import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Chunky 3D call-to-action: a coloured face lifted off a darker base. */
const TONES = {
  violet: "bg-violet-500 shadow-[0_4px_0_0_#6d28d9] hover:bg-violet-500/90",
  emerald: "bg-emerald-500 shadow-[0_4px_0_0_#047857] hover:bg-emerald-500/90",
} as const;

export type PathButtonTone = keyof typeof TONES;

export interface PathButtonProps extends Omit<ComponentProps<typeof Link>, "className"> {
  tone?: PathButtonTone;
  className?: string;
  children: ReactNode;
}

export function PathButton({ tone = "violet", className, children, ...linkProps }: PathButtonProps) {
  return (
    <Link
      {...linkProps}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold text-white transition-all active:translate-y-1 active:shadow-none",
        TONES[tone],
        className,
      )}
    >
      {children}
    </Link>
  );
}
