/** Dependencies */
import { formatUpdatedDate, capitalize } from './utils';

/**
 * @brief Legibility message
 * @description This is the message displayed for legibility.
 */
export const LEGIBILITY_TEXT = 'For better legibility, please turn on dark mode.';

/**
 * @brief Thanks message
 * @description This is the message displayed in the thanks section.
 */
export const THANKS_TEXT = 'Thanks for stopping by!';

/**
 * @brief Updated at message
 * @description This is the message displayed for the last updated at information.
 * @param userName - The name of the user who last updated the content.
 * @returns The formatted updated at message.
 */
export const UPDATED_AT_TEXT = (userName: string = 'Mallow') =>
  `Last updated by ${capitalize(userName)} on ${formatUpdatedDate(new Date())}`;
