/**
 * @brief SVG Type
 * @description Represents the type of an SVG element.
 */
export type SVGType =
  | 'g'
  | 'svg'
  | 'path'
  | 'rect'
  | 'circle'
  | 'line'
  | 'polyline'
  | 'polygon'
  | 'stop'
  | 'style'
  | 'defs'
  | 'filter'
  | 'feFlood'
  | 'feColorMatrix'
  | 'feOffset'
  | 'feGaussianBlur'
  | 'feComposite'
  | 'feColorMatrix'
  | 'feBlend'
  | 'feBlend'
  | 'image'
  | 'pattern'
  | 'use';

/**
 * @brief SVG Fill
 * @description Represents the fill color of an SVG element.
 */
export type SVGFill =
  | `#${string}`
  | `rgb(${number}, ${number}, ${number})`
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | 'none';

/**
 * @brief SVG Base
 * @description Represents the base properties of an SVG element.
 */
export type SVGBase = {
  style?: Partial<CSSStyleDeclaration>;
  children?: SVGObject[];
  fill?: SVGFill;
  opacity?: number;
  id?: string;
};

/**
 * @brief SVG Object
 * @description Represents an SVG element with its properties.
 */
export type SVGObject =
  | (SVGBase & {
      'type': 'svg';
      'width': number;
      'height': number;
      'xmlns': 'http://www.w3.org/2000/svg';
      'xmlns:xlink'?: 'http://www.w3.org/1999/xlink';
      'viewBox': `${number} ${number} ${number} ${number}`;
    })
  | (SVGBase & {
      type: 'path';
      d: string;
    })
  | (SVGBase & {
      type: 'rect';
      x?: number;
      y?: number;
      width: number;
      height: number;
      transform?: string;
    })
  | (SVGBase & {
      type: 'g';
      filter?: string;
    })
  | (SVGBase & {
      type: 'circle';
      cx: number;
      cy: number;
      r: number;
    })
  | (SVGBase & {
      type: 'line';
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    })
  | (SVGBase & {
      type: 'polygon' | 'polyline';
      points: string;
    })
  | (SVGBase & {
      type: 'stop';
      offset: string;
      stopColor: string;
    })
  | (SVGBase & {
      type: 'style';
      content: string;
    })
  | (SVGBase & {
      type: 'defs';
    })
  | (SVGBase & {
      'type': 'filter';
      'x': number;
      'y': number;
      'width': number;
      'height': number;
      'filterUnits'?: string;
      'color-interpolation-filters'?: string;
    })
  | (SVGBase & {
      type:
        | 'feFlood'
        | 'feOffset'
        | 'feGaussianBlur'
        | 'feComposite'
        | 'feColorMatrix'
        | 'feBlend'
        | 'pattern'
        | 'image'
        | 'use';
      [key: string]: any;
    });
