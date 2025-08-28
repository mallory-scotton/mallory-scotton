/**
 * @brief Format a work experience duration.
 * @description This function takes a start and end date and returns a formatted string representing the experience duration.
 * @param start - The start date of the experience.
 * @param end - The end date of the experience (or null for present).
 * @returns A formatted string representing the experience duration.
 */
export function formatExperienceDate(start: Date, end: Date | null): string {
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
 * @brief Format the last updated date.
 * @description This function formats the last updated date for display.
 * @param date - The date to format.
 * @returns The formatted date string.
 */
export function formatUpdatedDate(date: Date = new Date()): string {
  // Format date: "August 18, 2025"
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedDate = dateFormatter.format(date);

  // Format time: "17:58"
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const formattedTime = timeFormatter.format(date);

  // Return the formatted date and time
  return `${formattedDate}, ${formattedTime}`;
}
