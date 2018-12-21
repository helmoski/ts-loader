import { getBaseFileName } from './getBaseFileName';
import { stringContains } from './stringContains';

export function hasExtension(fileName: string): boolean {
  return stringContains(getBaseFileName(fileName), '.');
}
