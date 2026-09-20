"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { MIN_QUERY_LENGTH, tokenize } from "@/modules/course/search-query";
import type { SearchHit, SearchKind } from "@/modules/course/types";

/** How many rows the dropdown asks the server for. */
const RESULT_LIMIT = 8;
/**
 * How long typing has to pause before a query goes out. Long enough that a
 * word typed at speed is one request rather than one per letter, short enough
 * that the dropdown still feels like it is keeping up.
 */
const DEBOUNCE_MS = 180;

const KIND_LABEL: Record<SearchKind, string> = {
  course: "Course",
  level: "Level",
  lesson: "Lesson",
  step: "Step",
};

type Progress = "idle" | "searching" | "ready" | "failed";

/**
 * Ask the server what the curriculum has to say. The request is async and the
 * caller aborts it when the learner types on, so a slow answer can never land
 * on top of a newer query.
 */
async function requestHits(query: string, signal: AbortSignal): Promise<SearchHit[]> {
  const response = await fetch(
    `/api/search?q=${encodeURIComponent(query)}&limit=${RESULT_LIMIT}`,
    { signal },
  );
  if (!response.ok) throw new Error(`search failed (${response.status})`);

  const payload: unknown = await response.json();
  return typeof payload === "object" &&
    payload !== null &&
    Array.isArray((payload as { results: unknown }).results)
    ? (payload as { results: SearchHit[] }).results
    : [];
}

/**
 * Where a row lives, as its parts — a course, then a level, then a lesson. A
 * row is named after the thing itself; the trail is what holds it.
 */
function parentParts(hit: SearchHit): string[] {
  if (hit.kind === "course") return [];
  if (hit.kind === "level") return [hit.courseTitle];
  if (hit.kind === "lesson") return [hit.courseTitle, hit.levelName];
  return [hit.courseTitle, hit.levelName, hit.lessonTitle];
}

/**
 * What a row is called when it is read aloud. The row's own markup is a title, a
 * badge and two lines of prose, which a screen reader would otherwise run
 * together into one word soup ("Imagine theBeadsLesson …").
 */
