/** Dependencies */
import Ajv from 'ajv';
import { ProfileConfig } from './types';
import fs from 'fs';

/**
 * @brief Load and validate the profile configuration
 * @description This function loads the profile configuration from a JSON file and validates it against a JSON schema.
 * @returns {Promise<ProfileConfig>} The validated profile configuration
 * @throws {Error} If the configuration is invalid
 */
export async function loadConfig(): Promise<ProfileConfig> {
  // Load and parse the JSON schema
  const schema = JSON.parse(fs.readFileSync('config.schema.json', 'utf-8'));

  // Initialize Ajv for JSON schema validation
  const ajv = new Ajv();
  const validate = ajv.compile<ProfileConfig>(schema);

  // Load and parse the data
  const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

  // Validate the data against the schema
  const isValid = validate(config);
  if (!isValid) {
    throw new Error(`Invalid configuration: ${JSON.stringify(validate.errors)}`);
  }

  // Return the validated configuration
  return config;
}
