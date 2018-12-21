import { equateValues } from './equateValues';

/**
 * Compare the equality of two strings using a case-sensitive ordinal comparison.
 *
 * Case-sensitive comparisons compare both strings one code-point at a time using the
 * integer value of each code-point.
 */
export function equateStringsCaseSensitive(a: string, b: string) {
  return equateValues(a, b);
}
