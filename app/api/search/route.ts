import { searchContent } from "@/modules/course/search";

/** How many hits a request may ask for, and how many it gets by default. */
const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 20;

/**
 * Search across the whole curriculum.
 *
 * The index is static content held in memory, so this answers in well under a
 * millisecond — the search box calls it as the learner types, and only the
 * matching rows travel back over the wire.
 *
 * `GET /api/search?q=beads&limit=8`
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = params.get("q") ?? "";

  const asked = Number(params.get("limit"));
  const limit =
    Number.isFinite(asked) && asked >= 1 ? Math.min(Math.floor(asked), MAX_LIMIT) : DEFAULT_LIMIT;

  const results = searchContent(query, { limit });

  return Response.json(
    { query, results },
    // The corpus only changes when the app is rebuilt, so a repeat of the same
    // query — backspacing, retyping — can be served without touching the app.
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=600" } },
  );
}
