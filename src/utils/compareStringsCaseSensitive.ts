import { compareComparableValues } from './compareComparableValues';
import { Comparison } from './Comparison';

/**
 * Compare two strings using a case-sensitive ordinal comparison.
 *
 * Ordinal comparisons are based on the difference between the unicode code points of both
 * strings. Characters with multiple unicode representations are considered unequal. Ordinal
 * comparisons provide predictable ordering, but place "a" after "B".
 *
 * Case-sensitive comparisons compare both strings one code-point at a time using the integer
 * value of each code-point.
 */
export function compareStringsCaseSensitive(
  a: string | undefined,
  b: string | undefined
): Comparison {
  return compareComparableValues(a, b);
}
