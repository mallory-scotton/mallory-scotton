/** Dependencies */
import { ProfileConfig } from '../types';
import { image } from './utils';

/**
 * @brief Generate the Projects section
 * @description This function generates the Projects section of the profile.
 */
export function getProjectsSection(config: ProfileConfig): string {
  // Generate the title image
  const title = image({ src: 'generated/titles/projects.svg', alt: 'Projects' }, config.profile.repository);

  // Generate the content
  return [title].join('\n\n').trim();
}
