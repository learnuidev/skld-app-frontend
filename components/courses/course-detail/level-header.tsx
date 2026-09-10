import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { LevelStatus } from "@/modules/course/path";

const TONES: Record<LevelStatus, { base: string; label: string }> = {
  done: { base: "bg-emerald-400", label: "text-emerald-700" },
  active: { base: "bg-violet-400", label: "text-violet-700" },
  upcoming: { base: "bg-border", label: "text-muted-foreground" },
};

export interface LevelHeaderProps {
  /** 1-based level number. */
  number: number;
  name: string;
  status: LevelStatus;
  className?: string;
}

/**
 * The pill that heads each level on the path: a white face sitting on a
 * coloured base, with a soft fade so lesson nodes slide underneath it.
 */
export function LevelHeader({ number, name, status, className }: LevelHeaderProps) {
  const tone = TONES[status];

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn(
          "absolute left-1/2 top-0 h-[72px] w-[calc(100%-28px)] -translate-x-1/2 rounded-[18px]",
          tone.base,
        )}
      />
      <div className="relative z-10 flex h-16 w-full items-center justify-center rounded-[18px] bg-background px-4">
        <h2 className="flex flex-col items-center gap-0.5 text-center">
          <span className={cn("text-[11px] font-bold uppercase tracking-[0.18em]", tone.label)}>
            Level {number}
          </span>
          <span className="text-sm font-medium">{name}</span>
        </h2>
        {status === "done" ? (
          <span className="absolute right-4 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
            <Check className="size-3" strokeWidth={3} />
            Done
          </span>
        ) : null}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-8 bg-gradient-to-b from-background to-transparent"
      />
    </div>
  );
}
