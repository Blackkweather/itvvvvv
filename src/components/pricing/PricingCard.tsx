'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, Star, ArrowRight, Sparkles } from 'lucide-react';
import { ReactNode } from 'react';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';

interface PricingCardProps {
    plan: {
        name: string;
        price: string;
        period: string;
        pricePerMonth?: string;
        description: string;
        popular?: boolean;
        anchor?: boolean;
        badge?: string;
        features: string[];
    };
    index: number;
}

export default function PricingCard({ plan, index }: PricingCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1, duration: 1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative rounded-[32px] p-[1px] transition-all duration-700 group ${plan.popular
                ? 'bg-gradient-to-b from-primary/40 via-primary/5 to-transparent scale-[1.03] z-10 shadow-[0_40px_100px_rgba(212,175,55,0.08)]'
                : 'bg-white/5 hover:bg-white/10'
                }`}
        >
            {/* Luxury Label */}
            {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-[10px] font-black uppercase tracking-[0.2em] text-[#1e1b15] shadow-2xl">
                        {plan.badge}
                    </span>
                </div>
            )}

            <div
                style={{ transform: "translateZ(50px)" }}
                className={`rounded-[23px] p-8 h-full flex flex-col relative overflow-hidden ${plan.popular
                    ? 'bg-card border border-primary/20'
                    : 'glass dark'
                    }`}
            >
                {/* Popular Glow */}
                {plan.popular && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16 rounded-full" />
                )}

                {/* Header */}
                <div className="mb-10 text-center">
                    <h3 className="text-2xl font-light tracking-[0.2em] uppercase text-foreground mb-3">
                        {plan.name}
                    </h3>
                    <p className="text-xs text-secondary-foreground font-light tracking-widest uppercase leading-relaxed">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-10 text-center relative">
                    <div className="flex items-baseline justify-center gap-2">
                        <span className="text-lg font-light text-primary/60">$</span>
                        <span className="text-7xl font-black text-foreground tracking-tighter tabular-nums gradient-text-gold">
                            {plan.price.split('.')[0]}
                        </span>
                        <span className="text-xs font-light tracking-widest text-muted-foreground uppercase">{plan.period}</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="mb-10">
                    <Magnetic strength={0.1}>
                        <Link
                            href="#"
                            className={`w-full group/btn relative flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold transition-all duration-300 ${plan.popular
                                ? 'bg-primary text-white shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.4)] hover:-translate-y-1'
                                : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            <span className="relative z-10">Get Instant Access</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            {plan.popular && (
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient-shift opacity-0 group-hover/btn:opacity-100 transition-opacity rounded-2xl" />
                            )}
                        </Link>
                    </Magnetic>
                </div>

                {/* Features */}
                <ul className="space-y-5 flex-1 border-t border-white/5 pt-8">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center justify-center gap-4 text-[13px] font-light tracking-wide text-secondary-foreground">
                            <Check className="h-3.5 w-3.5 text-primary opacity-50" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Visual Security Seal */}
                <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {[
                            { id: 1, color: 'bg-primary' },
                            { id: 2, color: 'bg-accent' },
                            { id: 3, color: 'bg-emerald-500' }
                        ].map((user) => (
                            <div 
                                key={user.id} 
                                className={`h-6 w-6 rounded-full border-2 border-background ${user.color} flex items-center justify-center text-[8px] font-bold text-white`}
                            >
                                {String.fromCharCode(64 + user.id)}
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Users 🔥</span>
                </div>
            </div>
        </motion.div>
    );
}
