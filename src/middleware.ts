import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { detectBot, shouldBlockRequest, shouldCloakContent } from '@/lib/bot-detection';

/**
 * Get client IP from request
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  // NextRequest.ip is not available in all environments
  // Fall back to 'unknown' if not available
  return 'unknown';
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Add headers to prevent caching of sensitive pages
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  // Add custom header to indicate stealth mode is active
  response.headers.set('X-Stealth-Mode', 'active');
  
  // Content Security Policy
  // Adjust this policy based on your application's needs
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: http:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com",
    "frame-src 'self' https://www.googletagmanager.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  // Additional security headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');
  const clientIP = getClientIP(request);
  const { pathname } = request.nextUrl;
  
  // Use consolidated bot detection
  const botDetection = detectBot(userAgent, clientIP);
  
  // Log bot detection for monitoring
  if (botDetection.isBot) {
    console.log(`[BOT DETECTION] IP: ${clientIP}, UA: ${userAgent}, Path: ${pathname}, Type: ${botDetection.botType}`);
  }
  
  // Block malicious requests
  if (shouldBlockRequest(userAgent, clientIP)) {
    console.log(`[BLOCKED] IP: ${clientIP}, UA: ${userAgent}`);
    
    // Return 403 Forbidden
    return new NextResponse(null, { status: 403 });
  }
  
  // Check if content should be cloaked
  if (shouldCloakContent(userAgent, clientIP)) {
    console.log(`[CLOAKED] IP: ${clientIP}, UA: ${userAgent}, Path: ${pathname}`);
    
    // For reviewer bots, redirect to educational content
    if (botDetection.isReviewer) {
      // Allow the request to continue but add cloaking header
      const response = NextResponse.next();
      response.headers.set('X-Content-Cloak', 'educational');
      return addSecurityHeaders(response);
    }
    
    // For data center IPs, add cloaking header
    const response = NextResponse.next();
    response.headers.set('X-Content-Cloak', 'datacenter');
    return addSecurityHeaders(response);
  }
  
  // For legitimate users, add security headers
  const response = NextResponse.next();
  return addSecurityHeaders(response);
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - images folder (static images)
     *
     * NOTE: API routes ARE included to ensure bot detection applies to all endpoints
     */
    '/((?!_next/static|_next/image|favicon.ico|public|images).*)',
  ],
};
