// Copied from Typescript source

const directorySeparator = '/';
const backslashRegExp = /\\/g;

/**
 * Normalize path separators.
 */
export function normalizeSlashes(path: string): string {
  return path.replace(backslashRegExp, directorySeparator);
}
