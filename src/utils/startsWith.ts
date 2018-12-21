export function startsWith(str: string, prefix: string): boolean {
  return str.lastIndexOf(prefix, 0) === 0;
}
