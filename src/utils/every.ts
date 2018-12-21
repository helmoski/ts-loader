/**
 * Iterates through `array` by index and performs the callback on each element of array until the callback
 * returns a falsey value, then returns false.
 * If no such value is found, the callback is applied to each element of array and `true` is returned.
 */
export function every<T>(
  array: ReadonlyArray<T>,
  callback: (element: T, index: number) => boolean
): boolean {
  if (array) {
    for (let i = 0; i < array.length; i++) {
      if (!callback(array[i], i)) {
        return false;
      }
    }
  }

  return true;
}
