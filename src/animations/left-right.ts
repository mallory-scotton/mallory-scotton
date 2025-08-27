/** Dependencies */
import { Animation } from '../types';

/**
 * @brief Represents an left and right CSS animation.
 * @description A simple left and right animation.
 */
export const LeftRight: Animation = {
  '0%': { translate: '-2px 0' },
  '50%': { translate: '2px 0' },
  '100%': { translate: '-2px 0' }
};
