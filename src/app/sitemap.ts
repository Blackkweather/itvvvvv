import { MetadataRoute } from 'next';

const blogPosts = [
  '4k-home-cinema-blueprint-2026',
  'cord-cutting-manifesto-2026',
  'tivimate-vs-ott-navigator-2026',
  'fix-iptv-buffering-2026',
  'av1-codec-streaming-2026',
  'cord-cutting-mistakes-2026',
  'budget-4k-home-cinema-2026',
  'smart-tv-streaming-slow-2026',
  'legal-landscape-streaming-2026',
  'international-streaming-2026',
  'ai-powered-epg-2026',
];

const staticRoutes = [
  { path: '', priority: 1.0, changefreq: 'daily' as const },
  { path: '/pricing', priority: 0.9, changefreq: 'weekly' as const },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/about', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/devices', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/setup/firestick', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/setup/android', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/setup/smart-tv', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/setup/iphone', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/setup/mag-box', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/faq', priority: 0.5, changefreq: 'monthly' as const },
  { path: '/contact', priority: 0.5, changefreq: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://streampro.space';
  const now = new Date();

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  const blogPages = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
