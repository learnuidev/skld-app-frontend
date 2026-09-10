import type { ReactNode } from "react";

import { LevelSection } from "@/components/courses/course-detail/level-section";
import type { PathLevel } from "@/modules/course/path";

export interface LessonPathProps {
  levels: PathLevel[];
  /** Rendered after the last level — the sticky call-to-action card. */
  children?: ReactNode;
}

/** The scrolling column of levels that the course card sits beside. */
export function LessonPath({ levels, children }: LessonPathProps) {
  return (
    <div className="min-w-0 flex-1 xl:max-w-[488px]">
      {levels.map((level) => (
        <LevelSection key={level.slug} level={level} />
      ))}
      {children}
    </div>
  );
}
