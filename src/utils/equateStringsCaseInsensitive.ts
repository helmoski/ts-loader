/**
 * Compare the equality of two strings using a case-sensitive ordinal comparison.
 *
 * Case-sensitive comparisons compare both strings one code-point at a time using the integer
 * value of each code-point after applying `toUpperCase` to each string. We always map both
 * strings to their upper-case form as some unicode characters do not properly round-trip to
 * lowercase (such as `ẞ` (German sharp capital s)).
 */
export function equateStringsCaseInsensitive(a: string, b: string) {
  return (
    a === b ||
    (a !== undefined && b !== undefined && a.toUpperCase() === b.toUpperCase())
  );
}
