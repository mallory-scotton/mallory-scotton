/** Dependencies */
import { Animation } from '../types';

/**
 * @brief Represents a shine move CSS animation.
 * @description A simple shine move animation.
 */
export const ShineMove: Animation = {
  '0%': {
    transform: 'translate(1500px, 75px)'
  },
  '100%': {
    transform: 'translate(-1500px, 75px)'
  }
};
