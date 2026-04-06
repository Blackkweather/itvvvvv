'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Tv, Shield, Zap, Globe, Smartphone, Film, Radio, HeadphonesIcon, Activity } from 'lucide-react';

const features = [
    {
        icon: Tv,
        title: '10,000+ Live Channels',
        description: 'Access a massive library of live TV channels from around the world, including sports, news, entertainment, and more.',
        gradient: 'from-primary to-blue-500',
    },
    {
        icon: Film,
        title: 'Movies & Series On-Demand',
        description: 'Enjoy thousands of the latest movies and binge-worthy TV series available on-demand, updated daily.',
        gradient: 'from-accent to-purple-600',
    },
    {
        icon: Zap,
        title: 'Anti-Freeze Technology',
        description: 'Our proprietary anti-buffer system ensures a smooth, interruption-free experience even on slower connections.',
        gradient: 'from-amber-400 to-orange-500',
    },
    {
        icon: Shield,
        title: '4K Ultra HD Quality',
        description: 'Crystal-clear picture quality with support for 4K UHD, HDR, and Dolby Atmos on compatible devices.',
        gradient: 'from-emerald-400 to-green-600',
    },
    {
        icon: Globe,
        title: 'Global Coverage',
        description: 'Stream from anywhere in the world with our optimized CDN. Channels from 100+ countries in 50+ languages.',
        gradient: 'from-sky-400 to-blue-600',
    },
    {
        icon: Smartphone,
        title: 'Multi-Device Support',
        description: 'Watch on Smart TVs, phones, tablets, PCs, MAG boxes, and Fire Stick. Up to 4 simultaneous connections.',
        gradient: 'from-rose-400 to-pink-600',
    },
    {
        icon: Radio,
        title: 'EPG & Catch-Up',
        description: 'Full Electronic Program Guide with 7-day catch-up TV. Never miss your favorite shows again.',
        gradient: 'from-cyan-400 to-teal-600',
    },
    {
        icon: HeadphonesIcon,
        title: '24/7 Premium Support',
        description: 'Our expert support team is available around the clock to help you with setup, troubleshooting, and more.',
        gradient: 'from-violet-400 to-indigo-600',
    },
];

export function FeaturesSection() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section 
            id="features" 
            className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden bg-white/[0.01]"
            aria-label="Features"
        >
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/4 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-primary/[0.05] rounded-full blur-[80px] md:blur-[120px] animate-breathe" />
            <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-accent/[0.04] rounded-full blur-[60px] md:blur-[100px] animate-breathe" style={{ animationDelay: '2s' }} />

            <div className="section-padding relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6 backdrop-blur-md"
                    >
                        <Zap className="h-3 w-3 sm:h-4 w-4 text-primary" />
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80">
                            Technological Supremacy
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 sm:mb-6 md:mb-8 leading-[0.9] sm:leading-[0.85] uppercase"
                    >
                        The <span className="gradient-text">Goliath</span> <br className="hidden sm:block" />
                        Infrastructure.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-medium px-4 sm:px-0"
                    >
                        Zero constraints. Zero latency. We&apos;ve optimized every layer of the multi-device mesh
                        for total spectral dominance.
                    </motion.p>
                </div>

                {/* Features Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ 
                                duration: shouldReduceMotion ? 0.2 : 0.5, 
                                delay: i * 0.05,
                                ease: "easeOut"
                            }}
                            whileHover={shouldReduceMotion ? {} : { y: -8 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative rounded-2xl sm:rounded-3xl glass-strong p-5 sm:p-6 md:p-8 lg:p-10 border-white/[0.05] hover:border-primary/30 transition-all duration-500 overflow-hidden"
                        >
                            {/* Gradient background on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                            
                            <div className="relative z-10">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                                    <feature.icon strokeWidth={1.5} className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white group-hover:text-background transition-colors" />
                                </div>
                                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 uppercase tracking-tighter group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Corner Tech Detail */}
                            <div className="absolute bottom-0 right-0 p-4 sm:p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                                <Activity strokeWidth={1} className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
