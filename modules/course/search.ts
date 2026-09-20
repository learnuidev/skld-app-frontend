import { availableCourses } from "./catalog";
import { getLessonView } from "./lesson-view";
import { MIN_QUERY_LENGTH, tokenize } from "./search-query";
import { lessonStepUrl, lessonUrl } from "./utils";
import type { LessonBlock, LessonExplanation, SearchHit, SearchKind } from "./types";

/**
 * Everything a learner can be sent to, in one list, so the search box can look
 * through the whole curriculum instead of just the course titles.
 *
 * The index is built from the same catalog and content the pages play, so a hit
 * is always a page that exists: a course, a level, a lesson, or one step of a
 * lesson. Steps are indexed by their own words — headings, paragraphs, prompts,
 * the explanations behind the "Why?" button — and each hit carries the URL that
 * opens exactly that.
 */

export type { SearchHit, SearchKind };
export { MIN_QUERY_LENGTH, tokenize };
/** An index entry: a hit before it is scored, with its text ready to search. */
interface SearchEntry extends Omit<SearchHit, "score" | "snippet"> {
  titleKey: string;
  textKey: string;
  /** The prose as authored, kept whole so a snippet can center on the match. */
  text: string;
}

/** The prose of a lesson block, across both course families. */
export function blockText(block: LessonBlock): string {
  switch (block.type) {
    case "heading":
      return block.text;
    case "paragraph":
      return [block.text, ...(block.demo?.captions ?? [])].join(" ");
    case "list":
      return block.items.join(" ");
    case "explore":
      return block.label;
    case "figure":
      return [block.caption ?? "", block.scene].join(" ");
    case "parts":
      return [block.prompt, block.hint ?? ""].join(" ");
    case "span":
      return block.prompt;
    case "concepts":
      return [block.prompt, ...block.concepts.map((c) => `${c.label} ${c.summary}`)].join(" ");
    case "build":
    case "read":
    case "quiz":
    case "hotspot":
    case "choose":
      return [block.prompt, explanationText(block.explanation)].join(" ");
    case "sort":
      return [
        block.prompt,
        ...block.buckets.map((bucket) => bucket.label),
        ...block.items.map((item) => item.label),
        explanationText(block.explanation),
      ].join(" ");
    case "order":
      return [block.prompt, ...block.items.map((item) => item.label), explanationText(block.explanation)].join(" ");
    case "assemble":
      return [block.prompt, ...block.slots.map((slot) => slot.label), explanationText(block.explanation)].join(" ");
  }
}

/** The teaching behind a question — indexed too, since it is where the words are. */
function explanationText(explanation?: LessonExplanation): string {
  if (!explanation) return "";
  const parts: string[] = [];
  if (explanation.text) parts.push(explanation.text);
  for (const step of explanation.steps ?? []) parts.push(step.text);
  return parts.join(" ");
}

/** How long a step's own title may run before it is cut at a word. */
const TITLE_LIMIT = 64;

/**
 * A step's title: a heading names itself, and anything else is named by its
 * opening sentence, so every row in the dropdown reads as a line of the lesson.
 */
