/** Dependencies */
import { SVG, capitalize } from '../utils';
import { UpDown } from '../animations';
import { PreferredTheme } from '../types';

export function link2svg(name: string, theme: PreferredTheme) {
  // Create a new SVG canvas with specified dimensions
  const svg = new SVG(207, 96);

  // Create the palette
  const isDarkTheme = theme === 'dark';
  const palette = {
    primary: isDarkTheme ? 'white' : 'black',
    secondary: isDarkTheme ? '#F2F2F2' : '#121212'
  };

  // Add text to the SVG
  const [bound, _] = svg.addText(name, {
    fontWeight: 'medium',
    fontSize: 25.6,
    letterSpacing: 0.4,
    y: 30,
    x: 32,
    opacity: 1,
    lineHeight: 36,
    color: palette.secondary
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
        fill: palette.secondary
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
