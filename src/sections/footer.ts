/** Dependencies */
import { ProfileConfig } from '../types';
import { image } from './utils';

/**
 * @brief Generate the Footer section
 * @description This function generates the Footer section of the profile.
 */
export function getFooterSection(config: ProfileConfig): string {
  // Thank you image
  const thanks = image({
    src: 'generated/thanks.svg',
    alt: 'Thanks for stopping by !',
    align: 'left'
  });

  // Last updated image
  const lastUpdate = image({
    src: 'generated/last-updated.svg',
    alt: 'Last Update',
    align: 'right'
  });

  // Return the footer section
  return `${thanks}\n\n${lastUpdate}`.trim();
}
