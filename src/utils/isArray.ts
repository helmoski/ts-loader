/**
 * Tests whether a value is an array.
 */
export function isArray(value: any): value is ReadonlyArray<{}> {
  return Array.isArray ? Array.isArray(value) : value instanceof Array;
}
