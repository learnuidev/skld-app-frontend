import type { CourseContentMap } from "./types";

export const zhuxinsuanContent: CourseContentMap = {
  "meet-the-suanpan": {
    "what-is-zhuxinsuan": [
      { type: "heading", text: "An abacus that lives in your head" },
      {
        type: "paragraph",
        text: "珠心算 (zhū xīn suàn) means 'abacus mental arithmetic'. First you master the abacus itself — 珠算 (zhū suàn) — then you run the same bead movements on an abacus you picture in your mind. The beads disappear; the method stays.",
      },
      {
        type: "paragraph",
        text: "In this course you'll learn the Chinese way: clear oral formulas called 口诀 (kǒujué), disciplined finger work, and the listening and flash drills that Chinese 珠心算 classes are famous for.",
      },
      {
        type: "explore",
        label: "This modern five-bead 算盘 is exactly the board we'll train on. Click the beads and watch them move to the beam.",
        rods: 4,
        initial: [4, 3, 2, 1],
      },
      {
        type: "paragraph",
        text: "Notice the layout: one bead above the beam — the 上珠 (shàng zhū, upper bead, worth 5) — and four below — 下珠 (xià zhū, lower beads, worth 1 each).",
      },
    ],
    "suanpan-parts": [
      { type: "heading", text: "Anatomy, the Chinese way" },
      {
        type: "list",
        items: [
          "算盘 (suànpán) — the abacus itself.",
          "框 (kuàng) — the frame around the outside.",
          "梁 (liáng) — the beam; beads touching it are counted.",
          "档 (dàng) — a rod; each rod holds one digit.",
          "上珠 (shàng zhū) — the upper bead, worth 5.",
          "下珠 (xià zhū) — the lower beads, worth 1 each.",
        ],
      },
      {
        type: "paragraph",
        text: "Traditional large suanpan have two upper and five lower beads per rod. The modern five-bead 算盘 you see here keeps one upper and four lower — all any decimal number ever needs — and it is the board most 珠心算 classes teach on.",
      },
      {
        type: "explore",
        label: "Make the beam yours: set a number, clear it, then set another.",
        rods: 3,
        initial: [0, 0, 0],
      },
      {
        type: "read",
        prompt: "One 上珠 touching the beam. What number is this 档 showing?",
        digits: [5],
        choices: [5, 1, 4, 10],
      },
    ],
    "fingers-and-values": [
      { type: "heading", text: "拨珠指法 — finger work" },
      {
        type: "paragraph",
        text: "Correct fingers make fast, clean beadwork. Standard rule: the thumb pushes 下珠 up to the beam; the index finger pushes 下珠 down and also moves the 上珠. One clean movement per bead — no fidgeting.",
      },
      {
        type: "paragraph",
        text: "And the values: every 下珠 touching the beam is 1; the 上珠 touching it is 5.",
      },
      {
        type: "read",
        prompt: "上珠 plus one 下珠. What number is shown?",
        digits: [6],
        choices: [6, 5, 1, 7],
      },
      {
        type: "read",
        prompt: "上珠 plus all four 下珠. What number is shown?",
        digits: [9],
        choices: [9, 4, 5, 8],
      },
      {
        type: "build",
        prompt: "Show 8 the proper way: index finger down for the 上珠, thumb up for three 下珠.",
        target: 8,
        rods: 1,
      },
    ],
    "from-abacus-to-mind": [
      { type: "heading", text: "The training ladder" },
      {
        type: "paragraph",
        text: "珠心算 is taught in stages. First you make every move on a real 算盘 while reading the numbers — that is 看珠算 (kàn zhū suàn). Then you close your eyes and make the same moves on the board in your head — 心算 (xīn suàn).",
      },
      {
        type: "paragraph",
        text: "Students in Chinese 珠心算 classes progress through graded tests from 十级 (grade 10) toward 一级 and beyond. This course mirrors that path: level by level you'll earn the right to leave the real board behind.",
      },
      {
        type: "read",
        prompt: "Warm up: what number is this 档 showing?",
        digits: [3, 1],
        choices: [13, 31, 4, 30],
      },
      {
        type: "build",
        prompt: "Build 24 — the number you'll soon be able to picture with your eyes closed.",
        target: 24,
        rods: 2,
      },
    ],
    "meet-the-suanpan-check": [
      { type: "heading", text: "Level check — meet the suanpan" },
      { type: "paragraph", text: "Read it, then build it. Solve every question to finish the level." },
      {
        type: "read",
        prompt: "上珠 plus two 下珠. What number is shown?",
        digits: [7],
        choices: [7, 2, 6, 5],
      },
      {
        type: "build",
        prompt: "Show 5 using only your 上珠.",
        target: 5,
        rods: 1,
      },
      {
        type: "build",
        prompt: "Now show 36 on two 档.",
        target: 36,
        rods: 2,
      },
      {
        type: "read",
        prompt: "Two 下珠 on the tens 档 and none on the ones 档. What number?",
        digits: [0, 2],
        choices: [20, 2, 22, 200],
      },
    ],
  },

  "direct-add-subtract": {
    "direct-add": [
      { type: "heading", text: "直加 — direct addition" },
      {
        type: "paragraph",
        text: "直加 (zhí jiā) is addition with room to spare: every bead you need can slide straight to the beam. Each move has a formula, a 口诀. Adding one is 一上一 (yī shàng yī) — 'one, up one'. Two is 二上二, three 三上三, and so on.",
      },
      {
        type: "paragraph",
        text: "Read the formula as you move: 3 + 1 says 一上一 and the rod shows 4. 5 + 3 says 三上三 — the 上珠 is already home and three 下珠 join it to show 8.",
      },
      {
        type: "quiz",
        prompt: "3 + 1 = ?",
        choices: [4, 3, 5, 6],
        answer: 4,
      },
      {
        type: "quiz",
        prompt: "5 + 4 = ?",
        choices: [9, 8, 10, 7],
        answer: 9,
      },
      {
        type: "quiz",
        prompt: "1 + 5 = ?",
        choices: [6, 5, 7, 4],
        answer: 6,
      },
      {
        type: "build",
        prompt: "Show 5 + 3 = 8 on your 算盘.",
        target: 8,
        rods: 1,
      },
    ],
    "direct-subtract": [
      { type: "heading", text: "直减 — direct subtraction" },
      {
        type: "paragraph",
        text: "直减 (zhí jiǎn) removes beads straight off the beam. The 口诀: taking one away is 一去一 (yī qù yī) — 'one, remove one'. Two is 二去二, all the way up to 五去五 for the 上珠.",
      },
      {
        type: "paragraph",
        text: "Watch the beads leave as you say it: 9 − 2 is 二去二 and the rod shows 7. 6 − 5 is 五去五 and only the single 下珠 stays — 1.",
      },
      {
        type: "quiz",
        prompt: "9 − 2 = ?",
        choices: [7, 6, 8, 5],
        answer: 7,
      },
      {
        type: "quiz",
        prompt: "6 − 5 = ?",
        choices: [1, 5, 0, 2],
        answer: 1,
      },
      {
        type: "quiz",
        prompt: "8 − 3 = ?",
        choices: [5, 4, 6, 3],
        answer: 5,
      },
      {
        type: "build",
        prompt: "Show 8 − 3 = 5 on the rod.",
        target: 5,
        rods: 1,
      },
    ],
    "accurate-quick": [
      { type: "heading", text: "读得准，拨得快" },
      {
        type: "paragraph",
        text: "In 珠算 class, form comes first: say the 口诀, move the beads, read the answer. Fast fingers on the wrong beads are worse than slow fingers on the right ones.",
      },
      {
        type: "read",
        prompt: "Read this 档 in one glance.",
        digits: [5],
        choices: [5, 4, 6, 10],
      },
      {
        type: "read",
        prompt: "Now read two 档 together.",
        digits: [4, 1],
        choices: [14, 41, 5, 40],
      },
      {
        type: "build",
        prompt: "Set 25 quickly: two 下珠 on the tens 档, one 上珠 on the ones 档.",
        target: 25,
        rods: 2,
      },
      {
        type: "build",
        prompt: "Clear, then set 37.",
        target: 37,
        rods: 2,
      },
    ],
    "two-digit-direct": [
      { type: "heading", text: "Two-digit 直加减" },
      {
        type: "paragraph",
        text: "Two-digit direct work lines up the 档 by place value and moves beads rod by rod. 22 + 31: tens get 2 + 3 = 5, ones get 2 + 1 = 3, answer 53. No trick 口诀 needed — just 直加 on both rods.",
      },
      {
        type: "paragraph",
        text: "Subtraction works the same way: 56 − 24 removes two tens and four ones to leave 32.",
      },
      {
        type: "quiz",
        prompt: "22 + 31 = ?",
        choices: [53, 43, 63, 52],
        answer: 53,
      },
      {
        type: "quiz",
        prompt: "56 − 24 = ?",
        choices: [32, 22, 42, 34],
        answer: 32,
      },
      {
        type: "quiz",
        prompt: "33 + 15 = ?",
        choices: [48, 38, 58, 47],
        answer: 48,
      },
      {
        type: "build",
        prompt: "Show 22 + 31 = 53 on the abacus.",
        target: 53,
        rods: 2,
      },
    ],
    "direct-check": [
      { type: "heading", text: "Level check — direct addition and subtraction" },
      { type: "paragraph", text: "Say the 口诀, make the move, read the answer." },
      {
        type: "quiz",
        prompt: "4 + 5 = ?",
        choices: [9, 8, 10, 6],
        answer: 9,
      },
      {
        type: "quiz",
        prompt: "7 − 2 = ?",
        choices: [5, 4, 6, 3],
        answer: 5,
      },
      {
        type: "build",
        prompt: "Show 33 + 15 = 48 on the abacus.",
        target: 48,
        rods: 2,
      },
      {
        type: "quiz",
        prompt: "48 − 15 = ?",
        choices: [33, 43, 23, 34],
        answer: 33,
      },
    ],
  },

  "friends-of-five": {
    "complement-to-five": [
      { type: "heading", text: "The complements hiding in five" },
      {
        type: "paragraph",
        text: "When the 下珠 of a rod are busy, adding another 1 to 4 needs the 上珠 — and to keep the total right you remove the addend's 凑数 (còu shù, complement to five). Four's complement is one; three's complement is two.",
      },
      {
        type: "paragraph",
        text: "So 'add 4 to a full lower rod' means: 下五 (drop the 5) then 去一 (remove one).",
      },
      {
        type: "quiz",
        prompt: "3 + 4 = ?",
        choices: [7, 6, 8, 5],
        answer: 7,
      },
      {
        type: "quiz",
        prompt: "2 + 4 = ?",
        choices: [6, 5, 7, 4],
        answer: 6,
      },
      {
        type: "quiz",
        prompt: "4 + 4 = ?",
        choices: [8, 7, 9, 6],
        answer: 8,
      },
    ],
    "add-with-five": [
      { type: "heading", text: "满五加 — adding with the five" },
      {
        type: "paragraph",
        text: "For adding 1 through 4 when the lower beads are tight, memorize these formulas:",
      },
      {
        type: "list",
        items: [
          "加1：一下五去四 — one, drop five, remove four.",
          "加2：二下五去三 — two, drop five, remove three.",
          "加3：三下五去二 — three, drop five, remove two.",
          "加4：四下五去一 — four, drop five, remove one.",
        ],
      },
      {
        type: "paragraph",
        text: "Picture 4 + 3: the rod shows four 下珠. Add 3 with 三下五去二 — drop the 上珠, remove two 下珠 — and the rod settles on 7.",
      },
      {
        type: "quiz",
        prompt: "4 + 1 = ?",
        choices: [5, 4, 6, 3],
        answer: 5,
      },
      {
        type: "quiz",
        prompt: "4 + 2 = ?",
        choices: [6, 5, 7, 8],
        answer: 6,
      },
      {
        type: "quiz",
        prompt: "3 + 2 = ?",
        choices: [5, 4, 6, 7],
        answer: 5,
      },
      {
        type: "quiz",
        prompt: "4 + 3 = ?",
        choices: [7, 6, 8, 9],
        answer: 7,
      },
      {
        type: "build",
        prompt: "Show 4 + 3 = 7 — the 三下五去二 move.",
        target: 7,
        rods: 1,
      },
    ],
    "subtract-with-five": [
      { type: "heading", text: "破五减 — breaking the five" },
      {
        type: "paragraph",
        text: "Subtracting when the 上珠 is down needs 破五 (pò wǔ, break the five): remove the 上珠 (−5) and add back the subtractor's complement to five.",
      },
      {
        type: "list",
        items: [
          "减1：一上四去五 — one, up four, remove five.",
          "减2：二上三去五 — two, up three, remove five.",
          "减3：三上二去五 — three, up two, remove five.",
          "减4：四上一去五 — four, up one, remove five.",
        ],
      },
      {
        type: "paragraph",
        text: "Check 6 − 4: the rod shows 上珠 plus one 下珠. Subtract 4 with 四上一去五 — push up one 下珠 and lift the 上珠 away. Two 下珠 remain: 2.",
      },
      {
        type: "quiz",
        prompt: "6 − 4 = ?",
        choices: [2, 3, 1, 4],
        answer: 2,
      },
      {
        type: "quiz",
        prompt: "7 − 3 = ?",
        choices: [4, 3, 5, 6],
        answer: 4,
      },
      {
        type: "quiz",
        prompt: "5 − 1 = ?",
        choices: [4, 5, 3, 6],
        answer: 4,
      },
      {
        type: "quiz",
        prompt: "8 − 4 = ?",
        choices: [4, 3, 5, 2],
        answer: 4,
      },
      {
        type: "build",
        prompt: "Show 6 − 4 = 2 — the 四上一去五 move.",
        target: 2,
        rods: 1,
      },
    ],
    "friends-of-five-drill": [
      { type: "heading", text: "凑五 练习" },
      {
        type: "paragraph",
        text: "Drill order: say the formula, make the move, read the bead. Repeat sets until the words fall away and your fingers simply know.",
      },
      {
        type: "quiz",
        prompt: "6 − 2 = ?",
        choices: [4, 3, 5, 2],
        answer: 4,
      },
      {
        type: "quiz",
        prompt: "4 + 4 = ?",
        choices: [8, 7, 9, 6],
        answer: 8,
      },
      {
        type: "quiz",
        prompt: "5 − 2 = ?",
        choices: [3, 2, 4, 5],
        answer: 3,
      },
      {
        type: "quiz",
        prompt: "4 + 2 = ?",
        choices: [6, 5, 7, 4],
        answer: 6,
      },
      {
        type: "build",
        prompt: "Show 5 − 2 = 3 on the rod.",
        target: 3,
        rods: 1,
      },
    ],
    "friends-of-five-check": [
      { type: "heading", text: "Level check — friends of five" },
      { type: "paragraph", text: "Break the five, add the five, and solve every question." },
      {
        type: "quiz",
        prompt: "4 + 1 = ?",
        choices: [5, 4, 6, 3],
        answer: 5,
      },
      {
        type: "quiz",
        prompt: "7 − 4 = ?",
        choices: [3, 4, 2, 5],
        answer: 3,
      },
      {
        type: "build",
        prompt: "Show 3 + 4 = 7 on the abacus.",
        target: 7,
        rods: 1,
      },
      {
        type: "quiz",
        prompt: "6 − 4 = ?",
        choices: [2, 3, 1, 4],
        answer: 2,
      },
    ],
  },

  "carry-borrow": {
    "complement-ten": [
      { type: "heading", text: "Complements to ten" },
      {
        type: "paragraph",
        text: "Carrying rests on complements to ten: 9 and 1, 8 and 2, 7 and 3, 6 and 4, 5 and 5. When a rod would pass nine, you leave the units that remain and carry one to the 档 on the left.",
      },
      {
        type: "quiz",
        prompt: "7 + ? = 10",
        choices: [3, 2, 4, 7],
        answer: 3,
      },
      {
        type: "quiz",
        prompt: "What do you add to 8 to make 10?",
        choices: [2, 1, 3, 8],
        answer: 2,
      },
      {
        type: "quiz",
        prompt: "4 + 6 = ?",
        choices: [10, 9, 11, 8],
        answer: 10,
      },
    ],
    "carry-add": [
      { type: "heading", text: "进位加 — carrying in addition" },
      {
        type: "paragraph",
        text: "When ones overflow, you 进位 (jìn wèi, carry): leave the remainder on the rod and 进一 to the next 档. The formulas run 加1：一去九进一 … 加9：九去一进一 — 'remove nine, carry one'.",
      },
      {
        type: "paragraph",
        text: "Example 8 + 5: the ones 档 shows 8 and cannot fit another 上珠. Say 五去五进一 — remove the 上珠 (worth five), carry one to the next 档 — and the board shows 13.",
      },
      {
        type: "quiz",
        prompt: "8 + 5 = ?",
        choices: [13, 12, 14, 15],
        answer: 13,
      },
      {
        type: "quiz",
        prompt: "9 + 9 = ?",
        choices: [18, 17, 19, 16],
        answer: 18,
      },
      {
        type: "quiz",
        prompt: "7 + 6 = ?",
        choices: [13, 12, 14, 11],
        answer: 13,
      },
      {
        type: "build",
        prompt: "Show 9 + 9 = 18 on the abacus.",
        target: 18,
        rods: 2,
      },
    ],
    "borrow-subtract": [
      { type: "heading", text: "退位减 — borrowing in subtraction" },
      {
        type: "paragraph",
        text: "When a rod is short, you 退位 (tuì wèi, borrow): take one from the 档 on the left and add back the difference to ten on the short rod. The formulas run 减1：一退一还九 … 减9：九退一还一 — 'borrow one, return nine'.",
      },
      {
        type: "paragraph",
        text: "Example 12 − 5: the ones 档 cannot lose five, so 五退一还五 — the tens 档 loses one and the ones 档 gains five on top of its two, showing 7.",
      },
      {
        type: "quiz",
        prompt: "12 − 5 = ?",
        choices: [7, 6, 8, 5],
        answer: 7,
      },
      {
        type: "quiz",
        prompt: "11 − 8 = ?",
        choices: [3, 2, 4, 5],
        answer: 3,
      },
      {
        type: "quiz",
        prompt: "14 − 6 = ?",
        choices: [8, 7, 9, 6],
        answer: 8,
      },
      {
        type: "build",
        prompt: "Show 12 − 5 = 7 on the abacus.",
        target: 7,
        rods: 2,
      },
    ],
    "mixed-carry-borrow": [
      { type: "heading", text: "Mixed 进退位" },
      {
        type: "paragraph",
        text: "Real problems mix carries and borrows. Say each formula, move the beads, and keep the rhythm — the bead pattern does the remembering for you.",
      },
      {
        type: "quiz",
        prompt: "27 + 15 = ?",
        choices: [42, 32, 52, 43],
        answer: 42,
      },
      {
        type: "quiz",
        prompt: "34 − 18 = ?",
        choices: [16, 26, 15, 14],
        answer: 16,
      },
      {
        type: "quiz",
        prompt: "56 + 37 = ?",
        choices: [93, 83, 92, 94],
        answer: 93,
      },
      {
        type: "build",
        prompt: "Show 56 + 37 = 93 on the abacus.",
        target: 93,
        rods: 2,
      },
    ],
    "carry-borrow-check": [
      { type: "heading", text: "Level check — carry and borrow" },
      { type: "paragraph", text: "Carry it, borrow it, and finish the level." },
      {
        type: "quiz",
        prompt: "8 + 7 = ?",
        choices: [15, 14, 16, 13],
        answer: 15,
      },
      {
        type: "quiz",
        prompt: "13 − 9 = ?",
        choices: [4, 5, 3, 6],
        answer: 4,
      },
      {
        type: "build",
        prompt: "Show 26 + 18 = 44 on the abacus.",
        target: 44,
        rods: 2,
      },
      {
        type: "quiz",
        prompt: "44 − 19 = ?",
        choices: [25, 24, 26, 35],
        answer: 25,
      },
    ],
  },

  "multi-digit-listening": {
    "da-baizi": [
      { type: "heading", text: "打百子 — the 1-to-100 drill" },
      {
        type: "paragraph",
        text: "打百子 (dǎ bǎi zǐ) is the famous endurance drill: add every whole number from 1 to 100 and you should land on 5,050. It trains steady rhythm, carries, and focus all at once.",
      },
      {
        type: "paragraph",
        text: "You can't run all 100 here, so drill the seed on your 算盘: 1 + 2 + … + 10 = 55. Do that run in one breath and you have the heart of the full drill.",
      },
      {
        type: "quiz",
        prompt: "1 + 2 + 3 + 4 + 5 = ?",
        choices: [15, 14, 16, 12],
        answer: 15,
      },
      {
        type: "quiz",
        prompt: "1 + 2 + … + 10 = ?",
        choices: [55, 50, 60, 45],
        answer: 55,
      },
      {
        type: "quiz",
        prompt: "Your running total is 55 — add 11. Now what?",
        choices: [66, 65, 67, 56],
        answer: 66,
      },
    ],
    "multi-digit-add-sub": [
      { type: "heading", text: "Multi-digit 加减" },
      {
        type: "paragraph",
        text: "Move up to three 档 and add from the right, carrying and borrowing rod by rod. The 口诀 stay exactly the same — there are just more rods to visit.",
      },
      {
        type: "quiz",
        prompt: "126 + 345 = ?",
        choices: [471, 461, 481, 371],
        answer: 471,
      },
      {
        type: "quiz",
        prompt: "500 − 167 = ?",
        choices: [333, 343, 323, 433],
        answer: 333,
      },
      {
        type: "quiz",
        prompt: "268 + 179 = ?",
        choices: [447, 437, 457, 347],
        answer: 447,
      },
      {
        type: "build",
        prompt: "Show 126 + 345 = 471 on the abacus.",
        target: 471,
        rods: 3,
      },
    ],
    "listening-drills": [
      { type: "heading", text: "听算训练 — listening drills" },
      {
        type: "paragraph",
        text: "珠心算 classes drill 听算 (tīng suàn): the teacher reads numbers aloud at a steady beat and you compute on your board — and later in your head. It forces you to place each new number instantly.",
      },
      {
        type: "paragraph",
        text: "Practice with a friend reading a list like 34, 27, 18 at one number per second. Keep the running total; no rewinding allowed.",
      },
      {
        type: "quiz",
        prompt: "Listening warm-up: 34 + 27 = ?",
        choices: [61, 60, 62, 51],
        answer: 61,
      },
      {
        type: "quiz",
        prompt: "Your total was 61. Now add 18. What is it?",
        choices: [79, 78, 80, 69],
        answer: 79,
      },
      {
        type: "quiz",
        prompt: "A new list: 15 + 25 + 40 = ?",
        choices: [80, 70, 90, 85],
        answer: 80,
      },
    ],
    "multi-digit-check": [
      { type: "heading", text: "Level check — multi-digit and listening" },
      { type: "paragraph", text: "Three rods, steady rhythm. Solve every question." },
      {
        type: "quiz",
        prompt: "238 + 46 = ?",
        choices: [284, 274, 294, 384],
        answer: 284,
      },
      {
        type: "quiz",
        prompt: "312 − 138 = ?",
        choices: [174, 164, 184, 274],
        answer: 174,
      },
      {
        type: "build",
        prompt: "Show 238 + 46 = 284 on the abacus.",
        target: 284,
        rods: 3,
      },
      {
        type: "quiz",
        prompt: "The 打百子 seed grows: 1 + 2 + … + 7 = ?",
        choices: [28, 27, 29, 21],
        answer: 28,
      },
    ],
  },

  "multiplication": {
    "multiplication-table": [
      { type: "heading", text: "乘法 — the 九九 table" },
      {
        type: "paragraph",
        text: "乘法 (chéng fǎ) is fast repeated addition: 4 × 3 means 4 + 4 + 4. In 珠算, products come from the 九九乘法表 (jiǔ jiǔ chéng fǎ biǎo) — the 'nine-nine table' — a set of 口诀 like 三七二十一 (three-sevens twenty-one).",
      },
      {
        type: "paragraph",
        text: "The table's power is that you don't add four times over: you say 四六二十四 (four-six twenty-four) and the product is already there.",
      },
      {
        type: "quiz",
        prompt: "四七二十八 — 4 × 7 = ?",
        choices: [28, 24, 32, 21],
        answer: 28,
      },
      {
        type: "quiz",
        prompt: "6 × 8 = ?",
        choices: [48, 42, 56, 54],
        answer: 48,
      },
      {
        type: "quiz",
        prompt: "9 × 7 = ?",
        choices: [63, 72, 56, 54],
        answer: 63,
      },
      {
        type: "build",
        prompt: "Set the product 4 × 5 = 20 on the 算盘.",
        target: 20,
        rods: 2,
      },
    ],
    "multiply-on-board": [
      { type: "heading", text: "Multiply on the 算盘" },
      {
        type: "paragraph",
        text: "To multiply on the board you can push the multiplicand's beads, or set the product directly using the 口诀. The simplest path for a beginner: multiply the digits, then set the product on the correct 档.",
      },
      {
        type: "paragraph",
        text: "Keep the place straight: 5 × 8 = 40 is four tens, so it lives on the tens 档. Say the 口诀 — 五八四十 — and the beads arrange themselves.",
      },
      {
        type: "quiz",
        prompt: "五八四十 — 5 × 8 = ?",
        choices: [40, 45, 35, 32],
        answer: 40,
      },
      {
        type: "quiz",
        prompt: "6 × 6 = ?",
        choices: [36, 30, 42, 40],
        answer: 36,
      },
      {
        type: "quiz",
        prompt: "7 × 4 = ?",
        choices: [28, 24, 32, 21],
        answer: 28,
      },
      {
        type: "build",
        prompt: "Set 6 × 7 = 42 on the 算盘.",
        target: 42,
        rods: 2,
      },
    ],
    "multi-digit-multiply": [
      { type: "heading", text: "Two-digit 乘法" },
      {
        type: "paragraph",
        text: "Multiply a two-digit number one place at a time. For 12 × 3: the ones give 3 × 2 = 6, the tens give 3 × 1 = 3 tens, so the product is 36.",
      },
      {
        type: "paragraph",
        text: "Do it rod by rod on your 算盘: multiply the tens first, then the ones, and set each part on its 档.",
      },
      {
        type: "quiz",
        prompt: "12 × 3 = ?",
        choices: [36, 33, 39, 46],
        answer: 36,
      },
      {
        type: "quiz",
        prompt: "23 × 4 = ?",
        choices: [92, 82, 96, 72],
        answer: 92,
      },
      {
        type: "quiz",
        prompt: "14 × 2 = ?",
        choices: [28, 24, 34, 26],
        answer: 28,
      },
      {
        type: "build",
        prompt: "Set 15 × 3 = 45 on the 算盘.",
        target: 45,
        rods: 2,
      },
    ],
    "multiplication-check": [
      { type: "heading", text: "Level check — 乘法" },
      { type: "paragraph", text: "Say the 口诀, set the product, and finish the level." },
      {
        type: "quiz",
        prompt: "6 × 8 = ?",
        choices: [48, 42, 56, 40],
        answer: 48,
      },
      {
        type: "quiz",
        prompt: "9 × 7 = ?",
        choices: [63, 56, 72, 54],
        answer: 63,
      },
      {
        type: "build",
        prompt: "Set 13 × 3 = 39 on the 算盘.",
        target: 39,
        rods: 2,
      },
      {
        type: "quiz",
        prompt: "24 × 4 = ?",
        choices: [96, 86, 104, 94],
        answer: 96,
      },
    ],
  },

  "division": {
    "division-meaning": [
      { type: "heading", text: "除法 — division" },
      {
        type: "paragraph",
        text: "除法 (chú fǎ) shares a total into equal groups: 12 ÷ 3 asks how many groups of 3 fit in 12. It's the inverse of multiplication — 12 ÷ 3 = 4 because 3 × 4 = 12.",
      },
      {
        type: "paragraph",
        text: "珠算 division uses its own 口诀 family, like 二一添作五. Start by reading the division as 'how many times does the divisor fit?'",
      },
      {
        type: "quiz",
        prompt: "12 ÷ 3 = ?",
        choices: [4, 3, 6, 5],
        answer: 4,
      },
      {
        type: "quiz",
        prompt: "20 ÷ 5 = ?",
        choices: [4, 5, 3, 6],
        answer: 4,
      },
      {
        type: "quiz",
        prompt: "24 ÷ 8 = ?",
        choices: [3, 4, 6, 2],
        answer: 3,
      },
      {
        type: "build",
        prompt: "Set the quotient of 12 ÷ 4 on the 算盘.",
        target: 3,
        rods: 1,
      },
    ],
    "divide-on-board": [
      { type: "heading", text: "Divide on the 算盘" },
      {
        type: "paragraph",
        text: "To divide, ask 'how many times does the divisor go in?', set that quotient, and check it against the dividend. For 42 ÷ 7: 7 fits 6 times, so the quotient is 6.",
      },
      {
        type: "paragraph",
        text: "With the 口诀 you can say the answer before the beads move — 六八四十八 tells you 48 ÷ 8 = 6 instantly.",
      },
      {
        type: "quiz",
        prompt: "45 ÷ 9 = ?",
        choices: [5, 6, 4, 9],
        answer: 5,
      },
      {
        type: "quiz",
        prompt: "36 ÷ 6 = ?",
        choices: [6, 5, 7, 4],
        answer: 6,
      },
      {
        type: "quiz",
        prompt: "56 ÷ 8 = ?",
        choices: [7, 6, 8, 9],
        answer: 7,
      },
      {
        type: "build",
        prompt: "Set the quotient of 42 ÷ 7 on the 算盘.",
        target: 6,
        rods: 1,
      },
    ],
    "remainders": [
      { type: "heading", text: "Leftovers — remainders" },
      {
        type: "paragraph",
        text: "Division doesn't always come out even. 13 ÷ 5 gives 2 with 3 left over — the leftover is the remainder. On the 算盘 you set the 2 and 'read off' the 3 that couldn't be shared.",
      },
      {
        type: "quiz",
        prompt: "19 ÷ 4 — what is the remainder?",
        choices: [3, 4, 2, 5],
        answer: 3,
      },
      {
        type: "quiz",
        prompt: "17 ÷ 5 — what is the remainder?",
        choices: [2, 3, 1, 4],
        answer: 2,
      },
      {
        type: "quiz",
        prompt: "22 ÷ 6 — what is the remainder?",
        choices: [4, 2, 3, 5],
        answer: 4,
      },
      {
        type: "build",
        prompt: "Set the quotient of 13 ÷ 5 (quotient 2) on the 算盘.",
        target: 2,
        rods: 1,
      },
    ],
    "division-check": [
      { type: "heading", text: "Level check — 除法" },
      { type: "paragraph", text: "Divide, spot the remainder, and finish the level." },
      {
        type: "quiz",
        prompt: "42 ÷ 7 = ?",
        choices: [6, 7, 5, 8],
        answer: 6,
      },
      {
        type: "quiz",
        prompt: "81 ÷ 9 = ?",
        choices: [9, 8, 7, 6],
        answer: 9,
      },
      {
        type: "build",
        prompt: "Set the quotient of 64 ÷ 8 on the 算盘.",
        target: 8,
        rods: 1,
      },
      {
        type: "quiz",
        prompt: "26 ÷ 8 — what is the remainder?",
        choices: [2, 3, 4, 1],
        answer: 2,
      },
    ],
  },

  "square-roots": {
    "square-root-meaning": [
      { type: "heading", text: "开方 — square roots" },
      {
        type: "paragraph",
        text: "Finding a square root (开方, kāi fāng) undoes squaring: 9's root is 3 because 3 × 3 = 9. The symbol is √, and the number under it is the perfect square.",
      },
      {
        type: "paragraph",
        text: "Think of it as asking 'what number, times itself, makes this?' — 开方 is the reverse of 乘法 for equal factors.",
      },
      {
        type: "quiz",
        prompt: "√9 = ?",
        choices: [3, 2, 6, 4],
        answer: 3,
      },
      {
        type: "quiz",
        prompt: "√16 = ?",
        choices: [4, 8, 2, 5],
        answer: 4,
      },
      {
        type: "quiz",
        prompt: "√25 = ?",
        choices: [5, 10, 4, 6],
        answer: 5,
      },
      {
        type: "build",
        prompt: "Set √9 = 3 on the 算盘.",
        target: 3,
        rods: 1,
      },
    ],
    "perfect-squares": [
      { type: "heading", text: "Perfect squares" },
      {
        type: "paragraph",
        text: "The squares under 100 are worth memorising: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. Learn them two ways — the square, and the root that built it.",
      },
      {
        type: "paragraph",
        text: "珠算 students train these until √ is just another 口诀: 六六三十六 and 八八六十四 tell you the roots instantly.",
      },
      {
        type: "quiz",
        prompt: "√36 = ?",
        choices: [6, 7, 9, 5],
        answer: 6,
      },
      {
        type: "quiz",
        prompt: "√64 = ?",
        choices: [8, 6, 9, 7],
        answer: 8,
      },
      {
        type: "quiz",
        prompt: "√100 = ?",
        choices: [10, 20, 50, 9],
        answer: 10,
      },
      {
        type: "build",
        prompt: "Set √49 = 7 on the 算盘.",
        target: 7,
        rods: 1,
      },
    ],
    "estimate-roots": [
      { type: "heading", text: "Between two roots" },
      {
        type: "paragraph",
        text: "Not every root is a whole number. √50 isn't perfect — but 49's root is 7 and 64's root is 8, so √50 lives between 7 and 8, closer to 7.",
      },
      {
        type: "paragraph",
        text: "Find the two perfect squares the number sits between, take their roots, and you've boxed the answer.",
      },
      {
        type: "quiz",
        prompt: "√50 is between 49 and 64. Which whole number is it closer to?",
        choices: [7, 8, 6, 9],
        answer: 7,
      },
      {
        type: "quiz",
        prompt: "√30 is between 25 and 36. Which whole number is it closer to?",
        choices: [5, 6, 4, 7],
        answer: 5,
      },
      {
        type: "quiz",
        prompt: "√90 is between 81 and 100. Which whole number is it closer to?",
        choices: [9, 10, 8, 11],
        answer: 9,
      },
      {
        type: "build",
        prompt: "Set √81 = 9 on the 算盘.",
        target: 9,
        rods: 1,
      },
    ],
    "square-root-check": [
      { type: "heading", text: "Level check — 开方" },
      { type: "paragraph", text: "Read the root, set it on the 算盘, and finish the level." },
      {
        type: "quiz",
        prompt: "√49 = ?",
        choices: [7, 6, 8, 9],
        answer: 7,
      },
      {
        type: "quiz",
        prompt: "√81 = ?",
        choices: [9, 8, 7, 10],
        answer: 9,
      },
      {
        type: "build",
        prompt: "Set √100 = 10 on the 算盘.",
        target: 10,
        rods: 2,
      },
      {
        type: "quiz",
        prompt: "√121 = ?",
        choices: [11, 12, 10, 9],
        answer: 11,
      },
    ],
  },

  "mental-beadwork": {
    "imagined-abacus": [
      { type: "heading", text: "Picture your 算盘" },
      {
        type: "paragraph",
        text: "Now for the payoff: you keep the five-bead board in your mind, and the 口诀 become silent instructions. Start by setting a number on the real board, closing your eyes, and 'seeing' it clearly.",
      },
      {
        type: "paragraph",
        text: "Move methodically — 上珠, 下珠, rod by rod, beam in the middle. The clearer your picture, the faster your mental moves will be.",
      },
      {
        type: "read",
        prompt: "Read this rod on your way to picturing it.",
        digits: [6],
        choices: [6, 5, 4, 7],
      },
      {
        type: "read",
        prompt: "Now read a board you should be able to hold with your eyes closed.",
        digits: [5, 1],
        choices: [15, 51, 11, 10],
      },
      {
        type: "build",
        prompt: "Set 46, then close your eyes, clear it in your mind, and rebuild it.",
        target: 46,
        rods: 2,
      },
    ],
    "kan-xinsuan": [
      { type: "heading", text: "看心算 — visual mental math" },
      {
        type: "paragraph",
        text: "看心算 (kàn xīn suàn) is mental calculation from written numbers: you read the expression, then run it bead by bead on your inner 算盘.",
      },
      {
        type: "paragraph",
        text: "Say each move silently as you go — 二上二, 四下五去一 — and let your mental picture do the arithmetic.",
      },
      {
        type: "quiz",
        prompt: "看心算: 23 + 45 = ?",
        choices: [68, 78, 67, 58],
        answer: 68,
      },
      {
        type: "quiz",
        prompt: "看心算: 68 − 29 = ?",
        choices: [39, 49, 38, 40],
        answer: 39,
      },
      {
        type: "quiz",
        prompt: "看心算: 46 + 18 = ?",
        choices: [64, 54, 74, 63],
        answer: 64,
      },
    ],
    "ting-xinsuan": [
      { type: "heading", text: "听心算 — listening mental math" },
      {
        type: "paragraph",
        text: "听心算 (tīng xīn suàn) removes the written number entirely. A number is spoken, you place it on your mental board, and the next number is already on its way.",
      },
      {
        type: "paragraph",
        text: "Start slow — one number every few seconds. If you lose the picture, shrink the numbers, not the practice.",
      },
      {
        type: "quiz",
        prompt: "听心算: you hear 30, then add 25. What do you see?",
        choices: [55, 45, 65, 54],
        answer: 55,
      },
      {
        type: "quiz",
        prompt: "听心算: your board shows 55; subtract 17.",
        choices: [38, 37, 39, 48],
        answer: 38,
      },
      {
        type: "quiz",
        prompt: "听心算: from 38, add 24.",
        choices: [62, 52, 72, 61],
        answer: 62,
      },
    ],
    "flash-mental": [
      { type: "heading", text: "闪电算入门 — flash anzan" },
      {
        type: "paragraph",
        text: "闪电算 (shǎn diàn suàn) is flash mental math: numbers shown or spoken almost instantly, one after another, added to a single running total. 珠心算 champions handle ten or more this way.",
      },
      {
        type: "paragraph",
        text: "Build up with flashcards or a friend: three numbers at one per second, then five, then speed up. Hold only the running total — each new number lands and vanishes.",
      },
      {
        type: "quiz",
        prompt: "Flash set: 12, 15, 8. Total?",
        choices: [35, 33, 36, 45],
        answer: 35,
      },
      {
        type: "quiz",
        prompt: "Flash set: 40, 22, 33. Total?",
        choices: [95, 85, 92, 96],
        answer: 95,
      },
      {
        type: "quiz",
        prompt: "Flash set: 25, 25, 25, 25. Total?",
        choices: [100, 90, 110, 99],
        answer: 100,
      },
    ],
    "grading-challenge": [
      { type: "heading", text: "定级 — your grading challenge" },
      {
        type: "paragraph",
        text: "In China, 珠心算 students take graded tests from 十级 (grade 10) up to 一级 and beyond. This is your first taste: a mixed set that uses every 口诀 you've learned.",
      },
      {
        type: "quiz",
        prompt: "直减: 8 − 5 = ?",
        choices: [3, 4, 2, 5],
        answer: 3,
      },
      {
        type: "quiz",
        prompt: "满五加: 4 + 4 = ?",
        choices: [8, 7, 9, 6],
        answer: 8,
      },
      {
        type: "quiz",
        prompt: "进位加: 17 + 9 = ?",
        choices: [26, 25, 27, 24],
        answer: 26,
      },
      {
        type: "quiz",
        prompt: "听心算: 60 − 13 = ?",
        choices: [47, 46, 48, 57],
        answer: 47,
      },
      {
        type: "build",
        prompt: "Show 17 + 9 = 26 on the abacus to finish.",
        target: 26,
        rods: 2,
      },
    ],
  },
};
