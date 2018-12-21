import { combinePaths } from './combinePaths';
import { equateStringsCaseInsensitive } from './equateStringsCaseInsensitive';
import { equateStringsCaseSensitive } from './equateStringsCaseSensitive';
import { getPathComponents } from './getPathComponents';
import { reducePathComponents } from './reducePathComponents';

export function containsPath(
  parent: string,
  child: string,
  ignoreCase?: boolean
): boolean;
export function containsPath(
  parent: string,
  child: string,
  currentDirectory: string,
  ignoreCase?: boolean
): boolean;
export function containsPath(
  parent: string,
  child: string,
  currentDirectory?: string | boolean,
  ignoreCase?: boolean
) {
  if (typeof currentDirectory === 'string') {
    parent = combinePaths(currentDirectory, parent);
    child = combinePaths(currentDirectory, child);
  } else if (typeof currentDirectory === 'boolean') {
    ignoreCase = currentDirectory;
  }
  if (parent === undefined || child === undefined) {
    return false;
  }
  if (parent === child) {
    return true;
  }
  const parentComponents = reducePathComponents(getPathComponents(parent));
  const childComponents = reducePathComponents(getPathComponents(child));
  if (childComponents.length < parentComponents.length) {
    return false;
  }

  const componentEqualityComparer = ignoreCase
    ? equateStringsCaseInsensitive
    : equateStringsCaseSensitive;
  for (let i = 0; i < parentComponents.length; i++) {
    const equalityComparer =
      i === 0 ? equateStringsCaseInsensitive : componentEqualityComparer;
    if (!equalityComparer(parentComponents[i], childComponents[i])) {
      return false;
    }
  }

  return true;
}
