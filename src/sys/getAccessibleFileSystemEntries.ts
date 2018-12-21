import { Webpack } from '../interfaces';
import { combinePaths } from '../utils';
import { FileSystemEntries } from './FileSystemEntries';

export function getAccessibleFileSystemEntries(
  loader: Webpack,
  path: string
): FileSystemEntries {
  try {
    const entries = loader.fs.readdirSync(path || '.').sort();
    const files: string[] = [];
    const directories: string[] = [];
    for (const entry of entries) {
      // This is necessary because on some file system node fails to exclude
      // "." and "..". See https://github.com/nodejs/node/issues/4002
      if (entry === '.' || entry === '..') {
        continue;
      }
      const name = combinePaths(path, entry);

      let stat: any;
      try {
        stat = loader.fs.statSync(name);
      } catch (e) {
        continue;
      }

      if (stat.isFile()) {
        files.push(entry);
      } else if (stat.isDirectory()) {
        directories.push(entry);
      }
    }
    return { files, directories };
  } catch (e) {
    return {
      directories: [],
      files: []
    };
  }
}
