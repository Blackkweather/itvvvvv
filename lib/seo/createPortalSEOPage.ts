// Portal SEO Page Generator for Programmatic IPTV Content
// This creates high-impact landing pages for various markets and keyword variants

export const portalSEOConfig = {
  market_config: [
    {
      market_code: 'us',
      country: 'United States',
      currency: 'USD',
      trial_days: 7
    },
    {
      market_code: 'gb',
      country: 'United Kingdom',
      currency: 'GBP',
      trial_days: 7
    },
    {
      market_code: 'de',
      country: 'Germany',
      currency: 'EUR',
      trial_days: 7
    },
    {
      market_code: 'es',
      country: 'Spain',
      currency: 'EUR',
      trial_days: 7
    },
    {
      market_code: 'fr',
      country: 'France',
      currency: 'EUR',
      trial_days: 7
    },
    {
      market_code: 'br',
      country: 'Brazil',
      currency: 'BRL',
      trial_days: 7
    },
    {
      market_code: 'mx',
      country: 'Mexico',
      currency: 'MXN',
      trial_days: 30
    }
  ],
  keyword_variants: [
    'best iptv subscription plan for live tv and sports',
    'best iptv subscription live tv sports 2026',
    'best iptv sports subscription plan 2026',
    'best iptv live tv sports subscription',
    'best iptv subscriptions for live tv and sports',
    'best iptv sports packages 2026',
    'best iptv live tv sports package'
  ],
  page_templates: {
    hero_title: (keyword: string, market: string) => `${keyword} - ${market}`,
    hero_description: (keyword: string, market: string) => `Upgrade to our ${market}‑approved live‑TV and sports offerings. Our packages include global channels, 4K support, and multi‑device compatibility.`,
    feature_points: [
      'Global channels from major networks worldwide',
      '4K UHD quality streaming with minimal buffering',
      'Multi-device support (Smart TV, Fire TV, Chromecast, Android, iOS, Windows, macOS, Linux)',
      'Live sports coverage (football, basketball, MMA, boxing, F1, NHL, MLB, NBA)',
      '24/7 customer support via WhatsApp, email, and live chat',
      'Free installation guides for all platforms'
    ],
    social_proof: [
      '50,000+ satisfied customers worldwide',
      '4.8/5 average customer rating',
      '30-day money-back guarantee (terms apply)',
      '99.9% uptime guarantee'
    ]
  }
};

export interface PortalSEOPage {
  routePath: string;
 _market_code: string;
  country: string;
  currency: string;
  trialDays: number;
  primaryKeyword: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  canonical: string;
  keywords: string[];
  geoLocation: string;
  targetAudience: string[];
  features: string[];
  socialProof: string[];
  availability: 'InStock' | 'PreOrder' | 'OutOfStock';
  pricing: {
    monthly_price: number;
    year_price: number;
    currency: string;
  };
  rating?: {
    value: number;
    count: number;
  };
}

export const generatePortalSEOPage = (market: any, keyword: string): PortalSEOPage => {
  const { market_code, country, currency, trial_days } = market;
  const usdPrice = 29.99;
  const gbpPrice = 25.00;
  const eurPrice = 24.99;
  const brlPrice = 159.99;
  const mxnPrice = 659.00;

  let currencySpecificPrice = usdPrice;
  switch (market_code) {
    case 'gb':
      currencySpecificPrice = gbpPrice;
      break;
    case 'de':
    case 'es':
    case 'fr':
      currencySpecificPrice = eurPrice;
      break;
    case 'br':
      currencySpecificPrice = brlPrice;
      break;
    case 'mx':
      currencySpecificPrice = mxnPrice;
      break;
    default:
      currencySpecificPrice = usdPrice;
  }

  const priceYear = Math.round(currencySpecificPrice * 12 * 0.8); // 20% discount for yearly
  const discountYear = Math.round(12 * currencySpecificPrice - priceYear);

  return {
    routePath: `/iptv-subscription/${market_code}/${keyword.replace(/\s+/g, '-')}`,
    _market_code: market_code,
    country,
    currency,
    trialDays: trial_days,
    primaryKeyword: keyword,
    title: `${keyword} - ${country} | ProStream Space`,
    description: `Upgrade to our ${country}‑approved live‑TV and sports offerings with global channels, 4K support, and multi‑device compatibility. View trial details.`,
    ogTitle: `${keyword} - ${country} | ProStream Space`,
    ogDescription: `Upgrade to our ${country}‑approved live‑TV and sports offerings with global channels, 4K support, and multi‑device compatibility. View trial details.`,
    canonical: `https://prostream.space/iptv-subscription/${market_code}/${keyword.replace(/\s+/g, '-')}`,
    keywords: [
      `${keyword} ${country}`,
      `best iptv subscription ${country} 2026`,
      `iptv sports subscription ${country} 2026`,
      `best iptv live tv ${country} 2026`,
      `best iptv sports ${country} 2026`,
      `${keyword} ${country}`,
      `best iptv package ${country}`,
      `best iptv plan ${country}`,
      `${keyword} ${country}`,
      `iptv cheap ${country}`
    ],
    geoLocation: market_code.toUpperCase(),
    targetAudience: ['sports fans', 'movie enthusiasts', 'tv enthusiasts', 'expats'],
    features: portalSEOConfig.page_templates.feature_points,
    socialProof: portalSEOConfig.page_templates.social_proof,
    availability: 'InStock',
    pricing: {
      monthly_price: Math.round(currencySpecificPrice),
      year_price: priceYear,
      currency
    },
    rating: {
      value: 4.8,
      count: 1250
    }
  };
};

export const generateAllPortalPages = (): PortalSEOPage[] => {
  const pages: PortalSEOPage[] = [];

  portalSEOConfig.market_config.forEach(market => {
    portalSEOConfig.keyword_variants.forEach(keyword => {
      const page = generatePortalSEOPage(market, keyword);
      pages.push(page);
    });
  });

  return pages;
};

export const getSiteMapXML = (pages: PortalSEOPage[]): string => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => `    <url>
      <loc>${page.canonical}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`).join('\n')}
  </urlset>`;
  return sitemap;
};
