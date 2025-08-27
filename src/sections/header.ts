/** Dependencies */
import { ProfileConfig } from '../types';
import { capitalize, kebabcase } from '../utils';
import { image } from './utils';

/**
 * @brief Generate the Header section
 * @description This function generates the Header section of the profile.
 */
export function getHeaderSection(config: ProfileConfig): string {
  // Generate the links
  const links = config.links
    .map((link) =>
      image({
        src: `generated/links/${kebabcase(link.name)}.svg`,
        align: 'right',
        alt: link.name,
        url: link.url,
        indent: 1,
        height: '56'
      }, config.profile.repository)
    )
    .join('\n');

  // Generate the profile image
  const profile = image({
    src: 'generated/profile.svg',
    alt: `${capitalize(config.profile.name)}`,
    url: config.profile.url,
    align: 'left',
    height: '56',
    indent: 1
  }, config.profile.repository);

  return `<div align="center">\n${profile}\n${links}\n</div>`.trim();
}
