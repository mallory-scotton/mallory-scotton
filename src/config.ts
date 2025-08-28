/** Dependencies */
import Ajv from 'ajv';
import { ProfileConfig } from './types';
import fs from 'fs';

/**
 * @brief Parse a date string in "MM-YYYY" format to a Date object.
 * @description Handles valid "MM-YYYY" strings, validates format, and throws errors for invalid cases.
 * @param dateStr - The date string to parse (expected format: "MM-YYYY").
 * @returns A Date object.
 * @throws {Error} If the date string is invalid or out of range.
 */
function parseDateString(dateStr: string): Date {
  // Validate format using regex (MM-YYYY)
  const dateRegex = /^\d{2}-\d{4}$/;
  if (!dateRegex.test(dateStr)) {
    throw new Error(`Invalid date format: "${dateStr}". Expected "MM-YYYY" (e.g., "08-2025").`);
  }

  // Split the date string into month and year components
  const [monthStr, yearStr] = dateStr.split('-');
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  // Validate month (1-12) and year (reasonable range, e.g., 1900-2100)
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month in date: "${dateStr}". Month must be between 01 and 12.`);
  }
  if (year < 1900 || year > 2100) {
    throw new Error(`Invalid year in date: "${dateStr}". Year must be between 1900 and 2100.`);
  }

  // Create Date object (months are 0-indexed in JS)
  return new Date(year, month - 1, 1);
}

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

  // Parse date strings to Date objects
  (config.experiences as any[]).forEach((exp) => {
    exp.start = parseDateString(exp.start as string);
    exp.end = exp.end ? parseDateString(exp.end as string) : null;
  });

  // Return the validated configuration
  return config;
}
