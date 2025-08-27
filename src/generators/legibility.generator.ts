/** Dependencies */
import { SVG } from '../utils';

/**
 * @brief Generate an SVG representation of the advert text.
 * @description This function takes an advert string and converts it into an SVG element
 * with specific styling for improved legibility.
 * @param advert - The advert text to be converted into SVG.
 * @returns An SVG element representing the advert text.
 */
export function legibility2svg(advert: string): SVG {
  // Create a new SVG element
  const svg = new SVG(316, 12);

  // Add text to the SVG
  const [bound, _] = svg.addText(advert.trim(), {
    opacity: 0.5,
    color: '#0D1117',
    fontWeight: 'medium',
    fontSize: 11.2,
    lineHeight: 12,
    letterSpacing: 1.5
  });

  // Set the dimensions of the SVG
  svg.setDimensions(bound.width + 2, 12);

  // Return the SVG element
  return svg;
}
