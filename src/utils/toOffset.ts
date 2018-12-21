/**
 * Gets the actual offset into an array for a relative offset. Negative offsets indicate a
 * position offset from the end of the array.
 */
export function toOffset(array: ReadonlyArray<any>, offset: number) {
  return offset < 0 ? array.length + offset : offset;
}
