'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Play, Zap, BookOpen } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const navLinks = [
    { label: 'Browse', href: '#browse', icon: Play },
    { label: 'Features', href: '#features', icon: Zap },
    { label: 'Pricing', href: '/pricing', icon: Zap },
    { label: 'Blog', href: '/blog', icon: BookOpen },
];

const bottomNavItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Browse', href: '#browse', icon: Play },
    { label: 'Pricing', href: '/pricing', icon: Zap },
    { label: 'Blog', href: '/blog', icon: BookOpen },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileOpen(false);
            }
        };

        if (mobileOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    // Track active section for bottom nav
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
        );

        const sections = ['browse', 'features', 'devices', 'faq'];
        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleNavClick = useCallback(() => {
        setMobileOpen(false);
    }, []);

    return (
        <>
            <header 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled ? 'bg-background/80 backdrop-blur-xl' : ''
                }`}
            >
                {/* Ultra-thin top accent line */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <nav className="glass-strong">
                    <div className="section-padding-wide flex h-14 sm:h-16 lg:h-[72px] items-center justify-between">
                        {/* Logo */}
                        <Link 
                            href="/" 
                            className="group relative z-10"
                            aria-label="StreamPro Home"
                        >
                            <Logo />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav 
                            className="hidden lg:flex items-center gap-8 xl:gap-10"
                            role="navigation"
                            aria-label="Main navigation"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative text-[13px] font-light tracking-[0.1em] uppercase text-secondary-foreground hover:text-primary transition-all duration-500 group py-2"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-6">
                            <Link 
                                href="/pricing" 
                                className="btn-primary !py-2.5 !px-6 !text-[11px] !rounded-lg hover:scale-105 active:scale-95 transition-transform"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile Menu Button - Touch optimized */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden relative z-50 text-foreground p-3 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                        >
                            <AnimatePresence mode="wait">
                                {mobileOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu - Sheet Style */}
                <AnimatePresence>
                    {mobileOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                                onClick={() => setMobileOpen(false)}
                                aria-hidden="true"
                            />

                            {/* Menu Content */}
                            <motion.div
                                id="mobile-menu"
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="fixed top-16 sm:top-20 left-4 right-4 bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/10 rounded-2xl z-50 lg:hidden shadow-2xl"
                            >
                                <nav 
                                    className="flex flex-col p-4"
                                    role="navigation"
                                    aria-label="Mobile navigation"
                                >
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 + 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={handleNavClick}
                                                className="flex items-center gap-4 text-base font-medium text-secondary-foreground hover:text-foreground px-4 py-4 rounded-xl hover:bg-white/[0.04] transition-all min-h-[48px]"
                                            >
                                                <link.icon className="h-5 w-5 text-primary/60" />
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                    
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                                        className="pt-4 mt-2 border-t border-white/[0.06]"
                                    >
                                        <Link 
                                            href="/pricing" 
                                            onClick={handleNavClick}
                                            className="btn-primary w-full text-center justify-center"
                                        >
                                            Get Started
                                        </Link>
                                    </motion.div>
                                </nav>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </header>

            {/* Mobile Bottom Navigation */}
            <nav 
                className="mobile-bottom-nav lg:hidden"
                role="navigation"
                aria-label="Bottom navigation"
            >
                {bottomNavItems.map((item) => {
                    const isActive = item.href === '/' 
                        ? activeSection === '' 
                        : item.href.startsWith('#') 
                            ? activeSection === item.href.slice(1)
                            : false;
                    
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`mobile-bottom-nav-item ${isActive ? 'active' : ''}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <item.icon className="h-6 w-6" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Spacer for bottom nav on mobile */}
            <div className="h-16 lg:hidden" aria-hidden="true" />
        </>
    );
}
