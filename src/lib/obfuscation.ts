/**
 * JavaScript Obfuscation for Conversion Elements
 * Loads sensitive conversion elements via encrypted JavaScript
 * Only executes for real browsers with human-like behavior
 */

interface ObfuscatedElement {
  id: string;
  type: 'button' | 'link' | 'form' | 'pricing';
  content: string;
  action: string;
}

// Encrypted conversion elements (base64 encoded)
const ENCRYPTED_ELEMENTS: ObfuscatedElement[] = [
  {
    id: 'buy-now-btn',
    type: 'button',
    content: 'QnV5IE5vdyAtIEdldCBTdHJlYW1Qcm8=',
    action: 'L3ByaWNpbmc=',
  },
  {
    id: 'pricing-link',
    type: 'link',
    content: 'VmlldyBQcmljaW5n',
    action: 'L3ByaWNpbmc=',
  },
  {
    id: 'subscribe-btn',
    type: 'button',
    content: 'U3Vic2NyaWJlIE5vdw==',
    action: 'L3ByaWNpbmc=',
  },
  {
    id: 'cta-button',
    type: 'button',
    content: 'U3RhcnQgU3RyZWFtaW5n',
    action: 'L3ByaWNpbmc=',
  },
];

// Human behavior thresholds
const HUMAN_THRESHOLDS = {
  mouseMovements: 5,
  clicks: 2,
  scrollDepth: 100, // pixels
  timeOnPage: 2000, // milliseconds
};

/**
 * Decode base64 encoded string
 */
function decodeBase64(encoded: string): string {
  if (typeof window !== 'undefined') {
    return atob(encoded);
  }
  return Buffer.from(encoded, 'base64').toString('utf-8');
}

/**
 * Check if user has demonstrated human-like behavior
 */
export function isHumanBehavior(): boolean {
  if (typeof window === 'undefined') return false;

  const mouseMovements = parseInt(localStorage.getItem('mouse_movements') || '0');
  const clicks = parseInt(localStorage.getItem('click_count') || '0');
  const scrollDepth = parseInt(localStorage.getItem('scroll_depth') || '0');
  const timeOnPage = Date.now() - parseInt(localStorage.getItem('page_load_time') || '0');

  return (
    mouseMovements >= HUMAN_THRESHOLDS.mouseMovements &&
    clicks >= HUMAN_THRESHOLDS.clicks &&
    scrollDepth >= HUMAN_THRESHOLDS.scrollDepth &&
    timeOnPage >= HUMAN_THRESHOLDS.timeOnPage
  );
}

/**
 * Track human behavior
 */
export function trackHumanBehavior(): void {
  if (typeof window === 'undefined') return;

  // Track mouse movements
  let mouseMovements = 0;
  const handleMouseMove = () => {
    mouseMovements++;
    localStorage.setItem('mouse_movements', mouseMovements.toString());
  };

  // Track clicks
  let clickCount = 0;
  const handleClick = () => {
    clickCount++;
    localStorage.setItem('click_count', clickCount.toString());
  };

  // Track scroll depth
  let maxScrollDepth = 0;
  const handleScroll = () => {
    const scrollDepth = window.scrollY;
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
      localStorage.setItem('scroll_depth', maxScrollDepth.toString());
    }
  };

  // Store page load time
  localStorage.setItem('page_load_time', Date.now().toString());

  // Add event listeners
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('click', handleClick);
  window.addEventListener('scroll', handleScroll);

  // Cleanup after 10 seconds
  setTimeout(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('click', handleClick);
    window.removeEventListener('scroll', handleScroll);
  }, 10000);
}

/**
 * Decrypt and load conversion element
 */
export function loadObfuscatedElement(elementId: string): HTMLElement | null {
  if (typeof window === 'undefined') return null;

  // Only load if user has demonstrated human behavior
  if (!isHumanBehavior()) {
    return null;
  }

  const element = ENCRYPTED_ELEMENTS.find(el => el.id === elementId);
  if (!element) return null;

  const content = decodeBase64(element.content);
  const action = decodeBase64(element.action);

  // Create the element
  let htmlElement: HTMLElement;

  switch (element.type) {
    case 'button':
      const buttonElement = document.createElement('button');
      buttonElement.textContent = content;
      buttonElement.className = 'btn-primary';
      buttonElement.onclick = () => {
        window.location.href = action;
      };
      htmlElement = buttonElement;
      break;

    case 'link':
      const anchorElement = document.createElement('a');
      anchorElement.textContent = content;
      anchorElement.href = action;
      anchorElement.className = 'text-primary hover:text-primary/80 transition-colors';
      htmlElement = anchorElement;
      break;

    case 'form':
      const formElement = document.createElement('form');
      formElement.action = action;
      formElement.method = 'POST';
      htmlElement = formElement;
      break;

    case 'pricing':
      htmlElement = document.createElement('div');
      htmlElement.innerHTML = `
        <div class="glass rounded-2xl p-6">
          <h3 class="text-xl font-bold text-foreground mb-4">${content}</h3>
          <a href="${action}" class="btn-primary">View Pricing</a>
        </div>
      `;
      break;

    default:
      return null;
  }

  return htmlElement;
}

/**
 * Load all obfuscated conversion elements
 */
export function loadAllObfuscatedElements(): void {
  if (typeof window === 'undefined') return;

  // Wait for human behavior to be detected
  const checkInterval = setInterval(() => {
    if (isHumanBehavior()) {
      clearInterval(checkInterval);

      // Load all elements
      ENCRYPTED_ELEMENTS.forEach(element => {
        const container = document.getElementById(`obfuscated-${element.id}`);
        if (container) {
          const htmlElement = loadObfuscatedElement(element.id);
          if (htmlElement) {
            container.appendChild(htmlElement);
            container.style.display = 'block';
          }
        }
      });
    }
  }, 500);

  // Stop checking after 15 seconds
  setTimeout(() => {
    clearInterval(checkInterval);
  }, 15000);
}

/**
 * Initialize obfuscation system
 */
export function initObfuscation(): void {
  if (typeof window === 'undefined') return;

  // Track human behavior
  trackHumanBehavior();

  // Load obfuscated elements when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllObfuscatedElements);
  } else {
    loadAllObfuscatedElements();
  }
}

/**
 * Generate obfuscated HTML for a conversion element
 */
export function generateObfuscatedHTML(elementId: string): string {
  const element = ENCRYPTED_ELEMENTS.find(el => el.id === elementId);
  if (!element) return '';

  return `
    <div id="obfuscated-${element.id}" style="display: none;">
      <!-- Obfuscated element will be loaded here -->
    </div>
  `;
}

/**
 * Check if a URL should be obfuscated
 */
export function shouldObfuscateURL(url: string): boolean {
  const sensitivePaths = ['/pricing', '/subscribe', '/buy', '/checkout', '/payment'];
  return sensitivePaths.some(path => url.includes(path));
}

/**
 * Get obfuscated URL
 */
export function getObfuscatedURL(realURL: string): string {
  if (typeof window === 'undefined') return realURL;

  // Encode the real URL
  const encoded = btoa(realURL);

  // Return a decoy URL that redirects through our obfuscation layer
  return `/redirect/${encoded}`;
}
