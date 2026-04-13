import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRateLimitConfig, RateLimitResult } from '@/lib/rate-limit';
import { getIpAddress } from '@/lib/api-response';

export interface RateLimitOptions {
  limit?: number;
  windowSeconds?: number;
  keyPrefix?: string;
}

export async function withRateLimit(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
  options?: RateLimitOptions
): Promise<NextResponse> {
  const ip = getIpAddress(request) || 'unknown';
  const path = request.nextUrl.pathname;
  
  const config = options?.limit && options?.windowSeconds
    ? { limit: options.limit, windowSeconds: options.windowSeconds }
    : getRateLimitConfig(path);
  
  const keyPrefix = options?.keyPrefix || path.split('/').slice(0, 3).join('/');
  
  const result = await checkRateLimit(keyPrefix, ip, config);
  
  const response = await handler(request);
  
  response.headers.set('X-RateLimit-Limit', result.limit.toString());
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
  response.headers.set('X-RateLimit-Reset', Math.floor(result.resetAt / 1000).toString());
  
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: { message: 'Too many requests. Please try again later.', code: 'RATE_LIMITED' } },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.floor(result.resetAt / 1000).toString(),
          'Retry-After': Math.ceil((result.resetAt - Date.now()) / 1000).toString(),
        }
      }
    );
  }
  
  return response;
}

/**
 * Create a rate-limited API handler
 */
export function createRateLimitedHandler(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options?: RateLimitOptions
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    return withRateLimit(request, handler, options);
  };
}
