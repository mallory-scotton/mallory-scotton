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
  const thanks = image(
    {
      src: { light: 'generated/thanks-light.svg', dark: 'generated/thanks-dark.svg' },
      alt: THANKS_TEXT,
      align: 'left',
      description: THANKS_TEXT
    },
    config
  );

  // Footer link image
  const footerLinks = image(
    {
      src: { light: 'generated/footer-link-light.svg', dark: 'generated/footer-link-dark.svg' },
      alt: 'Footer Link',
      align: 'right',
      description: 'Footer Link'
    },
    config
  );

  // Copyright image
  const copyright = image(
    {
      src: { light: 'generated/copyright-light.svg', dark: 'generated/copyright-dark.svg' },
      alt: `© ${new Date().getFullYear()} ${config.profile.name}. All rights reserved.`,
      align: 'left',
      description: `© ${new Date().getFullYear()} ${config.profile.name}. All rights reserved.`
    },
    config
  );

  // Updated at text
  const updatedAt = UPDATED_AT_TEXT(config.profile.pseudo);

  // Last updated image
  const lastUpdate = image(
    {
      src: { light: 'generated/last-updated-light.svg', dark: 'generated/last-updated-dark.svg' },
      alt: updatedAt,
      align: 'right',
      description: updatedAt
    },
    config
  );

  // Return the footer section
  return [
    ['<div>', thanks, footerLinks, '</div>'].join('\n\n'),
    ['<div>', copyright, lastUpdate, '</div>'].join('\n\n'),
    ''
  ].join('\n\n<br>\n\n');
}
