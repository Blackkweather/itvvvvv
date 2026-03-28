import { NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { createSession, findUserByEmail, verifyPassword } from '@/lib/auth';
import { authRateLimit } from '@/lib/rate-limit';
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
    const rateLimitResult = authRateLimit.login(ip);
    if (!rateLimitResult.success) {
      return serverError('Too many login attempts. Please try again later.');
    }
    
    const body = await request.json();
    
    // Validate input
    const validated = loginSchema.parse(body);
    
    // Find user
    const user = await findUserByEmail(validated.email);
    if (!user) {
      return unauthorized('Invalid email or password');
    }
    
    // Check if user is active
    if (!user.isActive) {
      return unauthorized('Account is disabled');
    }
    
    // Verify password
    const isValid = await verifyPassword(validated.password, user.password);
    if (!isValid) {
      return unauthorized('Invalid email or password');
    }
    
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
        action: 'USER_LOGIN',
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
    });
    
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    
    return serverError('Failed to login');
  }
}
