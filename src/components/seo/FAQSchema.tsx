'use client';

import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
      "suggestedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Server-side component for static generation
export default function FAQSchemaServer() {
  const faqs = [
    {
      question: "What is streaming and how does StreamPro work?",
      answer: "Streaming delivers TV content over the internet instead of traditional satellite or cable. StreamPro uses advanced streaming servers to deliver live channels and on-demand content directly to your devices through our app or compatible players.",
      category: "General",
    },
    {
      question: "Which devices are compatible with StreamPro?",
      answer: "StreamPro works on virtually any device: Smart TVs (Samsung, LG, Sony, Android TV), Amazon Fire Stick & Fire TV, Roku, Apple TV, iOS & Android phones and tablets, Windows & macOS computers, and any device that supports streaming apps.",
      category: "Devices",
    },
    {
      question: "What is anti-freeze technology?",
      answer: "Our proprietary anti-freeze technology uses adaptive bitrate streaming, intelligent CDN routing, and pre-buffering algorithms to eliminate freezing and buffering. Even on connections as low as 10 Mbps, you'll enjoy smooth, uninterrupted streaming.",
      category: "Technical",
    },
    {
      question: "How many devices can I use at the same time?",
      answer: "Each StreamPro subscription supports up to 4 simultaneous connections. This means your family can watch different channels on different devices at the same time — all from one account.",
      category: "Account",
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! We offer a 24-hour free trial so you can test the service quality, channel selection, and streaming performance before committing. No credit card required for the trial. Simply sign up and start watching.",
      category: "Billing",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, cryptocurrency (Bitcoin, Ethereum), and bank transfers. All transactions are encrypted and secure.",
      category: "Billing",
    },
    {
      question: "What happens if a channel goes down?",
      answer: "We monitor all channels 24/7 with automated health checks. If a channel experiences issues, our system automatically switches to a backup source. Our team typically resolves channel issues within minutes. You can also report issues through our support for priority handling.",
      category: "Technical",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "StreamPro FAQ - Frequently Asked Questions",
    "description": "Answers to common questions about StreamPro IPTV service, compatible devices, pricing, and technical support.",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}