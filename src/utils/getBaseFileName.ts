import { getAnyExtensionFromPath } from './getAnyExtensionFromPath';
import { getRootLength } from './getRootLength';
import { normalizeSlashes } from './normalizeSlashes';
import { removeTrailingDirectorySeparator } from './removeTrailingDirectorySeparator';

const directorySeparator = '/';

/**
 * Returns the path except for its containing directory name.
 * Semantics align with NodeJS's `path.basename` except that we support URL's as well.
 *
 * ```ts
 * getBaseFileName("/path/to/file.ext") === "file.ext"
 * getBaseFileName("/path/to/") === "to"
 * getBaseFileName("/") === ""
 * ```
 */
export function getBaseFileName(path: string): string;
/**
 * Gets the portion of a path following the last (non-terminal) separator (`/`).
 * Semantics align with NodeJS's `path.basename` except that we support URL's as well.
 * If the base name has any one of the provided extensions, it is removed.
 *
 * ```ts
 * getBaseFileName("/path/to/file.ext", ".ext", true) === "file"
 * getBaseFileName("/path/to/file.js", ".ext", true) === "file.js"
 * ```
 */
export function getBaseFileName(
  path: string,
  extensions: string | ReadonlyArray<string>,
  ignoreCase: boolean
): string;
export function getBaseFileName(
  path: string,
  extensions?: string | ReadonlyArray<string>,
  ignoreCase?: boolean
) {
  path = normalizeSlashes(path);

  // if the path provided is itself the root, then it has not file name.
  const rootLength = getRootLength(path);
  if (rootLength === path.length) {
    return '';
  }

  // return the trailing portion of the path starting after the last (non-terminal) directory
  // separator but not including any trailing directory separator.
  path = removeTrailingDirectorySeparator(path);
  const name = path.slice(
    Math.max(getRootLength(path), path.lastIndexOf(directorySeparator) + 1)
  );
  const extension =
    extensions !== undefined && ignoreCase !== undefined
      ? getAnyExtensionFromPath(name, extensions, ignoreCase)
      : undefined;
  return extension ? name.slice(0, name.length - extension.length) : name;
}
