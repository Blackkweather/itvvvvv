'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Monitor, Smartphone, Tablet, Tv, Gamepad2, Wifi } from 'lucide-react';

const devices = [
    { icon: Tv, name: 'Smart TV', description: 'Samsung, LG, Sony, Android TV', href: '/iptv-smart-tv' },
    { icon: Smartphone, name: 'Mobile', description: 'iOS & Android apps', href: '/iptv-iphone' },
    { icon: Tablet, name: 'Tablet', description: 'iPad & Android tablets', href: '/iptv-android' },
    { icon: Monitor, name: 'Computer', description: 'Windows, macOS, Linux', href: '/pricing' },
    { icon: Gamepad2, name: 'Set-Top Box', description: 'MAG, Formuler, Buzz TV', href: '/iptv-mag-box' },
    { icon: Wifi, name: 'Fire Stick', description: 'Amazon Fire TV & Roku', href: '/iptv-firestick' },
];

export function DevicesSection() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section 
            id="devices" 
            className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden bg-white/[0.01]"
            aria-label="Supported devices"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.03),transparent_50%)]" />

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
                        <Wifi className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80">
                            Universal Sync Protocol
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 sm:mb-6 md:mb-8 leading-[0.9] sm:leading-[0.85] uppercase"
                    >
                        The <span className="gradient-text">Sync</span> <br className="hidden sm:block" />
                        Mesh.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-secondary-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-medium px-4 sm:px-0"
                    >
                        Initialize your inheritance across any terminal. Our proprietary protocol
                        ensures absolute parity across your entire digital ecosystem.
                    </motion.p>
                </div>

                {/* Devices Grid - Responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    {devices.map((device, i) => (
                        <Link key={device.name} href={device.href}>
                            <motion.div
                                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    duration: shouldReduceMotion ? 0.2 : 0.5, 
                                    delay: i * 0.05,
                                    ease: [0.22, 1, 0.36, 1] as const
                                }}
                                whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative flex flex-col items-center p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl glass border-white/[0.05] hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer"
                            >
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-white/[0.04] mb-3 sm:mb-4 group-hover:bg-primary/20 transition-all duration-500">
                                        <device.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-secondary-foreground group-hover:text-primary transition-all duration-500" />
                                    </div>
                                    <h3 className="font-black text-[10px] sm:text-xs md:text-sm text-foreground mb-1 uppercase tracking-tighter text-center">{device.name}</h3>
                                    <p className="text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center leading-tight">{device.description}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Connection count badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-center mt-10 sm:mt-12 md:mt-16"
                >
                    <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl glass-strong border-primary/20 shadow-[0_0_30px_rgba(0,212,255,0.1)]">
                        <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary animate-ping" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground">
                            Spectral Limit: <span className="text-primary">4 Simultaneous Terminals</span>
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
