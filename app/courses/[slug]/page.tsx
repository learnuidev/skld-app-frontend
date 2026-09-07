import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/site-nav";
import CourseExplorer from "@/components/courses/course-detail";
import { getCourseBySlug } from "@/modules/course/catalog";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return { title: "Course not found · peony" };
  }
  return {
    title: `${course.title} · peony`,
    description: course.description,
  };
}

export default async function CoursePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const course = getCourseBySlug(slug);
  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteNav className="lg:px-10" />
      <CourseExplorer course={course} />
    </div>
  );
}
