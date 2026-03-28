import { NextRequest } from 'next/server';
import { success, unauthorized, serverError } from '@/lib/api-response';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

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
            // NOTE: m3uUrl and xtreamUsername removed for security.
            // These credentials should only be exposed to authenticated clients
            // in a secure manner, not via the user profile endpoint.
          },
        },
      },
    });
    
    if (!fullUser) {
      return unauthorized();
    }
    
    return success(fullUser);
    
  } catch (error) {
    console.error('Get user error:', error);
    return serverError('Failed to get user');
  }
}
