import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/site-nav";
import LessonPlayer from "@/components/courses/lesson-player";
import { getCourseBySlug } from "@/modules/course/catalog";
import { understandingAbacusContent, type LessonBlock } from "@/modules/course/understanding-abacus-content";
import type { CourseLesson } from "@/modules/course/types";

function fallbackContent(lesson: CourseLesson): LessonBlock[] {
  return [
    { type: "paragraph", text: `${lesson.blurb} Take a look below, then try it yourself on the beads.` },
    {
      type: "explore",
      label: "Practice here: click the beads to build numbers.",
      rods: 3,
      initial: [0, 0, 0],
    },
  ];
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; level: string; lesson: string }>;
}): Promise<Metadata> {
  const { slug, level: levelSlug, lesson: lessonSlug } = await props.params;
  const course = getCourseBySlug(slug);
  const level = course?.levels.find((l) => l.slug === levelSlug);
  const lesson = level?.lessons.find((l) => l.slug === lessonSlug);
  if (!course || !level || !lesson) {
    return { title: "Lesson not found · peony" };
  }
  return {
    title: `${lesson.title} · ${course.title} · peony`,
    description: lesson.blurb,
  };
}

export default async function LessonPage(props: {
  params: Promise<{ slug: string; level: string; lesson: string }>;
}) {
  const { slug, level: levelSlug, lesson: lessonSlug } = await props.params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  const level = course.levels.find((l) => l.slug === levelSlug);
  if (!level) notFound();
  const lesson = level.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  const blocks = understandingAbacusContent[level.slug]?.[lesson.slug] ?? fallbackContent(lesson);

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteNav className="lg:px-10" />
      <LessonPlayer course={course} levelSlug={level.slug} lessonSlug={lesson.slug} blocks={blocks} />
    </div>
  );
}
