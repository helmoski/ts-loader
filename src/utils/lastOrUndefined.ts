/**
 * Returns the last element of an array if non-empty, `undefined` otherwise.
 */
export function lastOrUndefined<T>(array: ReadonlyArray<T>): T | undefined {
  return array.length === 0 ? undefined : array[array.length - 1];
}
