// Adapted from Typescript source

import { ensureTrailingDirectorySeparator } from './ensureTrailingDirectorySeparator';
import { getRootLength } from './getRootLength';
import { normalizeSlashes } from './normalizeSlashes';

/**
 * Combines paths. If a path is absolute, it replaces any previous path.
 */
export function combinePaths(
  path: string,
  ...paths: Array<string | undefined>
): string {
  if (path) {
    path = normalizeSlashes(path);
  }
  for (let relativePath of paths) {
    if (relativePath) {
      relativePath = normalizeSlashes(relativePath);
      path =
        !path || getRootLength(relativePath) !== 0
          ? relativePath
          : ensureTrailingDirectorySeparator(path) + relativePath;
    }
  }
  return path;
}
