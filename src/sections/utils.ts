/** Dependencies */
import { ImageOptions } from '../types';
import { uppercase } from '../utils';

/**
 * @brief Generate an HTML image element
 * @description This function generates an HTML image element with the specified options.
 * @param options - The options for the image element.
 * @returns The HTML string for the image element.
 */
export function image(options: ImageOptions): string {
  // Determine the container type and attributes
  const containerType = options.url ? 'a' : 'picture';
  const containerAttributes = options.url ? ` href="${options.url}" target="_blank"` : '';
  const alignAttribute = options.align ? `align="${options.align}"` : '';
  const heightAttribute = options.height ? `height="${options.height}"` : '';
  const widthAttribute = options.width ? `width="${options.width}"` : '';
  const altAttribute = options.alt ? `alt="${options.alt}"` : '';

  // Build the attributes string
  const attributes = [alignAttribute, heightAttribute, widthAttribute, altAttribute].filter((attr) => attr).join(' ');

  // Build the indentation string
  const indent = ''.padStart((options.indent ?? 0) * 2, ' ');

  // Build the image tag
  return `${indent}<${containerType}${containerAttributes}>\n${indent}  <img src="${options.src}" ${attributes} />\n${indent}</${containerType}>`;
}

/**
 * @brief Encapsulate a section of content with HTML comments
 * @description This function wraps the given content with HTML comments for easy identification.
 * @param content - The content to encapsulate.
 * @param name - The name of the section.
 * @returns The encapsulated content.
 */
export function encapsulateSection(content: string, name: string): string {
  // Special case WATERMARK or DIVIDER section
  if (name === 'WATERMARK' || name === 'DIVIDER') {
    return content;
  }

  // General case
  const begin = `<!-- BEGIN ${uppercase(name)} -->`;
  const end = `<!-- END ${uppercase(name)} -->`;

  // Wrap the content with HTML comments
  return `${begin}\n\n${content}\n\n${end}`.trim();
}
