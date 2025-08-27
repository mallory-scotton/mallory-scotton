/** Dependencies */
import { ProfileConfig } from '../types';
import { capitalize, SVG } from '../utils';

/**
 * @brief Generates an SVG representation of a user profile.
 * @description This function takes a ProfileConfig object and generates an SVG image
 * representing the user's profile, including their name, title, and image.
 * @param config - The profile configuration object containing user details.
 * @returns An SVG representation of the user's profile.
 */
export function profile2svg(config: ProfileConfig): SVG {
  // Create SVG
  const svg = new SVG(416, 94);

  // Add name
  const [bound1, _1] = svg.addText(capitalize(config.profile.name), {
    letterSpacing: 0,
    fontSize: 36,
    fontWeight: 'medium',
    color: '#F2F2F2',
    lineHeight: 40,
    y: 5,
    x: 101
  });

  // Add title
  const [bound2, _2] = svg.addText(capitalize(config.profile.title), {
    letterSpacing: 0.4,
    lineHeight: 24,
    fontSize: 22.2,
    fontWeight: 'regular',
    color: '#F2F2F2',
    opacity: 0.5,
    x: 101,
    y: 61
  });

  // Add image
  const image = svg.addImage(config.profile.signature, 500, 500);

  // Add pattern
  const pattern = svg.addPattern({
    type: 'pattern',
    patternContentUnits: 'objectBoundingBox',
    width: 1,
    height: 1,
    children: [
      {
        'type': 'use',
        'xlink:href': `#${image.id!}`,
        'transform': 'matrix(0.00199698 0 0 0.002 0.000755439 0)'
      }
    ]
  });

  // Add rect
  svg.addChild({
    type: 'rect',
    width: 90.1362,
    height: 90,
    transform: 'translate(0 2)',
    fill: `url(#${pattern.id!})`
  })

  // Get maximum width
  const width = Math.max(bound1.width, bound2.width);

  // Resize SVG
  svg.setDimensions(width + 105, 94);

  // Return SVG
  return svg;
}
