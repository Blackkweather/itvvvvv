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
  IconMonitor
} from '@/components/ui/Icons';

const PLANS = {
  1: [
    { id: '1D_1M', name: '1 Month', price: 15, originalPrice: null, duration: 'month' },
    { id: '1D_3M', name: '3 Months', price: 35, originalPrice: 45, duration: '3 months', save: 10 },
    { id: '1D_6M', name: '6 Months', price: 50, originalPrice: 70, duration: '6 months', save: 20 },
    { id: '1D_12M', name: '12 Months', price: 75, originalPrice: 110, duration: 'year', save: 35 },
  ],
  2: [
    { id: '2D_1M', name: '1 Month', price: 25, originalPrice: null, duration: 'month' },
    { id: '2D_3M', name: '3 Months', price: 60, originalPrice: 90, duration: '3 months', save: 30 },
    { id: '2D_6M', name: '6 Months', price: 85, originalPrice: 140, duration: '6 months', save: 55 },
    { id: '2D_12M', name: '12 Months', price: 125, originalPrice: 210, duration: 'year', save: 85 },
  ],
  3: [
    { id: '3D_1M', name: '1 Month', price: 35, originalPrice: null, duration: 'month' },
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

const FEATURES = [
  { icon: IconFilm, title: '30,000+ Channels', description: 'Live TV worldwide' },
  { icon: IconZap, title: '4K Quality', description: 'Crystal clear streaming' },
  { icon: IconShield, title: 'Anti-Freeze', description: 'Buffer-free experience' },
  { icon: IconHeadphones, title: '24/7 Support', description: 'Always here to help' },
  { icon: IconClock, title: '120,000+ VOD', description: 'Movies on demand' },
];

export default function PricingPage() {
  const [selectedDevices, setSelectedDevices] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('1D_1M');
  const currentPlans = PLANS[selectedDevices as keyof typeof PLANS] || PLANS[1];

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-20" id="pricing">
        {/* Hero */}
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
              <IconZap className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                Starting at $15/month
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
              className="text-lg text-[#a0a0a0] max-w-2xl mx-auto mb-8"
            >
              Select the perfect plan for your streaming needs. 
              All plans include 30,000+ channels and 120,000+ VOD.
            </motion.p>
          </div>
        </section>

        {/* Device Selection */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#f0f0f0] mb-2">How Many Devices?</h2>
            <p className="text-[#a0a0a0]">Select the number of simultaneous connections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEVICE_OPTIONS.map((option) => {
              const isSelected = selectedDevices === option.devices;
              const devicePlans = PLANS[option.devices as keyof typeof PLANS];
              const monthlyPrice = devicePlans.find(p => p.duration === 'month')?.price || 15;
              
              return (
                <motion.button
                  key={option.devices}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
                  
<div className="flex items-center gap-3 mb-3">
                                            <IconMonitor className={`h-6 w-6 ${isSelected ? 'text-primary' : 'text-[#a0a0a0]'}`} />
                                            <span className="text-2xl font-bold text-[#f0f0f0]">{option.devices}</span>
                                        </div>
                                        
                                        <div className="font-medium text-[#f0f0f0] mb-1">{option.label}</div>
                                        <p className="text-[#a0a0a0] mb-4">{option.description}</p>
                  
                  <div className="pt-4 border-t border-border">
                    <span className="text-3xl font-bold text-primary">${monthlyPrice}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDevices}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {currentPlans.map((plan, index) => {
                const isSelected = selectedPlan === plan.id;
                
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                      isSelected ? 'ring-2 ring-primary' : ''
                    } ${
                      index === 0 
                        ? 'lg:scale-105 lg:shadow-2xl lg:shadow-primary/20' 
                        : ''
                    }`}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 ${
                      isSelected
                        ? 'bg-gradient-to-br from-primary/30 via-primary/15 to-transparent'
                        : index === 0
                        ? 'bg-gradient-to-br from-primary/20 via-primary/10 to-transparent'
                        : 'bg-gradient-to-br from-white/5 to-transparent'
                    }`} />
                    
                    {/* Border glow effect */}
                    <div className={`absolute inset-0 rounded-2xl border ${
                      isSelected
                        ? 'border-primary shadow-[inset_0_0_30px_rgba(0,212,255,0.2)]'
                        : index === 0
                        ? 'border-primary/50 shadow-[inset_0_0_30px_rgba(0,212,255,0.1)]'
                        : 'border-white/10 group-hover:border-primary/30'
                    } transition-all duration-300`} />

                    <div className="relative p-6 md:p-7 h-full flex flex-col">
                      {/* Badge */}
                      {plan.save && (
                        <div className="mb-4">
                          <span className="inline-block bg-gradient-to-r from-primary via-primary to-accent/80 text-black text-xs font-black px-3 py-1.5 rounded-full">
                            💰 SAVE ${plan.save}
                          </span>
                        </div>
                      )}
                      {index === 0 && !plan.save && (
                        <div className="mb-4">
                          <span className="inline-block bg-primary/20 border border-primary/50 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      {/* Plan Name */}
                      <h3 className="text-base font-bold text-white mb-4">{plan.name}</h3>
                      
                      {/* Price Section */}
                      <div className="mb-6">
                        {plan.originalPrice && (
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-sm text-gray-400 font-medium">Was</span>
                            <span className="text-lg text-gray-500 line-through font-semibold">${plan.originalPrice}</span>
                          </div>
                        )}
<div className="flex items-baseline gap-2">
                            <span className={`${index === 0 ? 'text-5xl' : 'text-4xl'} font-black bg-gradient-to-r from-primary via-primary to-accent/80 bg-clip-text text-transparent`}>
                                ${plan.price}
                            </span>
                            <span className="text-[#a0a0a0] font-medium">/{plan.duration}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                      {/* Features */}
                      <ul className="space-y-3 mb-8 flex-grow">
                        {['30,000+ Channels', '4K Quality', '120,000+ VOD', '24/7 Support', 'Anti-Freeze'].map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                            <div className={`mt-0.5 rounded-full shrink-0 ${index === 0 ? 'bg-primary/20' : 'bg-white/10'}`}>
                              <IconCheck className={`h-3.5 w-3.5 ${index === 0 ? 'text-primary' : 'text-green-400'}`} />
                            </div>
                            <span className="text-[#f0f0f0] font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <a
                        href={`https://wa.me/447853402172?text=Hi%2C%20I'm%20interested%20in%20the%20${plan.name}%20${selectedDevices}%20Device%20plan%20(%24${plan.price})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full py-3.5 rounded-xl font-bold text-center transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? 'bg-gradient-to-r from-primary via-primary to-accent/80 text-black shadow-lg shadow-primary/50 font-black'
                            : index === 0
                            ? 'bg-gradient-to-r from-primary/60 via-primary/60 to-accent/50 text-black shadow-lg shadow-primary/30 hover:shadow-primary/50 font-black'
                            : 'bg-white/5 text-[#f0f0f0] hover:bg-white/10 border border-white/20 hover:border-primary/50'
                        }`}
                      >
                        {isSelected ? '✅ Plan Selected' : index === 0 ? '🚀 Get This Plan' : 'Select Plan'}
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Selected Plan Summary */}
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div>
                  <p className="text-[#a0a0a0] text-sm mb-2">Selected Plan</p>
                  <h3 className="text-2xl font-bold text-[#f0f0f0]">
                    {currentPlans.find(p => p.id === selectedPlan)?.name}
                  </h3>
                </div>
                <div>
                  <p className="text-[#a0a0a0] text-sm mb-2">Devices</p>
                  <h3 className="text-2xl font-bold text-[#f0f0f0]">
                    {selectedDevices} Device{selectedDevices !== 1 ? 's' : ''}
                  </h3>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[#a0a0a0] text-sm mb-2">Total Price</p>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-primary to-accent/80 bg-clip-text text-transparent">
                    ${currentPlans.find(p => p.id === selectedPlan)?.price}
                  </h3>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-6">
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

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 mt-20">
          <div className="bg-gradient-to-br from-primary/10 via-surface to-accent/5 border border-border rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Our team is here to help you choose the right plan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/faq"
                className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-white/5 transition-colors"
              >
                View FAQ
              </Link>
              <a
                href="https://wa.me/+447853402172"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold bg-primary text-black hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
