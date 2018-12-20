// Copied from Typescript source

import { CharacterCodes } from '../CharacterCodes';

export function getFileUrlVolumeSeparatorEnd(url: string, start: number) {
  const ch0 = url.charCodeAt(start);
  if (ch0 === CharacterCodes.colon) {
    return start + 1;
  }
  if (
    ch0 === CharacterCodes.percent &&
    url.charCodeAt(start + 1) === CharacterCodes._3
  ) {
    const ch2 = url.charCodeAt(start + 2);
    if (ch2 === CharacterCodes.a || ch2 === CharacterCodes.A) {
      return start + 3;
    }
  }
  return -1;
}
