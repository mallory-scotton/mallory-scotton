/** Dependencies */
import { ProfileConfig } from '../types';
import { image } from './utils';

/**
 * @brief Generate the About Me section
 * @description This function generates the About Me section of the profile.
 */
export function getAboutMeSection(config: ProfileConfig): string {
  // Generate the title image
  const title = image({ src: 'generated/titles/about-me.svg', alt: 'About Me' }, config.profile.repository);

  // Generate the content
  return [title].join('\n\n').trim();
}
