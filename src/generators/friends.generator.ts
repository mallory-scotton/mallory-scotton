/** Dependencies */
import { Friend } from '../types';
import { capitalize, lowercase, stripDomain, SVG } from '../utils';

/**
 * @brief Convert a Friend object to an SVG representation.
 * @description This function takes a Friend object and converts it into an SVG representation.
 * @returns An SVG representation of the Friend object.
 */
export function friend2svg(friend: Friend): SVG {
  // Create a new SVG instance
  const svg = new SVG(327, 97);

  // Add the friend's name
  svg.addText(capitalize(friend.name), {
    fontSize: 21.6,
    fontWeight: 'medium',
    color: '#F2F2F2',
    opacity: 1,
    y: 0,
    x: 0,
    letterSpacing: 0.1,
    lineHeight: 30
  });

  // Add the friend's title and company
  svg.addText(`${capitalize(friend.title)} — ${capitalize(friend.company)}`, {
    fontSize: 16.5,
    fontWeight: 'light',
    color: '#F2F2F2',
    opacity: 0.4,
    y: 35.75,
    x: 0,
    letterSpacing: 0.5,
    lineHeight: 23
  });

  // Add the friend's website
  const [bound, _] = svg.addText(lowercase(stripDomain(friend.website)), {
    fontSize: 15.6,
    fontWeight: 'regular',
    color: '#F2F2F2',
    opacity: 0.6,
    y: 69.75,
    x: 0,
    letterSpacing: 0.3,
    lineHeight: 23
  });

  // Add website arrow
  svg.addChild({
    type: 'g',
    style: {
      transform: `translate(${bound.x + bound.width + 2}px, 72px)`
    },
    children: [
      {
        type: 'path',
        d: `M5.03556 17.5363L4.04102 16.5417L14.3313 6.25141H8.32589V4.83203H16.7453V13.2514H15.3259V7.246L5.03556 17.5363Z`,
        fill: '#F2F2F2',
        opacity: 0.6
      }
    ]
  });

  // Return the SVG instance
  return svg;
}
