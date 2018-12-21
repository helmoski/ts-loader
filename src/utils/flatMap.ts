import { addRange } from './addRange';
import { append } from './append';
import { isArray } from './isArray';

/**
 * Maps an array. If the mapped value is an array, it is spread into the result.
 *
 * @param array The array to map.
 * @param mapfn The callback used to map the result into one or more values.
 */
export function flatMap<T, U>(
  array: ReadonlyArray<T> | undefined,
  mapfn: (x: T, i: number) => U | ReadonlyArray<U> | undefined
): ReadonlyArray<U> {
  let result: U[] | undefined;
  if (array) {
    for (let i = 0; i < array.length; i++) {
      const v = mapfn(array[i], i);
      if (v) {
        result = isArray(v) ? addRange(result, v) : append(result, v);
      }
    }
  }
  return result || [];
}
