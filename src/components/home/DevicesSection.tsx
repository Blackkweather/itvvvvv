'use client';

import { motion } from 'framer-motion';
import { Monitor, Smartphone, Tablet, Tv, Gamepad2, Wifi } from 'lucide-react';

const devices = [
    { icon: Tv, name: 'Smart TV', description: 'Samsung, LG, Sony, Android TV' },
    { icon: Smartphone, name: 'Mobile', description: 'iOS & Android apps' },
    { icon: Tablet, name: 'Tablet', description: 'iPad & Android tablets' },
    { icon: Monitor, name: 'Computer', description: 'Windows, macOS, Linux' },
    { icon: Gamepad2, name: 'Set-Top Box', description: 'MAG, Formuler, Buzz TV' },
    { icon: Wifi, name: 'Fire Stick', description: 'Amazon Fire TV & Roku' },
];

export function DevicesSection() {
    return (
        <section id="devices" className="relative py-32 overflow-hidden bg-white/[0.01]">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.03),transparent_50%)]" />

            <div className="section-padding relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                    >
                        <Wifi className="h-4 w-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80">
                            Universal Sync Protocol
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase"
                    >
                        The <span className="gradient-text">Sync</span> <br />
                        Mesh.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-secondary-foreground text-xl max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        Initialize your inheritance across any terminal. Our proprietary protocol
                        ensures absolute parity across your entire digital ecosystem.
                    </motion.p>
                </div>

                {/* Devices Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {devices.map((device, i) => (
                        <motion.div
                            key={device.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="group relative flex flex-col items-center p-8 rounded-[24px] glass border-white/[0.05] hover:border-primary/40 transition-all duration-500 overflow-hidden"
                        >
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.04] mb-4 group-hover:bg-primary/20 group-hover:glow-cyan transition-all duration-500">
                                    <device.icon className="h-8 w-8 text-secondary-foreground group-hover:text-primary transition-all duration-500" />
                                </div>
                                <h3 className="font-black text-xs text-foreground mb-1 uppercase tracking-tighter">{device.name}</h3>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center">{device.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Connection count badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glass-strong border-primary/20 shadow-[0_0_40px_rgba(0,212,255,0.1)]">
                        <div className="h-3 w-3 rounded-full bg-primary animate-ping" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
                            Spectral Limit: <span className="text-primary">4 Simultaneous Terminals</span>
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
