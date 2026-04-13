import { Redis } from '@upstash/redis';

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_TOKEN;

let redis: Redis | null = null;
let isInitialized = false;

export function getRedis(): Redis | null {
  if (!isInitialized) {
    if (!REDIS_URL || !REDIS_TOKEN) {
      console.warn('[Redis] REDIS_URL or REDIS_TOKEN not configured');
      isInitialized = true;
      return null;
    }
    
    try {
      redis = new Redis({
        url: REDIS_URL,
        token: REDIS_TOKEN,
      });
      isInitialized = true;
      console.log('[Redis] Client initialized');
    } catch (error) {
      console.error('[Redis] Failed to initialize:', error);
      redis = null;
      isInitialized = true;
    }
  }
  return redis;
}

export async function checkRedisConnection(): Promise<boolean> {
  const client = getRedis();
  if (!client) return false;
  
  try {
    await client.ping();
    return true;
  } catch (error) {
    console.error('[Redis] Connection check failed:', error);
    return false;
  }
}
