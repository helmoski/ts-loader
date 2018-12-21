/** Works like Array.prototype.findIndex, returning `-1` if no element satisfying the predicate is found. */
export function findIndex<T>(
  array: ReadonlyArray<T>,
  predicate: (element: T, index: number) => boolean,
  startIndex?: number
): number {
  for (let i = startIndex || 0; i < array.length; i++) {
    if (predicate(array[i], i)) {
      return i;
    }
  }
  return -1;
}
