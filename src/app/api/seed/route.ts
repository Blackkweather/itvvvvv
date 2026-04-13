import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { success, serverError, unauthorized, forbidden } from '@/lib/api-response';
import { verifyCsrfToken } from '@/lib/csrf';

/**
 * DEVELOPMENT ONLY: Seed the database with demo data
 * This endpoint is protected and only available in development mode
 * Requires CSRF token and admin-like verification
 */
export async function POST(request: NextRequest) {
  try {
    // SECURITY: Completely disable in production
    if (process.env.NODE_ENV === 'production') {
      console.error('[Seed] Attempted access in production - blocked');
      return forbidden('Seed endpoint is disabled in production');
    }

    // SECURITY: Verify CSRF token to prevent cross-site attacks
    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      return unauthorized('Invalid CSRF token');
    }

    // Check if already seeded
    const existingUser = await db.user.findUnique({
      where: { email: 'demo@streampro.space' },
    });

    if (existingUser) {
      return success({
        message: 'Database already seeded',
        user: existingUser,
      });
    }

    // Create demo user
    const hashedPassword = await hashPassword('demo123456');
    
    const user = await db.user.create({
      data: {
        email: 'demo@streampro.space',
        password: hashedPassword,
        name: 'Demo User',
        role: 'USER',
        isActive: true,
        phone: null,
        whatsapp: null,
        telegram: null,
      },
    });

    // Create demo subscription
    const subscription = await db.subscription.create({
      data: {
        userId: user.id,
        plan: 'PRO',
        status: 'ACTIVE',
        deviceLimit: 3,
        devicesUsed: 0,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    console.log('[Seed] Database seeded successfully');

    return success({
      message: 'Demo data created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      subscription: {
        id: subscription.id,
        plan: subscription.plan,
        status: subscription.status,
      },
    });
  } catch (error) {
    console.error('[Seed] Error:', error);
    return serverError('Failed to seed database');
  }
}
