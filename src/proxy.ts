import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { detectBot, shouldBlockRequest, shouldCloakContent } from '@/lib/bot-detection';

const COOKIE_NAME = process.env.COOKIE_NAME || 'streampro_session';

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/pricing',
  '/blog',
  '/trailers',
  '/legal',
  '/contact',
  '/ipTV-setup',
  '/android-tv',
  '/firestick',
  '/smart-tv',
  '/ios',
  '/windows',
  '/macos',
  '/linux',
  '/api/auth/login',
  '/api/auth/register',
  '/api/newsletter',
  '/api/webhooks/stripe',
];

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
  
  return 'unknown';
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('X-Stealth-Mode', 'active');
  
  const existingCSP = response.headers.get('Content-Security-Policy') || '';
  const nextConfigCSP = "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://aclib.acintelligence.com";
  const mergedCSP = existingCSP 
    ? `${existingCSP}; ${nextConfigCSP}`
    : nextConfigCSP;
  
  response.headers.set('Content-Security-Policy', mergedCSP);
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const clientIP = getClientIP(request);

  // Allow public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  }

  // Block seed endpoint in production
  if (pathname === '/api/seed' && process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } },
      { status: 403 }
    );
  }

  // For development, require CSRF token for seed
  if (pathname === '/api/seed' && process.env.NODE_ENV !== 'production') {
    const csrfToken = request.headers.get('x-csrf-token');
    if (!csrfToken) {
      return NextResponse.json(
        { success: false, error: { message: 'CSRF token required', code: 'UNAUTHORIZED' } },
        { status: 401 }
      );
    }
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  }

  // Skip bot detection in development mode
  if (process.env.NODE_ENV !== 'development') {
    const botDetection = detectBot(userAgent, clientIP);
    
    if (botDetection.isBot) {
      console.log(`[BOT DETECTION] IP: ${clientIP}, UA: ${userAgent}, Path: ${pathname}, Type: ${botDetection.botType}`);
    }
    
    if (shouldBlockRequest(userAgent, clientIP)) {
      console.log(`[BLOCKED] IP: ${clientIP}, UA: ${userAgent}`);
      return new NextResponse(null, { status: 403 });
    }
    
    if (shouldCloakContent(userAgent, clientIP)) {
      console.log(`[CLOAKED] IP: ${clientIP}, UA: ${userAgent}, Path: ${pathname}`);
      const response = NextResponse.next();
      response.headers.set('X-Content-Cloak', 'educational');
      return addSecurityHeaders(response);
    }
  }

  // Check for session token in cookies
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized', code: 'UNAUTHORIZED' } },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  // Verify token
  const payload = verifyToken(token);
  if (!payload) {
    const response = pathname.startsWith('/api/')
      ? NextResponse.json(
          { success: false, error: { message: 'Invalid token', code: 'UNAUTHORIZED' } },
          { status: 401 }
        )
      : NextResponse.redirect(new URL('/dashboard/login', request.url));

    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  // Add user info to headers for downstream use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', payload.userId);
  requestHeaders.set('x-user-email', payload.email);
  requestHeaders.set('x-user-role', payload.role);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return addSecurityHeaders(response);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|images).*)',
  ],
};