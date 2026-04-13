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
                whileHover={{ scale: 1.05 }}
                className="relative h-10 w-10 flex items-center justify-center group"
            >
                {/* Subtle glow */}
                <motion.div
                    animate={{
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-primary/20 rounded-lg blur-md"
                />

                {/* Modern Play Button / Signal Mark */}
                <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    className="h-8 w-8 text-primary relative z-10"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Outer ring */}
                    <circle
                        cx="20"
                        cy="20"
                        r="16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="opacity-40"
                    />
                    {/* Play triangle */}
                    <path
                        d="M17 14L26 20L17 26V14Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinejoin="round"
                    />
                    {/* Signal waves */}
                    <path
                        d="M30 14C31.5 15.5 32 18 32 20C32 22 31.5 24.5 30 26"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                        className="opacity-60"
                    />
                    <path
                        d="M34 10C36 12 37 16 37 20C37 24 36 28 34 30"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        fill="none"
                        className="opacity-30"
                    />
                </svg>
            </motion.div>

            {showText && (
                <span className="text-xl font-light tracking-[0.4em] uppercase text-[#f0f0f0]">
                    Stream<span className="font-bold text-primary">Pro</span>
                </span>
            )}
        </div>
    );
}


