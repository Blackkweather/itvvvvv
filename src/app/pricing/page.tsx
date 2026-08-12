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
  IconMonitor
} from '@/components/ui/Icons';
import PlanCard, { type Plan } from '@/components/pricing/PlanCard';
import { useCurrency } from '@/hooks/useCurrency';

const PLANS: Record<number, Plan[]> = {
   1: [
     { id: '1D_1M', name: '1 Month', price: 20, originalPrice: null, duration: 'month' },
     { id: '1D_3M', name: '3 Months', price: 40, originalPrice: 50, duration: '3 months', save: 10 },
     { id: '1D_6M', name: '6 Months', price: 55, originalPrice: 75, duration: '6 months', save: 20 },
     { id: '1D_12M', name: '12 Months', price: 80, originalPrice: 115, duration: 'year', save: 35 },
   ],
   2: [
     { id: '2D_1M', name: '1 Month', price: 30, originalPrice: null, duration: 'month' },
     { id: '2D_3M', name: '3 Months', price: 65, originalPrice: 95, duration: '3 months', save: 30 },
     { id: '2D_6M', name: '6 Months', price: 90, originalPrice: 145, duration: '6 months', save: 55 },
     { id: '2D_12M', name: '12 Months', price: 130, originalPrice: 215, duration: 'year', save: 85 },
   ],
   3: [
     { id: '3D_1M', name: '1 Month', price: 40, originalPrice: null, duration: 'month' },
     { id: '3D_3M', name: '3 Months', price: 90, originalPrice: 115, duration: '3 months', save: 25 },
     { id: '3D_6M', name: '6 Months', price: 130, originalPrice: 205, duration: '6 months', save: 75 },
     { id: '3D_12M', name: '12 Months', price: 180, originalPrice: 285, duration: 'year', save: 105 },
   ],
 };

const INCLUDED_IN_EVERY_PLAN = [
  '30,000+ Channels',
  '4K Quality',
  '120,000+ VOD',
  '24/7 Support',
  'Anti-Freeze',
];

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
  const { symbol } = useCurrency();
  const activePlan = currentPlans.find((p) => p.id === selectedPlan);
  // Highlight the plan with the biggest discount (the 12-month plan).
  const bestValueIndex = currentPlans.reduce(
    (best, plan, i) => ((plan.save ?? 0) > (currentPlans[best].save ?? 0) ? i : best),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 pb-16" id="pricing">
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
                 Starting at {symbol}20/month
               </span>
            </motion.div>

             <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4"
             >
               Choose Your <span className="text-primary">Plan</span>
             </motion.h1>

             <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-sm sm:text-base text-[#a0a0a0] max-w-2xl mx-auto mb-2"
             >
               Pick your device count, then your term. Cancel anytime.
             </motion.p>
          </div>
        </section>

         {/* Device Selection */}
         <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
           <div className="mb-3">
             <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a0a0a0]">
               Devices
             </h2>
           </div>

           <div className="grid grid-cols-3 gap-2 sm:gap-3">
             {DEVICE_OPTIONS.map((option, i) => {
               const isSelected = selectedDevices === option.devices;
               const devicePlans = PLANS[option.devices as keyof typeof PLANS];
               const monthlyPrice = devicePlans.find(p => p.duration === 'month')?.price || 20;

               return (
                 <motion.button
                   key={option.devices}
                   initial={{ opacity: 0, y: 12 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.05 }}
                   whileTap={{ scale: 0.985 }}
                   aria-pressed={isSelected}
                   onClick={() => {
                     setSelectedDevices(option.devices);
                     setSelectedPlan((prev) => prev.replace(/^\d+D/, `${option.devices}D`));
                   }}
                   className={`relative flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors duration-300 sm:px-4 ${
                     isSelected
                       ? 'border-primary/70 bg-primary/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]'
                       : 'border-white/10 bg-white/[0.02] hover:border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                   }`}
                 >
                   <IconMonitor className={`hidden h-5 w-5 shrink-0 sm:block ${isSelected ? 'text-primary' : 'text-white/40'}`} />

                   <div className="min-w-0">
                     <div className="truncate text-xs font-semibold text-[#f0f0f0] sm:text-sm">
                       {option.label}
                     </div>
                     <div className="whitespace-nowrap text-[11px] tabular-nums text-[#a0a0a0]">
                       from <span className="text-primary">{symbol}{monthlyPrice}</span>/mo
                     </div>
                   </div>

                   {isSelected && (
                     <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                       <IconCheck className="h-2.5 w-2.5 text-black" />
                     </span>
                   )}
                 </motion.button>
               );
             })}
           </div>
         </section>

         {/* Pricing Plans */}
         <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
           <AnimatePresence mode="wait">
             <motion.div
               key={selectedDevices}
               initial="hidden"
               animate="show"
               exit="exit"
               variants={{
                 hidden: {},
                 show: { transition: { staggerChildren: 0.07 } },
                 exit: { transition: { staggerChildren: 0.03 } },
               }}
               className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 items-stretch"
             >
               {currentPlans.map((plan, index) => (
                 <PlanCard
                   key={plan.id}
                   plan={plan}
                   devices={selectedDevices}
                   isSelected={selectedPlan === plan.id}
                   isFeatured={index === bestValueIndex}
                   symbol={symbol}
                   onSelect={setSelectedPlan}
                 />
               ))}
             </motion.div>
           </AnimatePresence>

           {/* Stated once instead of repeated inside all four cards */}
           <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
             <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a0a0a0]">
               Every plan includes
             </span>
             {INCLUDED_IN_EVERY_PLAN.map((item) => (
               <span key={item} className="flex items-center gap-1.5 text-xs text-[#d4d4d4]">
                 <IconCheck className="h-3 w-3 shrink-0 text-primary" />
                 {item}
               </span>
             ))}
           </div>

           {/* Selected plan — one compact line instead of a three-column block */}
           {activePlan && (
             <motion.div
               layout
               transition={{ type: 'spring', stiffness: 100, damping: 20 }}
               className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-primary/25 bg-primary/[0.06] px-4 py-3"
             >
               <span className="text-sm text-[#d4d4d4]">
                 {activePlan.name} · {selectedDevices} device{selectedDevices !== 1 ? 's' : ''}
               </span>
               <span className="text-xl font-semibold tabular-nums text-primary">
                 {symbol}{activePlan.price}
               </span>
               <a
                 href={`https://wa.me/34673317263?text=${encodeURIComponent(
                   `Hi, I'd like the ${activePlan.name} plan for ${selectedDevices} device${selectedDevices !== 1 ? 's' : ''} (${symbol}${activePlan.price}).`
                 )}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="ml-auto rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-primary/90 active:translate-y-px sm:text-sm"
               >
                 Order on WhatsApp
               </a>
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
                href="https://wa.me/34673317263"
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
