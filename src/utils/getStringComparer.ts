import { compareStringsCaseInsensitive } from './compareStringsCaseInsensitive';
import { compareStringsCaseSensitive } from './compareStringsCaseSensitive';

export function getStringComparer(ignoreCase?: boolean) {
  return ignoreCase
    ? compareStringsCaseInsensitive
    : compareStringsCaseSensitive;
}
