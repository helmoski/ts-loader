import { Webpack } from '../interfaces';
import { FileSystemEntryKind } from './FileSystemEntryKind';

export function fileSystemEntryExists(
  loader: Webpack,
  path: string,
  entryKind: FileSystemEntryKind
): boolean {
  try {
    const stat = loader.fs.statSync(path);
    switch (entryKind) {
      case FileSystemEntryKind.File:
        return stat.isFile();
      case FileSystemEntryKind.Directory:
        return stat.isDirectory();
      default:
        return false;
    }
  } catch (e) {
    return false;
  }
}
