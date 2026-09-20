import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LessonPlayer from "@/components/courses/lesson-player";
import { getLessonView } from "@/modules/course/lesson-view";
import { stepIndex } from "@/modules/course/utils";

type LessonParams = { slug: string; level: string; lesson: string; sublesson: string };

export async function generateMetadata(props: { params: Promise<LessonParams> }): Promise<Metadata> {
  const { slug, level: levelSlug, lesson: lessonSlug } = await props.params;
  const view = getLessonView(slug, levelSlug, lessonSlug);
  if (!view) {
    return { title: "Lesson not found · peony" };
  }
  return {
    title: `${view.lesson.title} · ${view.course.title} · peony`,
    description: view.lesson.blurb,
  };
}

/** One step of a lesson: `/courses/[slug]/[level]/[lesson]/[step id]`. */
export default async function LessonStepPage(props: { params: Promise<LessonParams> }) {
  const { slug, level: levelSlug, lesson: lessonSlug, sublesson } = await props.params;
  const view = getLessonView(slug, levelSlug, lessonSlug);
  if (!view) notFound();

  // The last segment is the step's own id. Anything the lesson does not have a
  // step for — a typo, an id that was renamed, a made-up one — is not a page.
  const step = stepIndex(view.blocks, sublesson);
  if (step < 0) notFound();

  return (
    <LessonPlayer
      // A different lesson is a different lesson: fresh progress, fresh card.
      key={`${view.course.slug}:${view.level.slug}:${view.lesson.slug}`}
      course={view.course}
      levelSlug={view.level.slug}
      lessonSlug={view.lesson.slug}
      step={step}
      blocks={view.blocks}
    />
  );
}
