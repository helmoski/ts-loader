import { Comparison } from './Comparison';

export function compareComparableValues(
  a: string | undefined,
  b: string | undefined
): Comparison;
export function compareComparableValues(
  a: number | undefined,
  b: number | undefined
): Comparison;
export function compareComparableValues(
  a: string | number | undefined,
  b: string | number | undefined
) {
  return a === b
    ? Comparison.EqualTo
    : a === undefined
    ? Comparison.LessThan
    : b === undefined
    ? Comparison.GreaterThan
    : a < b
    ? Comparison.LessThan
    : Comparison.GreaterThan;
}
