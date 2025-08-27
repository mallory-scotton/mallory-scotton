/** Dependencies */
import { ProfileConfig } from '../types';
import { image } from './utils';

/**
 * @brief Generate the Experience section
 * @description This function generates the Experience section of the profile.
 */
export function getExperienceSection(config: ProfileConfig): string {
  // Generate the title image
  const title = image({ src: 'generated/titles/experience.svg', alt: 'Experience' }, config.profile.repository);

  // Generate the content
  return [title].join('\n\n').trim();
}
