import { Webpack } from '../interfaces';
import { isFileSystemCaseSensitive } from './isFileSystemCaseSensitive';
import { matchFiles } from './matchFiles';

export function readDirectory(
  loader: Webpack,
  path: string,
  extensions?: ReadonlyArray<string>,
  excludes?: ReadonlyArray<string>,
  includes?: ReadonlyArray<string>,
  depth?: number
): string[] {
  return matchFiles(
    loader,
    path,
    extensions,
    excludes,
    includes,
    isFileSystemCaseSensitive(loader),
    process.cwd(),
    depth
  );
}
