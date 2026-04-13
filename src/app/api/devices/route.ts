import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { success, notFound, badRequest, serverError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    const sessions = await db.session.findMany({
      where: { 
        userId: user.id,
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const subscription = await db.subscription.findUnique({
      where: { userId: user.id },
    });

    return success({
      sessions,
      deviceLimit: subscription?.deviceLimit || 1,
      devicesUsed: sessions.length,
    });
  } catch (error) {
    console.error('[Devices API Error]', error);
    return serverError();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('id');

    if (!sessionId) {
      return badRequest('Session ID is required');
    }

    const session = await db.session.findFirst({
      where: { id: sessionId, userId: user.id },
    });

    if (!session) {
      return notFound('Session not found');
    }

    await db.session.update({
      where: { id: sessionId },
      data: { isActive: false },
    });

    return success({ message: 'Device disconnected successfully' });
  } catch (error) {
    console.error('[Devices API Error]', error);
    return serverError();
  }
}