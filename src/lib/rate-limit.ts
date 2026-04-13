import { getRedis } from './redis';

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

export interface RateLimitConfig {
  limit: number;
  windowSeconds: number;
}

const DEFAULT_LIMITS: Record<string, RateLimitConfig> = {
  'api': { limit: 60, windowSeconds: 60 },
  'whatsapp': { limit: 10, windowSeconds: 60 },
  'contact': { limit: 10, windowSeconds: 60 },
  'general': { limit: 200, windowSeconds: 60 },
  'auth': { limit: 5, windowSeconds: 900 },
  'login': { limit: 5, windowSeconds: 900 },
  'register': { limit: 3, windowSeconds: 3600 },
};

function getKey(prefix: string, identifier: string): string {
  return `ratelimit:${prefix}:${identifier}`;
}

/**
 * Check rate limit using sliding window algorithm with Redis sorted sets
 */
export async function checkRateLimit(
  prefix: string,
  identifier: string,
  config?: RateLimitConfig
): Promise<RateLimitResult> {
  const redis = getRedis();
  
  if (!redis) {
    console.warn(`[RateLimit] Redis not available, failing open for ${prefix}:${identifier}`);
    return {
      success: true,
      limit: config?.limit || DEFAULT_LIMITS[prefix]?.limit || 60,
      remaining: 999,
      resetAt: Date.now() + 60000,
    };
  }

  const key = getKey(prefix, identifier);
  const limit = config?.limit || DEFAULT_LIMITS[prefix]?.limit || 60;
  const windowSeconds = config?.windowSeconds || DEFAULT_LIMITS[prefix]?.windowSeconds || 60;
  const now = Date.now();
  const windowStart = now - (windowSeconds * 1000);

  try {
    const pipeline = redis.pipeline();
    
    pipeline.zadd(key, { score: now, member: now.toString() });
    pipeline.zremrangebyscore(key, 0, windowStart);
    pipeline.zcard(key);
    pipeline.expire(key, windowSeconds);
    
    const results = await pipeline.exec();
    const count = results?.[2] as number || 0;
    
    const resetAt = now + (windowSeconds * 1000);
    const remaining = Math.max(0, limit - count);
    
    if (count > limit) {
      console.log(`[RateLimit] Rate limited: ${prefix}:${identifier} (${count}/${limit})`);
      return {
        success: false,
        limit,
        remaining: 0,
        resetAt,
      };
    }
    
    return {
      success: true,
      limit,
      remaining,
      resetAt,
    };
  } catch (error) {
    console.error(`[RateLimit] Error checking rate limit for ${key}:`, error);
    return {
      success: true,
      limit,
      remaining: limit,
      resetAt: now + (windowSeconds * 1000),
    };
  }
}

/**
 * Simplified rate limit check using INCR + EXPIRE pattern
 * More efficient for high-traffic endpoints
 */
export async function checkRateLimitSimple(
  prefix: string,
  identifier: string,
  limit: number = 60,
  windowSeconds: number = 60
): Promise<RateLimitResult> {
  const redis = getRedis();
  
  if (!redis) {
    return {
      success: true,
      limit,
      remaining: 999,
      resetAt: Date.now() + (windowSeconds * 1000),
    };
  }

  const key = getKey(prefix, identifier);
  const now = Date.now();

  try {
    const [count] = await Promise.all([
      redis.incr(key),
      redis.expire(key, windowSeconds),
    ]);
    
    const resetAt = now + (windowSeconds * 1000);
    const remaining = Math.max(0, limit - (count || 0));
    
    if (count > limit) {
      return {
        success: false,
        limit,
        remaining: 0,
        resetAt,
      };
    }
    
    return {
      success: true,
      limit,
      remaining,
      resetAt,
    };
  } catch (error) {
    console.error(`[RateLimit] Error:`, error);
    return {
      success: true,
      limit,
      remaining: limit,
      resetAt: now + (windowSeconds * 1000),
    };
  }
}

/**
 * Get rate limit config by endpoint
 */
export function getRateLimitConfig(path: string): RateLimitConfig {
  if (path.startsWith('/api/auth/login')) {
    return DEFAULT_LIMITS.login;
  }
  if (path.startsWith('/api/auth/register')) {
    return DEFAULT_LIMITS.register;
  }
  if (path.includes('whatsapp') || path.includes('telegram')) {
    return DEFAULT_LIMITS.whatsapp;
  }
  if (path.startsWith('/api/')) {
    return DEFAULT_LIMITS.api;
  }
  return DEFAULT_LIMITS.general;
}

export const rateLimit = {
  check: checkRateLimit,
  checkSimple: checkRateLimitSimple,
  getConfig: getRateLimitConfig,
};
