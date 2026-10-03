import Link from 'next/link';
import { Zap } from 'lucide-react';
import PricingPlans from '@/components/pricing/PricingPlans';

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-16 sm:py-20 md:py-24" aria-label="Pricing">
      <div className="absolute left-1/2 top-0 h-[360px] w-full -translate-x-1/2 bg-gradient-to-b from-primary/20 to-transparent opacity-30 blur-[100px]" />

      <div className="section-padding relative z-10 mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5">
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Simple pricing</span>
        </div>
        <h2 className="mb-3 text-3xl font-black uppercase leading-[0.9] tracking-tighter sm:text-4xl md:text-5xl">
          Choose your <span className="text-primary">plan</span>
        </h2>
        <p className="mx-auto max-w-xl text-sm text-[#a0a0a0] sm:text-base">
          Pick your device count, then your term. Every channel included.
        </p>
      </div>

      <div className="relative z-10">
        <PricingPlans />
      </div>

      <p className="relative z-10 mt-6 text-center text-xs text-[#a0a0a0]">
        <Link href="/pricing" className="underline-offset-4 hover:text-primary hover:underline">
          Compare all plan details →
        </Link>
      </p>
    </section>
  );
}
