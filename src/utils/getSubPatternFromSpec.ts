import { CharacterCodes } from './CharacterCodes';
import { getNormalizedPathComponents } from './getNormalizedPathComponents';
import { isImplicitGlob } from './isImplicitGlob';
import { last } from './last';
import { removeTrailingDirectorySeparator } from './removeTrailingDirectorySeparator';

interface WildcardMatcher {
  singleAsteriskRegexFragment: string;
  doubleAsteriskRegexFragment: string;
  replaceWildcardCharacter: (match: string) => string;
}

// Reserved characters, forces escaping of any non-word (or digit), non-whitespace character.
// It may be inefficient (we could just match (/[-[\]{}()*+?.,\\^$|#\s]/g), but this is future
// proof.
const reservedCharacterPattern = /[^\w\s\/]/g;
const commonPackageFolders: ReadonlyArray<string> = [
  'node_modules',
  'bower_components',
  'jspm_packages'
];
const implicitExcludePathRegexPattern = `(?!(${commonPackageFolders.join(
  '|'
)})(/|$))`;
const directorySeparator = '/';

export function getSubPatternFromSpec(
  spec: string,
  basePath: string,
  usage: 'files' | 'directories' | 'exclude',
  {
    singleAsteriskRegexFragment,
    doubleAsteriskRegexFragment,
    replaceWildcardCharacter
  }: WildcardMatcher
): string | undefined {
  let subpattern = '';
  let hasWrittenComponent = false;
  const components = getNormalizedPathComponents(spec, basePath);
  const lastComponent = last(components);
  if (usage !== 'exclude' && lastComponent === '**') {
    return undefined;
  }

  // getNormalizedPathComponents includes the separator for the root component.
  // We need to remove to create our regex correctly.
  components[0] = removeTrailingDirectorySeparator(components[0]);

  if (isImplicitGlob(lastComponent)) {
    components.push('**', '*');
  }

  let optionalCount = 0;
  for (let component of components) {
    if (component === '**') {
      subpattern += doubleAsteriskRegexFragment;
    } else {
      if (usage === 'directories') {
        subpattern += '(';
        optionalCount++;
      }

      if (hasWrittenComponent) {
        subpattern += directorySeparator;
      }

      if (usage !== 'exclude') {
        let componentPattern = '';
        // The * and ? wildcards should not match directories or files that start with . if they
        // appear first in a component. Dotted directories and files can be included explicitly
        // like so: **/.*/.*
        if (component.charCodeAt(0) === CharacterCodes.asterisk) {
          componentPattern += '([^./]' + singleAsteriskRegexFragment + ')?';
          component = component.substr(1);
        } else if (component.charCodeAt(0) === CharacterCodes.question) {
          componentPattern += '[^./]';
          component = component.substr(1);
        }

        componentPattern += component.replace(
          reservedCharacterPattern,
          replaceWildcardCharacter
        );

        // Patterns should not include subfolders like node_modules unless they are
        // explicitly included as part of the path.
        //
        // As an optimization, if the component pattern is the same as the component,
        // then there definitely were no wildcard characters and we do not need to
        // add the exclusion pattern.
        if (componentPattern !== component) {
          subpattern += implicitExcludePathRegexPattern;
        }

        subpattern += componentPattern;
      } else {
        subpattern += component.replace(
          reservedCharacterPattern,
          replaceWildcardCharacter
        );
      }
    }

    hasWrittenComponent = true;
  }

  while (optionalCount > 0) {
    subpattern += ')?';
    optionalCount--;
  }

  return subpattern;
}
