import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { success, notFound, forbidden, serverError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    const subscription = await db.subscription.findUnique({
      where: { userId: user.id },
    });

    if (!subscription || subscription.status !== 'ACTIVE') {
      return forbidden('Active subscription required');
    }

    const categories = await db.channelCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    const channels = await db.channel.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: [
        { category: { order: 'asc' } },
        { order: 'asc' },
        { name: 'asc' },
      ],
    });

    if (channels.length === 0) {
      return notFound('No channels available');
    }

    return success({
      channels,
      categories,
      total: channels.length,
    });

  } catch (error) {
    console.error('[Channels API Error]', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return forbidden();
    }
    return serverError();
  }
}