/** Dependencies */
import { ProfileConfig } from '../types';
import { image } from './utils';

/**
 * @brief Generate the Stacks section
 * @description This function generates the Stacks section of the profile.
 */
export function getStacksSection(config: ProfileConfig): string {
  // Generate the title image
  const title = image(
    {
      src: { light: 'generated/titles/stacks-light.svg', dark: 'generated/titles/stacks-dark.svg' },
      alt: 'Stacks'
    },
    config
  );

  // Generate the content
  return [title].join('\n\n').trim();
}
