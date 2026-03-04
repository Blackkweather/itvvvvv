'use client';

import React, { useCallback, useRef } from 'react';

// Sound effect URLs (using reliable CDN sources)
const SOUND_URLS = {
    hover: 'https://cdn.freesound.org/previews/528/528813_1738287-lq.mp3',
    click: 'https://cdn.freesound.org/previews/528/528813_1738287-lq.mp3',
    success: 'https://cdn.freesound.org/previews/528/528813_1738287-lq.mp3',
    notification: 'https://cdn.freesound.org/previews/528/528813_1738287-lq.mp3',
};

type SoundType = keyof typeof SOUND_URLS;

export function useSound() {
    const audioRefs = useRef<Record<SoundType, HTMLAudioElement>>({} as Record<SoundType, HTMLAudioElement>);

    const playSound = useCallback((type: SoundType) => {
        // Skip if audio not available or user prefers reduced motion
        if (typeof window === 'undefined') return;
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        try {
            // Create audio if not exists
            if (!audioRefs.current[type]) {
                audioRefs.current[type] = new Audio(SOUND_URLS[type]);
            }
            
            const audio = audioRefs.current[type];
            audio.currentTime = 0;
            audio.volume = 0.3;
            
            // Play with catch for autoplay restrictions
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Silently fail if audio can't play (common with autoplay policies)
                });
            }
        } catch (error) {
            // Silently fail for any audio errors
        }
    }, []);

    const preloadSounds = useCallback(() => {
        Object.values(SOUND_URLS).forEach(url => {
            const audio = new Audio(url);
            audio.preload = 'auto';
        });
    }, []);

    return { playSound, preloadSounds };
}

// Component that wraps children with sound effects on hover
export function SoundWrapper({ 
    children, 
    onHover = true,
    onClick = false,
    soundType = 'hover' 
}: { 
    children: React.ReactNode;
    onHover?: boolean;
    onClick?: boolean;
    soundType?: SoundType;
}) {
    const { playSound } = useSound();

    return (
        <div 
            onMouseEnter={() => onHover && playSound(soundType)}
            onClick={() => onClick && playSound(soundType)}
        >
            {children}
        </div>
    );
}
