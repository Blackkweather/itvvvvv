'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, ShieldCheck, Users, Monitor, Zap, Clock } from 'lucide-react';

export default function PricingPage() {
    const [devices, setDevices] = useState(1);

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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                    >
                        <Zap className="h-4 w-4 text-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80">
                            Custom Solutions Available
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.85] uppercase"
                    >
                        Get in <span className="gradient-text">Touch</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary-foreground max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
                    >
                        Contact our team for personalized streaming solutions.
                        We'll help you find the perfect plan for your needs.
                    </motion.p>

                    {/* Quick Contact Options */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="https://wa.me/YOURNUMBER"
                            className="flex items-center gap-3 bg-primary text-black px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
                        >
                            <MessageCircle className="h-5 w-5" />
                            Chat on WhatsApp
                        </a>
                        <a
                            href="https://t.me/YOURBOT"
                            className="flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 border border-white/10 transition-all duration-300"
                        >
                            <Send className="h-5 w-5" />
                            Telegram
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Why Contact Us */}
            <section className="section-padding pb-32">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <div className="text-center p-8 rounded-3xl glass border-white/5">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <MessageCircle className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Quick Response</h3>
                            <p className="text-secondary-foreground text-sm">
                                Get answers within 1 hour during business hours. Our team is here to help.
                            </p>
                        </div>

                        <div className="text-center p-8 rounded-3xl glass border-white/5">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Custom Solutions</h3>
                            <p className="text-secondary-foreground text-sm">
                                Tailored plans for your specific needs. Volume discounts available.
                            </p>
                        </div>

                        <div className="text-center p-8 rounded-3xl glass border-white/5">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <Clock className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">24/7 Support</h3>
                            <p className="text-secondary-foreground text-sm">
                                Round-the-clock technical assistance for all our clients.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Device Selector Info */}
            <section className="section-padding pb-32 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(60,131,246,0.05),transparent)]" />
                <div className="max-w-5xl mx-auto border-t border-white/10 pt-16 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">
                            Tell Us About Your Needs
                        </h2>
                        <p className="text-secondary-foreground max-w-xl mx-auto">
                            We offer solutions for various use cases. Contact us and we&apos;ll recommend the best option.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { icon: Monitor, label: 'Smart TV' },
                            { icon: Users, label: 'Multi-Room' },
                            { icon: Zap, label: 'High Traffic' },
                            { icon: ShieldCheck, label: 'Business' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3 px-6 py-4 rounded-2xl glass border border-white/10"
                            >
                                <item.icon className="h-5 w-5 text-primary" />
                                <span className="font-bold text-sm uppercase tracking-wide">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section-padding pb-32">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="p-12 rounded-[48px] bg-gradient-to-br from-primary/10 via-background to-accent/5 border border-white/5"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
                            Ready to Get Started?
                        </h2>
                        <p className="text-secondary-foreground mb-10 max-w-lg mx-auto">
                            Send us a message and we&apos;ll get back to you within the hour with a customized quote.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="https://wa.me/YOURNUMBER"
                                className="bg-primary text-black px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all"
                            >
                                Message on WhatsApp
                            </a>
                            <a
                                href="https://t.me/YOURBOT"
                                className="bg-white/10 text-white px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 border border-white/10 transition-all"
                            >
                                Message on Telegram
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
