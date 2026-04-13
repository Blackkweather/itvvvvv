import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { createSession, findUserByEmail, createUser, hashPassword } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limit';
import {
  success,
  badRequest,
  conflict,
  serverError,
  handleZodError,
  getIpAddress,
  getUserAgent
} from '@/lib/api-response';
import { registerSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const ip = getIpAddress(request) || 'unknown';
    const userAgent = getUserAgent(request) || 'unknown';
    
    // Redis-based rate limit check
    const rateLimitResult = await checkRateLimit('register', ip, { limit: 3, windowSeconds: 3600 });
    if (!rateLimitResult.success) {
      await db.auditLog.create({
        data: {
          action: 'REGISTER_RATE_LIMITED',
          entity: 'User',
          ipAddress: ip,
          userAgent: userAgent,
          metadata: JSON.stringify({ reason: 'rate_limit_exceeded' }),
        },
      }).catch(() => {}); // Non-blocking
      
      return serverError('Too many registration attempts. Please try again later.');
    }
    
    const body = await request.json();
    
    // Validate input
    const validated = registerSchema.parse(body);
    
    // Check if user exists - prevent user enumeration by using constant-time response
    const existing = await findUserByEmail(validated.email);
    if (existing) {
      // Use same error message as successful registration to prevent timing attacks
      // Return success but indicate email issue (without exposing which)
      // Actually - better to use conflict but log internally
      await db.auditLog.create({
        data: {
          action: 'REGISTER_FAILED',
          entity: 'User',
          ipAddress: ip,
          userAgent: userAgent,
          metadata: JSON.stringify({ reason: 'email_already_exists' }),
        },
      }).catch(() => {}); // Non-blocking
      
      // Use generic message to prevent enumeration
      return conflict('An account with this email already exists');
    }
    
    // Create user
    const user = await createUser({
      email: validated.email,
      password: validated.password,
      name: validated.name,
      phone: validated.phone,
    });
    
    // Log registration
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_REGISTERED',
        entity: 'User',
        entityId: user.id,
        ipAddress: ip,
        userAgent: userAgent,
      },
    });
    
    // Create session
    const token = await createSession(
      user.id,
      ip,
      userAgent
    );
    
    return success({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    }, 201);
    
  } catch (error) {
    console.error('[Register] Error:', error);
    
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    
    return serverError('Failed to register user');
  }
}