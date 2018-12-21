import { equateValues } from './equateValues';

export type EqualityComparer<T> = (a: T, b: T) => boolean;

export function contains<T>(
  array: ReadonlyArray<T> | undefined,
  value: T,
  equalityComparer: EqualityComparer<T> = equateValues
): boolean {
  if (array) {
    for (const v of array) {
      if (equalityComparer(v, value)) {
        return true;
      }
    }
  }
  return false;
}
