/**
 * Bot Detection & Stealth Architecture for StreamPro
 * Implements multi-layered bot filtering and content cloaking
 */

// Known bot user agents
const KNOWN_BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'baiduspider',
  'ahrefsbot',
  'semrushbot',
  'dotbot',
  'mj12bot',
  'seznambot',
  'petalbot',
  'bytespider',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'pinterestbot',
  'slackbot',
  'telegrambot',
  'whatsapp',
  'discordbot',
  'applebot',
  'ia_archiver',
  'archive.org_bot',
  'wayback',
  'screaming frog',
  'sitebulb',
  'deepcrawl',
  'oncrawl',
  'botify',
  'contentking',
];

// Known data center IP ranges (simplified - in production use a comprehensive database)
const DATA_CENTER_IP_PATTERNS = [
  // AWS
  /^3\./,
  /^13\./,
  /^15\./,
  /^18\./,
  /^52\./,
  /^54\./,
  /^35\./,
  /^107\./,
  /^184\./,
  /^205\./,
  /^207\./,
  /^209\./,
  // Google Cloud
  /^34\./,
  /^35\./,
  /^104\./,
  /^107\./,
  /^108\./,
  /^130\./,
  /^136\./,
  /^142\./,
  /^146\./,
  /^147\./,
  /^148\./,
  /^149\./,
  /^150\./,
  /^151\./,
  /^152\./,
  /^162\./,
  /^163\./,
  /^164\./,
  /^165\./,
  /^166\./,
  /^167\./,
  /^168\./,
  /^169\./,
  /^170\./,
  /^171\./,
  /^172\./,
  /^173\./,
  /^174\./,
  /^175\./,
  /^176\./,
  /^177\./,
  /^178\./,
  /^179\./,
  /^180\./,
  /^181\./,
  /^182\./,
  /^183\./,
  /^184\./,
  /^185\./,
  /^186\./,
  /^187\./,
  /^188\./,
  /^189\./,
  /^190\./,
  /^191\./,
  /^192\./,
  /^193\./,
  /^194\./,
  /^195\./,
  /^196\./,
  /^197\./,
  /^198\./,
  /^199\./,
  /^200\./,
  /^201\./,
  /^202\./,
  /^203\./,
  /^204\./,
  /^205\./,
  /^206\./,
  /^207\./,
  /^208\./,
  /^209\./,
  /^210\./,
  /^211\./,
  /^212\./,
  /^213\./,
  /^214\./,
  /^215\./,
  /^216\./,
  /^217\./,
  /^218\./,
  /^219\./,
  /^220\./,
  /^221\./,
  /^222\./,
  /^223\./,
  // Azure
  /^13\./,
  /^20\./,
  /^40\./,
  /^52\./,
  /^65\./,
  /^104\./,
  /^137\./,
  /^138\./,
  /^139\./,
  /^140\./,
  /^141\./,
  /^142\./,
  /^143\./,
  /^144\./,
  /^145\./,
  /^146\./,
  /^147\./,
  /^148\./,
  /^149\./,
  /^150\./,
  /^151\./,
  /^152\./,
  /^153\./,
  /^154\./,
  /^155\./,
  /^156\./,
  /^157\./,
  /^158\./,
  /^159\./,
  /^160\./,
  /^161\./,
  /^162\./,
  /^163\./,
  /^164\./,
  /^165\./,
  /^166\./,
  /^167\./,
  /^168\./,
  /^169\./,
  /^170\./,
  /^171\./,
  /^172\./,
  /^173\./,
  /^174\./,
  /^175\./,
  /^176\./,
  /^177\./,
  /^178\./,
  /^179\./,
  /^180\./,
  /^181\./,
  /^182\./,
  /^183\./,
  /^184\./,
  /^185\./,
  /^186\./,
  /^187\./,
  /^188\./,
  /^189\./,
  /^190\./,
  /^191\./,
  /^192\./,
  /^193\./,
  /^194\./,
  /^195\./,
  /^196\./,
  /^197\./,
  /^198\./,
  /^199\./,
  /^200\./,
  /^201\./,
  /^202\./,
  /^203\./,
  /^204\./,
  /^205\./,
  /^206\./,
  /^207\./,
  /^208\./,
  /^209\./,
  /^210\./,
  /^211\./,
  /^212\./,
  /^213\./,
  /^214\./,
  /^215\./,
  /^216\./,
  /^217\./,
  /^218\./,
  /^219\./,
  /^220\./,
  /^221\./,
  /^222\./,
  /^223\./,
];

