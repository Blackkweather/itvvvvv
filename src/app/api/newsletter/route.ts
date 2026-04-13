import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rate-limit';
import { getIpAddress, getUserAgent } from '@/lib/api-response';
import { db } from '@/lib/db';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getIpAddress(request) || 'unknown';
    const userAgent = getUserAgent(request) || 'unknown';
    
    // Rate limit: 3 subscription attempts per minute per IP
    const rateLimitResult = await checkRateLimit('newsletter', ip, { limit: 3, windowSeconds: 60 });
    if (!rateLimitResult.success) {
      // Log rate limit violation
      await db.auditLog.create({
        data: {
          action: 'NEWSLETTER_RATE_LIMITED',
          entity: 'Newsletter',
          ipAddress: ip,
          userAgent: userAgent,
          metadata: JSON.stringify({ reason: 'rate_limit_exceeded' }),
        },
      }).catch(() => {}); // Non-blocking
      
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    const { email } = emailSchema.parse(body);

    // Log successful subscription
    await db.auditLog.create({
      data: {
        action: 'NEWSLETTER_SUBSCRIBED',
        entity: 'Newsletter',
        ipAddress: ip,
        userAgent: userAgent,
        metadata: JSON.stringify({ email: email.substring(0, 3) + '***' }), // Mask email
      },
    }).catch(() => {}); // Non-blocking

    // Store in database or email service
    // For now, return success. Replace with your email provider (ConvertKit, Mailchimp, etc.)
    // Example: await prisma.newsletterSubscriber.create({ data: { email } });

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Newsletter] Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
