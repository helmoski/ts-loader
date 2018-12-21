import { combinePaths } from '../combinePaths';
import { getRootLength } from '../getRootLength';
import { pathComponents } from './pathComponents';

/**
 * Parse a path into an array containing a root component (at index 0) and zero or more path
 * components (at indices > 0). The result is not normalized.
 * If the path is relative, the root component is `""`.
 * If the path is absolute, the root component includes the first path separator (`/`).
 */
export function getPathComponents(path: string, currentDirectory = '') {
  path = combinePaths(currentDirectory, path);
  const rootLength = getRootLength(path);
  return pathComponents(path, rootLength);
}
