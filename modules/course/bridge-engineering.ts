import { countLevelExercises, isTaskBlock } from "./utils";
import { bridgeEngineeringContent } from "./bridge-engineering-content";
import type { Course, CourseLesson, CourseLevel, LessonKind } from "./types";

function lesson(
  title: string,
  slug: string,
  blurb: string,
  options: { kind?: LessonKind; minutes?: number } = {},
): CourseLesson {
  return {
    kind: options.kind ?? "lesson",
    slug,
    title,
    blurb,
    minutes: options.minutes ?? 3,
    exercises: 0,
  };
}

function level(slug: string, name: string, description: string, lessons: CourseLesson[]): CourseLevel {
  return { slug, name, description, lessons };
}

const authoredLevels: CourseLevel[] = [
  level(
    "components-of-a-bridge",
    "Module 1 · Components of a Bridge",
    "Open up a bridge and name every part of it — from the deck traffic runs on to the piles buried under the river.",
    [
      lesson(
        "What Is a Bridge?",
        "what-is-a-bridge",
        "A structure that carries traffic over an obstacle — and the oldest, most beautiful kind of engineering there is.",
      ),
      lesson(
        "The Superstructure",
        "superstructure",
        "Deck, slab and girder: the part that spans the gap and bends under the load.",
      ),
      lesson(
        "Bearings",
        "bearings",
        "The small blocks between deck and pier that pass the load down and let the deck move.",
      ),
      lesson(
        "Piers & Abutments",
        "piers-and-abutments",
        "The piers in the middle, and the abutments that hold back the earth at each end.",
      ),
      lesson(
        "Foundations",
        "foundations",
        "The buried work that carries every load into the ground — the hardest part of the job.",
      ),
      lesson(
        "Fittings & Facilities",
        "fittings",
        "Paving, drainage, railings, joints and lights: what turns a structure into a road.",
      ),
      lesson(
        "Reading the Drawing",
        "reading-the-drawing",
        "Water levels, net span, computed span, total length and construction height — the words on a bridge drawing.",
        { minutes: 4 },
      ),
      lesson(
        "Level Check: Name That Part",
        "components-check",
        "Level check: find every part of a bridge, and read the drawing it is shown on.",
        { kind: "level_check", minutes: 5 },
      ),
    ],
  ),
  level(
    "bridge-classification",
    "Module 2 · Bridge Classification",
    "Sort bridges by material, purpose, span, deck position and crossing — then by the way they carry load.",
    [
      lesson(
        "Six Ways to Sort",
        "six-ways",
        "Material, purpose, span, deck position, nature of the crossing, structural system.",
      ),
      lesson(
        "By Material",
        "by-material",
        "Reinforced concrete, steel, ultra-high performance concrete and carbon-fibre cables.",
      ),
      lesson(
        "By Purpose",
        "by-purpose",
        "Railway, highway, pedestrian, aqueduct — and one bridge built for migrating crabs.",
      ),
      lesson(
        "By Span",
        "by-span",
        "Small, medium, large, extra-large — and the span where a bridge has to change system.",
        { minutes: 4 },
      ),
      lesson(
        "Where the Deck Sits",
        "deck-position",
        "Deck, through and half-through: how high the traffic runs in the structure.",
      ),
      lesson(
        "Beam Bridges",
        "beam-bridges",
        "Simply supported, continuous and cantilever — the system that resists bending.",
      ),
      lesson(
        "Arch Bridges",
        "arch-bridges",
        "Compression in the ring, thrust at the feet, and the tie that cancels it.",
      ),
      lesson(
        "Rigid Frames",
        "rigid-frames",
        "When the piers and the beam are cast as one piece, the piers help the beam bend.",
      ),
      lesson(
        "Cable-Stayed Bridges",
        "cable-stayed",
        "Stays that hold the girder up at many points, like a row of invisible piers.",
        { minutes: 4 },
      ),
      lesson(
        "Suspension & Combined Systems",
        "suspension-and-composite",
        "The strongest spanning system of all — and what happens when two systems are combined.",
        { minutes: 4 },
      ),
      lesson(
        "Level Check: Match the System",
        "classification-check",
        "Level check: match every span to the system that carries it, and every system to its drawing.",
        { kind: "level_check", minutes: 5 },
      ),
    ],
  ),
];

/** How many questions a lesson actually asks, read back off its content. */
function countLessonExercises(levelSlug: string, lessonSlug: string): number {
  const blocks = bridgeEngineeringContent[levelSlug]?.[lessonSlug] ?? [];
  return blocks.filter(isTaskBlock).length;
}

const levels: CourseLevel[] = authoredLevels.map((lvl) => ({
  ...lvl,
  lessons: lvl.lessons.map((l) => ({
    ...l,
    exercises: countLessonExercises(lvl.slug, l.slug),
  })),
}));

export const bridgeEngineeringCourse: Course = {
  slug: "bridge-engineering",
  title: "Bridge Engineering",
  tagline: "See how a bridge carries its load — part by part.",
  description:
    "Open up a bridge and learn what every part does. You will label a real elevation drawing, hunt for bearings and foundations, order the load as it travels from traffic to soil, sort bridges by material and purpose, and drag the span of a bridge until it changes from a beam into an arch, a cable-stayed and finally a suspension bridge. Built from an undergraduate bridge engineering course: components, layout and calculation terms, then classification by material, purpose, span, deck position and structural system.",
  introText:
    "A bridge is the clearest drawing in engineering: everything it carries goes somewhere, and you can see where. This course teaches bridge engineering the way it is actually taught — by looking at the drawing. Every lesson puts a real elevation on the screen, pins its parts, and asks you to find them, name them and read them.",
  conceptsInclude: [
    "What a bridge is, and what it has to carry",
    "Superstructure, bearings, piers, abutments, foundations",
    "Ancillary facilities and bridge fittings",
    "Water levels: low, navigable, design flood, high",
    "Net span l₀, computed span l, length L, construction height h",
    "Classification by material, purpose, span and crossing",
    "Deck, through and half-through bridges",
    "Beam, arch, rigid frame, cable-stayed and suspension systems",
    "Composite systems and spanning capacity",
  ],
  levels,
  lessonCount: levels.reduce((total, lvl) => total + lvl.lessons.length, 0),
  exerciseCount: countLevelExercises(levels, bridgeEngineeringContent),
  lessonMinutes: levels.reduce(
    (total, lvl) => total + lvl.lessons.reduce((sum, l) => sum + l.minutes, 0),
    0,
  ),
  accent: "bg-gradient-to-br from-slate-200 to-amber-100",
  heroAccent: "from-slate-500 via-amber-300 to-yellow-200",
  art: "bridge",
};
