'use server';

import { NextRequest } from 'next/server';
import { success, badRequest, serverError } from '@/lib/api-response';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return badRequest('Email is required');
    }

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return success({ message: 'If the email exists, a reset link has been sent' });
    }

    const resetToken = crypto.randomUUID();
    const resetExpires = new Date(Date.now() + 3600000);

    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetExpires,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/reset-password?token=${resetToken}`;

    console.log(`[PASSWORD RESET] Email: ${email}, Reset URL: ${resetUrl}`);

    return success({ message: 'If the email exists, a reset link has been sent' });
  } catch (error) {
    console.error('[FORGOT PASSWORD ERROR]', error);
    return serverError('Failed to process request');
  }
}
