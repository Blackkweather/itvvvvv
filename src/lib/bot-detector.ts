import { getRedis } from './redis';
import type { NextRequest } from 'next/server';

interface BotMetadata {
  ip: string;
  userAgent: string;
  detectedAt: number;
  attempts: number;
  blocked: boolean;
  durationSeconds: number;
}

/**
 * Bot detection and tracking using Redis
 * Monitors suspicious activity and tracks blocked IPs
 */
export class BotDetector {
  private static instance: BotDetector | null = null;

  private constructor() {}

  public static getInstance(): BotDetector {
    if (!BotDetector.instance) {
      BotDetector.instance = new BotDetector();
    }
    return BotDetector.instance;
  }

  private getRedisClient() {
    return getRedis();
  }

  /**
   * Check if IP has been blocked (under age limit)
   */
  isBotBlocked(ip: string, ageLimitSeconds: number = 300): Promise<{ blocked: boolean; reason?: string }> {
    return new Promise((resolve) => {
      const key = `bot:blocked:${ip}`;
      const redis = this.getRedisClient();
      if (!redis) {
        resolve({ blocked: false });
        return;
      }

      const ttlResult = redis.ttl(key);
      ttlResult.then((ttl: number) => {
        if (ttl > 0 && ttl < ageLimitSeconds) {
          resolve({ blocked: true, reason: `Bot detected, cooldown for ${ttl} more seconds` });
        } else {
          resolve({ blocked: false });
        }
      });
    });
  }

  /**
   * Mark IP as bot with reason
   */
  blockBot(ip: string, userAgent: string): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      const key = `bot:blocked:${ip}`;
      const metaKey = `bot:meta:${ip}`;
      const redis = this.getRedisClient();
      if (!redis) {
        resolve({ success: false });
        return;
      }

      redis.set(metaKey, JSON.stringify({
        ip,
        userAgent: userAgent || 'unknown',
        detectedAt: Date.now(),
        attempts: 0,
        blocked: true,
        durationSeconds: 300,
      } as BotMetadata), { ex: 3600 })
        .then(() => redis.setex(key, 300, 'blocked'))
        .then(() => resolve({ success: true }))
        .catch((error) => {
          console.error('[BotDetector] Block failed:', error);
          resolve({ success: false });
        });
    });
  }

  /**
   * Check for suspicious activity patterns
   */
  async checkSuspiciousActivity(sessionKey: string, maxAttempts: number = 5): Promise<{ suspicious: boolean; attempts: number }> {
    const key = `session:${sessionKey}:attempts`;
    const redis = this.getRedisClient();
    if (!redis) {
      return { suspicious: false, attempts: 0 };
    }

    try {
      const attempts = await redis.get(key) || 0;
      let attemptsNum = parseInt(attempts.toString()) || 0;
      const result: { suspicious: boolean; attempts: number } = { suspicious: false, attempts: attemptsNum };

      if (attemptsNum >= maxAttempts) {
        result.suspicious = true;
      }

      if (result.suspicious) {
        await redis.incr(key);
        await redis.expire(key, 3600);
      }

      return result;
    } catch (error) {
      console.error('[BotDetector] Check activity error:', error);
      return { suspicious: false, attempts: 0 };
    }
  }

  /**
   * Increment session attempts
   */
  async incrementSessionAttempts(sessionKey: string): Promise<number> {
    const key = `session:${sessionKey}:attempts`;
    const redis = this.getRedisClient();
    if (!redis) return 0;

    try {
      const attempts = await redis.incr(key);
      await redis.expire(key, 3600);
      return parseInt(attempts.toString()) || 0;
    } catch (error) {
      console.error('[BotDetector] Increment attempts error:', error);
      return 0;
    }
  }

  /**
   * Create first request
   */
  async createFirstRequest(sessionKey: string): Promise<void> {
    const redis = this.getRedisClient();
    if (!redis) return;

    try {
      await redis.setex(`session:${sessionKey}:started`, 86400, 'true');
    } catch (error) {
      console.error('[BotDetector] Create first request error:', error);
    }
  }

  /**
   * Get or create Unique ID for IP
   */
  async getOrCreateIPid(ip: string = '0.0.0.0'): Promise<{ ipid: string; hits: number }> {
    const redis = this.getRedisClient();
    if (!redis) {
      return { ipid: Date.now().toString(), hits: 0 };
    }

    const key = `ipid:${ip}`;
    try {
      const id = await redis.get<string>(key);
      const hits = await redis.incr(key);

      return {
        ipid: id || Date.now().toString(),
        hits: parseInt(hits.toString()) || 0,
      };
    } catch (error) {
      console.error('[BotDetector] Get or create IP error:', error);
      return { ipid: Date.now().toString(), hits: 0 };
    }
  }

  /**
   * Check if IP has been blocked
   */
  isBotBlockedSimple(ip: string, maxBlocks: number = 100): Promise<{ suspicious: boolean; blocks: number }> {
    return new Promise((resolve) => {
      const key = `ip:blocks:${ip}`;
      const redis = this.getRedisClient();
      if (!redis) {
        resolve({ suspicious: false, blocks: 0 });
        return;
      }

      let blocksNum = 0;
      redis.incr(key)
        .then((hits) => {
          blocksNum = parseInt(hits.toString()) || 0;
          const result: { suspicious: boolean; blocks: number } = { suspicious: false, blocks: blocksNum };
          if (blocksNum >= maxBlocks) {
            result.suspicious = true;
          }
          resolve(result);
        })
        .catch(() => resolve({ suspicious: false, blocks: 0 }));
    });
  }
}

// Export singleton instance
export const botDetector = BotDetector.getInstance();
