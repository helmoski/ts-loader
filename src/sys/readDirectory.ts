import { Webpack } from '../interfaces';
import { getAccessibleFileSystemEntries } from './getAccessibleFileSystemEntries';
import { isFileSystemCaseSensitive } from './isFileSystemCaseSensitive';

export function readDirectory(
  loader: Webpack,
  path: string,
  extensions?: ReadonlyArray<string>,
  excludes?: ReadonlyArray<string>,
  includes?: ReadonlyArray<string>,
  depth?: number
): string[] {
  return matchFiles(
    path,
    extensions,
    excludes,
    includes,
    isFileSystemCaseSensitive(loader),
    process.cwd(),
    depth,
    (targetPath: string) => getAccessibleFileSystemEntries(loader, targetPath)
  );
}
