/** Dependencies */
import * as Generators from './generators';
import fs from 'fs';
import { kebabcase } from './utils';
import { PreferredTheme, ProfileConfig } from './types';
import { LEGIBILITY_TEXT, THANKS_TEXT } from './constants';

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
export function generateSVGs(config: ProfileConfig, theme: PreferredTheme) {
  // Generate SVG for last updated
  Generators.updatedat2svg(config.profile.pseudo, theme).save(`generated/last-updated-${theme}.svg`);

  // Generate SVG for divider
  Generators.divider2svg(theme).save(`generated/divider-${theme}.svg`);

  // Generate SVG for legibility
  Generators.legibility2svg(LEGIBILITY_TEXT).save(`generated/legibility-${theme}.svg`);

  // Generate SVG for profile
  Generators.profile2svg(config, theme).save(`generated/profile-${theme}.svg`);

  // Generate SVG for thanks message
  Generators.thanks2svg(THANKS_TEXT, config.profile.signature[theme], theme).save(`generated/thanks-${theme}.svg`);

  // Generate SVG for titles
  SECTION_TITLES.forEach((title) => {
    Generators.title2svg(title, theme).save(`generated/titles/${kebabcase(title)}-${theme}.svg`);
  });

  // Generate SVG for hero
  Generators.hero2svg(config).save(`generated/hero-${theme}.svg`);

  // Generate SVG for links
  config.links.forEach((link) => {
    Generators.link2svg(link.name, theme).save(`generated/links/${kebabcase(link.name)}-${theme}.svg`);
  });

  // Generate SVG for friends
  config.friends.forEach((friend) => {
    Generators.friend2svg(friend, theme).save(`generated/friends/${kebabcase(friend.name)}-${theme}.svg`);
  });

  // Generate SVG for experiences and companies
  config.experiences.forEach((experience, index) => {
    // Generate SVG for experience
    const [exp, company] = Generators.experience2svg(experience, theme);
    // Save the experience and company SVGs
    exp.save(`generated/experiences/${index}-${kebabcase(experience.company)}-${theme}.svg`);
    company.save(`generated/companies/${index}-${kebabcase(experience.company)}-${theme}.svg`);
  });

  // Generate SVG for about me slides
  config.about.forEach((slide, index) => {
    Generators.aboutslide2svg(slide, index, theme).save(`generated/about/${index}-about-${theme}.svg`);
  });

  // Copy projects SVGs to the generated folder
  const projectsDirectory = 'images/projects';
  if (!fs.existsSync('generated/projects')) {
    fs.mkdirSync('generated/projects', { recursive: true });
  }
  if (fs.existsSync(projectsDirectory)) {
    const projectFiles = fs.readdirSync(projectsDirectory);
    projectFiles.forEach((file) => {
      const sourcePath = `${projectsDirectory}/${file}`;
      const destinationPath = `generated/projects/${file}`;
      fs.copyFileSync(sourcePath, destinationPath);
    });
  }
}
