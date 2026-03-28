import { NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { requireAuth, destroySession } from '@/lib/auth';
import {
  success,
  badRequest,
  serverError,
  handleZodError,
  getIpAddress,
  getUserAgent
} from '@/lib/api-response';
import { verifyCsrfToken } from '@/lib/csrf';

// DELETE - Delete account
export async function DELETE(request: NextRequest) {
  try {
    // CSRF protection
    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      return badRequest('Invalid CSRF token');
    }
    
    // SECURITY: requireAuth ensures user can only delete their own account
    const user = await requireAuth();
    const body = await request.json();
    
    const deleteSchema = z.object({
      confirmEmail: z.string().email(),
    });
    
    const validated = deleteSchema.parse(body);
    
    // SECURITY: Verify email matches - prevents accidental deletion
    if (validated.confirmEmail !== user.email) {
      return badRequest('Email does not match your account');
    }
    
    // Log audit before deletion
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'ACCOUNT_DELETED',
        entity: 'User',
        entityId: user.id,
        ipAddress: getIpAddress(request),
        userAgent: getUserAgent(request),
      },
    });
    
    // Delete all user data (cascade will handle related records)
    await db.user.delete({
      where: { id: user.id },
    });
    
    // Destroy session
    await destroySession();
    
    return success({ message: 'Account deleted successfully' });
    
  } catch (error) {
    console.error('Delete account error:', error);
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    if (error instanceof Error && error.message === 'Unauthorized') {
      return badRequest();
    }
    return serverError();
  }
}
