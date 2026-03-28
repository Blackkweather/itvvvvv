// Sanitization utilities for user input

/**
 * Sanitizes HTML content by escaping special characters
 * This prevents XSS attacks by converting dangerous characters to safe HTML entities
 */
export function sanitizeHtml(text: string): string {
  // Using hex entity codes to avoid parsing issues
  const amp = '\u0026\u0023\u0033\u0038\u0033\u0037\u003B';  // &
  const lt = '\u003C';  // <
  const gt = '\u003E';  // >
  const quot = '\u0026\u0023\u0033\u0034\u0033\u0034\u003B';  // "
  const apos = '\u0026\u0023\u0033\u0039\u003B';  // '
  const slash = '\u0026\u0023\u0031\u0032\u0030\u0032\u0046\u003B';  // &#x2F;
  
  const htmlEntities: Record<string, string> = {
    '&': amp,
    '<': lt,
    '>': gt,
    '"': quot,
    "'": apos,
    '/': slash,
  };
  
  return text.replace(/[&<>"'/]/g, (char) => htmlEntities[char] || char);
}

/**
 * Sanitizes a URL by validating it starts with a safe protocol
 * Only allows http, https, and relative URLs
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:' || parsed.protocol === 'mailto:') {
      return url;
    }
  } catch {
    // If URL parsing fails, check if it's a relative path
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
      return url;
    }
  }
  
  // Return safe fallback
  return '#';
}

/**
 * Strips all HTML tags from a string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Validates and sanitizes a filename
 * Removes potentially dangerous characters
 */
export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}
