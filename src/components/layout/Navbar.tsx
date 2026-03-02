'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const navLinks = [
    { label: 'Browse', href: '#browse' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-700">
            {/* Ultra-thin top accent line */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="glass-strong">
                <div className="section-padding-wide flex h-16 md:h-[72px] items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group">
                        <Logo />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[13px] font-light tracking-[0.1em] uppercase text-secondary-foreground hover:text-primary transition-all duration-500 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700" />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link 
                            href="/pricing" 
                            className="text-[13px] font-light tracking-widest text-secondary-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
                        >
                            LOGIN
                        </Link>
                        <Link 
                            href="/pricing" 
                            className="btn-primary !py-2.5 !px-7 !text-[11px] !rounded-lg hover:scale-105 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            GET STARTED
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-foreground p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-strong border-t border-white/[0.06] overflow-hidden"
                    >
                        <nav className="flex flex-col gap-1 p-4">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-sm font-medium text-secondary-foreground hover:text-foreground px-4 py-3 rounded-lg hover:bg-white/[0.04] transition-all block"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                className="pt-4 border-t border-white/[0.06] mt-2 flex flex-col gap-3"
                            >
                                <Link 
                                    href="/pricing" 
                                    onClick={() => setMobileOpen(false)}
                                    className="btn-primary text-center"
                                >
                                    Get Started
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
