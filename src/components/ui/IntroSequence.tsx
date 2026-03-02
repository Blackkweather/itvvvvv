'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/ui/Logo';

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 1000); // Wait for fade out
        }, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        backgroundColor: "rgba(0,0,0,0)",
                        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
                    }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black"
                >
                    <div className="relative">
                        <motion.div
                            initial={{ x: "-100vw", opacity: 0, rotate: -15, filter: "blur(40px)" }}
                            animate={{ x: 0, opacity: 1, rotate: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Logo className="scale-[2]" showText={true} />
                        </motion.div>

                        {/* Dramatic sweeping light effect */}
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: "200%", opacity: [0, 1, 0] }}
                            transition={{ duration: 2.2, delay: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
