'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, CreditCard, Apple, Bitcoin, Users, Monitor, Shield } from 'lucide-react';
import PricingCard from '@/components/pricing/PricingCard';
import ComparisonTable from '@/components/pricing/ComparisonTable';

type PricingTier = {
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

const pricingData: Record<number, PricingTier[]> = {
    1: [
        {
            name: '1 Month Starter',
            price: '15.00',
            period: '/month',
            description: 'Instant elite access for a single mission-critical node.',
            popular: false,
            features: ['1 Device Connection', '35,000+ Live Channels', '4K / Ultra HD Quality', 'Anti-Buffering CDN', 'VOD Movies & Series', '24/7 Global Support'],
        },
        {
            name: '3 Months Elite',
            price: '35.00',
            period: '/3 months',
            pricePerMonth: '11.66',
            description: 'Quarterly supremacy. The standard for dedicated power users.',
            popular: true,
            badge: 'SAVE $15',
            features: ['1 Device Connection', 'Exclusive 8K Streams', 'Full PPV Events Access', 'Anti-Freeze Tech 2.0', 'Priority Traffic Routing', 'EPG & Catch-up TV'],
        },
        {
            name: '12 Months Peak',
            price: '75.00',
            period: '/year',
            pricePerMonth: '6.25',
            description: 'Annual dominance. Maximum savings for the absolute peak.',
            popular: false,
            anchor: true,
            badge: 'SAVE $95',
            features: ['1 Device Connection', 'All Premium Features', 'Early Beta access', 'Adult Channels (Optional)', 'VIP Support Priority', 'Infinite Bandwidth'],
        }
    ],
    2: [
        {
            name: '1 Month Dual',
            price: '25.00',
            period: '/month',
            description: 'Seamless synchronization across two active nodes.',
            popular: false,
            features: ['2 Device Connections', '35,000+ Live Channels', '4K / Ultra HD Quality', 'Anti-Buffering CDN', 'VOD Movies & Series', '24/7 Global Support'],
        },
        {
            name: '3 Months Dual',
            price: '60.00',
            period: '/3 months',
            pricePerMonth: '20.00',
            description: 'The preferred choice for multi-room digital households.',
            popular: true,
            badge: 'SAVE $15',
            features: ['2 Device Connections', 'Exclusive 8K Streams', 'Full PPV Events Access', 'Anti-Freeze Tech 2.0', 'Multi-Screen Support', 'EPG & Catch-up TV'],
        },
        {
            name: '12 Months Dual',
            price: '125.00',
            period: '/year',
            pricePerMonth: '10.41',
            description: 'Double node capacity with extreme annual value.',
            popular: false,
            anchor: true,
            badge: 'SAVE $95',
            features: ['2 Device Connections', 'All Premium Features', 'Early Beta access', 'Adult Channels (Optional)', 'VIP Support Priority', 'Infinite Bandwidth'],
        }
    ],
    3: [
        {
            name: '1 Month Triad',
            price: '35.00',
            period: '/month',
            description: 'Maximum device density for a complete network mesh.',
            popular: false,
            features: ['3 Device Connections', '35,000+ Live Channels', '4K / Ultra HD Quality', 'Anti-Buffering CDN', 'VOD Movies & Series', '24/7 Global Support'],
        },
        {
            name: '3 Months Triad',
            price: '85.00',
            period: '/3 months',
            pricePerMonth: '28.33',
            description: 'High-traffic stability for demanding environments.',
            popular: true,
            badge: 'SAVE $15',
            features: ['3 Device Connections', 'Exclusive 8K Streams', 'Full PPV Events Access', 'Anti-Freeze Tech 2.0', 'Dedicated Routing Node', 'EPG & Catch-up TV'],
        },
        {
            name: '12 Months Triad',
            price: '175.00',
            period: '/year',
            pricePerMonth: '14.58',
            description: 'The industrial-grade standard for maximum household density.',
            popular: false,
            anchor: true,
            badge: 'SAVE $95',
            features: ['3 Device Connections', 'All Premium Features', 'Early Beta access', 'Adult Channels (Optional)', 'VIP Support Priority', 'Infinite Bandwidth'],
        }
    ]
};


export default function PricingPage() {
    const [devices, setDevices] = useState(1);
    const [recentPurchase, setRecentPurchase] = useState<{ name: string; location: string } | null>(null);

    // Social Proof Simulation
    useEffect(() => {
        const purchases = [
            { name: "Marco", location: "Italy" },
            { name: "John", location: "UK" },
            { name: "Sarah", location: "USA" },
            { name: "Ahmed", location: "UAE" },
            { name: "Yuki", location: "Japan" }
        ];

        const interval = setInterval(() => {
            const random = purchases[Math.floor(Math.random() * purchases.length)];
            setRecentPurchase(random);
            setTimeout(() => setRecentPurchase(null), 5000);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-background selection:bg-primary/30">
            {/* Header / Hero */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0 text-primary/5">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/20 to-transparent blur-[120px] opacity-40" />
                    <div className="absolute inset-0 bg-grid opacity-20" />
                </div>

                <div className="section-padding relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-2xl"
                    >
                        <Zap className="h-4 w-4 text-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80">
                            Verified Pricing Protocol Active
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-9xl font-black tracking-tighter mb-6 leading-[0.85] uppercase"
                    >
                        Claim the <span className="gradient-text">Elite.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary-foreground max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
                    >
                        Synced with global benchmarks. Optimized for human perception.
                        Initialize your digital inheritance across your device mesh.
                    </motion.p>

                    {/* Controls Row */}
                    <div className="mt-16 flex flex-col items-center gap-10">
                        {/* Device Selector */}
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mr-1">Select Active Node Density</span>
                            <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                {[1, 2, 3].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setDevices(num)}
                                        className={`px-8 py-3 rounded-xl text-sm font-black transition-all duration-300 flex items-center gap-3 ${devices === num
                                            ? 'bg-primary text-white shadow-[0_5px_15px_rgba(60,131,246,0.3)]'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                            }`}
                                    >
                                        <Monitor className={`h-4 w-4 ${devices === num ? 'animate-pulse' : ''}`} />
                                        {num} {num === 1 ? 'Device' : 'Devices'}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Plans Grid */}
            <section className="section-padding pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center">
                        <motion.div
                            key={`tier-${devices}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-10"
                        >
                            {pricingData[devices].map((plan, i) => (
                                <PricingCard key={plan.name} plan={plan} index={i} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Comparison Table for SEO */}
                    <div className="mt-40">
                        <ComparisonTable />
                    </div>
                </div>
            </section>

            {/* Trust & Logistics */}
            <section className="section-padding pb-32 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(60,131,246,0.05),transparent)]" />
                <div className="max-w-5xl mx-auto border-t border-white/10 pt-24 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                        <div className="flex-1">
                            <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Industrial Logistics</h3>
                            <p className="text-secondary-foreground mb-10 text-lg leading-relaxed font-medium">
                                Our global content delivery network utilizes tiered load balancing and anti-freeze 2.0
                                to ensure zero latency. Your access is provisioned via instant digital handshake upon verification.
                            </p>
                            <div className="flex flex-wrap gap-5">
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                                    <ShieldCheck className="h-4 w-4 text-success" />
                                    MIL-SPEC Encryption
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                                    <Users className="h-4 w-4 text-primary" />
                                    50,000+ Verified Nodes
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-2 gap-5">
                            {[Bitcoin, CreditCard, Apple].map((Icon, i) => (
                                <div key={i} className="h-20 w-32 rounded-3xl border border-white/10 glass flex items-center justify-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 shadow-xl hover:-translate-y-2">
                                    <Icon className="h-8 w-8" />
                                </div>
                            ))}
                            <div className="h-20 w-32 rounded-3xl border border-white/10 glass flex items-center justify-center font-black text-[10px] opacity-40 tracking-widest shadow-xl hover:-translate-y-2 hover:opacity-100 transition-all duration-500">WISE</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Notification */}
            <AnimatePresence>
                {recentPurchase && (
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.8 }}
                        className="fixed bottom-10 left-10 z-50 p-5 rounded-3xl glass border border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex items-center gap-5 max-w-sm backdrop-blur-2xl"
                    >
                        <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 shadow-inner">
                            <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Node Provisioned</p>
                            <p className="text-xs font-bold leading-relaxed">
                                <span className="text-foreground">{recentPurchase.name}</span> from <span className="text-muted-foreground">{recentPurchase.location}</span> just initialized an Elite Protocol access.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
