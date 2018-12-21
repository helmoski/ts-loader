import { getRegularExpressionsForWildcards } from './getRegularExpressionForWildcards';

export function getRegularExpressionForWildcard(
  specs: ReadonlyArray<string> | undefined,
  basePath: string,
  usage: 'files' | 'directories' | 'exclude'
): string | undefined {
  const patterns = getRegularExpressionsForWildcards(specs, basePath, usage);
  if (!patterns || !patterns.length) {
    return undefined;
  }

  const pattern = patterns.map(p => `(${p})`).join('|');
  // If excluding, match "foo/bar/baz...", but if including, only allow "foo".
  const terminator = usage === 'exclude' ? '($|/)' : '$';
  return `^(${pattern})${terminator}`;
}
