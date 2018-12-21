export function map<T, U>(
  array: ReadonlyArray<T>,
  f: (x: T, i: number) => U
): U[];
export function map<T, U>(
  array: ReadonlyArray<T> | undefined,
  f: (x: T, i: number) => U
): U[] | undefined;
export function map<T, U>(
  array: ReadonlyArray<T> | undefined,
  f: (x: T, i: number) => U
): U[] | undefined {
  let result: U[] | undefined;
  if (array) {
    result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(f(array[i], i));
    }
  }
  return result;
}
