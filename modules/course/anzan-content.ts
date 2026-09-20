import type { CourseContentMap } from "./types";

export const anzanContent: CourseContentMap = {
  "picture-the-soroban": {
    "what-is-anzan": [
      {
        id: "anzan-means-mental-calculation",
        type: "heading",
        text: "Anzan means mental calculation",
        figure: {
          visual: {
            kind: "diagram",
            name: "mental-board",
            numbers: [4, 2, 6],
          },
          caption: "One digit per rod, and the sums start to happen without a pencil.",
        },
      },
      {
        id: "anzan-is-mental-arithmetic",
        type: "paragraph",
        text: "Anzan (暗算) is the Japanese word for mental arithmetic. In abacus training it means something more specific: you keep a vivid picture of the soroban in your mind and slide its beads to compute — even when no real abacus is nearby.",
        figure: {
          visual: {
            kind: "diagram",
            name: "vivid-image",
            numbers: [3, 8],
          },
          caption: "Faded beads sharpen with short daily practice, never with one long session.",
        },
      },
      {
        id: "masters-move-beads-fast",
        type: "paragraph",
        text: "Masters move beads so fast on their mental board that they can add a column of fifteen numbers in seconds. That speed is not a gift — it is a trained mental image. This course trains yours, step by step.",
        figure: {
          visual: {
            kind: "diagram",
            name: "number-sprint",
            numbers: [7, 2, 5, 9, 8, 4],
          },
          caption: "Every number lands on the same running total, with nothing written in between.",
        },
      },
      {
        id: "look-closely-at-the-board",
        type: "explore",
        label: "Spend a moment with a real board. This is the exact picture you're about to learn to hold in your head.",
        rods: 4,
        initial: [2, 5, 7, 0],
      },
      {
        id: "notice-the-rods-and-beads",
        type: "paragraph",
        text: "Notice the rods, the amber beam, the red heaven bead and the sky-blue earth beads. Every anzan exercise in this course starts from this picture.",
        figure: {
          visual: {
            kind: "diagram",
            name: "bead-values",
          },
          caption: "The upper bead counts five on its own; each lower bead adds one more.",
        },
      },
    ],
    "mental-board": [
      {
        id: "build-your-mental-board",
        type: "heading",
        text: "Build your mental board",
        figure: {
          visual: {
            kind: "diagram",
            name: "soroban",
          },
          caption: "Frame, rods and beam stay the same every time you build the board in your head.",
        },
      },
      {
        id: "mental-soroban-three-parts",
        type: "paragraph",
        text: "A mental soroban is just three things you can picture: vertical rods (one per digit), an amber beam across the middle, and beads that count only when they touch it.",
        figure: {
          visual: {
            kind: "diagram",
            name: "mental-board",
            numbers: [2, 5, 7],
          },
          caption: "Nothing here is real yet: the beads are yours to move.",
        },
      },
      {
        id: "same-rules-as-real-beads",
        type: "paragraph",
        text: "The rules are exactly the rules of real beads: a heaven bead touching the beam is 5, and each earth bead touching it is 1. Because your mental board follows the same rules, every bead trick you already know transfers straight across.",
        figure: {
          visual: {
            kind: "diagram",
            name: "one-rod",
            numbers: [5],
          },
          caption: "A single bead resting on the beam already means five, with the rod otherwise at rest.",
        },
      },
      {
        id: "anchor-the-units-rod",
        type: "list",
        items: [
          "The units rod is always on the right — anchor it first.",
          "One heaven bead rests above the beam; four earth beads below.",
          "Only beads touching the beam are counted.",
        ],
        figure: {
          visual: {
            kind: "diagram",
            name: "place-value",
            numbers: [3, 4, 2],
            labels: ["ones", "tens", "hundreds"],
          },
          caption: "The rightmost rod keeps the ones, so every other place is counted from there.",
        },
      },
      {
        id: "build-35-from-memory",
        type: "explore",
        label: "Build 35, study it for a few seconds, then hit Clear and rebuild it from memory.",
        rods: 2,
        initial: [0, 0],
      },
    ],
    "snap-a-photo": [
      {
        id: "photograph-the-beads",
        type: "heading",
        text: "Photograph the beads",
        figure: {
          visual: {
            kind: "diagram",
            name: "photo-snap",
          },
          caption: "Glance, look away, and the last shape your eyes held is the one worth keeping.",
        },
      },
      {
        id: "anzan-starts-with-seeing",
        type: "paragraph",
        text: "Anzan starts with seeing: glance at a number on a real board, look away, and describe the beads that were touching the beam. This photo is the raw material your mental board is made from.",
        figure: {
          visual: {
            kind: "abacus",
            digits: [5, 3, 4],
          },
          caption: "Three rods, one glance: say which beads touched the beam before you look again.",
        },
      },
      {
        id: "start-with-one-rod",
        type: "paragraph",
        text: "Start with one rod, then two. Don't count the beads — read the number the way you read a word.",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods",
            numbers: [6, 3],
          },
          caption: "Six and three on two rods read as one number rather than two separate counts.",
        },
      },
      {
        id: "photo-of-this-rod",
        type: "read",
        prompt: "Snap a photo of this rod. What number is it?",
        digits: [8],
        choices: [8, 5, 3, 6],
        explanation: {
          steps: [
            {
              text: "A heaven bead touching the beam is worth 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "Three earth beads under it add 3 more, so the rod shows 8.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
          ],
        },
      },
      {
        id: "one-more-photo",
        type: "read",
        prompt: "One more photo. What number does this board show?",
        digits: [6, 2],
        choices: [26, 62, 20, 24],
        explanation: {
          steps: [
            {
              text: "Read the rods left to right: the first rod shows 6.",
              visual: {
                kind: "abacus",
                digits: [6, 0],
              },
            },
            {
              text: "The second rod shows 2, so the board reads 62.",
              visual: {
                kind: "abacus",
                digits: [6, 2],
              },
            },
          ],
        },
      },
      {
        id: "rebuild-26-from-memory",
        type: "build",
        prompt: "Now close your eyes, picture that board, and rebuild 26 from memory.",
        target: 26,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Rebuild 26 the way you photographed it: 2 tens and 6 ones.",
              visual: {
                kind: "diagram",
                name: "photo-snap",
                numbers: [6, 2],
              },
            },
            {
              text: "Set 2 earth beads on the tens rod.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
            {
              text: "On the ones rod, drop a heaven bead and raise one earth bead for 6.",
              visual: {
                kind: "abacus",
                digits: [6, 2],
              },
            },
          ],
        },
      },
      {
        id: "photograph-a-rod-showing-9",
        type: "quiz",
        prompt: "You photograph a rod showing 9, then clear the board. What number are you holding in your mind?",
        choices: [9, 5, 0, 4],
        answer: 9,
        explanation: {
          steps: [
            {
              text: "You photograph the rod showing 9.",
              visual: {
                kind: "diagram",
                name: "photo-snap",
                numbers: [9],
              },
            },
            {
              text: "Clearing the physical board does not touch your mental picture.",
              visual: {
                kind: "diagram",
                name: "clear-board",
                numbers: [0],
              },
            },
            {
              text: "So you are still holding 9 in your mind.",
              visual: {
                kind: "diagram",
                name: "mental-board",
                numbers: [9],
              },
            },
          ],
        },
      },
    ],
    "image-to-number": [
      {
        id: "read-your-own-mind",
        type: "heading",
        text: "Read your own mind",
        figure: {
          visual: {
            kind: "diagram",
            name: "kan-xinsuan",
            numbers: [6, 3],
          },
          caption: "The move your fingers made a moment ago is still there, waiting to be read.",
        },
      },
      {
        id: "read-the-photo-back",
        type: "paragraph",
        text: "The point of the mental photo is to read it back. When you picture a board, name the number from left to right: read the heaven bead of each rod first, then the earth beads beneath it.",
        figure: {
          visual: {
            kind: "diagram",
            name: "image-to-number",
            numbers: [5, 3, 1],
          },
          caption: "A number you can name out loud is one you can rebuild bead by bead.",
        },
      },
      {
        id: "read-51-on-the-board",
        type: "read",
        prompt: "Read the number your mental board is showing.",
        digits: [5, 1],
        choices: [15, 51, 12, 10],
        explanation: {
          steps: [
            {
              text: "Read the tens rod first: a heaven bead there is 5 tens.",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
            {
              text: "The ones rod shows 1, so the number is 51.",
              visual: {
                kind: "abacus",
                digits: [5, 1],
              },
            },
          ],
        },
      },
      {
        id: "read-3-on-the-board",
        type: "read",
        prompt: "What about this one?",
        digits: [0, 3],
        choices: [30, 3, 33, 300],
        explanation: {
          steps: [
            {
              text: "The left rod is empty, so its leading zero is only a place holder.",
              visual: {
                kind: "diagram",
                name: "place-value",
                numbers: [0, 3],
                labels: ["ones", "tens"],
              },
            },
            {
              text: "The ones rod shows 3, so the number is 3.",
              visual: {
                kind: "abacus",
                digits: [0, 3],
              },
            },
          ],
        },
      },
      {
        id: "read-247-on-the-board",
        type: "read",
        prompt: "Now read a three-rod board.",
        digits: [2, 4, 7],
        choices: [742, 247, 724, 274],
        explanation: {
          steps: [
            {
              text: "Read the hundreds rod first: 2.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 2],
              },
            },
            {
              text: "Then the tens rod gives 4, and the ones rod gives 7.",
              visual: {
                kind: "abacus",
                digits: [0, 4, 2],
              },
            },
            {
              text: "Together that makes 247.",
              visual: {
                kind: "abacus",
                digits: [2, 4, 7],
              },
            },
          ],
        },
      },
      {
        id: "heaven-bead-on-tens-rod",
        type: "quiz",
        prompt: "Your mental board shows only a heaven bead on the tens rod. What number is that?",
        choices: [50, 5, 10, 15],
        answer: 50,
        explanation: {
          steps: [
            {
              text: "A single heaven bead on the tens rod counts as 5 tens.",
              visual: {
                kind: "abacus",
                digits: [0, 5],
              },
            },
            {
              text: "Five tens is 50.",
              visual: {
                kind: "diagram",
                name: "board-vs-numeral",
                numbers: [0, 5],
              },
            },
          ],
        },
      },
    ],
    "picture-the-soroban-check": [
      {
        id: "level-check-picture-the-soroban",
        type: "heading",
        text: "Level check — picture the soroban",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["picture it", "read it", "build it"],
          },
          caption: "Nothing here is timed; the ticks are for holding one number still.",
        },
      },
      {
        id: "hold-the-number-in-mind",
        type: "paragraph",
        text: "Hold a number in your mind, read it, and build it. Solve every question to finish the level.",
        figure: {
          visual: {
            kind: "diagram",
            name: "mental-board",
            numbers: [4, 9],
          },
          caption: "Hold the two digits apart in your mind and read them back without moving your lips.",
        },
      },
      {
        id: "read-6-on-the-board",
        type: "read",
        prompt: "What number is your mental board showing?",
        digits: [6],
        choices: [6, 5, 4, 7],
        explanation: {
          steps: [
            {
              text: "One heaven bead on the units rod is 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "One earth bead touching the beam adds 1, so the rod shows 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
      {
        id: "read-4-on-the-board",
        type: "read",
        prompt: "And this one?",
        digits: [0, 4],
        choices: [40, 4, 44, 400],
        explanation: {
          steps: [
            {
              text: "The left rod is empty, so it is just a leading zero.",
              visual: {
                kind: "diagram",
                name: "zero-rod",
                numbers: [0, 4],
              },
            },
            {
              text: "The ones rod shows 4, which is the whole number.",
              visual: {
                kind: "abacus",
                digits: [0, 4],
              },
            },
          ],
        },
      },
      {
        id: "picture-and-build-71",
        type: "build",
        prompt: "Picture 71, then show it on your abacus.",
        target: 71,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "71 is 7 tens and 1 one.",
              visual: {
                kind: "diagram",
                name: "two-rods",
                numbers: [1, 7],
              },
            },
            {
              text: "Build a heaven bead plus two earth beads on the tens rod for 7.",
              visual: {
                kind: "abacus",
                digits: [0, 7],
              },
            },
            {
              text: "Set one earth bead on the ones rod for 1.",
              visual: {
                kind: "abacus",
                digits: [1, 7],
              },
            },
          ],
        },
      },
      {
        id: "tens-rod-of-84",
        type: "quiz",
        prompt: "You hold 84 in mind. What does the tens rod of your picture show?",
        choices: [8, 4, 80, 84],
        answer: 8,
        explanation: {
          steps: [
            {
              text: "84 has 8 in the tens place.",
              visual: {
                kind: "abacus",
                digits: [4, 8],
              },
            },
            {
              text: "So the tens rod of your picture shows 8.",
              visual: {
                kind: "diagram",
                name: "mental-board",
                numbers: [4, 8],
              },
            },
          ],
        },
      },
    ],
  },

  "mental-addition": {
    "add-without-trading": [
      {
        id: "add-simple-sums-mentally",
        type: "heading",
        text: "Add simple sums in your head",
        figure: {
          visual: {
            kind: "abacus",
            digits: [2],
          },
          caption: "Two beads up, and the next one slides across without any paper.",
        },
      },
      {
        id: "addition-feels-like-real-beads",
        type: "paragraph",
        text: "On a mental board, addition feels exactly like the real thing: slide earth beads toward the beam. Picture 2, slide one more bead up, and you see 3.",
        figure: {
          visual: {
            kind: "abacus-anim",
            frames: [[2], [3]],
            captions: ["2", "3"],
          },
          caption: "One earth bead crosses the gap and the rod changes from two to three.",
        },
      },
      {
        id: "sums-that-never-carry",
        type: "paragraph",
        text: "These sums never fill a rod past nine, so nothing carries — just keep the running picture simple.",
        figure: {
          visual: {
            kind: "diagram",
            name: "column-add",
            numbers: [6, 3],
          },
          caption: "Both addends stay under nine, so each rod keeps its own beads.",
        },
      },
      {
        id: "2-plus-1",
        type: "quiz",
        prompt: "2 + 1 = ?",
        choices: [3, 2, 4, 5],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "Start with 2 on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
            {
              text: "Slide one more earth bead toward the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[2], [3]],
                captions: ["2 on the ones rod", "One more earth bead → 3"],
              },
            },
            {
              text: "The board shows 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "12-plus-31",
        type: "quiz",
        prompt: "12 + 31 = ?",
        choices: [43, 34, 42, 53],
        answer: 43,
        explanation: {
          steps: [
            {
              text: "Add the tens: 1 ten plus 3 tens is 4 tens.",
              visual: {
                kind: "abacus",
                digits: [2, 4],
              },
            },
            {
              text: "Add the ones: 2 plus 1 is 3, so the board shows 43.",
              visual: {
                kind: "abacus",
                digits: [3, 4],
              },
            },
          ],
        },
      },
      {
        id: "build-12-plus-31",
        type: "build",
        prompt: "Check your mental picture: show 12 + 31 = 43 on the abacus.",
        target: 43,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "12 plus 31 is 43.",
              visual: {
                kind: "diagram",
                name: "two-rods",
                numbers: [3, 4],
              },
            },
            {
              text: "Build 4 tens on the tens rod and 3 ones on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [3, 4],
              },
            },
          ],
        },
      },
    ],
    "five-friends": [
      {
        id: "friends-of-five",
        type: "heading",
        text: "Friends of five",
        figure: {
          visual: {
            kind: "diagram",
            name: "five-complement",
            numbers: [2, 3],
          },
          caption: "Pairs that reach five are the ones to know by heart.",
        },
      },
      {
        id: "when-earth-beads-run-short",
        type: "paragraph",
        text: "When you need more earth beads than are free, use the friends-of-five trick: add 5 by dropping the heaven bead, then take away the addend's friend of five. Four's friend is one; three's friend is two.",
        figure: {
          visual: {
            kind: "diagram",
            name: "five-complement",
            numbers: [4, 1],
          },
          caption: "Four's partner is one and three's partner is two, so the pair is never far away.",
        },
      },
      {
        id: "drop-the-five-remove-one",
        type: "paragraph",
        text: "So 3 + 4 becomes: drop the five, remove one. Watch your mental board settle on 7.",
        figure: {
          visual: {
            kind: "abacus-anim",
            frames: [[3], [7]],
            captions: ["3", "7"],
          },
          caption: "The rod pauses at seven for a moment before your fingers move on.",
        },
      },
      {
        id: "3-plus-4",
        type: "quiz",
        prompt: "3 + 4 = ?",
        choices: [7, 6, 5, 9],
        answer: 7,
        explanation: {
          steps: [
            {
              text: "There are not four free earth beads, so use friends of five.",
              visual: {
                kind: "diagram",
                name: "five-complement",
              },
            },
            {
              text: "Drop the heaven bead for 5, then take away 4's friend, 1.",
              visual: {
                kind: "abacus-anim",
                frames: [[3], [8], [7]],
                captions: ["3", "Heaven bead down → 8", "Take its friend 1 away → 7"],
              },
            },
            {
              text: "The board settles on 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "4-plus-4-plus-4",
        type: "quiz",
        prompt: "4 + 4 + 4 = ?",
        choices: [12, 10, 14, 11],
        answer: 12,
        explanation: {
          steps: [
            {
              text: "Add the first two: 4 plus 4 is 8.",
              visual: {
                kind: "abacus",
                digits: [8, 0],
              },
            },
            {
              text: "Add the last 4: 8 plus 4 is 12.",
              visual: {
                kind: "abacus",
                digits: [2, 1],
              },
            },
          ],
        },
      },
      {
        id: "2-plus-3-plus-4",
        type: "quiz",
        prompt: "2 + 3 + 4 = ?",
        choices: [9, 8, 10, 7],
        answer: 9,
        explanation: {
          steps: [
            {
              text: "Run one total: 2 plus 3 is 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "Then add 4 more to land on 9.",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
          ],
        },
      },
    ],
    "carry-in-your-head": [
      {
        id: "carry-in-your-head",
        type: "heading",
        text: "Carry in your head",
        figure: {
          visual: {
            kind: "diagram",
            name: "ghost-carry",
            numbers: [9, 4],
          },
          caption: "The extra ten lives only in your head, and it still arrives on the next rod.",
        },
      },
      {
        id: "eight-plus-five-overflows",
        type: "paragraph",
        text: "Eight plus five cannot fit on one rod — even in your imagination. Picture the ones rod overflowing, then carry: clear the rod down and add one bead to the tens rod. The board shows 13.",
        figure: {
          visual: {
            kind: "diagram",
            name: "ghost-carry",
            numbers: [8, 5],
          },
          caption: "Watch the ones rod fill and then a single bead appear one rod to the left.",
        },
      },
      {
        id: "ten-ones-for-one-ten",
        type: "paragraph",
        text: "Think of it as trading ten ones for one ten, exactly as you would on a real soroban.",
        figure: {
          visual: {
            kind: "diagram",
            name: "carry-over",
            numbers: [10],
          },
          caption: "Ten loose ones on the right are worth exactly one bead on the left.",
        },
      },
      {
        id: "8-plus-5",
        type: "quiz",
        prompt: "8 + 5 = ?",
        choices: [13, 12, 15, 11],
        answer: 13,
        explanation: {
          steps: [
            {
              text: "Start at 8 on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [8, 0],
              },
            },
            {
              text: "Add 5: you carry one ten and leave 3 ones.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [8, 5],
              },
            },
            {
              text: "The board shows 13.",
              visual: {
                kind: "abacus",
                digits: [3, 1],
              },
            },
          ],
        },
      },
      {
        id: "9-plus-9",
        type: "quiz",
        prompt: "9 + 9 = ?",
        choices: [18, 17, 19, 16],
        answer: 18,
        explanation: {
          steps: [
            {
              text: "Start with 9 on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [9, 0],
              },
            },
            {
              text: "Adding 9: the rod can't hold it, so carry one ten and leave 8.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [9, 9],
              },
            },
            {
              text: "One ten and 8 ones is 18.",
              visual: {
                kind: "abacus",
                digits: [8, 1],
              },
            },
          ],
        },
      },
      {
        id: "7-plus-8",
        type: "quiz",
        prompt: "7 + 8 = ?",
        choices: [15, 14, 16, 13],
        answer: 15,
        explanation: {
          steps: [
            {
              text: "Start at 7 on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [7, 0],
              },
            },
            {
              text: "Add 8: the rod fills to 10 at 3, so carry one ten and leave 5.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [7, 8],
              },
            },
            {
              text: "The board shows 15.",
              visual: {
                kind: "abacus",
                digits: [5, 1],
              },
            },
          ],
        },
      },
      {
        id: "confirm-the-mental-carry",
        type: "build",
        prompt: "Show 8 + 5 = 13 on the abacus to confirm your mental carry.",
        target: 13,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "8 plus 5 is 13.",
              visual: {
                kind: "diagram",
                name: "mental-board",
                numbers: [3, 1],
              },
            },
            {
              text: "Build 1 ten on the tens rod and 3 ones on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [3, 1],
              },
            },
          ],
        },
      },
    ],
    "two-digit-mental-add": [
      {
        id: "two-digit-mental-addition",
        type: "heading",
        text: "Two-digit addition in your head",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods",
            numbers: [7, 2],
          },
          caption: "The tens rod and the ones rod are worked one after the other, never mixed.",
        },
      },
      {
        id: "add-rod-by-rod",
        type: "paragraph",
        text: "Add two-digit numbers rod by rod, exactly like written arithmetic — but the beads do the place-keeping. Picture 27: two earth beads on the tens rod, heaven plus two earths on the ones rod. Now add 15: one more ten, then five ones that carry the board to 42.",
        figure: {
          visual: {
            kind: "abacus-anim",
            frames: [[7, 2], [2, 4]],
            captions: ["27", "42"],
          },
          caption: "Fifteen slips in quietly: one ten joins the tens and five ones join the ones.",
        },
      },
      {
        id: "27-plus-15",
        type: "quiz",
        prompt: "27 + 15 = ?",
        choices: [42, 32, 52, 43],
        answer: 42,
        explanation: {
          steps: [
            {
              text: "Add the tens: 2 tens plus 1 ten is 3 tens.",
              visual: {
                kind: "abacus",
                digits: [7, 3],
              },
            },
            {
              text: "Ones: 7 plus 5 is 12, which carries to 4 tens and leaves 2 ones.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [7, 5],
              },
            },
            {
              text: "The board shows 42.",
              visual: {
                kind: "abacus",
                digits: [2, 4],
              },
            },
          ],
        },
      },
      {
        id: "34-plus-26",
        type: "quiz",
        prompt: "34 + 26 = ?",
        choices: [60, 50, 70, 56],
        answer: 60,
        explanation: {
          steps: [
            {
              text: "Tens: 3 tens plus 2 tens is 5 tens.",
              visual: {
                kind: "abacus",
                digits: [4, 5],
              },
            },
            {
              text: "Ones: 4 plus 6 is 10, which carries to 6 tens and 0 ones.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [4, 6],
              },
            },
            {
              text: "The board shows 60.",
              visual: {
                kind: "abacus",
                digits: [0, 6],
              },
            },
          ],
        },
      },
      {
        id: "58-plus-27",
        type: "quiz",
        prompt: "58 + 27 = ?",
        choices: [85, 75, 95, 84],
        answer: 85,
        explanation: {
          steps: [
            {
              text: "Tens: 5 tens plus 2 tens is 7 tens.",
              visual: {
                kind: "abacus",
                digits: [8, 7],
              },
            },
            {
              text: "Ones: 8 plus 7 is 15, which carries to 8 tens and leaves 5 ones.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [8, 7],
              },
            },
            {
              text: "The board shows 85.",
              visual: {
                kind: "abacus",
                digits: [5, 8],
              },
            },
          ],
        },
      },
      {
        id: "build-58-plus-27",
        type: "build",
        prompt: "Show 58 + 27 = 85 to verify your mental carries.",
        target: 85,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "58 plus 27 is 85.",
              visual: {
                kind: "diagram",
                name: "two-rods",
                numbers: [5, 8],
              },
            },
            {
              text: "Build 8 tens on the tens rod and 5 ones on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [5, 8],
              },
            },
          ],
        },
      },
    ],
    "mental-add-string": [
      {
        id: "a-few-in-a-row",
        type: "heading",
        text: "Add a few in a row",
        figure: {
          visual: {
            kind: "diagram",
            name: "number-sprint",
            numbers: [3, 4, 5],
          },
          caption: "Three numbers in a row are enough to begin, with nothing written down.",
        },
      },
      {
        id: "anzan-is-built-on-strings",
        type: "paragraph",
        text: "Anzan is built on strings: a series of numbers added one after another to a running total. Start with three small numbers, keep the running total on your mental board, and never go back to restart.",
        figure: {
          visual: {
            kind: "diagram",
            name: "number-sprint",
            numbers: [6, 8, 4],
          },
          caption: "A string is one number after another, each added as it lands.",
        },
      },
      {
        id: "3-plus-6-plus-4",
        type: "quiz",
        prompt: "3 + 6 + 4 = ?",
        choices: [13, 12, 14, 11],
        answer: 13,
        explanation: {
          steps: [
            {
              text: "Keep one running total: 3 plus 6 is 9.",
              visual: {
                kind: "abacus",
                digits: [9, 0],
              },
            },
            {
              text: "Then add 4 more to reach 13.",
              visual: {
                kind: "abacus",
                digits: [3, 1],
              },
            },
          ],
        },
      },
      {
        id: "8-plus-5-plus-7",
        type: "quiz",
        prompt: "8 + 5 + 7 = ?",
        choices: [20, 19, 21, 18],
        answer: 20,
        explanation: {
          steps: [
            {
              text: "Run one total: 8 plus 5 is 13, carrying a ten.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [8, 5],
              },
            },
            {
              text: "Then add 7 more to bring the total to 20.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
          ],
        },
      },
      {
        id: "12-plus-9-plus-14",
        type: "quiz",
        prompt: "12 + 9 + 14 = ?",
        choices: [35, 33, 36, 34],
        answer: 35,
        explanation: {
          steps: [
            {
              text: "12 plus 9 is 21.",
              visual: {
                kind: "abacus",
                digits: [1, 2],
              },
            },
            {
              text: "Then add 14 to the running total to reach 35.",
              visual: {
                kind: "abacus",
                digits: [5, 3],
              },
            },
          ],
        },
      },
    ],
    "mental-addition-check": [
      {
        id: "level-check-mental-addition",
        type: "heading",
        text: "Level check — mental addition",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["add", "carry", "hold"],
          },
          caption: "Carries are the part to watch; they are where a running total usually slips.",
        },
      },
      {
        id: "keep-the-running-total",
        type: "paragraph",
        text: "Keep the running total on your mental board. Solve every question to finish.",
        figure: {
          visual: {
            kind: "diagram",
            name: "running-total",
            numbers: [7, 5, 6],
          },
          caption: "Read the last number you were given, not the one before it.",
        },
      },
      {
        id: "5-plus-6",
        type: "quiz",
        prompt: "5 + 6 = ?",
        choices: [11, 10, 12, 13],
        answer: 11,
        explanation: {
          steps: [
            {
              text: "Set 5 on the ones rod; it needs 5 more to fill.",
              visual: {
                kind: "diagram",
                name: "ten-complement",
                numbers: [5],
              },
            },
            {
              text: "6 fills the rod with 5 and has 1 extra, so carry one ten and leave 1.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [5, 6],
              },
            },
            {
              text: "One ten and 1 one is 11.",
              visual: {
                kind: "abacus",
                digits: [1, 1],
              },
            },
          ],
        },
      },
      {
        id: "27-plus-19",
        type: "quiz",
        prompt: "27 + 19 = ?",
        choices: [46, 44, 45, 47],
        answer: 46,
        explanation: {
          steps: [
            {
              text: "Tens: 2 tens plus 1 ten is 3 tens.",
              visual: {
                kind: "abacus",
                digits: [7, 3],
              },
            },
            {
              text: "Ones: 7 plus 9 is 16, which carries to 4 tens and leaves 6 ones.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [7, 9],
              },
            },
            {
              text: "The board shows 46.",
              visual: {
                kind: "abacus",
                digits: [6, 4],
              },
            },
          ],
        },
      },
      {
        id: "sum-4-7-8-6",
        type: "quiz",
        prompt: "4 + 7 + 8 + 6 = ?",
        choices: [25, 24, 26, 23],
        answer: 25,
        explanation: {
          steps: [
            {
              text: "Run one total: 4 plus 7 is 11.",
              visual: {
                kind: "diagram",
                name: "running-total",
                numbers: [4, 7],
              },
            },
            {
              text: "Add 8 to reach 19, then add 6 to land on 25.",
              visual: {
                kind: "abacus",
                digits: [5, 2],
              },
            },
          ],
        },
      },
      {
        id: "show-8-plus-9",
        type: "build",
        prompt: "Show the answer to 8 + 9 = 17 on the beads.",
        target: 17,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "8 plus 9 is 17.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [8, 9],
              },
            },
            {
              text: "Build 1 ten on the tens rod and 7 ones on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [7, 1],
              },
            },
          ],
        },
      },
    ],
  },

  "mental-subtraction": {
    "subtract-without-trading": [
      {
        id: "subtract-without-trading",
        type: "heading",
        text: "Subtract without trading",
        figure: {
          visual: {
            kind: "abacus",
            digits: [9],
          },
          caption: "Nine up on one rod leaves plenty of room to take beads away.",
        },
      },
      {
        id: "subtraction-is-addition-in-reverse",
        type: "paragraph",
        text: "Subtraction on your mental board is addition in reverse: slide earth beads away from the beam. Picture 9, remove 3, and the rod shows 6.",
        figure: {
          visual: {
            kind: "abacus-anim",
            frames: [[9], [6]],
            captions: ["9", "6"],
          },
          caption: "Three earth beads travel back down and nine settles into six.",
        },
      },
      {
        id: "9-minus-3",
        type: "quiz",
        prompt: "9 − 3 = ?",
        choices: [6, 5, 7, 8],
        answer: 6,
        explanation: {
          steps: [
            {
              text: "Set 9 on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
            {
              text: "Slide 3 earth beads away from the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[9], [6]],
                captions: ["9 on the ones rod", "Three earth beads slide away → 6"],
              },
            },
            {
              text: "6 beads stay touching the beam, so the answer is 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
      {
        id: "7-minus-2",
        type: "quiz",
        prompt: "7 − 2 = ?",
        choices: [5, 4, 6, 3],
        answer: 5,
        explanation: {
          steps: [
            {
              text: "Set 7 on the ones rod: a heaven bead and two earth beads.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
            {
              text: "Slide the two earth beads away, leaving the heaven bead alone.",
              visual: {
                kind: "abacus-anim",
                frames: [[7], [5]],
                captions: ["7: a heaven bead and two earth beads", "Both earth beads away → the heaven bead alone"],
              },
            },
            {
              text: "The heaven bead alone is 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "build-9-minus-3",
        type: "build",
        prompt: "Show 9 − 3 = 6 on the rod.",
        target: 6,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "9 minus 3 is 6.",
              visual: {
                kind: "diagram",
                name: "one-rod",
                numbers: [6],
              },
            },
            {
              text: "Build the rod with a heaven bead (5) and one earth bead (1).",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
    ],
    "break-five": [
      {
        id: "break-five-mentally",
        type: "heading",
        text: "Break five mentally",
        figure: {
          visual: {
            kind: "diagram",
            name: "one-rod",
            numbers: [6],
          },
          caption: "Six is one bead on the beam with a single earth bead under it.",
        },
      },
      {
        id: "when-the-bead-is-missing",
        type: "paragraph",
        text: "What if the bead you must remove isn't there? To take 3 away from 6, you cannot remove three earth beads — only one is up. So you break the five: take the heaven bead off (−5) and add back three's friend of five (+2). Six loses five and gains two: 3.",
        figure: {
          visual: {
            kind: "diagram",
            name: "five-complement",
            numbers: [3, 2],
          },
          caption: "Three cannot leave on its own, but its partner two can come in to help.",
        },
      },
      {
        id: "heaven-bead-off-two-up",
        type: "paragraph",
        text: "Read it as beads: heaven bead off, two earth beads up. The board shows 3.",
        figure: {
          visual: {
            kind: "diagram",
            name: "one-rod",
            numbers: [3],
          },
          caption: "Three earth beads touching the beam are all that is left of the six.",
        },
      },
      {
        id: "6-minus-3",
        type: "quiz",
        prompt: "6 − 3 = ?",
        choices: [3, 2, 4, 5],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "A 6 has only one earth bead, so you cannot remove 3 straight.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
            {
              text: "Break the five: drop the heaven bead (-5) and add back 3's friend, 2 (+2).",
              visual: {
                kind: "abacus-anim",
                frames: [[6], [1], [3]],
                captions: ["6: the heaven bead and one earth", "Heaven bead off → 1", "Add 3's friend 2 → 3"],
              },
            },
            {
              text: "6 minus 5 plus 2 leaves 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "8-minus-4",
        type: "quiz",
        prompt: "8 − 4 = ?",
        choices: [4, 3, 5, 6],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "8 is a heaven bead plus three earth beads, but not four to remove.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
            {
              text: "Break the five: take the heaven bead off (-5) and add back 4's friend, 1.",
              visual: {
                kind: "abacus-anim",
                frames: [[8], [3], [4]],
                captions: ["8: the heaven bead and three earths", "Heaven bead off → 3", "Add 4's friend 1 → 4"],
              },
            },
            {
              text: "8 minus 5 plus 1 leaves 4.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "which-bead-do-you-break",
        type: "build",
        prompt: "Show 7 − 2 = 5. Which bead do you break?",
        target: 5,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "7 minus 2 is 5.",
              visual: {
                kind: "diagram",
                name: "one-rod",
                numbers: [5],
              },
            },
            {
              text: "From the 7 (heaven plus two earths), slide two earth beads away.",
              visual: {
                kind: "abacus-anim",
                frames: [[7], [5]],
                captions: ["7: a heaven bead and two earths", "Two earths slide away → 5"],
              },
            },
            {
              text: "Only the heaven bead is left, which is 5 - no break is needed.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
    ],
    "borrow-in-your-head": [
      {
        id: "borrow-in-your-head",
        type: "heading",
        text: "Borrow in your head",
        figure: {
          visual: {
            kind: "diagram",
            name: "borrow-ten",
            numbers: [10],
          },
          caption: "One ten walks to the right rod and becomes ten ones on the way.",
        },
      },
      {
        id: "borrowing-from-the-left-rod",
        type: "paragraph",
        text: "When a rod cannot lose enough ones, borrow one ten from the rod to its left and add back the difference on the short rod. For 13 − 5: the tens rod loses one, and the ones rod gains 10 − 5 = 5 on top of its 3 → 8.",
        figure: {
          visual: {
            kind: "diagram",
            name: "column-subtract",
            numbers: [13, 5],
          },
          caption: "The tens rod drops by one while the ones rod grows by ten.",
        },
      },
      {
        id: "borrowing-mirrors-carrying",
        type: "paragraph",
        text: "Borrowing is the mirror of carrying — the same trade, in reverse.",
        figure: {
          visual: {
            kind: "diagram",
            name: "carry-over",
            numbers: [10],
          },
          caption: "The same ten moves either way, and only the direction changes.",
        },
      },
      {
        id: "13-minus-5",
        type: "quiz",
        prompt: "13 − 5 = ?",
        choices: [8, 7, 9, 6],
        answer: 8,
        explanation: {
          steps: [
            {
              text: "The ones can't lose 5 from 3, so borrow one ten.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "The ones rod now holds 10 plus 3 is 13.",
              visual: {
                kind: "abacus",
                digits: [3, 1],
              },
            },
            {
              text: "13 minus 5 is 8.",
              visual: {
                kind: "abacus",
                digits: [8, 0],
              },
            },
          ],
        },
      },
      {
        id: "12-minus-7",
        type: "quiz",
        prompt: "12 − 7 = ?",
        choices: [5, 6, 4, 7],
        answer: 5,
        explanation: {
          steps: [
            {
              text: "The ones can't lose 7 from 2, so borrow one ten.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "The ones rod now holds 10 plus 2 is 12.",
              visual: {
                kind: "abacus",
                digits: [2, 1],
              },
            },
            {
              text: "12 minus 7 leaves 5 in the ones.",
              visual: {
                kind: "abacus",
                digits: [5, 0],
              },
            },
          ],
        },
      },
      {
        id: "20-minus-6",
        type: "quiz",
        prompt: "20 − 6 = ?",
        choices: [14, 13, 15, 12],
        answer: 14,
        explanation: {
          steps: [
            {
              text: "The ones rod is empty, so borrow one ten from the 20.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
            {
              text: "That gives the ones rod 10, and 10 minus 6 is 4.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "One ten is left, so the answer is 14.",
              visual: {
                kind: "abacus",
                digits: [4, 1],
              },
            },
          ],
        },
      },
      {
        id: "build-13-minus-5",
        type: "build",
        prompt: "Show 13 − 5 = 8 on the abacus.",
        target: 8,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "13 minus 5 is 8.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "Build 8 on the ones rod - a heaven bead and three earths - and leave the tens rod empty.",
              visual: {
                kind: "abacus",
                digits: [8, 0],
              },
            },
          ],
        },
      },
    ],
    "two-digit-mental-sub": [
      {
        id: "two-digit-mental-subtraction",
        type: "heading",
        text: "Two-digit subtraction in your head",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods",
            numbers: [2, 5],
          },
          caption: "Work the rods in order and the answer assembles itself as you go.",
        },
      },
      {
        id: "subtract-place-by-place",
        type: "paragraph",
        text: "Line up the rods and subtract place by place, borrowing whenever a rod comes up short. Picture 52 and subtract 28: the ones cannot lose eight, so you borrow, and the tens rod drops by one as the ones rod gains two.",
        figure: {
          visual: {
            kind: "diagram",
            name: "column-subtract",
            numbers: [52, 28],
          },
          caption: "The ones rod asks for help first, and the tens rod pays for it.",
        },
      },
      {
        id: "52-minus-28",
        type: "quiz",
        prompt: "52 − 28 = ?",
        choices: [24, 34, 26, 14],
        answer: 24,
        explanation: {
          steps: [
            {
              text: "The ones can't lose 8 from 2, so borrow one ten.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "The ones rod becomes 12, and 12 minus 8 is 4.",
              visual: {
                kind: "abacus",
                digits: [4, 4],
              },
            },
            {
              text: "The tens go from 5 to 4, and 4 minus 2 is 2 - so 24.",
              visual: {
                kind: "abacus",
                digits: [4, 2],
              },
            },
          ],
        },
      },
      {
        id: "81-minus-36",
        type: "quiz",
        prompt: "81 − 36 = ?",
        choices: [45, 55, 35, 46],
        answer: 45,
        explanation: {
          steps: [
            {
              text: "The ones can't lose 6 from 1, so borrow one ten.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "The ones rod becomes 11, and 11 minus 6 is 5.",
              visual: {
                kind: "abacus",
                digits: [5, 7],
              },
            },
            {
              text: "The tens go from 8 to 7, and 7 minus 3 is 4 - so 45.",
              visual: {
                kind: "abacus",
                digits: [5, 4],
              },
            },
          ],
        },
      },
      {
        id: "64-minus-27",
        type: "quiz",
        prompt: "64 − 27 = ?",
        choices: [37, 47, 36, 27],
        answer: 37,
        explanation: {
          steps: [
            {
              text: "The ones can't lose 7 from 4, so borrow one ten.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "The ones rod becomes 14, and 14 minus 7 is 7.",
              visual: {
                kind: "abacus",
                digits: [7, 5],
              },
            },
            {
              text: "The tens go from 6 to 5, and 5 minus 2 is 3 - so 37.",
              visual: {
                kind: "abacus",
                digits: [7, 3],
              },
            },
          ],
        },
      },
      {
        id: "build-81-minus-36",
        type: "build",
        prompt: "Show 81 − 36 = 45 on the abacus.",
        target: 45,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "81 minus 36 is 45.",
              visual: {
                kind: "diagram",
                name: "column-subtract",
                numbers: [81, 36],
              },
            },
            {
              text: "Build 4 tens on the tens rod and 5 ones on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [5, 4],
              },
            },
          ],
        },
      },
    ],
    "mental-subtraction-check": [
      {
        id: "level-check-mental-subtraction",
        type: "heading",
        text: "Level check — mental subtraction",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["break", "borrow", "subtract"],
          },
          caption: "Two moves cover every sum here: break a five, or borrow a ten.",
        },
      },
      {
        id: "break-borrow-and-subtract",
        type: "paragraph",
        text: "Break, borrow, and subtract your way to the finish.",
        figure: {
          visual: {
            kind: "diagram",
            name: "accuracy-target",
            numbers: [9, 1],
          },
          caption: "One clean run is worth more than three fast ones with a mistake inside.",
        },
      },
      {
        id: "15-minus-8",
        type: "quiz",
        prompt: "15 − 8 = ?",
        choices: [7, 6, 8, 9],
        answer: 7,
        explanation: {
          steps: [
            {
              text: "The ones can't lose 8 from 5, so borrow one ten.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "The ones rod becomes 15.",
              visual: {
                kind: "abacus",
                digits: [5, 1],
              },
            },
            {
              text: "15 minus 8 leaves 7.",
              visual: {
                kind: "abacus",
                digits: [7, 0],
              },
            },
          ],
        },
      },
      {
        id: "70-minus-25",
        type: "quiz",
        prompt: "70 − 25 = ?",
        choices: [45, 55, 35, 44],
        answer: 45,
        explanation: {
          steps: [
            {
              text: "The ones rod is empty, so borrow one ten.",
              visual: {
                kind: "abacus",
                digits: [0, 7],
              },
            },
            {
              text: "The ones rod gets 10, and 10 minus 5 is 5.",
              visual: {
                kind: "abacus",
                digits: [5, 6],
              },
            },
            {
              text: "The tens go from 7 to 6, and 6 minus 2 is 4 - so 45.",
              visual: {
                kind: "abacus",
                digits: [5, 4],
              },
            },
          ],
        },
      },
      {
        id: "11-minus-4-minus-3",
        type: "quiz",
        prompt: "11 − 4 − 3 = ?",
        choices: [4, 5, 6, 3],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "Run one total: 11 minus 4 is 7.",
              visual: {
                kind: "abacus",
                digits: [7, 0],
              },
            },
            {
              text: "Subtract 3 more to land on 4.",
              visual: {
                kind: "abacus",
                digits: [4, 0],
              },
            },
          ],
        },
      },
      {
        id: "build-62-minus-27",
        type: "build",
        prompt: "Show 62 − 27 = 35 on the abacus.",
        target: 35,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "62 minus 27 is 35.",
              visual: {
                kind: "diagram",
                name: "column-subtract",
                numbers: [62, 27],
              },
            },
            {
              text: "Build 3 tens on the tens rod and 5 ones on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [5, 3],
              },
            },
          ],
        },
      },
    ],
  },

  "strings-and-speed": {
    "running-totals": [
      {
        id: "keep-a-running-total",
        type: "heading",
        text: "Keep a running total",
        figure: {
          visual: {
            kind: "diagram",
            name: "running-total",
            numbers: [3, 4],
          },
          caption: "Each new number is added to what you already hold, never to a fresh board.",
        },
      },
      {
        id: "the-heart-of-flash-anzan",
        type: "paragraph",
        text: "The heart of flash anzan is adding a long list to one running total. Start with three or four two-digit numbers. After each number you update the total on your mental board; you never start over.",
        figure: {
          visual: {
            kind: "diagram",
            name: "running-total",
            numbers: [12, 25, 37],
          },
          caption: "Long lists are only short lists that never stopped.",
        },
      },
      {
        id: "start-at-0-add-15",
        type: "quiz",
        prompt: "Start at 0. Add 15, then 20, then 5. What is the total?",
        choices: [40, 35, 45, 30],
        answer: 40,
        explanation: {
          steps: [
            {
              text: "Start at 0 and add 15 to get 15.",
              visual: {
                kind: "abacus",
                digits: [5, 1],
              },
            },
            {
              text: "Add 20 to reach 35, then add 5 to land on 40.",
              visual: {
                kind: "abacus",
                digits: [0, 4],
              },
            },
          ],
        },
      },
      {
        id: "sum-25-30-12-8",
        type: "quiz",
        prompt: "25 + 30 + 12 + 8 = ?",
        choices: [75, 65, 85, 74],
        answer: 75,
        explanation: {
          steps: [
            {
              text: "25 plus 30 is 55.",
              visual: {
                kind: "abacus",
                digits: [5, 5],
              },
            },
            {
              text: "Add 12 to reach 67, then add 8 to land on 75.",
              visual: {
                kind: "abacus",
                digits: [5, 7],
              },
            },
          ],
        },
      },
      {
        id: "start-at-40-add-16",
        type: "quiz",
        prompt: "Start at 40, add 16, then 24. Total?",
        choices: [80, 70, 90, 76],
        answer: 80,
        explanation: {
          steps: [
            {
              text: "Start at 40 and add 16 to get 56.",
              visual: {
                kind: "abacus",
                digits: [6, 5],
              },
            },
            {
              text: "Add 24 more to bring the total to 80.",
              visual: {
                kind: "abacus",
                digits: [0, 8],
              },
            },
          ],
        },
      },
    ],
    "spot-the-carry": [
      {
        id: "see-a-carry-coming",
        type: "heading",
        text: "See a carry before it happens",
        figure: {
          visual: {
            kind: "diagram",
            name: "ghost-carry",
            numbers: [7, 3],
          },
          caption: "Seven needs three more to fill, and that gap is the thing to watch.",
        },
      },
      {
        id: "fast-students-see-it-coming",
        type: "paragraph",
        text: "The fastest students don't wait for a rod to overflow — they see it coming. When your ones rod shows 7, it needs 3 more to fill, so adding 5 or more will always carry.",
        figure: {
          visual: {
            kind: "diagram",
            name: "ten-complement",
            numbers: [7, 3],
          },
          caption: "Seven and three are partners, and together they fill a rod exactly.",
        },
      },
      {
        id: "predict-before-you-slide",
        type: "paragraph",
        text: "Predict before you slide: '27's ones rod needs 3 to fill; adding 6 carries one to the tens.' Then run it — the board settles on 33.",
        figure: {
          visual: {
            kind: "abacus",
            digits: [3, 3],
          },
          caption: "Say the answer before the beads move, then let them confirm it.",
        },
      },
      {
        id: "38-plus-7",
        type: "quiz",
        prompt: "38 + 7 = ?",
        choices: [45, 44, 46, 43],
        answer: 45,
        explanation: {
          steps: [
            {
              text: "38's ones rod needs just 2 more to fill.",
              visual: {
                kind: "diagram",
                name: "ten-complement",
                numbers: [2],
              },
            },
            {
              text: "So 7 carries: 38 plus 2 is 40, then add the remaining 5.",
              visual: {
                kind: "abacus",
                digits: [0, 4],
              },
            },
            {
              text: "The board shows 45.",
              visual: {
                kind: "abacus",
                digits: [5, 4],
              },
            },
          ],
        },
      },
      {
        id: "46-plus-8",
        type: "quiz",
        prompt: "46 + 8 = ?",
        choices: [54, 53, 55, 52],
        answer: 54,
        explanation: {
          steps: [
            {
              text: "46's ones rod needs 4 more to fill.",
              visual: {
                kind: "diagram",
                name: "ten-complement",
                numbers: [4],
              },
            },
            {
              text: "So 8 carries: 46 plus 4 is 50, then add the remaining 4.",
              visual: {
                kind: "abacus",
                digits: [0, 5],
              },
            },
            {
              text: "The board shows 54.",
              visual: {
                kind: "abacus",
                digits: [4, 5],
              },
            },
          ],
        },
      },
      {
        id: "75-plus-9",
        type: "quiz",
        prompt: "75 + 9 = ?",
        choices: [84, 83, 85, 82],
        answer: 84,
        explanation: {
          steps: [
            {
              text: "75's ones rod needs 5 more to fill.",
              visual: {
                kind: "diagram",
                name: "ten-complement",
                numbers: [5],
              },
            },
            {
              text: "So 9 carries: 75 plus 5 is 80, then add the remaining 4.",
              visual: {
                kind: "abacus",
                digits: [0, 8],
              },
            },
            {
              text: "The board shows 84.",
              visual: {
                kind: "abacus",
                digits: [4, 8],
              },
            },
          ],
        },
      },
    ],
    "two-rods-at-once": [
      {
        id: "two-rods-at-once",
        type: "heading",
        text: "Two rods at once",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods-at-once",
            numbers: [3, 4],
          },
          caption: "Both rods move in the same breath instead of one after the other.",
        },
      },
      {
        id: "see-tens-and-ones-together",
        type: "paragraph",
        text: "Longer numbers are easier when you see tens and ones together. For 34 + 21, picture 3 tens with 4 ones meeting 2 tens with 1 one, merging into 5 tens and 5 ones — 55.",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods-at-once",
            numbers: [5, 5],
          },
          caption: "Ten and ten meet as two rods that both come out full.",
        },
      },
      {
        id: "34-plus-21",
        type: "quiz",
        prompt: "34 + 21 = ?",
        choices: [55, 65, 54, 45],
        answer: 55,
        explanation: {
          steps: [
            {
              text: "Add the tens: 3 tens plus 2 tens is 5 tens.",
              visual: {
                kind: "diagram",
                name: "two-rods-at-once",
                numbers: [4, 5],
              },
            },
            {
              text: "Add the ones: 4 plus 1 is 5, so the board shows 55.",
              visual: {
                kind: "abacus",
                digits: [5, 5],
              },
            },
          ],
        },
      },
      {
        id: "26-plus-43",
        type: "quiz",
        prompt: "26 + 43 = ?",
        choices: [69, 79, 68, 59],
        answer: 69,
        explanation: {
          steps: [
            {
              text: "Add the tens: 2 tens plus 4 tens is 6 tens.",
              visual: {
                kind: "abacus",
                digits: [6, 6],
              },
            },
            {
              text: "Add the ones: 6 plus 3 is 9, so the board shows 69.",
              visual: {
                kind: "abacus",
                digits: [9, 6],
              },
            },
          ],
        },
      },
      {
        id: "51-plus-38",
        type: "quiz",
        prompt: "51 + 38 = ?",
        choices: [89, 99, 88, 79],
        answer: 89,
        explanation: {
          steps: [
            {
              text: "Add the tens: 5 tens plus 3 tens is 8 tens.",
              visual: {
                kind: "abacus",
                digits: [1, 8],
              },
            },
            {
              text: "Add the ones: 1 plus 8 is 9, so the board shows 89.",
              visual: {
                kind: "abacus",
                digits: [9, 8],
              },
            },
          ],
        },
      },
      {
        id: "build-51-plus-38",
        type: "build",
        prompt: "Show 51 + 38 = 89 on the abacus.",
        target: 89,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "51 plus 38 is 89.",
              visual: {
                kind: "diagram",
                name: "column-add",
                numbers: [51, 38],
              },
            },
            {
              text: "Build 8 tens on the tens rod and 9 ones on the ones rod.",
              visual: {
                kind: "abacus",
                digits: [9, 8],
              },
            },
          ],
        },
      },
    ],
    "flash-anzan": [
      {
        id: "flash-anzan",
        type: "heading",
        text: "Flash anzan",
        figure: {
          visual: {
            kind: "diagram",
            name: "flash-drill",
            numbers: [6],
          },
          caption: "One number appears and is gone before your hand can reach for anything.",
        },
      },
      {
        id: "flash-anzan-is-the-showpiece",
        type: "paragraph",
        text: "Flash anzan is the showpiece: numbers appear one after another, and you add each one to your mental board before the next flashes. Champions add ten or more numbers shown for under a second each.",
        figure: {
          visual: {
            kind: "diagram",
            name: "speed-clock",
            numbers: [1],
          },
          caption: "Under a second for each number is the pace the champions work at.",
        },
      },
      {
        id: "build-the-skill-with-flashcards",
        type: "paragraph",
        text: "This app can't flash numbers at you yet, so build the skill with a friend or flashcards: have someone read a list aloud at a steady beat while you keep the total on your mental board.",
        figure: {
          visual: {
            kind: "diagram",
            name: "listening-drill",
            numbers: [8, 4, 6],
          },
          caption: "A steady voice reading a list is the simplest way to train the ear.",
        },
      },
      {
        id: "start-with-three-numbers",
        type: "list",
        items: [
          "Start with three numbers, each held for a full second.",
          "Add each one to the running total — never clear between numbers.",
          "When you can do five without losing the picture, go faster.",
        ],
        figure: {
          visual: {
            kind: "diagram",
            name: "drill-rhythm",
            numbers: [7, 12, 5],
          },
          caption: "Hold each number for a full beat before the next one lands.",
        },
      },
      {
        id: "quick-warm-up-string",
        type: "quiz",
        prompt: "A quick warm-up string: 14, then 23, then 12. Total?",
        choices: [49, 48, 50, 47],
        answer: 49,
        explanation: {
          steps: [
            {
              text: "14 plus 23 is 37.",
              visual: {
                kind: "diagram",
                name: "running-total",
                numbers: [14, 23],
              },
            },
            {
              text: "Add the flashed 12 to the running total and it lands on 49.",
              visual: {
                kind: "abacus",
                digits: [9, 4],
              },
            },
          ],
        },
      },
      {
        id: "longer-string-31-25-44",
        type: "quiz",
        prompt: "Now a longer string: 31, 25, 44. Total?",
        choices: [100, 99, 101, 110],
        answer: 100,
        explanation: {
          steps: [
            {
              text: "31 plus 25 is 56.",
              visual: {
                kind: "diagram",
                name: "number-sprint",
                numbers: [31, 25, 44],
              },
            },
            {
              text: "Add 44 to the running total to reach 100.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 1],
              },
            },
          ],
        },
      },
    ],
    "strings-speed-check": [
      {
        id: "level-check-strings-and-speed",
        type: "heading",
        text: "Level check — strings and speed",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["add", "hold", "speed"],
          },
          caption: "Speed is counted last; a steady total comes before a quick one.",
        },
      },
      {
        id: "keep-one-running-total",
        type: "paragraph",
        text: "Keep one running total for each string and finish the level.",
        figure: {
          visual: {
            kind: "diagram",
            name: "running-total",
            numbers: [8, 6, 9, 4],
          },
          caption: "One total for each string, kept in the same place all the way through.",
        },
      },
      {
        id: "12-plus-15-plus-8",
        type: "quiz",
        prompt: "12 + 15 + 8 = ?",
        choices: [35, 33, 36, 34],
        answer: 35,
        explanation: {
          steps: [
            {
              text: "12 plus 15 is 27.",
              visual: {
                kind: "abacus",
                digits: [7, 2],
              },
            },
            {
              text: "Add 8 more to land on 35.",
              visual: {
                kind: "abacus",
                digits: [5, 3],
              },
            },
          ],
        },
      },
      {
        id: "30-plus-22-plus-18",
        type: "quiz",
        prompt: "30 + 22 + 18 = ?",
        choices: [70, 60, 72, 68],
        answer: 70,
        explanation: {
          steps: [
            {
              text: "30 plus 22 is 52.",
              visual: {
                kind: "abacus",
                digits: [2, 5],
              },
            },
            {
              text: "Add 18 more to land on 70.",
              visual: {
                kind: "abacus",
                digits: [0, 7],
              },
            },
          ],
        },
      },
      {
        id: "46-plus-17-plus-9",
        type: "quiz",
        prompt: "46 + 17 + 9 = ?",
        choices: [72, 71, 73, 62],
        answer: 72,
        explanation: {
          steps: [
            {
              text: "46 plus 17 is 63.",
              visual: {
                kind: "abacus",
                digits: [3, 6],
              },
            },
            {
              text: "Add 9 more to land on 72.",
              visual: {
                kind: "abacus",
                digits: [2, 7],
              },
            },
          ],
        },
      },
      {
        id: "build-the-100-string",
        type: "build",
        prompt: "Show the string 31 + 25 + 44 = 100 on the abacus.",
        target: 100,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "31 plus 25 plus 44 is 100.",
              visual: {
                kind: "diagram",
                name: "big-board",
                numbers: [0, 0, 1],
              },
            },
            {
              text: "Build 1 on the hundreds rod and leave the tens and ones rods empty.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 1],
              },
            },
          ],
        },
      },
    ],
  },

  "big-numbers": {
    "three-digit-add": [
      {
        id: "three-digit-mental-addition",
        type: "heading",
        text: "Three-digit mental addition",
        figure: {
          visual: {
            kind: "diagram",
            name: "big-board",
            numbers: [2, 6, 3],
          },
          caption: "Three rods are the two you know with one more place on the left.",
        },
      },
      {
        id: "anchor-hundreds-on-the-left",
        type: "paragraph",
        text: "Your mental board grows a third rod. Anchor hundreds on the left, tens in the middle, ones on the right, and add place by place from the right, carrying leftward whenever a rod overflows.",
        figure: {
          visual: {
            kind: "diagram",
            name: "place-value",
            numbers: [2, 7, 4],
            labels: ["ones", "tens", "hundreds"],
          },
          caption: "Name each rod before you move it, and the hundreds stay on the far left.",
        },
      },
      {
        id: "123-plus-456",
        type: "quiz",
        prompt: "123 + 456 = ?",
        choices: [579, 569, 589, 578],
        answer: 579,
        explanation: {
          steps: [
            {
              text: "Add the hundreds: 1 plus 4 is 5.",
              visual: {
                kind: "abacus",
                digits: [3, 2, 5],
              },
            },
            {
              text: "Add the tens: 2 plus 5 is 7.",
              visual: {
                kind: "abacus",
                digits: [3, 7, 5],
              },
            },
            {
              text: "Add the ones: 3 plus 6 is 9 - the board shows 579.",
              visual: {
                kind: "abacus",
                digits: [9, 7, 5],
              },
            },
          ],
        },
      },
      {
        id: "456-plus-789",
        type: "quiz",
        prompt: "456 + 789 = ?",
        choices: [1245, 1244, 1135, 1255],
        answer: 1245,
        explanation: {
          steps: [
            {
              text: "Ones: 6 plus 9 is 15, so write 5 and carry 1.",
              visual: {
                kind: "abacus",
                digits: [5, 6, 4],
              },
            },
            {
              text: "Tens: 5 plus 8 plus 1 is 14, so write 4 and carry 1.",
              visual: {
                kind: "abacus",
                digits: [5, 4, 5],
              },
            },
            {
              text: "Hundreds: 4 plus 7 plus 1 is 12, giving 1245.",
              visual: {
                kind: "abacus",
                digits: [5, 4, 2, 1],
              },
            },
          ],
        },
      },
      {
        id: "345-plus-278",
        type: "quiz",
        prompt: "345 + 278 = ?",
        choices: [623, 613, 633, 622],
        answer: 623,
        explanation: {
          steps: [
            {
              text: "Ones: 5 plus 8 is 13, so write 3 and carry 1.",
              visual: {
                kind: "abacus",
                digits: [3, 5, 3],
              },
            },
            {
              text: "Tens: 4 plus 7 plus 1 is 12, so write 2 and carry 1.",
              visual: {
                kind: "abacus",
                digits: [3, 2, 4],
              },
            },
            {
              text: "Hundreds: 3 plus 2 plus 1 is 6 - the answer is 623.",
              visual: {
                kind: "abacus",
                digits: [3, 2, 6],
              },
            },
          ],
        },
      },
      {
        id: "build-345-plus-278",
        type: "build",
        prompt: "Show 345 + 278 = 623 on the abacus.",
        target: 623,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "345 plus 278 is 623.",
              visual: {
                kind: "diagram",
                name: "column-add",
                numbers: [345, 278],
              },
            },
            {
              text: "Build 6 hundreds, 2 tens, and 3 ones.",
              visual: {
                kind: "abacus",
                digits: [3, 2, 6],
              },
            },
          ],
        },
      },
    ],
    "three-digit-sub": [
      {
        id: "three-digit-mental-subtraction",
        type: "heading",
        text: "Three-digit mental subtraction",
        figure: {
          visual: {
            kind: "diagram",
            name: "big-board",
            numbers: [8, 4, 6],
          },
          caption: "The routine is identical one rod higher, with the same borrow when a place runs short.",
        },
      },
      {
        id: "subtraction-across-hundreds",
        type: "paragraph",
        text: "Subtraction across hundreds is the same routine one rod higher: take away place by place and borrow from the next rod when a place comes up short.",
        figure: {
          visual: {
            kind: "diagram",
            name: "column-subtract",
            numbers: [624, 258],
          },
          caption: "A short ones rod borrows from the tens, and a short tens rod from the hundreds.",
        },
      },
      {
        id: "652-minus-231",
        type: "quiz",
        prompt: "652 − 231 = ?",
        choices: [421, 431, 411, 321],
        answer: 421,
        explanation: {
          steps: [
            {
              text: "Subtract the hundreds: 6 minus 2 is 4.",
              visual: {
                kind: "abacus",
                digits: [2, 5, 4],
              },
            },
            {
              text: "Subtract the tens: 5 minus 3 is 2.",
              visual: {
                kind: "abacus",
                digits: [2, 2, 4],
              },
            },
            {
              text: "Subtract the ones: 2 minus 1 is 1 - the board shows 421.",
              visual: {
                kind: "abacus",
                digits: [1, 2, 4],
              },
            },
          ],
        },
      },
      {
        id: "800-minus-356",
        type: "quiz",
        prompt: "800 − 356 = ?",
        choices: [444, 454, 434, 544],
        answer: 444,
        explanation: {
          steps: [
            {
              text: "800 has no ones or tens, so borrow across from the hundreds.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 8],
              },
            },
            {
              text: "Ones: 10 minus 6 is 4; tens: 9 minus 5 is 4.",
              visual: {
                kind: "abacus",
                digits: [4, 4, 7],
              },
            },
            {
              text: "Hundreds: 7 minus 3 is 4 - the answer is 444.",
              visual: {
                kind: "abacus",
                digits: [4, 4, 4],
              },
            },
          ],
        },
      },
      {
        id: "923-minus-468",
        type: "quiz",
        prompt: "923 − 468 = ?",
        choices: [455, 465, 445, 555],
        answer: 455,
        explanation: {
          steps: [
            {
              text: "Borrow for the ones: 13 minus 8 is 5.",
              visual: {
                kind: "abacus",
                digits: [5, 1, 9],
              },
            },
            {
              text: "Borrow for the tens: 11 minus 6 is 5.",
              visual: {
                kind: "abacus",
                digits: [5, 5, 8],
              },
            },
            {
              text: "Hundreds: 8 minus 4 is 4 - the answer is 455.",
              visual: {
                kind: "abacus",
                digits: [5, 5, 4],
              },
            },
          ],
        },
      },
      {
        id: "build-800-minus-356",
        type: "build",
        prompt: "Show 800 − 356 = 444 on the abacus.",
        target: 444,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "800 minus 356 is 444.",
              visual: {
                kind: "diagram",
                name: "column-subtract",
                numbers: [800, 356],
              },
            },
            {
              text: "Build 4 hundreds, 4 tens, and 4 ones.",
              visual: {
                kind: "abacus",
                digits: [4, 4, 4],
              },
            },
          ],
        },
      },
    ],
    "decimals-money": [
      {
        id: "decimals-and-money",
        type: "heading",
        text: "Decimals and money",
        figure: {
          visual: {
            kind: "diagram",
            name: "money",
            numbers: [50],
          },
          caption: "Cents behave like ones, so the same bead moves pay for the coffee.",
        },
      },
      {
        id: "money-is-where-anzan-shines",
        type: "paragraph",
        text: "Money is where mental abacus shines in daily life. Fix an imaginary decimal point as a place on your board and treat cents as ones: $4.50 + $2.25 becomes 450 + 225 = 675, which you read back as $6.75.",
        figure: {
          visual: {
            kind: "diagram",
            name: "money",
            numbers: [75],
          },
          caption: "The cents keep their own rods, and the dollars wait one rod to the left.",
        },
      },
      {
        id: "the-decimal-point-is-imaginary",
        type: "paragraph",
        text: "The decimal point is imaginary — like the board itself. Just remember which rod is your ones rod.",
        figure: {
          visual: {
            kind: "diagram",
            name: "place-value",
            numbers: [5, 7, 6],
            labels: ["ones", "tens", "hundreds"],
          },
          caption: "Pick the ones rod first, and the point falls into place by itself.",
        },
      },
      {
        id: "4-50-plus-2-25",
        type: "quiz",
        prompt: "$4.50 + $2.25 = ?",
        choices: [6.75, 6.25, 7.75, 5.75],
        answer: 6.75,
        explanation: {
          steps: [
            {
              text: "Fix the decimal point and treat cents as ones: 450 plus 225.",
              visual: {
                kind: "abacus",
                digits: [0, 5, 4],
              },
            },
            {
              text: "450 plus 225 is 675.",
              visual: {
                kind: "abacus",
                digits: [5, 7, 6],
              },
            },
            {
              text: "Read it back as $6.75.",
              visual: {
                kind: "diagram",
                name: "board-vs-numeral",
                numbers: [5, 7, 6],
              },
            },
          ],
        },
      },
      {
        id: "1-99-plus-2-01",
        type: "quiz",
        prompt: "$1.99 + $2.01 = ?",
        choices: [4, 4.5, 3.99, 3.9],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "The cents add up: 0.99 plus 0.01 makes one whole dollar.",
              visual: {
                kind: "diagram",
                name: "money",
                numbers: [99],
              },
            },
            {
              text: "So $1.99 plus $2.01 is exactly $4.00.",
              visual: {
                kind: "abacus",
                digits: [4, 0],
              },
            },
          ],
        },
      },
      {
        id: "0-70-plus-0-80",
        type: "quiz",
        prompt: "0.70 + 0.80 = ?",
        choices: [1.5, 1.4, 0.15, 1.05],
        answer: 1.5,
        explanation: {
          steps: [
            {
              text: "Work in tenths: 7 tenths plus 8 tenths is 15 tenths.",
              visual: {
                kind: "abacus",
                digits: [5, 1],
              },
            },
            {
              text: "15 tenths carries to 1 whole and 5 tenths, or 1.5.",
              visual: {
                kind: "diagram",
                name: "board-vs-numeral",
                numbers: [5, 1],
              },
            },
          ],
        },
      },
    ],
    "mixed-operations": [
      {
        id: "mixed-up-math",
        type: "heading",
        text: "Mixed-up math",
        figure: {
          visual: {
            kind: "diagram",
            name: "number-sprint",
            numbers: [8, 3, 5, 2],
          },
          caption: "Additions and subtractions share one total, taken in the order they arrive.",
        },
      },
      {
        id: "strings-of-mixed-operations",
        type: "paragraph",
        text: "Strings don't have to be all addition. The rule is the same: one running total, updated with each next term. Start at zero and perform each step on the beads.",
        figure: {
          visual: {
            kind: "diagram",
            name: "clear-board",
          },
          caption: "Everything starts from an empty board, so the first term has somewhere to land.",
        },
      },
      {
        id: "20-plus-15-minus-8",
        type: "quiz",
        prompt: "20 + 15 − 8 = ?",
        choices: [27, 25, 28, 26],
        answer: 27,
        explanation: {
          steps: [
            {
              text: "Run one total: 20 plus 15 is 35.",
              visual: {
                kind: "abacus",
                digits: [5, 3],
              },
            },
            {
              text: "Subtract 8 to land on 27.",
              visual: {
                kind: "abacus",
                digits: [7, 2],
              },
            },
          ],
        },
      },
      {
        id: "50-minus-12-plus-7",
        type: "quiz",
        prompt: "50 − 12 + 7 = ?",
        choices: [45, 44, 46, 55],
        answer: 45,
        explanation: {
          steps: [
            {
              text: "Run one total: 50 minus 12 is 38.",
              visual: {
                kind: "abacus",
                digits: [8, 3],
              },
            },
            {
              text: "Add 7 to land on 45.",
              visual: {
                kind: "abacus",
                digits: [5, 4],
              },
            },
          ],
        },
      },
      {
        id: "100-minus-35-minus-18",
        type: "quiz",
        prompt: "100 − 35 − 18 = ?",
        choices: [47, 48, 46, 57],
        answer: 47,
        explanation: {
          steps: [
            {
              text: "Start at 100 and subtract 35 to get 65.",
              visual: {
                kind: "abacus",
                digits: [5, 6],
              },
            },
            {
              text: "Subtract 18 more to land on 47.",
              visual: {
                kind: "abacus",
                digits: [7, 4],
              },
            },
          ],
        },
      },
      {
        id: "build-the-mixed-answer",
        type: "build",
        prompt: "Show 50 − 12 + 7 = 45 on the abacus.",
        target: 45,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "50 minus 12 plus 7 is 45.",
              visual: {
                kind: "diagram",
                name: "board-vs-numeral",
                numbers: [5, 4],
              },
            },
            {
              text: "Build 4 tens and 5 ones.",
              visual: {
                kind: "abacus",
                digits: [5, 4],
              },
            },
          ],
        },
      },
    ],
    "big-numbers-check": [
      {
        id: "level-check-big-numbers",
        type: "heading",
        text: "Level check — big boards and mixed numbers",
        figure: {
          visual: {
            kind: "diagram",
            name: "big-board",
            numbers: [9, 4, 1, 6],
          },
          caption: "Four rods, four places, and one decimal point to keep track of.",
        },
      },
      {
        id: "keep-your-place-with-decimals",
        type: "paragraph",
        text: "Add, subtract, and keep your place — even with a decimal point.",
        figure: {
          visual: {
            kind: "diagram",
            name: "column-add",
            numbers: [450, 225],
          },
          caption: "Line the rods up under each other and the answer keeps its own place.",
        },
      },
      {
        id: "268-plus-174",
        type: "quiz",
        prompt: "268 + 174 = ?",
        choices: [442, 432, 452, 342],
        answer: 442,
        explanation: {
          steps: [
            {
              text: "Ones: 8 plus 4 is 12, so write 2 and carry 1.",
              visual: {
                kind: "abacus",
                digits: [2, 7, 2],
              },
            },
            {
              text: "Tens: 6 plus 7 plus 1 is 14, so write 4 and carry 1.",
              visual: {
                kind: "abacus",
                digits: [2, 4, 3],
              },
            },
            {
              text: "Hundreds: 2 plus 1 plus 1 is 4 - the answer is 442.",
              visual: {
                kind: "abacus",
                digits: [2, 4, 4],
              },
            },
          ],
        },
      },
      {
        id: "900-minus-268",
        type: "quiz",
        prompt: "900 − 268 = ?",
        choices: [632, 642, 622, 732],
        answer: 632,
        explanation: {
          steps: [
            {
              text: "900 has no ones or tens, so borrow across from the hundreds.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 9],
              },
            },
            {
              text: "Ones: 10 minus 8 is 2; tens: 9 minus 6 is 3.",
              visual: {
                kind: "abacus",
                digits: [2, 3, 8],
              },
            },
            {
              text: "Hundreds: 8 minus 2 is 6 - the answer is 632.",
              visual: {
                kind: "abacus",
                digits: [2, 3, 6],
              },
            },
          ],
        },
      },
      {
        id: "3-50-plus-2-75",
        type: "quiz",
        prompt: "$3.50 + $2.75 = ?",
        choices: [6.25, 6.75, 6.5, 5.75],
        answer: 6.25,
        explanation: {
          steps: [
            {
              text: "Treat the cents as ones: 350 plus 275.",
              visual: {
                kind: "abacus",
                digits: [0, 5, 3],
              },
            },
            {
              text: "350 plus 275 is 625.",
              visual: {
                kind: "abacus",
                digits: [5, 2, 6],
              },
            },
            {
              text: "Read it back as $6.25.",
              visual: {
                kind: "diagram",
                name: "board-vs-numeral",
                numbers: [5, 2, 6],
              },
            },
          ],
        },
      },
      {
        id: "build-268-plus-174",
        type: "build",
        prompt: "Show 268 + 174 = 442 on the abacus.",
        target: 442,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "268 plus 174 is 442.",
              visual: {
                kind: "diagram",
                name: "column-add",
                numbers: [268, 174],
              },
            },
            {
              text: "Build 4 hundreds, 4 tens, and 2 ones.",
              visual: {
                kind: "abacus",
                digits: [2, 4, 4],
              },
            },
          ],
        },
      },
    ],
  },

  "anzan-mastery": {
    "speed-habits": [
      {
        id: "speed-training-habits",
        type: "heading",
        text: "Speed-training habits",
        figure: {
          visual: {
            kind: "diagram",
            name: "speed-clock",
            numbers: [5],
          },
          caption: "Five focused minutes, repeated tomorrow, are what make the difference.",
        },
      },
      {
        id: "speed-needs-short-sessions",
        type: "paragraph",
        text: "Speed is built in short, focused sessions. Five minutes daily beats an hour on Sunday. Start every session by clearing your mental board and doing one slow, clean run — then time the next.",
        figure: {
          visual: {
            kind: "diagram",
            name: "daily-practice",
          },
          caption: "A tick for each day beats one long session at the weekend.",
        },
      },
      {
        id: "warm-up-slowly",
        type: "list",
        items: [
          "Warm up by reading and building numbers slowly.",
          "Repeat the same string until it is clean, then go faster.",
          "Stop when your picture blurs — rest beats sloppy reps.",
        ],
        figure: {
          visual: {
            kind: "diagram",
            name: "progress-ladder",
            labels: ["read", "build", "speed up"],
          },
          caption: "The rungs are climbed in order, and rushing the first one costs you the rest.",
        },
      },
      {
        id: "warm-up-18-plus-25",
        type: "quiz",
        prompt: "Warm-up check: 18 + 25 = ?",
        choices: [43, 42, 44, 53],
        answer: 43,
        explanation: {
          steps: [
            {
              text: "Ones: 8 plus 5 is 13, so write 3 and carry 1.",
              visual: {
                kind: "abacus",
                digits: [3, 2],
              },
            },
            {
              text: "Tens: 1 plus 2 plus 1 is 4 - the answer is 43.",
              visual: {
                kind: "abacus",
                digits: [3, 4],
              },
            },
          ],
        },
      },
    ],
    "stronger-images": [
      {
        id: "make-your-mental-image-vivid",
        type: "heading",
        text: "Make your mental image vivid",
        figure: {
          visual: {
            kind: "diagram",
            name: "vivid-image",
            numbers: [4, 6],
          },
          caption: "Keep one board for every exercise: same frame, same beam, same colours.",
        },
      },
      {
        id: "vividness-is-trainable",
        type: "paragraph",
        text: "Vividness is trainable. Always picture the same board: dark frame, amber beam, red heaven bead, blue earth beads. When your image fades, go back to the real board for a minute and re-fire the photograph.",
        figure: {
          visual: {
            kind: "diagram",
            name: "focus-lamp",
          },
          caption: "When the beads blur, a minute on the real board brings them back.",
        },
      },
      {
        id: "draw-the-board-eyes-closed",
        type: "paragraph",
        text: "Practise 'drawing' the board with your eyes closed after you clear it — from 0 beads up to a full board and back down.",
        figure: {
          visual: {
            kind: "diagram",
            name: "clear-board",
          },
          caption: "Empty rods first, then beads one at a time, all the way up and back down.",
        },
      },
      {
        id: "refresh-drill-4-plus-9",
        type: "quiz",
        prompt: "Refresh drill: 4 + 9 = ?",
        choices: [13, 12, 14, 15],
        answer: 13,
        explanation: {
          steps: [
            {
              text: "Set 4 on the ones rod, then add 9.",
              visual: {
                kind: "abacus",
                digits: [4, 0],
              },
            },
            {
              text: "The rod can't hold 13, so carry one ten and leave 3 ones.",
              visual: {
                kind: "diagram",
                name: "ghost-carry",
                numbers: [4, 9],
              },
            },
            {
              text: "One ten and 3 ones is 13.",
              visual: {
                kind: "abacus",
                digits: [3, 1],
              },
            },
          ],
        },
      },
      {
        id: "56-minus-19",
        type: "quiz",
        prompt: "Hold 56 in mind, then subtract 19. What do you see?",
        choices: [37, 36, 38, 47],
        answer: 37,
        explanation: {
          steps: [
            {
              text: "Borrow one ten so the ones rod becomes 16.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "16 minus 9 is 7.",
              visual: {
                kind: "abacus",
                digits: [7, 4],
              },
            },
            {
              text: "The tens go from 5 to 4, and 4 minus 1 is 3 - the answer is 37.",
              visual: {
                kind: "abacus",
                digits: [7, 3],
              },
            },
          ],
        },
      },
    ],
    "ten-number-sprint": [
      {
        id: "the-ten-number-sprint",
        type: "heading",
        text: "The ten-number sprint",
        figure: {
          visual: {
            kind: "diagram",
            name: "ting-xinsuan",
            numbers: [6, 14, 9, 21],
          },
          caption: "Ten numbers read aloud, one total kept in your head, one answer spoken.",
        },
      },
      {
        id: "the-classic-anzan-drill",
        type: "paragraph",
        text: "The classic anzan drill: add ten numbers to one running total. Have someone read a list aloud while you keep the total on your mental board — then say the final number out loud.",
        figure: {
          visual: {
            kind: "diagram",
            name: "listening-drill",
            numbers: [6, 4, 9, 2, 7, 3],
          },
          caption: "The reader sets the pace, so the beads have to move at the speed of the voice.",
        },
      },
      {
        id: "try-the-ten-number-list",
        type: "paragraph",
        text: "Try this list now, adding each number to your mental board as you go: 6, 14, 9, 21, 7, 13, 18, 5, 22, 10.",
        figure: {
          visual: {
            kind: "diagram",
            name: "drill-rhythm",
            numbers: [6, 14, 9, 21, 7, 13],
          },
          caption: "Work down the list once and say the total out loud at the end.",
        },
      },
      {
        id: "the-sprint-running-total",
        type: "quiz",
        prompt: "What is the running total after that whole sprint list?",
        choices: [125, 120, 118, 132],
        answer: 125,
        explanation: {
          steps: [
            {
              text: "Start the running total at 6, then add 14, 9, 21, and 7 to reach 57.",
              visual: {
                kind: "diagram",
                name: "number-sprint",
                numbers: [6, 14, 9, 21, 7],
              },
            },
            {
              text: "Keep adding 13, 18, 5, 22, and 10, and the total lands on 125.",
              visual: {
                kind: "abacus",
                digits: [5, 2, 1],
              },
            },
          ],
        },
      },
      {
        id: "shorter-sprint-12-plus-8",
        type: "quiz",
        prompt: "Shorter sprint: 12 + 8 + 15 + 5 + 20 = ?",
        choices: [60, 55, 62, 58],
        answer: 60,
        explanation: {
          steps: [
            {
              text: "12 plus 8 is 20.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
            {
              text: "Add 15 to reach 35, then 5 to reach 40.",
              visual: {
                kind: "abacus",
                digits: [0, 4],
              },
            },
            {
              text: "Add 20 more to land on 60.",
              visual: {
                kind: "abacus",
                digits: [0, 6],
              },
            },
          ],
        },
      },
    ],
    "anzan-mastery-check": [
      {
        id: "final-challenge",
        type: "heading",
        text: "Final challenge",
        figure: {
          visual: {
            kind: "diagram",
            name: "championship",
          },
          caption: "Every level you finished is standing behind this last set.",
        },
      },
      {
        id: "a-mini-championship-set",
        type: "paragraph",
        text: "A mini championship set. Keep your mental board steady and solve every question.",
        figure: {
          visual: {
            kind: "diagram",
            name: "exam-paper",
          },
          caption: "Answer without stopping and check the total only at the end.",
        },
      },
      {
        id: "34-plus-27",
        type: "quiz",
        prompt: "34 + 27 = ?",
        choices: [61, 60, 62, 51],
        answer: 61,
        explanation: {
          steps: [
            {
              text: "Ones: 4 plus 7 is 11, so write 1 and carry 1.",
              visual: {
                kind: "abacus",
                digits: [1, 4],
              },
            },
            {
              text: "Tens: 3 plus 2 plus 1 is 6 - the answer is 61.",
              visual: {
                kind: "abacus",
                digits: [1, 6],
              },
            },
          ],
        },
      },
      {
        id: "100-minus-47-plus-12",
        type: "quiz",
        prompt: "100 − 47 + 12 = ?",
        choices: [65, 64, 66, 55],
        answer: 65,
        explanation: {
          steps: [
            {
              text: "Start at 100 and subtract 47 to get 53.",
              visual: {
                kind: "abacus",
                digits: [3, 5],
              },
            },
            {
              text: "Add 12 to land on 65.",
              visual: {
                kind: "abacus",
                digits: [5, 6],
              },
            },
          ],
        },
      },
      {
        id: "string-5-plus-18",
        type: "quiz",
        prompt: "A string: 5 + 18 + 24 + 6 = ?",
        choices: [53, 52, 54, 43],
        answer: 53,
        explanation: {
          steps: [
            {
              text: "5 plus 18 is 23.",
              visual: {
                kind: "abacus",
                digits: [3, 2],
              },
            },
            {
              text: "Add 24 to reach 47, then add 6 to land on 53.",
              visual: {
                kind: "abacus",
                digits: [3, 5],
              },
            },
          ],
        },
      },
      {
        id: "12-40-plus-8-60",
        type: "quiz",
        prompt: "$12.40 + $8.60 = ?",
        choices: [21, 20.4, 21.4, 20],
        answer: 21,
        explanation: {
          steps: [
            {
              text: "Treat the cents as ones: 1240 plus 860.",
              visual: {
                kind: "abacus",
                digits: [0, 4, 2, 1],
              },
            },
            {
              text: "1240 plus 860 is 2100.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 1, 2],
              },
            },
            {
              text: "Read it back as $21.00.",
              visual: {
                kind: "abacus",
                digits: [1, 2],
              },
            },
          ],
        },
      },
      {
        id: "build-the-final-sprint",
        type: "build",
        prompt: "Show the final sprint result: 6 + 14 + 9 + 21 + 7 + 13 + 18 + 5 + 22 + 10 = 125.",
        target: 125,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "The sprint 6 + 14 + 9 + 21 + 7 + 13 + 18 + 5 + 22 + 10 totals 125.",
              visual: {
                kind: "diagram",
                name: "big-board",
                numbers: [5, 2, 1],
              },
            },
            {
              text: "Build 1 hundred, 2 tens, and 5 ones.",
              visual: {
                kind: "abacus",
                digits: [5, 2, 1],
              },
            },
          ],
        },
      },
    ],
  },
};
