function storageKey(slug: string) {
  return `peony.course-progress.${slug}`;
}

export function readProgress(slug: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function writeProgress(slug: string, completed: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(slug), JSON.stringify(completed));
  } catch {
    // ignore quota / private-mode errors
  }
}

export function clearProgress(slug: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey(slug));
  } catch {
    // ignore
  }
}
