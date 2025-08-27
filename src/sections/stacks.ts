/** Dependencies */
import { ProfileConfig } from '../types';
import { image } from './utils';

/**
 * @brief Generate the Stacks section
 * @description This function generates the Stacks section of the profile.
 */
export function getStacksSection(config: ProfileConfig): string {
  // Generate the title image
  const title = image({ src: 'generated/titles/stacks.svg', alt: 'Stacks' }, config.profile.repository);

  // Generate the content
  return [title].join('\n\n').trim();
}
