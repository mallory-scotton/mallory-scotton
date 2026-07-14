/** Dependencies */
import { loadConfig } from './config';
import { generateSVGs } from './generate-svgs';
import { generateReadme } from './generate-readme';
import process from 'node:process';
import fs from 'node:fs';

/**
 * @brief Main entry point for the application
 * @description This function loads the configuration and generates the SVGs.
 * @returns {Promise<void>} A promise that resolves when the SVGs have been generated
 */
async function main() {
  try {
    // Load configuration
    const config = await loadConfig();

    // Remove generated folders if exists
    if (fs.existsSync('generated')) {
      fs.rmSync('generated', { recursive: true });
    }

    // Generate SVGs
    generateSVGs(config, 'light');
    generateSVGs(config, 'dark');

    // Generate README
    generateReadme(config);

    // Exit process
    process.exit(0);
  } catch (error) {
    // Log error
    console.error('Error generating profile:', error);

    // Exit process with failure
    process.exit(1);
  }
}

/** Main entry point for the application */
main();
