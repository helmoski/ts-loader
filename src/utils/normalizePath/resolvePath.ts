import { combinePaths } from '../combinePaths';
import { ensureTrailingDirectorySeparator } from '../ensureTrailingDirectorySeparator';
import { getPathComponents } from '../getPathComponents';
import { hasTrailingDirectorySeparator } from '../hasTrailingDirectorySeparator';
import { normalizeSlashes } from '../normalizeSlashes';
import { reducePathComponents } from '../reducePathComponents';
import { some } from '../some';
import { getPathFromPathComponents } from './getPathFromPathComponents';

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
