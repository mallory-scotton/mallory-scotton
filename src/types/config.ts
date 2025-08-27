/**
 * @brief Represents the profile information of a user.
 * @description This interface defines the structure for a user's profile details.
 */
export interface Profile {
  /**
   * @brief Represents the name of the user.
   * @description This is the full name of the user.
   */
  name: string;

  /**
   * @brief Represents the pseudo name of the user.
   * @description This is the pseudo name of the user.
   */
  pseudo: string;

  /**
   * @brief Represents the title of the user.
   * @description This is the job title of the user.
   */
  title: string;

  /**
   * @brief Represents the URL of the user.
   * @description This is the personal or professional website of the user.
   */
  url: string;

  /**
   * @brief Represents the signature of the user.
   * @description This is the file path to the user's signature image.
   */
  signature: string;
}

/**
 * @brief Represents a link with its name and URL.
 * @description This interface defines the structure for a link.
 */
export interface Link {
  /**
   * @brief Represents the name of the link.
   * @description This is the display name of the link.
   */
  name: string;

  /**
   * @brief Represents the URL of the link.
   * @description This is the actual URL that the link points to.
   */
  url: string;
}

/**
 * @brief Represents a friend with their contact information.
 * @description This interface defines the structure for a friend's details.
 */
export interface Friend {
  /**
   * @brief Represents the name of the friend.
   * @description This is the full name of the friend.
   * @example 'Mallory SCOTTON'
   */
  name: string;

  /**
   * @brief Represents the website of the friend.
   * @description This is the URL of the friend's personal or professional website.
   * @example 'https://www.github.com/mallory-scotton'
   */
  website: string;

  /**
   * @brief Represents the company of the friend.
   * @description This is the name of the company where the friend works.
   * @example 'Epitech'
   */
  company: string;

  /**
   * @brief Represents the title of the friend.
   * @description This is the job title of the friend.
   * @example 'Software Engineer'
   */
  title: string;
}

/**
 * @brief Represents the location of the friend.
 * @description This interface defines the structure for a friend's location details.
 */
export interface Location {
  /**
   * @brief Represents the city of the location.
   * @description This is the name of the city where the friend is located.
   * @example 'Annecy'
   */
  city: string;

  /**
   * @brief Represents the country of the location.
   * @description This is the name of the country where the friend is located.
   * @example 'France'
   */
  country: string;

  /**
   * @brief Represents the type of the location.
   * @description This indicates whether the location is hybrid, remote, or on-site.
   * @example 'remote'
   */
  type: 'hybrid' | 'remote' | 'on-site';
}

/**
 * @brief Represents the experience of the friend.
 * @description This interface defines the structure for a friend's work experience details.
 */
export interface Experience {
  /**
   * @brief Represents the name of the company.
   * @description This is the name of the company where you worked.
   * @example 'Epitech'
   */
  company: string;

  /**
   * @brief Represents your position at the company.
   * @description This is the job title or position that you held at the company.
   * @example 'Software Engineer'
   */
  position: string;

  /**
   * @brief Represents the website of the company.
   * @description This is the URL of the website of the company.
   * @example 'https://www.github.com/mallory-scotton'
   */
  website: string;

  /**
   * @brief Represents the start date of the experience.
   * @description This is the date when you started working at the company.
   * @example '2020-01-01'
   */
  start: Date;

  /**
   * @brief Represents the end date of the experience.
   * @description This is the date when you stopped working at the company.
   * @example '2022-01-01'
   */
  end: Date | null;

  /**
   * @brief Represents the description of the experience.
   * @description This is a brief overview of the contributions at the company.
   * @example 'Worked on various projects using TypeScript and Node.js'
   */
  description: string;

  /**
   * @brief Represents the location of the experience.
   * @description This is the location where you worked during the experience.
   * @example { city: 'San Francisco', country: 'USA', type: 'remote' }
   */
  location: Location;
}

/**
 * @brief Represents the profile configuration of the user.
 * @description This interface defines the structure for the user's profile configuration.
 */
export interface ProfileConfig {
  /**
   * @brief Represents the profile information of the user.
   * @description This is the user's profile details.
   */
  profile: Profile;

  /**
   * @brief Represents the work experience of the user.
   * @description This is an array of the user's work experience details.
   */
  experiences: Experience[];

  /**
   * @brief Represents the friends of the user.
   * @description This is an array of the user's friends' details.
   */
  friends: Friend[];

  /**
   * @brief Represents the links of the user.
   * @description This is an array of the user's links (e.g., social media, portfolio).
   */
  links: Link[];
}
