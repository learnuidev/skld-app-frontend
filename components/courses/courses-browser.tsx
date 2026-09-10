"use client";

import { Fragment, useEffect, useMemo, useState } from "react";

import { LearningPathRow } from "@/components/courses/learning-path-row";
import { readProgress } from "@/modules/course/progress";
import type { PathCourse, PathWithCourses } from "@/modules/course/paths";

const STARRED_KEY = "peony.starred-paths";

function readStarredPaths(fallback: string[]): string[] {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(STARRED_KEY);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return fallback;
  }
}

function writeStarredPaths(slugs: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STARRED_KEY, JSON.stringify(slugs));
  } catch {
    // ignore quota / private-mode errors
  }
}

function coursePercent(course: PathCourse, done: number) {
  if (course.lessonCount === 0) return 0;
  return Math.round((Math.min(done, course.lessonCount) / course.lessonCount) * 100);
}

function pathPercent(courses: PathCourse[], done: Record<string, number>) {
  let completed = 0;
  let total = 0;
  for (const course of courses) {
    total += course.lessonCount;
    completed += Math.min(done[course.slug] ?? 0, course.lessonCount);
  }
  return total === 0 ? 0 : Math.round((completed / total) * 100);
}

function matches(entry: PathWithCourses, query: string): PathCourse[] {
  const { path, courses } = entry;
  const pathText = `${path.title} ${path.badge} ${path.description}`.toLowerCase();
  if (pathText.includes(query)) return courses;
  return courses.filter((course) =>
    `${course.title} ${course.subject} ${course.tagline}`.toLowerCase().includes(query),
  );
}

export interface CoursesBrowserProps {
  paths: PathWithCourses[];
  /** Path slugs starred for a learner who has never toggled a star. */
  defaultStarred: string[];
}

/**
 * The courses page body: the search field plus the "Your learning paths" and
 * "Other learning paths" sections. Progress and starred paths come from
 * localStorage, so both are read after mount to keep the first paint stable.
 */
export function CoursesBrowser({ paths, defaultStarred }: CoursesBrowserProps) {
  const [query, setQuery] = useState("");
  const [done, setDone] = useState<Record<string, number> | null>(null);
  const [starred, setStarred] = useState<string[] | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const counts: Record<string, number> = {};
      paths.forEach(({ courses }) => {
        courses.forEach((course) => {
          counts[course.slug] = readProgress(course.slug).length;
        });
      });
      setDone(counts);
      setStarred(readStarredPaths(defaultStarred));
    }, 0);
    return () => window.clearTimeout(id);
  }, [paths, defaultStarred]);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalizedQuery) return paths;
    return paths
      .map((entry) => ({ path: entry.path, courses: matches(entry, normalizedQuery) }))
      .filter((entry) => entry.courses.length > 0);
  }, [paths, normalizedQuery]);

  const starredSet = useMemo(
    () => new Set(starred ?? defaultStarred),
    [starred, defaultStarred],
  );

  const starredPaths = filtered.filter((entry) => starredSet.has(entry.path.slug));
  const otherPaths = filtered.filter((entry) => !starredSet.has(entry.path.slug));

  const toggleStar = (slug: string) => {
    setStarred((current) => {
      const base = current ?? defaultStarred;
      const next = base.includes(slug)
        ? base.filter((item) => item !== slug)
        : [...base, slug];
      writeStarredPaths(next);
      return next;
    });
  };

  const sections = [
    { key: "starred", title: "Your learning paths", entries: starredPaths },
    { key: "other", title: "Other learning paths", entries: otherPaths },
  ].filter((section) => section.entries.length > 0);

  const progress = done ?? {};

  return (
    // Same container as the site nav, so the page lines up with it edge to edge.
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <header className="pb-4 pt-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Learning Paths</h1>
            <p className="mt-1 text-base text-muted-foreground">
              Step-by-step paths to mastery
            </p>
          </div>

          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="w-full lg:w-[340px] lg:shrink-0"
          >
            <div className="flex w-full items-center gap-2 rounded-full border-2 border-border bg-card py-1 pl-4 pr-1 transition-colors focus-within:border-ring hover:border-ring">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="What do you want to learn?"
                aria-label="Search learning paths"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-muted px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                Ask
              </button>
            </div>
          </form>
        </div>
      </header>

      {sections.map((section, index) => (
        <Fragment key={section.key}>
          {index > 0 ? <div className="my-12 h-px bg-border lg:mb-16 lg:mt-20" /> : null}

          <section
            aria-labelledby={`${section.key}-paths-heading`}
            className={index === 0 ? "mt-8" : undefined}
          >
            <h2 id={`${section.key}-paths-heading`} className="text-2xl font-bold tracking-tight">
              {section.title}
            </h2>

            <ul className="mt-6 flex flex-col gap-6 lg:gap-12">
              {section.entries.map(({ path, courses }) => (
                <LearningPathRow
                  key={path.slug}
                  path={path}
                  courses={courses}
                  percent={pathPercent(courses, progress)}
                  coursePercents={Object.fromEntries(
                    courses.map((course) => [
                      course.slug,
                      coursePercent(course, progress[course.slug] ?? 0),
                    ]),
                  )}
                  hydrated={done !== null}
                  starred={starredSet.has(path.slug)}
                  onToggleStar={toggleStar}
                />
              ))}
            </ul>
          </section>
        </Fragment>
      ))}

      {filtered.length === 0 ? (
        <p className="pt-10 text-base text-muted-foreground">
          No learning paths match “{query.trim()}”.
        </p>
      ) : null}
    </div>
  );
}

export default CoursesBrowser;
