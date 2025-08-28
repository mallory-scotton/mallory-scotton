/** Dependencies */
import { Friend, ProfileConfig } from '../types';
import { capitalize, kebabcase, stripDomain } from '../utils';
import { image } from './utils';

/**
 * @brief Generate the Friends section
 * @description This function generates the Friends section of the profile.
 */
export function getFriendsSection(config: ProfileConfig): string {
  // Create friend trios
  const trios = config.friends.reduce(
    (acc, friend, index) => {
      if (index % 3 === 0) {
        acc.push([friend]);
      } else {
        acc[acc.length - 1].push(friend);
      }
      return acc;
    },
    [] as Array<Array<Friend>>
  );

  // Generate the friends section
  const friendsSection = trios.map((trio) => {
    // Generate images for each friend in the trio
    const images = trio
      .map((friend) =>
        image(
          {
            src: `generated/friends/${kebabcase(friend.name)}.svg`,
            width: '33%',
            url: friend.website,
            indent: 1,
            alt: capitalize(friend.name),
            description: `${capitalize(friend.name)}\n${capitalize(friend.title)} — ${capitalize(friend.company)}\n${stripDomain(friend.website)} ->`,
            multiLine: true
          },
          config.profile.repository
        )
      )
      .join('\n');
    // Wrap images in a div
    return `<div>\n${images}\n</div>`;
  });

  // Generate the title image
  const title = image(
    {
      src: 'generated/titles/friends.svg',
      alt: 'Friends'
    },
    config.profile.repository
  );

  // Return the friends section
  return [title, ...friendsSection].join('\n\n<br>\n\n').trim();
}
