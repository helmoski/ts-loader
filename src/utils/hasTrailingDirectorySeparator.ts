// Adapted from Typescript source

import { CharacterCodes } from './CharacterCodes';

/**
 * Determines whether a path has a trailing separator (`/` or `\\`).
 */
export function hasTrailingDirectorySeparator(path: string): boolean {
  if (path.length === 0) {
    return false;
  }
  const ch = path.charCodeAt(path.length - 1);
  return ch === CharacterCodes.slash || ch === CharacterCodes.backslash;
}
