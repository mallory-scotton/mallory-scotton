/** Dependencies */
import { ProfileConfig } from '../types';
import { SVG } from '../utils';

/**
 *
 */
export function profile2svg(config: ProfileConfig): SVG {
  // Create SVG
  const svg = new SVG(416, 94);

  // Add image
  const image = svg.addImage(config.profile.signature, 500, 500);

  // Return SVG
  return svg;
}
