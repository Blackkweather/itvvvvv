import { NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { createSession, findUserByEmail, createUser, hashPassword } from '@/lib/auth';
import { authRateLimit } from '@/lib/rate-limit';
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
import { verifyCsrfToken } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  try {
    // CSRF protection
    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      return badRequest('Invalid CSRF token');
    }
    
    const ip = getIpAddress(request) || 'unknown';
    
    // Rate limit check
    const rateLimitResult = authRateLimit.register(ip);
    if (!rateLimitResult.success) {
      return serverError('Too many registration attempts. Please try again later.');
    }
    
    const body = await request.json();
    
    // Validate input
    const validated = registerSchema.parse(body);
    
    // Check if user exists
    const existing = await findUserByEmail(validated.email);
    if (existing) {
      return conflict('Email already registered');
    }
    
    // Create user
    const user = await createUser({
      email: validated.email,
      password: validated.password,
      name: validated.name,
      phone: validated.phone,
    });
    
    // TODO: Send verification email
    // In production, send an email with a verification link
    // For now, we'll just log that verification is needed
    console.log(`[Email Verification] User ${user.email} needs email verification`);
    
    // Create session
    const token = await createSession(
      user.id,
      getIpAddress(request),
      getUserAgent(request)
    );
    
    // Log audit
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_REGISTERED',
        entity: 'User',
        entityId: user.id,
        ipAddress: getIpAddress(request),
        userAgent: getUserAgent(request),
      },
    });
    
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
    console.error('Register error:', error);
    
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    
    return serverError('Failed to register user');
  }
}
