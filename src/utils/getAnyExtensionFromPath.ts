import { equateStringsCaseInsensitive } from './equateStringsCaseInsensitive';
import { equateStringsCaseSensitive } from './equateStringsCaseSensitive';
import { getAnyExtensionFromPathWorker } from './getAnyExtensionFromPathWorker';
import { getBaseFileName } from './getBaseFileName';

/**
 * Gets the file extension for a path.
 */
export function getAnyExtensionFromPath(path: string): string;
/**
 * Gets the file extension for a path, provided it is one of the provided extensions.
 */
export function getAnyExtensionFromPath(
  path: string,
  extensions: string | ReadonlyArray<string>,
  ignoreCase: boolean
): string;
export function getAnyExtensionFromPath(
  path: string,
  extensions?: string | ReadonlyArray<string>,
  ignoreCase?: boolean
): string {
  // Retrieves any string from the final "." onwards from a base file name.
  // Unlike extensionFromPath, which throws an exception on unrecognized extensions.
  if (extensions) {
    return getAnyExtensionFromPathWorker(
      path,
      extensions,
      ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive
    );
  }
  const baseFileName = getBaseFileName(path);
  const extensionIndex = baseFileName.lastIndexOf('.');
  if (extensionIndex >= 0) {
    return baseFileName.substring(extensionIndex);
  }
  return '';
}
