import { combinePaths } from './combinePaths';
import { getBasePaths } from './getBasePaths';
import { getRegularExpressionForWildcard } from './getRegularExpressionForWildcard';
import { getRegularExpressionsForWildcards } from './getRegularExpressionForWildcards';
import { map } from './map';
import { normalizePath } from './normalizePath';

export interface FileMatcherPatterns {
  /** One pattern for each "include" spec. */
  includeFilePatterns: ReadonlyArray<string> | undefined;
  /** One pattern matching one of any of the "include" specs. */
  includeFilePattern: string | undefined;
  includeDirectoryPattern: string | undefined;
  excludePattern: string | undefined;
  basePaths: ReadonlyArray<string>;
}

/** @param path directory of the tsconfig.json */
export function getFileMatcherPatterns(
  path: string,
  excludes: ReadonlyArray<string> | undefined,
  includes: ReadonlyArray<string> | undefined,
  useCaseSensitiveFileNames: boolean,
  currentDirectory: string
): FileMatcherPatterns {
  path = normalizePath(path);
  currentDirectory = normalizePath(currentDirectory);
  const absolutePath = combinePaths(currentDirectory, path);

  return {
    includeFilePatterns: map(
      getRegularExpressionsForWildcards(includes, absolutePath, 'files'),
      pattern => `^${pattern}$`
    ),
    includeFilePattern: getRegularExpressionForWildcard(
      includes,
      absolutePath,
      'files'
    ),
    includeDirectoryPattern: getRegularExpressionForWildcard(
      includes,
      absolutePath,
      'directories'
    ),
    excludePattern: getRegularExpressionForWildcard(
      excludes,
      absolutePath,
      'exclude'
    ),
    basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames)
  };
}
