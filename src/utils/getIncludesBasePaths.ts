import { CharacterCodes } from './CharacterCodes';
import { getDirectoryPath } from './getDirectoryPath';
import { hasExtension } from './hasExtension';
import { indexOfAnyCharCode } from './indexOfAnyCharCode';
import { removeTrailingDirectorySeparator } from './removeTrailingDirectorySeparator';

const directorySeparator = '/';
const wildcardCharCodes = [CharacterCodes.asterisk, CharacterCodes.question];

export function getIncludeBasePath(absolute: string): string {
  const wildcardOffset = indexOfAnyCharCode(absolute, wildcardCharCodes);
  if (wildcardOffset < 0) {
    // No "*" or "?" in the path
    return !hasExtension(absolute)
      ? absolute
      : removeTrailingDirectorySeparator(getDirectoryPath(absolute));
  }
  return absolute.substring(
    0,
    absolute.lastIndexOf(directorySeparator, wildcardOffset)
  );
}
