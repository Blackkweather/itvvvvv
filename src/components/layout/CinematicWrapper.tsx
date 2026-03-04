'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { IntroSequence } from "@/components/ui/IntroSequence";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import SupportFloat from "@/components/layout/SupportFloat";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export function CinematicWrapper({ children }: { children: React.ReactNode }) {
    const [introComplete, setIntroComplete] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    // Track scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <IntroSequence onComplete={() => setIntroComplete(true)} />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary z-[9999]"
                style={{ 
                    scaleX: scrollProgress / 100, 
                    transformOrigin: '0%',
                    transition: shouldReduceMotion ? 'none' : undefined
                }}
            />

            {/* Support Float - Always visible after initial load */}
            <SupportFloat />

            <div className="flex flex-col flex-1">
                <AnimatePresence mode="wait">
                    {introComplete && (
                        <motion.div
                            key="main-content"
                            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(20px)" }}
                            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ 
                                duration: shouldReduceMotion ? 0.3 : 1.5, 
                                ease: [0.22, 1, 0.36, 1] 
                            }}
                            className="flex flex-col flex-1"
                        >
                            <Navbar />
                            <main id="main-content" className="flex-grow">{children}</main>
                            <Footer />
                            <ScrollToTop />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