// Known reviewer/bot user agents that should see cloaked content
const REVIEWER_USER_AGENTS = [
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'pinterestbot',
  'slackbot',
  'telegrambot',
  'whatsapp',
  'discordbot',
  'applebot',
];

export interface BotDetectionResult {
  isBot: boolean;
  isReviewer: boolean;
  isDataCenter: boolean;
  botType: string | null;
  confidence: number;
  shouldCloak: boolean;
  shouldBlock: boolean;
}

/**
 * Detect if the current visitor is a bot
 */
export function detectBot(userAgent: string | null, ip?: string): BotDetectionResult {
  const result: BotDetectionResult = {
    isBot: false,
    isReviewer: false,
    isDataCenter: false,
    botType: null,
    confidence: 0,
    shouldCloak: false,
    shouldBlock: false,
  };

  if (!userAgent) {
    result.isBot = true;
    result.confidence = 0.9;
    result.botType = 'unknown-no-ua';
    result.shouldBlock = true;
    return result;
  }

  const uaLower = userAgent.toLowerCase();

  // Check for known bots
  for (const bot of KNOWN_BOT_USER_AGENTS) {
    if (uaLower.includes(bot)) {
      result.isBot = true;
      result.botType = bot;
      result.confidence = 0.95;

      // Check if it's a reviewer bot
      if (REVIEWER_USER_AGENTS.includes(bot)) {
        result.isReviewer = true;
        result.shouldCloak = true;
      } else {
        // Block known scrapers that don't help SEO
        if (['ahrefsbot', 'semrushbot', 'dotbot', 'mj12bot', 'seznambot'].includes(bot)) {
          result.shouldBlock = true;
        }
      }
      break;
    }
  }

  // Check for data center IPs
  if (ip) {
    for (const pattern of DATA_CENTER_IP_PATTERNS) {
      if (pattern.test(ip)) {
        result.isDataCenter = true;
        result.confidence = Math.max(result.confidence, 0.7);
        result.shouldCloak = true;
        break;
      }
    }
  }

  // Check for suspicious patterns in user agent
  if (!result.isBot) {
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /java/i,
      /go-http/i,
      /node/i,
      /phantomjs/i,
      /headless/i,
      /selenium/i,
      /puppeteer/i,
      /playwright/i,
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(userAgent)) {
        result.isBot = true;
        result.confidence = 0.8;
        result.botType = 'suspicious-pattern';
        result.shouldBlock = true;
        break;
      }
    }
  }

  return result;
}

/**
 * Check if a request should be blocked
 */
export function shouldBlockRequest(userAgent: string | null, ip?: string): boolean {
  const detection = detectBot(userAgent, ip);
  return detection.shouldBlock;
}

/**
 * Check if content should be cloaked
 */
export function shouldCloakContent(userAgent: string | null, ip?: string): boolean {
  const detection = detectBot(userAgent, ip);
  return detection.shouldCloak;
}

/**
 * Get cloaked content type based on visitor profile
 */
export function getCloakedContentType(userAgent: string | null): 'coming-soon' | 'educational' | 'full' {
  if (!userAgent) return 'coming-soon';

  const uaLower = userAgent.toLowerCase();

  // Show educational content to reviewer bots
  for (const reviewer of REVIEWER_USER_AGENTS) {
    if (uaLower.includes(reviewer)) {
      return 'educational';
    }
  }

  // Show full content to real browsers
  if (uaLower.includes('mozilla') || uaLower.includes('chrome') || uaLower.includes('safari') || uaLower.includes('firefox')) {
    return 'full';
  }

  return 'coming-soon';
}

/**
 * Generate a honeypot link that only bots will click
 */
export function generateHoneypotLink(): string {
  const randomId = Math.random().toString(36).substring(7);
  return `/hidden-trap-${randomId}`;
}

/**
 * Track honeypot interaction
 */
export function trackHoneypotInteraction(ip: string): void {
  // In production, this would log to a database or external service
  console.warn(`[HONEYPOT] Bot detected from IP: ${ip}`);
}

/**
 * Check if an IP is blocked (always returns false - server-side only)
 */
export function isIPBlocked(ip: string): boolean {
  return false;
}
