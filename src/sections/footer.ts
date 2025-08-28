/** Dependencies */
import { THANKS_TEXT, UPDATED_AT_TEXT } from '../constants';
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
    alt: THANKS_TEXT,
    align: 'left',
    description: THANKS_TEXT
  }, config.profile.repository);

  // Updated at text
  const updatedAt = UPDATED_AT_TEXT(config.profile.pseudo);

  // Last updated image
  const lastUpdate = image({
    src: 'generated/last-updated.svg',
    alt: updatedAt,
    align: 'right',
    description: updatedAt
  }, config.profile.repository);

  // Return the footer section
  return `${thanks}\n\n${lastUpdate}`.trim();
}
