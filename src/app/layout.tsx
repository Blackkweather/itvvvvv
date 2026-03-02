import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  }
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/30 min-h-screen flex flex-col`}
      >
        <CinematicWrapper>{children}</CinematicWrapper>
      </body>
    </html>
  );
}
