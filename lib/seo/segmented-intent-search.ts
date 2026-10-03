// Segmented Intent Search Configuration - High Impact 2026
// Maps search intent to curated, measurable business KPIs

export interface SegmentedIntentConfig {
  intentSegment: 'intent-direct' | 'intent-high-intent' | 'intent-mid-intent' | 'intent-long-tail' | 'intent-low-intent';
  kpiName: string;
  kpiQualifier: string;
  trafficPriority: 'Highest' | 'High' | 'Medium' | 'Low';
  conversionRegion: string;
  targetMarket: string[];
  avgConversionRate: string;
  avgSessionValue: string;
  searchVolumeEstimate: string;
  categoryUrl: string;
  serviceClass: string;
}

const PLAN_KTYPES = {
  product: { description: 'Latest product offerings for measuring upgrades', class: 'product' },
  custom_installation: { description: 'Custom installation service capability', class: 'service' },
  budget_plan: { description: 'Cost‑effective entry plan for pilots', class: 'budget_plan' },
  long_active_users: { description: 'All‑in‑one plan for long‑term users, multiple devices', class: 'long_active' },
  premium_plan: { description: 'Premium/enterprise plan with advanced features and customization', class: 'premium_plan' },
  trial: { description: 'Trial activation and onboarding for new users', class: 'trial' },
  integration: { description: 'Integration API or custom setups', class: 'integration' },
  revisit: { description: 'Revisit / activation and upgrade hooks', class: 'revisit' },
  remote_doc: { description: 'Remote documentation and client handover steps', class: 'remote_doc' },
  installation_stats: { description: 'Installation statistics, success rates', class: 'installation_stats' },
  launch_beta: { description: 'Launch on / public beta phase by UI, device, API helper usage, core feature checks', class: 'launch_beta' },
  stability_test: { description: 'Stability test for periodic environments (version stability and tenant isolation)', class: 'stability_test' }
};

const REGION_CHANGES = {
  es: { country: 'Spain', currency: 'EUR', trialDays: 30 },
  mx: { country: 'Mexico', currency: 'MXN', trialDays: 30 }
};

const USER_ROLES = {
  viewer: { name: 'Viewer', featureSet: 'basic' },
  installer: { name: 'Installer', featureSet: 'installer' },
  sales: { name: 'Sales', featureSet: 'sales' },
  support: { name: 'Support', featureSet: 'support' },
  admin: { name: 'Admin', featureSet: 'admin' },
  subscriber: { name: 'Subscriber', featureSet: 'subscriber' }
};

const STORAGE_TYPES = {
  'cloud-storage': { name: 'Cloud Storage', limits: { storageGB: 5, bandwidthGB: 50 } },
  'file-system': { name: 'File System', limits: { storageGB: 3, bandwidthGB: 30 } }
};

const FEATURES = new Set(['immediate_activation', 'local_eligibility_check', 'no_outbound_cookies', 'geo_friendly', 'local_supported_payment', 'live_tv', 'sports', 'movies', 'series', '4k', 'multi_device', 'trial_mode', 'local_provider', 'dp_resources', 'dark_mode', 'device_limits']);

const SHIPPING_INFO = {
  free_shipping: true,
  processing_time: '1 hour',
  delivery_type: 'digital',
  delivery_location: 'digital',
  delivery_retailers: ['ProStream Space website', 'approved marketplace'],
  delivery_countries: ['all'] as const
};

const PROTOCOLS = ['http', 'https'];

const PACKAGE_TYPES = new Set(['(product)', '(custom_installation)', '(budget_plan)', '(long_active_users)', '(premium_plan)', '(trial)', '(integration)', '(revisit)', '(remote_doc)', '(installation_stats)', '(launch_beta)', '(stability_test)']);

const TIERS = ['free', 'basic', 'premium'];

const CURRENCY_SYMBOLS = {
  USD: 'US$',
  EUR: '€',
  GBP: '£',
  MXN: 'MXN'
};

const SEGMENTED_INTENTS: SegmentedIntentConfig[] = [
  {
    intentSegment: 'intent-high-intent',
    kpiName: 'Best IPTV subscription plan for live tv and sports 2026',
    kpiQualifier: 'subscriptions',
    trafficPriority: 'Highest',
    conversionRegion: 'Direct',
    targetMarket: ['US', 'UK', 'DE', 'ES', 'FR', 'BR', 'MX'],
    avgConversionRate: '12.5%',
    avgSessionValue: '$125',
    searchVolumeEstimate: '45,000',
    categoryUrl: '/iptv-subscription/ah1n/ih3n/ij4n',
    serviceClass: PLAN_KTYPES.product.description
  },
  {
    intentSegment: 'intent-mid-intent',
    kpiName: 'best iptv sports subscription [country]',
    kpiQualifier: 'trials',
    trafficPriority: 'High',
    conversionRegion: 'US, UK, DE, ES, FR, BR, MX',
    targetMarket: ['US', 'UK', 'DE', 'ES', 'FR', 'BR', 'MX'],
    avgConversionRate: '8.2%',
    avgSessionValue: '$85',
    searchVolumeEstimate: '32,000',
    categoryUrl: '/iptv-subscription/am2n/an3n/ao4n',
    serviceClass: PLAN_KTYPES.budget_plan.description
  },
  {
    intentSegment: 'intent-direct',
    kpiName: 'best iptv live tv [country]',
    kpiQualifier: 'installation_stats',
    trafficPriority: 'High',
    conversionRegion: 'Global',
    targetMarket: ['US', 'UK', 'DE', 'ES', 'FR', 'BR', 'MX', 'AE', 'SA', 'EG', 'AE', 'SA', 'KW'],
    avgConversionRate: '6.8%',
    avgSessionValue: '$65',
    searchVolumeEstimate: '28,000',
    categoryUrl: '/iptv-subscription/bp5n/bq6n/br7n',
    serviceClass: PLAN_KTYPES.custom_installation.description
  },
  {
    intentSegment: 'intent-long-tail',
    kpiName: 'best iptv bundle for sports and [country] 2026',
    kpiQualifier: 'vip_signups',
    trafficPriority: 'Medium',
    conversionRegion: 'Local',
    targetMarket: ['US', 'UK', 'DE', 'ES', 'FR', 'BR', 'MX'],
    avgConversionRate: '5.4%',
    avgSessionValue: '$95',
    searchVolumeEstimate: '18,000',
    categoryUrl: '/iptv-subscription/cr8n/cs9n/ct10n',
    serviceClass: PLAN_KTYPES.premium_plan.description
  },
  {
    intentSegment: 'intent-low-intent',
    kpiName: 'how to use iptv for [country]',
    kpiQualifier: 'contact_enquiries',
    trafficPriority: 'Medium',
    conversionRegion: 'US, UK, DE, ES, FR, BR, MX',
    targetMarket: ['US', 'UK', 'DE', 'ES', 'FR', 'BR', 'MX'],
    avgConversionRate: '3.1%',
    avgSessionValue: '$42',
    searchVolumeEstimate: '12,000',
    categoryUrl: '/iptv-subscription/du11n/dv12n/dw13n',
    serviceClass: PLAN_KTYPES.integration.description
  }
];

export { SEGMENTED_INTENTS, PLAN_KTYPES, REGION_CHANGES, USER_ROLES, STORAGE_TYPES, FEATURES, SHIPPING_INFO, PROTOCOLS, PACKAGE_TYPES, TIERS, CURRENCY_SYMBOLS };
