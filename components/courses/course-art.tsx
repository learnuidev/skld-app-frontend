import { Abacus } from "@/components/abacus/abacus";
import {
  AbacusArt,
  BeadArt,
  MentalArt,
  SuanpanArt,
} from "@/components/courses/illustrations/abacus";
import { FractionsArt } from "@/components/courses/illustrations/fractions";
import { NumeralsArt } from "@/components/courses/illustrations/numerals";
import { OperatorsArt } from "@/components/courses/illustrations/operators";
import type { PathCourse } from "@/modules/course/paths";
import type { ArtName } from "@/modules/course/types";

/** Where the art is being drawn: a course card, or the round path icon. */
export type CourseArtSize = "card" | "icon";

const SIZES: Record<CourseArtSize, { abacusScale: number; svg: string }> = {
  card: { abacusScale: 0.24, svg: "size-full" },
  icon: { abacusScale: 0.13, svg: "size-full" },
};

/**
 * How much of the path icon tile each piece of art fills. Art with generous
 * margins in its own viewBox can fill the tile; the rounder marks need air.
 */
const ICON_SIZE: Record<ArtName, string> = {
  abacus: "size-[92%]",
  bead: "size-[88%]",
  mental: "size-[92%]",
  suanpan: "size-[92%]",
  numerals: "size-[78%]",
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
  const className = size === "icon" && named ? ICON_SIZE[named] : svg;
  const name = label ?? (course ? `${course.title} illustration` : "Course illustration");

  switch (named) {
    case "abacus":
      return <AbacusArt className={className} label={name} />;
    case "bead":
      return <BeadArt className={className} label={name} />;
    case "mental":
      return <MentalArt className={className} label={name} />;
    case "suanpan":
      return <SuanpanArt className={className} label={name} />;
    case "numerals":
      return <NumeralsArt className={className} label={name} />;
    case "fractions":
      return <FractionsArt className={className} label={name} />;
    case "operators":
      return <OperatorsArt className={className} label={name} />;
    default:
      return (
        <Abacus
          digits={course?.sample ?? [0, 0, 0, 0]}
          readOnly
          scale={abacusScale}
          label={name}
        />
      );
  }
}

export default CourseArt;
