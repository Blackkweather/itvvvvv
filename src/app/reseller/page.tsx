'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layout, Zap, Globe, Package, Cpu, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Magnetic = dynamic(() => import('@/components/ui/Magnetic'), { ssr: false });

const CREDIT_PACKS = [
    { 
        credits: 120, 
        price: 280, 
        packName: 'Starter',
        savings: 'Best for starting out'
    },
    { 
        credits: 240, 
        price: 540, 
        packName: 'Pro',
        savings: 'Most popular'
    },
    { 
        credits: 360, 
        price: 720, 
        packName: 'Elite',
        savings: 'Best value'
    },
];

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
    },
    {
        title: "1 Week of Panel Training",
        desc: "Comprehensive training to master the reseller panel and maximize your business.",
        icon: GraduationCap
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

{/* Credit Packs */}
                <div className="mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-center"
                    >
                        Credit <span className="gradient-text-gold">Packs</span>
                    </motion.h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {CREDIT_PACKS.map((pack, i) => (
                            <motion.div
                                key={pack.credits}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative p-8 rounded-[32px] glass-card border-white/5 hover:border-primary/30 transition-all duration-500 group"
                            >
                                <div className="text-center">
                                    {/* Training Badge */}
                                    <div className="mb-4">
                                        <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                                            ✅ 1 Week Free Training
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm font-bold text-[#f0f0f0] uppercase tracking-widest mb-2">{pack.packName}</div>
                                    <div className="text-5xl font-black mb-2 text-[#f0f0f0]">{pack.credits}</div>
                                    <div className="text-sm uppercase tracking-widest text-[#a0a0a0] mb-6">Credits</div>
                                    <div className="text-4xl font-bold text-primary mb-2">${pack.price}</div>
                                    <div className="text-xs text-[#a0a0a0] uppercase tracking-wide mb-6">{pack.savings}</div>
                                    <a
                                        href={`https://wa.me/447853402172?text=Hi%2C%20I'm%20interested%20in%20the%20${pack.packName}%20Reseller%20Pack%20(${pack.credits}%20Credits%20-%20%24${pack.price})`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 rounded-xl bg-primary text-black font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors inline-flex justify-center"
                                    >
                                        Select Pack
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Training Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center max-w-2xl mx-auto"
                    >
                        <p className="text-[#a0a0a0] font-light leading-relaxed">
                            Every reseller gets a full week of hands-on training to master the panel and credit system — so you can start selling confidently from day one.
                        </p>
                    </motion.div>
                </div>

                {/* Pricing/Next Step */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-16 rounded-[48px] glass border-white/5 bg-[#05050a]">
                    <div>
                        <h2 className="text-4xl font-bold mb-4 uppercase">Join The Elite</h2>
                        <p className="text-secondary-foreground font-light uppercase tracking-widest">Custom packages available. Contact sales for bulk orders.</p>
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
