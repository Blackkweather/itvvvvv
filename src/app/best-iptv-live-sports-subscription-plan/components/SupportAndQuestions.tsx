// Support and Frequently Asked Questions components for IPTV subscription page

export const faqItems = [
  {
    question: 'How can I receive my trial activation? Do I need to enter my email? How much time does the interface or app take to finish the setup and prepare streams?',
    answer: 'After sign‑up, we perform an eligibility check locally. If your region allows, your trial activates locally within the page’s context. Setup time depends on configuration choice. Trials are set up approximately within the same page’s context we don’t share outbound cookies by default.',
    category: 'Trial activation and setup'
  },
  {
    question: 'What payment methods and devices are supported? Are local laws and regional restrictions applied to payment and installation?',
    answer: 'Final payments and installation methods depend on your device and local laws. If your official device or region limits specific installations, the interface may display a warning or show a replacement method; we either limit offline/sync capacities or hide buttons that require API helpers. We respect local payment and installation rules.',
    category: 'Payment and devices'
  },
  {
    question: 'How do you handle privacy and external tracking? Do you use native trackers outbound by default?',
    answer: 'We don’t load native trackers outbound by default. Adherence and privacy limits appear before confirmation or download. For offline/off‑line UI we work as part of the same page. Please adapt to your local laws.',
    category: 'Privacy and tracking'
  },
  {
    question: 'Is this platform suitable for different countries and regions? Do you offer geo‑specific packages, menus, or permissions?',
    answer: 'We support multiple geography. Use the controls at the bottom of the interface to manage layers, roles, groups; use Geo filters to adjust what’s displayed (e.g., geo‑bound packages or country‑specific menus). You can fine‑tune the IPTV interface directly in the browser while waiting for refresh.',
    category: 'Geo restrictions and accessibility'
  },
  {
    question: 'Is this service legal? Do you respect legitimate adjudication and any ad‑like CTAs or scammy page structures?',
    answer: 'We comply with legitimate adjudication and local laws. We avoid ad‑like CTAs that haven’t been evaluated. Full terms and legal checks appear before confirmation or download.',
    category: 'Legal and compliance'
  }
];

export const supportLinks = [
  {
    title: 'Knowledge Base',
    description: 'Guides for installation, account setup, and troubleshooting',
    url: '/kb'
  },
  {
    title: 'Device Compatibility',
    description: 'Supported devices with step‑by‑step instructions',
    url: '/devices'
  },
  {
    title: 'Payment & Billing',
    description: 'Supported payment methods and billing cycle details',
    url: '/billing'
  },
  {
    title: 'Contact Support',
    description: 'WhatsApp, email, and live chat support options',
    url: '/contact'
  }
];
