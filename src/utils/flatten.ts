import { addRange } from './addRange';
import { isArray } from './isArray';

/**
 * Flattens an array containing a mix of array or non-array elements.
 *
 * @param array The array to flatten.
 */
export function flatten<T>(
  array: ReadonlyArray<T | ReadonlyArray<T> | undefined>
): T[];
export function flatten<T>(
  array: ReadonlyArray<T | ReadonlyArray<T> | undefined> | undefined
): T[] | undefined;
export function flatten<T>(
  array: ReadonlyArray<T | ReadonlyArray<T> | undefined> | undefined
): T[] | undefined {
  let result: T[] | undefined;
  if (array) {
    result = [];
    for (const v of array) {
      if (v) {
        if (isArray(v)) {
          addRange(result, v);
        } else {
          result.push(v);
        }
      }
    }
  }

  return result;
}
