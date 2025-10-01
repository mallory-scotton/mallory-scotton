/** Dependencies */
import { ProfileConfig } from '../types';
import { SVG } from '../utils';
import { ShineMove, UpDown } from '../animations';

/**
 * @brief Generates an SVG representation of a hero section.
 * @description This function takes a ProfileConfig object and generates an SVG image
 * representing the hero section, including a background and user image.
 * @param config - The profile configuration object containing user details.
 * @returns An SVG representation of the hero section.
 */
export function hero2svg(config: ProfileConfig): SVG {
  // Create SVG
  const svg = new SVG(1440, 908);

  // Add Image
  const image = svg.addImage(config.hero.background, 2568, 1816);

  // Add pattern for the image
  const imagePattern = svg.addPattern({
    type: 'pattern',
    width: 1,
    height: 1,
    patternContentUnits: 'objectBoundingBox',
    children: [
      {
        'type': 'use',
        'xlink:href': `#${image.id!}`,
        'transform': 'scale(0.000389408 0.000550661)'
      }
    ]
  });

  // Create Shine Clip Paths
  const shineGroupClipPath = svg.addClipPath({
    type: 'rect',
    width: 1044,
    height: 672,
    fill: 'white',
    transform: 'translate(198 90)'
  });
  const shineContainerClipPath = svg.addClipPath({
    type: 'rect',
    width: 1026,
    height: 1299.94,
    fill: 'white',
    transform: 'translate(1139.45 -543) rotate(15)'
  });

  // Add Image Rectangle
  svg.addChild({
    type: 'rect',
    x: 78,
    width: 1284,
    height: 908,
    fill: `url(#${imagePattern.id})`
  });

  // Add Text
  svg.addText(config.hero.title, {
    fontSize: 21.6,
    lineHeight: 33.6,
    fontWeight: 'medium',
    letterSpacing: 0,
    x: 666 + 78,
    y: 486,
    color: '#F2F2F2',
    opacity: 1
  });

  // Add Text
  svg.addText(config.hero.subtitle, {
    fontSize: 21.6,
    lineHeight: 33.6,
    fontWeight: 'regular',
    letterSpacing: 0,
    x: 666 + 78,
    y: 520,
    color: '#F2F2F2',
    opacity: 0.5
  });

  // Create Shine Group
  const shineGroup = svg.addChild({
    'type': 'g',
    'clip-path': `url(#${shineGroupClipPath.id})`,
    'children': [
      {
        'type': 'g',
        'clip-path': `url(#${shineContainerClipPath.id})`,
        'opacity': 0.1,
        'children': [
          {
            'type': 'rect',
            'width': 1026,
            'height': 1299.94,
            'fill': 'white',
            'transform': 'translate(1139.45 -543) rotate(15)',
            'fill-opacity': 0.01
          },
          {
            type: 'rect',
            width: 40,
            height: 1299.94,
            fill: 'white',
            transform: 'translate(1139.45 -543) rotate(15)'
          },
          {
            type: 'rect',
            width: 96,
            height: 1299.94,
            fill: 'white',
            transform: 'translate(1216.72 -522.294) rotate(15)'
          }
        ]
      }
    ]
  });

  // Add Arrow
  const arrow = svg.addChild({
    type: 'g',
    opacity: 0.4,
    children: [
      {
        type: 'path',
        d: 'M720 670.487L706 656.487L708.1 654.387L718.5 664.787V630.487H721.5V664.787L731.9 654.387L734 656.487L720 670.487Z',
        fill: '#F2F2F2'
      }
    ]
  });

  // Add Shine Animation
  svg.addAnimation(shineGroup.children?.[0].id!, ShineMove, {
    duration: 4e3,
    easing: 'linear',
    iterationCount: 'infinite'
  });

  // Add Arrow Animation
  svg.addAnimation(arrow.id!, UpDown, {
    duration: 2e3,
    easing: 'linear',
    iterationCount: 'infinite'
  });

  // Return the SVG
  return svg;
}
