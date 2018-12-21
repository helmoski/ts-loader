import * as os from 'os';

import { Webpack } from '../interfaces';
import { swapCase } from '../utils';
import { fileExists } from './fileExists';

export function isFileSystemCaseSensitive(loader: Webpack): boolean {
  const platform = os.platform();
  // win32\win64 are case insensitive platforms
  if (platform === 'win32') {
    return false;
  }
  // If this file exists under a different case, we must be case-insensitve.
  return !fileExists(loader, swapCase(__filename));
}
