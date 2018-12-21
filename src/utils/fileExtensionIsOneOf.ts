import { fileExtensionIs } from './fileExtensionIs';

export function fileExtensionIsOneOf(
  path: string,
  extensions: ReadonlyArray<string>
): boolean {
  for (const extension of extensions) {
    if (fileExtensionIs(path, extension)) {
      return true;
    }
  }

  return false;
}
