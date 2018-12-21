import { contains } from './contains';

export function indexOfAnyCharCode(
  text: string,
  charCodes: ReadonlyArray<number>,
  start?: number
): number {
  for (let i = start || 0; i < text.length; i++) {
    if (contains(charCodes, text.charCodeAt(i))) {
      return i;
    }
  }
  return -1;
}
