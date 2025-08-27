/** Dependencies */
import fs from 'fs';
import path from 'path';
import { imageSize } from 'image-size';
import { ISizeCalculationResult } from 'image-size/dist/types/interface';

/**
 * @brief The directory where images are stored.
 * @description This is the directory where images are stored.
 */
export const TEMP_DIR = path.join(__dirname, '../../temp');

/**
 * @brief Converts an image file to a Data URL.
 * @description This function reads an image file and converts it to a Data URL.
 * @param filePath - The path to the image file.
 * @returns The Data URL of the image.
 * @throws Error if the image file cannot be read.
 */
export function imageToDataURL(filePath: string): { data: string; dimensions: ISizeCalculationResult } {
  // Get image file extension and MIME type
  const extension = path.extname(filePath).slice(1);
  const mimeType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;

  // Read image file
  const imageData = fs.readFileSync(filePath);

  // Get image dimensions
  const dimensions = imageSize(imageData);

  // Convert image data to base64
  const base64 = imageData.toString('base64');

  // Return Data URL and dimensions
  return { data: `data:${mimeType};base64,${base64}`, dimensions };
}
