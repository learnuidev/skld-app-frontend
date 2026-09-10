import type { Metadata } from "next";

import { SiteNav } from "@/components/site-nav";
import CoursesBrowser from "@/components/courses/courses-browser";
import { buildLearningPaths } from "@/modules/course/paths";

export const metadata: Metadata = {
  title: "Courses · peony",
  description:
    "Step-by-step learning paths in the abacus, math, coding, and science — short interactive courses that make you think.",
};

// Path definitions are static, so resolve them once at module scope.
const { paths, defaultStarred } = buildLearningPaths();

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pb-24">
        <CoursesBrowser paths={paths} defaultStarred={defaultStarred} />
      </main>
    </div>
  );
}
