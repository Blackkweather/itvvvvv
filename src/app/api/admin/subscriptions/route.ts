import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { success, notFound, badRequest, unauthorized } from '@/lib/api-response';

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!ADMIN_API_KEY) {
      console.error('[Admin API] ADMIN_API_KEY not configured');
      return unauthorized('Admin key not configured');
    }
    
    if (authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return unauthorized('Invalid admin key');
    }
    
    const body = await request.json();
    const { action, userId, subscriptionId, email } = body;
    
    switch (action) {
      case 'activate_subscription': {
        if (!userId && !email && !subscriptionId) {
          return badRequest('userId, email, or subscriptionId required');
        }
        
        let subscription;
        
        if (subscriptionId) {
          subscription = await db.subscription.update({
            where: { id: subscriptionId },
            data: { status: 'ACTIVE' },
            include: { user: true },
          });
        } else if (userId) {
          subscription = await db.subscription.update({
            where: { userId },
            data: { status: 'ACTIVE' },
            include: { user: true },
          });
        } else if (email) {
          const user = await db.user.findUnique({
            where: { email: email.toLowerCase() },
          });
          
          if (!user) {
            return notFound('User not found');
          }
          
          subscription = await db.subscription.update({
            where: { userId: user.id },
            data: { status: 'ACTIVE' },
            include: { user: true },
          });
        }
        
        if (!subscription) {
          return notFound('Subscription not found');
        }
        
        await db.payment.updateMany({
          where: { subscriptionId: subscription.id, status: 'PENDING' },
          data: { status: 'COMPLETED' },
        });
        
        await db.auditLog.create({
          data: {
            userId: subscription.userId,
            action: 'SUBSCRIPTION_ACTIVATED_MANUALLY',
            entity: 'Subscription',
            entityId: subscription.id,
            metadata: JSON.stringify({ activatedBy: 'admin_api' }),
          },
        });
        
        return success({
          message: 'Subscription activated',
          subscription: {
            id: subscription.id,
            status: subscription.status,
            userEmail: subscription.user.email,
          },
        });
      }
      
      case 'deactivate_subscription': {
        if (!userId && !email && !subscriptionId) {
          return badRequest('userId, email, or subscriptionId required');
        }
        
        let subscription;
        
        if (subscriptionId) {
          subscription = await db.subscription.update({
            where: { id: subscriptionId },
            data: { status: 'CANCELLED' },
            include: { user: true },
          });
        } else if (userId) {
          subscription = await db.subscription.update({
            where: { userId },
            data: { status: 'CANCELLED' },
            include: { user: true },
          });
        } else if (email) {
          const user = await db.user.findUnique({
            where: { email: email.toLowerCase() },
          });
          
          if (!user) {
            return notFound('User not found');
          }
          
          subscription = await db.subscription.update({
            where: { userId: user.id },
            data: { status: 'CANCELLED' },
            include: { user: true },
          });
        }
        
        return success({
          message: 'Subscription cancelled',
          subscription,
        });
      }
      
      case 'extend_subscription': {
        const { months } = body;
        
        if (!subscriptionId || !months) {
          return badRequest('subscriptionId and months required');
        }
        
        const subscription = await db.subscription.findUnique({
          where: { id: subscriptionId },
        });
        
        if (!subscription) {
          return notFound('Subscription not found');
        }
        
        const currentEndDate = subscription.endDate || new Date();
        const newEndDate = new Date(currentEndDate);
        newEndDate.setMonth(newEndDate.getMonth() + months);
        
        const updated = await db.subscription.update({
          where: { id: subscriptionId },
          data: { 
            endDate: newEndDate,
            status: 'ACTIVE',
          },
        });
        
        return success({
          message: `Subscription extended by ${months} months`,
          subscription: updated,
        });
      }
      
      default:
        return badRequest('Invalid action');
    }
    
  } catch (error) {
    console.error('[Admin API] Error:', error);
    return badRequest('Internal error');
  }
}
