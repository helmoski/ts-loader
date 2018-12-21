import { startsWith } from './startsWith';

export function getAnyExtensionFromPathWorker(
  path: string,
  extensions: string | ReadonlyArray<string>,
  stringEqualityComparer: (a: string, b: string) => boolean
) {
  if (typeof extensions === 'string') {
    extensions = [extensions];
  }
  for (let extension of extensions) {
    if (!startsWith(extension, '.')) {
      extension = '.' + extension;
    }
    if (
      path.length >= extension.length &&
      path.charAt(path.length - extension.length) === '.'
    ) {
      const pathExtension = path.slice(path.length - extension.length);
      if (stringEqualityComparer(pathExtension, extension)) {
        return pathExtension;
      }
    }
  }
  return '';
}
