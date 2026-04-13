import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { success, serverError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    const payments = await db.payment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        subscription: true,
      },
    });

    return success({
      payments,
      total: payments.length,
    });
  } catch (error) {
    console.error('[Billing API Error]', error);
    return serverError();
  }
}