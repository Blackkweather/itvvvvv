'use client';

import Script from 'next/script';
import { DeviceConfig } from './deviceConfig';

interface DeviceSchemasProps {
  config: DeviceConfig;
}

export function DeviceSchemas({ config }: DeviceSchemasProps) {
  const schemas = [
    // HowTo Schema
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": config.schema.howTo.name,
      "description": config.schema.howTo.description,
      "step": config.schema.howTo.steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
      })),
    },
    // FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": config.schema.faq.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    },
    // BreadcrumbList Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://streampro.space",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": config.name,
          "item": config.canonicalUrl,
        },
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`device-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default DeviceSchemas;
