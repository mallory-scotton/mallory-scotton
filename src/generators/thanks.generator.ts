/** Dependencies */
import { SVG } from '../utils';

/**
 * @brief Generates an SVG representation of a thank you message.
 * @description This function takes a message and a signature, and returns an SVG representation of the thank you message.
 * @param message - The thank you message to be displayed.
 * @param signature - The signature image to be included.
 * @returns An SVG representation of the thank you message.
 * @throws Error if the SVG generation fails.
 */
export function thanks2svg(message: string, signature: string): SVG {
  // Create the SVG
  const svg = new SVG(193, 113);

  // Add the message text
  const [bound, _] = svg.addText(message, {
    fontSize: 16.2,
    fontWeight: 'medium',
    lineHeight: 22.5,
    letterSpacing: 0.4,
    color: '#F2F2F2',
    opacity: 0.9
  });

  // Resize the SVG
  svg.setDimensions(bound.width + 2, 113);

  // Add signature image
  const image = svg.addImage(signature, 1600, 1600);

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
        'transform': 'scale(0.000625)'
      }
    ]
  });

  // Add Rect
  svg.addChild({
    type: 'rect',
    width: 80,
    height: 80,
    transform: 'translate(0 32.5078)',
    fill: `url(#${pattern.id!})`
  });

  // Return the SVG
  return svg;
}
