import { Metadata } from "next";
import { DeviceConfig } from "./deviceConfig";

export function generateDeviceMetadata(config: DeviceConfig): Metadata {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: config.canonicalUrl,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.canonicalUrl,
      siteName: "StreamPro",
      images: [
        {
          url: config.ogImage,
          width: 1200,
          height: 630,
          alt: `${config.name} - StreamPro IPTV`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [config.ogImage],
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
  };
}

export default generateDeviceMetadata;
