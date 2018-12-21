import { toOffset } from './toOffset';

/**
 * Appends a range of value to an array, returning the array.
 *
 * @param to The array to which `value` is to be appended. If `to` is `undefined`, a new array
 * is created if `value` was appended.
 * @param from The values to append to the array. If `from` is `undefined`, nothing is
 * appended. If an element of `from` is `undefined`, that element is not appended.
 * @param start The offset in `from` at which to start copying values.
 * @param end The offset in `from` at which to stop copying values (non-inclusive).
 */
export function addRange<T>(
  to: T[],
  from: ReadonlyArray<T> | undefined,
  start?: number,
  end?: number
): T[];
export function addRange<T>(
  to: T[] | undefined,
  from: ReadonlyArray<T> | undefined,
  start?: number,
  end?: number
): T[] | undefined;
export function addRange<T>(
  to: T[] | undefined,
  from: ReadonlyArray<T> | undefined,
  start?: number,
  end?: number
): T[] | undefined {
  if (from === undefined || from.length === 0) {
    return to;
  }
  if (to === undefined) {
    return from.slice(start, end);
  }
  start = start === undefined ? 0 : toOffset(from, start);
  end = end === undefined ? from.length : toOffset(from, end);
  for (let i = start; i < end && i < from.length; i++) {
    if (from[i] !== undefined) {
      to.push(from[i]);
    }
  }
  return to;
}
