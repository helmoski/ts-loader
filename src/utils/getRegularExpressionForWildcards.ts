import { flatMap } from './flatMap';
import { getSubPatternFromSpec } from './getSubPatternFromSpec';

interface WildcardMatcher {
  singleAsteriskRegexFragment: string;
  doubleAsteriskRegexFragment: string;
  replaceWildcardCharacter: (match: string) => string;
}

function replaceWildcardCharacter(
  match: string,
  singleAsteriskRegexFragment: string
) {
  return match === '*'
    ? singleAsteriskRegexFragment
    : match === '?'
    ? '[^/]'
    : '\\' + match;
}

const commonPackageFolders: ReadonlyArray<string> = [
  'node_modules',
  'bower_components',
  'jspm_packages'
];
const implicitExcludePathRegexPattern = `(?!(${commonPackageFolders.join(
  '|'
)})(/|$))`;

const filesMatcher: WildcardMatcher = {
  /**
   * Matches any single directory segment unless it is the last segment and a .min.js file
   * Breakdown:
   *  [^./]                   # matches everything up to the first . character (excluding directory separators)
   *  (\\.(?!min\\.js$))?     # matches . characters but not if they are part of the .min.js file extension
   */
  singleAsteriskRegexFragment: '([^./]|(\\.(?!min\\.js$))?)*',
  /**
   * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
   * files or directories, does not match subdirectories that start with a . character
   */
  doubleAsteriskRegexFragment: `(/${implicitExcludePathRegexPattern}[^/.][^/]*)*?`,
  replaceWildcardCharacter: match =>
    replaceWildcardCharacter(match, filesMatcher.singleAsteriskRegexFragment)
};

const directoriesMatcher: WildcardMatcher = {
  singleAsteriskRegexFragment: '[^/]*',
  /**
   * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
   * files or directories, does not match subdirectories that start with a . character
   */
  doubleAsteriskRegexFragment: `(/${implicitExcludePathRegexPattern}[^/.][^/]*)*?`,
  replaceWildcardCharacter: match =>
    replaceWildcardCharacter(
      match,
      directoriesMatcher.singleAsteriskRegexFragment
    )
};

const excludeMatcher: WildcardMatcher = {
  singleAsteriskRegexFragment: '[^/]*',
  doubleAsteriskRegexFragment: '(/.+?)?',
  replaceWildcardCharacter: match =>
    replaceWildcardCharacter(match, excludeMatcher.singleAsteriskRegexFragment)
};

const wildcardMatchers = {
  files: filesMatcher,
  directories: directoriesMatcher,
  exclude: excludeMatcher
};

export function getRegularExpressionsForWildcards(
  specs: ReadonlyArray<string> | undefined,
  basePath: string,
  usage: 'files' | 'directories' | 'exclude'
): ReadonlyArray<string> | undefined {
  if (specs === undefined || specs.length === 0) {
    return undefined;
  }

  return flatMap(
    specs,
    spec =>
      spec &&
      getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage])
  );
}
