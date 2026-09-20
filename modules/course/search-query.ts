/**
 * The vocabulary the search box and the search itself share.
 *
 * Both sides of the request keep their copy of these few lines so the browser
 * never has to load the curriculum to agree with the server on what a query is:
 * the box waits for the same minimum, and highlights the same words the server
 * went looking for.
 */

/** The shortest query worth searching for — one letter matches everything. */
export const MIN_QUERY_LENGTH = 2;

/** How many words of a query are looked at; beyond this, queries get too narrow to help. */
export const MAX_QUERY_TOKENS = 6;

/**
 * Words that carry no meaning on their own. Dropping them is what makes "what
 * is a bridge" rank the lesson called *What Is a Bridge?* above every other
 * page that happens to say "a bridge" — the search keeps the words that say
 * what the learner is actually after.
 */
const STOP_WORDS = new Set([
  "a", "about", "an", "and", "are", "as", "at", "be", "been", "but", "by", "can", "did", "do",
  "does", "for", "from", "had", "has", "have", "how", "i", "if", "in", "into", "is", "it", "its",
  "me", "my", "no", "not", "of", "on", "or", "so", "that", "the", "their", "them", "then",
  "there", "these", "they", "this", "to", "up", "was", "we", "were", "what", "when", "where",
  "which", "who", "why", "will", "with", "you", "your",
]);

/** Words a query is made of: lowercase, split on anything that is not a word. */
export function tokenize(query: string): string[] {
  const words = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 0);

  const unique = [...new Set(words)];
  // A query of nothing but filler ("the", "is") still searches for those words,
  // since dropping them all would leave nothing to look for.
  const meaningful = unique.filter((token) => !STOP_WORDS.has(token));

  return (meaningful.length > 0 ? meaningful : unique).slice(0, MAX_QUERY_TOKENS);
}
