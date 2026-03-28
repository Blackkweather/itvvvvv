'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/ui/Logo';

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Shorter duration on mobile for better UX
        const duration = isMobile ? 1200 : 1500;
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, shouldReduceMotion ? 200 : 400); // Faster fade out
        }, shouldReduceMotion ? 300 : duration);
        return () => clearTimeout(timer);
    }, [onComplete, isMobile, shouldReduceMotion]);

    // Simplified animation for mobile/reduced motion
    const logoVariants = {
        hidden: shouldReduceMotion 
            ? { opacity: 0 } 
            : isMobile 
                ? { opacity: 0, scale: 0.8, filter: "blur(20px)" }
                : { x: "-100vw", opacity: 0, rotate: -15, filter: "blur(40px)" },
        visible: shouldReduceMotion
            ? { opacity: 1 }
            : isMobile
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { x: 0, opacity: 1, rotate: 0, filter: "blur(0px)" },
    };

    const sweepVariants = {
        hidden: { x: "-100%", opacity: 0 },
        visible: shouldReduceMotion 
            ? { x: "-100%", opacity: 0 }
            : { x: "200%", opacity: [0, 1, 0] },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        backgroundColor: "rgba(0,0,0,0)",
                        transition: { 
                            duration: shouldReduceMotion ? 0.2 : 0.4, 
                            ease: [0.22, 1, 0.36, 1] 
                        }
                    }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black"
                >
                    <div className="relative px-4">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={logoVariants}
                            transition={{ 
                                duration: shouldReduceMotion ? 0.2 : (isMobile ? 0.8 : 1.2), 
                                ease: [0.22, 1, 0.36, 1] 
                            }}
                        >
                            <Logo
                                className={isMobile ? "scale-100" : "scale-[2]"}
                                showText={true}
                            />
                        </motion.div>

                        {/* Dramatic sweeping light effect - disabled on mobile/reduced motion */}
                        {!isMobile && !shouldReduceMotion && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={sweepVariants}
                                transition={{ 
                                    duration: 2.2, 
                                    delay: 0.8, 
                                    ease: "easeInOut" 
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
