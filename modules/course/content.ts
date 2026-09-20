import type { CourseContentMap, LessonContent } from "./types";
import { understandingAbacusContent } from "./understanding-abacus-content";
import { anzanContent } from "./anzan-content";
import { zhuxinsuanContent } from "./zhuxinsuan-content";
import { chineseNumbersContent } from "./chinese-numbers-content";
import { bridgeEngineeringContent } from "./bridge-engineering-content";

export const courseContentRegistry: Record<string, CourseContentMap> = {
  "understanding-abacus": understandingAbacusContent,
  "anzan-mental-math": anzanContent,
  zhuxinsuan: zhuxinsuanContent,
  "chinese-numbers": chineseNumbersContent,
  "bridge-engineering": bridgeEngineeringContent,
};

export function getLessonContent(
  courseSlug: string,
  levelSlug: string,
  lessonSlug: string,
): LessonContent | undefined {
  return courseContentRegistry[courseSlug]?.[levelSlug]?.[lessonSlug];
}
