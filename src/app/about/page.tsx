'use client';

import { motion } from 'framer-motion';
import { Users, Zap, Shield, Globe, Headphones, Award } from 'lucide-react';

const stats = [
    { value: '15,000+', label: 'Live Channels' },
    { value: '50,000+', label: 'VOD Titles' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
];

const teamValues = [
    {
        icon: Zap,
        title: 'Innovation',
        desc: 'We continuously evolve our streaming technology to deliver the best viewing experience.'
    },
    {
        icon: Shield,
        title: 'Reliability',
        desc: 'Our redundant server infrastructure ensures you never miss your favorite content.'
    },
    {
        icon: Users,
        title: 'Customer First',
        desc: 'Every decision we make is guided by what benefits our subscribers most.'
    },
    {
        icon: Globe,
        title: 'Global Reach',
        desc: 'Serving viewers in 150+ countries with localized content and support.'
    },
    {
        icon: Headphones,
        title: 'Expert Support',
        desc: 'Our team of streaming experts is available around the clock to help you.'
    },
    {
        icon: Award,
        title: 'Quality',
        desc: 'We partner only with the best content providers to ensure HD/4K quality.'
    },
];

const timeline = [
    { year: '2024', event: 'StreamPro founded with a vision to revolutionize IPTV' },
    { year: '2025', event: 'Expanded to 10,000+ channels and 40,000+ VOD titles' },
    { year: '2026', event: 'Launched anti-freeze technology for buffer-free streaming' },
    { year: '2026', event: 'Reached 500,000+ active subscribers worldwide' },
];

export default function AboutPage() {
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
                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">About Us</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight uppercase tracking-tighter"
                    >
                        Redefining <span className="gradient-text-gold">Streaming</span><br /> Excellence
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-secondary-foreground max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        StreamPro is the leading premium IPTV service, delivering unparalleled entertainment to viewers worldwide since 2024.
                    </motion.p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center p-8 rounded-[32px] glass border-white/5"
                        >
                            <div className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</div>
                            <div className="text-sm text-secondary-foreground uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-16 rounded-[48px] bg-gradient-to-br from-primary/10 via-background to-accent/5 border border-white/5 mb-32"
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Our Mission</h2>
                        <p className="text-secondary-foreground text-lg leading-relaxed">
                            To make premium entertainment accessible to everyone, everywhere. We believe in cutting the cord without cutting the quality — delivering cinema-grade streaming directly to your device at a fraction of traditional cable costs.
                        </p>
                    </div>
                </motion.div>

                {/* Values */}
                <div className="mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-center mb-16 uppercase"
                    >
                        What Drives Us
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamValues.map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[32px] glass border-white/5 hover:border-primary/20 transition-all duration-500 group"
                            >
                                <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-700">
                                    <value.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">{value.title}</h3>
                                <p className="text-secondary-foreground font-light leading-relaxed text-sm">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-center mb-16 uppercase"
                    >
                        Our Journey
                    </motion.h2>

                    <div className="max-w-2xl mx-auto">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={`${item.year}-${i}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-6 pb-8 border-l-2 border-primary/20 pl-8 last:border-0"
                            >
                                <div className="flex-shrink-0 w-20 text-primary font-black uppercase tracking-wider">{item.year}</div>
                                <div className="text-secondary-foreground pt-1">{item.event}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Join the StreamPro Family</h2>
                    <p className="text-secondary-foreground mb-10 max-w-xl mx-auto">
                        Experience the future of streaming. Start your free trial today and see why hundreds of thousands choose StreamPro.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/pricing"
                            className="bg-primary text-black px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all"
                        >
                            View Plans
                        </a>
                        <a
                            href="https://wa.me/YOURNUMBER"
                            className="bg-white/10 text-white px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 border border-white/10 transition-all"
                        >
                            Contact Us
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
