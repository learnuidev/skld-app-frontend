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
  level(
    "deck-layout-and-construction",
    "Module 3 · Deck Layout & Construction",
    "Everything that sits on top of the structure — the surfaces traffic runs on, the layers under them, the gaps that let the deck move, and the fittings that turn a structure into a road.",
    [
      lesson(
        "The Deck in Plan",
        "deck-in-plan",
        "The whole deck in one drawing: the surfaces, the edges, and where the traffic and the water are sent.",
        { minutes: 4 },
      ),
      lesson(
        "Deck Pavement",
        "deck-pavement",
        "Two ways to pave a deck, and the properties the surface has to keep: no rutting, no skidding, no cracking in the cold.",
      ),
      lesson(
        "Waterproofing",
        "waterproofing",
        "The sheet that keeps water out of the concrete — where it goes, and where it has to turn up.",
      ),
      lesson(
        "Drainage",
        "drainage",
        "Falls, inlets, troughs and downpipes: how the water leaves the deck, and when the system has to be closed.",
      ),
      lesson(
        "Cross Slopes",
        "cross-slopes",
        "Four ways to set the fall across a deck, from an inclined pier top to a slab poured to the slope.",
      ),
      lesson(
        "Expansion Joints",
        "expansion-joints",
        "Why a bridge needs gaps, what a joint has to do, and the types that do it.",
        { minutes: 4 },
      ),
      lesson(
        "Footways, Railings & Lighting",
        "footways-and-railings",
        "The pedestrian side of a bridge: how wide a footway is, how high the railing, and how far the lamps stand from the traffic.",
      ),
      lesson(
        "Safety Barriers",
        "safety-barriers",
        "Rigid, semi-rigid and flexible: what each barrier does when a vehicle hits it.",
      ),
      lesson(
        "Level Check: Build the Deck",
        "deck-check",
        "Level check: build the deck, file the barriers, and order its layers from the tyre down to the girder.",
        { kind: "level_check", minutes: 5 },
      ),
    ],
  ),
  level(
    "materials-and-durability",
    "Module 4 · Materials & Durability",
    "Steel and concrete: how each one is graded and specified, what it does under load and over the years, and how a bridge is designed to last.",
    [
      lesson(
        "What Bridges Are Made Of",
        "bridge-materials",
        "Timber, stone, steel and concrete: what a bridge has been built from, and the two materials that carry modern spans.",
      ),
      lesson(
        "Steel in a Bridge",
        "steel-in-the-bridge",
        "The three kinds of steel a bridge order contains: structural steel, reinforcing steel and cable steel.",
      ),
      lesson(
        "Reading a Steel Grade",
        "reading-a-steel-grade",
        "Q355qD, letter by letter: yield strength, bridge steel, quality grade — and why bridge steel is always killed.",
      ),
      lesson(
        "High-Performance Steel",
        "high-performance-steel",
        "Strength, toughness, weldability and corrosion: what modern steel has to do, and where weathering steel helps.",
      ),
      lesson(
        "Reinforcing Steel",
        "reinforcing-steel",
        "Ordinary bar, strand and high-strength bar — and the price of buying strength on its own.",
      ),
      lesson(
        "Concrete in the Bridge",
        "concrete-in-bridges",
        "What concrete is made of, what it must do while it is still fresh, and the four requirements it has to satisfy.",
      ),
      lesson(
        "Concrete Strength",
        "concrete-strength",
        "Cube, prism and tensile strength, the grades from C15 to C80, and the minimum a bridge member may use.",
        { minutes: 4 },
      ),
      lesson(
        "Deformation & Elastic Modulus",
        "concrete-deformation",
        "Elastic and plastic strain, creep and shrinkage, and how the modulus of concrete is actually measured.",
      ),
      lesson(
        "Durability",
        "durability",
        "Carbonation, chloride, freeze-thaw and corrosion: what ends a bridge's life early, and what holds each one back.",
        { minutes: 4 },
      ),
      lesson(
        "Level Check: Choose the Material",
        "materials-check",
        "Level check: read a steel grade, name the concrete test, and match every attack on a bridge to its defence.",
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
    "Open up a bridge and learn what every part does. You will label a real elevation drawing, hunt for bearings and foundations, order the load as it travels from traffic to soil, sort bridges by material and purpose, and drag the span of a bridge until it changes from a beam into an arch, a cable-stayed and finally a suspension bridge. Then you build the deck on top of it — pavement, waterproofing, drainage, cross slopes, expansion joints, footways, railings and barriers — and finish with the materials: the steel grades a designer orders, reinforcing steel, the strength of concrete, its creep and shrinkage, and the durability that decides how long all of it lasts. Built from an undergraduate bridge engineering course: components, layout and calculation terms, classification, deck layout and construction, and structural materials and durability.",
  introText:
    "A bridge is the clearest drawing in engineering: everything it carries goes somewhere, and you can see where. This course teaches bridge engineering the way it is actually taught — by looking at the drawing. Every lesson puts a real drawing on the screen — an elevation, a section, a plan — pins its parts, and asks you to find them, name them and read them.",
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
    "Deck pavement: wearing course, waterproof layer and steel mesh",
    "Waterproofing and drainage: falls, inlets, troughs and downpipes",
    "Four ways to set the cross slope of a deck",
    "Expansion joints: butt, shear, steel supported and modular",
    "Footways, railings, lighting and rigid, semi-rigid and flexible barriers",
    "Steel in a bridge: structural steel, reinforcing steel and cable steel",
    "Steel grades, toughness, weldability and weathering steel",
    "Concrete: workability, cube, prism and axial tensile strength",
    "Concrete grades, creep, shrinkage and the elastic modulus",
    "Durability: carbonation, chloride, freeze-thaw and cover",
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
