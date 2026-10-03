'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconShield,
  IconZap,
  IconClock,
  IconFilm,
  IconHeadphones
} from '@/components/ui/Icons';
import PricingPlans from '@/components/pricing/PricingPlans';
import { useCurrency } from '@/hooks/useCurrency';

const FEATURES = [
  { icon: IconFilm, title: '30,000+ Channels', description: 'Live TV worldwide' },
  { icon: IconZap, title: '4K Quality', description: 'Crystal clear streaming' },
  { icon: IconShield, title: 'Anti-Freeze', description: 'Buffer-free experience' },
  { icon: IconHeadphones, title: '24/7 Support', description: 'Always here to help' },
  { icon: IconClock, title: '120,000+ VOD', description: 'Movies on demand' },
];

export default function PricingPage() {
  const { symbol } = useCurrency();

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

        <div className="mb-20">
          <PricingPlans />
        </div>

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
