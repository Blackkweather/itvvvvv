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

// Plan prices (in USD)
const PLAN_PRICES: Record<string, { monthly: number; yearly: number }> = {
  STARTER: { monthly: 9.99, yearly: 99.99 },
  STANDARD: { monthly: 14.99, yearly: 149.99 },
  PREMIUM: { monthly: 19.99, yearly: 199.99 },
  ELITE: { monthly: 24.99, yearly: 249.99 },
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
    
    // Get plan prices
    const planInfo = PLAN_PRICES[subscription.plan];
    
    return success({
      ...subscription,
      pricing: planInfo,
    });
    
  } catch (error) {
    console.error('Get subscription error:', error);
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
    
    // Get plan price
    const price = PLAN_PRICES[validated.plan];
    if (!price) {
      return badRequest('Invalid plan');
    }
    
    // Create subscription - SECURITY: always use authenticated user's ID
    const subscription = await db.subscription.create({
      data: {
        userId: user.id,
        plan: validated.plan,
        status: 'PENDING',
        deviceLimit: validated.deviceLimit || 4,
      },
    });
    
    // Create pending payment
    const payment = await db.payment.create({
      data: {
        userId: user.id,
        subscriptionId: subscription.id,
        amount: price.monthly,
        method: validated.paymentMethod,
        status: 'PENDING',
        description: `${validated.plan} subscription - monthly`,
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
      instructions: getPaymentInstructions(validated.paymentMethod),
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
function getPaymentInstructions(method: string): string {
  switch (method) {
    case 'WHATSAPP':
      return 'Contact us on WhatsApp to complete your payment.';
    case 'TELEGRAM':
      return 'Contact us on Telegram to complete your payment.';
    case 'BANK_TRANSFER':
      return 'Bank transfer details will be provided after order confirmation.';
    case 'CRYPTO':
      return 'Crypto payment details will be provided after order confirmation.';
    default:
      return 'You will receive payment instructions via email.';
  }
}
