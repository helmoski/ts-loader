import { combinePaths } from './combinePaths';
import { containsPath } from './containsPath';
import { every } from './every';
import { getIncludeBasePath } from './getIncludesBasePaths';
import { getStringComparer } from './getStringComparer';
import { isRootedDiskPath } from './isRootedDiskPath';
import { normalizePath } from './normalizePath';

/**
 * Computes the unique non-wildcard base paths amongst the provided include patterns.
 */
export function getBasePaths(
  path: string,
  includes: ReadonlyArray<string> | undefined,
  useCaseSensitiveFileNames: boolean
): string[] {
  // Storage for our results in the form of literal paths (e.g. the paths as written by the user).
  const basePaths: string[] = [path];

  if (includes) {
    // Storage for literal base paths amongst the include patterns.
    const includeBasePaths: string[] = [];
    for (const include of includes) {
      // We also need to check the relative paths by converting them to absolute and normalizing
      // in case they escape the base path (e.g "..\somedirectory")
      const absolute: string = isRootedDiskPath(include)
        ? include
        : normalizePath(combinePaths(path, include));
      // Append the literal and canonical candidate base paths.
      includeBasePaths.push(getIncludeBasePath(absolute));
    }

    // Sort the offsets array using either the literal or canonical path representations.
    includeBasePaths.sort(getStringComparer(!useCaseSensitiveFileNames));

    // Iterate over each include base path and include unique base paths that are not a
    // subpath of an existing base path
    for (const includeBasePath of includeBasePaths) {
      if (
        every(
          basePaths,
          basePath =>
            !containsPath(
              basePath,
              includeBasePath,
              path,
              !useCaseSensitiveFileNames
            )
        )
      ) {
        basePaths.push(includeBasePath);
      }
    }
  }

  return basePaths;
}
