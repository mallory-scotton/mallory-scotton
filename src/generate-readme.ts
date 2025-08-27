/** Dependencies */
import fs from 'fs';
import { ProfileConfig } from './types';
import { capitalize, WATERMARK } from './utils';
import * as sections from './sections';
import { encapsulateSection, image } from './sections/utils';

/**
 * @brief Generates a README file for the project
 * @description This function creates a README.md file in the root directory
 * @param config - The profile configuration object
 */
export function generateReadme(config: ProfileConfig) {
  // Prepare content
  let content = fs.readFileSync('README.TEMPLATE', 'utf-8');

  const tokens = {
    'WATERMARK': WATERMARK,
    'LEGIBILITY': image({ src: 'generated/legibility.svg' }),
    'HEADER': sections.getHeaderSection(config),
    'HERO': image({ src: 'generated/hero.svg', alt: `${capitalize(config.profile.pseudo)}'s Hero Image` }),
    'ABOUT-ME': sections.getAboutMeSection(config),
    'EXPERIENCE': sections.getExperienceSection(config),
    'PROJECTS': sections.getProjectsSection(config),
    'STACKS': sections.getStacksSection(config),
    'FRIENDS': sections.getFriendsSection(config),
    'FOOTER': sections.getFooterSection(config),
    'DIVIDER': image({ src: 'generated/divider.svg', alt: '---', width: '100%' })
  };

  // Replace the sections
  for (const [key, value] of Object.entries(tokens)) {
    content = content.replace(new RegExp(`{{${key}}}`, 'g'), encapsulateSection(value, key));
  }

  // Get the list of remaining token to replace
  const remainingTokens = content.match(/{{(.*?)}}/g) || [];

  // Warn if there are any remaining tokens
  if (remainingTokens.length > 0) {
    console.warn(`The following tokens were not replaced: ${remainingTokens.join(', ')}`);
  }

  // Save the README
  fs.writeFileSync('README.md', content, 'utf-8');
}
