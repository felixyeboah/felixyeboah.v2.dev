import fs from 'fs';
import path from 'path';
import { siteConfig } from '@/config/site';

// Interface for the OG image mapping
interface OGImageMapping {
  [key: string]: string;
  default: string;
}

/**
 * Get the OG image mapping from the generated file
 * Falls back to an empty mapping with just the default image if file doesn't exist
 */
function getOGImageMapping(): OGImageMapping {
  try {
    const mappingPath = path.join(process.cwd(), 'public/static/og/og-mapping.json');

    if (fs.existsSync(mappingPath)) {
      const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
      return mapping as OGImageMapping;
    }
  } catch (error) {
    console.warn('Error reading OG image mapping:', error);
  }

  // Fallback to default mapping
  return {
    default: '/static/og/default.png'
  };
}

// Cache the mapping to avoid reading from disk on every request
let ogImageMapping: OGImageMapping | null = null;

/**
 * Get the absolute URL for an OG image for a given post slug
 * @param slug The post slug (or 'default' for the default OG image)
 * @returns The absolute URL for the OG image
 */
export function getOGImageUrl(slug?: string): string {
  // Initialize the mapping if not already done
  if (!ogImageMapping) {
    ogImageMapping = getOGImageMapping();
  }

  // Use the default image if no slug provided
  const key = slug || 'default';

  // Get the image path from the mapping, fallback to default if not found
  const imagePath = ogImageMapping[key] || ogImageMapping.default;

  // Return the absolute URL
  return `${siteConfig.url}${imagePath}`;
}

/**
 * Get the OG image path for a blog post
 * @param slug The post slug
 * @returns The relative path to the OG image
 */
export function getOGImagePath(slug?: string): string {
  // Initialize the mapping if not already done
  if (!ogImageMapping) {
    ogImageMapping = getOGImageMapping();
  }

  // Use the default image if no slug provided
  const key = slug || 'default';

  // Get the image path from the mapping, fallback to default if not found
  return ogImageMapping[key] || ogImageMapping.default;
} 