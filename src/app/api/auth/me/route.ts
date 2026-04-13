import { NextRequest } from 'next/server';
import { success, unauthorized, serverError } from '@/lib/api-response';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { getIpAddress, getUserAgent } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const user = await getSession();
    
    if (!user) {
      return unauthorized();
    }
    
    // Get full user data with subscription
    const fullUser = await db.user.findUnique({
      where: { id: user.id },
      include: {
        subscription: {
          select: {
            id: true,
            plan: true,
            status: true,
            startDate: true,
            endDate: true,
            autoRenew: true,
            deviceLimit: true,
            devicesUsed: true,
          },
        },
      },
    });
    
    if (!fullUser) {
      return unauthorized();
    }

    // Log access to /api/auth/me
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'PROFILE_ACCESSED',
        entity: 'User',
        entityId: user.id,
        ipAddress: getIpAddress(request),
        userAgent: getUserAgent(request),
      },
    }).catch(() => {}); // Non-blocking
    
    return success(fullUser);
    
  } catch (error) {
    console.error('[Auth/Me] Error:', error);
    return serverError('Failed to get user');
  }
}
