/** Dependencies */
import { UPDATED_AT_TEXT } from '../constants';
import { PreferredTheme } from '../types';
import { SVG } from '../utils';

export function updatedat2svg(userName: string = 'Mallow', theme: PreferredTheme): SVG {
  const offsetY = 80;
  // Create a new SVG instance
  const svg = new SVG(250, 20 + offsetY);

  // Add text to the SVG
  const [bound, _] = svg.addText(UPDATED_AT_TEXT(userName), {
    fontSize: 10.3,
    lineHeight: 20,
    fontWeight: 'light',
    color: theme === 'dark' ? '#F2F2F2' : '#121212',
    opacity: 0.5,
    letterSpacing: 0.2,
    y: 0 + offsetY,
    x: 0
  });

  // Resize the SVG width to fit the text
  svg.setDimensions(Math.ceil(bound.width) + 2, 20 + offsetY);

  // Return the SVG instance
  return svg;
}
