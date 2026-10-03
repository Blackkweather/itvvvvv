// Schema Integration for IPTV subscription page
import { organizationSchema } from './schema';
import { productSchema } from './schema';
import { breadcrumbSchema } from './schema';
import { faqSchema } from './schema';
import { videoSchema } from './schema';
import { seoMetadata } from './metadata';

interface StructuredDataItem {
  '@context'?: string;
  '@type': string;
  [key: string]: any;
}

// Generate all structured data objects
export const structuredDataObjects: StructuredDataItem[] = [
  organizationSchema,
  productSchema,
  breadcrumbSchema,
  faqSchema,
  videoSchema
];

export function getStructuredDataScriptTags() {
  return structuredDataObjects.map(data => `    <script type="application/ld+json">
    ${JSON.stringify(data, null, 2)}
  </script>`).join('\n');
}

export function getSitemapXMLScript() {
  return `  <url>
    <loc>${seoMetadata.canonical}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}
