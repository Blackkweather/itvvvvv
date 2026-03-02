'use client';

import { motion } from 'framer-motion';
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

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesSection() {
    return (
        <section id="features" className="relative py-32 overflow-hidden bg-white/[0.01]">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.05] rounded-full blur-[120px] animate-breathe" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[100px] animate-breathe" style={{ animationDelay: '2s' }} />

            <div className="section-padding relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                    >
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80">
                            Technological Supremacy
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase"
                    >
                        The <span className="gradient-text">Goliath</span> <br />
                        Infrastructure.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-secondary-foreground text-xl max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        Zero constraints. Zero latency. We've optimized every layer of the multi-device mesh
                        for total spectral dominance.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -10 }}
                            className="group relative rounded-[32px] glass-strong p-10 border-white/[0.05] hover:border-primary/40 transition-all duration-500 overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="h-14 w-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                                    <feature.icon strokeWidth={1.5} className="h-7 w-7 text-white group-hover:text-background transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-secondary-foreground text-sm leading-relaxed font-medium uppercase tracking-wide">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Corner Tech Detail */}
                            <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                                <Activity strokeWidth={1} className="h-10 w-10 text-white" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
