'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface LoadingButtonProps {
    children: ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    className?: string;
    icon?: ReactNode;
}

export default function LoadingButton({
    children,
    isLoading = false,
    disabled = false,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    icon,
}: LoadingButtonProps) {
    const isPrimary = variant === 'primary';

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
            className={`
                relative inline-flex items-center justify-center gap-3 
                px-8 py-4 rounded-xl font-semibold text-sm uppercase tracking-widest
                transition-all duration-300 cursor-pointer overflow-hidden
                ${isPrimary 
                    ? 'bg-[#D4AF37] text-[#1e1b15] border-none' 
                    : 'bg-white/[0.02] text-white border border-white/10 backdrop-blur-xl'
                }
                ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
            style={{
                boxShadow: isPrimary ? '0 8px 30px rgba(212, 175, 55, 0.2)' : 'none',
            }}
        >
            {/* Loading spinner */}
            {isLoading && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                    <Loader2 className="h-4 w-4" />
                </motion.div>
            )}
            
            {/* Button content */}
            <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {icon}
                {children}
            </span>

            {/* Hover glow effect for primary */}
            {isPrimary && !disabled && !isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient-shift opacity-0"
                />
            )}
        </motion.button>
    );
}
