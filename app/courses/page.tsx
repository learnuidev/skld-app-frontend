import { Lock, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import LearningPath from "@/components/courses/learning-path";
import { courseCatalog, getCourseBySlug } from "@/modules/course/catalog";
import type { Course, CourseSummary } from "@/modules/course/types";

function ComingSoonCard({ course }: { course: CourseSummary }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div
        className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${course.heroAccent}`}
      >
        <span className="text-6xl font-bold text-white/80 drop-shadow">
          {course.subject.slice(0, 1)}
        </span>
        <span className="absolute left-4 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
          {course.subject}
        </span>
        <span className="absolute right-4 top-3 inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground backdrop-blur">
          <Lock className="size-3" />
          Coming soon
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-bold tracking-tight">{course.title}</h3>
        <p className="text-sm font-medium text-muted-foreground">{course.tagline}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground/90">{course.description}</p>
        <div className="mt-auto pt-3 text-xs font-medium text-muted-foreground">
          {course.lessonCount} lessons · {course.exerciseCount} exercises
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const available = courseCatalog.filter((course) => course.status === "available");
  const comingSoon = courseCatalog.filter((course) => course.status === "coming-soon");
  const abacusCourses = available
    .map((summary) => getCourseBySlug(summary.slug))
    .filter((course): course is Course => Boolean(course));

  return (
    <div className="min-h-screen bg-muted">
      <SiteNav className="lg:px-10" />
      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* Page header */}
        <div className="flex flex-wrap items-end justify-between gap-6 pt-14">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Learning Paths</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Step-by-step paths to mastery. Every subject is taught the same way: short, interactive
              lessons that make you think.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-4 pr-1.5 shadow-sm">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-56 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button size="sm" className="px-3">
              Ask
            </Button>
          </div>
        </div>

        {/* Your learning paths */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold tracking-tight">Your learning paths</h2>
          <div className="mt-6">
            <LearningPath courses={abacusCourses} />
          </div>
        </section>

        {/* More on the way */}
        {comingSoon.length > 0 ? (
          <section className="mt-16">
            <h2 className="mb-2 text-3xl font-bold tracking-tight">More on the way</h2>
            <p className="mb-6 max-w-2xl text-muted-foreground">
              <Sparkles className="mr-1 inline size-4" />
              From fractions to programming logic — new courses across every subject are in the works.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comingSoon.map((course) => (
                <ComingSoonCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
