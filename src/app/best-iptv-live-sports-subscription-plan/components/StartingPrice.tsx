'use client';

import { useCurrency } from '@/hooks/useCurrency';
import { PLANS } from '@/components/pricing/PricingPlans';

/** Lowest monthly price, with the region-detected currency symbol (same numbers everywhere). */
export default function StartingPrice() {
  const { symbol } = useCurrency();
  const lowest = Math.min(...PLANS[1].map((p) => p.price));
  return (
    <>
      {symbol}
      {lowest}
    </>
  );
}
