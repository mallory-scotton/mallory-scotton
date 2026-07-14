/** Dependencies */
import { PreferredTheme } from '../types';
import { SVG } from '../utils';

/**
 * @brief Divider to SVG
 * @description Converts a divider element to an SVG representation.
 * @returns The SVG representation of the divider element.
 */
export function divider2svg(theme: PreferredTheme): SVG {
  // Create a new SVG element
  const svg = new SVG(1044, 2);

  // Add a rectangle to the SVG
  svg.addChild({
    type: 'rect',
    width: 1044,
    height: 1,
    transform: 'translate(0 0.5)',
    fill: theme === 'dark' ? '#F2F2F2' : '#121212',
    opacity: 0.2
  });

  // Return the SVG element
  return svg;
}
