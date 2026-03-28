import { NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { requireAuth, hashPassword, verifyPassword, getSessionCookie } from '@/lib/auth';
import {
  success,
  badRequest,
  conflict,
  serverError,
  handleZodError,
  getIpAddress,
  getUserAgent
} from '@/lib/api-response';
import { updateProfileSchema, changePasswordSchema } from '@/lib/validation';
import { verifyCsrfToken } from '@/lib/csrf';

// GET - Get user profile
export async function GET(request: NextRequest) {
  try {
    // SECURITY: requireAuth ensures user can only access their own profile
    const user = await requireAuth();
    
    const profile = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        whatsapp: true,
        telegram: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return success(profile);
    
  } catch (error) {
    console.error('Get profile error:', error);
    return serverError();
  }
}

// PUT - Update profile
export async function PUT(request: NextRequest) {
  try {
    // CSRF protection
    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      return badRequest('Invalid CSRF token');
    }
    
    // SECURITY: requireAuth ensures user can only update their own profile
    const user = await requireAuth();
    const body = await request.json();
    
    const validated = updateProfileSchema.parse(body);
    
    // SECURITY: where clause uses user.id from session - prevents IDOR
    const updated = await db.user.update({
      where: { id: user.id },
      data: validated,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        whatsapp: true,
        telegram: true,
        updatedAt: true,
      },
    });
    
    // Log audit
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'PROFILE_UPDATED',
        entity: 'User',
        entityId: user.id,
        ipAddress: getIpAddress(request),
        userAgent: getUserAgent(request),
      },
    });
    
    return success(updated);
    
  } catch (error) {
    console.error('Update profile error:', error);
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    return serverError();
  }
}

// POST - Change password
export async function POST(request: NextRequest) {
  try {
    // CSRF protection
    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      return badRequest('Invalid CSRF token');
    }
    
    // SECURITY: requireAuth ensures user can only change their own password
    const user = await requireAuth();
    const body = await request.json();
    
    const validated = changePasswordSchema.parse(body);
    
    // Get current user with password - SECURITY: always filter by user.id
    const currentUser = await db.user.findUnique({
      where: { id: user.id },
      select: { password: true },
    });
    
    if (!currentUser) {
      return badRequest('User not found');
    }
    
    // Verify current password
    const isValid = await verifyPassword(validated.currentPassword, currentUser.password);
    if (!isValid) {
      return badRequest('Current password is incorrect');
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(validated.newPassword);
    
    // Update password
    await db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    
    // Log audit
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'PASSWORD_CHANGED',
        entity: 'User',
        entityId: user.id,
        ipAddress: getIpAddress(request),
        userAgent: getUserAgent(request),
      },
    });
    
    // Get current session token to exclude from deletion
    const currentToken = await getSessionCookie();
    
    // Invalidate all sessions except current one (for password change security)
    // Current session remains valid so user doesn't get logged out
    if (currentToken) {
      await db.session.deleteMany({
        where: {
          userId: user.id,
          NOT: { token: currentToken },
        },
      });
    } else {
      await db.session.deleteMany({
        where: {
          userId: user.id,
        },
      });
    }
    
    return success({ message: 'Password changed successfully' });
    
  } catch (error) {
    console.error('Change password error:', error);
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    if (error instanceof Error) {
      if (error.message.includes('Unauthorized')) {
        return badRequest();
      }
    }
    return serverError();
  }
}
