/** Dependencies */
import { ImageOptions } from '../types';
import { uppercase } from '../utils';

/**
 * @brief Parse a GitHub URL or shorthand into user and repository information.
 * @param input - The GitHub URL or shorthand to parse.
 * @returns An object containing the user and optional repository name, or null if parsing fails.
 */
function parseGitHub(input: string): { user: string; repo?: string } | null {
  const regex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/\s]+)(?:\/([^\/\s]+))?/i;
  const shorthand = /^\/?([^\/\s]+)(?:\/([^\/\s]+))?/;

  let match = input.match(regex);
  if (!match) {
    match = input.match(shorthand);
  }

  if (match) {
    return { user: match[1], repo: match[2] };
  }
  return null;
}

/**
 * @brief Generate an HTML image element
 * @description This function generates an HTML image element with the specified options.
 * @param options - The options for the image element.
 * @param repository - The URL of the user's code repository.
 * @returns The HTML string for the image element.
 */
export function image(options: ImageOptions, repository: string): string {
  // Determine the container type and attributes
  const containerType = options.url ? 'a' : 'picture';
  const containerAttributes = options.url ? ` href="${options.url}" target="_blank"` : '';
  const alignAttribute = options.align ? `align="${options.align}"` : '';
  const heightAttribute = options.height ? `height="${options.height}"` : '';
  const widthAttribute = options.width ? `width="${options.width}"` : '';
  const altAttribute = options.alt ? `alt="${options.alt}"` : '';

  // Get the Username (and the repository)
  const github = parseGitHub(repository);

  // Validate the GitHub repository information
  if (!github) {
    throw new Error(`Invalid GitHub repository URL: ${repository}`);
  }

  // Get the source URL for the image
  const source = `https://raw.githubusercontent.com/${github.user}/${github.repo ?? github.user}/output/${options.src}`

  // Build the attributes string
  const attributes = [alignAttribute, heightAttribute, widthAttribute, altAttribute].filter((attr) => attr).join(' ');

  // Build the indentation string
  const indent = ''.padStart((options.indent ?? 0) * 2, ' ');

  // Build the image tag
  return `${indent}<${containerType}${containerAttributes}>\n${indent}  <img src="${source}" ${attributes} />\n${indent}</${containerType}>`;
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
