import { SVGFill } from './svg';

/**
 * @brief Font weight options
 * @description This type defines the available font weight options for text elements.
 */
export type FontWeight = 'light' | 'regular' | 'medium';

/**
 * @brief Text options for SVG elements
 * @description This interface defines the text-related options for SVG elements.
 */
export interface TextOptions {
  fontSize?: number;
  fontWeight?: FontWeight;
  letterSpacing?: number;
  lineHeight: number;
  x?: number;
  y?: number;
  color: SVGFill;
  opacity?: number;
}
