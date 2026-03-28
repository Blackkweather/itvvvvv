/**
 * Cloudflare Worker for Edge-Level Bot Filtering
 * Deploy this to Cloudflare Workers to intercept all incoming requests
 * before they reach your origin server
 */

// Known bot user agents to block
const BOTS_TO_BLOCK = [
  'ahrefsbot',
  'semrushbot',
  'dotbot',
  'mj12bot',
  'seznambot',
  'petalbot',
  'bytespider',
  'screaming frog',
  'sitebulb',
  'deepcrawl',
  'oncrawl',
  'botify',
  'contentking',
];

// Known reviewer bots to cloak
const REVIEWER_BOTS = [
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

// Data center IP ranges to challenge
const DATA_CENTER_RANGES = [
  // AWS
  '3.', '13.', '15.', '18.', '52.', '54.', '35.', '107.', '184.', '205.', '207.', '209.',
  // Google Cloud
  '34.', '35.', '104.', '107.', '108.', '130.', '136.', '142.', '146.', '147.', '148.', '149.',
  '150.', '151.', '152.', '162.', '163.', '164.', '165.', '166.', '167.', '168.', '169.', '170.',
  '171.', '172.', '173.', '174.', '175.', '176.', '177.', '178.', '179.', '180.', '181.', '182.',
  '183.', '184.', '185.', '186.', '187.', '188.', '189.', '190.', '191.', '192.', '193.', '194.',
  '195.', '196.', '197.', '198.', '199.', '200.', '201.', '202.', '203.', '204.', '205.', '206.',
  '207.', '208.', '209.', '210.', '211.', '212.', '213.', '214.', '215.', '216.', '217.', '218.',
  '219.', '220.', '221.', '222.', '223.',
  // Azure
  '13.', '20.', '40.', '52.', '65.', '104.', '137.', '138.', '139.', '140.', '141.', '142.',
  '143.', '144.', '145.', '146.', '147.', '148.', '149.', '150.', '151.', '152.', '153.', '154.',
  '155.', '156.', '157.', '158.', '159.', '160.', '161.', '162.', '163.', '164.', '165.', '166.',
  '167.', '168.', '169.', '170.', '171.', '172.', '173.', '174.', '175.', '176.', '177.', '178.',
  '179.', '180.', '181.', '182.', '183.', '184.', '185.', '186.', '187.', '188.', '189.', '190.',
  '191.', '192.', '193.', '194.', '195.', '196.', '197.', '198.', '199.', '200.', '201.', '202.',
  '203.', '204.', '205.', '206.', '207.', '208.', '209.', '210.', '211.', '212.', '213.', '214.',
  '215.', '216.', '217.', '218.', '219.', '220.', '221.', '222.', '223.',
];

// Suspicious user agent patterns
const SUSPICIOUS_PATTERNS = [
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

/**
 * Check if user agent is a known bot to block
 */
function isBotToBlock(userAgent) {
  if (!userAgent) return true;
  
  const uaLower = userAgent.toLowerCase();
  
  for (const bot of BOTS_TO_BLOCK) {
    if (uaLower.includes(bot)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if user agent is a reviewer bot
 */
function isReviewerBot(userAgent) {
  if (!userAgent) return false;
  
  const uaLower = userAgent.toLowerCase();
  
  for (const bot of REVIEWER_BOTS) {
    if (uaLower.includes(bot)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if IP is from a data center
 */
function isDataCenterIP(ip) {
  for (const range of DATA_CENTER_RANGES) {
    if (ip.startsWith(range)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if user agent has suspicious patterns
 */
function hasSuspiciousPattern(userAgent) {
  if (!userAgent) return true;
  
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(userAgent)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Get client IP from request
 */
function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || 
         request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         'unknown';
}

/**
 * Generate cloaked HTML for bots
 */
function generateCloakedHTML() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StreamPro - Streaming Technology Education</title>
  <meta name="description" content="Learn about IPTV technology, streaming protocols, and the future of digital entertainment.">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #020205;
      color: #F8FAFC;
      line-height: 1.6;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(to right, #D4AF37, #8B5CF6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    h2 {
      font-size: 1.5rem;
      margin: 2rem 0 1rem;
      color: #D4AF37;
    }
    p {
      margin-bottom: 1rem;
      color: #94A3B8;
    }
    .card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 1rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Streaming Technology Education</h1>
    <p>Learn about IPTV technology, streaming protocols, and the future of digital entertainment.</p>
    
    <div class="card">
      <h2>What is IPTV?</h2>
      <p>IPTV (Internet Protocol Television) is a system where television services are delivered using the internet protocol suite over a packet-switched network such as a LAN or the internet, instead of being delivered through traditional terrestrial, satellite, or cable television formats.</p>
      <p>Unlike traditional TV that broadcasts content in real-time, IPTV gives you the power to stream your favorite content on demand. This technology represents the future of television entertainment.</p>
    </div>
    
    <div class="card">
      <h2>How Does Streaming Work?</h2>
      <p>Video content is broken into small data packets and transmitted over the internet. These packets are reassembled by your device in real-time, allowing you to watch content without downloading entire files.</p>
      <p>Modern streaming uses advanced codecs like H.265 and AV1 to compress video efficiently, delivering high-quality 4K content at manageable bitrates.</p>
    </div>
    
    <div class="card">
      <h2>The Future of Television</h2>
      <p>The television industry is undergoing its biggest transformation since the advent of color TV. IPTV is leading this revolution, with over 60% of new TV subscribers choosing IPTV over traditional cable in 2026.</p>
      <p>Key trends include 8K streaming, AI-powered recommendations, interactive TV experiences, and cloud DVR evolution. The future of television is streaming.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate blocked response
 */
function generateBlockedResponse() {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Access Denied</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #020205;
      color: #F8FAFC;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #EF4444;
    }
    p {
      color: #94A3B8;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Access Denied</h1>
    <p>Automated access is not permitted. If you believe this is an error, please contact support.</p>
  </div>
</body>
</html>`,
    {
      status: 403,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store',
      },
    }
  );
}

/**
 * Main request handler
 */
async function handleRequest(request) {
  const userAgent = request.headers.get('user-agent');
  const clientIP = getClientIP(request);
  const url = new URL(request.url);
  
  // Log bot detection
  if (userAgent && (isBotToBlock(userAgent) || hasSuspiciousPattern(userAgent))) {
    console.log(`[BOT DETECTION] IP: ${clientIP}, UA: ${userAgent}, Path: ${url.pathname}`);
  }
  
  // Block known scrapers
  if (isBotToBlock(userAgent)) {
    console.log(`[BLOCKED] IP: ${clientIP}, UA: ${userAgent}`);
    return generateBlockedResponse();
  }
  
  // Block suspicious patterns
  if (hasSuspiciousPattern(userAgent)) {
    console.log(`[BLOCKED] IP: ${clientIP}, UA: ${userAgent}`);
    return generateBlockedResponse();
  }
  
  // Challenge data center IPs with Managed Challenge
  if (isDataCenterIP(clientIP)) {
    console.log(`[CHALLENGE] IP: ${clientIP}, UA: ${userAgent}`);
    
    // Return a challenge page
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifying your browser</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #020205;
      color: #F8FAFC;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    p {
      color: #94A3B8;
      margin-bottom: 1rem;
    }
    .spinner {
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: #D4AF37;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="spinner"></div>
    <h1>Verifying your browser</h1>
    <p>Please wait while we verify you're not a bot...</p>
  </div>
  <script>
    // Auto-redirect after 3 seconds
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 3000);
  </script>
</body>
</html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store',
        },
      }
    );
  }
  
  // Cloak content for reviewer bots
  if (isReviewerBot(userAgent)) {
    console.log(`[CLOAKED] IP: ${clientIP}, UA: ${userAgent}, Path: ${url.pathname}`);
    
    return new Response(generateCloakedHTML(), {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store',
        'X-Content-Cloak': 'educational',
      },
    });
  }
  
  // For legitimate users, forward to origin
  return fetch(request);
}

// Export for Cloudflare Workers
export default {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  },
};
