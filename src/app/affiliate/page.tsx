'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Users, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Magnetic component
const Magnetic = dynamic(() => import('@/components/ui/Magnetic'), { ssr: false });

export default function AffiliatePage() {
    const stats = [
        { label: 'Commission', value: '30%', sub: 'Recurring for life', icon: DollarSign },
        { label: 'Cookie Life', value: '90 Days', sub: 'Long-term tracking', icon: TrendingUp },
        { label: 'Payout', value: 'Instant', sub: 'Via Crypto/PayPal', icon: CheckCircle2 },
    ];

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="section-padding max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
                    >
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">The Affiliate Army</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight uppercase tracking-tighter"
                    >
                        Scale Your <span className="gradient-text-gold">Income</span><br /> With StreamPro
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-secondary-foreground max-w-2xl mx-auto font-light leading-relaxed uppercase tracking-wide"
                    >
                        Join the most lucrative affiliate program in the streaming industry.
                        Earn 30% recurring commissions by promoting the world&apos;s most stable service.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="p-8 rounded-[32px] glass border-white/5 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <stat.icon size={80} />
                            </div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-primary mb-4 font-bold">{stat.label}</p>
                            <h3 className="text-5xl font-black mb-2">{stat.value}</h3>
                            <p className="text-sm text-secondary-foreground uppercase tracking-widest">{stat.sub}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Application CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="p-16 rounded-[48px] bg-gradient-to-br from-primary/10 via-background to-accent/5 border border-white/5 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] -z-10" />
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase">Ready to Start?</h2>
                    <p className="text-secondary-foreground mb-12 max-w-xl mx-auto font-light tracking-wide uppercase">
                        Application takes less than 2 minutes. Get your custom tracking dashboard and marketing assets instantly.
                    </p>
                    <div className="flex justify-center">
                        <Magnetic strength={0.2}>
                            <Link href="https://wa.me/+447853402172" target="_blank" rel="noopener noreferrer" className="btn-primary !px-16 !py-6 !text-[14px] !tracking-[0.3em]">
                                CONTACT FOR DETAILS <ArrowRight className="ml-3 h-5 w-5" />
                            </Link>
                        </Magnetic>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
