"use client";

import { Check, Play, Star } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The 3D "pebble" lesson marker used on the course path. The geometry is a
 * thin disc drawn as two offset ellipses (a darker rim behind a lighter face),
 * so a single SVG can be recoloured for every node state.
 */
const OUTLINE =
  "M131.025 149.242C109.966 161.892 75.8224 161.891 54.7634 149.242C33.704 136.592 33.704 116.083 54.7634 103.434C75.8224 90.7845 109.966 90.7844 131.025 103.434C152.084 116.084 152.084 136.592 131.025 149.242ZM140.3 163.281C114.119 178.805 71.6697 178.805 45.4881 163.281C19.3065 147.757 19.3065 122.587 45.4881 107.063C71.6697 91.5383 114.119 91.5383 140.3 107.063C166.482 122.587 166.482 147.757 140.3 163.281Z";
const RIM =
  "M140.3 163.281C114.119 178.805 71.6697 178.805 45.4881 163.281C19.3065 147.757 19.3065 122.587 45.4881 107.063C71.6697 91.5382 114.119 91.5382 140.3 107.063C166.482 122.587 166.482 147.757 140.3 163.281Z";
const FACE =
  "M54.7632 149.242C75.8222 161.892 109.966 161.892 131.025 149.242C152.084 136.593 152.084 116.084 131.025 103.435C109.966 90.785 75.8222 90.7852 54.7632 103.435C33.7039 116.084 33.7039 136.593 54.7632 149.242Z";

export type PathNodeState = "done" | "current" | "upcoming";

const PALETTE: Record<PathNodeState, { rim: string; face: string; symbol: string }> = {
  done: { rim: "#047857", face: "#34d399", symbol: "text-white" },
  current: { rim: "#6d28d9", face: "#a78bfa", symbol: "text-white" },
  upcoming: { rim: "#94a3b8", face: "#eef2f6", symbol: "text-slate-500" },
};

export function PathNode({
  state,
  index,
  kind = "lesson",
  className,
}: {
  state: PathNodeState;
  /** 1-based position of the lesson, shown on upcoming nodes. */
  index: number;
  kind?: "lesson" | "level_check";
  className?: string;
}) {
  const palette = PALETTE[state];

  let symbol: ReactNode;
  if (state === "done") {
    symbol = <Check className="size-6" strokeWidth={3.5} />;
  } else if (kind === "level_check") {
    symbol = (
      <Star
        className={cn("size-6", state === "current" ? "fill-white/30" : "fill-slate-400/40")}
        strokeWidth={2.5}
      />
    );
  } else if (state === "current") {
    symbol = <Play className="size-6 translate-x-[1px] fill-current" />;
  } else {
    symbol = <span className="text-lg font-bold leading-none">{index}</span>;
  }

  return (
    <span className={cn("relative block h-[134px] w-[128px] shrink-0", className)}>
      {state === "current" ? (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 scale-90 rounded-full bg-violet-300/40 blur-xl"
        />
      ) : null}
      <svg
        viewBox="0 0 186 195"
        className="absolute inset-0 h-full w-full drop-shadow-sm"
        aria-hidden
      >
        <path d={OUTLINE} fill="#0b1220" />
        <path d={RIM} fill={palette.rim} />
        <path d={FACE} fill={palette.face} />
        <ellipse cx="93" cy="116" rx="45" ry="24" fill="#ffffff" opacity="0.22" />
      </svg>
      <span
        className={cn(
          "absolute left-1/2 top-[64.8%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center",
          palette.symbol,
        )}
      >
        {symbol}
      </span>
    </span>
  );
}
