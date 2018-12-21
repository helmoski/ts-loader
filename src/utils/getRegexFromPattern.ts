export function getRegexFromPattern(
  pattern: string,
  useCaseSensitiveFileNames: boolean
): RegExp {
  return new RegExp(pattern, useCaseSensitiveFileNames ? '' : 'i');
}
