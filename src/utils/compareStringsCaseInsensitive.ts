import { Comparison } from './Comparison';

/**
 * Compare two strings using a case-insensitive ordinal comparison.
 *
 * Ordinal comparisons are based on the difference between the unicode code points of both
 * strings. Characters with multiple unicode representations are considered unequal. Ordinal
 * comparisons provide predictable ordering, but place "a" after "B".
 *
 * Case-insensitive comparisons compare both strings one code-point at a time using the integer
 * value of each code-point after applying `toUpperCase` to each string. We always map both
 * strings to their upper-case form as some unicode characters do not properly round-trip to
 * lowercase (such as `áºž` (German sharp capital s)).
 */
export function compareStringsCaseInsensitive(a: string, b: string) {
  if (a === b) {
    return Comparison.EqualTo;
  }
  if (a === undefined) {
    return Comparison.LessThan;
  }
  if (b === undefined) {
    return Comparison.GreaterThan;
  }
  a = a.toUpperCase();
  b = b.toUpperCase();
  return a < b
    ? Comparison.LessThan
    : a > b
    ? Comparison.GreaterThan
    : Comparison.EqualTo;
}
