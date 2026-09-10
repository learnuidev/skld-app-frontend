import { LevelHeader } from "@/components/courses/course-detail/level-header";
import { LessonNodeRow } from "@/components/courses/course-detail/lesson-node-row";
import type { PathLevel } from "@/modules/course/path";

export interface LevelSectionProps {
  level: PathLevel;
}

/** One level of the path: a sticky header followed by its lesson nodes. */
export function LevelSection({ level }: LevelSectionProps) {
  return (
    <section aria-label={`Level ${level.number}: ${level.name}`}>
      <div className="sticky top-[72px] z-30">
        <LevelHeader number={level.number} name={level.name} status={level.status} />
      </div>

      <div className="flex flex-col items-center gap-[30px] pb-[60px] pt-[45px]">
        {level.lessons.map((lesson, position) => (
          <LessonNodeRow key={lesson.key} lesson={lesson} position={position} />
        ))}
      </div>
    </section>
  );
}
