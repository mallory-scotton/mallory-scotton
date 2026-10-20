/** Dependencies */
import fs from 'node:fs';
import path from 'node:path';
import { optimize } from 'svgo';
import sharp from 'sharp';

function listSVGFilesRecursively(dir: string): string[] {
  const svgFiles: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      svgFiles.push(...listSVGFilesRecursively(filePath));
    } else if (entry.isFile() && /\.svg$/i.test(entry.name)) {
      svgFiles.push(filePath);
    }
  }

  return svgFiles;
}

function printSizeMB(sizeInBytes: number): string {
  const sizeInMB = sizeInBytes / (1024 * 1024);
  return `${sizeInMB.toFixed(2)} MB`;
} 

/**
 * Recompress a single image buffer, keeping its format.
 * Returns the original buffer if the result is not smaller.
 */
async function optimizeImage(buffer: Buffer, mime: string): Promise<Buffer> {
  try {
    const img = sharp(buffer, { animated: true });
    let out: Buffer;

    switch (mime) {
      case 'png':
        out = await img.png({ compressionLevel: 9, effort: 10, palette: true }).toBuffer();
        break;
      case 'jpeg':
      case 'jpg':
        out = await img.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
        break;
      case 'webp':
        out = await img.webp({ quality: 80, effort: 6 }).toBuffer();
        break;
      default:
        return buffer;
    }

    return out.length < buffer.length ? out : buffer;
  } catch {
    return buffer;
  }
}

/**
 * Optimize every base64-embedded raster image of an SVG, keeping the images in place.
 */
async function optimizeEmbeddedImages(svg: string): Promise<string> {
  const regex = /data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/=\s]+)/gi;
  const matches = [...svg.matchAll(regex)];
  let result = svg;

  for (const match of matches) {
    const [full, mime, data] = match;
    const original = Buffer.from(data.replace(/\s+/g, ''), 'base64');
    const optimized = await optimizeImage(original, mime.toLowerCase());

    if (optimized !== original) {
      result = result.replace(full, `data:image/${mime};base64,${optimized.toString('base64')}`);
    }
  }

  return result;
}

export async function optimizeSVGs(generatedDir: string) {
  const svgFiles = listSVGFilesRecursively(generatedDir);
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of svgFiles) {
    const filePath = path.resolve(file);
    const svgContent = fs.readFileSync(filePath, 'utf-8');

    // Optimize the embedded images (kept in the SVG, just recompressed)
    const withImages = await optimizeEmbeddedImages(svgContent);

    // If the SVG content contain <style> tags, don't run svgo on it, as it may break the styles
    if (svgContent.includes('<style')) {
      console.log(`Skipping SVG markup optimization for ${file} due to <style> tag.`);
      totalOriginalSize += svgContent.length;
      totalOptimizedSize += withImages.length;
      fs.writeFileSync(filePath, withImages, 'utf-8');
      continue;
    }

    // Optimize the SVG content
    const optimizedSVG = optimize(withImages, {
      multipass: true,
      plugins: [
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeMetadata',
        'removeTitle',
        'removeDesc',
        'removeUselessDefs',
        'removeEditorsNSData',
        'removeEmptyAttrs',
        'removeHiddenElems',
        'removeEmptyText',
        'removeEmptyContainers',
        'cleanupEnableBackground',
        'convertStyleToAttrs',
        'convertColors',
        'convertPathData',
        'convertTransform',
        'removeUnknownsAndDefaults',
        'removeNonInheritableGroupAttrs',
        'removeUselessStrokeAndFill',
        'cleanupNumericValues',
        'moveElemsAttrsToGroup',
        'moveGroupAttrsToElems',
        'collapseGroups',
        // 'removeRasterImages',
        'mergePaths',
        'convertShapeToPath',
        'sortAttrs',
        'removeDimensions'
      ]
    });

    // Console log the optimization result
    console.log(`Optimized ${file}: ${svgContent.length} bytes -> ${optimizedSVG.data.length} bytes`);

    totalOriginalSize += svgContent.length;
    totalOptimizedSize += optimizedSVG.data.length;

    // Write the optimized SVG back to the file
    fs.writeFileSync(filePath, optimizedSVG.data, 'utf-8');
  }

  console.log(`Total original size: ${printSizeMB(totalOriginalSize)}`);
  console.log(`Total optimized size: ${printSizeMB(totalOptimizedSize)}`);
  console.log(`Total size reduction: ${printSizeMB(totalOriginalSize - totalOptimizedSize)}`);
}
