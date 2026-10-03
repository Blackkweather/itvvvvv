'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconCheck, IconMonitor } from '@/components/ui/Icons';
import PlanCard, { type Plan } from '@/components/pricing/PlanCard';
import { useCurrency } from '@/hooks/useCurrency';

export const PLANS: Record<number, Plan[]> = {
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

/** Device picker, plan cards and order bar — shared by /pricing and the home page. */
export default function PricingPlans() {
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
    <>
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
         <section className="max-w-6xl mx-auto px-4 sm:px-6">
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
    </>
  );
}
