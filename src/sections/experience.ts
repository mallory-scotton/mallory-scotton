/** Dependencies */
import { ProfileConfig } from '../types';
import { capitalize, kebabcase, uppercase, formatExperienceDate } from '../utils';
import { image } from './utils';

/**
 * @brief Generate the Experience section
 * @description This function generates the Experience section of the profile.
 */
export function getExperienceSection(config: ProfileConfig): string {
  // Generate the title image
  const title = image({ src: 'generated/titles/experience.svg', alt: 'Experience' }, config.profile.repository);

  const experiences = config.experiences.map((experience, index) => {
    // Generate a unique ID for the experience
    const id = `${index}-${kebabcase(experience.company)}`;

    // Get the company name and experience information
    const companyName = experience.company.length > 3 ? capitalize(experience.company) : uppercase(experience.company);
    const experienceInfo = `${capitalize(experience.position)}, ${companyName}\n${formatExperienceDate(experience.start, experience.end)}\n${experience.description}`;

    // Generate the company image
    const company = image(
      {
        src: `generated/companies/${id}.svg`,
        url: experience.website,
        align: 'left',
        alt: experience.company,
        indent: 1,
        description: companyName
      },
      config.profile.repository
    );

    // Generate the experience description image
    const description = image(
      {
        src: `generated/experiences/${id}.svg`,
        alt: capitalize(experience.position),
        indent: 1,
        align: 'right',
        description: experienceInfo,
        multiLine: true
      },
      config.profile.repository
    );

    // Return the experience section
    return `<div align="center">\n${company}\n${description}\n</div>`;
  });

  // Generate the content
  return [title, ...experiences].join('\n\n<br>\n<br>\n\n').trim();
}
