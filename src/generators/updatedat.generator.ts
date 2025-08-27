/** Dependencies */
import { capitalize, SVG } from '../utils';

export function updatedat2svg(userName: string = 'Mallow'): SVG {
  // Create a new SVG instance
  const svg = new SVG(250, 20);

  // Get the current date
  const now = new Date();

  // Format date: "August 18, 2025"
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedDate = dateFormatter.format(now);

  // Format time: "17:58"
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const formattedTime = timeFormatter.format(now);

  // Combine all text elements
  const text = `Last updated by ${capitalize(userName)} on ${formattedDate}, ${formattedTime}`;

  // Add text to the SVG
  const [bound, _] = svg.addText(text, {
    fontSize: 10.3,
    lineHeight: 20,
    fontWeight: 'light',
    color: '#F2F2F2',
    opacity: 1,
    letterSpacing: 0.2,
    y: 0,
    x: 0
  });

  // Resize the SVG width to fit the text
  svg.setDimensions(Math.ceil(bound.width) + 2, 20);

  // Return the SVG instance
  return svg;
}
