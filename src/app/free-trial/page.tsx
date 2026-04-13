'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  IconCheck,
  IconShield,
  IconZap,
  IconClock,
  IconFilm,
  IconHeadphones,
  IconCheckCircle,
  IconBrandWhatsapp,
  IconBrandTelegram
} from '@/components/ui/Icons';

const MESSAGING = {
  whatsappNumber: '+447853402172',
  telegramUsername: 'streampro'
};

const PACKS = [
  {
    id: '1d',
    name: '1 Device',
    devices: 1,
    plans: [
      { id: '1M-1d', duration: '1 Month', price: 15, originalPrice: null },
      { id: '3M-1d', duration: '3 Months', price: 35, originalPrice: 45, save: 10 },
      { id: '6M-1d', duration: '6 Months', price: 50, originalPrice: 70, save: 20 },
      { id: '12M-1d', duration: '12 Months', price: 75, originalPrice: 110, save: 35 },
    ]
  },
  {
    id: '2d',
    name: '2 Devices',
    devices: 2,
    plans: [
      { id: '1M-2d', duration: '1 Month', price: 25, originalPrice: null },
      { id: '3M-2d', duration: '3 Months', price: 60, originalPrice: 90, save: 30 },
      { id: '6M-2d', duration: '6 Months', price: 85, originalPrice: 140, save: 55 },
      { id: '12M-2d', duration: '12 Months', price: 125, originalPrice: 210, save: 85 },
    ]
  },
  {
    id: '3d',
    name: '3 Devices',
    devices: 3,
    plans: [
      { id: '1M-3d', duration: '1 Month', price: 35, originalPrice: null },
      { id: '3M-3d', duration: '3 Months', price: 85, originalPrice: 110, save: 25 },
      { id: '6M-3d', duration: '6 Months', price: 125, originalPrice: 200, save: 75 },
      { id: '12M-3d', duration: '12 Months', price: 175, originalPrice: 280, save: 105 },
    ]
  },
];

const FEATURES = [
  { icon: IconFilm, title: '30,000+ Channels', description: 'Live TV worldwide' },
  { icon: IconZap, title: '4K Quality', description: 'Crystal clear streaming' },
  { icon: IconShield, title: 'Anti-Freeze', description: 'Buffer-free experience' },
  { icon: IconHeadphones, title: '24/7 Support', description: 'Always here to help' },
  { icon: IconClock, title: '120,000+ VOD', description: 'Movies on demand' },
];

interface SelectedPlan {
  pack: typeof PACKS[0];
  plan: typeof PACKS[0]['plans'][0];
}

function openWhatsApp(message: string) {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${MESSAGING.whatsappNumber}?text=${encodedMessage}`, '_blank');
}

function openTelegram(message: string) {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://t.me/${MESSAGING.telegramUsername}?text=${encodedMessage}`, '_blank');
}

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectPlan = (pack: typeof PACKS[0], plan: typeof PACKS[0]['plans'][0]) => {
    setSelectedPlan({ pack, plan });
  };

  const handleOrder = (platform: 'whatsapp' | 'telegram') => {
    if (!selectedPlan) return;

    const message = `📦 *New Subscription Order*

Hello, I would like to subscribe to StreamPro.

📋 *Package:* ${selectedPlan.pack.name}
⏱️ *Duration:* ${selectedPlan.plan.duration}
💵 *Price:* $${selectedPlan.plan.price}/${selectedPlan.plan.duration === '12 Months' ? 'year' : 'month'}

Please confirm the order. Thank you!`;

    if (platform === 'whatsapp') {
      openWhatsApp(message);
    } else {
      openTelegram(message);
    }
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-8 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden mb-16">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-primary/20 to-transparent blur-[100px] opacity-30" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                Subscribe Now
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-4"
            >
              Choose Your <span className="text-primary">Plan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted max-w-2xl mx-auto mb-8"
            >
              Select your pack and duration. Order instantly via WhatsApp or Telegram.
            </motion.p>
          </div>
        </section>

        {/* Plans Grid */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                {/* Pack Selection */}
                <div className="space-y-6">
                  {PACKS.map((pack) => (
                    <div key={pack.id} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-foreground">{pack.name}</span>
                        <span className="text-sm text-muted">Best value for families</span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {pack.plans.map((plan) => {
                          const isSelected = selectedPlan?.plan.id === plan.id;
                          
                          return (
                            <motion.button
                              key={plan.id}
                              onClick={() => handleSelectPlan(pack, plan)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                isSelected
                                  ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                                  : 'border-border hover:border-primary/50 hover:bg-white/5'
                              }`}
                            >
                              {plan.save && (
                                <div className="absolute -top-2 -right-2">
                                  <span className="bg-primary text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                    SAVE ${plan.save}
                                  </span>
                                </div>
                              )}
                              
                              <div className="text-sm font-medium text-foreground mb-1">{plan.duration}</div>
                              
                              <div className="mb-2">
                                {plan.originalPrice && (
                                  <span className="text-xs text-muted line-through">${plan.originalPrice}</span>
                                )}
                                <span className="text-xl font-bold text-primary">${plan.price}</span>
                                <span className="text-xs text-muted">/{plan.duration === '12 Months' ? 'yr' : 'mo'}</span>
                              </div>

                              {isSelected && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                  <IconCheck className="h-3 w-3 text-black" />
                                </div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Instant Action - Shows when a plan is selected */}
                <AnimatePresence>
                  {selectedPlan && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border p-4 md:p-6"
                    >
                      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                          <div className="text-sm text-muted">Selected Plan</div>
                          <div className="text-lg font-bold text-foreground">
                            {selectedPlan.pack.name} • {selectedPlan.plan.duration} • <span className="text-primary">${selectedPlan.plan.price}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted">Order via:</span>
                          <button
                            onClick={() => handleOrder('whatsapp')}
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-5 py-2.5 rounded-xl font-bold transition-colors"
                          >
                            <IconBrandWhatsapp className="h-5 w-5" />
                            WhatsApp
                          </button>
                          <button
                            onClick={() => handleOrder('telegram')}
                            className="flex items-center gap-2 bg-[#229ED9] hover:bg-[#229ED9]/80 text-white px-5 py-2.5 rounded-xl font-bold transition-colors"
                          >
                            <IconBrandTelegram className="h-5 w-5" />
                            Telegram
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <IconCheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Request Sent!</h2>
                <p className="text-gray-400 mb-6">
                  We&apos;ve opened your messaging app. Please send the message to confirm your subscription.
                </p>
                <div className="bg-surface border border-border rounded-xl p-4 text-left mb-6">
                  <p className="text-sm text-gray-400 mb-2">Your selection:</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Package:</span>
                      <span className="text-foreground font-medium">{selectedPlan?.pack.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-foreground font-medium">{selectedPlan?.plan.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price:</span>
                      <span className="text-primary font-bold">${selectedPlan?.plan.price}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary hover:underline"
                >
                  ← Choose another plan
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto px-6 mt-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">Why Choose StreamPro?</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 StreamPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
