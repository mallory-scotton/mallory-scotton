/** Dependencies */
import { SVG, capitalize } from '../utils';
import { UpDown } from '../animations';

export function link2svg(name: string) {
  // Create a new SVG canvas with specified dimensions
  const svg = new SVG(207, 96);

  // Add text to the SVG
  const [bound, _] = svg.addText(name, {
    fontWeight: 'medium',
    fontSize: 25.6,
    letterSpacing: 0.4,
    y: 30,
    x: 32,
    opacity: 1,
    lineHeight: 36,
    color: '#F2F2F2'
  });

  // Add the arrow
  const element = svg.addChild({
    type: 'g',
    style: {
      transform: `translate(${bound.width + 40}px, 30px)`
    },
    children: [
      {
        type: 'path',
        d: 'M8.08672 30L6.51172 28.425L25.1867 9.75H14.1617V7.5H29.0117V22.35H26.7617V11.325L8.08672 30Z',
        fill: '#F2F2F2'
      }
    ]
  });

  // Add the up-down animation
  svg.addAnimation(element.id!, UpDown, {
    duration: 2e3,
    easing: 'linear',
    iterationCount: 'infinite'
  });

  // Resize the SVG canvas
  svg.setDimensions(bound.width + 100, 96);

  // Return the generated SVG
  return svg;
}
