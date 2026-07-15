/** Dependencies */
import { ProfileConfig } from '../types';
import { image } from './utils';

/**
 * @brief Generate the Projects section
 * @description This function generates the Projects section of the profile.
 */
export function getProjectsSection(config: ProfileConfig): string {
  // Generate the title image
  const title = image(
    {
      src: { light: 'generated/titles/projects-light.svg', dark: 'generated/titles/projects-dark.svg' },
      alt: 'Projects'
    },
    config
  );

  const showcase = config.projects.map((project) => {
    return [
      image(
        {
          src: project.src.replace('file://', ''),
          url: project.url,
          alt: project.name,
          description: [project.name, project.description].join('\n'),
          multiLine: true
        },
        config
      ),
      '\n<br>\n'
    ]
      .join('\n')
      .trim();
  });

  // Generate the content
  return [title, ...showcase].join('\n\n').trim();
}
