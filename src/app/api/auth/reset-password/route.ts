'use server';

import { NextRequest } from 'next/server';
import { success, badRequest, unauthorized, serverError } from '@/lib/api-response';
import { db } from '@/lib/db';
import { hash } from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return badRequest('Token and new password are required');
    }

    if (password.length < 6) {
      return badRequest('Password must be at least 6 characters');
    }

    const user = await db.user.findFirst({
      where: {
        resetToken: token,
        resetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return unauthorized('Invalid or expired reset token');
    }

    const hashedPassword = await hash(password, 12);

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetExpires: null,
      },
    });

    console.log(`[PASSWORD RESET] User ${user.email} reset their password`);

    return success({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('[RESET PASSWORD ERROR]', error);
    return serverError('Failed to reset password');
  }
}
