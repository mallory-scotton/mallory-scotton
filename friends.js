// Dependencies
const fs = require('fs');
const opentype = require('opentype.js');

// Load the Inter font family
const Inter = {
    light: opentype.loadSync('fonts/Inter-Light.ttf'),
    regular: opentype.loadSync('fonts/Inter-Regular.ttf'),
    medium: opentype.loadSync('fonts/Inter-Medium.ttf')
};

/**
 * @brief Capitalizes the first letter of each word in a string.
 * @description This function takes a string and returns a new string with the first letter of each word capitalized.
 * @param {string} name - The input string to capitalize.
 * @returns {string} - The capitalized string.
 */
function capitalize(str) {
    const words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(' ');
}

/**
 * @brief Fills an SVG element with a specified color.
 * @description This function takes an SVG element as a string and a color, and returns a new string with the element filled with the specified color.
 * @param {string} element - The SVG element to fill.
 * @param {string} color - The color to fill the element with.
 * @param {number} [opacity=1] - The opacity of the fill color (0 to 1).
 * @returns {string} - The filled SVG element.
 */
function fill(element, color, opacity = 1) {
    let opacityValue = opacity < 1 ? ` fill-opacity="${opacity}" ` : '';
    return element.replace('/>', ` fill="${color}"${opacityValue}/>`);
}

/**
 * @brief Generates an SVG representation of a friend's information.
 * @description This function takes a friend's name, title, company, and website, and returns an SVG representation of their information.
 * @param {string} name - The name of the friend.
 * @param {string} title - The title of the friend.
 * @param {string} company - The company of the friend.
 * @param {string} website - The website of the friend.
 * @returns {string} - The SVG representation of the friend's information.
 */
function generateFriendSVG(name, title, company, website) {
    // Generate the SVG representation of the friend's name
    const namePath = Inter.medium.getPath(capitalize(name), 0, 24, 21.6, { letterSpacing: 0.01 });
    const nameSVG = namePath.toSVG();

    // Generate the SVG representation of the friend's title and company
    const infoPath = Inter.light.getPath(`${capitalize(title)} — ${capitalize(company)}`, 0, 52.75, 16.5, { letterSpacing: 0.05 });
    const infoSVG = infoPath.toSVG();

    // Generate the SVG representation of the friend's website
    const websPath = Inter.regular.getPath(website, 0, 86.75, 15.6, { letterSpacing: 0.02 });
    const websSVG = websPath.toSVG();

    // Generate the final SVG
    const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="327" height="97" viewBox="0 0 327 97" fill="none">
    <g transform="translate(${websPath.getBoundingBox().x2},72)">
        <path d="M5.03556 17.5363L4.04102 16.5417L14.3313 6.25141H8.32589V4.83203H16.7453V13.2514H15.3259V7.246L5.03556 17.5363Z" fill="#F2F2F2"/>
    </g>
    ${fill(nameSVG, '#F2F2F2')}
    ${fill(infoSVG, '#F2F2F2', 0.4)}
    ${fill(websSVG, '#F2F2F2')}
</svg>
`;

    // Write the SVG file
    return SVG;
}

/**
 * @brief Converts a friend's information into an SVG representation.
 * @description This function takes a friend's name, title, company, and website, and returns an SVG representation of their information.
 * @param {string} name - The name of the friend.
 * @param {string} title - The title of the friend.
 * @param {string} company - The company of the friend.
 * @param {string} website - The website of the friend.
 */
function friendToSVG(name, title, company, website) {
    // Generate the SVG representation of the friend's information
    const friend = generateFriendSVG(name, title, company, website);

    // Generate a filename for the SVG
    const filename = name.replace(/\s/g, '-').toLowerCase();

    // Create the generated directory if it doesn't exist
    if (fs.existsSync('generated/friends') === false) {
        fs.mkdirSync('generated/friends', { recursive: true });
    }

    // Check if the SVG file already exists
    if (fs.existsSync(`generated/friends/${filename}.svg`)) {
        console.log(`SVG file for ${name} already exists.`);
        return;
    }

    // Write the SVG file
    fs.writeFileSync(`generated/friends/${filename}.svg`, friend, 'utf8', (err) => {
        if (err) {
            console.error("Error writing SVG file:", err);
        } else {
            console.log("SVG file written successfully.");
        }
    });
}

// Read the FRIENDS.json file and generate SVGs for each friend
const rawFriends = fs.readFileSync('FRIENDS.json', 'utf-8');
const friends = JSON.parse(rawFriends);

// Generate SVGs for each friend
for (const friend of friends) {
    friendToSVG(friend.name, friend.title, friend.company, friend.website);
}
