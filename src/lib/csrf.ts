/**
 * CSRF Protection Utility
 * Provides token-based CSRF protection for API routes
 */

import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * Generate a new CSRF token
 */
export function generateCsrfToken(): string {
  return randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Set CSRF token in cookie
 */
export async function setCsrfCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

/**
 * Get CSRF token from cookie
 */
export async function getCsrfCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(CSRF_COOKIE_NAME);
  return cookie?.value || null;
}

/**
 * Verify CSRF token from request header against cookie
 */
export async function verifyCsrfToken(request: Request): Promise<boolean> {
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  const cookieToken = await getCsrfCookie();
  
  if (!headerToken || !cookieToken) {
    return false;
  }
  
  // Constant-time comparison to prevent timing attacks
  if (headerToken.length !== cookieToken.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < headerToken.length; i++) {
    result |= headerToken.charCodeAt(i) ^ cookieToken.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Middleware to ensure CSRF token exists for GET requests
 * and verify it for state-changing requests (POST, PUT, DELETE, PATCH)
 */
export async function ensureCsrfToken(): Promise<string> {
  let token = await getCsrfCookie();
  
  if (!token) {
    token = generateCsrfToken();
    await setCsrfCookie(token);
  }
  
  return token;
}

/**
 * Get CSRF header name for client-side use
 */
export function getCsrfHeaderName(): string {
  return CSRF_HEADER_NAME;
}
