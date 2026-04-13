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
  IconArrowRight,
  IconCheckCircle,
  IconAlertTriangle,
  IconMonitor,
  IconMessageCircle
} from '@/components/ui/Icons';

const TRIAL_CONFIG = {
  whatsappNumber: '+447853402172',
  trialDuration: '24 hours',
};

const PLANS = {
  1: [
    { id: '1M', name: '1 Month', price: 15, originalPrice: null, duration: 'month' },
    { id: '3M', name: '3 Months', price: 35, originalPrice: 45, duration: '3 months', save: 10 },
    { id: '6M', name: '6 Months', price: 50, originalPrice: 70, duration: '6 months', save: 20 },
    { id: '12M', name: '12 Months', price: 75, originalPrice: 110, duration: 'year', save: 35 },
  ],
  2: [
    { id: '1M', name: '1 Month', price: 25, originalPrice: null, duration: 'month' },
    { id: '3M', name: '3 Months', price: 60, originalPrice: 90, duration: '3 months', save: 30 },
    { id: '6M', name: '6 Months', price: 85, originalPrice: 140, duration: '6 months', save: 55 },
    { id: '12M', name: '12 Months', price: 125, originalPrice: 210, duration: 'year', save: 85 },
  ],
  3: [
    { id: '1M', name: '1 Month', price: 35, originalPrice: null, duration: 'month' },
    { id: '3M', name: '3 Months', price: 85, originalPrice: 110, duration: '3 months', save: 25 },
    { id: '6M', name: '6 Months', price: 125, originalPrice: 200, duration: '6 months', save: 75 },
    { id: '12M', name: '12 Months', price: 175, originalPrice: 280, duration: 'year', save: 105 },
  ],
};

const DEVICE_OPTIONS = [
  { devices: 1, label: '1 Device', description: 'Perfect for personal use', startingPrice: 15 },
  { devices: 2, label: '2 Devices', description: 'Great for couples', startingPrice: 25 },
  { devices: 3, label: '3 Devices', description: 'Family plan', startingPrice: 35 },
];

const FEATURES = [
  { icon: IconFilm, title: '30,000+ Channels', description: 'Live TV worldwide' },
  { icon: IconZap, title: '4K Quality', description: 'Crystal clear streaming' },
  { icon: IconShield, title: 'Anti-Freeze', description: 'Buffer-free experience' },
  { icon: IconHeadphones, title: '24/7 Support', description: 'Always here to help' },
  { icon: IconClock, title: '120,000+ VOD', description: 'Movies on demand' },
];

interface LeadData {
  timestamp: string;
  deviceCount: number;
  selectedPlan: string;
  planPrice: number;
  phone?: string;
  name?: string;
}

