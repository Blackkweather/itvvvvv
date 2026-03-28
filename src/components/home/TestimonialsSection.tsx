'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCheck, User, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
    {
        name: 'Marcus D.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        time: '14:22',
        status: 'Delivered',
        text: "Yo, best streaming service I've ever used. The 4K quality is insane and zero buffering even during the UCL games. ⚽🔥",
        plan: 'Elite 12-Month',
    },
    {
        name: 'Sarah M.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        time: '09:45',
        status: 'Read',
        text: "Just set it up on my Fire Stick, took like 3 mins. The channel list is huge! Happy with the service so far. Thanks guys! 🙌",
        plan: 'Starter Node',
    },
    {
        name: 'Ahmed K.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        time: '21:10',
        status: 'Read',
        text: "Infinite Peak is the way to go. Most stable servers I've seen in Germany. No more cable for me! 🇩🇪💪",
        plan: 'Infinite Peak',
    },
    {
        name: 'Lucia R.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        time: '18:30',
        status: 'Delivered',
        text: "Family is loving the movie VOD section. Everything in 4K with subs. Ultimate value! 🍿✨",
        plan: 'Dual Sync',
    },
];

export function TestimonialsSection() {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-32 overflow-hidden bg-white/[0.01]">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.03),transparent_70%)]" />

            <div className="section-padding relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    {/* Left: Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                        >
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                Verified Node Feedback
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]"
                        >
                            Living Proof. <br />
                            <span className="gradient-text">Zero Compromise.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-secondary-foreground text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium"
                        >
                            We don&apos;t do fake reviews. Here is real coordinate feedback from our global node mesh. 50k+ active connections and counting.
                        </motion.p>

                        <div className="flex items-center justify-center lg:justify-start gap-8">
                            <div className="text-center lg:text-left">
                                <p className="text-3xl font-black text-foreground">99.9%</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Uptime Verified</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center lg:text-left">
                                <p className="text-3xl font-black text-foreground">4.95/5</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Client Satisfaction</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: WhatsApp Style Carousel */}
                    <div className="flex-1 w-full max-w-xl relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full -z-10 animate-breathe" />

                        <div className="relative rounded-[32px] border border-white/10 glass-strong p-6 overflow-hidden shadow-2xl">
                            {/* Chat Header */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center animate-pulse">
                                        <div className="h-8 w-8 rounded-full bg-primary/40 flex items-center justify-center">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-black text-foreground text-sm uppercase tracking-tight">Support Node #04</p>
                                        <p className="text-[10px] text-primary font-bold flex items-center gap-1 uppercase tracking-widest">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                                            Online & Provisioning
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {testimonials.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 transition-all duration-500 rounded-full ${activeIdx === i ? 'w-6 bg-primary' : 'w-1.5 bg-white/10'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Chat Messages Area */}
                            <div className="h-[300px] relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIdx}
                                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                                        transition={{ duration: 0.5, ease: "circOut" }}
                                        className="absolute inset-0 flex flex-col items-start gap-4"
                                    >
                                        {/* User Message Bubble */}
                                        <div className="max-w-[85%] rounded-2xl p-5 bg-white/5 border border-white/10 shadow-lg relative">
                                            <p className="text-sm font-black text-primary mb-2 uppercase tracking-tighter text-[10px]">{testimonials[activeIdx].name}</p>
                                            <p className="text-foreground font-medium leading-relaxed italic">
                                                &quot;{testimonials[activeIdx].text}&quot;
                                            </p>
                                            <div className="flex items-center justify-end gap-2 mt-4">
                                                <span className="text-[9px] text-muted-foreground font-bold">{testimonials[activeIdx].time}</span>
                                                <div className="flex -space-x-1">
                                                    <CheckCheck className={`h-3.5 w-3.5 ${testimonials[activeIdx].status === 'Read' ? 'text-primary' : 'text-muted-foreground'}`} />
                                                </div>
                                            </div>
                                            {/* Plan Badge */}
                                            <div className="absolute -top-3 -right-3 px-3 py-1 rounded-lg bg-primary text-black text-[9px] font-black uppercase tracking-widest shadow-xl">
                                                {testimonials[activeIdx].plan}
                                            </div>
                                        </div>

                                        {/* Support Response Bubble (Static) */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="max-w-[70%] ml-auto rounded-2xl p-4 bg-primary/10 border border-primary/20 shadow-lg"
                                        >
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Support Node</p>
                                            <p className="text-xs font-bold text-foreground opacity-80">
                                                Confirmed! Your node has been provisioned. 🚀
                                            </p>
                                            <div className="text-right mt-2">
                                                <span className="text-[8px] text-primary/60 font-black">SYSTEM RESPONSE</span>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Rating Footer */}
                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="h-4 w-4 text-primary fill-primary animate-pulse" style={{ animationDelay: `${s * 0.1}s` }} />
                                    ))}
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                    Global Satisfaction Rate 🔥
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
