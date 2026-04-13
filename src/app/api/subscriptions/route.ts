import { NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import {
  success,
  created,
  notFound,
  conflict,
  badRequest,
  serverError,
  handleZodError,
  getIpAddress,
  getUserAgent
} from '@/lib/api-response';
import { createSubscriptionSchema, updateSubscriptionSchema } from '@/lib/validation';
import { verifyCsrfToken } from '@/lib/csrf';

// Plan prices (in USD) - matches pricing page
const PLAN_PRICES: Record<string, { prices: { [duration: string]: number } }> = {
  '1D': { prices: { '1': 15, '3': 35, '6': 50, '12': 75 } },
  '2D': { prices: { '1': 25, '3': 60, '6': 85, '12': 125 } },
  '3D': { prices: { '1': 35, '3': 85, '6': 125, '12': 175 } },
};

// GET - Get current subscription
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    // SECURITY: Always filter by authenticated user ID - tenant isolation
    const subscription = await db.subscription.findUnique({
      where: { userId: user.id },
      include: {
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });
    
    if (!subscription) {
      return notFound('No subscription found');
    }
    
    // Log subscription access
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'SUBSCRIPTION_VIEWED',
        entity: 'Subscription',
        entityId: subscription.id,
        ipAddress: getIpAddress(request),
        userAgent: getUserAgent(request),
      },
    }).catch(() => {}); // Non-blocking
    
    // Get plan prices
    const planInfo = PLAN_PRICES[subscription.plan];
    
    return success({
      ...subscription,
      pricing: planInfo,
    });
    
  } catch (error) {
    console.error('[Subscriptions] Get error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return notFound();
    }
    return serverError();
  }
}

// POST - Create new subscription
export async function POST(request: NextRequest) {
  try {
    // CSRF protection
    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      return badRequest('Invalid CSRF token');
    }
    
    const user = await requireAuth();
    const body = await request.json();
    
    const validated = createSubscriptionSchema.parse(body);
    
    // SECURITY: Check subscription exists for THIS user only - tenant isolation
    const existing = await db.subscription.findUnique({
      where: { userId: user.id },
    });
    
    if (existing) {
      return conflict('Subscription already exists. Use PUT to update.');
    }
    
// Get plan price (format: "1D_1M", "2D_3M", etc.)
    const planKey = validated.plan.split('_')[0]; // "1D", "2D", "3D"
    const duration = validated.plan.split('_')[1]?.replace('M', '') || '1'; // "1", "3", "6", "12"
    const planData = PLAN_PRICES[planKey];
    const price = planData?.prices[duration];
    
    if (!price) {
      return badRequest('Invalid plan');
    }
    
    // Create subscription - SECURITY: always use authenticated user's ID
    const subscription = await db.subscription.create({
      data: {
        userId: user.id,
        plan: validated.plan,
        status: 'PENDING',
        deviceLimit: validated.deviceLimit || parseInt(planKey.replace('D', '')),
      },
    });

    // Create pending payment
    const payment = await db.payment.create({
      data: {
        userId: user.id,
        subscriptionId: subscription.id,
        amount: price,
        method: validated.paymentMethod,
        status: 'PENDING',
        description: `${validated.plan} subscription`,
      },
    });

    // Log audit
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'SUBSCRIPTION_CREATED',
        entity: 'Subscription',
        entityId: subscription.id,
        ipAddress: getIpAddress(request),
        userAgent: getUserAgent(request),
        metadata: JSON.stringify({ plan: validated.plan, paymentId: payment.id }),
      },
    });

    return created({
      subscription,
      payment,
      instructions: getPaymentInstructions(validated.paymentMethod, validated.plan, price),
    });
    
  } catch (error) {
    console.error('Create subscription error:', error);
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    if (error instanceof Error && error.message === 'Unauthorized') {
      return badRequest();
    }
    return serverError();
  }
}

// PUT - Update subscription
export async function PUT(request: NextRequest) {
  try {
    // CSRF protection
    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      return badRequest('Invalid CSRF token');
    }
    
    const user = await requireAuth();
    const body = await request.json();
    
    const validated = updateSubscriptionSchema.parse(body);
    
    const subscription = await db.subscription.findUnique({
      where: { userId: user.id },
    });
    
    if (!subscription) {
      return notFound('No subscription found');
    }
    
    // Update subscription
    const updated = await db.subscription.update({
      where: { userId: user.id },
      data: {
        plan: validated.plan || subscription.plan,
        autoRenew: validated.autoRenew ?? subscription.autoRenew,
        deviceLimit: validated.deviceLimit ?? subscription.deviceLimit,
      },
    });
    
    // Log audit
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'SUBSCRIPTION_UPDATED',
        entity: 'Subscription',
        entityId: subscription.id,
        ipAddress: getIpAddress(request),
        userAgent: getUserAgent(request),
        metadata: JSON.stringify(validated),
      },
    });
    
    return success(updated);
    
  } catch (error) {
    console.error('Update subscription error:', error);
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    if (error instanceof Error && error.message === 'Unauthorized') {
      return badRequest();
    }
    return serverError();
  }
}

// Helper function to get payment instructions based on method
function getPaymentInstructions(method: string, plan: string, price: number): { message: string; link?: string } {
  const whatsappNumber = process.env.WHATSAPP_NUMBER;
  const telegramBot = process.env.TELEGRAM_BOT_USERNAME;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  switch (method) {
    case 'WHATSAPP':
      if (whatsappNumber) {
        const message = `Hello! I want to subscribe to the ${plan} plan ($${price}). Here are my details:\nName: \nEmail: `;
        return {
          message: `Contact us on WhatsApp to complete your payment.`,
          link: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        };
      }
      return { message: 'Contact us on WhatsApp to complete your payment.' };
    case 'TELEGRAM':
      if (telegramBot) {
        const message = `Hello! I want to subscribe to the ${plan} plan ($${price}).`;
        return {
          message: `Contact our Telegram bot to complete your payment.`,
          link: `https://t.me/${telegramBot}?start=${encodeURIComponent(message)}`
        };
      }
      return { message: 'Contact us on Telegram to complete your payment.' };
    case 'BANK_TRANSFER':
      return { message: 'Bank transfer details will be provided after order confirmation.' };
    case 'CRYPTO':
      return { message: 'Crypto payment details will be provided after order confirmation.' };
    default:
      return { message: 'You will receive payment instructions via email.' };
  }
}
