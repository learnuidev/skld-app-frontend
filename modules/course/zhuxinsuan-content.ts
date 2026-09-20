import type { CourseContentMap } from "./types";

export const zhuxinsuanContent: CourseContentMap = {
  "meet-the-suanpan": {
    "what-is-zhuxinsuan": [
      {
        id: "abacus-in-your-head",
        type: "heading",
        text: "An abacus that lives in your head",
        figure: {
          visual: {
            kind: "diagram",
            name: "mental-board",
            numbers: [4, 3],
          },
          caption: "Your hands learn the beads first, and your mind keeps the same board afterwards.",
        },
      },
      {
        id: "what-zhuxinsuan-means",
        type: "paragraph",
        text: "珠心算 (zhū xīn suàn) means 'abacus mental arithmetic'. First you master the abacus itself — 珠算 (zhū suàn) — then you run the same bead movements on an abacus you picture in your mind. The beads disappear; the method stays.",
        figure: {
          visual: {
            kind: "diagram",
            name: "photo-snap",
          },
          caption: "Every move you make on the real board is being stored away for later.",
        },
      },
      {
        id: "the-chinese-way",
        type: "paragraph",
        text: "In this course you'll learn the Chinese way: clear oral formulas called 口诀 (kǒujué), disciplined finger work, and the listening and flash drills that Chinese 珠心算 classes are famous for.",
        figure: {
          visual: {
            kind: "diagram",
            name: "fingers",
          },
          caption: "The same two fingers do the work in every drill you will meet here.",
        },
      },
      {
        id: "five-bead-suanpan",
        type: "explore",
        label: "This modern five-bead 算盘 is exactly the board we'll train on. Click the beads and watch them move to the beam.",
        rods: 4,
        initial: [4, 3, 2, 1],
      },
      {
        id: "notice-the-layout",
        type: "paragraph",
        text: "Notice the layout: one bead above the beam — the 上珠 (shàng zhū, upper bead, worth 5) — and four below — 下珠 (xià zhū, lower beads, worth 1 each).",
        figure: {
          visual: {
            kind: "abacus",
            digits: [5],
          },
          caption: "One bead on the far side of the beam, four on the near side, and nothing else.",
        },
      },
    ],
    "suanpan-parts": [
      {
        id: "anatomy-the-chinese-way",
        type: "heading",
        text: "Anatomy, the Chinese way",
        figure: {
          visual: {
            kind: "diagram",
            name: "soroban",
          },
          caption: "Frame, beam and rod each have a name your class will use in every lesson.",
        },
      },
      {
        id: "parts-of-the-suanpan",
        type: "list",
        items: [
          "算盘 (suànpán) — the abacus itself.",
          "框 (kuàng) — the frame around the outside.",
          "梁 (liáng) — the beam; beads touching it are counted.",
          "档 (dàng) — a rod; each rod holds one digit.",
          "上珠 (shàng zhū) — the upper bead, worth 5.",
          "下珠 (xià zhū) — the lower beads, worth 1 each.",
        ],
        figure: {
          visual: {
            kind: "diagram",
            name: "one-rod",
            numbers: [5],
          },
          caption: "The beam counts the beads that touch it, and one rod holds one digit.",
        },
      },
      {
        id: "traditional-and-modern-beads",
        type: "paragraph",
        text: "Traditional large suanpan have two upper and five lower beads per rod. The modern five-bead 算盘 you see here keeps one upper and four lower — all any decimal number ever needs — and it is the board most 珠心算 classes teach on.",
        figure: {
          visual: {
            kind: "diagram",
            name: "chinese-board",
            numbers: [4, 3],
          },
          caption: "Older boards kept spare beads that the five-bead rod never needs.",
        },
      },
      {
        id: "make-the-beam-yours",
        type: "explore",
        label: "Make the beam yours: set a number, clear it, then set another.",
        rods: 3,
        initial: [0, 0, 0],
      },
      {
        id: "read-one-upper-bead",
        type: "read",
        prompt: "One 上珠 touching the beam. What number is this 档 showing?",
        digits: [5],
        choices: [5, 1, 4, 10],
        explanation: {
          steps: [
            {
              text: "The 上珠 touching the beam is worth exactly 5.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5]],
                captions: ["Empty rod", "Heaven bead down → 5"],
                label: "5",
              },
            },
            {
              text: "No 下珠 are down, so this 档 shows 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
    ],
    "fingers-and-values": [
      {
        id: "finger-work",
        type: "heading",
        text: "拨珠指法 — finger work",
        figure: {
          visual: {
            kind: "diagram",
            name: "fingers",
          },
          caption: "Thumb and index carry every move, and the other fingers stay out of the way.",
        },
      },
      {
        id: "correct-fingers",
        type: "paragraph",
        text: "Correct fingers make fast, clean beadwork. Standard rule: the thumb pushes 下珠 up to the beam; the index finger pushes 下珠 down and also moves the 上珠. One clean movement per bead — no fidgeting.",
        figure: {
          visual: {
            kind: "abacus-anim",
            frames: [[0], [1], [2], [3]],
            captions: ["0", "1", "2", "3"],
          },
          caption: "One clean push per bead, and the hand leaves the rod alone afterwards.",
        },
      },
      {
        id: "bead-values",
        type: "paragraph",
        text: "And the values: every 下珠 touching the beam is 1; the 上珠 touching it is 5.",
        figure: {
          visual: {
            kind: "diagram",
            name: "bead-values",
          },
          caption: "Five for the single bead on the far side of the beam, one for each of the rest.",
        },
      },
      {
        id: "read-upper-plus-one",
        type: "read",
        prompt: "上珠 plus one 下珠. What number is shown?",
        digits: [6],
        choices: [6, 5, 1, 7],
        explanation: {
          steps: [
            {
              text: "The 上珠 alone is worth 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "Add the one 下珠: 5 + 1 = 6.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [6]],
                captions: ["Heaven bead: 5", "One earth bead up → 6"],
                label: "6",
              },
            },
          ],
        },
      },
      {
        id: "read-upper-plus-four",
        type: "read",
        prompt: "上珠 plus all four 下珠. What number is shown?",
        digits: [9],
        choices: [9, 4, 5, 8],
        explanation: {
          steps: [
            {
              text: "The 上珠 is worth 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "All four 下珠 are worth 4, so 5 + 4 = 9.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [6], [7], [8], [9]],
                captions: ["5", "+1 → 6", "+2 → 7", "+3 → 8", "+4 → 9"],
                label: "9",
              },
            },
          ],
        },
      },
      {
        id: "build-8-the-proper-way",
        type: "build",
        prompt: "Show 8 the proper way: index finger down for the 上珠, thumb up for three 下珠.",
        target: 8,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "Drop the 上珠 for 5, then thumb up three 下珠 for 3.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5], [6], [7], [8]],
                captions: ["Empty rod", "Heaven bead down → 5", "+1 → 6", "+2 → 7", "+3 → 8"],
                label: "8",
              },
            },
            {
              text: "One 下珠 stays tucked away from the beam — 5 + 3 = 8.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
          ],
        },
      },
    ],
    "from-abacus-to-mind": [
      {
        id: "the-training-ladder",
        type: "heading",
        text: "The training ladder",
        figure: {
          visual: {
            kind: "diagram",
            name: "progress-ladder",
          },
          caption: "Each rung has to be earned: the real board first, then the board inside.",
        },
      },
      {
        id: "taught-in-stages",
        type: "paragraph",
        text: "珠心算 is taught in stages. First you make every move on a real 算盘 while reading the numbers — that is 看珠算 (kàn zhū suàn). Then you close your eyes and make the same moves on the board in your head — 心算 (xīn suàn).",
        figure: {
          visual: {
            kind: "diagram",
            name: "board-vs-numeral",
            numbers: [4, 3],
          },
          caption: "Reading beads and writing digits are two views of the same number.",
        },
      },
      {
        id: "graded-tests",
        type: "paragraph",
        text: "Students in Chinese 珠心算 classes progress through graded tests from 十级 (grade 10) toward 一级 and beyond. This course mirrors that path: level by level you'll earn the right to leave the real board behind.",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["十级", "五级", "一级"],
          },
          caption: "The grades count downward, and each test asks for more beads at once.",
        },
      },
      {
        id: "warm-up-read",
        type: "read",
        prompt: "Warm up: what number is this 档 showing?",
        digits: [1, 3],
        choices: [13, 31, 4, 30],
        explanation: {
          steps: [
            {
              text: "The tens 档 shows 3.",
              visual: {
                kind: "abacus",
                digits: [0, 3],
              },
            },
            {
              text: "The ones 档 shows 1, so the number is 31.",
              visual: {
                kind: "abacus",
                digits: [1, 3],
              },
            },
          ],
        },
      },
      {
        id: "build-24",
        type: "build",
        prompt: "Build 24 — the number you'll soon be able to picture with your eyes closed.",
        target: 24,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Two 下珠 on the tens 档 make 20.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
            {
              text: "Four 下珠 on the ones 档 make 4, so the board shows 24.",
              visual: {
                kind: "abacus",
                digits: [4, 2],
              },
            },
          ],
        },
      },
    ],
    "meet-the-suanpan-check": [
      {
        id: "level-check-meet-the-suanpan",
        type: "heading",
        text: "Level check — meet the suanpan",
        figure: {
          visual: {
            kind: "diagram",
            name: "exam-paper",
          },
          caption: "A short paper closes the level before the next set of beads arrives.",
        },
      },
      {
        id: "read-it-then-build-it",
        type: "paragraph",
        text: "Read it, then build it. Solve every question to finish the level.",
        figure: {
          visual: {
            kind: "diagram",
            name: "image-to-number",
            numbers: [4, 3],
          },
          caption: "Read the number first, then make the beads agree with it.",
        },
      },
      {
        id: "read-upper-plus-two",
        type: "read",
        prompt: "上珠 plus two 下珠. What number is shown?",
        digits: [7],
        choices: [7, 2, 6, 5],
        explanation: {
          steps: [
            {
              text: "The 上珠 is worth 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "Two 下珠 add 2, so 5 + 2 = 7.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [6], [7]],
                captions: ["5", "+1 → 6", "+2 → 7"],
                label: "7",
              },
            },
          ],
        },
      },
      {
        id: "build-5-upper-bead-only",
        type: "build",
        prompt: "Show 5 using only your 上珠.",
        target: 5,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "5 needs just the single 上珠 touched to the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5]],
                captions: ["Empty rod", "Heaven bead down → 5"],
                label: "5",
              },
            },
            {
              text: "No 下珠 are used, so the 档 shows 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "build-36-on-two-rods",
        type: "build",
        prompt: "Now show 36 on two 档.",
        target: 36,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Three 下珠 on the tens 档 make 30.",
              visual: {
                kind: "abacus",
                digits: [0, 3],
              },
            },
            {
              text: "On the ones 档, one 上珠 plus one 下珠 make 6, so 36.",
              visual: {
                kind: "abacus",
                digits: [6, 3],
              },
            },
          ],
        },
      },
      {
        id: "read-two-lower-on-tens",
        type: "read",
        prompt: "Two 下珠 on the tens 档 and none on the ones 档. What number?",
        digits: [0, 2],
        choices: [20, 2, 22, 200],
        explanation: {
          steps: [
            {
              text: "Two 下珠 on the tens 档 make 20.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
            {
              text: "Nothing sits on the ones 档, so the number is 20.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
          ],
        },
      },
    ],
  },

  "direct-add-subtract": {
    "direct-add": [
      {
        id: "direct-addition",
        type: "heading",
        text: "直加 — direct addition",
        figure: {
          visual: {
            kind: "diagram",
            name: "koujue",
            labels: ["一上一", "二上二", "三上三"],
          },
          caption: "Each formula names the bead and the direction it travels.",
        },
      },
      {
        id: "addition-with-room-to-spare",
        type: "paragraph",
        text: "直加 (zhí jiā) is addition with room to spare: every bead you need can slide straight to the beam. Each move has a formula, a 口诀. Adding one is 一上一 (yī shàng yī) — 'one, up one'. Two is 二上二, three 三上三, and so on.",
        figure: {
          visual: {
            kind: "abacus",
            digits: [4],
          },
          caption: "Four are against the beam already, and there is still room for more.",
        },
      },
      {
        id: "say-the-formula",
        type: "paragraph",
        text: "Read the formula as you move: 3 + 1 says 一上一 and the rod shows 4. 5 + 3 says 三上三 — the 上珠 is already home and three 下珠 join it to show 8.",
        figure: {
          visual: {
            kind: "abacus",
            digits: [8],
          },
          caption: "The upper bead was home already, and three lower beads joined it.",
        },
      },
      {
        id: "quiz-3-plus-1",
        type: "quiz",
        prompt: "3 + 1 = ?",
        choices: [4, 3, 5, 6],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "一上一 — one 下珠 slides straight up to the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[3], [4]],
                captions: ["3 on the rod", "+1 → 4"],
                label: "4",
              },
            },
            {
              text: "3 + 1 = 4, with no carrying.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-5-plus-4",
        type: "quiz",
        prompt: "5 + 4 = ?",
        choices: [9, 8, 10, 7],
        answer: 9,
        explanation: {
          steps: [
            {
              text: "The 上珠 is already home, worth 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "Four 下珠 join it by 直加, so 5 + 4 = 9.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [6], [7], [8], [9]],
                captions: ["Heaven bead: 5", "+1 → 6", "+2 → 7", "+3 → 8", "+4 → 9"],
                label: "9",
              },
            },
          ],
        },
      },
      {
        id: "quiz-1-plus-5",
        type: "quiz",
        prompt: "1 + 5 = ?",
        choices: [6, 5, 7, 4],
        answer: 6,
        explanation: {
          steps: [
            {
              text: "一上一 sets the 1 on the 档.",
              visual: {
                kind: "abacus",
                digits: [1],
              },
            },
            {
              text: "Then 五上五 drops the 上珠 for 5, so 1 + 5 = 6.",
              visual: {
                kind: "abacus-anim",
                frames: [[1], [6]],
                captions: ["1 on the rod", "Heaven bead down → 6"],
                label: "6",
              },
            },
          ],
        },
      },
      {
        id: "build-5-plus-3",
        type: "build",
        prompt: "Show 5 + 3 = 8 on your 算盘.",
        target: 8,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "直加 has room to spare: the 上珠 (5) and three 下珠 (3) slide straight in.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5], [6], [7], [8]],
                captions: ["Empty rod", "Heaven bead down → 5", "+1 → 6", "+2 → 7", "+3 → 8"],
                label: "8",
              },
            },
            {
              text: "5 + 3 = 8.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
          ],
        },
      },
    ],
    "direct-subtract": [
      {
        id: "direct-subtraction",
        type: "heading",
        text: "直减 — direct subtraction",
        figure: {
          visual: {
            kind: "diagram",
            name: "clear-board",
          },
          caption: "Every subtraction ends where the board began, with the beads at rest.",
        },
      },
      {
        id: "beads-off-the-beam",
        type: "paragraph",
        text: "直减 (zhí jiǎn) removes beads straight off the beam. The 口诀: taking one away is 一去一 (yī qù yī) — 'one, remove one'. Two is 二去二, all the way up to 五去五 for the 上珠.",
        figure: {
          visual: {
            kind: "abacus-anim",
            frames: [[3], [2], [1], [0]],
            captions: ["3", "2", "1", "0"],
          },
          caption: "Beads leave the beam one at a time, and the rod counts itself down.",
        },
      },
      {
        id: "watch-the-beads-leave",
        type: "paragraph",
        text: "Watch the beads leave as you say it: 9 − 2 is 二去二 and the rod shows 7. 6 − 5 is 五去五 and only the single 下珠 stays — 1.",
        figure: {
          visual: {
            kind: "diagram",
            name: "column-subtract",
            numbers: [9, 2],
          },
          caption: "The answer stays on the same rod, showing fewer beads than before.",
        },
      },
      {
        id: "quiz-9-minus-2",
        type: "quiz",
        prompt: "9 − 2 = ?",
        choices: [7, 6, 8, 5],
        answer: 7,
        explanation: {
          steps: [
            {
              text: "二去二 — two 下珠 leave the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[9], [8], [7]],
                captions: ["9", "−1 → 8", "−2 → 7"],
                label: "7",
              },
            },
            {
              text: "9 − 2 = 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "quiz-6-minus-5",
        type: "quiz",
        prompt: "6 − 5 = ?",
        choices: [1, 5, 0, 2],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "五去五 lifts the 上珠 away.",
              visual: {
                kind: "abacus-anim",
                frames: [[6], [1]],
                captions: ["6 on the rod", "Heaven bead up → 1"],
                label: "1",
              },
            },
            {
              text: "Only the single 下珠 (worth 1) stays.",
              visual: {
                kind: "abacus",
                digits: [1],
              },
            },
          ],
        },
      },
      {
        id: "quiz-8-minus-3",
        type: "quiz",
        prompt: "8 − 3 = ?",
        choices: [5, 4, 6, 3],
        answer: 5,
        explanation: {
          steps: [
            {
              text: "直减: three 下珠 leave the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[8], [7], [6], [5]],
                captions: ["8", "−1 → 7", "−2 → 6", "−3 → 5"],
                label: "5",
              },
            },
            {
              text: "The 上珠 (5) is all that remains, so 8 − 3 = 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "build-8-minus-3",
        type: "build",
        prompt: "Show 8 − 3 = 5 on the rod.",
        target: 5,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "直减 has room: remove three 下珠 from the 8.",
              visual: {
                kind: "abacus-anim",
                frames: [[8], [7], [6], [5]],
                captions: ["8", "−1 → 7", "−2 → 6", "−3 → 5"],
                label: "5",
              },
            },
            {
              text: "Only the 上珠 (5) is left, so 8 − 3 = 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
    ],
    "accurate-quick": [
      {
        id: "read-accurately-move-quickly",
        type: "heading",
        text: "读得准，拨得快",
        figure: {
          visual: {
            kind: "diagram",
            name: "focus-lamp",
          },
          caption: "Keep your attention on the rod you are working and let the rest wait.",
        },
      },
      {
        id: "form-comes-first",
        type: "paragraph",
        text: "In 珠算 class, form comes first: say the 口诀, move the beads, read the answer. Fast fingers on the wrong beads are worse than slow fingers on the right ones.",
        figure: {
          visual: {
            kind: "diagram",
            name: "accuracy-target",
            numbers: [8, 2],
          },
          caption: "A slow bead that lands right beats a fast one on the wrong rod.",
        },
      },
      {
        id: "read-in-one-glance",
        type: "read",
        prompt: "Read this 档 in one glance.",
        digits: [5],
        choices: [5, 4, 6, 10],
        explanation: {
          steps: [
            {
              text: "One 上珠 touching the beam reads as 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "No 下珠 are added, so this 档 shows 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "read-two-rods-together",
        type: "read",
        prompt: "Now read two 档 together.",
        digits: [1, 4],
        choices: [14, 41, 5, 40],
        explanation: {
          steps: [
            {
              text: "The tens 档 shows 4.",
              visual: {
                kind: "abacus",
                digits: [0, 4],
              },
            },
            {
              text: "The ones 档 shows 1, so the two-rod number is 41.",
              visual: {
                kind: "abacus",
                digits: [1, 4],
              },
            },
          ],
        },
      },
      {
        id: "build-25-quickly",
        type: "build",
        prompt: "Set 25 quickly: two 下珠 on the tens 档, one 上珠 on the ones 档.",
        target: 25,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Two 下珠 on the tens 档 give 20.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
            {
              text: "One 上珠 on the ones 档 gives 5, so 25.",
              visual: {
                kind: "abacus",
                digits: [5, 2],
              },
            },
          ],
        },
      },
      {
        id: "clear-then-build-37",
        type: "build",
        prompt: "Clear, then set 37.",
        target: 37,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Three 下珠 on the tens 档 give 30.",
              visual: {
                kind: "abacus",
                digits: [0, 3],
              },
            },
            {
              text: "One 上珠 plus two 下珠 on the ones 档 give 7, so 37.",
              visual: {
                kind: "abacus",
                digits: [7, 3],
              },
            },
          ],
        },
      },
    ],
    "two-digit-direct": [
      {
        id: "two-digit-direct-work",
        type: "heading",
        text: "Two-digit 直加减",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods",
            numbers: [5, 3],
          },
          caption: "Tens sit on the left rod, ones on the right, and neither moves alone.",
        },
      },
      {
        id: "line-up-place-values",
        type: "paragraph",
        text: "Two-digit direct work lines up the 档 by place value and moves beads rod by rod. 22 + 31: tens get 2 + 3 = 5, ones get 2 + 1 = 3, answer 53. No trick 口诀 needed — just 直加 on both rods.",
        figure: {
          visual: {
            kind: "diagram",
            name: "column-add",
            numbers: [22, 31],
          },
          caption: "Each column is worked on its own rod before the answer is read.",
        },
      },
      {
        id: "subtraction-works-the-same-way",
        type: "paragraph",
        text: "Subtraction works the same way: 56 − 24 removes two tens and four ones to leave 32.",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods",
            numbers: [3, 2],
          },
          caption: "Two tens and four ones walk away, and thirty-two is what remains.",
        },
      },
      {
        id: "quiz-22-plus-31",
        type: "quiz",
        prompt: "22 + 31 = ?",
        choices: [53, 43, 63, 52],
        answer: 53,
        explanation: {
          steps: [
            {
              text: "Tens 档: 2 + 3 = 5.",
              visual: {
                kind: "abacus",
                digits: [2, 5],
              },
            },
            {
              text: "Ones 档: 2 + 1 = 3.",
              visual: {
                kind: "abacus",
                digits: [3, 5],
              },
            },
            {
              text: "So 22 + 31 = 53.",
              visual: {
                kind: "abacus",
                digits: [3, 5],
              },
            },
          ],
        },
      },
      {
        id: "quiz-56-minus-24",
        type: "quiz",
        prompt: "56 − 24 = ?",
        choices: [32, 22, 42, 34],
        answer: 32,
        explanation: {
          steps: [
            {
              text: "Remove 2 tens: 5 − 2 = 3 on the tens 档.",
              visual: {
                kind: "abacus",
                digits: [6, 3],
              },
            },
            {
              text: "Remove 4 ones: 6 − 4 = 2 on the ones 档.",
              visual: {
                kind: "abacus",
                digits: [2, 3],
              },
            },
            {
              text: "So 56 − 24 = 32.",
              visual: {
                kind: "abacus",
                digits: [2, 3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-33-plus-15",
        type: "quiz",
        prompt: "33 + 15 = ?",
        choices: [48, 38, 58, 47],
        answer: 48,
        explanation: {
          steps: [
            {
              text: "Tens: 3 + 1 = 4.",
              visual: {
                kind: "abacus",
                digits: [3, 4],
              },
            },
            {
              text: "Ones: 3 + 5 = 8.",
              visual: {
                kind: "abacus",
                digits: [8, 4],
              },
            },
            {
              text: "So 33 + 15 = 48.",
              visual: {
                kind: "abacus",
                digits: [8, 4],
              },
            },
          ],
        },
      },
      {
        id: "build-22-plus-31",
        type: "build",
        prompt: "Show 22 + 31 = 53 on the abacus.",
        target: 53,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "直加 on both 档 — tens: 2 + 3 = 5.",
              visual: {
                kind: "abacus",
                digits: [2, 5],
              },
            },
            {
              text: "Ones: 2 + 1 = 3.",
              visual: {
                kind: "abacus",
                digits: [3, 5],
              },
            },
            {
              text: "The board shows 53.",
              visual: {
                kind: "abacus",
                digits: [3, 5],
              },
            },
          ],
        },
      },
    ],
    "direct-check": [
      {
        id: "level-check-direct-add-subtract",
        type: "heading",
        text: "Level check — direct addition and subtraction",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["直加", "直减", "两位数"],
          },
          caption: "Tick the level off once both directions run at the same speed.",
        },
      },
      {
        id: "say-move-read",
        type: "paragraph",
        text: "Say the 口诀, make the move, read the answer.",
        figure: {
          visual: {
            kind: "diagram",
            name: "drill-rhythm",
            numbers: [1, 2, 3],
          },
          caption: "Say it, move it, read it, and keep those three beats every time.",
        },
      },
      {
        id: "quiz-4-plus-5",
        type: "quiz",
        prompt: "4 + 5 = ?",
        choices: [9, 8, 10, 6],
        answer: 9,
        explanation: {
          steps: [
            {
              text: "The 上珠 comes down for 5.",
              visual: {
                kind: "abacus-anim",
                frames: [[4], [9]],
                captions: ["4 on the rod", "Heaven bead down → 9"],
                label: "9",
              },
            },
            {
              text: "Four 下珠 join it, so 4 + 5 = 9.",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
          ],
        },
      },
      {
        id: "quiz-7-minus-2",
        type: "quiz",
        prompt: "7 − 2 = ?",
        choices: [5, 4, 6, 3],
        answer: 5,
        explanation: {
          steps: [
            {
              text: "二去二 — two 下珠 leave the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[7], [6], [5]],
                captions: ["7", "−1 → 6", "−2 → 5"],
                label: "5",
              },
            },
            {
              text: "The 上珠 stays at 5, so 7 − 2 = 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "build-33-plus-15",
        type: "build",
        prompt: "Show 33 + 15 = 48 on the abacus.",
        target: 48,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "直加 on both 档 — tens: 3 + 1 = 4.",
              visual: {
                kind: "abacus",
                digits: [3, 4],
              },
            },
            {
              text: "Ones: 3 + 5 = 8.",
              visual: {
                kind: "abacus",
                digits: [8, 4],
              },
            },
            {
              text: "The board shows 48.",
              visual: {
                kind: "abacus",
                digits: [8, 4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-48-minus-15",
        type: "quiz",
        prompt: "48 − 15 = ?",
        choices: [33, 43, 23, 34],
        answer: 33,
        explanation: {
          steps: [
            {
              text: "Tens: 4 − 1 = 3.",
              visual: {
                kind: "abacus",
                digits: [8, 3],
              },
            },
            {
              text: "Ones: 8 − 5 = 3.",
              visual: {
                kind: "abacus",
                digits: [3, 3],
              },
            },
            {
              text: "So 48 − 15 = 33.",
              visual: {
                kind: "abacus",
                digits: [3, 3],
              },
            },
          ],
        },
      },
    ],
  },

  "friends-of-five": {
    "complement-to-five": [
      {
        id: "complements-hiding-in-five",
        type: "heading",
        text: "The complements hiding in five",
        figure: {
          visual: {
            kind: "diagram",
            name: "five-complement",
          },
          caption: "The pairs that make five are the ones a full rod reaches for first.",
        },
      },
      {
        id: "when-lower-beads-are-busy",
        type: "paragraph",
        text: "When the 下珠 of a rod are busy, adding another 1 to 4 needs the 上珠 — and to keep the total right you remove the addend's 凑数 (còu shù, complement to five). Four's complement is one; three's complement is two.",
        figure: {
          visual: {
            kind: "diagram",
            name: "one-rod",
            numbers: [4],
          },
          caption: "Four beads are down, so the fifth has to come from the other side of the beam.",
        },
      },
      {
        id: "drop-five-remove-one",
        type: "paragraph",
        text: "So 'add 4 to a full lower rod' means: 下五 (drop the 5) then 去一 (remove one).",
        figure: {
          visual: {
            kind: "abacus-anim",
            frames: [[4], [9], [8]],
            captions: ["4", "9", "8"],
          },
          caption: "Two moves, one result: the upper bead drops, then a lower bead steps aside.",
        },
      },
      {
        id: "quiz-3-plus-4",
        type: "quiz",
        prompt: "3 + 4 = ?",
        choices: [7, 6, 8, 5],
        answer: 7,
        explanation: {
          steps: [
            {
              text: "The lower beads are busy, so 四下五去一: drop the 上珠 (5).",
              visual: {
                kind: "abacus-anim",
                frames: [[3], [8]],
                captions: ["3 on the rod", "四下五去一: heaven bead down → 8"],
                label: "8",
              },
            },
            {
              text: "Remove one 下珠 (the complement of 4 to 5).",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
            {
              text: "3 + 5 − 1 = 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "quiz-2-plus-4",
        type: "quiz",
        prompt: "2 + 4 = ?",
        choices: [6, 5, 7, 4],
        answer: 6,
        explanation: {
          steps: [
            {
              text: "四下五去一: drop the 上珠 (5).",
              visual: {
                kind: "abacus-anim",
                frames: [[2], [7]],
                captions: ["2 on the rod", "四下五去一: heaven bead down → 7"],
                label: "7",
              },
            },
            {
              text: "Remove one 下珠 for the complement of 4.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
            {
              text: "2 + 5 − 1 = 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
      {
        id: "quiz-4-plus-4",
        type: "quiz",
        prompt: "4 + 4 = ?",
        choices: [8, 7, 9, 6],
        answer: 8,
        explanation: {
          steps: [
            {
              text: "The lower beads are full, so use 四下五去一.",
              visual: {
                kind: "abacus-anim",
                frames: [[4], [9]],
                captions: ["4 lower beads: full", "四下五去一: heaven bead down → 9"],
                label: "9",
              },
            },
            {
              text: "Drop the 上珠 (5), then remove one 下珠.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
            {
              text: "4 + 5 − 1 = 8.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
          ],
        },
      },
    ],
    "add-with-five": [
      {
        id: "adding-with-the-five",
        type: "heading",
        text: "满五加 — adding with the five",
        figure: {
          visual: {
            kind: "diagram",
            name: "koujue",
            labels: ["一下五去四", "二下五去三", "三下五去二"],
          },
          caption: "The five always comes down first, and then the beads it owes step back.",
        },
      },
      {
        id: "memorize-these-formulas",
        type: "paragraph",
        text: "For adding 1 through 4 when the lower beads are tight, memorize these formulas:",
        figure: {
          visual: {
            kind: "diagram",
            name: "five-complement",
          },
          caption: "One and four, two and three: the same two couples return in every line.",
        },
      },
      {
        id: "add-with-five-formulas",
        type: "list",
        items: [
          "加1：一下五去四 — one, drop five, remove four.",
          "加2：二下五去三 — two, drop five, remove three.",
          "加3：三下五去二 — three, drop five, remove two.",
          "加4：四下五去一 — four, drop five, remove one.",
        ],
        figure: {
          visual: {
            kind: "abacus-anim",
            frames: [[3], [8], [6]],
            captions: ["3", "8", "6"],
          },
          caption: "Adding three overshoots on purpose, passing through eight to settle on six.",
        },
      },
      {
        id: "picture-four-plus-three",
        type: "paragraph",
        text: "Picture 4 + 3: the rod shows four 下珠. Add 3 with 三下五去二 — drop the 上珠, remove two 下珠 — and the rod settles on 7.",
        figure: {
          visual: {
            kind: "abacus",
            digits: [7],
          },
          caption: "Two lower beads step away as the upper bead comes home.",
        },
      },
      {
        id: "quiz-4-plus-1",
        type: "quiz",
        prompt: "4 + 1 = ?",
        choices: [5, 4, 6, 3],
        answer: 5,
        explanation: {
          steps: [
            {
              text: "The 下珠 are full, so 一下五去四.",
              visual: {
                kind: "abacus-anim",
                frames: [[4], [9]],
                captions: ["4 lower beads: full", "一下五去四: heaven bead down → 9"],
                label: "9",
              },
            },
            {
              text: "Drop the 上珠 (5) and remove four 下珠.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "4 + 1 = 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "quiz-4-plus-2",
        type: "quiz",
        prompt: "4 + 2 = ?",
        choices: [6, 5, 7, 8],
        answer: 6,
        explanation: {
          steps: [
            {
              text: "二下五去三: drop the 上珠 (5).",
              visual: {
                kind: "abacus-anim",
                frames: [[4], [9]],
                captions: ["4 lower beads: full", "二下五去三: heaven bead down → 9"],
                label: "9",
              },
            },
            {
              text: "Remove three 下珠 (the complement of 2 to 5).",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
            {
              text: "4 + 5 − 3 = 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
      {
        id: "quiz-3-plus-2",
        type: "quiz",
        prompt: "3 + 2 = ?",
        choices: [5, 4, 6, 7],
        answer: 5,
        explanation: {
          steps: [
            {
              text: "二下五去三: drop the 上珠 (5).",
              visual: {
                kind: "abacus-anim",
                frames: [[3], [8]],
                captions: ["3 on the rod", "二下五去三: heaven bead down → 8"],
                label: "8",
              },
            },
            {
              text: "Remove three 下珠.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "3 + 5 − 3 = 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "quiz-4-plus-3",
        type: "quiz",
        prompt: "4 + 3 = ?",
        choices: [7, 6, 8, 9],
        answer: 7,
        explanation: {
          steps: [
            {
              text: "三下五去二: drop the 上珠 (5).",
              visual: {
                kind: "abacus-anim",
                frames: [[4], [9]],
                captions: ["4 lower beads: full", "三下五去二: heaven bead down → 9"],
                label: "9",
              },
            },
            {
              text: "Remove two 下珠 (the complement of 3 to 5).",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
            {
              text: "4 + 5 − 2 = 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "build-4-plus-3",
        type: "build",
        prompt: "Show 4 + 3 = 7 — the 三下五去二 move.",
        target: 7,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "三下五去二: drop the 上珠 (5).",
              visual: {
                kind: "abacus-anim",
                frames: [[4], [9]],
                captions: ["4 lower beads: full", "三下五去二: heaven bead down → 9"],
                label: "9",
              },
            },
            {
              text: "Remove two 下珠 from the four.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
            {
              text: "4 + 5 − 2 = 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
    ],
    "subtract-with-five": [
      {
        id: "breaking-the-five",
        type: "heading",
        text: "破五减 — breaking the five",
        figure: {
          visual: {
            kind: "diagram",
            name: "bead-values",
          },
          caption: "Break the top bead into the five below it and nothing at all is lost.",
        },
      },
      {
        id: "upper-bead-is-down",
        type: "paragraph",
        text: "Subtracting when the 上珠 is down needs 破五 (pò wǔ, break the five): remove the 上珠 (−5) and add back the subtractor's complement to five.",
        figure: {
          visual: {
            kind: "diagram",
            name: "one-rod",
            numbers: [6],
          },
          caption: "Six is a five and a one together, and breaking the five changes both.",
        },
      },
      {
        id: "subtract-with-five-formulas",
        type: "list",
        items: [
          "减1：一上四去五 — one, up four, remove five.",
          "减2：二上三去五 — two, up three, remove five.",
          "减3：三上二去五 — three, up two, remove five.",
          "减4：四上一去五 — four, up one, remove five.",
        ],
        figure: {
          visual: {
            kind: "diagram",
            name: "five-complement",
          },
          caption: "Taking one means giving four back, which is why the two numbers swap roles.",
        },
      },
      {
        id: "check-6-minus-4",
        type: "paragraph",
        text: "Check 6 − 4: the rod shows 上珠 plus one 下珠. Subtract 4 with 四上一去五 — push up one 下珠 and lift the 上珠 away. Two 下珠 remain: 2.",
        figure: {
          visual: {
            kind: "diagram",
            name: "column-subtract",
            numbers: [6, 4],
          },
          caption: "One lower bead goes up while the upper bead goes away.",
        },
      },
      {
        id: "quiz-6-minus-4",
        type: "quiz",
        prompt: "6 − 4 = ?",
        choices: [2, 3, 1, 4],
        answer: 2,
        explanation: {
          steps: [
            {
              text: "The 上珠 is down, so 破五: 四上一去五.",
              visual: {
                kind: "abacus-anim",
                frames: [[6], [7]],
                captions: ["6: heaven bead down", "四上一去五: one lower bead up → 7"],
                label: "7",
              },
            },
            {
              text: "Push up one 下珠 and lift the 上珠.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
            {
              text: "6 − 5 + 1 = 2.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
          ],
        },
      },
      {
        id: "quiz-7-minus-3",
        type: "quiz",
        prompt: "7 − 3 = ?",
        choices: [4, 3, 5, 6],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "三上二去五: push up two 下珠.",
              visual: {
                kind: "abacus-anim",
                frames: [[7], [9]],
                captions: ["7 on the rod", "三上二去五: two lower beads up → 9"],
                label: "9",
              },
            },
            {
              text: "Remove the 上珠.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
            {
              text: "7 − 5 + 2 = 4.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-5-minus-1",
        type: "quiz",
        prompt: "5 − 1 = ?",
        choices: [4, 5, 3, 6],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "一上四去五: push up four 下珠.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [9]],
                captions: ["Heaven bead only: 5", "一上四去五: four lower beads up → 9"],
                label: "9",
              },
            },
            {
              text: "Lift the 上珠 away, leaving four 下珠.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
            {
              text: "5 − 1 = 4.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-8-minus-4",
        type: "quiz",
        prompt: "8 − 4 = ?",
        choices: [4, 3, 5, 2],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "四上一去五: push up one 下珠.",
              visual: {
                kind: "abacus-anim",
                frames: [[8], [9]],
                captions: ["8 on the rod", "四上一去五: one lower bead up → 9"],
                label: "9",
              },
            },
            {
              text: "Remove the 上珠.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
            {
              text: "8 − 5 + 1 = 4.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "build-6-minus-4",
        type: "build",
        prompt: "Show 6 − 4 = 2 — the 四上一去五 move.",
        target: 2,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "四上一去五: lift the 上珠 away.",
              visual: {
                kind: "abacus-anim",
                frames: [[6], [1]],
                captions: ["6: heaven bead down", "四上一去五: heaven bead up → 1"],
                label: "1",
              },
            },
            {
              text: "Add one 下珠 back.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
            {
              text: "Only two 下珠 remain, so 6 − 4 = 2.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
          ],
        },
      },
    ],
    "friends-of-five-drill": [
      {
        id: "five-complement-practice",
        type: "heading",
        text: "凑五 练习",
        figure: {
          visual: {
            kind: "diagram",
            name: "drill-rhythm",
            numbers: [5, 3],
          },
          caption: "Keep the same beat every round and the words start to run themselves.",
        },
      },
      {
        id: "drill-order",
        type: "paragraph",
        text: "Drill order: say the formula, make the move, read the bead. Repeat sets until the words fall away and your fingers simply know.",
        figure: {
          visual: {
            kind: "diagram",
            name: "daily-practice",
          },
          caption: "A few short rounds each day work better than one long sitting.",
        },
      },
      {
        id: "quiz-6-minus-2",
        type: "quiz",
        prompt: "6 − 2 = ?",
        choices: [4, 3, 5, 2],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "二上三去五: push up three 下珠.",
              visual: {
                kind: "abacus-anim",
                frames: [[6], [9]],
                captions: ["6 on the rod", "二上三去五: three lower beads up → 9"],
                label: "9",
              },
            },
            {
              text: "Lift the 上珠 away.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
            {
              text: "6 − 5 + 3 = 4.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-4-plus-4",
        type: "quiz",
        prompt: "4 + 4 = ?",
        choices: [8, 7, 9, 6],
        answer: 8,
        explanation: {
          steps: [
            {
              text: "四下五去一: drop the 上珠 (5).",
              visual: {
                kind: "abacus-anim",
                frames: [[4], [9]],
                captions: ["4 lower beads: full", "四下五去一: heaven bead down → 9"],
                label: "9",
              },
            },
            {
              text: "Remove one 下珠.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
            {
              text: "4 + 5 − 1 = 8.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
          ],
        },
      },
      {
        id: "quiz-5-minus-2",
        type: "quiz",
        prompt: "5 − 2 = ?",
        choices: [3, 2, 4, 5],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "二上三去五: clear the 上珠.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [8]],
                captions: ["Heaven bead only: 5", "二上三去五: three lower beads up → 8"],
                label: "8",
              },
            },
            {
              text: "Three 下珠 remain.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
            {
              text: "5 − 5 + 3 = 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-4-plus-2",
        type: "quiz",
        prompt: "4 + 2 = ?",
        choices: [6, 5, 7, 4],
        answer: 6,
        explanation: {
          steps: [
            {
              text: "二下五去三: drop the 上珠 (5).",
              visual: {
                kind: "abacus-anim",
                frames: [[4], [9]],
                captions: ["4 lower beads: full", "二下五去三: heaven bead down → 9"],
                label: "9",
              },
            },
            {
              text: "Remove three 下珠.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
            {
              text: "4 + 5 − 3 = 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
      {
        id: "build-5-minus-2",
        type: "build",
        prompt: "Show 5 − 2 = 3 on the rod.",
        target: 3,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "五减二用二上三去五: clear the 上珠.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [8]],
                captions: ["Heaven bead only: 5", "二上三去五: three lower beads up → 8"],
                label: "8",
              },
            },
            {
              text: "Leave three 下珠 on the rod.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
            {
              text: "5 − 2 = 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
    ],
    "friends-of-five-check": [
      {
        id: "level-check-friends-of-five",
        type: "heading",
        text: "Level check — friends of five",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["凑五", "破五", "五"],
          },
          caption: "Five is the whole level: add it, break it, and read it back.",
        },
      },
      {
        id: "break-and-add-the-five",
        type: "paragraph",
        text: "Break the five, add the five, and solve every question.",
        figure: {
          visual: {
            kind: "diagram",
            name: "five-complement",
          },
          caption: "Every question in this set turns on a pair of numbers that makes five.",
        },
      },
      {
        id: "quiz-4-plus-1",
        type: "quiz",
        prompt: "4 + 1 = ?",
        choices: [5, 4, 6, 3],
        answer: 5,
        explanation: {
          steps: [
            {
              text: "一下五去四: drop the 上珠 (5).",
              visual: {
                kind: "abacus-anim",
                frames: [[4], [9]],
                captions: ["4 lower beads: full", "一下五去四: heaven bead down → 9"],
                label: "9",
              },
            },
            {
              text: "Remove four 下珠.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "4 + 1 = 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "quiz-7-minus-4",
        type: "quiz",
        prompt: "7 − 4 = ?",
        choices: [3, 4, 2, 5],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "四上一去五: push up one 下珠.",
              visual: {
                kind: "abacus-anim",
                frames: [[7], [8]],
                captions: ["7 on the rod", "四上一去五: one lower bead up → 8"],
                label: "8",
              },
            },
            {
              text: "Lift the 上珠 away.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
            {
              text: "7 − 5 + 1 = 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "build-3-plus-4",
        type: "build",
        prompt: "Show 3 + 4 = 7 on the abacus.",
        target: 7,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "四下五去一 for 3 + 4: drop the 上珠 (5).",
              visual: {
                kind: "abacus-anim",
                frames: [[3], [8]],
                captions: ["3 on the rod", "四下五去一: heaven bead down → 8"],
                label: "8",
              },
            },
            {
              text: "Remove one 下珠.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
            {
              text: "The rod settles on 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "quiz-6-minus-4",
        type: "quiz",
        prompt: "6 − 4 = ?",
        choices: [2, 3, 1, 4],
        answer: 2,
        explanation: {
          steps: [
            {
              text: "四上一去五: push up one 下珠.",
              visual: {
                kind: "abacus-anim",
                frames: [[6], [7]],
                captions: ["6: heaven bead down", "四上一去五: one lower bead up → 7"],
                label: "7",
              },
            },
            {
              text: "Lift the 上珠 away.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
            {
              text: "6 − 5 + 1 = 2.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
          ],
        },
      },
    ],
  },

  "carry-borrow": {
    "complement-ten": [
      {
        id: "complements-to-ten",
        type: "heading",
        text: "Complements to ten",
        figure: {
          visual: {
            kind: "diagram",
            name: "ten-complement",
            numbers: [4, 6],
          },
          caption: "Pick any pair here and the bead move is already decided for you.",
        },
      },
      {
        id: "pairs-that-make-ten",
        type: "paragraph",
        text: "Carrying rests on complements to ten: 9 and 1, 8 and 2, 7 and 3, 6 and 4, 5 and 5. When a rod would pass nine, you leave the units that remain and carry one to the 档 on the left.",
        figure: {
          visual: {
            kind: "diagram",
            name: "ten-complement",
            numbers: [9, 1],
          },
          caption: "Nine on a rod leaves exactly one space before the count spills over.",
        },
      },
      {
        id: "quiz-complement-of-7",
        type: "quiz",
        prompt: "7 + ? = 10",
        choices: [3, 2, 4, 7],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "The complement of 7 to 10 is 3.",
              visual: {
                kind: "diagram",
                name: "ten-complement",
                numbers: [7],
              },
            },
            {
              text: "So 7 + 3 = 10.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-complement-of-8",
        type: "quiz",
        prompt: "What do you add to 8 to make 10?",
        choices: [2, 1, 3, 8],
        answer: 2,
        explanation: {
          steps: [
            {
              text: "The complement of 8 to 10 is 2.",
              visual: {
                kind: "diagram",
                name: "ten-complement",
                numbers: [8],
              },
            },
            {
              text: "So 8 + 2 = 10.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
          ],
        },
      },
      {
        id: "quiz-4-plus-6",
        type: "quiz",
        prompt: "4 + 6 = ?",
        choices: [10, 9, 11, 8],
        answer: 10,
        explanation: {
          steps: [
            {
              text: "The ones 档 fills to ten: 4 + 6 = 10.",
              visual: {
                kind: "diagram",
                name: "carry-over",
                numbers: [10],
              },
            },
            {
              text: "进位 — carry one to the next 档, leaving 0 on the ones.",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
          ],
        },
      },
    ],
    "carry-add": [
      {
        id: "carrying-in-addition",
        type: "heading",
        text: "进位加 — carrying in addition",
        figure: {
          visual: {
            kind: "diagram",
            name: "carry-over",
            numbers: [1],
          },
          caption: "One bead on the next rod is worth ten beads on this one.",
        },
      },
      {
        id: "leave-the-remainder-and-carry",
        type: "paragraph",
        text: "When ones overflow, you 进位 (jìn wèi, carry): leave the remainder on the rod and 进一 to the next 档. The formulas run 加1：一去九进一 … 加9：九去一进一 — 'remove nine, carry one'.",
        figure: {
          visual: {
            kind: "diagram",
            name: "koujue",
            labels: ["一去九进一", "九去一进一"],
          },
          caption: "One rod is cleared while the rod on its left gains a single bead.",
        },
      },
      {
        id: "example-eight-plus-five",
        type: "paragraph",
        text: "Example 8 + 5: the ones 档 shows 8 and cannot fit another 上珠. Say 五去五进一 — remove the 上珠 (worth five), carry one to the next 档 — and the board shows 13.",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods",
            numbers: [1, 3],
          },
          caption: "The carry lands one rod to the left, where a single bead is worth ten.",
        },
      },
      {
        id: "quiz-8-plus-5",
        type: "quiz",
        prompt: "8 + 5 = ?",
        choices: [13, 12, 14, 15],
        answer: 13,
        explanation: {
          steps: [
            {
              text: "The ones 档 shows 8 and cannot fit another 上珠.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
            {
              text: "五去五进一 — remove the 上珠 (5) and carry one to the next 档.",
              visual: {
                kind: "abacus-anim",
                frames: [[8, 0], [3, 1]],
                captions: ["Ones shows 8", "五去五进一 → 13"],
                label: "13",
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
        id: "quiz-9-plus-9",
        type: "quiz",
        prompt: "9 + 9 = ?",
        choices: [18, 17, 19, 16],
        answer: 18,
        explanation: {
          steps: [
            {
              text: "九去一进一 — remove one (the complement of 9 to 10).",
              visual: {
                kind: "abacus",
                digits: [8, 0],
              },
            },
            {
              text: "Carry one to the next 档.",
              visual: {
                kind: "abacus-anim",
                frames: [[8, 0], [8, 1]],
                captions: ["Ones: 8", "九去一进一: carry one → 18"],
                label: "18",
              },
            },
            {
              text: "8 remains on the ones, so the board shows 18.",
              visual: {
                kind: "abacus",
                digits: [8, 1],
              },
            },
          ],
        },
      },
      {
        id: "quiz-7-plus-6",
        type: "quiz",
        prompt: "7 + 6 = ?",
        choices: [13, 12, 14, 11],
        answer: 13,
        explanation: {
          steps: [
            {
              text: "六去四进一 — remove four (the complement of 6 to 10).",
              visual: {
                kind: "abacus",
                digits: [3, 0],
              },
            },
            {
              text: "Carry one to the next 档.",
              visual: {
                kind: "abacus-anim",
                frames: [[3, 0], [3, 1]],
                captions: ["Ones: 3", "六去四进一: carry one → 13"],
                label: "13",
              },
            },
            {
              text: "3 on the ones plus the carry gives 13.",
              visual: {
                kind: "abacus",
                digits: [3, 1],
              },
            },
          ],
        },
      },
      {
        id: "build-9-plus-9",
        type: "build",
        prompt: "Show 9 + 9 = 18 on the abacus.",
        target: 18,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "九去一进一: remove one from the ones 档.",
              visual: {
                kind: "abacus",
                digits: [8, 0],
              },
            },
            {
              text: "Carry one to the tens 档.",
              visual: {
                kind: "abacus-anim",
                frames: [[8, 0], [8, 1]],
                captions: ["Ones: 8", "九去一进一: carry one → 18"],
                label: "18",
              },
            },
            {
              text: "8 on the ones and 1 carried = 18.",
              visual: {
                kind: "abacus",
                digits: [8, 1],
              },
            },
          ],
        },
      },
    ],
    "borrow-subtract": [
      {
        id: "borrowing-in-subtraction",
        type: "heading",
        text: "退位减 — borrowing in subtraction",
        figure: {
          visual: {
            kind: "diagram",
            name: "borrow-ten",
            numbers: [1],
          },
          caption: "A borrowed ten arrives as ten separate ones on the rod that was short.",
        },
      },
      {
        id: "take-one-from-the-left",
        type: "paragraph",
        text: "When a rod is short, you 退位 (tuì wèi, borrow): take one from the 档 on the left and add back the difference to ten on the short rod. The formulas run 减1：一退一还九 … 减9：九退一还一 — 'borrow one, return nine'.",
        figure: {
          visual: {
            kind: "diagram",
            name: "koujue",
            labels: ["一退一还九", "九退一还一"],
          },
          caption: "Whatever you borrow comes back as its own complement to ten.",
        },
      },
      {
        id: "example-twelve-minus-five",
        type: "paragraph",
        text: "Example 12 − 5: the ones 档 cannot lose five, so 五退一还五 — the tens 档 loses one and the ones 档 gains five on top of its two, showing 7.",
        figure: {
          visual: {
            kind: "diagram",
            name: "column-subtract",
            numbers: [12, 5],
          },
          caption: "The rod that loses a bead is not the rod that gains them.",
        },
      },
      {
        id: "quiz-12-minus-5",
        type: "quiz",
        prompt: "12 − 5 = ?",
        choices: [7, 6, 8, 5],
        answer: 7,
        explanation: {
          steps: [
            {
              text: "The ones 档 cannot lose five, so 退位: 五退一还五.",
              visual: {
                kind: "abacus",
                digits: [2, 1],
              },
            },
            {
              text: "Borrow one from the tens 档.",
              visual: {
                kind: "abacus",
                digits: [7, 0],
              },
            },
            {
              text: "The ones gains five on top of its two, so 12 − 5 = 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "quiz-11-minus-8",
        type: "quiz",
        prompt: "11 − 8 = ?",
        choices: [3, 2, 4, 5],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "八退一还二: borrow one from the tens 档.",
              visual: {
                kind: "abacus",
                digits: [1, 0],
              },
            },
            {
              text: "Return two to the ones 档.",
              visual: {
                kind: "abacus",
                digits: [3, 0],
              },
            },
            {
              text: "11 − 8 = 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-14-minus-6",
        type: "quiz",
        prompt: "14 − 6 = ?",
        choices: [8, 7, 9, 6],
        answer: 8,
        explanation: {
          steps: [
            {
              text: "六退一还四: borrow one from the tens 档.",
              visual: {
                kind: "abacus",
                digits: [4, 0],
              },
            },
            {
              text: "Return four to the ones 档.",
              visual: {
                kind: "abacus",
                digits: [8, 0],
              },
            },
            {
              text: "14 − 6 = 8.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
          ],
        },
      },
      {
        id: "build-12-minus-5",
        type: "build",
        prompt: "Show 12 − 5 = 7 on the abacus.",
        target: 7,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "五退一还五: the tens 档 loses one.",
              visual: {
                kind: "abacus",
                digits: [2, 0],
              },
            },
            {
              text: "The ones 档 gains five on top of its two.",
              visual: {
                kind: "abacus",
                digits: [7, 0],
              },
            },
            {
              text: "The board shows 7.",
              visual: {
                kind: "abacus",
                digits: [7, 0],
              },
            },
          ],
        },
      },
    ],
    "mixed-carry-borrow": [
      {
        id: "mixed-carry-and-borrow",
        type: "heading",
        text: "Mixed 进退位",
        figure: {
          visual: {
            kind: "diagram",
            name: "running-total",
            numbers: [17, 25, 38],
          },
          caption: "Some rods carry and others borrow inside the very same sum.",
        },
      },
      {
        id: "mix-carries-and-borrows",
        type: "paragraph",
        text: "Real problems mix carries and borrows. Say each formula, move the beads, and keep the rhythm — the bead pattern does the remembering for you.",
        figure: {
          visual: {
            kind: "diagram",
            name: "number-sprint",
            numbers: [4, 9, 6, 8],
          },
          caption: "Say each formula on the beat and the pattern keeps your place for you.",
        },
      },
      {
        id: "quiz-27-plus-15",
        type: "quiz",
        prompt: "27 + 15 = ?",
        choices: [42, 32, 52, 43],
        answer: 42,
        explanation: {
          steps: [
            {
              text: "Ones: 7 + 5 = 12 — set 2 and carry 1.",
              visual: {
                kind: "abacus",
                digits: [2, 2],
              },
            },
            {
              text: "Tens: 2 + 1 + 1 = 4.",
              visual: {
                kind: "abacus",
                digits: [2, 4],
              },
            },
            {
              text: "So 27 + 15 = 42.",
              visual: {
                kind: "abacus",
                digits: [2, 4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-34-minus-18",
        type: "quiz",
        prompt: "34 − 18 = ?",
        choices: [16, 26, 15, 14],
        answer: 16,
        explanation: {
          steps: [
            {
              text: "退位 for the ones: 14 − 8 = 6.",
              visual: {
                kind: "abacus",
                digits: [6, 2],
              },
            },
            {
              text: "Tens: 3 − 1 − 1 = 1.",
              visual: {
                kind: "abacus",
                digits: [6, 1],
              },
            },
            {
              text: "So 34 − 18 = 16.",
              visual: {
                kind: "abacus",
                digits: [6, 1],
              },
            },
          ],
        },
      },
      {
        id: "quiz-56-plus-37",
        type: "quiz",
        prompt: "56 + 37 = ?",
        choices: [93, 83, 92, 94],
        answer: 93,
        explanation: {
          steps: [
            {
              text: "Ones: 6 + 7 = 13 — set 3, carry 1.",
              visual: {
                kind: "abacus",
                digits: [3, 5],
              },
            },
            {
              text: "Tens: 5 + 3 + 1 = 9.",
              visual: {
                kind: "abacus",
                digits: [3, 9],
              },
            },
            {
              text: "So 56 + 37 = 93.",
              visual: {
                kind: "abacus",
                digits: [3, 9],
              },
            },
          ],
        },
      },
      {
        id: "build-56-plus-37",
        type: "build",
        prompt: "Show 56 + 37 = 93 on the abacus.",
        target: 93,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Ones: 6 + 7 = 13 — set 3 and 进一.",
              visual: {
                kind: "abacus",
                digits: [3, 5],
              },
            },
            {
              text: "Tens: 5 + 3 + 1 = 9.",
              visual: {
                kind: "abacus-anim",
                frames: [[3, 5], [3, 9]],
                captions: ["Ones: 3, carry 1", "Tens: 5 + 3 + 1 → 9"],
                label: "93",
              },
            },
            {
              text: "The board shows 93.",
              visual: {
                kind: "abacus",
                digits: [3, 9],
              },
            },
          ],
        },
      },
    ],
    "carry-borrow-check": [
      {
        id: "level-check-carry-and-borrow",
        type: "heading",
        text: "Level check — carry and borrow",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["进位", "退位", "混合"],
          },
          caption: "Carries and borrows share one level because they arrive together.",
        },
      },
      {
        id: "carry-it-borrow-it",
        type: "paragraph",
        text: "Carry it, borrow it, and finish the level.",
        figure: {
          visual: {
            kind: "diagram",
            name: "exam-paper",
          },
          caption: "Every question hides either a carry or a borrow, and some hide both.",
        },
      },
      {
        id: "quiz-8-plus-7",
        type: "quiz",
        prompt: "8 + 7 = ?",
        choices: [15, 14, 16, 13],
        answer: 15,
        explanation: {
          steps: [
            {
              text: "七去三进一 — remove three (the complement of 7 to 10).",
              visual: {
                kind: "abacus",
                digits: [5, 0],
              },
            },
            {
              text: "Carry one to the next 档.",
              visual: {
                kind: "abacus-anim",
                frames: [[5, 0], [5, 1]],
                captions: ["Ones: 5", "七去三进一: carry one → 15"],
                label: "15",
              },
            },
            {
              text: "5 on the ones plus the carry gives 15.",
              visual: {
                kind: "abacus",
                digits: [5, 1],
              },
            },
          ],
        },
      },
      {
        id: "quiz-13-minus-9",
        type: "quiz",
        prompt: "13 − 9 = ?",
        choices: [4, 5, 3, 6],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "九退一还一: borrow one from the tens 档.",
              visual: {
                kind: "abacus",
                digits: [3, 0],
              },
            },
            {
              text: "Return one to the ones 档.",
              visual: {
                kind: "abacus",
                digits: [4, 0],
              },
            },
            {
              text: "13 − 9 = 4.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "build-26-plus-18",
        type: "build",
        prompt: "Show 26 + 18 = 44 on the abacus.",
        target: 44,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Ones: 6 + 8 = 14 — set 4, carry 1.",
              visual: {
                kind: "abacus",
                digits: [4, 2],
              },
            },
            {
              text: "Tens: 2 + 1 + 1 = 4.",
              visual: {
                kind: "abacus-anim",
                frames: [[4, 2], [4, 4]],
                captions: ["Ones: 4, carry 1", "Tens: 2 + 1 + 1 → 4"],
                label: "44",
              },
            },
            {
              text: "The board shows 44.",
              visual: {
                kind: "abacus",
                digits: [4, 4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-44-minus-19",
        type: "quiz",
        prompt: "44 − 19 = ?",
        choices: [25, 24, 26, 35],
        answer: 25,
        explanation: {
          steps: [
            {
              text: "Borrow for the ones: 14 − 9 = 5.",
              visual: {
                kind: "abacus",
                digits: [5, 3],
              },
            },
            {
              text: "Tens: 4 − 1 − 1 = 2.",
              visual: {
                kind: "abacus",
                digits: [5, 2],
              },
            },
            {
              text: "So 44 − 19 = 25.",
              visual: {
                kind: "abacus",
                digits: [5, 2],
              },
            },
          ],
        },
      },
    ],
  },

  "multi-digit-listening": {
    "da-baizi": [
      {
        id: "the-da-baizi-drill",
        type: "heading",
        text: "打百子 — the 1-to-100 drill",
        figure: {
          visual: {
            kind: "diagram",
            name: "da-baizi",
            numbers: [100],
          },
          caption: "One hundred numbers, added one at a time, with no shortcut through the middle.",
        },
      },
      {
        id: "add-one-to-one-hundred",
        type: "paragraph",
        text: "打百子 (dǎ bǎi zǐ) is the famous endurance drill: add every whole number from 1 to 100 and you should land on 5,050. It trains steady rhythm, carries, and focus all at once.",
        figure: {
          visual: {
            kind: "diagram",
            name: "running-total",
            numbers: [1, 2, 3, 4, 5],
          },
          caption: "Small numbers, added without a pause, build a total far bigger than they look.",
        },
      },
      {
        id: "drill-the-seed-sum",
        type: "paragraph",
        text: "You can't run all 100 here, so drill the seed on your 算盘: 1 + 2 + … + 10 = 55. Do that run in one breath and you have the heart of the full drill.",
        figure: {
          visual: {
            kind: "diagram",
            name: "da-baizi",
            numbers: [10],
          },
          caption: "Fifty-five is the seed of the whole drill, and it runs in a single breath.",
        },
      },
      {
        id: "quiz-1-to-5-sum",
        type: "quiz",
        prompt: "1 + 2 + 3 + 4 + 5 = ?",
        choices: [15, 14, 16, 12],
        answer: 15,
        explanation: {
          steps: [
            {
              text: "打百子 starts small: 1 + 2 + 3 = 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
            {
              text: "Keep going: + 4 = 10, then + 5 = 15.",
              visual: {
                kind: "abacus",
                digits: [5, 1],
              },
            },
            {
              text: "The seed run lands on 15.",
              visual: {
                kind: "abacus",
                digits: [5, 1],
              },
            },
          ],
        },
      },
      {
        id: "quiz-1-to-10-sum",
        type: "quiz",
        prompt: "1 + 2 + … + 10 = ?",
        choices: [55, 50, 60, 45],
        answer: 55,
        explanation: {
          steps: [
            {
              text: "The 打百子 seed sum runs from 1 to 10.",
              visual: {
                kind: "diagram",
                name: "da-baizi",
                numbers: [10],
              },
            },
            {
              text: "Pair the numbers: 1 + 10 = 11, 2 + 9 = 11, and so on — five pairs.",
              visual: {
                kind: "diagram",
                name: "multiply-array",
                numbers: [5, 11],
              },
            },
            {
              text: "5 × 11 = 55.",
              visual: {
                kind: "abacus",
                digits: [5, 5],
              },
            },
          ],
        },
      },
      {
        id: "quiz-add-11-to-55",
        type: "quiz",
        prompt: "Your running total is 55 — add 11. Now what?",
        choices: [66, 65, 67, 56],
        answer: 66,
        explanation: {
          steps: [
            {
              text: "Add rod by rod: ones 5 + 1 = 6.",
              visual: {
                kind: "abacus",
                digits: [6, 5],
              },
            },
            {
              text: "Tens 5 + 1 = 6.",
              visual: {
                kind: "abacus",
                digits: [6, 6],
              },
            },
            {
              text: "So 55 + 11 = 66.",
              visual: {
                kind: "abacus",
                digits: [6, 6],
              },
            },
          ],
        },
      },
    ],
    "multi-digit-add-sub": [
      {
        id: "multi-digit-add-and-subtract",
        type: "heading",
        text: "Multi-digit 加减",
        figure: {
          visual: {
            kind: "diagram",
            name: "big-board",
            numbers: [4, 2, 7],
          },
          caption: "Three rods, three digits, and the formulas you already know by heart.",
        },
      },
      {
        id: "add-from-the-right",
        type: "paragraph",
        text: "Move up to three 档 and add from the right, carrying and borrowing rod by rod. The 口诀 stay exactly the same — there are just more rods to visit.",
        figure: {
          visual: {
            kind: "diagram",
            name: "place-value",
            numbers: [4, 2, 7],
            labels: ["百", "十", "个"],
          },
          caption: "The places run 个, 十, 百 from the right, and each rod keeps its own digit.",
        },
      },
      {
        id: "quiz-126-plus-345",
        type: "quiz",
        prompt: "126 + 345 = ?",
        choices: [471, 461, 481, 371],
        answer: 471,
        explanation: {
          steps: [
            {
              text: "Ones: 6 + 5 = 11 — set 1 and carry 1.",
              visual: {
                kind: "abacus",
                digits: [1, 2, 1],
              },
            },
            {
              text: "Tens: 2 + 4 + 1 = 7.",
              visual: {
                kind: "abacus",
                digits: [1, 7, 1],
              },
            },
            {
              text: "Hundreds: 1 + 3 = 4, so 471.",
              visual: {
                kind: "abacus",
                digits: [1, 7, 4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-500-minus-167",
        type: "quiz",
        prompt: "500 − 167 = ?",
        choices: [333, 343, 323, 433],
        answer: 333,
        explanation: {
          steps: [
            {
              text: "退位 across the tens and ones.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "Ones 10 − 7 = 3, tens 9 − 6 = 3, hundreds 4 − 1 = 3.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 5], [3, 3, 3]],
                captions: ["500 on the board", "退位 through both rods → 333"],
                label: "333",
              },
            },
            {
              text: "So 500 − 167 = 333.",
              visual: {
                kind: "abacus",
                digits: [3, 3, 3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-268-plus-179",
        type: "quiz",
        prompt: "268 + 179 = ?",
        choices: [447, 437, 457, 347],
        answer: 447,
        explanation: {
          steps: [
            {
              text: "Ones: 8 + 9 = 17 — set 7, carry 1.",
              visual: {
                kind: "abacus",
                digits: [7, 6, 2],
              },
            },
            {
              text: "Tens: 6 + 7 + 1 = 14 — set 4, carry 1.",
              visual: {
                kind: "abacus",
                digits: [7, 4, 3],
              },
            },
            {
              text: "Hundreds: 2 + 1 + 1 = 4, so 447.",
              visual: {
                kind: "abacus",
                digits: [7, 4, 4],
              },
            },
          ],
        },
      },
      {
        id: "build-126-plus-345",
        type: "build",
        prompt: "Show 126 + 345 = 471 on the abacus.",
        target: 471,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "Add rod by rod from the ones: 6 + 5 = 11 — set 1, carry 1.",
              visual: {
                kind: "abacus",
                digits: [1, 2, 1],
              },
            },
            {
              text: "Tens: 2 + 4 + 1 = 7, and hundreds: 1 + 3 = 4.",
              visual: {
                kind: "abacus",
                digits: [1, 7, 1],
              },
            },
            {
              text: "The board shows 471.",
              visual: {
                kind: "abacus",
                digits: [1, 7, 4],
              },
            },
          ],
        },
      },
    ],
    "listening-drills": [
      {
        id: "listening-drills",
        type: "heading",
        text: "听算训练 — listening drills",
        figure: {
          visual: {
            kind: "diagram",
            name: "ting-xinsuan",
            numbers: [34, 27],
          },
          caption: "The numbers arrive by ear, so the hand has to keep up with the hearing.",
        },
      },
      {
        id: "teacher-reads-aloud",
        type: "paragraph",
        text: "珠心算 classes drill 听算 (tīng suàn): the teacher reads numbers aloud at a steady beat and you compute on your board — and later in your head. It forces you to place each new number instantly.",
        figure: {
          visual: {
            kind: "diagram",
            name: "running-total",
            numbers: [34, 27, 18],
          },
          caption: "One number a second leaves no time to write anything down.",
        },
      },
      {
        id: "practice-with-a-friend",
        type: "paragraph",
        text: "Practice with a friend reading a list like 34, 27, 18 at one number per second. Keep the running total; no rewinding allowed.",
        figure: {
          visual: {
            kind: "diagram",
            name: "running-total",
            numbers: [34, 27, 18],
          },
          caption: "The running total is all you keep; each new number replaces the one before.",
        },
      },
      {
        id: "quiz-34-plus-27",
        type: "quiz",
        prompt: "Listening warm-up: 34 + 27 = ?",
        choices: [61, 60, 62, 51],
        answer: 61,
        explanation: {
          steps: [
            {
              text: "Ones: 4 + 7 = 11 — set 1, carry 1.",
              visual: {
                kind: "abacus",
                digits: [1, 3],
              },
            },
            {
              text: "Tens: 3 + 2 + 1 = 6.",
              visual: {
                kind: "abacus",
                digits: [1, 6],
              },
            },
            {
              text: "So 34 + 27 = 61.",
              visual: {
                kind: "abacus",
                digits: [1, 6],
              },
            },
          ],
        },
      },
      {
        id: "quiz-add-18-to-61",
        type: "quiz",
        prompt: "Your total was 61. Now add 18. What is it?",
        choices: [79, 78, 80, 69],
        answer: 79,
        explanation: {
          steps: [
            {
              text: "Ones: 1 + 8 = 9.",
              visual: {
                kind: "abacus",
                digits: [9, 6],
              },
            },
            {
              text: "Tens: 6 + 1 = 7.",
              visual: {
                kind: "abacus",
                digits: [9, 7],
              },
            },
            {
              text: "So 61 + 18 = 79.",
              visual: {
                kind: "abacus",
                digits: [9, 7],
              },
            },
          ],
        },
      },
      {
        id: "quiz-15-25-40-sum",
        type: "quiz",
        prompt: "A new list: 15 + 25 + 40 = ?",
        choices: [80, 70, 90, 85],
        answer: 80,
        explanation: {
          steps: [
            {
              text: "Add the first two: 15 + 25 = 40.",
              visual: {
                kind: "diagram",
                name: "running-total",
                numbers: [15, 25, 40],
              },
            },
            {
              text: "Now add the third: 40 + 40 = 80.",
              visual: {
                kind: "abacus",
                digits: [0, 4],
              },
            },
            {
              text: "The list totals 80.",
              visual: {
                kind: "abacus",
                digits: [0, 8],
              },
            },
          ],
        },
      },
    ],
    "multi-digit-check": [
      {
        id: "level-check-multi-digit",
        type: "heading",
        text: "Level check — multi-digit and listening",
        figure: {
          visual: {
            kind: "diagram",
            name: "exam-paper",
          },
          caption: "Three rods on every question, with the listening part saved for the end.",
        },
      },
      {
        id: "three-rods-steady-rhythm",
        type: "paragraph",
        text: "Three rods, steady rhythm. Solve every question.",
        figure: {
          visual: {
            kind: "diagram",
            name: "drill-rhythm",
            numbers: [2, 5, 8],
          },
          caption: "Steady beats outrun fast beats once the numbers keep coming.",
        },
      },
      {
        id: "quiz-238-plus-46",
        type: "quiz",
        prompt: "238 + 46 = ?",
        choices: [284, 274, 294, 384],
        answer: 284,
        explanation: {
          steps: [
            {
              text: "Ones: 8 + 6 = 14 — set 4, carry 1.",
              visual: {
                kind: "abacus",
                digits: [4, 3, 2],
              },
            },
            {
              text: "Tens: 3 + 4 + 1 = 8.",
              visual: {
                kind: "abacus",
                digits: [4, 8, 2],
              },
            },
            {
              text: "Hundreds stays 2, so 284.",
              visual: {
                kind: "abacus",
                digits: [4, 8, 2],
              },
            },
          ],
        },
      },
      {
        id: "quiz-312-minus-138",
        type: "quiz",
        prompt: "312 − 138 = ?",
        choices: [174, 164, 184, 274],
        answer: 174,
        explanation: {
          steps: [
            {
              text: "退位 through the tens and ones.",
              visual: {
                kind: "diagram",
                name: "borrow-ten",
                numbers: [10],
              },
            },
            {
              text: "Ones 12 − 8 = 4, tens 10 − 3 = 7, hundreds 2 − 1 = 1.",
              visual: {
                kind: "abacus-anim",
                frames: [[2, 1, 3], [4, 7, 1]],
                captions: ["312 on the board", "退位 through the tens and ones → 174"],
                label: "174",
              },
            },
            {
              text: "So 312 − 138 = 174.",
              visual: {
                kind: "abacus",
                digits: [4, 7, 1],
              },
            },
          ],
        },
      },
      {
        id: "build-238-plus-46",
        type: "build",
        prompt: "Show 238 + 46 = 284 on the abacus.",
        target: 284,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "Ones: 8 + 6 = 14 — set 4, carry 1.",
              visual: {
                kind: "abacus",
                digits: [4, 3, 2],
              },
            },
            {
              text: "Tens: 3 + 4 + 1 = 8.",
              visual: {
                kind: "abacus",
                digits: [4, 8, 2],
              },
            },
            {
              text: "Hundreds stays 2, so the board shows 284.",
              visual: {
                kind: "abacus",
                digits: [4, 8, 2],
              },
            },
          ],
        },
      },
      {
        id: "quiz-1-to-7-sum",
        type: "quiz",
        prompt: "The 打百子 seed grows: 1 + 2 + … + 7 = ?",
        choices: [28, 27, 29, 21],
        answer: 28,
        explanation: {
          steps: [
            {
              text: "The 打百子 seed grows to seven numbers.",
              visual: {
                kind: "diagram",
                name: "da-baizi",
                numbers: [7],
              },
            },
            {
              text: "1 + 2 + 3 + 4 + 5 + 6 + 7 = 28, or 7 × 8 ÷ 2.",
              visual: {
                kind: "abacus",
                digits: [8, 2],
              },
            },
            {
              text: "The running total is 28.",
              visual: {
                kind: "abacus",
                digits: [8, 2],
              },
            },
          ],
        },
      },
    ],
  },

  "multiplication": {
    "multiplication-table": [
      {
        id: "the-multiplication-table",
        type: "heading",
        text: "乘法 — the 九九 table",
        figure: {
          visual: {
            kind: "diagram",
            name: "multiply-table",
            numbers: [3, 7],
          },
          caption: "Every fact in the grid is one short sentence you can say out loud.",
        },
      },
      {
        id: "repeated-addition",
        type: "paragraph",
        text: "乘法 (chéng fǎ) is fast repeated addition: 4 × 3 means 4 + 4 + 4. In 珠算, products come from the 九九乘法表 (jiǔ jiǔ chéng fǎ biǎo) — the 'nine-nine table' — a set of 口诀 like 三七二十一 (three-sevens twenty-one).",
        figure: {
          visual: {
            kind: "diagram",
            name: "multiply-array",
            numbers: [4, 3],
          },
          caption: "Four rows of three hold twelve, however you choose to count them.",
        },
      },
      {
        id: "the-tables-power",
        type: "paragraph",
        text: "The table's power is that you don't add four times over: you say 四六二十四 (four-six twenty-four) and the product is already there.",
        figure: {
          visual: {
            kind: "diagram",
            name: "multiply-table",
            numbers: [4, 6],
          },
          caption: "四六二十四 is one breath instead of four separate additions.",
        },
      },
      {
        id: "quiz-4-times-7",
        type: "quiz",
        prompt: "四七二十八 — 4 × 7 = ?",
        choices: [28, 24, 32, 21],
        answer: 28,
        explanation: {
          steps: [
            {
              text: "The 口诀 四七二十八 names the fact.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["四七二十八"],
              },
            },
            {
              text: "So 4 × 7 = 28.",
              visual: {
                kind: "abacus",
                digits: [8, 2],
              },
            },
          ],
        },
      },
      {
        id: "quiz-6-times-8",
        type: "quiz",
        prompt: "6 × 8 = ?",
        choices: [48, 42, 56, 54],
        answer: 48,
        explanation: {
          steps: [
            {
              text: "This is single-digit 乘法 from the 九九表.",
              visual: {
                kind: "diagram",
                name: "multiply-table",
                numbers: [6, 8],
              },
            },
            {
              text: "六八四十八, so 6 × 8 = 48.",
              visual: {
                kind: "abacus",
                digits: [8, 4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-9-times-7",
        type: "quiz",
        prompt: "9 × 7 = ?",
        choices: [63, 72, 56, 54],
        answer: 63,
        explanation: {
          steps: [
            {
              text: "This is single-digit 乘法 from the 九九表.",
              visual: {
                kind: "diagram",
                name: "multiply-table",
                numbers: [9, 7],
              },
            },
            {
              text: "九七六十三, so 9 × 7 = 63.",
              visual: {
                kind: "abacus",
                digits: [3, 6],
              },
            },
          ],
        },
      },
      {
        id: "build-4-times-5",
        type: "build",
        prompt: "Set the product 4 × 5 = 20 on the 算盘.",
        target: 20,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "四五二十 — the 口诀 gives 4 × 5 = 20.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["四五二十"],
              },
            },
            {
              text: "That is 2 tens and 0 ones.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
            {
              text: "Set 2 on the tens 档 and nothing on the ones 档.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
          ],
        },
      },
    ],
    "multiply-on-board": [
      {
        id: "multiply-on-the-suanpan",
        type: "heading",
        text: "Multiply on the 算盘",
        figure: {
          visual: {
            kind: "diagram",
            name: "chinese-board",
            numbers: [4, 3],
          },
          caption: "The product is set straight onto the rods, one digit to each.",
        },
      },
      {
        id: "push-the-multiplicand",
        type: "paragraph",
        text: "To multiply on the board you can push the multiplicand's beads, or set the product directly using the 口诀. The simplest path for a beginner: multiply the digits, then set the product on the correct 档.",
        figure: {
          visual: {
            kind: "diagram",
            name: "one-rod",
            numbers: [2],
          },
          caption: "The answer grows on the rod to the left of the digit you started from.",
        },
      },
      {
        id: "keep-the-place-straight",
        type: "paragraph",
        text: "Keep the place straight: 5 × 8 = 40 is four tens, so it lives on the tens 档. Say the 口诀 — 五八四十 — and the beads arrange themselves.",
        figure: {
          visual: {
            kind: "diagram",
            name: "place-value",
            numbers: [4, 0],
            labels: ["十", "个"],
          },
          caption: "Forty puts the four on the tens rod and leaves the ones rod empty.",
        },
      },
      {
        id: "quiz-5-times-8",
        type: "quiz",
        prompt: "五八四十 — 5 × 8 = ?",
        choices: [40, 45, 35, 32],
        answer: 40,
        explanation: {
          steps: [
            {
              text: "五八四十 — the 口诀 gives the product.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["五八四十"],
              },
            },
            {
              text: "5 × 8 = 40, which is four tens on the board.",
              visual: {
                kind: "abacus",
                digits: [0, 4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-6-times-6",
        type: "quiz",
        prompt: "6 × 6 = ?",
        choices: [36, 30, 42, 40],
        answer: 36,
        explanation: {
          steps: [
            {
              text: "六六三十六 — the 口诀 gives the product.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["六六三十六"],
              },
            },
            {
              text: "6 × 6 = 36.",
              visual: {
                kind: "abacus",
                digits: [6, 3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-7-times-4",
        type: "quiz",
        prompt: "7 × 4 = ?",
        choices: [28, 24, 32, 21],
        answer: 28,
        explanation: {
          steps: [
            {
              text: "四七二十八 — the 口诀 gives the product.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["四七二十八"],
              },
            },
            {
              text: "7 × 4 = 28.",
              visual: {
                kind: "abacus",
                digits: [8, 2],
              },
            },
          ],
        },
      },
      {
        id: "build-6-times-7",
        type: "build",
        prompt: "Set 6 × 7 = 42 on the 算盘.",
        target: 42,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "六七四十二 — the 口诀 gives 6 × 7 = 42.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["六七四十二"],
              },
            },
            {
              text: "That is 4 tens and 2 ones.",
              visual: {
                kind: "abacus",
                digits: [2, 4],
              },
            },
            {
              text: "Set 4 on the tens 档 and 2 on the ones 档.",
              visual: {
                kind: "abacus",
                digits: [2, 4],
              },
            },
          ],
        },
      },
    ],
    "multi-digit-multiply": [
      {
        id: "two-digit-multiplication",
        type: "heading",
        text: "Two-digit 乘法",
        figure: {
          visual: {
            kind: "diagram",
            name: "big-board",
            numbers: [3, 6],
          },
          caption: "A two-digit answer needs two rods, and both are earned separately.",
        },
      },
      {
        id: "one-place-at-a-time",
        type: "paragraph",
        text: "Multiply a two-digit number one place at a time. For 12 × 3: the ones give 3 × 2 = 6, the tens give 3 × 1 = 3 tens, so the product is 36.",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods",
            numbers: [3, 6],
          },
          caption: "Each part of the multiplier touches one rod and then stops.",
        },
      },
      {
        id: "multiply-rod-by-rod",
        type: "paragraph",
        text: "Do it rod by rod on your 算盘: multiply the tens first, then the ones, and set each part on its 档.",
        figure: {
          visual: {
            kind: "diagram",
            name: "place-value",
            numbers: [6, 3],
            labels: ["十", "个"],
          },
          caption: "Tens first, then ones, with each part waiting on its own rod.",
        },
      },
      {
        id: "quiz-12-times-3",
        type: "quiz",
        prompt: "12 × 3 = ?",
        choices: [36, 33, 39, 46],
        answer: 36,
        explanation: {
          steps: [
            {
              text: "Ones: 3 × 2 = 6.",
              visual: {
                kind: "abacus",
                digits: [6, 1],
              },
            },
            {
              text: "Tens: 3 × 1 = 3, worth thirty.",
              visual: {
                kind: "abacus",
                digits: [6, 3],
              },
            },
            {
              text: "So 12 × 3 = 36.",
              visual: {
                kind: "abacus",
                digits: [6, 3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-23-times-4",
        type: "quiz",
        prompt: "23 × 4 = ?",
        choices: [92, 82, 96, 72],
        answer: 92,
        explanation: {
          steps: [
            {
              text: "Multiply the ones: 4 × 3 = 12 — set 2, carry 1 to the tens 档.",
              visual: {
                kind: "abacus",
                digits: [2, 2],
              },
            },
            {
              text: "Multiply the tens: 4 × 2 = 8, then add the carried 1 = 9.",
              visual: {
                kind: "abacus",
                digits: [2, 9],
              },
            },
            {
              text: "Read the board: 9 tens and 2 ones = 92.",
              visual: {
                kind: "abacus",
                digits: [2, 9],
              },
            },
          ],
        },
      },
      {
        id: "quiz-14-times-2",
        type: "quiz",
        prompt: "14 × 2 = ?",
        choices: [28, 24, 34, 26],
        answer: 28,
        explanation: {
          steps: [
            {
              text: "Ones: 2 × 4 = 8.",
              visual: {
                kind: "abacus",
                digits: [8, 1],
              },
            },
            {
              text: "Tens: 2 × 1 = 2.",
              visual: {
                kind: "abacus",
                digits: [8, 2],
              },
            },
            {
              text: "So 14 × 2 = 28.",
              visual: {
                kind: "abacus",
                digits: [8, 2],
              },
            },
          ],
        },
      },
      {
        id: "build-15-times-3",
        type: "build",
        prompt: "Set 15 × 3 = 45 on the 算盘.",
        target: 45,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Ones: 3 × 5 = 15 — set 5, carry 1.",
              visual: {
                kind: "abacus",
                digits: [5, 1],
              },
            },
            {
              text: "Tens: 3 × 1 = 3, plus the carried 1 = 4.",
              visual: {
                kind: "abacus",
                digits: [5, 4],
              },
            },
            {
              text: "The board shows 4 tens and 5 ones = 45.",
              visual: {
                kind: "abacus",
                digits: [5, 4],
              },
            },
          ],
        },
      },
    ],
    "multiplication-check": [
      {
        id: "level-check-multiplication",
        type: "heading",
        text: "Level check — 乘法",
        figure: {
          visual: {
            kind: "diagram",
            name: "multiply-table",
            numbers: [7, 8],
          },
          caption: "The table does the hard part; the rods only keep the places.",
        },
      },
      {
        id: "set-the-product",
        type: "paragraph",
        text: "Say the 口诀, set the product, and finish the level.",
        figure: {
          visual: {
            kind: "diagram",
            name: "board-vs-numeral",
            numbers: [5, 6],
          },
          caption: "Say the formula, set the beads, then check the digits against the rods.",
        },
      },
      {
        id: "quiz-6-times-8",
        type: "quiz",
        prompt: "6 × 8 = ?",
        choices: [48, 42, 56, 40],
        answer: 48,
        explanation: {
          steps: [
            {
              text: "六八四十八 — the 口诀 gives the product.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["六八四十八"],
              },
            },
            {
              text: "6 × 8 = 48.",
              visual: {
                kind: "abacus",
                digits: [8, 4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-9-times-7",
        type: "quiz",
        prompt: "9 × 7 = ?",
        choices: [63, 56, 72, 54],
        answer: 63,
        explanation: {
          steps: [
            {
              text: "九七六十三 — the 口诀 gives the product.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["九七六十三"],
              },
            },
            {
              text: "9 × 7 = 63.",
              visual: {
                kind: "abacus",
                digits: [3, 6],
              },
            },
          ],
        },
      },
      {
        id: "build-13-times-3",
        type: "build",
        prompt: "Set 13 × 3 = 39 on the 算盘.",
        target: 39,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Ones: 3 × 3 = 9.",
              visual: {
                kind: "abacus",
                digits: [9, 1],
              },
            },
            {
              text: "Tens: 3 × 1 = 3.",
              visual: {
                kind: "abacus",
                digits: [9, 3],
              },
            },
            {
              text: "The board shows 39.",
              visual: {
                kind: "abacus",
                digits: [9, 3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-24-times-4",
        type: "quiz",
        prompt: "24 × 4 = ?",
        choices: [96, 86, 104, 94],
        answer: 96,
        explanation: {
          steps: [
            {
              text: "Multiply the ones: 4 × 4 = 16 — set 6, carry 1.",
              visual: {
                kind: "abacus",
                digits: [6, 2],
              },
            },
            {
              text: "Multiply the tens: 4 × 2 = 8, plus the carried 1 = 9.",
              visual: {
                kind: "abacus",
                digits: [6, 9],
              },
            },
            {
              text: "So 24 × 4 = 96.",
              visual: {
                kind: "abacus",
                digits: [6, 9],
              },
            },
          ],
        },
      },
    ],
  },

  "division": {
    "division-meaning": [
      {
        id: "understanding-division",
        type: "heading",
        text: "除法 — division",
        figure: {
          visual: {
            kind: "diagram",
            name: "divide-share",
            numbers: [12, 3],
          },
          caption: "Twelve shared three at a time makes four equal piles.",
        },
      },
      {
        id: "equal-groups",
        type: "paragraph",
        text: "除法 (chú fǎ) shares a total into equal groups: 12 ÷ 3 asks how many groups of 3 fit in 12. It's the inverse of multiplication — 12 ÷ 3 = 4 because 3 × 4 = 12.",
        figure: {
          visual: {
            kind: "diagram",
            name: "multiply-array",
            numbers: [3, 4],
          },
          caption: "The same twelve read the other way is three rows of four.",
        },
      },
      {
        id: "division-mnemonics",
        type: "paragraph",
        text: "珠算 division uses its own 口诀 family, like 二一添作五. Start by reading the division as 'how many times does the divisor fit?'",
        figure: {
          visual: {
            kind: "diagram",
            name: "divide-share",
            numbers: [10, 2],
          },
          caption: "Say 二一添作五 and half of ten is five before any bead moves.",
        },
      },
      {
        id: "quiz-12-divided-by-3",
        type: "quiz",
        prompt: "12 ÷ 3 = ?",
        choices: [4, 3, 6, 5],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "12 ÷ 3 asks how many groups of 3 fit in 12.",
              visual: {
                kind: "diagram",
                name: "divide-share",
                numbers: [12, 3],
              },
            },
            {
              text: "3 × 4 = 12, so the quotient is 4.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-20-divided-by-5",
        type: "quiz",
        prompt: "20 ÷ 5 = ?",
        choices: [4, 5, 3, 6],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "20 ÷ 5 asks how many groups of 5 fit in 20.",
              visual: {
                kind: "diagram",
                name: "divide-share",
                numbers: [20, 5],
              },
            },
            {
              text: "5 × 4 = 20, so the quotient is 4.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-24-divided-by-8",
        type: "quiz",
        prompt: "24 ÷ 8 = ?",
        choices: [3, 4, 6, 2],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "24 ÷ 8 asks how many groups of 8 fit in 24.",
              visual: {
                kind: "abacus",
                digits: [4, 2],
              },
            },
            {
              text: "8 × 3 = 24, so the quotient is 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "build-12-divided-by-4",
        type: "build",
        prompt: "Set the quotient of 12 ÷ 4 on the 算盘.",
        target: 3,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "12 ÷ 4 asks how many groups of 4 fit in 12.",
              visual: {
                kind: "diagram",
                name: "divide-share",
                numbers: [12, 4],
              },
            },
            {
              text: "4 × 3 = 12, so the quotient is 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
            {
              text: "Set 3 on the rod.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
    ],
    "divide-on-board": [
      {
        id: "divide-on-the-suanpan",
        type: "heading",
        text: "Divide on the 算盘",
        figure: {
          visual: {
            kind: "diagram",
            name: "divide-share",
            numbers: [42, 7],
          },
          caption: "Forty-two handed out seven at a time leaves six full groups.",
        },
      },
      {
        id: "how-many-times-it-goes",
        type: "paragraph",
        text: "To divide, ask 'how many times does the divisor go in?', set that quotient, and check it against the dividend. For 42 ÷ 7: 7 fits 6 times, so the quotient is 6.",
        figure: {
          visual: {
            kind: "diagram",
            name: "remainder",
            numbers: [42, 7],
          },
          caption: "Six groups of seven fill forty-two exactly, with nothing left over.",
        },
      },
      {
        id: "answer-before-the-beads-move",
        type: "paragraph",
        text: "With the 口诀 you can say the answer before the beads move — 六八四十八 tells you 48 ÷ 8 = 6 instantly.",
        figure: {
          visual: {
            kind: "diagram",
            name: "board-vs-numeral",
            numbers: [4, 8],
          },
          caption: "六八四十八 settles the quotient before a single bead is touched.",
        },
      },
      {
        id: "quiz-45-divided-by-9",
        type: "quiz",
        prompt: "45 ÷ 9 = ?",
        choices: [5, 6, 4, 9],
        answer: 5,
        explanation: {
          steps: [
            {
              text: "9 × 5 = 45, so the quotient is 5.",
              visual: {
                kind: "abacus",
                digits: [5, 4],
              },
            },
            {
              text: "45 ÷ 9 = 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "quiz-36-divided-by-6",
        type: "quiz",
        prompt: "36 ÷ 6 = ?",
        choices: [6, 5, 7, 4],
        answer: 6,
        explanation: {
          steps: [
            {
              text: "6 × 6 = 36, so the quotient is 6.",
              visual: {
                kind: "abacus",
                digits: [6, 3],
              },
            },
            {
              text: "36 ÷ 6 = 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
      {
        id: "quiz-56-divided-by-8",
        type: "quiz",
        prompt: "56 ÷ 8 = ?",
        choices: [7, 6, 8, 9],
        answer: 7,
        explanation: {
          steps: [
            {
              text: "8 × 7 = 56, so the quotient is 7.",
              visual: {
                kind: "abacus",
                digits: [6, 5],
              },
            },
            {
              text: "56 ÷ 8 = 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "build-42-divided-by-7",
        type: "build",
        prompt: "Set the quotient of 42 ÷ 7 on the 算盘.",
        target: 6,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "42 ÷ 7 asks how many groups of 7 fit in 42.",
              visual: {
                kind: "diagram",
                name: "multiply-table",
                numbers: [7, 6],
              },
            },
            {
              text: "7 × 6 = 42, so the quotient is 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
            {
              text: "Set 6 on the rod.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
    ],
    "remainders": [
      {
        id: "leftovers-remainders",
        type: "heading",
        text: "Leftovers — remainders",
        figure: {
          visual: {
            kind: "diagram",
            name: "remainder",
            numbers: [13, 5],
          },
          caption: "Two full groups of five, and three that cannot be handed out.",
        },
      },
      {
        id: "division-doesnt-come-out-even",
        type: "paragraph",
        text: "Division doesn't always come out even. 13 ÷ 5 gives 2 with 3 left over — the leftover is the remainder. On the 算盘 you set the 2 and 'read off' the 3 that couldn't be shared.",
        figure: {
          visual: {
            kind: "diagram",
            name: "remainder",
            numbers: [7, 2],
          },
          caption: "Seven shared two at a time leaves one over, and that one still counts.",
        },
      },
      {
        id: "quiz-remainder-19-by-4",
        type: "quiz",
        prompt: "19 ÷ 4 — what is the remainder?",
        choices: [3, 4, 2, 5],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "4 × 4 = 16, which is as many whole 4s as fit in 19.",
              visual: {
                kind: "diagram",
                name: "remainder",
                numbers: [19, 4],
              },
            },
            {
              text: "19 − 16 = 3 left over.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
            {
              text: "So 19 ÷ 4 = 4 remainder 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-remainder-17-by-5",
        type: "quiz",
        prompt: "17 ÷ 5 — what is the remainder?",
        choices: [2, 3, 1, 4],
        answer: 2,
        explanation: {
          steps: [
            {
              text: "5 × 3 = 15, which is as many whole 5s as fit in 17.",
              visual: {
                kind: "diagram",
                name: "remainder",
                numbers: [17, 5],
              },
            },
            {
              text: "17 − 15 = 2 left over.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
            {
              text: "So 17 ÷ 5 = 3 remainder 2.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
          ],
        },
      },
      {
        id: "quiz-remainder-22-by-6",
        type: "quiz",
        prompt: "22 ÷ 6 — what is the remainder?",
        choices: [4, 2, 3, 5],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "6 × 3 = 18, which is as many whole 6s as fit in 22.",
              visual: {
                kind: "diagram",
                name: "divide-share",
                numbers: [22, 6],
              },
            },
            {
              text: "22 − 18 = 4 left over.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
            {
              text: "So 22 ÷ 6 = 3 remainder 4.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "build-quotient-13-by-5",
        type: "build",
        prompt: "Set the quotient of 13 ÷ 5 (quotient 2) on the 算盘.",
        target: 2,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "13 ÷ 5: 5 × 2 = 10, so the quotient is 2.",
              visual: {
                kind: "diagram",
                name: "remainder",
                numbers: [13, 5],
              },
            },
            {
              text: "13 − 10 = 3 left over, so the remainder is 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
            {
              text: "Set the quotient 2 on the rod.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
          ],
        },
      },
    ],
    "division-check": [
      {
        id: "level-check-division",
        type: "heading",
        text: "Level check — 除法",
        figure: {
          visual: {
            kind: "diagram",
            name: "exam-paper",
          },
          caption: "Mixed divisors here, and a remainder waiting in most of the answers.",
        },
      },
      {
        id: "divide-and-spot-the-remainder",
        type: "paragraph",
        text: "Divide, spot the remainder, and finish the level.",
        figure: {
          visual: {
            kind: "diagram",
            name: "remainder",
            numbers: [10, 3],
          },
          caption: "Three groups of three, and one left sitting at the end of the row.",
        },
      },
      {
        id: "quiz-42-divided-by-7",
        type: "quiz",
        prompt: "42 ÷ 7 = ?",
        choices: [6, 7, 5, 8],
        answer: 6,
        explanation: {
          steps: [
            {
              text: "7 × 6 = 42, so the quotient is 6.",
              visual: {
                kind: "abacus",
                digits: [2, 4],
              },
            },
            {
              text: "42 ÷ 7 = 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
      {
        id: "quiz-81-divided-by-9",
        type: "quiz",
        prompt: "81 ÷ 9 = ?",
        choices: [9, 8, 7, 6],
        answer: 9,
        explanation: {
          steps: [
            {
              text: "9 × 9 = 81, so the quotient is 9.",
              visual: {
                kind: "abacus",
                digits: [1, 8],
              },
            },
            {
              text: "81 ÷ 9 = 9.",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
          ],
        },
      },
      {
        id: "build-64-divided-by-8",
        type: "build",
        prompt: "Set the quotient of 64 ÷ 8 on the 算盘.",
        target: 8,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "64 ÷ 8 asks how many groups of 8 fit in 64.",
              visual: {
                kind: "diagram",
                name: "multiply-table",
                numbers: [8, 8],
              },
            },
            {
              text: "8 × 8 = 64, so the quotient is 8.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
            {
              text: "Set 8 on the rod.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
          ],
        },
      },
      {
        id: "quiz-remainder-26-by-8",
        type: "quiz",
        prompt: "26 ÷ 8 — what is the remainder?",
        choices: [2, 3, 4, 1],
        answer: 2,
        explanation: {
          steps: [
            {
              text: "8 × 3 = 24, which is as many whole 8s as fit in 26.",
              visual: {
                kind: "abacus",
                digits: [4, 2],
              },
            },
            {
              text: "26 − 24 = 2 left over.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
            {
              text: "So 26 ÷ 8 = 3 remainder 2.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
          ],
        },
      },
    ],
  },

  "square-roots": {
    "square-root-meaning": [
      {
        id: "understanding-square-roots",
        type: "heading",
        text: "开方 — square roots",
        figure: {
          visual: {
            kind: "diagram",
            name: "square-grid",
            numbers: [3],
          },
          caption: "Three across and three down make nine, and the root is the side.",
        },
      },
      {
        id: "root-undoes-squaring",
        type: "paragraph",
        text: "Finding a square root (开方, kāi fāng) undoes squaring: 9's root is 3 because 3 × 3 = 9. The symbol is √, and the number under it is the perfect square.",
        figure: {
          visual: {
            kind: "diagram",
            name: "multiply-array",
            numbers: [3, 3],
          },
          caption: "Three rows of three make nine, so three is the root you are after.",
        },
      },
      {
        id: "what-times-itself",
        type: "paragraph",
        text: "Think of it as asking 'what number, times itself, makes this?' — 开方 is the reverse of 乘法 for equal factors.",
        figure: {
          visual: {
            kind: "diagram",
            name: "square-grid",
            numbers: [6],
          },
          caption: "Six counted twice gives thirty-six, which is what squaring means.",
        },
      },
      {
        id: "quiz-root-of-9",
        type: "quiz",
        prompt: "√9 = ?",
        choices: [3, 2, 6, 4],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "√ asks what number times itself makes 9.",
              visual: {
                kind: "diagram",
                name: "square-grid",
                numbers: [3],
              },
            },
            {
              text: "3 × 3 = 9.",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
            {
              text: "So the root is 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-root-of-16",
        type: "quiz",
        prompt: "√16 = ?",
        choices: [4, 8, 2, 5],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "√ asks what number times itself makes 16.",
              visual: {
                kind: "diagram",
                name: "square-grid",
                numbers: [4],
              },
            },
            {
              text: "4 × 4 = 16.",
              visual: {
                kind: "abacus",
                digits: [6, 1],
              },
            },
            {
              text: "So the root is 4.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "quiz-root-of-25",
        type: "quiz",
        prompt: "√25 = ?",
        choices: [5, 10, 4, 6],
        answer: 5,
        explanation: {
          steps: [
            {
              text: "√ asks what number times itself makes 25.",
              visual: {
                kind: "diagram",
                name: "square-grid",
                numbers: [5],
              },
            },
            {
              text: "5 × 5 = 25.",
              visual: {
                kind: "abacus",
                digits: [5, 2],
              },
            },
            {
              text: "So the root is 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "build-root-of-9",
        type: "build",
        prompt: "Set √9 = 3 on the 算盘.",
        target: 3,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "√ asks what number times itself makes 9.",
              visual: {
                kind: "diagram",
                name: "square-grid",
                numbers: [3],
              },
            },
            {
              text: "3 × 3 = 9, so the root is 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
            {
              text: "Set 3 on the rod.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
    ],
    "perfect-squares": [
      {
        id: "perfect-squares",
        type: "heading",
        text: "Perfect squares",
        figure: {
          visual: {
            kind: "diagram",
            name: "number-line",
            numbers: [1, 4, 9, 16, 25, 36],
          },
          caption: "Notice how the steps between the squares grow longer as the numbers rise.",
        },
      },
      {
        id: "squares-under-one-hundred",
        type: "paragraph",
        text: "The squares under 100 are worth memorising: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. Learn them two ways — the square, and the root that built it.",
        figure: {
          visual: {
            kind: "diagram",
            name: "square-grid",
            numbers: [10],
          },
          caption: "Ten rows of ten close the list, and one hundred is a square you can count.",
        },
      },
      {
        id: "roots-as-mnemonics",
        type: "paragraph",
        text: "珠算 students train these until √ is just another 口诀: 六六三十六 and 八八六十四 tell you the roots instantly.",
        figure: {
          visual: {
            kind: "diagram",
            name: "numerals",
            numbers: [6, 8],
            labels: ["六", "八"],
          },
          caption: "Say the character twice over and the square arrives with it.",
        },
      },
      {
        id: "quiz-root-of-36",
        type: "quiz",
        prompt: "√36 = ?",
        choices: [6, 7, 9, 5],
        answer: 6,
        explanation: {
          steps: [
            {
              text: "六六三十六 — 6 × 6 = 36.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["六六三十六"],
              },
            },
            {
              text: "So the root is 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
            {
              text: "√36 = 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
      {
        id: "quiz-root-of-64",
        type: "quiz",
        prompt: "√64 = ?",
        choices: [8, 6, 9, 7],
        answer: 8,
        explanation: {
          steps: [
            {
              text: "八八六十四 — 8 × 8 = 64.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["八八六十四"],
              },
            },
            {
              text: "So the root is 8.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
            {
              text: "√64 = 8.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
          ],
        },
      },
      {
        id: "quiz-root-of-100",
        type: "quiz",
        prompt: "√100 = ?",
        choices: [10, 20, 50, 9],
        answer: 10,
        explanation: {
          steps: [
            {
              text: "√ asks what number times itself makes 100.",
              visual: {
                kind: "diagram",
                name: "square-grid",
                numbers: [10],
              },
            },
            {
              text: "10 × 10 = 100.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 1],
              },
            },
            {
              text: "So the root is 10.",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
          ],
        },
      },
      {
        id: "build-root-of-49",
        type: "build",
        prompt: "Set √49 = 7 on the 算盘.",
        target: 7,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "七 七 四十九 — 7 × 7 = 49.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["七七四十九"],
              },
            },
            {
              text: "So the root is 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
            {
              text: "Set 7 on the rod.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
    ],
    "estimate-roots": [
      {
        id: "between-two-roots",
        type: "heading",
        text: "Between two roots",
        figure: {
          visual: {
            kind: "diagram",
            name: "root-between",
            numbers: [20],
          },
          caption: "Twenty lands between sixteen and twenty-five, nearer the smaller one.",
        },
      },
      {
        id: "not-every-root-is-whole",
        type: "paragraph",
        text: "Not every root is a whole number. √50 isn't perfect — but 49's root is 7 and 64's root is 8, so √50 lives between 7 and 8, closer to 7.",
        figure: {
          visual: {
            kind: "diagram",
            name: "root-between",
            numbers: [50],
          },
          caption: "The answer is not one number but the pair of roots it sits between.",
        },
      },
      {
        id: "box-the-answer-between-squares",
        type: "paragraph",
        text: "Find the two perfect squares the number sits between, take their roots, and you've boxed the answer.",
        figure: {
          visual: {
            kind: "diagram",
            name: "number-line",
            numbers: [49, 64],
          },
          caption: "Two squares on either side fence the answer in and show which end it favours.",
        },
      },
      {
        id: "quiz-root-of-50",
        type: "quiz",
        prompt: "√50 is between 49 and 64. Which whole number is it closer to?",
        choices: [7, 8, 6, 9],
        answer: 7,
        explanation: {
          steps: [
            {
              text: "√49 = 7 and √64 = 8, so √50 is between 7 and 8.",
              visual: {
                kind: "diagram",
                name: "root-between",
                numbers: [50],
              },
            },
            {
              text: "50 is much nearer 49 than 64.",
              visual: {
                kind: "abacus",
                digits: [0, 5],
              },
            },
            {
              text: "So √50 is closer to 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "quiz-root-of-30",
        type: "quiz",
        prompt: "√30 is between 25 and 36. Which whole number is it closer to?",
        choices: [5, 6, 4, 7],
        answer: 5,
        explanation: {
          steps: [
            {
              text: "√25 = 5 and √36 = 6, so √30 is between 5 and 6.",
              visual: {
                kind: "diagram",
                name: "root-between",
                numbers: [30],
              },
            },
            {
              text: "30 is nearer 25 than 36.",
              visual: {
                kind: "abacus",
                digits: [0, 3],
              },
            },
            {
              text: "So √30 is closer to 5.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "quiz-root-of-90",
        type: "quiz",
        prompt: "√90 is between 81 and 100. Which whole number is it closer to?",
        choices: [9, 10, 8, 11],
        answer: 9,
        explanation: {
          steps: [
            {
              text: "√81 = 9 and √100 = 10, so √90 is between 9 and 10.",
              visual: {
                kind: "diagram",
                name: "root-between",
                numbers: [90],
              },
            },
            {
              text: "90 is nearer 81 than 100.",
              visual: {
                kind: "abacus",
                digits: [0, 9],
              },
            },
            {
              text: "So √90 is closer to 9.",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
          ],
        },
      },
      {
        id: "build-root-of-81",
        type: "build",
        prompt: "Set √81 = 9 on the 算盘.",
        target: 9,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "九 九 八十一 — 9 × 9 = 81.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["九九八十一"],
              },
            },
            {
              text: "So the root is 9.",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
            {
              text: "Set 9 on the rod.",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
          ],
        },
      },
    ],
    "square-root-check": [
      {
        id: "level-check-square-roots",
        type: "heading",
        text: "Level check — 开方",
        figure: {
          visual: {
            kind: "diagram",
            name: "square-grid",
            numbers: [9],
          },
          caption: "Every question here ends in a square worth knowing by heart.",
        },
      },
      {
        id: "read-and-set-the-root",
        type: "paragraph",
        text: "Read the root, set it on the 算盘, and finish the level.",
        figure: {
          visual: {
            kind: "diagram",
            name: "board-vs-numeral",
            numbers: [3],
          },
          caption: "Set the root on the rods and read the same number straight back.",
        },
      },
      {
        id: "quiz-root-of-49",
        type: "quiz",
        prompt: "√49 = ?",
        choices: [7, 6, 8, 9],
        answer: 7,
        explanation: {
          steps: [
            {
              text: "七 七 四十九 — 7 × 7 = 49.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["七七四十九"],
              },
            },
            {
              text: "So √49 = 7.",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "quiz-root-of-81",
        type: "quiz",
        prompt: "√81 = ?",
        choices: [9, 8, 7, 10],
        answer: 9,
        explanation: {
          steps: [
            {
              text: "九 九 八十一 — 9 × 9 = 81.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["九九八十一"],
              },
            },
            {
              text: "So √81 = 9.",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
          ],
        },
      },
      {
        id: "build-root-of-100",
        type: "build",
        prompt: "Set √100 = 10 on the 算盘.",
        target: 10,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "√100 asks what number times itself makes 100.",
              visual: {
                kind: "diagram",
                name: "square-grid",
                numbers: [10],
              },
            },
            {
              text: "10 × 10 = 100, so the root is 10.",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
            {
              text: "Set 10 on the tens 档.",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
          ],
        },
      },
      {
        id: "quiz-root-of-121",
        type: "quiz",
        prompt: "√121 = ?",
        choices: [11, 12, 10, 9],
        answer: 11,
        explanation: {
          steps: [
            {
              text: "√ asks what number times itself makes 121.",
              visual: {
                kind: "diagram",
                name: "square-grid",
                numbers: [11],
              },
            },
            {
              text: "11 × 11 = 121.",
              visual: {
                kind: "abacus",
                digits: [1, 2, 1],
              },
            },
            {
              text: "So the root is 11.",
              visual: {
                kind: "abacus",
                digits: [1, 1],
              },
            },
          ],
        },
      },
    ],
  },

  "mental-beadwork": {
    "imagined-abacus": [
      {
        id: "picture-your-suanpan",
        type: "heading",
        text: "Picture your 算盘",
        figure: {
          visual: {
            kind: "diagram",
            name: "mental-board",
            numbers: [4, 3],
          },
          caption: "The board inside keeps its rods, its beam and the place of every bead.",
        },
      },
      {
        id: "beads-in-your-mind",
        type: "paragraph",
        text: "Now for the payoff: you keep the five-bead board in your mind, and the 口诀 become silent instructions. Start by setting a number on the real board, closing your eyes, and 'seeing' it clearly.",
        figure: {
          visual: {
            kind: "diagram",
            name: "vivid-image",
          },
          caption: "A blurred board has to be rebuilt before it can be used at all.",
        },
      },
      {
        id: "move-methodically",
        type: "paragraph",
        text: "Move methodically — 上珠, 下珠, rod by rod, beam in the middle. The clearer your picture, the faster your mental moves will be.",
        figure: {
          visual: {
            kind: "diagram",
            name: "mental-board",
            numbers: [5, 0],
          },
          caption: "The beam stays in the middle, and each rod keeps its own place.",
        },
      },
      {
        id: "read-your-first-mental-rod",
        type: "read",
        prompt: "Read this rod on your way to picturing it.",
        digits: [6],
        choices: [6, 5, 4, 7],
        explanation: {
          steps: [
            {
              text: "The 上珠 (5) plus one 下珠 (1).",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [6]],
                captions: ["Heaven bead: 5", "One earth bead up → 6"],
                label: "6",
              },
            },
            {
              text: "The rod shows 6.",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
          ],
        },
      },
      {
        id: "read-a-mental-board",
        type: "read",
        prompt: "Now read a board you should be able to hold with your eyes closed.",
        digits: [1, 5],
        choices: [15, 51, 11, 10],
        explanation: {
          steps: [
            {
              text: "The tens 档 shows 5.",
              visual: {
                kind: "abacus",
                digits: [0, 5],
              },
            },
            {
              text: "The ones 档 shows 1, so the number is 51.",
              visual: {
                kind: "abacus",
                digits: [1, 5],
              },
            },
          ],
        },
      },
      {
        id: "build-46-from-memory",
        type: "build",
        prompt: "Set 46, then close your eyes, clear it in your mind, and rebuild it.",
        target: 46,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Four 下珠 on the tens 档 make 40.",
              visual: {
                kind: "abacus",
                digits: [0, 4],
              },
            },
            {
              text: "One 上珠 plus one 下珠 on the ones 档 make 6.",
              visual: {
                kind: "abacus",
                digits: [6, 4],
              },
            },
            {
              text: "40 + 6 = 46.",
              visual: {
                kind: "abacus",
                digits: [6, 4],
              },
            },
          ],
        },
      },
    ],
    "kan-xinsuan": [
      {
        id: "visual-mental-math",
        type: "heading",
        text: "看心算 — visual mental math",
        figure: {
          visual: {
            kind: "diagram",
            name: "kan-xinsuan",
            numbers: [3, 4],
          },
          caption: "The number goes in through the eyes and lands on the board inside.",
        },
      },
      {
        id: "mental-math-from-written-numbers",
        type: "paragraph",
        text: "看心算 (kàn xīn suàn) is mental calculation from written numbers: you read the expression, then run it bead by bead on your inner 算盘.",
        figure: {
          visual: {
            kind: "diagram",
            name: "kan-xinsuan",
            numbers: [5, 6],
          },
          caption: "Nothing is written in between; the board holds the middle steps.",
        },
      },
      {
        id: "say-each-move-silently",
        type: "paragraph",
        text: "Say each move silently as you go — 二上二, 四下五去一 — and let your mental picture do the arithmetic.",
        figure: {
          visual: {
            kind: "diagram",
            name: "mental-board",
            numbers: [2, 4],
          },
          caption: "The formulas still run, only now nobody hears them.",
        },
      },
      {
        id: "quiz-23-plus-45",
        type: "quiz",
        prompt: "看心算: 23 + 45 = ?",
        choices: [68, 78, 67, 58],
        answer: 68,
        explanation: {
          steps: [
            {
              text: "Ones: 3 + 5 = 8.",
              visual: {
                kind: "abacus",
                digits: [8, 2],
              },
            },
            {
              text: "Tens: 2 + 4 = 6.",
              visual: {
                kind: "abacus",
                digits: [8, 6],
              },
            },
            {
              text: "So 23 + 45 = 68.",
              visual: {
                kind: "abacus",
                digits: [8, 6],
              },
            },
          ],
        },
      },
      {
        id: "quiz-68-minus-29",
        type: "quiz",
        prompt: "看心算: 68 − 29 = ?",
        choices: [39, 49, 38, 40],
        answer: 39,
        explanation: {
          steps: [
            {
              text: "Borrow for the ones: 18 − 9 = 9.",
              visual: {
                kind: "abacus",
                digits: [9, 5],
              },
            },
            {
              text: "Tens: 6 − 2 − 1 = 3.",
              visual: {
                kind: "abacus",
                digits: [9, 3],
              },
            },
            {
              text: "So 68 − 29 = 39.",
              visual: {
                kind: "abacus",
                digits: [9, 3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-46-plus-18",
        type: "quiz",
        prompt: "看心算: 46 + 18 = ?",
        choices: [64, 54, 74, 63],
        answer: 64,
        explanation: {
          steps: [
            {
              text: "Ones: 6 + 8 = 14 — set 4, carry 1.",
              visual: {
                kind: "abacus",
                digits: [4, 4],
              },
            },
            {
              text: "Tens: 4 + 1 + 1 = 6.",
              visual: {
                kind: "abacus",
                digits: [4, 6],
              },
            },
            {
              text: "So 46 + 18 = 64.",
              visual: {
                kind: "abacus",
                digits: [4, 6],
              },
            },
          ],
        },
      },
    ],
    "ting-xinsuan": [
      {
        id: "listening-mental-math",
        type: "heading",
        text: "听心算 — listening mental math",
        figure: {
          visual: {
            kind: "diagram",
            name: "ting-xinsuan",
            numbers: [18, 42],
          },
          caption: "Nothing is written and nothing is seen; the numbers arrive as sound.",
        },
      },
      {
        id: "no-written-numbers",
        type: "paragraph",
        text: "听心算 (tīng xīn suàn) removes the written number entirely. A number is spoken, you place it on your mental board, and the next number is already on its way.",
        figure: {
          visual: {
            kind: "diagram",
            name: "ting-xinsuan",
            numbers: [56, 73],
          },
          caption: "Each number has to be placed before the next one has finished arriving.",
        },
      },
      {
        id: "start-slow",
        type: "paragraph",
        text: "Start slow — one number every few seconds. If you lose the picture, shrink the numbers, not the practice.",
        figure: {
          visual: {
            kind: "diagram",
            name: "speed-clock",
            numbers: [3],
          },
          caption: "Three seconds between numbers is a fair place to begin.",
        },
      },
      {
        id: "quiz-30-plus-25",
        type: "quiz",
        prompt: "听心算: you hear 30, then add 25. What do you see?",
        choices: [55, 45, 65, 54],
        answer: 55,
        explanation: {
          steps: [
            {
              text: "Place 30 on the mental board.",
              visual: {
                kind: "diagram",
                name: "mental-board",
                numbers: [0, 3],
              },
            },
            {
              text: "Add 25: tens 3 + 2 = 5, ones 0 + 5 = 5.",
              visual: {
                kind: "abacus",
                digits: [5, 5],
              },
            },
            {
              text: "The board shows 55.",
              visual: {
                kind: "abacus",
                digits: [5, 5],
              },
            },
          ],
        },
      },
      {
        id: "quiz-55-minus-17",
        type: "quiz",
        prompt: "听心算: your board shows 55; subtract 17.",
        choices: [38, 37, 39, 48],
        answer: 38,
        explanation: {
          steps: [
            {
              text: "Borrow for the ones: 15 − 7 = 8.",
              visual: {
                kind: "abacus",
                digits: [8, 4],
              },
            },
            {
              text: "Tens: 5 − 1 − 1 = 3.",
              visual: {
                kind: "abacus",
                digits: [8, 3],
              },
            },
            {
              text: "The board shows 38.",
              visual: {
                kind: "abacus",
                digits: [8, 3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-38-plus-24",
        type: "quiz",
        prompt: "听心算: from 38, add 24.",
        choices: [62, 52, 72, 61],
        answer: 62,
        explanation: {
          steps: [
            {
              text: "Ones: 8 + 4 = 12 — set 2, carry 1.",
              visual: {
                kind: "abacus",
                digits: [2, 3],
              },
            },
            {
              text: "Tens: 3 + 2 + 1 = 6.",
              visual: {
                kind: "abacus",
                digits: [2, 6],
              },
            },
            {
              text: "The board shows 62.",
              visual: {
                kind: "abacus",
                digits: [2, 6],
              },
            },
          ],
        },
      },
    ],
    "flash-mental": [
      {
        id: "flash-anzan-intro",
        type: "heading",
        text: "闪电算入门 — flash anzan",
        figure: {
          visual: {
            kind: "diagram",
            name: "flash-drill",
            numbers: [7],
          },
          caption: "The number is gone before you can copy it, so the board has to hold it.",
        },
      },
      {
        id: "flash-mental-math",
        type: "paragraph",
        text: "闪电算 (shǎn diàn suàn) is flash mental math: numbers shown or spoken almost instantly, one after another, added to a single running total. 珠心算 champions handle ten or more this way.",
        figure: {
          visual: {
            kind: "diagram",
            name: "flash-drill",
            numbers: [6],
          },
          caption: "Only the running total stays; each new number wipes the one before it.",
        },
      },
      {
        id: "build-up-with-cards",
        type: "paragraph",
        text: "Build up with flashcards or a friend: three numbers at one per second, then five, then speed up. Hold only the running total — each new number lands and vanishes.",
        figure: {
          visual: {
            kind: "diagram",
            name: "number-sprint",
            numbers: [3, 4, 5],
          },
          caption: "Each round adds two more numbers to the same steady rhythm.",
        },
      },
      {
        id: "quiz-flash-12-15-8",
        type: "quiz",
        prompt: "Flash set: 12, 15, 8. Total?",
        choices: [35, 33, 36, 45],
        answer: 35,
        explanation: {
          steps: [
            {
              text: "Hold 12, then add 15: 12 + 15 = 27.",
              visual: {
                kind: "diagram",
                name: "running-total",
                numbers: [12, 15, 8],
              },
            },
            {
              text: "Now add 8: 27 + 8 = 35.",
              visual: {
                kind: "abacus",
                digits: [7, 2],
              },
            },
            {
              text: "The running total is 35.",
              visual: {
                kind: "abacus",
                digits: [5, 3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-flash-40-22-33",
        type: "quiz",
        prompt: "Flash set: 40, 22, 33. Total?",
        choices: [95, 85, 92, 96],
        answer: 95,
        explanation: {
          steps: [
            {
              text: "Hold 40, then add 22: 40 + 22 = 62.",
              visual: {
                kind: "diagram",
                name: "running-total",
                numbers: [40, 22, 33],
              },
            },
            {
              text: "Now add 33: 62 + 33 = 95.",
              visual: {
                kind: "abacus",
                digits: [2, 6],
              },
            },
            {
              text: "The running total is 95.",
              visual: {
                kind: "abacus",
                digits: [5, 9],
              },
            },
          ],
        },
      },
      {
        id: "quiz-four-times-25",
        type: "quiz",
        prompt: "Flash set: 25, 25, 25, 25. Total?",
        choices: [100, 90, 110, 99],
        answer: 100,
        explanation: {
          steps: [
            {
              text: "The flash set is four 25s.",
              visual: {
                kind: "diagram",
                name: "running-total",
                numbers: [25, 25, 25, 25],
              },
            },
            {
              text: "25 + 25 = 50, twice over.",
              visual: {
                kind: "abacus",
                digits: [0, 5],
              },
            },
            {
              text: "Four 25s make 25 × 4 = 100.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 1],
              },
            },
          ],
        },
      },
    ],
    "grading-challenge": [
      {
        id: "your-grading-challenge",
        type: "heading",
        text: "定级 — your grading challenge",
        figure: {
          visual: {
            kind: "diagram",
            name: "championship",
          },
          caption: "A mixed set, every formula at once, and a grade waiting at the end.",
        },
      },
      {
        id: "graded-tests-in-china",
        type: "paragraph",
        text: "In China, 珠心算 students take graded tests from 十级 (grade 10) up to 一级 and beyond. This is your first taste: a mixed set that uses every 口诀 you've learned.",
        figure: {
          visual: {
            kind: "diagram",
            name: "progress-ladder",
          },
          caption: "The grades climb as the tests grow longer and the numbers grow bigger.",
        },
      },
      {
        id: "quiz-8-minus-5",
        type: "quiz",
        prompt: "直减: 8 − 5 = ?",
        choices: [3, 4, 2, 5],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "五去五 lifts the 上珠 away.",
              visual: {
                kind: "abacus-anim",
                frames: [[8], [3]],
                captions: ["8 on the rod", "五去五: heaven bead up → 3"],
                label: "3",
              },
            },
            {
              text: "Three 下珠 stay, so 8 − 5 = 3.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "quiz-4-plus-4",
        type: "quiz",
        prompt: "满五加: 4 + 4 = ?",
        choices: [8, 7, 9, 6],
        answer: 8,
        explanation: {
          steps: [
            {
              text: "四下五去一: drop the 上珠 (5).",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
            {
              text: "Remove one 下珠.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
            {
              text: "4 + 4 = 8.",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
          ],
        },
      },
      {
        id: "quiz-17-plus-9",
        type: "quiz",
        prompt: "进位加: 17 + 9 = ?",
        choices: [26, 25, 27, 24],
        answer: 26,
        explanation: {
          steps: [
            {
              text: "Ones: 7 + 9 = 16 — set 6, carry 1.",
              visual: {
                kind: "abacus",
                digits: [6, 1],
              },
            },
            {
              text: "Tens: 1 + 1 = 2.",
              visual: {
                kind: "abacus",
                digits: [6, 2],
              },
            },
            {
              text: "So 17 + 9 = 26.",
              visual: {
                kind: "abacus",
                digits: [6, 2],
              },
            },
          ],
        },
      },
      {
        id: "quiz-60-minus-13",
        type: "quiz",
        prompt: "听心算: 60 − 13 = ?",
        choices: [47, 46, 48, 57],
        answer: 47,
        explanation: {
          steps: [
            {
              text: "Borrow for the ones: 10 − 3 = 7.",
              visual: {
                kind: "abacus",
                digits: [7, 5],
              },
            },
            {
              text: "Tens: 6 − 1 − 1 = 4.",
              visual: {
                kind: "abacus",
                digits: [7, 4],
              },
            },
            {
              text: "So 60 − 13 = 47.",
              visual: {
                kind: "abacus",
                digits: [7, 4],
              },
            },
          ],
        },
      },
      {
        id: "build-17-plus-9",
        type: "build",
        prompt: "Show 17 + 9 = 26 on the abacus to finish.",
        target: 26,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "Ones: 7 + 9 uses 七去三进一 — set 6, carry 1.",
              visual: {
                kind: "abacus",
                digits: [6, 1],
              },
            },
            {
              text: "Tens: 1 + 1 = 2.",
              visual: {
                kind: "abacus",
                digits: [6, 2],
              },
            },
            {
              text: "The board shows 26.",
              visual: {
                kind: "abacus",
                digits: [6, 2],
              },
            },
          ],
        },
      },
    ],
  },
};
