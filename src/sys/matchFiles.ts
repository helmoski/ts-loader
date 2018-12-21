import { Webpack } from '../interfaces';
import {
  combinePaths,
  compareStringsCaseSensitive,
  fileExtensionIsOneOf,
  findIndex,
  flatten,
  getFileMatcherPatterns,
  getRegexFromPattern,
  normalizePath,
  sort
} from '../utils';
import { getAccessibleFileSystemEntries } from './getAccessibleFileSystemEntries';

export function matchFiles(
  loader: Webpack,
  path: string,
  extensions: ReadonlyArray<string> | undefined,
  excludes: ReadonlyArray<string> | undefined,
  includes: ReadonlyArray<string> | undefined,
  useCaseSensitiveFileNames: boolean,
  currentDirectory: string,
  depth: number | undefined
): string[] {
  path = normalizePath(path);
  currentDirectory = normalizePath(currentDirectory);

  const patterns = getFileMatcherPatterns(
    path,
    excludes,
    includes,
    useCaseSensitiveFileNames,
    currentDirectory
  );

  const includeFileRegexes =
    patterns.includeFilePatterns &&
    patterns.includeFilePatterns.map(pattern =>
      getRegexFromPattern(pattern, useCaseSensitiveFileNames)
    );
  const includeDirectoryRegex =
    patterns.includeDirectoryPattern &&
    getRegexFromPattern(
      patterns.includeDirectoryPattern,
      useCaseSensitiveFileNames
    );
  const excludeRegex =
    patterns.excludePattern &&
    getRegexFromPattern(patterns.excludePattern, useCaseSensitiveFileNames);

  // Associate an array of results with each include regex. This keeps results in order of the "include" order.
  // If there are no "includes", then just put everything in results[0].
  const results: string[][] = includeFileRegexes
    ? includeFileRegexes.map(() => [])
    : [[]];

  for (const basePath of patterns.basePaths) {
    visitDirectory(basePath, combinePaths(currentDirectory, basePath), depth);
  }

  return flatten<string>(results);

  function visitDirectory(
    targetPath: string,
    absolutePath: string,
    targetDepth: number | undefined
  ) {
    const { files, directories } = getAccessibleFileSystemEntries(
      loader,
      targetPath
    );

    for (const current of sort<string>(files, compareStringsCaseSensitive)) {
      const name = combinePaths(targetPath, current);
      const absoluteName = combinePaths(absolutePath, current);
      if (extensions && !fileExtensionIsOneOf(name, extensions)) {
        continue;
      }
      if (excludeRegex && excludeRegex.test(absoluteName)) {
        continue;
      }
      if (!includeFileRegexes) {
        results[0].push(name);
      } else {
        const includeIndex = findIndex(includeFileRegexes, re =>
          re.test(absoluteName)
        );
        if (includeIndex !== -1) {
          results[includeIndex].push(name);
        }
      }
    }

    if (targetDepth !== undefined) {
      targetDepth--;
      if (targetDepth === 0) {
        return;
      }
    }

    for (const current of sort<string>(
      directories,
      compareStringsCaseSensitive
    )) {
      const name = combinePaths(targetPath, current);
      const absoluteName = combinePaths(absolutePath, current);
      if (
        (!includeDirectoryRegex || includeDirectoryRegex.test(absoluteName)) &&
        (!excludeRegex || !excludeRegex.test(absoluteName))
      ) {
        visitDirectory(name, absoluteName, targetDepth);
      }
    }
  }
}
