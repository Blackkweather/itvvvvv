'use client';

import { motion } from 'framer-motion';

interface LogoProps {
    className?: string;
    showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative h-10 w-10 flex items-center justify-center group"
            >
                {/* Subtly glowing backglow */}
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white/5 rounded-lg blur-md"
                />

                {/* Minimalist 'Prism' SVG */}
                <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    className="h-7 w-7 text-white relative z-10"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M32 20L12 32V8L32 20Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        d="M12 20H25"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>

                {/* Advanced Light Leak / Glow */}
                <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {showText && (
                <span className="text-xl font-light tracking-[0.4em] uppercase text-white/90">
                    Stream<span className="font-bold">Pro</span>
                </span>
            )}
        </div>
    );
}
