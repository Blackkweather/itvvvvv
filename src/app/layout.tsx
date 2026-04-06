import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020205" },
    { media: "(prefers-color-scheme: light)", color: "#020205" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://streampro.space"),
  title: {
    default: "StreamPro — Best Premium IPTV Service | 15,000+ Live Channels",
    template: "%s | StreamPro",
  },
  description:
    "StreamPro offers the best IPTV service with 15,000+ live channels, movies, sports, and VOD. Watch NFL, NBA, Premier League, and more in HD. 24/7 support. Starting at $9.99/month.",
  keywords: [
    "IPTV",
    "best IPTV service",
    "live TV streaming",
    "sports streaming",
    "movie streaming",
    "premium IPTV",
    "watch NFL live",
    "watch NBA live",
    "Premier League streaming",
    "Netflix alternative",
    "cord cutting",
    "streaming service",
    "IPTV subscription",
    "live sports streaming",
    "HD TV channels",
  ],
  authors: [{ name: "StreamPro" }],
  creator: "StreamPro",
  publisher: "StreamPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://streampro.space",
    siteName: "StreamPro",
    title: "StreamPro — Best Premium IPTV Service | 15,000+ Live Channels",
    description: "StreamPro offers the best IPTV service with 15,000+ live channels, movies, sports, and VOD. Watch NFL, NBA, Premier League, and more in HD.",
    images: [
      {
        url: "https://streampro.space/og-image.svg",
        width: 1200,
        height: 630,
        alt: "StreamPro - Premium IPTV Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamPro — Best Premium IPTV Service",
    description: "15,000+ live channels, movies, sports. Watch NFL, NBA, Premier League in HD.",
    creator: "@streampro",
    images: ["https://streampro.space/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://streampro.space",
    languages: {
      "en-US": "https://streampro.space",
      "en-GB": "https://streampro.space/en-gb",
      "es": "https://streampro.space/es",
      "fr": "https://streampro.space/fr",
      "de": "https://streampro.space/de",
      "it": "https://streampro.space/it",
    },
  },
  category: "technology",
  classification: "IPTV Service",
};

import { CinematicWrapper } from "@/components/layout/CinematicWrapper";
import { StealthCloak } from "@/components/ui/RedditCloak";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced JSON-LD for Organization and Product
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StreamPro",
    "url": "https://streampro.space",
    "description": "Premium IPTV streaming service with 15,000+ live channels worldwide including sports, movies, and entertainment",
    "logo": "https://streampro.space/logo.png",
    "foundingDate": "2024",
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "serviceType": ["IPTV", "Streaming Service", "Video on Demand"],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-STREAM-PRO",
      "contactType": "customer service",
      "available24Hours": true,
      "contactOption": ["TollFree", "HearingImpairedAccessible"]
    },
    "sameAs": [
      "https://twitter.com/streampro",
      "https://facebook.com/streampro",
      "https://instagram.com/streampro",
      "https://youtube.com/@streampro",
      "https://reddit.com/r/streampro"
    ],
    "potentialAction": {
      "@type": "ViewAction",
      "target": "https://streampro.space/pricing",
      "name": "View Pricing"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "StreamPro Premium IPTV Subscription",
    "description": "Premium IPTV service with 30,000+ live channels, 120,000+ VOD titles, movies, sports in 4K quality",
    "brand": {
      "@type": "Brand",
      "name": "StreamPro"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "15",
      "highPrice": "35",
      "priceCurrency": "USD",
      "offerCount": 12,
      "offers": [
        {
          "@type": "Offer",
          "name": "1 Device - 1 Month",
          "price": "15",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://streampro.space/dashboard/subscription"
        },
        {
          "@type": "Offer",
          "name": "1 Device - 12 Months",
          "price": "75",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://streampro.space/dashboard/subscription"
        },
        {
          "@type": "Offer",
          "name": "2 Devices - 1 Month",
          "price": "25",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://streampro.space/dashboard/subscription"
        },
        {
          "@type": "Offer",
          "name": "3 Devices - 1 Month",
          "price": "35",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://streampro.space/dashboard/subscription"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2500",
      "bestRating": "5"
    },
    "category": "Entertainment",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Channel Count",
        "value": "30000+"
      },
      {
        "@type": "PropertyValue",
        "name": "Video Quality",
        "value": "HD, FHD, 4K"
      },
      {
        "@type": "PropertyValue",
        "name": "Simultaneous Connections",
        "value": "2-4"
      },
      {
        "@type": "PropertyValue",
        "name": "24/7 Support",
        "value": "Yes"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "StreamPro FAQ - Frequently Asked Questions",
    "description": "Answers to common questions about StreamPro IPTV service, compatible devices, pricing, and technical support.",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is streaming and how does StreamPro work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Streaming delivers TV content over the internet instead of traditional satellite or cable. StreamPro uses advanced streaming servers to deliver live channels and on-demand content directly to your devices through our app or compatible players."
        }
      },
      {
        "@type": "Question",
        "name": "Which devices are compatible with StreamPro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "StreamPro works on virtually any device: Smart TVs (Samsung, LG, Sony, Android TV), Amazon Fire Stick & Fire TV, Roku, Apple TV, iOS & Android phones and tablets, Windows & macOS computers, and any device that supports streaming apps."
        }
      },
      {
        "@type": "Question",
        "name": "What is anti-freeze technology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our proprietary anti-freeze technology uses adaptive bitrate streaming, intelligent CDN routing, and pre-buffering algorithms to eliminate freezing and buffering. Even on connections as low as 10 Mbps, you'll enjoy smooth, uninterrupted streaming."
        }
      },
      {
        "@type": "Question",
        "name": "How many devices can I use at the same time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each StreamPro subscription supports up to 4 simultaneous connections. This means your family can watch different channels on different devices at the same time — all from one account."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer a free trial?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer a 24-hour free trial so you can test the service quality, channel selection, and streaming performance before committing. No credit card required for the trial. Simply sign up and start watching."
        }
      },
      {
        "@type": "Question",
        "name": "What payment methods do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, cryptocurrency (Bitcoin, Ethereum), and bank transfers. All transactions are encrypted and secure."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if a channel goes down?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We monitor all channels 24/7 with automated health checks. If a channel experiences issues, our system automatically switches to a backup source. Our team typically resolves channel issues within minutes. You can also report issues through our support for priority handling."
        }
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "StreamPro",
    "url": "https://streampro.space",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://streampro.space/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Google Tag Manager - Single Instance */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
            gtag('set', 'ads_data_redaction', true);`,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X53CZV12VT"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X53CZV12VT', {
              'ads_data_redaction': true
            });
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-55JBSLGB');`,
          }}
        />
        {/* End Google Tag Manager & Analytics */}
        {/* Autotag Library */}
        <script 
          async 
          src="https://aclib.acintelligence.com/aclib-min.js"
        />
        {/* Skip to main content link for accessibility */}
        <style>{`
          .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: #D4AF37;
            color: #1e1b15;
            padding: 8px 16px;
            z-index: 10000;
            transition: top 0.3s;
            font-weight: 600;
            font-size: 14px;
          }
          .skip-link:focus {
            top: 0;
          }
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/30 min-h-screen flex flex-col relative`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-55JBSLGB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {/* Noise overlay for cinematic feel */}
        <div className="noise-overlay" aria-hidden="true" />
        <StealthCloak>
          <CinematicWrapper>{children}</CinematicWrapper>
        </StealthCloak>
        {/* Autotag Zone */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `aclib.runAutoTag({
              zoneId: 'zusoe0fva9',
            });`
          }}
        />
      </body>
    </html>
  );
}
