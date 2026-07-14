/** Dependencies */
import { ProfileConfig } from '../types';
import { image } from './utils';

/**
 * @brief Generate the Projects section
 * @description This function generates the Projects section of the profile.
 */
export function getProjectsSection(config: ProfileConfig): string {
  // Generate the title image
  const title = image(
    {
      src: { light: 'generated/titles/projects-light.svg', dark: 'generated/titles/projects-dark.svg' },
      alt: 'Projects'
    },
    config
  );

  // Generate the content
  return [title].join('\n\n').trim();
}
