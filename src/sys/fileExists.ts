import { Webpack } from '../interfaces';
import { fileSystemEntryExists } from './fileSystemEntryExists';
import { FileSystemEntryKind } from './FileSystemEntryKind';

export function fileExists(loader: Webpack, path: string): boolean {
  return fileSystemEntryExists(loader, path, FileSystemEntryKind.File);
}
