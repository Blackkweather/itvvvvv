'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
    className?: string;
    variant?: 'circular' | 'rectangular' | 'rounded';
    width?: string | number;
    height?: string | number;
}

export default function Skeleton({
    className = '',
    variant = 'rounded',
    width,
    height,
}: SkeletonProps) {
    const variantClasses = {
        circular: 'rounded-full',
        rectangular: 'rounded-none',
        rounded: 'rounded-lg',
    };

    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`bg-white/5 ${variantClasses[variant]} ${className}`}
            style={{ width, height }}
        />
    );
}

// Preset skeleton components for common use cases
export function PosterSkeleton() {
    return (
        <div className="w-[160px] md:w-[220px] aspect-[2/3]">
            <Skeleton className="w-full h-full" />
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="rounded-2xl p-6 glass">
            <div className="flex items-center gap-4 mb-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-1">
                    <Skeleton width="60%" height={16} className="mb-2" />
                    <Skeleton width="40%" height={12} />
                </div>
            </div>
            <Skeleton width="100%" height={60} className="mb-3" />
            <div className="flex gap-2">
                <Skeleton width={60} height={24} className="rounded-full" />
                <Skeleton width={60} height={24} className="rounded-full" />
            </div>
        </div>
    );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    width={i === lines - 1 ? '60%' : '100%'}
                    height={14}
                    className="last:w-[60%]"
                />
            ))}
        </div>
    );
}
