'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Magnetic from '@/components/ui/Magnetic';

export function HeroBanner() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Parallax transforms
    const contentX = useTransform(mouseX, [-500, 500], [-15, 15]);
    const contentY = useTransform(mouseY, [-500, 500], [-15, 15]);
    const bgX = useTransform(mouseX, [-500, 500], [10, -10]);
    const bgY = useTransform(mouseY, [-500, 500], [10, -10]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const moveX = clientX - window.innerWidth / 2;
            const moveY = clientY - window.innerHeight / 2;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 1.1, filter: 'blur(40px)' },
        visible: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
        },
    } as any;

    return (
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Grid pattern */}
                <div className="absolute inset-0 bg-grid opacity-[0.15]" />

                {/* cinematic Gradient Orbs */}
                <motion.div
                    style={{ x: bgX, y: bgY }}
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-[160px]"
                />

                <motion.div
                    style={{ x: bgY, y: bgX }}
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-accent/[0.03] blur-[140px]"
                />

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,5,0.8)_100%)]" />

                {/* Secondary subtle glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-background via-primary/[0.01] to-background" />
            </div>

            {/* Content */}
            <motion.div
                style={{ x: contentX, y: contentY }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 section-padding text-center"
            >
                <div className="max-w-5xl mx-auto">


                    {/* Simple Metadata */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center gap-4 mb-10 text-[10px] uppercase text-white/40 tracking-[0.3em] font-bold"
                    >
                        <span>4K</span>
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <span>HDR</span>
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <span>2026</span>
                    </motion.div>

                    {/* Headline / Title Art Style */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-7xl sm:text-8xl md:text-[160px] font-black tracking-[-0.08em] leading-[0.8] uppercase mb-12"
                    >
                        <span className="text-white">STREAM</span>
                        <span className="text-white/20">PRO</span>
                    </motion.h1>

                    {/* Subtitle / Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-sm md:text-base text-secondary-foreground max-w-2xl mx-auto mb-14 leading-relaxed font-medium uppercase tracking-widest"
                    >
                        The world's most stable enterprise streaming network.
                        No buffering. No compromises. Just absolute dominance.
                    </motion.p>

                    {/* Minimalist CTAs */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Magnetic strength={0.1}>
                            <Link href="/pricing" className="bg-white text-black px-10 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-all duration-300">
                                WATCH NOW
                            </Link>
                        </Magnetic>
                        <Magnetic strength={0.1}>
                            <a href="#browse" className="bg-transparent border border-white/20 text-white px-10 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all duration-300">
                                EXPLORE
                            </a>
                        </Magnetic>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-20 flex flex-wrap items-center justify-center gap-10 text-muted-foreground text-sm font-medium"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                            <span>Global Network: Online</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-foreground font-bold text-base">500TB+</span>
                            <span>Daily Traffic</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-foreground font-bold text-base">4.98/5</span>
                            <span>Satisfaction</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="h-5 w-5 text-primary" />
                </motion.div>
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        </section>
    );
}
