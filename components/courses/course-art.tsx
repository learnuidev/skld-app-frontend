import { Abacus } from "@/components/abacus/abacus";
import { FractionsArt } from "@/components/courses/illustrations/fractions";
import { OperatorsArt } from "@/components/courses/illustrations/operators";
import type { PathCourse } from "@/modules/course/paths";
import type { ArtName } from "@/modules/course/types";

/** Where the art is being drawn: a course card, or the round path icon. */
export type CourseArtSize = "card" | "icon";

const SIZES: Record<CourseArtSize, { abacusScale: number; svg: string }> = {
  card: { abacusScale: 0.24, svg: "size-full" },
  icon: { abacusScale: 0.13, svg: "size-[68%]" },
};

/** How much of the path icon tile each piece of art fills. */
const ICON_SIZE: Partial<Record<ArtName, string>> = {
  fractions: "size-[68%]",
  operators: "size-[84%]",
};

export interface CourseArtProps {
  /** Drives the abacus fallback, and the artwork when `art` is not given. */
  course?: PathCourse;
  /** Overrides the course's own artwork — used for path icons. */
  art?: ArtName;
  size?: CourseArtSize;
  /** Accessible name; defaults to the course's title. */
  label?: string;
}

/**
 * The picture on a course card and path icon. A course (or path) with its own
 * `art` gets that SVG; everything else falls back to a live preview of the
 * course's abacus digits.
 */
export function CourseArt({ course, art, size = "card", label }: CourseArtProps) {
  const named = art ?? course?.art;
  const { abacusScale, svg } = SIZES[size];
  const className =
    size === "icon" && named ? (ICON_SIZE[named] ?? svg) : svg;
  const name = label ?? (course ? `${course.title} illustration` : "Course illustration");

  if (named === "fractions") {
    return <FractionsArt className={className} label={name} />;
  }

  if (named === "operators") {
    return <OperatorsArt className={className} label={name} />;
  }

  return (
    <Abacus
      digits={course?.sample ?? [0, 0, 0, 0]}
      readOnly
      scale={abacusScale}
      label={name}
    />
  );
}

export default CourseArt;
