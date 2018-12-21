import { hasTrailingDirectorySeparator } from './hasTrailingDirectorySeparator';

/**
 * Removes a trailing directory separator from a path.
 */
export function removeTrailingDirectorySeparator(path: string): string;
export function removeTrailingDirectorySeparator(path: string) {
  if (hasTrailingDirectorySeparator(path)) {
    return path.substr(0, path.length - 1);
  }

  return path;
}
