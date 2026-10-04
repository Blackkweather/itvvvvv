import { getRedis } from './redis';

export interface CacheEntry<T> {
  type: 'value';
  value: T;
}

export interface CacheMetadata {
  expires: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'never';
  priority: number;
}

/**
 * Simple cache with Redis backend
 * Supports: get, set, delete, and automatic expiration
 */
export class RedisCache {
  private static instance: RedisCache | null = null;

  private constructor() {}

  public static getInstance(): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache();
    }
    return RedisCache.instance;
  }

  private getRedisClient() {
    return getRedis();
  }

  /**
   * Get cached value with expiration
   */
  async get<T>(key: string): Promise<T | null> {
    const redis = this.getRedisClient();
    if (!redis) return null;

    try {
      // Use Redis GET and check expiration using PTTL (milliseconds)
      const value = await redis.get<T>(key);
      const ttl = await redis.ttl(key);

      if (!value) return null;
      if (ttl === -1) {
        // No expiration set, try to get it
        return value;
      }
      if (ttl <= 0) {
        await this.delete(key);
        return null;
      }

      return value;
    } catch (error) {
      console.error('[RedisCache] Get error:', error);
      return null;
    }
  }

  /**
   * Set value with expiration
   */
  async set<T>(key: string, value: T, duration: number = 3600): Promise<boolean> {
    const redis = this.getRedisClient();
    if (!redis) return false;

    try {
      await redis.set(key, value, { ex: duration });
      return true;
    } catch (error) {
      console.error('[RedisCache] Set error:', error);
      return false;
    }
  }

  /**
   * Delete cache entry
   */
  async delete(key: string): Promise<boolean> {
    const redis = this.getRedisClient();
    if (!redis) return false;

    try {
      await redis.del(key);
      return true;
    } catch (error) {
      console.error('[RedisCache] Delete error:', error);
      return false;
    }
  }

  /**
   * Get cache with expiration and automatic refresh
   */
  async getWithExpiration<T>(key: string, duration: number = 3600): Promise<T | null> {
    return this.get<T>(key);
  }

  /**
   * Set cache with custom expiration
   */
  async setWithExpiration<T>(key: string, value: T, duration: number = 3600): Promise<boolean> {
    return this.set<T>(key, value, duration);
  }

  /**
   * Increment a counter
   */
  async increment(key: string, amount: number = 1): Promise<number> {
    const redis = this.getRedisClient();
    if (!redis) return 0;

    try {
      const result = await redis.incr(key);
      // Set default expiration if not set
      const ttl = await redis.ttl(key);
      if (ttl === -1) {
        await redis.expire(key, 86400); // 24 hours default
      }
      return result;
    } catch (error) {
      console.error('[RedisCache] Increment error:', error);
      return 0;
    }
  }

  /**
   * Member operations (sets, sorted sets)
   */
  async addToSet(key: string, member: string, ttl: number = 3600): Promise<boolean> {
    const redis = this.getRedisClient();
    if (!redis) return false;

    try {
      await redis.sadd(key, member);
      await redis.expire(key, ttl);
      return true;
    } catch (error) {
      console.error('[RedisCache] Add to set error:', error);
      return false;
    }
  }

  async removeFromSet(key: string, member: string): Promise<number> {
    const redis = this.getRedisClient();
    if (!redis) return 0;

    try {
      return await redis.srem(key, member);
    } catch (error) {
      console.error('[RedisCache] Remove from set error:', error);
      return 0;
    }
  }

  /**
   * Connection health check
   */
  async checkConnection(): Promise<boolean> {
    const redis = this.getRedisClient();
    if (!redis) return false;

    try {
      await redis.ping();
      return true;
    } catch (error) {
      console.error('[RedisCache] Connection check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const cache = RedisCache.getInstance();
