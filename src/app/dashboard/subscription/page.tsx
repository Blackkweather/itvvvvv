'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Check, Loader2, CreditCard } from 'lucide-react';

const PLANS = [
  {
    id: 'STARTER',
    name: 'Starter',
    price: 9.99,
    features: [
      '10,000+ Live Channels',
      '4K Quality',
      '1 Device',
      'Basic Support',
      'VOD Library',
    ],
  },
  {
    id: 'STANDARD',
    name: 'Standard',
    price: 14.99,
    popular: true,
    features: [
      '15,000+ Live Channels',
      '4K Quality',
      '2 Devices',
      'Priority Support',
      'Anti-Freeze Technology',
      'VOD Library',
    ],
  },
  {
    id: 'PREMIUM',
    name: 'Premium',
    price: 19.99,
    features: [
      '20,000+ Live Channels',
      '4K HDR Quality',
      '3 Devices',
      '24/7 Support',
      'Anti-Freeze Technology',
      'Multi-Screen',
      'VOD Library',
    ],
  },
  {
    id: 'ELITE',
    name: 'Elite',
    price: 24.99,
    features: [
      '35,000+ Live Channels',
      '4K HDR Quality',
      '4 Devices',
      '24/7 Priority Support',
      'Anti-Freeze 2.0',
      'Multi-Screen',
      '8K Trial Channels',
      'VOD Library',
    ],
  },
];

export default function SubscriptionPage() {
  const { subscription, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('WHATSAPP');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (planId: string) => {
    setIsLoading(true);
    setSelectedPlan(planId);
    setMessage(null);

    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planId,
          paymentMethod,
          deviceLimit: 4,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Subscription created! Check your email for payment instructions.' });
        await refreshUser();
      } else {
        setMessage({ type: 'error', text: data.error?.message || 'Failed to create subscription' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Choose Your Plan</h1>
        <p className="text-gray-400 mt-1">Select the perfect plan for your streaming needs</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Current Subscription */}
      {subscription && subscription.status === 'ACTIVE' && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-2">Current Plan: {subscription.plan}</h2>
          <p className="text-gray-400">
            Your subscription is active. Contact support to upgrade or change your plan.
          </p>
        </div>
      )}

      {/* Payment Method Selection */}
      <div className="bg-black/40 border border-white/5 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Payment Method</h3>
        <div className="flex flex-wrap gap-3">
          {['WHATSAPP', 'TELEGRAM', 'BANK_TRANSFER', 'CRYPTO'].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                paymentMethod === method
                  ? 'bg-primary text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {method.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-black/40 border rounded-2xl p-6 ${
              plan.popular 
                ? 'border-primary' 
                : 'border-white/5 hover:border-primary/30'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}

            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary">${plan.price}</span>
              <span className="text-gray-400">/month</span>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={isLoading || (subscription?.plan === plan.id)}
              className={`w-full py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                subscription?.plan === plan.id
                  ? 'bg-green-500/20 text-green-400 cursor-default'
                  : 'bg-primary text-black hover:bg-primary/90 disabled:opacity-50'
              }`}
            >
              {isLoading && selectedPlan === plan.id ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : subscription?.plan === plan.id ? (
                'Current Plan'
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  Subscribe
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
