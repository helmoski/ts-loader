import { ensureTrailingDirectorySeparator } from '../ensureTrailingDirectorySeparator';

const directorySeparator = '/';

/**
 * Formats a parsed path consisting of a root component (at index 0) and zero or more path
 * segments (at indices > 0).
 */
export function getPathFromPathComponents(
  pathComponents: ReadonlyArray<string>
) {
  if (pathComponents.length === 0) {
    return '';
  }

  const root =
    pathComponents[0] && ensureTrailingDirectorySeparator(pathComponents[0]);
  return root + pathComponents.slice(1).join(directorySeparator);
}
