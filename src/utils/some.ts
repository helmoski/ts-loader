export function some<T>(
  array: ReadonlyArray<T> | undefined
): array is ReadonlyArray<T>;
export function some<T>(
  array: ReadonlyArray<T> | undefined,
  predicate: (value: T) => boolean
): boolean;
export function some<T>(
  array: ReadonlyArray<T> | undefined,
  predicate?: (value: T) => boolean
): boolean {
  if (array) {
    if (predicate) {
      for (const v of array) {
        if (predicate(v)) {
          return true;
        }
      }
    } else {
      return array.length > 0;
    }
  }
  return false;
}
