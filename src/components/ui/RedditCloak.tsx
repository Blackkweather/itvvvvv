'use client';

import { useState, useEffect, useRef } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { detectBot, generateHoneypotLink, trackHoneypotInteraction, type BotDetectionResult } from '@/lib/bot-detection';

interface StealthCloakProps {
    children: React.ReactNode;
}

export function StealthCloak({ children }: StealthCloakProps) {
    // Use lazy initializer to avoid setting state in useEffect
    const [detection, setDetection] = useState<BotDetectionResult | null>(() => {
        // Initialize synchronously during SSR/client hydration
        if (typeof window !== 'undefined') {
            return detectBot(navigator.userAgent);
        }
        return null;
    });
    const [showCloaked, setShowCloaked] = useState(false);
    const [honeypotClicked, setHoneypotClicked] = useState(false);
    const [mouseMovements, setMouseMovements] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const honeypotRef = useRef<HTMLAnchorElement>(null);

    // Track human-like behavior and update cloak status
    useEffect(() => {
        // Skip if no detection yet
        if (!detection) return;

        // Check if should show cloaked content based on initial detection
        if (!showCloaked && (detection.shouldCloak || detection.isReviewer)) {
            setShowCloaked(true);
        }

        // Track human-like behavior
        const handleMouseMove = () => {
            setMouseMovements(prev => prev + 1);
        };

        const handleClick = () => {
            setClickCount(prev => prev + 1);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        // Check if user has proven they're human (enough mouse movements and clicks)
        const humanProofTimer = setTimeout(() => {
            if (mouseMovements > 10 && clickCount > 2) {
                // User has demonstrated human behavior
                if (detection.isReviewer) {
                    // Still show cloaked to reviewers
                    setShowCloaked(true);
                } else {
                    // Show full content to proven humans
                    setShowCloaked(false);
                }
            }
        }, 3000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            clearTimeout(humanProofTimer);
        };
    }, [detection, mouseMovements, clickCount, showCloaked]);

    // Handle honeypot click
    const handleHoneypotClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setHoneypotClicked(true);
        
        // Track the bot
        const ip = 'client-side'; // In production, get from server
        trackHoneypotInteraction(ip);
        
        // Show warning
        alert('Bot detected. Your IP has been logged.');
    };

    // If no detection yet, show loading
    if (!detection) {
        return <>{children}</>;
    }

    // If bot should be blocked, show nothing
    if (detection.shouldBlock) {
        return null;
    }

    // Show cloaked version if bot detected or not proven human yet
    if (showCloaked) {
        return (
            <div className="relative">
                {/* Cloaked content - limited preview */}
                <div className="blur-md select-none pointer-events-none opacity-50">
                    {children}
                </div>
                
                {/* Overlay message */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/80 backdrop-blur-sm p-6 rounded-xl text-center max-w-md">
                        <Shield className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                        <h3 className="text-lg font-bold text-white mb-2">
                            Limited Preview
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            This content is limited. Move your mouse and click around to unlock full access.
                        </p>
                        
                        {/* Honeypot link - invisible to humans, traps bots */}
                        <a
                            ref={honeypotRef}
                            href={generateHoneypotLink()}
                            onClick={handleHoneypotClick}
                            className="hidden"
                            aria-hidden="true"
                        >
                            Click here
                        </a>
                        
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Bot activity monitored</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show full content
    return <>{children}</>;
}
