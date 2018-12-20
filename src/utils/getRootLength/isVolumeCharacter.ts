// Copied from Typescript source

import { CharacterCodes } from '../CharacterCodes';

export function isVolumeCharacter(charCode: number) {
  return (
    (charCode >= CharacterCodes.a && charCode <= CharacterCodes.z) ||
    (charCode >= CharacterCodes.A && charCode <= CharacterCodes.Z)
  );
}
