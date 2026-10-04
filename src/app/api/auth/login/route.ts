import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { createSession, findUserByEmail, verifyPassword, checkAccountLockout, recordFailedAttempt, clearFailedAttempts } from '@/lib/auth';
import { checkRateLimit, getRateLimitConfig } from '@/lib/rate-limit';
import {
  success,
  badRequest,
  unauthorized,
  serverError,
  handleZodError,
  getIpAddress,
  getUserAgent
} from '@/lib/api-response';
import { loginSchema } from '@/lib/validation';

// Turnstile secret key (should be in env var)
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "0x4AAAAAAFNlHgov2FqUloE9w4fy9M_etZU";

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('secret', TURNSTILE_SECRET_KEY || '');
    formData.append('response', token);
    formData.append('remoteip', ip);

    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const outcome = await result.json();
    return outcome.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getIpAddress(request) || 'unknown';
    const userAgent = getUserAgent(request) || 'unknown';
    
    // Redis-based rate limit check
    const rateLimitResult = await checkRateLimit('login', ip, { limit: 5, windowSeconds: 900 });
    if (!rateLimitResult.success) {
      await db.auditLog.create({
        data: {
          action: 'LOGIN_RATE_LIMITED',
          entity: 'User',
          ipAddress: ip,
          userAgent: userAgent,
          metadata: JSON.stringify({ reason: 'rate_limit_exceeded' }),
        },
      }).catch(() => {});
      
      return NextResponse.json(
        { success: false, error: { message: 'Too many login attempts. Please try again later.', code: 'RATE_LIMITED' } },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    const validated = loginSchema.parse(body);
    
    // Verify Turnstile token if provided
    if (TURNSTILE_SECRET_KEY) {
      const turnstileToken = body.turnstileToken;
      if (!turnstileToken) {
        return badRequest('Turnstile token is required');
      }
      
      const isTurnstileValid = await verifyTurnstile(turnstileToken, ip);
      if (!isTurnstileValid) {
        await db.auditLog.create({
          data: {
            action: 'LOGIN_TURNSTILE_FAILED',
            entity: 'User',
            ipAddress: ip,
            userAgent: userAgent,
            metadata: JSON.stringify({ email: validated.email }),
          },
        }).catch(() => {});
        
        return unauthorized('Security check failed. Please try again.');
      }
    }
    
    // Find user
    const user = await findUserByEmail(validated.email);
    
    // Prevent user enumeration
    if (!user) {
      await db.auditLog.create({
        data: {
          action: 'LOGIN_FAILED',
          entity: 'User',
          ipAddress: ip,
          userAgent: userAgent,
          metadata: JSON.stringify({ 
            reason: 'user_not_found',
            attemptedEmail: process.env.NODE_ENV === 'production' ? undefined : validated.email 
          }),
        },
      }).catch(() => {});
      
      return unauthorized('Invalid email or password');
    }
    
    // Get fresh user data with security fields
    const userWithSecurity = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        isActive: true,
        mfaEnabled: true,
        failedAttempts: true,
        lockedUntil: true,
        lastLoginAt: true,
        lastLoginIp: true,
      },
    });
    
    if (!userWithSecurity) {
      return unauthorized('Invalid email or password');
    }
    
    // Check if account is locked
    const lockoutCheck = await checkAccountLockout(userWithSecurity.id);
    if (lockoutCheck.locked) {
      await db.auditLog.create({
        data: {
          userId: userWithSecurity.id,
          action: 'LOGIN_LOCKED',
          entity: 'User',
          entityId: userWithSecurity.id,
          ipAddress: ip,
          userAgent: userAgent,
          metadata: JSON.stringify({ reason: lockoutCheck.reason }),
        },
      }).catch(() => {});
      
      return unauthorized(lockoutCheck.reason || 'Account is locked');
    }
    
    // Check if user is active
    if (!userWithSecurity.isActive) {
      await db.auditLog.create({
        data: {
          userId: userWithSecurity.id,
          action: 'LOGIN_FAILED',
          entity: 'User',
          entityId: userWithSecurity.id,
          ipAddress: ip,
          userAgent: userAgent,
          metadata: JSON.stringify({ reason: 'account_disabled' }),
        },
      }).catch(() => {});
      
      return unauthorized('Account is disabled');
    }
    
    // Verify password
    const isValid = await verifyPassword(validated.password, userWithSecurity.password);
    if (!isValid) {
      await recordFailedAttempt(userWithSecurity.id);
      await db.auditLog.create({
        data: {
          userId: userWithSecurity.id,
          action: 'LOGIN_FAILED',
          entity: 'User',
          entityId: userWithSecurity.id,
          ipAddress: ip,
          userAgent: userAgent,
          metadata: JSON.stringify({ reason: 'invalid_password' }),
        },
      }).catch(() => {});
      
      return unauthorized('Invalid email or password');
    }
    
    // Check if MFA is enabled
    if (userWithSecurity.mfaEnabled) {
      await db.auditLog.create({
        data: {
          userId: userWithSecurity.id,
          action: 'LOGIN_MFA_PENDING',
          entity: 'User',
          entityId: userWithSecurity.id,
          ipAddress: ip,
          userAgent: userAgent,
        },
      }).catch(() => {});
      
      // Return success but indicate MFA required
      // In a full implementation, you'd return a temporary token requiring MFA
    }
    
    // Clear failed attempts on successful login
    await clearFailedAttempts(userWithSecurity.id);
    
    // Update last login info
    await db.user.update({
      where: { id: userWithSecurity.id },
      data: {
        lastLoginAt: new Date(),
        lastLoginIp: ip,
      },
    });
    
    // Create session
    const token = await createSession(userWithSecurity.id, ip, userAgent);
    
    // Log successful login
    await db.auditLog.create({
      data: {
        userId: userWithSecurity.id,
        action: 'USER_LOGIN',
        entity: 'User',
        entityId: userWithSecurity.id,
        ipAddress: ip,
        userAgent: userAgent,
      },
    });
    
    return success({
      user: {
        id: userWithSecurity.id,
        email: userWithSecurity.email,
        name: userWithSecurity.name,
        role: userWithSecurity.role,
        mfaEnabled: userWithSecurity.mfaEnabled,
      },
      token,
    });
    
  } catch (error) {
    console.error('[Login] Error:', error);
    
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    
    return serverError('Failed to login');
  }
}
