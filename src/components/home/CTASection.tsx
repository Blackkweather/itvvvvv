'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Check, Shield, Clock } from 'lucide-react';
import { useState } from 'react';

export function CTASection() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGetStarted = () => {
        setIsLoading(true);
        // Simulate loading
        setTimeout(() => {
            window.location.href = '/pricing';
        }, 1000);
    };

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.04] to-background" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/[0.06] rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[300px] bg-accent/[0.04] rounded-full blur-[120px]" />
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid opacity-10" />
            </div>

            <div className="section-padding relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-8"
                    >
                        <Zap strokeWidth={1.5} className="h-8 w-8 text-primary" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30, scale: 1.05, filter: 'blur(20px)' }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                    >
                        Ready to Upgrade Your{' '}
                        <span className="gradient-text">Entertainment?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-xl text-secondary-foreground max-w-xl mx-auto mb-10"
                    >
                        Join 50,000+ satisfied subscribers. Start streaming 15,000+ channels in 4K today.
                        No contract. Cancel anytime.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                        <motion.button
                            onClick={handleGetStarted}
                            disabled={isLoading}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className={`relative bg-white text-black px-12 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${
                                isLoading ? 'opacity-70 cursor-wait' : 'hover:bg-white/90'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="inline-block"
                                    >
                                        <Zap className="h-4 w-4" />
                                    </motion.span>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    Get Started
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </motion.button>
                        <span className="text-sm text-muted-foreground">
                            Starting at just <strong className="text-foreground">€9.99/month</strong>
                        </span>
                    </div>

                    {/* Guarantee badges with icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex flex-wrap items-center justify-center gap-6"
                    >
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                            24h Free Trial
                        </span>
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-success" />
                            No Credit Card Required
                        </span>
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-success" />
                            Cancel Anytime
                        </span>
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            99.9% Uptime
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
