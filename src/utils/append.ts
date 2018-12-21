/**
 * Appends a value to an array, returning the array.
 *
 * @param to The array to which `value` is to be appended. If `to` is `undefined`, a new array
 * is created if `value` was appended.
 * @param value The value to append to the array. If `value` is `undefined`, nothing is
 * appended.
 */
export function append<T>(to: T[], value: T | undefined): T[];
export function append<T>(to: T[] | undefined, value: T): T[];
export function append<T>(
  to: T[] | undefined,
  value: T | undefined
): T[] | undefined {
  if (value === undefined) {
    return to;
  }
  if (to === undefined) {
    return [value];
  }
  to.push(value);
  return to;
}
