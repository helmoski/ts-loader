// Adapted from Typescript source

import { getRootLength } from '../getRootLength';
import { ensureTrailingDirectorySeparator } from './ensureTrailingDirectorySeparator';
import { normalizeSlashes } from './normalizeSlashes';

/**
 * Combines paths. If a path is absolute, it replaces any previous path.
 */
export function combinePaths(...paths: string[]): string {
  let combinedPath = '';
  for (let relativePath of paths) {
    relativePath = normalizeSlashes(relativePath);
    combinedPath =
      !combinedPath || getRootLength(relativePath) !== 0
        ? relativePath
        : ensureTrailingDirectorySeparator(combinedPath) + relativePath;
  }
  return combinedPath;
}
