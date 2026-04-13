import { db } from './db';

export type SecurityEventType = 
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILED'
  | 'LOGIN_LOCKED'
  | 'LOGIN_RATE_LIMITED'
  | 'PASSWORD_RESET_REQUESTED'
  | 'PASSWORD_RESET_COMPLETED'
  | 'MFA_ENABLED'
  | 'MFA_DISABLED'
  | 'SUSPICIOUS_ACTIVITY'
  | 'SESSION_CREATED'
  | 'SESSION_INVALIDATED'
  | 'ACCOUNT_CREATED';

export type SecuritySeverity = 'INFO' | 'WARNING' | 'CRITICAL';

interface SecurityEventData {
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

const CRITICAL_ACTIONS = new Set([
  'LOGIN_FAILED',
  'LOGIN_LOCKED',
  'LOGIN_RATE_LIMITED',
  'SUSPICIOUS_ACTIVITY',
]);

/**
 * Log a security event to the database
 */
export async function logSecurityEvent(
  action: SecurityEventType,
  severity: SecuritySeverity,
  data: SecurityEventData
): Promise<void> {
  try {
    await db.auditLog.create({
      data: {
        userId: data.userId,
        action,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    });

    // For critical events, log to console for alerting
    if (severity === 'CRITICAL') {
      console.error(`[SECURITY] ${action}:`, {
        ...data,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    // Never throw - logging should never break the app
    console.error('[Security] Failed to log event:', error);
  }
}

/**
 * Check for suspicious activity patterns
 */
export async function checkSuspiciousActivity(
  userId: string,
  ipAddress: string
): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  // Check for multiple failed logins in the last hour
  const failedLogins = await db.auditLog.count({
    where: {
      userId,
      action: 'LOGIN_FAILED',
      createdAt: { gte: oneHourAgo },
    },
  });

  if (failedLogins >= 10) {
    await logSecurityEvent('SUSPICIOUS_ACTIVITY', 'CRITICAL', {
      userId,
      ipAddress,
      metadata: { reason: 'multiple_failed_logins', count: failedLogins },
    });
    return true;
  }

  // Check for logins from different IPs in short succession
  const recentLogins = await db.auditLog.findMany({
    where: {
      userId,
      action: { in: ['USER_LOGIN', 'LOGIN_SUCCESS'] },
      createdAt: { gte: oneHourAgo },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const uniqueIPs = new Set(recentLogins.map(l => l.ipAddress).filter(Boolean));
  if (uniqueIPs.size >= 3) {
    await logSecurityEvent('SUSPICIOUS_ACTIVITY', 'WARNING', {
      userId,
      ipAddress,
      metadata: { reason: 'multiple_ips', uniqueIPs: Array.from(uniqueIPs) },
    });
    return true;
  }

  return false;
}

/**
 * Get security summary for a user
 */
export async function getSecuritySummary(userId: string): Promise<{
  failedLogins: number;
  lastLogin: Date | null;
  mfaEnabled: boolean;
  accountAge: number;
}> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      createdAt: true,
      lastLoginAt: true,
      mfaEnabled: true,
      failedAttempts: true,
    },
  });

  if (!user) {
    return {
      failedLogins: 0,
      lastLogin: null,
      mfaEnabled: false,
      accountAge: 0,
    };
  }

  return {
    failedLogins: user.failedAttempts,
    lastLogin: user.lastLoginAt,
    mfaEnabled: user.mfaEnabled,
    accountAge: Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
  };
}

/**
 * Invalidate all sessions for a user (except current)
 */
export async function invalidateAllSessions(userId: string, exceptToken?: string): Promise<void> {
  await db.session.updateMany({
    where: {
      userId,
      isActive: true,
      token: { not: exceptToken || '' },
    },
    data: { isActive: false },
  });
}
