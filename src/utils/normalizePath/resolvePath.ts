import { combinePaths } from '../combinePaths';
import { ensureTrailingDirectorySeparator } from '../ensureTrailingDirectorySeparator';
import { hasTrailingDirectorySeparator } from '../hasTrailingDirectorySeparator';
import { normalizeSlashes } from '../normalizeSlashes';
import { some } from '../some';
import { getPathComponents } from './getPathComponents';
import { getPathFromPathComponents } from './getPathFromPathComponents';
import { reducePathComponents } from './reducePathComponents';

/**
 * Combines and resolves paths. If a path is absolute, it replaces any previous path. Any
 * `.` and `..` path components are resolved.
 */
export function resolvePath(
  path: string,
  ...paths: Array<string | undefined>
): string {
  const combined = some(paths)
    ? combinePaths(path, ...paths)
    : normalizeSlashes(path);
  const normalized = getPathFromPathComponents(
    reducePathComponents(getPathComponents(combined))
  );
  return normalized && hasTrailingDirectorySeparator(combined)
    ? ensureTrailingDirectorySeparator(normalized)
    : normalized;
}
