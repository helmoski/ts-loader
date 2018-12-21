/** Convert all lowercase chars to uppercase, and vice-versa */
export function swapCase(s: string): string {
  return s.replace(/\w/g, ch => {
    const up = ch.toUpperCase();
    return ch === up ? ch.toLowerCase() : up;
  });
}
