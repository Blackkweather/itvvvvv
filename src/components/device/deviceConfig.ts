import { Metadata } from "next";

export interface DeviceConfig {
  slug: string;
  name: string;
  brand: string;
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  h1: string;
  intro: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  setupSteps: {
    step: number;
    title: string;
    content: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  cta: {
    text: string;
    link: string;
  };
  breadcrumbParent: {
    name: string;
    url: string;
  };
  schema: {
    howTo: {
      name: string;
      description: string;
      steps: {
        name: string;
        text: string;
      }[];
    };
    faq: {
      question: string;
      answer: string;
    }[];
  };
}

export const FIRESTICK_CONFIG: DeviceConfig = {
  slug: "iptv-firestick",
  name: "Amazon Firestick",
  brand: "Amazon",
  title: "Best IPTV Service for Amazon Firestick (2026) | StreamPro",
  description: "StreamPro IPTV on Amazon Firestick — 15,000+ live channels, 4K streaming, anti-freeze technology. Easy setup guide included.",
  keywords: [
    "IPTV firestick",
    "best IPTV for firestick",
    "firestick IPTV setup",
    "IPTV app firestick",
    "stream on firestick",
    "firestick live TV",
    "Amazon firestick streaming",
  ],
  canonicalUrl: "https://streampro.space/iptv-firestick",
  ogImage: "https://streampro.space/og-image.png",
  h1: "Best IPTV Service for Amazon Firestick (2026)",
  intro: "Transform your Amazon Firestick into a powerhouse streaming device with StreamPro IPTV. Access 15,000+ live channels, thousands of movies, and premium sports content directly on your Firestick — no cable required.",
  features: [
    {
      icon: "📺",
      title: "15,000+ Live Channels",
      description: "Watch live TV from around the world including sports, news, entertainment, and international channels.",
    },
    {
      icon: "⚡",
      title: "Anti-Freeze Technology",
      description: "Our proprietary streaming technology eliminates buffering, even on slower connections.",
    },
    {
      icon: "🎬",
      title: "50,000+ VOD Titles",
      description: "Access an extensive library of movies, TV shows, and on-demand content updated daily.",
    },
    {
      icon: "🖥️",
      title: "Easy Setup",
      description: "Get started in minutes with our step-by-step Firestick installation guide.",
    },
  ],
  setupSteps: [
    {
      step: 1,
      title: "Download the StreamPro App",
      content: "From your Firestick home screen, search for 'Downloader' and install it. Open Downloader and enter the StreamPro app URL provided in your welcome email. Install the StreamPro app.",
    },
    {
      step: 2,
      title: "Login to Your Account",
      content: "Open the StreamPro app on your Firestick. Enter your username and password from your account confirmation email. You're now connected to our servers.",
    },
    {
      step: 3,
      title: "Start Streaming",
      content: "Browse the channel guide, select your favorite channel, and enjoy unlimited streaming. Use the on-screen menu to access VOD, settings, and more.",
    },
  ],
  faqs: [
    {
      question: "Does StreamPro work on all Firestick models?",
      answer: "Yes! StreamPro works on all Amazon Firestick models including Firestick 4K, Firestick Lite, and Fire TV Cube. Performance is best on Firestick 4K for 4K content.",
    },
    {
      question: "Do I need a VPN to use IPTV on Firestick?",
      answer: "While not required, using a VPN is recommended for enhanced privacy and to ensure uninterrupted access. We recommend compatible VPN services listed in our support section.",
    },
    {
      question: "Can I record live TV on Firestick?",
      answer: "StreamPro includes cloud DVR functionality on Premium and Ultimate plans, allowing you to record and watch your favorite shows later.",
    },
    {
      question: "Is there a free trial for Firestick users?",
      answer: "Yes! New users can request a 24-hour free trial to test the service on their Firestick before committing to a subscription.",
    },
  ],
  cta: {
    text: "Start Your Free Trial",
    link: "/pricing",
  },
  breadcrumbParent: {
    name: "Home",
    url: "https://streampro.space",
  },
  schema: {
    howTo: {
      name: "How to Set Up IPTV on Amazon Firestick",
      description: "Learn how to install and configure StreamPro IPTV on your Amazon Firestick in minutes.",
      steps: [
        {
          name: "Download the StreamPro App",
          text: "Install Downloader on your Firestick, then use it to download and install the StreamPro app.",
        },
        {
          name: "Login to Your Account",
          text: "Open StreamPro and enter your login credentials from your welcome email.",
        },
        {
          name: "Start Streaming",
          text: "Browse channels and start watching live TV, movies, and sports on your Firestick.",
        },
      ],
    },
    faq: [
      {
        question: "Does StreamPro work on all Firestick models?",
        answer: "Yes! StreamPro works on all Amazon Firestick models including Firestick 4K, Firestick Lite, and Fire TV Cube.",
      },
      {
        question: "Is there a free trial for Firestick users?",
        answer: "Yes! New users can request a 24-hour free trial to test the service before subscribing.",
      },
    ],
  },
};

export const ANDROID_CONFIG: DeviceConfig = {
  slug: "iptv-android",
  name: "Android TV",
  brand: "Android",
  title: "Best IPTV Service for Android TV (2026) | StreamPro",
  description: "StreamPro IPTV on Android TV — 15,000+ live channels, 4K streaming, Google Play Store app. Easy setup guide included.",
  keywords: [
    "IPTV android TV",
    "best IPTV for android TV",
    "android TV IPTV app",
    "IPTV on nvidia shield",
    "IPTV on chromecast",
    "google TV IPTV",
  ],
  canonicalUrl: "https://streampro.space/iptv-android",
  ogImage: "https://streampro.space/og-image.png",
  h1: "Best IPTV Service for Android TV (2026)",
  intro: "Experience seamless streaming on your Android TV with StreamPro IPTV. Whether you're using a Google TV, Nvidia Shield, or any Android TV device, enjoy 15,000+ live channels and 50,000+ VOD titles in stunning 4K quality.",
  features: [
    {
      icon: "📺",
      title: "15,000+ Live Channels",
      description: "Watch live TV from around the world including sports, news, entertainment, and international channels.",
    },
    {
      icon: "🎮",
      title: "Gaming Performance",
      description: "Optimized for Nvidia Shield and other high-performance Android TV boxes with low-latency streaming.",
    },
    {
      icon: "�ecast",
      title: "Chromecast Built-in",
      description: "Cast content from your phone to your TV or use voice search with Google Assistant.",
    },
    {
      icon: "🖥️",
      title: "Google Play Store",
      description: "Download directly from Google Play — no sideloading required for most devices.",
    },
  ],
  setupSteps: [
    {
      step: 1,
      title: "Install StreamPro from Google Play",
      content: "On your Android TV, open Google Play Store and search for 'StreamPro'. Install the official StreamPro app.",
    },
    {
      step: 2,
      title: "Login to Your Account",
      content: "Open StreamPro and sign in with your username and password from your account confirmation email.",
    },
    {
      step: 3,
      title: "Grant Permissions (First Time)",
      content: "Allow storage permission for VOD downloads. Enable notifications for channel updates. You're all set!",
    },
  ],
  faqs: [
    {
      question: "Does StreamPro work on Chromecast with Google TV?",
      answer: "Yes! StreamPro is fully compatible with Chromecast with Google TV. Simply install from Play Store and start streaming.",
    },
    {
      question: "Can I use my phone as a remote for Android TV?",
      answer: "Yes! The StreamPro app includes a remote control feature that works over your local network.",
    },
    {
      question: "Does StreamPro support 4K on Android TV?",
      answer: "Absolutely! StreamPro supports up to 4K HDR streaming on compatible devices like Nvidia Shield and Chromecast Ultra.",
    },
  ],
  cta: {
    text: "Start Your Free Trial",
    link: "/pricing",
  },
  breadcrumbParent: {
    name: "Home",
    url: "https://streampro.space",
  },
  schema: {
    howTo: {
      name: "How to Set Up IPTV on Android TV",
      description: "Learn how to install and configure StreamPro IPTV on your Android TV device.",
      steps: [
        {
          name: "Install StreamPro from Google Play",
          text: "Search for StreamPro in the Google Play Store on your Android TV and install the app.",
        },
        {
          name: "Login to Your Account",
          text: "Open StreamPro and enter your login credentials from your welcome email.",
        },
        {
          name: "Start Streaming",
          text: "Browse channels and start watching live TV, movies, and sports on your Android TV.",
        },
      ],
    },
    faq: [
      {
        question: "Does StreamPro work on Chromecast with Google TV?",
        answer: "Yes! StreamPro is fully compatible with Chromecast with Google TV.",
      },
      {
        question: "Does StreamPro support 4K on Android TV?",
        answer: "Yes! StreamPro supports up to 4K HDR streaming on compatible devices.",
      },
    ],
  },
};

export const SMART_TV_CONFIG: DeviceConfig = {
  slug: "iptv-smart-tv",
  name: "Smart TV",
  brand: "Samsung/LG/Sony",
  title: "Best IPTV Service for Smart TV (2026) | StreamPro",
  description: "StreamPro IPTV on Smart TV — Samsung, LG, Sony Android TV. 15,000+ live channels, 4K streaming. Easy setup guide included.",
  keywords: [
    "IPTV smart TV",
    "IPTV samsung TV",
    "IPTV lg TV",
    "IPTV sony TV",
    "smart TV IPTV app",
    "IPTV on tizen OS",
    "IPTV on webOS",
  ],
  canonicalUrl: "https://streampro.space/iptv-smart-tv",
  ogImage: "https://streampro.space/og-image.png",
  h1: "Best IPTV Service for Smart TV (2026)",
  intro: "Bring the full StreamPro IPTV experience to your living room with our Smart TV app. Compatible with Samsung (Tizen), LG (webOS), and Sony Android TV — enjoy cinema-quality streaming without any additional hardware.",
  features: [
    {
      icon: "📺",
      title: "15,000+ Live Channels",
      description: "Watch live TV from around the world including sports, news, entertainment, and international channels.",
    },
    {
      icon: "🖥️",
      title: "Native Smart TV Apps",
      description: "Dedicated apps for Samsung, LG, and Sony TVs — no external devices needed.",
    },
    {
      icon: "🎬",
      title: "50,000+ VOD Titles",
      description: "Access an extensive library of movies, TV shows, and on-demand content.",
    },
    {
      icon: "🔊",
      title: "Immersive Audio",
      description: "Support for Dolby Digital Plus and Dolby Atmos on compatible TVs.",
    },
  ],
  setupSteps: [
    {
      step: 1,
      title: "Install StreamPro from App Store",
      content: "Samsung: Open Smart Hub → Search → StreamPro. LG: Open LG Content Store → Search → StreamPro. Sony: Open Google Play Store → Search → StreamPro.",
    },
    {
      step: 2,
      title: "Login to Your Account",
      content: "Open StreamPro and enter your username and password from your account confirmation email.",
    },
    {
      step: 3,
      title: "Configure Settings",
      content: "Adjust picture settings, enable audio passthrough, and set up your favorite channels for the best experience.",
    },
  ],
  faqs: [
    {
      question: "Does StreamPro work on Samsung Smart TVs?",
      answer: "Yes! StreamPro has a native app available on Samsung Smart TVs via the Smart Hub (Tizen OS).",
    },
    {
      question: "Does StreamPro work on LG TVs?",
      answer: "Yes! StreamPro is available on LG TVs through the LG Content Store (webOS).",
    },
    {
      question: "Can I use my TV remote with StreamPro?",
      answer: "Yes! The Smart TV apps are fully controllable with your TV's remote control, including shortcut buttons.",
    },
  ],
  cta: {
    text: "Start Your Free Trial",
    link: "/pricing",
  },
  breadcrumbParent: {
    name: "Home",
    url: "https://streampro.space",
  },
  schema: {
    howTo: {
      name: "How to Set Up IPTV on Smart TV",
      description: "Learn how to install and configure StreamPro IPTV on your Samsung, LG, or Sony Smart TV.",
      steps: [
        {
          name: "Install StreamPro from App Store",
          text: "Search for StreamPro in your TV's app store and install the app.",
        },
        {
          name: "Login to Your Account",
          text: "Open StreamPro and enter your login credentials from your welcome email.",
        },
        {
          name: "Configure Settings",
          text: "Adjust picture and audio settings for the best viewing experience.",
        },
      ],
    },
    faq: [
      {
        question: "Does StreamPro work on Samsung Smart TVs?",
        answer: "Yes! StreamPro has a native app available on Samsung Smart TVs via the Smart Hub.",
      },
      {
        question: "Does StreamPro work on LG TVs?",
        answer: "Yes! StreamPro is available on LG TVs through the LG Content Store.",
      },
    ],
  },
};

export const IPHONE_CONFIG: DeviceConfig = {
  slug: "iptv-iphone",
  name: "iPhone/iPad",
  brand: "Apple",
  title: "Best IPTV Service for iPhone & iPad (2026) | StreamPro",
  description: "StreamPro IPTV on iPhone and iPad — 15,000+ live channels, Apple TV app integration. Easy setup guide included.",
  keywords: [
    "IPTV iphone",
    "IPTV ipad",
    "best IPTV for iphone",
    "iphone live TV app",
    "IPTV on apple TV",
    "ios IPTV app",
  ],
  canonicalUrl: "https://streampro.space/iptv-iphone",
  ogImage: "https://streampro.space/og-image.png",
  h1: "Best IPTV Service for iPhone & iPad (2026)",
  intro: "Take your entertainment everywhere with StreamPro on iPhone and iPad. Whether you're at home or on the go, access 15,000+ live channels and 50,000+ VOD titles on your Apple devices.",
  features: [
    {
      icon: "📺",
      title: "15,000+ Live Channels",
      description: "Watch live TV from around the world including sports, news, entertainment, and international channels.",
    },
    {
      icon: "🍎",
      title: "Apple TV Integration",
      description: "Use AirPlay to stream to your Apple TV, or use the Apple TV app for seamless viewing.",
    },
    {
      icon: "📱",
      title: "Offline Downloads",
      description: "Download your favorite shows and movies to watch offline (Premium plans).",
    },
    {
      icon: "🔄",
      title: "Multi-Device Sync",
      description: "Continue watching where you left off across iPhone, iPad, and Apple TV.",
    },
  ],
  setupSteps: [
    {
      step: 1,
      title: "Install StreamPro from App Store",
      content: "Open the App Store on your iPhone or iPad, search for 'StreamPro', and install the app.",
    },
    {
      step: 2,
      title: "Trust the App (First Time)",
      content: "Go to Settings → General → Device Management and trust the StreamPro developer certificate.",
    },
    {
      step: 3,
      title: "Login and Start Streaming",
      content: "Open StreamPro, enter your credentials, and enjoy streaming on your iOS device.",
    },
  ],
  faqs: [
    {
      question: "Does StreamPro work on iPhone without jailbreak?",
      answer: "Yes! StreamPro works on standard iPhones without jailbreak. Simply trust the developer certificate in settings.",
    },
    {
      question: "Can I download shows to watch offline?",
      answer: "Yes! Offline downloads are available on Premium and Ultimate subscription plans.",
    },
    {
      question: "Does StreamPro support AirPlay?",
      answer: "Yes! You can AirPlay content from StreamPro to your Apple TV or AirPlay-compatible devices.",
    },
  ],
  cta: {
    text: "Start Your Free Trial",
    link: "/pricing",
  },
  breadcrumbParent: {
    name: "Home",
    url: "https://streampro.space",
  },
  schema: {
    howTo: {
      name: "How to Set Up IPTV on iPhone & iPad",
      description: "Learn how to install and configure StreamPro IPTV on your iPhone or iPad.",
      steps: [
        {
          name: "Install StreamPro from App Store",
          text: "Search for StreamPro in the App Store and install the app.",
        },
        {
          name: "Trust the App",
          text: "Go to Settings → General → Device Management and trust the developer certificate.",
        },
        {
          name: "Login and Stream",
          text: "Open StreamPro, enter your credentials, and start watching.",
        },
      ],
    },
    faq: [
      {
        question: "Does StreamPro work on iPhone without jailbreak?",
        answer: "Yes! StreamPro works on standard iPhones without jailbreak.",
      },
      {
        question: "Can I download shows to watch offline?",
        answer: "Yes! Offline downloads are available on Premium and Ultimate plans.",
      },
    ],
  },
};

export const MAG_BOX_CONFIG: DeviceConfig = {
  slug: "iptv-mag-box",
  name: "MAG Box",
  brand: "Infomir",
  title: "Best IPTV Service for MAG Box (2026) | StreamPro",
  description: "StreamPro IPTV on MAG Box — 15,000+ live channels, plug-and-play setup. Easy configuration guide included.",
  keywords: [
    "IPTV MAG box",
    "MAG box IPTV setup",
    "best IPTV for MAG",
    "infomir MAG IPTV",
    "MAG 254 IPTV",
    "MAG 322 IPTV",
  ],
  canonicalUrl: "https://streampro.space/iptv-mag-box",
  ogImage: "https://streampro.space/og-image.png",
  h1: "Best IPTV Service for MAG Box (2026)",
  intro: "MAG boxes are purpose-built for IPTV, and StreamPro delivers the ultimate experience. Simply enter your portal URL and start streaming instantly — no complex setup required.",
  features: [
    {
      icon: "📺",
      title: "15,000+ Live Channels",
      description: "Watch live TV from around the world including sports, news, entertainment, and international channels.",
    },
    {
      icon: "🔌",
      title: "Plug & Play",
      description: "Enter your StreamPro portal URL and start watching — no apps to install or configure.",
    },
    {
      icon: "🎬",
      title: "50,000+ VOD Titles",
      description: "Access an extensive library of movies, TV shows, and on-demand content.",
    },
    {
      icon: "📺",
      title: "EPG Support",
      description: "Full electronic program guide support with accurate channel listings and reminders.",
    },
  ],
  setupSteps: [
    {
      step: 1,
      title: "Get Your Portal URL",
      content: "Your StreamPro portal URL will be sent in your account confirmation email. It looks like: http://portal.streampro.space:8080.",
    },
    {
      step: 2,
      title: "Enter Portal on MAG Box",
      content: "On your MAG box, go to Settings → Servers → Portal. Enter your portal URL and save.",
    },
    {
      step: 3,
      title: "Restart and Enjoy",
      content: "Restart your MAG box. The StreamPro interface will load automatically with all your channels and content.",
    },
  ],
  faqs: [
    {
      question: "Which MAG boxes are supported?",
      answer: "StreamPro supports all MAG boxes including MAG 250, 254, 255, 256, 322, 324, and 349.",
    },
    {
      question: "Do I need to install any apps?",
      answer: "No! MAG boxes connect via the portal URL — no additional apps required.",
    },
    {
      question: "Can I use my MAG box with other IPTV services?",
      answer: "Yes! MAG boxes support multiple portal URLs, so you can switch between providers if needed.",
    },
  ],
  cta: {
    text: "Start Your Free Trial",
    link: "/pricing",
  },
  breadcrumbParent: {
    name: "Home",
    url: "https://streampro.space",
  },
  schema: {
    howTo: {
      name: "How to Set Up IPTV on MAG Box",
      description: "Learn how to configure StreamPro IPTV on your MAG box using the portal URL.",
      steps: [
        {
          name: "Get Your Portal URL",
          text: "Your StreamPro portal URL will be sent in your account confirmation email.",
        },
        {
          name: "Enter Portal on MAG Box",
          text: "Go to Settings → Servers → Portal on your MAG box and enter your URL.",
        },
        {
          name: "Restart and Enjoy",
          text: "Restart your MAG box to load the StreamPro interface.",
        },
      ],
    },
    faq: [
      {
        question: "Which MAG boxes are supported?",
        answer: "StreamPro supports all MAG boxes including MAG 250, 254, 255, 256, 322, 324, and 349.",
      },
      {
        question: "Do I need to install any apps?",
        answer: "No! MAG boxes connect via the portal URL — no additional apps required.",
      },
    ],
  },
};

export const DEVICE_CONFIGS: Record<string, DeviceConfig> = {
  "iptv-firestick": FIRESTICK_CONFIG,
  "iptv-android": ANDROID_CONFIG,
  "iptv-smart-tv": SMART_TV_CONFIG,
  "iptv-iphone": IPHONE_CONFIG,
  "iptv-mag-box": MAG_BOX_CONFIG,
};

export function getDeviceConfig(slug: string): DeviceConfig | undefined {
  return DEVICE_CONFIGS[slug];
}