function optionLabel(hit: SearchHit): string {
  const trail = parentParts(hit);
  return `${hit.title} — ${KIND_LABEL[hit.kind]}${trail.length > 0 ? ` in ${trail.join(", ")}` : ""}`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** The matched words, marked inside the line they were found in. */
function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  const parts = useMemo(() => {
    if (tokens.length === 0) return [text];
    return text.split(new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi"));
  }, [text, tokens]);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark
            key={index}
            className="rounded-sm bg-amber-200/70 px-0.5 text-foreground dark:bg-amber-400/30"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

export interface SearchBoxProps {
  /** Accessible name for the field. */
  label?: string;
  placeholder?: string;
  className?: string;
  /** Called on every keystroke, so a page can filter its own content alongside. */
  onQueryChange?: (query: string) => void;
  /** Called instead of navigating — used by tests and by callers with their own routing. */
  onSelect?: (hit: SearchHit) => void;
}

/**
 * The search field: type, and a dropdown of everything in the curriculum that
 * matches — courses, levels, lessons, and the individual steps of a lesson.
 * Picking a row opens it, which for a step means the step's own URL.
 *
 * Results come from the server as they are typed, debounced and aborted as the
 * query moves on, so the field stays responsive while the search runs.
 */
export function SearchBox({
  label = "Search lessons and steps",
  placeholder = "What do you want to learn?",
  className,
  onQueryChange,
  onSelect,
}: SearchBoxProps) {
  const router = useRouter();
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [progress, setProgress] = useState<Progress>("idle");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const trimmed = query.trim();
  const tokens = useMemo(() => tokenize(trimmed), [trimmed]);
  const searchable = trimmed.length >= MIN_QUERY_LENGTH;
  // Nothing worth searching for means nothing to show: whatever the last query
  // answered is set aside until the query means something again.
  const rows = searchable ? hits : [];
  const status = searchable ? progress : "idle";
  const showing = open && searchable;
  const activeIndex = active >= 0 && active < rows.length ? active : -1;

  // One request per settled query: the timer waits for the typing to stop, and
  // the abort cancels whatever the previous query still had in flight, so a slow
  // answer can never land on top of a newer one.
  useEffect(() => {
    const next = query.trim();
    if (next.length < MIN_QUERY_LENGTH) return;

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setProgress("searching");
      requestHits(next, controller.signal)
        .then((results) => {
          if (controller.signal.aborted) return;
          setHits(results);
          setActive(-1);
          setProgress("ready");
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setHits([]);
          setActive(-1);
          setProgress("failed");
        });
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // A click anywhere else puts the dropdown away.
  useEffect(() => {
    if (!showing) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [showing]);

  const choose = (hit: SearchHit) => {
    setOpen(false);
    setActive(-1);
    if (onSelect) onSelect(hit);
    else router.push(hit.href);
  };

  const handleChange = (value: string) => {
    setQuery(value);
    setOpen(true);
    onQueryChange?.(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!searchable) return;
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (rows.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((current) => {
        if (current < 0 || current >= rows.length) return step === 1 ? 0 : rows.length - 1;
        return (current + step + rows.length) % rows.length;
      });
      return;
    }

    if (event.key === "Enter" && showing && activeIndex >= 0) {
      event.preventDefault();
      choose(rows[activeIndex]);
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const hit = rows[activeIndex >= 0 ? activeIndex : 0];
    if (hit) choose(hit);
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div ref={containerRef} className="relative w-full">
        <div className="flex w-full items-center gap-2 rounded-full border-2 border-border bg-card py-1 pl-4 pr-1 transition-colors focus-within:border-ring hover:border-ring">
          <Search aria-hidden className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            role="combobox"
            aria-label={label}
            aria-expanded={showing}
            aria-controls={showing ? listId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={
              showing && activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            value={query}
            onChange={(event) => handleChange(event.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none"
          />
          {status === "searching" ? (
            <LoaderCircle
              aria-hidden
              className="size-4 shrink-0 animate-spin text-muted-foreground"
            />
          ) : null}
          <button
            type="submit"
            className="shrink-0 rounded-full bg-muted px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Ask
          </button>
        </div>

        {showing ? (
          // As wide as the field on a phone, and wider than it above that: a
          // row is a title, a trail and a line of prose, and the field is only
          // as wide as the placeholder.
          <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-border bg-card shadow-xl sm:left-auto sm:right-0 sm:w-[26rem] sm:max-w-[calc(100vw-3rem)]">
            {rows.length > 0 ? (
              <>
                <ul
                  id={listId}
                  role="listbox"
                  aria-label="Search results"
                  className="max-h-96 overflow-y-auto p-1.5"
                >
                  {rows.map((hit, index) => {
                    const trail = parentParts(hit).join(" › ");
                    return (
                      <li
                        key={`${hit.href}-${index}`}
                        id={`${listId}-option-${index}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        aria-label={optionLabel(hit)}
                        onMouseEnter={() => setActive(index)}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => choose(hit)}
                        className={cn(
                          "cursor-pointer rounded-xl px-3 py-2.5 transition-colors",
                          index === activeIndex && "bg-muted",
                        )}
                      >
                        <div className="flex items-baseline gap-2">
                          <span className="min-w-0 truncate text-sm font-semibold">
                            <Highlight text={hit.title} tokens={tokens} />
                          </span>
                          <span className="ml-auto shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                            {KIND_LABEL[hit.kind]}
                          </span>
                        </div>
                        {trail ? (
                          <p className="truncate text-xs text-muted-foreground">{trail}</p>
                        ) : null}
                        <p className="line-clamp-2 text-xs text-muted-foreground/90">
                          <Highlight text={hit.snippet} tokens={tokens} />
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <p className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
                  ↑↓ to choose · Enter to open · Esc to close
                </p>
              </>
            ) : (
              // Announced as it changes: searching, nothing found, or the
              // search itself being unavailable.
              <p role="status" className="px-4 py-3 text-sm text-muted-foreground">
                {status === "searching"
                  ? "Searching…"
                  : status === "failed"
                    ? "Search is not available right now. Try again in a moment."
                    : `No matches for “${trimmed}”.`}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </form>
  );
}

export default SearchBox;
