'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconCheck,
  IconLoader,
  IconCreditCard,
  IconZap,
  IconShield,
  IconFilm,
  IconHeadphones,
  IconArrowRight,
  IconCheckCircle,
  IconAlertTriangle
} from '@/components/ui/Icons';

const PLANS = {
  1: [
    { id: '1D_1M', name: '1 Month', price: 15, originalPrice: null, duration: 'month', popular: true },
    { id: '1D_3M', name: '3 Months', price: 35, originalPrice: 45, duration: '3 months', save: 10 },
    { id: '1D_6M', name: '6 Months', price: 50, originalPrice: 70, duration: '6 months', save: 20 },
    { id: '1D_12M', name: '12 Months', price: 75, originalPrice: 110, duration: 'year', save: 35 },
  ],
  2: [
    { id: '2D_1M', name: '1 Month', price: 25, originalPrice: null, duration: 'month', popular: true },
    { id: '2D_3M', name: '3 Months', price: 60, originalPrice: 90, duration: '3 months', save: 30 },
    { id: '2D_6M', name: '6 Months', price: 85, originalPrice: 140, duration: '6 months', save: 55 },
    { id: '2D_12M', name: '12 Months', price: 125, originalPrice: 210, duration: 'year', save: 85 },
  ],
  3: [
    { id: '3D_1M', name: '1 Month', price: 35, originalPrice: null, duration: 'month', popular: true },
    { id: '3D_3M', name: '3 Months', price: 85, originalPrice: 110, duration: '3 months', save: 25 },
    { id: '3D_6M', name: '6 Months', price: 125, originalPrice: 200, duration: '6 months', save: 75 },
    { id: '3D_12M', name: '12 Months', price: 175, originalPrice: 280, duration: 'year', save: 105 },
  ],
};

const DEVICE_OPTIONS = [
  { devices: 1, label: '1 Device', description: 'Perfect for personal use' },
  { devices: 2, label: '2 Devices', description: 'Great for couples' },
  { devices: 3, label: '3 Devices', description: 'Family plan' },
];

const PAYMENT_METHODS = [
  { id: 'WHATSAPP', label: 'WhatsApp', description: 'Quick payment via WhatsApp' },
  { id: 'TELEGRAM', label: 'Telegram', description: 'Pay via Telegram bot' },
  { id: 'BANK_TRANSFER', label: 'Bank Transfer', description: 'Direct bank transfer' },
  { id: 'CRYPTO', label: 'Cryptocurrency', description: 'Bitcoin, Ethereum' },
];

const FEATURES = [
  { icon: IconFilm, title: '30,000+ Channels', description: 'Live TV from worldwide' },
  { icon: IconZap, title: '4K Quality', description: 'Crystal clear streaming' },
  { icon: IconShield, title: 'Anti-Freeze', description: 'Buffer-free experience' },
  { icon: IconHeadphones, title: '24/7 Support', description: 'Always here to help' },
];

const steps = [
  { id: 1, title: 'Select Devices' },
  { id: 2, title: 'Choose Plan' },
  { id: 3, title: 'Payment Method' },
];

export default function SubscriptionPage() {
  const { subscription, refreshUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedDevices, setSelectedDevices] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('WHATSAPP');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currentPlans = PLANS[selectedDevices as keyof typeof PLANS] || PLANS[1];

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
          deviceLimit: selectedDevices,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Subscription created! Check your email for payment instructions.' });
        await refreshUser();
      } else {
        setMessage({ type: 'error', text: data.error?.message || 'Failed to create subscription' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Choose Your Plan</h1>
        <p className="text-muted mt-1">Select the perfect plan for your streaming needs</p>
      </div>

      {/* Success/Error Messages */}
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-xl border ${
              message.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {message.type === 'success' ? (
                <IconCheckCircle className="h-5 w-5" />
              ) : (
                <IconAlertTriangle className="h-5 w-5" />
              )}
              {message.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Subscription */}
      {subscription && subscription.status === 'ACTIVE' && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <IconCheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Current Plan: {subscription.plan}</h2>
              <p className="text-muted text-sm">
                Your subscription is active. Contact support to upgrade or change your plan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(step.id)}
              disabled={subscription?.status === 'ACTIVE'}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentStep === step.id
                  ? 'bg-primary text-black font-medium'
                  : 'text-muted hover:text-foreground hover:bg-white/5'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep === step.id
                  ? 'bg-black/20 text-black'
                  : 'bg-white/10 text-muted'
              }`}>
                {step.id}
              </div>
              <span className="hidden sm:inline">{step.title}</span>
            </button>
            {index < steps.length - 1 && (
              <div className="w-8 h-px bg-border mx-2" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Device Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">How Many Devices?</h2>
                <p className="text-gray-400">Choose the number of simultaneous connections</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DEVICE_OPTIONS.map((option) => {
                  const isSelected = selectedDevices === option.devices;
                  return (
                    <button
                      key={option.devices}
                      onClick={() => setSelectedDevices(option.devices)}
                      disabled={subscription?.status === 'ACTIVE'}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-foreground">{option.devices}</span>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <IconCheck className="h-4 w-4 text-black" />
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-foreground">{option.label}</p>
                      <p className="text-gray-300 mt-1">{option.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={nextStep}
                  disabled={subscription?.status === 'ACTIVE'}
                  className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Continue <IconArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Plan Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Duration</h2>
                <p className="text-gray-400">Save more with longer plans</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isLoading || subscription?.status === 'ACTIVE'}
                    className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                      plan.popular
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-white/5'
                    }`}
                  >
                    {plan.save && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                          SAVE ${plan.save}
                        </span>
                      </div>
                    )}

                    <h3 className="font-bold text-foreground mb-1">{plan.name}</h3>
                    <div className="mb-4">
                      {plan.originalPrice && (
                        <span className="text-sm text-muted line-through">${plan.originalPrice}</span>
                      )}
                      <span className="text-3xl font-bold text-primary">${plan.price}</span>
                      <span className="text-muted text-sm">/{plan.duration}</span>
                    </div>

                    <div className="space-y-2">
                      {['30,000+ Channels', '4K Quality', '120,000+ VOD', '24/7 Support'].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <IconCheck className="h-4 w-4 text-green-500" />
                          <span className="text-white">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {isLoading && selectedPlan === plan.id && (
                      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                        <IconLoader className="h-4 w-4 animate-spin" />
                        Processing...
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={prevStep}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={subscription?.status === 'ACTIVE'}
                  className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Continue <IconArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment Method */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Payment Method</h2>
                <p className="text-gray-400">Select your preferred payment option</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {PAYMENT_METHODS.map((method) => {
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      disabled={subscription?.status === 'ACTIVE'}
                      className={`p-5 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-foreground">{method.label}</p>
                          <p className="text-sm text-muted mt-1">{method.description}</p>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <IconCheck className="h-4 w-4 text-black" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4 max-w-2xl mx-auto">
                <button
                  onClick={prevStep}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => handleSubscribe(currentPlans[0].id)}
                  disabled={isLoading || subscription?.status === 'ACTIVE'}
                  className="flex items-center gap-2 bg-primary text-black px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <IconLoader className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <IconCreditCard className="h-5 w-5" />
                      Subscribe Now
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-border rounded-xl p-4 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground text-sm">{feature.title}</h3>
            <p className="text-xs text-muted mt-1">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
