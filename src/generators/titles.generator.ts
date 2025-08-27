/** Dependencies */
import { SVG, uppercase } from '../utils';
import { SVGObject } from '../types';

/**
 * @brief SVG filter for dot effect
 * @description This filter applies a dot effect to the SVG elements.
 */
const DOT_FILTER: SVGObject = {
  'type': 'filter',
  'x': 0,
  'y': 0,
  'width': 50,
  'height': 50,
  'filterUnits': 'userSpaceOnUse',
  'color-interpolation-filters': 'sRGB',
  'children': [
    {
      'type': 'feFlood',
      'flood-opacity': 0,
      'result': 'BackgroundImageFix'
    },
    {
      type: 'feColorMatrix',
      Type: 'matrix',
      in: 'SourceAlpha',
      values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0',
      result: 'hardAlpha'
    },
    {
      type: 'feOffset'
    },
    {
      type: 'feGaussianBlur',
      stdDeviation: 10
    },
    {
      type: 'feComposite',
      in2: 'hardAlpha',
      operator: 'out'
    },
    {
      type: 'feColorMatrix',
      Type: 'matrix',
      values: '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'
    },
    {
      type: 'feBlend',
      mode: 'normal',
      in2: 'BackgroundImageFix',
      result: 'effect1_dropShadow_2021_68'
    },
    {
      type: 'feBlend',
      mode: 'normal',
      in: 'SourceGraphic',
      in2: 'effect1_dropShadow_2021_68',
      result: 'shape'
    }
  ]
};

/**
 * @brief Generate SVG for section title
 * @description This function creates an SVG representation of a section title.
 * @param {string} title - The title of the section
 * @returns {SVG} The generated SVG element
 */
export function title2svg(title: string): SVG {
  // Create a new SVG element
  const svg = new SVG(112, 50);

  // Add the dot filter to the SVG
  const filter = svg.addFilter(DOT_FILTER);

  // Add dot group
  svg.addChild({
    type: 'g',
    filter: `url(#${filter.id})`,
    children: [
      {
        type: 'path',
        d: 'M20 25C20 22.2386 22.2386 20 25 20C27.7614 20 30 22.2386 30 25C30 27.7614 27.7614 30 25 30C22.2386 30 20 27.7614 20 25Z',
        fill: '#F2F2F2'
      }
    ]
  });

  // Add title text
  const [bound, _] = svg.addText(uppercase(title), {
    fontSize: 11.2,
    fontWeight: 'medium',
    lineHeight: 19,
    letterSpacing: 1.5,
    opacity: 0.4,
    color: '#F2F2F2',
    x: 42,
    y: 16.5
  });

  // Resize SVG to fit content
  svg.setDimensions(45 + bound.width, 50);

  // Return the generated SVG element
  return svg;
}
