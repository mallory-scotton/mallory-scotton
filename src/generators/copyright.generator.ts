/** Dependencies */
import { PreferredTheme, ProfileConfig } from '../types';
import { SVG } from '../utils';

export function copyright2svg(config: ProfileConfig, theme: PreferredTheme): SVG {
  const offsetY = 50;
  // Create a new SVG instance
  const svg = new SVG(380, 50 + offsetY);

  // Add copyright text to the SVG
  const currentYear = new Date().getFullYear();
  const copyrightText = `© ${currentYear} ${config.profile.name}. All rights reserved.`;
  svg.addText(copyrightText, {
    fontSize: 14.4,
    lineHeight: 24,
    letterSpacing: 0.2,
    color: theme === 'dark' ? '#F2F2F2' : '#121212',
    x: 0,
    y: 0 + offsetY
  });

  // Add made with love text to the SVG
  const madeWithLoveText = `Made with love and Energy Drinks (0% sugar).`;
  svg.addText(madeWithLoveText, {
    fontSize: 12.4,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: theme === 'dark' ? '#F2F2F2' : '#121212',
    x: 0,
    y: 28.5 + offsetY,
    opacity: 0.5
  });

  // Return the SVG instance
  return svg;
}
