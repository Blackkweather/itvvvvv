import { NextRequest } from 'next/server';
import { success, unauthorized, serverError } from '@/lib/api-response';
import { destroySession, getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { getIpAddress, getUserAgent } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const user = await getSession();
    
    if (user) {
      // Log audit
      await db.auditLog.create({
        data: {
          userId: user.id,
          action: 'USER_LOGOUT',
          entity: 'User',
          entityId: user.id,
          ipAddress: getIpAddress(request),
          userAgent: getUserAgent(request),
        },
      });
    }
    
    // Destroy session
    await destroySession();
    
    return success({ message: 'Logged out successfully' });
    
  } catch (error) {
    console.error('Logout error:', error);
    return serverError('Failed to logout');
  }
}
