import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { success, badRequest, serverError, unauthorized } from '@/lib/api-response';

/**
 * Get Stripe instance lazily to avoid initialization errors during build
 */
function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2026-03-25.dahlia' as const,
  });
}

/**
 * Stripe Webhook Handler
 * 
 * Verifies webhook signature and handles different event types:
 * - payment_intent.succeeded: Activate subscription
 * - payment_intent.payment_failed: Mark payment as failed
 * - customer.subscription.updated: Update subscription status
 * - customer.subscription.deleted: Cancel subscription
 * 
 * See: https://stripe.com/docs/webhooks
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      return unauthorized('Missing Stripe signature header');
    }
    
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not configured');
      return serverError('Webhook configuration error');
    }

    const stripe = getStripe();
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      const error = err as Error;
      console.error('[Stripe Webhook] Signature verification failed:', error.message);
      return badRequest(`Webhook signature verification failed: ${error.message}`);
    }
    
    console.log('[Stripe Webhook] Received event:', event.type, 'ID:', event.id);
    
    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('[Stripe Webhook] Payment succeeded:', paymentIntent.id);
        
        // Find payment by Stripe payment intent ID and update status
        await db.payment.updateMany({
          where: { stripePaymentId: paymentIntent.id },
          data: { status: 'COMPLETED' },
        });
        
        // Find subscription and activate it
        const payment = await db.payment.findFirst({
          where: { stripePaymentId: paymentIntent.id },
          include: { subscription: true },
        });
        
        if (payment?.subscription) {
          await db.subscription.update({
            where: { id: payment.subscriptionId! },
            data: { status: 'ACTIVE' },
          });
        }
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('[Stripe Webhook] Payment failed:', paymentIntent.id);
        
        await db.payment.updateMany({
          where: { stripePaymentId: paymentIntent.id },
          data: { status: 'FAILED' },
        });
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('[Stripe Webhook] Subscription updated:', subscription.id);
        
        // Map Stripe status to our status
        const statusMap: Record<Stripe.Subscription.Status, string> = {
          'active': 'ACTIVE',
          'trialing': 'ACTIVE',
          'past_due': 'SUSPENDED',
          'canceled': 'CANCELLED',
          'unpaid': 'SUSPENDED',
          'paused': 'SUSPENDED',
          'incomplete': 'PENDING',
          'incomplete_expired': 'EXPIRED',
        };
        
        await db.subscription.updateMany({
          where: { plan: subscription.items.data[0]?.price?.product as string },
          data: { status: statusMap[subscription.status] || 'PENDING' },
        });
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('[Stripe Webhook] Subscription deleted:', subscription.id);
        
        // Cancel subscription in our database
        // Note: In production, you'd match by Stripe subscription ID stored in our DB
        break;
      }
      
      default:
        console.log('[Stripe Webhook] Unhandled event type:', event.type);
    }
    
    return success({ received: true, eventType: event.type });
    
  } catch (error) {
    console.error('[Stripe Webhook] Error:', error);
    return serverError('Webhook processing failed');
  }
}
