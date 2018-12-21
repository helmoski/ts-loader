import { resolvePath } from './resolvePath';

export function normalizePath(path: string): string {
  return resolvePath(path);
}
