import type { Course, CourseLesson, CourseLevel, LessonKind } from "./types";

function lesson(
  title: string,
  slug: string,
  blurb: string,
  options: { kind?: LessonKind; minutes?: number; exercises?: number } = {},
): CourseLesson {
  return {
    kind: options.kind ?? "lesson",
    slug,
    title,
    blurb,
    minutes: options.minutes ?? 3,
    exercises: options.exercises ?? 0,
  };
}

function level(slug: string, name: string, description: string, lessons: CourseLesson[]): CourseLevel {
  return { slug, name, description, lessons };
}

const levels: CourseLevel[] = [
  level("meet-the-soroban", "Meet the Soroban", "Learn the anatomy of the abacus and what every bead is worth.", [
    lesson("What Is an Abacus?", "what-is-an-abacus", "A counting frame used by humans for thousands of years."),
    lesson("Anatomy of an Abacus", "anatomy", "Find the beam, the rods, and the two kinds of beads."),
    lesson("What Each Bead Is Worth", "beads-worth", "Heaven beads count 5. Earth beads count 1."),
    lesson("Reset: The Zero State", "reset-and-clean", "Clear every bead to rest before you begin."),
    lesson("Level Check", "meet-the-soroban-check", "Show what you know: 4 quick questions.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("counting-with-beads", "Counting with Beads", "Make every number from 1 to 9 and see why five has its own bead.", [
    lesson("One to Four", "one-to-four", "Slide earth beads to count 1, 2, 3 and 4."),
    lesson("Five and Its Friends", "five-and-friends", "Use the heaven bead to make 5 through 9."),
    lesson("Read Any Number", "read-any-number", "Read a rod at a glance, heaven first."),
    lesson("Build a Number", "build-a-number", "Race the clock to build numbers 1–9."),
    lesson("Level Check", "counting-with-beads-check", "Level check: reading and building 1–9.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("tens-and-beyond", "Tens and Beyond", "Turn rods into places and represent any number on the board.", [
    lesson("Rods Are Places", "rods-are-places", "Ones, tens and hundreds each get their own rod."),
    lesson("Building Two-Digit Numbers", "building-two-digit", "Set tens and ones to make any number under 100."),
    lesson("Hold the Zeros", "zeros-matter", "A resting rod is still a place — it means zero."),
    lesson("Reading Big Numbers", "reading-big-numbers", "Read numbers with hundreds on three rods."),
    lesson("Level Check", "tens-and-beyond-check", "Level check: build and read two- and three-digit numbers.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("adding-on-the-beads", "Adding on the Beads", "Add by sliding beads, and carry when a rod runs out of room.", [
    lesson("Add Without Trading", "add-without-trading", "Add small numbers that fit on the rod."),
    lesson("Friends of Five", "friends-of-five", "Run out of earth beads? Use +5 and take away the friend."),
    lesson("Carrying Over", "carrying", "Overflow one rod, carry one to the next."),
    lesson("Adding Two-Digit Numbers", "add-two-digit", "Line up rods by place value and add from the right."),
    lesson("Level Check", "adding-on-the-beads-check", "Level check: adding with and without carrying.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("subtracting-on-the-beads", "Subtracting on the Beads", "Take beads away, and borrow when you don't have enough.", [
    lesson("Take Away Ones", "take-away-ones", "Subtract by sliding beads away from the beam."),
    lesson("Borrowing", "borrowing", "Not enough ones? Borrow from the tens rod."),
    lesson("Subtracting Two-Digit Numbers", "subtract-two-digit", "Subtract place by place, borrowing as needed."),
    lesson("Level Check", "subtracting-on-the-beads-check", "Level check: subtracting with borrowing.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("beyond-the-beads", "From Beads to Mind", "Start moving calculations into your head with anzan.", [
    lesson("Imagine the Beads", "imagine-the-beads", "See the abacus in your mind's eye and compute without it."),
    lesson("Train for Speed", "speed-and-focus", "Practice habits that build lightning-fast mental math."),
  ]),
];

export const understandingAbacusCourse: Course = {
  slug: "understanding-abacus",
  title: "Understanding Abacus",
  tagline: "From your first bead to fast mental math.",
  description:
    "Master the soroban, the Japanese abacus, one bead at a time. You'll start by learning what every bead is worth, then build numbers, add and subtract with carrying and borrowing, and finally move calculations into your head with anzan.",
  introText:
    "The abacus turns arithmetic into something you can see and touch. Play with real beads in every lesson and train the mental picture that makes abacus masters astonishingly fast.",
  conceptsInclude: [
    "Place value",
    "Reading and building numbers",
    "Addition with carrying",
    "Subtraction with borrowing",
    "Mental math (anzan)",
  ],
  levels,
  lessonCount: levels.reduce((total, lvl) => total + lvl.lessons.length, 0),
  exerciseCount: 74,
  lessonMinutes: levels.reduce(
    (total, lvl) => total + lvl.lessons.reduce((sum, l) => sum + l.minutes, 0),
    0,
  ),
  accent: "bg-gradient-to-br from-orange-100 to-amber-100",
  heroAccent: "from-orange-400 via-amber-300 to-yellow-200",
};
