/** Dependencies */
import { ProfileConfig } from '../types';
import { image } from './utils';

/**
 * @brief Generate a single about me slide
 * @description This function generates a single about me slide based on the provided index.
 * It returns the HTML string for the slide, or null if the index is out of bounds.
 * @param config - The profile configuration containing the about me slides.
 * @param index - The index of the slide to generate.
 * @returns The HTML string for the slide, or null if the index is out of bounds.
 */
function generateSlide(config: ProfileConfig, index: number): string | null {
  // Verify that the index is within the bounds of the about slides
  if (index >= config.about.length) {
    return null;
  }

  // Get the current slide configuration
  const current = config.about[index];

  // Generate the slide image
  const slide = image(
    {
      src: {
        light: `generated/about/${index}-about-light.svg`,
        dark: `generated/about/${index}-about-dark.svg`
      },
      align: index % 2 === 1 ? 'left' : 'right',
      alt: current.title,
      description: `${current.title}${current.description ? '\n' : ''}${(current.description || '')
        .replace(/\n\n/g, '\n')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line)
        .join('\n')}`,
      multiLine: true,
      indent: 1
    },
    config
  );

  // Return the slide
  return slide;
}

/**
 * @brief Generate the About Me section
 * @description This function generates the About Me section of the profile.
 */
export function getAboutMeSection(config: ProfileConfig): string {
  // Generate the title image
  const title = image(
    {
      src: { light: 'generated/titles/about-me-light.svg', dark: 'generated/titles/about-me-dark.svg' },
      alt: 'About Me'
    },
    config
  );

  // Generate the about me slides
  const slides: string[] = [];
  for (let i = 0; i < config.about.length; i += 2) {
    let leftSlide: string | null = generateSlide(config, i + 1);
    let rightSlide: string | null = generateSlide(config, i);
    slides.push(`<div align="center">\n${[leftSlide, rightSlide].filter(Boolean).join('\n')}\n</div>`);
  }

  // Generate the content
  return [title, ...slides].join('\n\n<br>\n<br>\n\n').trim();
}
