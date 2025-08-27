/** Dependencies */
import path from 'path';
import { loadSync } from 'opentype.js';

/**
 * @brief Inter font family
 * @description Loads the Inter font family from the specified paths.
 * @example
 * const HelloWorld = Inter.light.getPath('Hello World', 0, 0, 16);
 */
export const Inter = {
  light: loadSync(path.join(__dirname, '../../fonts/Inter-Light.ttf')),
  regular: loadSync(path.join(__dirname, '../../fonts/Inter-Regular.ttf')),
  medium: loadSync(path.join(__dirname, '../../fonts/Inter-Medium.ttf'))
};
