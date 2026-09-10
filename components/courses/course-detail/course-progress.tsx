import { RotateCcw } from "lucide-react";

export interface CourseProgressProps {
  done: number;
  total: number;
  percent: number;
  complete: boolean;
  /** Stored progress is only painted once the client has read it. */
  hydrated?: boolean;
  /** Shown as "Reset progress" when provided and at least one lesson is done. */
  onReset?: () => void;
}

export function CourseProgress({
  done,
  total,
  percent,
  complete,
  hydrated = true,
  onReset,
}: CourseProgressProps) {
  const label = complete ? "Course complete" : `${done} of ${total} lessons done`;

  return (
    <div className="mt-7 border-t-2 border-border pt-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold">{label}</p>
        <span className="text-sm font-bold tabular-nums text-muted-foreground">{percent}%</span>
      </div>

      <div
        role="progressbar"
        aria-label="Course progress"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-foreground transition-all duration-500"
          style={{ width: hydrated ? `${percent}%` : "0%" }}
        />
      </div>

      {done > 0 && onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          <RotateCcw className="size-3" />
          Reset progress
        </button>
      ) : null}
    </div>
  );
}
