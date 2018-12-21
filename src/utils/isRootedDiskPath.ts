import { getEncodedRootLength } from './getRootLength';

/**
 * Determines whether a path is an absolute path (e.g. starts with `/`, or a dos path
 * like `c:`, `c:\` or `c:/`).
 */
export function isRootedDiskPath(path: string) {
  return getEncodedRootLength(path) > 0;
}