function stepTitle(block: LessonBlock, text: string): string {
  if (block.type === "heading") return block.text;
  const clean = text.replace(/\s+/g, " ").trim();
  const sentence = clean.match(/^.{20,64}?[.?!](?=\s|$)/);
  if (sentence) return sentence[0];
  if (clean.length <= TITLE_LIMIT) return clean;
  const cut = clean.slice(0, TITLE_LIMIT);
  const space = cut.lastIndexOf(" ");
  return `${(space > TITLE_LIMIT / 2 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

function entry(hit: Omit<SearchHit, "score">): SearchEntry {
  const { snippet, ...rest } = hit;
  const text = snippet.replace(/\s+/g, " ").trim();
  return { ...rest, text, titleKey: hit.title.toLowerCase(), textKey: text.toLowerCase() };
}

/**
 * Every hit the curriculum has to offer, in catalog order. Built once per
 * process: the content is static, so a later query is a scan of this list.
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const course of availableCourses) {
    const common = { courseTitle: course.title };

    entries.push(
      entry({
        ...common,
        kind: "course",
        title: course.title,
        snippet: [course.tagline, course.description, course.introText, course.conceptsInclude.join(" ")].join(" "),
        href: `/courses/${course.slug}`,
        levelName: "",
        lessonTitle: "",
      }),
    );

    for (const level of course.levels) {
      entries.push(
        entry({
          ...common,
          kind: "level",
          title: level.name,
          snippet: level.description,
          href: `/courses/${course.slug}/${level.slug}`,
          levelName: level.name,
          lessonTitle: "",
        }),
      );

      for (const lesson of level.lessons) {
        entries.push(
          entry({
            ...common,
            kind: "lesson",
            title: lesson.title,
            snippet: lesson.blurb,
            href: lessonUrl(course, level.slug, lesson.slug),
            levelName: level.name,
            lessonTitle: lesson.title,
          }),
        );

        // Resolved the same way the lesson page resolves it, so a lesson that
        // falls back to its two generic steps is searchable through those.
        for (const block of getLessonView(course.slug, level.slug, lesson.slug)?.blocks ?? []) {
          const text = blockText(block).replace(/\s+/g, " ").trim();
          if (text.length === 0) continue;
          entries.push(
            entry({
              ...common,
              kind: "step",
              title: stepTitle(block, text),
              snippet: text,
              href: lessonStepUrl(course, level.slug, lesson.slug, block.id),
              levelName: level.name,
              lessonTitle: lesson.title,
            }),
          );
        }
      }
    }
  }

  return entries;
}

let index: SearchEntry[] | null = null;

/** The index, built on first use and kept for the life of the process. */
export function getSearchIndex(): SearchEntry[] {
  index ??= buildSearchIndex();
  return index;
}

/**
 * How well one token fits one entry. Matches in the title count for far more
 * than matches in the prose, and a match at a word's start counts for more than
 * one in the middle of a word, so "bead" prefers "Beads worth 5" over "beaded".
 */
const SCORE = {
  titleExact: 40,
  titlePrefix: 18,
  titleWord: 12,
  titlePart: 7,
  textWord: 5,
  textPart: 2,
  /** The query as typed, word for word — this is what the learner meant. */
  titlePhrase: 25,
  textPhrase: 6,
} as const;

function startsAWord(key: string, at: number): boolean {
  return at === 0 || !/[a-z0-9]/.test(key[at - 1]);
}

/**
 * Where a token sits in a key, preferring the first place it stands as a whole
 * word: "bead" should find "Beads worth 5" before "abeaded", whichever comes
 * first in the text.
 */
function locate(key: string, token: string): { at: number; word: boolean } | null {
  const first = key.indexOf(token);
  if (first < 0) return null;
  if (startsAWord(key, first)) return { at: first, word: true };

  for (let at = key.indexOf(token, first + 1); at >= 0; at = key.indexOf(token, at + 1)) {
    if (startsAWord(key, at)) return { at, word: true };
  }
  return { at: first, word: false };
}

function tokenScore(entry: SearchEntry, token: string): number {
  const inTitle = locate(entry.titleKey, token);
  if (inTitle) {
    if (inTitle.at === 0 && entry.titleKey.length === token.length) return SCORE.titleExact;
    if (inTitle.at === 0) return SCORE.titlePrefix;
    return inTitle.word ? SCORE.titleWord : SCORE.titlePart;
  }

  const inText = locate(entry.textKey, token);
  if (!inText) return 0;
  return inText.word ? SCORE.textWord : SCORE.textPart;
}

/** Ties go to the thing a learner can act on: a lesson, then a step. */
const KIND_ORDER: Record<SearchKind, number> = { lesson: 0, step: 1, level: 2, course: 3 };

/** The most a snippet may run, in characters. */
const SNIPPET_LIMIT = 160;

/**
 * One line of the text around the match, so the row shows the words that put it
 * there rather than the start of a paragraph the learner never searched for.
 */
export function makeSnippet(text: string, tokens: string[]): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= SNIPPET_LIMIT) return clean;

  const key = clean.toLowerCase();
  let match = -1;
  for (const token of tokens) {
    const at = key.indexOf(token);
    if (at >= 0 && (match < 0 || at < match)) match = at;
  }

  let start = match < 0 ? 0 : Math.max(0, match - 48);
  if (start > 0) {
    const space = clean.indexOf(" ", start);
    if (space >= 0 && space < start + 24) start = space + 1;
  }
  const end = Math.min(clean.length, start + SNIPPET_LIMIT);
  return `${start > 0 ? "…" : ""}${clean.slice(start, end).trim()}${end < clean.length ? "…" : ""}`;
}

export interface SearchOptions {
  /** How many hits to return; the dropdown shows a handful. */
  limit?: number;
}

/**
 * What the curriculum has to say about a query, best first. Every word of the
 * query has to appear somewhere in an entry, so more words mean fewer, more
 * precise hits rather than more.
 */
export function searchContent(query: string, options: SearchOptions = {}): SearchHit[] {
  const trimmed = query.trim();
  if (trimmed.length < MIN_QUERY_LENGTH) return [];

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return [];

  // The query as typed, for the rows that carry it word for word. The filler
  // words dropped from the tokens still count here: "what is a bridge" is a
  // better reason to show *What Is a Bridge?* than the single word "bridge".
  const phrase = trimmed.toLowerCase().replace(/\s+/g, " ");

  const limit = Math.max(0, options.limit ?? 8);
  const scored: SearchHit[] = [];

  for (const item of getSearchIndex()) {
    let score = 0;
    for (const token of tokens) {
      const fit = tokenScore(item, token);
      if (fit === 0) {
        score = 0;
        break;
      }
      score += fit;
    }
    if (score === 0) continue;

    if (item.titleKey.includes(phrase)) score += SCORE.titlePhrase;
    else if (item.textKey.includes(phrase)) score += SCORE.textPhrase;

    scored.push({
      kind: item.kind,
      title: item.title,
      snippet: makeSnippet(item.text, tokens),
      href: item.href,
      courseTitle: item.courseTitle,
      levelName: item.levelName,
      lessonTitle: item.lessonTitle,
      score,
    });
  }

  scored.sort(
    (a, b) =>
      b.score - a.score ||
      KIND_ORDER[a.kind] - KIND_ORDER[b.kind] ||
      a.title.localeCompare(b.title) ||
      a.href.localeCompare(b.href),
  );

  // A lesson and one of its steps can be named the same thing — "What Is a
  // Bridge?" is both. Keep the better-ranked row of the two.
  const seen = new Set<string>();
  const hits: SearchHit[] = [];
  for (const hit of scored) {
    if (hits.length >= limit) break;
    const key = [hit.title.toLowerCase(), hit.courseTitle, hit.levelName, hit.lessonTitle].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    hits.push(hit);
  }

  return hits;
}
