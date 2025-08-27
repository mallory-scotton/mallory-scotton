/** Dependencies */
import * as Generators from './generators';
import fs from 'fs';
import { kebabcase } from './utils';
import { ProfileConfig } from './types';

/**
 * @brief The section titles to generates
 * @description This constant holds the titles for each section in the profile.
 */
const SECTION_TITLES = ['ABOUT ME', 'EXPERIENCE', 'PROJECTS', 'STACKS', 'FRIENDS'];

/**
 * @brief Generate SVG files from profile configuration
 * @description This function takes a profile configuration object and generates SVG files for the last updated date, links, and friends.
 * @param {ProfileConfig} config - The profile configuration object
 * @throws {Error} If the SVG generation fails
 */
export function generateSVGs(config: ProfileConfig) {
  // Remove generated folders if exists
  if (fs.existsSync('generated')) {
    fs.rmSync('generated', { recursive: true });
  }

  // Generate SVG for last updated
  Generators.updatedat2svg(config.profile.pseudo).save(`generated/last-updated.svg`);

  // Generate SVG for divider
  Generators.divider2svg().save(`generated/divider.svg`);

  // Generate SVG for legibility
  Generators.legibility2svg('For better legibility, please turn on dark mode.').save(`generated/legibility.svg`);

  // Generate SVG for profile
  Generators.profile2svg(config).save(`generated/profile.svg`);

  // Generate SVG for thanks message
  Generators.thanks2svg('Thanks for stopping by!', config.profile.signature).save(`generated/thanks.svg`);

  // Generate SVG for titles
  SECTION_TITLES.forEach((title) => {
    Generators.title2svg(title).save(`generated/titles/${kebabcase(title)}.svg`);
  });

  // Generate SVG for links
  config.links.forEach((link) => {
    Generators.link2svg(link.name).save(`generated/links/${kebabcase(link.name)}.svg`);
  });

  // Generate SVG for friends
  config.friends.forEach((friend) => {
    Generators.friend2svg(friend).save(`generated/friends/${kebabcase(friend.name)}.svg`);
  });
}
