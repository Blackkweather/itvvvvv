'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, ArrowRight, Shield, Zap, Clock, Users } from 'lucide-react';
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
            className={`relative rounded-[32px] transition-all duration-700 group ${plan.popular
                ? 'scale-[1.02]'
                : ''
                }`}
        >
            {/* Outer gradient border */}
            <div className={`absolute inset-0 rounded-[32px] p-[2px] ${plan.popular
                ? 'bg-gradient-to-b from-primary via-primary/60 to-transparent'
                : 'bg-white/5'
                }`}>
                <div className={`absolute inset-0 rounded-[30px] blur-xl ${plan.popular ? 'bg-primary/20' : ''}`} />
            </div>

            {/* Card content */}
            <div className={`relative rounded-[30px] p-8 h-full flex flex-col ${plan.popular
                ? 'bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f] border border-primary/20'
                : 'bg-black/40 border border-white/5'
                }`}>
                
                {/* Badge at top */}
                {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-xl ${
                            plan.badge.includes('SAVE $95') 
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black' 
                                : 'bg-primary text-black'
                        }`}>
                            {plan.badge}
                        </span>
                    </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className={`text-xl font-bold tracking-[0.15em] uppercase mb-2 ${
                        plan.popular ? 'text-primary' : 'text-white'
                    }`}>
                        {plan.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-light">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl font-light text-gray-400">$</span>
                        <span className={`text-5xl font-black tracking-tight ${
                            plan.popular ? 'text-white' : 'text-white/90'
                        }`}>
                            {plan.price.split('.')[0]}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">{plan.period}</span>
                    </div>
                    {plan.pricePerMonth && (
                        <p className="text-xs text-primary mt-1">
                            ${plan.pricePerMonth}/mo billed annually
                        </p>
                    )}
                </div>

                {/* CTA Button */}
                <div className="mb-6">
                    <Magnetic strength={0.1}>
                        <Link
                            href="#"
                            className={`w-full group/btn relative flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                                plan.popular
                                    ? 'bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20'
                                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                            }`}
                        >
                            <span>Get Started</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </Magnetic>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs text-gray-300">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-1">
                            {['A', 'B', 'C'].map((letter, i) => (
                                <div 
                                    key={i}
                                    className={`h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${
                                        i === 0 ? 'bg-primary' : i === 1 ? 'bg-purple-500' : 'bg-emerald-500'
                                    }`}
                                >
                                    {letter}
                                </div>
                            ))}
                        </div>
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                        2.4k+ online
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
