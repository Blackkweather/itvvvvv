// Structured Data Schema for IPTV subscription page
import { seoMetadata } from './metadata';

interface StructuredDataProps {
  url: string;
  name: string;
  description: string;
  image: string;
  breadcrumbList?: Array<{ item: { url: string; name: string } }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export const structuredData: StructuredDataProps = {
  url: seoMetadata.canonical,
  name: 'Best IPTV Subscription Plan for Live TV and Sports [2026]',
  description: seoMetadata.description,
  image: seoMetadata.openGraph?.images[0] || '/images/landing/iptv-hero.jpg',
  breadcrumbList: [
    { item: { url: 'https://prostream.space', name: 'Home' } },
    { item: { url: seoMetadata.canonical, name: 'Best IPTV Subscription Plan for Live TV and Sports [2026]' } }
  ],
  faqs: [
    {
      question: 'How can I receive my trial activation? Do I need to enter my email? How much time does the interface or app take to finish the setup and prepare streams?',
      answer: 'After sign‑up, we perform an eligibility check locally. If your region allows, your trial activates locally within the page’s context. Setup time depends on configuration choice. Trials are set up approximately within the same page’s context we don’t share outbound cookies by default.'
    },
    {
      question: 'What payment methods and devices are supported? Are local laws and regional restrictions applied to payment and installation?',
      answer: 'Final payments and installation methods depend on your device and local laws. If your official device or region limits specific installations, the interface may display a warning or show a replacement method; we either limit offline/sync capacities or hide buttons that require API helpers. We respect local payment and installation rules.'
    }
  ]
};

interface StructuredItem {
  type: string;
  '@context'?: string;
  '@id'?: string;
  'position'?: number;
  'item'?: any;
}

// Main Organization Schema
export const organizationSchema: StructuredItem = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://prostream.space/#organization',
  url: 'https://prostream.space',
  name: 'ProStream Space',
  logo: {
    '@type': 'ImageObject',
    url: 'https://prostream.space/logo.png',
    width: 200,
    height: 200
  },
  description: 'Premium IPTV services with live TV, sports, and multi‑device support.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Spanish', 'French'],
    email: 'support@prostream.space'
  }
};

// Product Schema
export const productSchema: StructuredItem = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApp',
  '@id': 'https://prostream.space/#product',
  name: 'Best IPTV Subscription Plan for Live TV and Sports [2026]',
  url: 'https://prostream.space/best-iptv-live-sports-subscription-plan',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Android, iOS, Windows, macOS, Linux, Smart TV, Fire TV, Chromecast',
  operatingSystemSupport: 'Android 5.0+, iOS 11+, Windows 10+, macOS 10.14+, Linux, Smart TV (WebOS, Tizen, NetCast), Fire TV, Chromecast, and streaming boxes.',
  recommends: 'https://prostream.space',
  description: 'Premium IPTV subscription offering global channels, sports packages, 4K support, and multi‑device compatibility.',
  offers: {
    '@type': 'Offer',
    url: 'https://prostream.space',
    priceCurrency: 'USD',
    price: '29.99',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250'
    },
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      '@id': 'https://prostream.space/#organization'
    }
  }
};

//Breadcrumb Schema
export const breadcrumbSchema: StructuredItem = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://prostream.space'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Best IPTV Subscription Plan for Live TV and Sports [2026]',
      item: 'https://prostream.space/best-iptv-live-sports-subscription-plan'
    }
  ]
};

// FAQ Schema
export const faqSchema: StructuredItem = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: structuredData.faqs![0].question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: structuredData.faqs![0].answer
      }
    },
    {
      '@type': 'Question',
      name: structuredData.faqs![1].question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: structuredData.faqs![1].answer
      }
    }
  ]
};

// Video Schema
export const videoSchema: StructuredItem = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Best IPTV Subscription Plan for Live TV and Sports [2026] - ProStream Space',
  description: 'Discover the best IPTV subscription plan with live TV and sports in 2026 featuring global channels, 4K support, and multi‑device compatibility.',
  thumbnailUrl: [seoMetadata.openGraph?.images[0] || 'https://prostream.space/images/landing/iptv-hero.jpg'],
  uploadDate: new Date().toISOString(),
  duration: 'PT2M30S',
  contentUrl: 'https://prostream.space/videos/landing/iptv-intro.mp4',
  interactionStatistic: {
    '@type': 'InteractionCounter',
    interactionType: {
      '@type': 'WatchAction'
    },
    userInteractionCount: 0
  }
};