function openWhatsApp(message: string) {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${TRIAL_CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');
}

export default function FreeTrialPage() {
  const [step, setStep] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentPlans = PLANS[selectedDevices as keyof typeof PLANS] || PLANS[1];

  const handlePlanSelect = (plan: typeof PLANS[1][0]) => {
    setSelectedPlan(plan.id);
    
    const data: LeadData = {
      timestamp: new Date().toISOString(),
      deviceCount: selectedDevices,
      selectedPlan: plan.id,
      planPrice: plan.price,
    };
    setLeadData(data);

    const message = `📦 *New Subscription Order*

Hello, I would like to subscribe to StreamPro.

📋 *Package:* ${plan.name}
📱 *Number of Devices:* ${selectedDevices}
💵 *Price:* $${plan.price}/${plan.duration === 'year' ? 'year' : 'month'}

Please confirm the order. Thank you!`;

    openWhatsApp(message);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            <span className="text-foreground">STREAM</span>
            <span className="text-primary">PRO</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm text-muted hover:text-foreground transition-colors">Features</Link>
            <Link href="/#devices" className="text-sm text-muted hover:text-foreground transition-colors">Devices</Link>
            <Link href="/faq" className="text-sm text-muted hover:text-foreground transition-colors">FAQ</Link>
          </nav>
        </div>
      </header>

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
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
              Get Your <span className="text-primary">Subscription</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted max-w-2xl mx-auto mb-8"
            >
              Experience 30,000+ channels in stunning 4K quality. 
              Choose your plan and start watching instantly.
            </motion.p>
          </div>
        </section>

        {/* Step Indicator */}
        <section className="max-w-3xl mx-auto px-6 mb-12">
          <div className="flex items-center justify-center gap-3">
            {[
              { num: 1, label: 'Devices' },
              { num: 2, label: 'Choose Plan' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => setStep(s.num)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    step === s.num
                      ? 'bg-primary text-black font-medium'
                      : step > s.num
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-muted hover:text-foreground'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    step === s.num
                      ? 'bg-black/20'
                      : step > s.num
                        ? 'bg-green-500'
                        : 'bg-white/10'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < 1 && (
                  <div className={`w-12 h-px mx-2 ${step > s.num ? 'bg-green-500' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-5xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Device Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">How Many Devices?</h2>
                  <p className="text-gray-400">Select the number of simultaneous connections</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {DEVICE_OPTIONS.map((option) => {
                    const isSelected = selectedDevices === option.devices;
                    return (
                      <button
                        key={option.devices}
                        onClick={() => setSelectedDevices(option.devices)}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                            : 'border-border hover:border-primary/50 hover:bg-white/5'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <IconCheck className="h-4 w-4 text-black" />
                          </div>
                        )}
                        <div className="text-4xl font-bold text-foreground mb-2">{option.devices}</div>
                        <div className="font-medium text-foreground">{option.label}</div>
                        <p className="text-gray-300 mt-2">{option.description}</p>
                        <div className="mt-4 pt-4 border-t border-border">
                          <span className="text-2xl font-bold text-primary">${option.startingPrice}</span>
                          <span className="text-gray-400">/month</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all"
                  >
                    Continue <IconArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Plan Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Plan</h2>
                  <p className="text-gray-400">Select a duration that works for you</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentPlans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan)}
                      disabled={isSubmitted}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedPlan === plan.id
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-white/5'
                      }`}
                    >
                      {plan.save && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">
                            SAVE ${plan.save}
                          </span>
                        </div>
                      )}

                      <h3 className="font-bold text-foreground mb-1">{plan.name}</h3>
                      
                      <div className="mb-4">
                        {plan.originalPrice && (
                          <span className="text-sm text-muted line-through">${plan.originalPrice}</span>
                        )}
                        <span className="text-3xl font-bold text-primary">
                          ${plan.price}
                        </span>
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

                      <div className={`mt-4 pt-4 rounded-lg bg-white/5 text-muted text-center text-sm font-medium`}>
                        <span className="flex items-center justify-center gap-2">
                          <IconMessageCircle className="h-4 w-4" />
                          Click to order via WhatsApp
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleBack}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    ← Back to devices
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success State */}
          {isSubmitted && (
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
                We've opened WhatsApp. Please send the message to confirm your subscription.
              </p>
              <div className="bg-surface border border-border rounded-xl p-4 text-left">
                <p className="text-sm text-gray-400 mb-2">Your selection:</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Devices:</span>
                    <span className="text-foreground font-medium">{leadData?.deviceCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan:</span>
                    <span className="text-foreground font-medium">{leadData?.selectedPlan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-primary font-bold">${leadData?.planPrice}/mo</span>
                  </div>
                </div>
              </div>
              <Link
                href="/"
                className="inline-block mt-6 text-primary hover:underline"
              >
                ← Back to home
              </Link>
            </motion.div>
          )}
        </section>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto px-6 mt-20">
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

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto px-6 mt-20">
          <div className="bg-gradient-to-br from-primary/10 via-surface to-accent/5 border border-border rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Our team is here to help you get started with your subscription.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/faq"
                className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-white/5 transition-colors"
              >
                View FAQ
              </Link>
              <a
                href={`https://wa.me/${TRIAL_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition-colors"
              >
                <IconMessageCircle className="h-5 w-5" />
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 StreamPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
