import { getPathComponents } from './getPathComponents';
import { reducePathComponents } from './reducePathComponents';

/**
 * Parse a path into an array containing a root component (at index 0) and zero or more path
 * components (at indices > 0). The result is normalized.
 * If the path is relative, the root component is `""`.
 * If the path is absolute, the root component includes the first path separator (`/`).
 */
export function getNormalizedPathComponents(
  path: string,
  currentDirectory: string | undefined
) {
  return reducePathComponents(getPathComponents(path, currentDirectory));
}
