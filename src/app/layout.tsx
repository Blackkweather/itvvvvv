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
  metadataBase: new URL("http://localhost:3000"),
  title: "StreamPro — Absolute Peak of 4K IPTV | Best IPTV Subscription 2026",
  description:
    "StreamPro is the world's leading premium IPTV provider. 15,000+ live 4K channels, 60,000+ VODs, Anti-Freeze 2.0 technology. Experience the future of television with zero buffering.",
  keywords: "best iptv subscription 2026, premium iptv service, 4k iptv provider, best apple tv iptv app, firestick iptv setup, streampro review, cable tv alternative",
  openGraph: {
    title: "StreamPro — Premium 4K IPTV Ecosystem",
    description: "The absolute peak of television technology. 15,000+ channels in crystal clear 4K.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamPro — Premium 4K IPTV",
    description: "15,000+ channels in crystal clear 4K. Zero buffering.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "StreamPro",
  },
  formatDetection: {
    telephone: false,
  },
};

import { CinematicWrapper } from "@/components/layout/CinematicWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "StreamPro IPTV",
    "description": "Premium 4K IPTV Service with 35,000+ Live Channels",
    "brand": {
      "@type": "Brand",
      "name": "StreamPro"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "9.99"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {/* Noise overlay for cinematic feel */}
        <div className="noise-overlay" aria-hidden="true" />
        <CinematicWrapper>{children}</CinematicWrapper>
      </body>
    </html>
  );
}
