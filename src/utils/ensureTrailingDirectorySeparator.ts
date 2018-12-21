// Copied from Typescript source

import { hasTrailingDirectorySeparator } from './hasTrailingDirectorySeparator';

const directorySeparator = '/';

/**
 * Adds a trailing directory separator to a path, if it does not already have one.
 * @param path The path.
 */
export function ensureTrailingDirectorySeparator(path: string): string {
  if (!hasTrailingDirectorySeparator(path)) {
    return path + directorySeparator;
  }

  return path;
}
