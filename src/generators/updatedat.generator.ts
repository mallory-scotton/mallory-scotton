/** Dependencies */
import { UPDATED_AT_TEXT } from '../constants';
import { SVG } from '../utils';

export function updatedat2svg(userName: string = 'Mallow'): SVG {
  // Create a new SVG instance
  const svg = new SVG(250, 20);

  // Add text to the SVG
  const [bound, _] = svg.addText(UPDATED_AT_TEXT(userName), {
    fontSize: 10.3,
    lineHeight: 20,
    fontWeight: 'light',
    color: '#F2F2F2',
    opacity: 1,
    letterSpacing: 0.2,
    y: 0,
    x: 0
  });

  // Resize the SVG width to fit the text
  svg.setDimensions(Math.ceil(bound.width) + 2, 20);

  // Return the SVG instance
  return svg;
}
