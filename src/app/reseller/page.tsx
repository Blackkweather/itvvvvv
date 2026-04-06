'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layout, Zap, Globe, Package, Cpu } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Magnetic = dynamic(() => import('@/components/ui/Magnetic'), { ssr: false });

const resellerFeatures = [
    {
        title: "Enterprise Dashboard",
        desc: "Manage 10,000+ customers from a single, high-speed interface.",
        icon: Layout
    },
    {
        title: "Automated Provisioning",
        desc: "Instant line generation and automated renewal systems.",
        icon: Zap
    },
    {
        title: "White-Label Options",
        desc: "Create your own brand using our world-class infrastructure.",
        icon: Shield
    },
    {
        title: "Global Infrastructure",
        desc: "Server clusters in UK, USA, UAE, and EU for zero-latency.",
        icon: Globe
    },
    {
        title: "Credit System",
        desc: "Buy in bulk and scale as you grow. High margins guaranteed.",
        icon: Package
    },
    {
        title: "API Access",
        desc: "Build your own custom apps and websites on our core API.",
        icon: Cpu
    }
];

export default function ResellerPage() {
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="section-padding max-w-7xl mx-auto">
                {/* Header */}
                <div className="max-w-4xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 text-primary mb-6"
                    >
                        <span className="h-[1px] w-12 bg-primary" />
                        <span className="text-[11px] uppercase tracking-[0.4em] font-black">Enterprise Partnership</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-10"
                    >
                        Build Your Own <br />
                        <span className="gradient-text-gold">Streaming Empire</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-secondary-foreground font-light leading-relaxed uppercase tracking-[0.05em] max-w-2xl"
                    >
                        Become a StreamPro Reseller and access the world&apos;s most stable streaming infrastructure.
                        The only provider designed for professional scale.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {resellerFeatures.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[32px] glass-card border-white/5 hover:border-primary/20 transition-all duration-500 group"
                        >
                            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-700">
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">{feature.title}</h3>
                            <p className="text-secondary-foreground font-light leading-relaxed text-sm uppercase tracking-wide">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Pricing/Next Step */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-16 rounded-[48px] glass border-white/5 bg-[#05050a]">
                    <div>
                        <h2 className="text-4xl font-bold mb-4 uppercase">Join The Elite</h2>
                        <p className="text-secondary-foreground font-light uppercase tracking-widest">Pricing starts from $2,500 for initial credit bundles.</p>
                    </div>
                    <Magnetic strength={0.2}>
                        <Link href="https://wa.me/+447853402172" target="_blank" rel="noopener noreferrer" className="btn-primary !px-16 !py-6 !text-[13px] !tracking-[0.4em]">
                            CONTACT SALES
                        </Link>
                    </Magnetic>
                </div>
            </div>
        </div>
    );
}
