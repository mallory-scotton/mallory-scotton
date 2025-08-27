/** Dependencies */
import { Animation } from '../types';

/**
 * @brief Represents an up-down CSS animation.
 * @description A simple up and down animation.
 */
export const UpDown: Animation = {
  '0%': { translate: '0 -2px' },
  '50%': { translate: '0 2px' },
  '100%': { translate: '0 -2px' }
};
