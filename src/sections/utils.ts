/** Dependencies */
import { ImageOptions, ProfileConfig } from '../types';
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
export function image(options: ImageOptions, config: ProfileConfig): string {
  // Determine the container type and attributes
  const alignAttribute = options.align ? `align="${options.align}"` : '';
  const heightAttribute = options.height ? `height="${options.height}"` : '';
  const widthAttribute = options.width ? `width="${options.width}"` : '';
  const altAttribute = options.alt ? `alt="${options.alt}"` : '';

  // Determine the image source URL based on the configuration
  let sourceLight = '';
  let sourceDark = '';

  if (config.useRelativeFilePath) {
    // Use relative file path for the image source
    sourceLight = `./${typeof options.src === 'string' ? options.src : options.src.light}`;
    sourceDark = `./${typeof options.src === 'string' ? options.src : options.src.dark}`;
  } else {
    // Get the Username (and the repository)
    const github = parseGitHub(config.profile.repository);

    // Validate the GitHub repository information
    if (!github) {
      throw new Error(`Invalid GitHub repository URL: ${config.profile.repository}`);
    }

    // Get the source URL for the image
    sourceLight = `https://raw.githubusercontent.com/${github.user}/${github.repo ?? github.user}/output/${typeof options.src === 'string' ? options.src : options.src.light}`;
    sourceDark = `https://raw.githubusercontent.com/${github.user}/${github.repo ?? github.user}/output/${typeof options.src === 'string' ? options.src : options.src.dark}`;
  }

  // Build the attributes string
  const attributes = [alignAttribute, heightAttribute, widthAttribute, altAttribute].filter((attr) => attr).join(' ');

  // Build the indentation string
  const indent = ''.padStart((options.indent ?? 0) * 2, ' ');

  // Build the description if provided
  let description = '';
  if (options.description) {
    description =
      comment(options.description, { multiLine: options.multiLine ?? false, indent: (options.indent ?? 0) + 1 }) + '\n';
  }

  let picture = '';
  const hasUrl = options.url ? true : false;
  const indentOffset = hasUrl ? '  ' : '';

  // Build the image tag
  if (typeof options.src === 'string') {
    picture = `${indent}${indentOffset}<picture>\n${description}${indent}${indentOffset}  <img src="${sourceDark}" ${attributes} />\n${indent}${indentOffset}</picture>`;
  } else {
    picture = `${indent}${indentOffset}<picture>\n${description}${indent}${indentOffset}  <source srcset="${sourceDark}" media="(prefers-color-scheme: dark)" />\n${indent}${indentOffset}  <source srcset="${sourceLight}" media="(prefers-color-scheme: light)" />\n${indent}${indentOffset}  <img src="${sourceDark}" ${attributes} />\n${indent}</picture>`;
  }

  if (options.url) {
    return `${indent}<a href="${options.url}" target="_blank">\n${picture}\n${indent}</a>`;
  }
  return picture;
}

/**
 * @brief Generate an HTML comment
 * @description This function generates an HTML comment with the specified text.
 * @param text - The text to include in the comment.
 * @param multiLine - Whether the comment should be multi-line.
 * @returns The HTML comment as a string.
 */
export function comment(text: string, options: { multiLine?: boolean; indent?: number } = {}): string {
  // Destructure options with defaults
  const { multiLine = false, indent = 0 } = options;

  // Build the indentation string
  const indentString = ''.padStart(indent * 2, ' ');

  // Build the comment string
  if (multiLine) {
    return `${indentString}<!--\n${text
      .split('\n')
      .map((line) => `${indentString}  ${line}`)
      .join('\n')}\n${indentString}-->`;
  }

  // Single-line comment
  return `${indentString}<!-- ${text} -->`;
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
  const begin = comment(`BEGIN ${uppercase(name)}`);
  const end = comment(`END ${uppercase(name)}`);

  // Wrap the content with HTML comments
  return `${begin}\n\n${content}\n\n${end}`.trim();
}
