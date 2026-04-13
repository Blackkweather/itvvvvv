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
  IconAlertTriangle,
  IconMessageCircle
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
  { devices: 1, label: '1 Device', description: 'Personal use' },
  { devices: 2, label: '2 Devices', description: 'Couples' },
  { devices: 3, label: '3 Devices', description: 'Family' },
];

const PAYMENT_METHODS = [
  { id: 'WHATSAPP', label: 'WhatsApp', description: 'Quick payment' },
  { id: 'TELEGRAM', label: 'Telegram', description: 'Via bot' },
  { id: 'BANK_TRANSFER', label: 'Bank Transfer', description: 'Direct' },
  { id: 'CRYPTO', label: 'Crypto', description: 'BTC, ETH' },
];

const FEATURES = [
  { icon: IconFilm, title: '30,000+ Channels' },
  { icon: IconZap, title: '4K Quality' },
  { icon: IconShield, title: 'Anti-Freeze' },
  { icon: IconHeadphones, title: '24/7 Support' },
];

const steps = [
  { id: 1, title: 'Devices' },
  { id: 2, title: 'Plan' },
  { id: 3, title: 'Payment' },
];

export default function SubscriptionPage() {
  const { subscription, refreshUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedDevices, setSelectedDevices] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('WHATSAPP');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string; paymentLink?: string; paymentMessage?: string } | null>(null);

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
        setMessage({ 
          type: 'success', 
          text: 'Subscription created!',
          paymentLink: data.data?.instructions?.link,
          paymentMessage: data.data?.instructions?.message
        });
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
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Subscription</h1>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">Choose your perfect plan</p>
      </div>

      {/* Messages */}
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg text-sm ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}
          >
            <div className="flex items-start gap-3">
              {message.type === 'success' ? (
                <IconCheckCircle className="h-5 w-5 flex-shrink-0" />
              ) : (
                <IconAlertTriangle className="h-5 w-5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p>{message.text}</p>
                {message.type === 'success' && message.paymentMessage && (
                  <p className="mt-2 text-gray-300">{message.paymentMessage}</p>
                )}
                {message.paymentLink && (
                  <a 
                    href={message.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  >
                    <IconMessageCircle className="h-4 w-4" />
                    Pay Now
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Subscription */}
      {subscription && subscription.status === 'ACTIVE' && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <IconCheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Current: {subscription.plan}</h2>
              <p className="text-sm text-gray-400 mt-1">Contact support to upgrade.</p>
            </div>
          </div>
        </div>
      )}

      {/* Step Indicator - Responsive */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto px-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(step.id)}
              disabled={subscription?.status === 'ACTIVE'}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap text-sm ${
                currentStep === step.id
                  ? 'bg-primary text-black font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep === step.id
                  ? 'bg-black/20 text-black'
                  : 'bg-white/10'
              }`}>
                {step.id}
              </div>
              <span className="hidden sm:inline">{step.title}</span>
            </button>
            {index < steps.length - 1 && (
              <div className="w-4 sm:w-8 h-px bg-white/10 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-black/40 border border-white/5 rounded-xl p-5 sm:p-6 lg:p-8">
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
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">How Many Devices?</h2>
                <p className="text-gray-400 text-sm">Simultaneous connections</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {DEVICE_OPTIONS.map((option) => {
                  const isSelected = selectedDevices === option.devices;
                  return (
                    <button
                      key={option.devices}
                      onClick={() => setSelectedDevices(option.devices)}
                      disabled={subscription?.status === 'ACTIVE'}
                      className={`p-4 sm:p-5 rounded-xl border-2 transition-all text-center ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-white/10 hover:border-primary/50 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl font-bold text-white">{option.devices}</span>
                      <p className="text-sm font-medium text-white mt-1">{option.label}</p>
                      <p className="text-xs text-gray-400 mt-1">{option.description}</p>
                      {isSelected && (
                        <div className="mt-2 mx-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <IconCheck className="h-3 w-3 text-black" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={nextStep}
                  disabled={subscription?.status === 'ACTIVE'}
                  className="flex items-center gap-2 bg-primary text-black px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Continue <IconArrowRight className="h-4 w-4" />
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
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Choose Duration</h2>
                <p className="text-gray-400 text-sm">Save more with longer plans</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {currentPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isLoading || subscription?.status === 'ACTIVE'}
                    className={`relative p-4 sm:p-5 rounded-xl border-2 transition-all text-left ${
                      plan.popular
                        ? 'border-primary bg-primary/10'
                        : 'border-white/10 hover:border-primary/50 hover:bg-white/5'
                    }`}
                  >
                    {plan.save && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                        <span className="bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                          SAVE ${plan.save}
                        </span>
                      </div>
                    )}

                    <h3 className="font-semibold text-white text-sm sm:text-base">{plan.name}</h3>
                    <div className="my-2">
                      {plan.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">${plan.originalPrice}</span>
                      )}
                      <span className="text-2xl font-bold text-primary ml-1">${plan.price}</span>
                      <span className="text-gray-400 text-xs">/{plan.duration}</span>
                    </div>

                    <div className="space-y-1">
                      {['30,000+ Ch', '4K', '120K+ VOD', '24/7 Support'].map((feature, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs">
                          <IconCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-gray-300 truncate">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {isLoading && selectedPlan === plan.id && (
                      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <IconLoader className="h-3 w-3 animate-spin" />
                        Processing...
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={prevStep}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={subscription?.status === 'ACTIVE'}
                  className="flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Continue <IconArrowRight className="h-4 w-4" />
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
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Payment Method</h2>
                <p className="text-gray-400 text-sm">Select your preferred option</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
                {PAYMENT_METHODS.map((method) => {
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      disabled={subscription?.status === 'ACTIVE'}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-white/10 hover:border-primary/50 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="font-medium text-white text-sm">{method.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{method.description}</p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 ml-2">
                            <IconCheck className="h-3 w-3 text-black" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-2 max-w-xl mx-auto">
                <button
                  onClick={prevStep}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => handleSubscribe(currentPlans[0].id)}
                  disabled={isLoading || subscription?.status === 'ACTIVE'}
                  className="flex items-center gap-2 bg-primary text-black px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <IconLoader className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <IconCreditCard className="h-4 w-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-black/40 border border-white/5 rounded-xl p-4 text-center"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-white text-xs sm:text-sm truncate">{feature.title}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}