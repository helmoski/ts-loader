import { Comparison } from './Comparison';

/* @internal */
export type Comparer<T> = (a: T, b: T) => Comparison;

/**
 * Returns a new sorted array.
 */
export function sort<T>(
  array: ReadonlyArray<T>,
  comparer?: Comparer<T>
): ReadonlyArray<T> {
  return (array.length === 0
    ? array
    : array.slice().sort(comparer)) as ReadonlyArray<T>;
}
