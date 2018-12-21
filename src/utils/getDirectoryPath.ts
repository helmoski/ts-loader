import { getRootLength } from './getRootLength';
import { normalizeSlashes } from './normalizeSlashes';
import { removeTrailingDirectorySeparator } from './removeTrailingDirectorySeparator';

const directorySeparator = '/';

/**
 * Returns the path except for its basename. Semantics align with NodeJS's `path.dirname`
 * except that we support URL's as well.
 *
 * ```ts
 * getDirectoryPath("/path/to/file.ext") === "/path/to"
 * getDirectoryPath("/path/to/") === "/path"
 * getDirectoryPath("/") === "/"
 * ```
 */
export function getDirectoryPath(path: string): string {
  path = normalizeSlashes(path);

  // If the path provided is itself the root, then return it.
  const rootLength = getRootLength(path);
  if (rootLength === path.length) {
    return path;
  }

  // return the leading portion of the path up to the last (non-terminal) directory separator
  // but not including any trailing directory separator.
  path = removeTrailingDirectorySeparator(path);
  return path.slice(
    0,
    Math.max(rootLength, path.lastIndexOf(directorySeparator))
  );
}
