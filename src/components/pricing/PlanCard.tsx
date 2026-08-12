'use client';

import { memo } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';

export interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  duration: string;
  save?: number;
}

interface PlanCardProps {
  plan: Plan;
  devices: number;
  isSelected: boolean;
  isFeatured: boolean;
  /** Region-detected symbol. The numbers themselves never change. */
  symbol: string;
  onSelect: (id: string) => void;
}

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.16 } },
};

function PlanCard({ plan, devices, isSelected, isFeatured, symbol, onSelect }: PlanCardProps) {
  const reduceMotion = useReducedMotion();

  // Cursor position lives outside the render cycle — no state, no re-renders.
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const surfaceLight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 65%)`;
  // hsl(45 100% 50%) — the site's existing gold, no new colours introduced.
  const edgeLight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(255,212,0,0.55), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const message = encodeURIComponent(
    `Hi, I'd like the ${plan.name} plan for ${devices} device${devices > 1 ? 's' : ''} (${symbol}${plan.price}).`
  );

  const discount = plan.originalPrice
    ? Math.round((1 - plan.price / plan.originalPrice) * 100)
    : null;

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(plan.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(plan.id);
        }
      }}
      whileTap={{ scale: 0.985 }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      className={`group relative flex h-full cursor-pointer flex-col rounded-2xl border p-4 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary/60 sm:p-5 ${
        isSelected
          ? 'border-primary/70 bg-primary/[0.07]'
          : isFeatured
          ? 'border-white/15 bg-white/[0.035]'
          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
      } ${
        isFeatured
          ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_20px_44px_-28px_rgba(255,212,0,0.35)]'
          : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
      }`}
    >
      {/* Cursor-tracked surface light */}
      <motion.div
        aria-hidden
        style={{ background: surfaceLight }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Cursor-tracked edge refraction (1px border only) */}
      <motion.div
        aria-hidden
        style={{
          background: edgeLight,
          padding: '1px',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex h-full flex-col">
        {/* Fixed-height eyebrow keeps every price on the same baseline */}
        <div className="mb-3 flex h-5 items-center justify-between gap-1.5">
          <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a0a0a0]">
            {plan.name}
          </span>

          {isFeatured ? (
            <span className="relative shrink-0 overflow-hidden whitespace-nowrap rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-black">
              Best value
              {!reduceMotion && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                  animate={{ x: ['-120%', '220%'] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 3.4,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </span>
          ) : plan.save ? (
            <span className="shrink-0 whitespace-nowrap rounded-full border border-white/12 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary">
              -{symbol}{plan.save}
            </span>
          ) : null}
        </div>

        <div className="flex items-baseline gap-1">
          <span
            className={`text-[2rem] font-semibold leading-none tracking-tighter tabular-nums sm:text-[2.25rem] ${
              isSelected || isFeatured ? 'text-primary' : 'text-white'
            }`}
          >
            {symbol}{plan.price}
          </span>
          <span className="text-xs text-[#a0a0a0]">/{plan.duration}</span>
        </div>

        {/* Reserved line so cards without a discount still align */}
        <div className="mt-1.5 flex h-4 items-center gap-2 text-[11px]">
          {plan.originalPrice && (
            <>
              <span className="text-white/30 line-through tabular-nums">
                {symbol}{plan.originalPrice}
              </span>
              <span className="text-[#a0a0a0]">save {discount}%</span>
            </>
          )}
        </div>

        <a
          href={`https://wa.me/34673317263?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`mt-4 block rounded-lg py-2.5 text-center text-xs font-semibold transition-all duration-200 active:translate-y-px sm:text-sm ${
            isSelected || isFeatured
              ? 'bg-primary text-black hover:bg-primary/90'
              : 'border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]'
          }`}
        >
          {isSelected ? 'Continue' : 'Choose'}
        </a>
      </div>
    </motion.div>
  );
}

export default memo(PlanCard);
