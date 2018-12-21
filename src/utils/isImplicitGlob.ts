/**
 * An "includes" path "foo" is implicitly a glob "foo/** /*" (without the space) if its last component has no extension,
 * and does not contain any glob characters itself.
 */
export function isImplicitGlob(lastPathComponent: string): boolean {
  return !/[.*?]/.test(lastPathComponent);
}
