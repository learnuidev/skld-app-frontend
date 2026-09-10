import { BookOpen, Clock, Dumbbell } from "lucide-react";
import type { ReactNode } from "react";

import { courseHours } from "@/modules/course/path";

function Metric({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
      {icon}
      {children}
    </span>
  );
}

export interface CourseMetricsProps {
  lessonCount: number;
  exerciseCount: number;
  lessonMinutes: number;
}

/** "26 Lessons · 74 Exercises · 1h" — the at-a-glance course facts. */
export function CourseMetrics({ lessonCount, exerciseCount, lessonMinutes }: CourseMetricsProps) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      <Metric icon={<BookOpen className="size-4" />}>{lessonCount} Lessons</Metric>
      <Metric icon={<Dumbbell className="size-4" />}>{exerciseCount} Exercises</Metric>
      <Metric icon={<Clock className="size-4" />}>{courseHours(lessonMinutes)}h</Metric>
    </div>
  );
}
