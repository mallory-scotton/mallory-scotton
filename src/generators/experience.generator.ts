/** Dependencies */
import { Experience } from '../types';
import { capitalize, SVG, uppercase } from '../utils';

/**
 * @brief Generate an SVG representation of a company.
 * @description This function takes a company name as input and returns an SVG representation of the company.
 * @param company - The name of the company.
 * @returns An SVG representation of the company.
 */
function company2svg(company: string, height: number): SVG {
  // Create new SVG instance
  const svg = new SVG(400, height);

  // Add company name text
  svg.addText(company.length > 3 ? capitalize(company) : uppercase(company), {
    lineHeight: 40.5,
    letterSpacing: -0.08,
    fontSize: 29.74,
    fontWeight: 'medium',
    color: '#F2F2F2'
  });

  // Return this svg
  return svg;
}

/**
 * @brief Format a work experience duration.
 * @description This function takes a start and end date and returns a formatted string representing the experience duration.
 * @param start - The start date of the experience.
 * @param end - The end date of the experience (or null for present).
 * @returns A formatted string representing the experience duration.
 */
function formatExperience(start: Date, end: Date | null): string {
  // Format a date as MM/'YY
  const formatDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/'${year}`;
  };

  // Format the experience duration
  const startStr = formatDate(start);
  const endStr = end ? formatDate(end) : 'Present';

  // Combine start and end dates
  return `${startStr} – ${endStr}`;
}

/**
 * @brief Generate an SVG representation of a work experience.
 * @description This function takes a work experience description as input and returns an SVG representation of the experience.
 * @param experience - The work experience to represent.
 * @returns An SVG representation of the work experience.
 */
export function experience2svg(experience: Experience): [SVG, SVG] {
  // Create new SVG instance
  const svg = new SVG(400, 255);

  // Add position text
  const position = `${capitalize(experience.position)}, ${experience.company.length > 3 ? capitalize(experience.company) : uppercase(experience.company)}`;
  svg.addText(position, {
    fontSize: 17.5,
    fontWeight: 'medium',
    lineHeight: 24.3,
    letterSpacing: 0.08,
    color: '#F2F2F2',
    y: 13,
    x: 0
  });

  // Add date text
  svg.addText(formatExperience(experience.start, experience.end), {
    fontWeight: 'regular',
    fontSize: 12.88,
    lineHeight: 18.2,
    letterSpacing: 0,
    color: '#F2F2F2',
    opacity: 0.4,
    x: 0,
    y: 44.28
  });

  // Add Multiline description
  const [bound, lines] = svg.addMultiLineText(experience.description, {
    fontWeight: 'light',
    lineHeight: 17.39,
    fontSize: 12.88,
    letterSpacing: 0.32,
    color: '#F2F2F2',
    opacity: 0.6,
    maxWidth: 390,
    y: 81.47,
    x: 0
  });

  // Set new height
  const height = bound.height + bound.y + 5;

  // Create company svg
  const company = company2svg(experience.company, height);

  // Set new height
  svg.setDimensions(400, height);

  // Return this svg
  return [svg, company];
}
