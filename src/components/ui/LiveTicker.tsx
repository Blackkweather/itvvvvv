'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Radio, Calendar, Trophy } from 'lucide-react';

const liveEvents = [
    { event: 'FIFA World Cup 2026', date: 'June 2026', type: 'Soccer', icon: Trophy },
    { event: 'Premier League', date: 'Every Weekend', type: 'Soccer', icon: Calendar },
    { event: 'UEFA Champions League', date: 'Every Wednesday', type: 'Soccer', icon: Trophy },
    { event: 'NFL Season 2026', date: 'September 2026', type: 'Football', icon: Calendar },
    { event: 'NBA Finals 2026', date: 'June 2026', type: 'Basketball', icon: Trophy },
    { event: 'UFC Fight Night', date: 'Every Saturday', type: 'MMA', icon: Calendar },
];

export function LiveTicker() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset(prev => prev - 1);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Duplicate events for infinite scroll
    const events = [...liveEvents, ...liveEvents, ...liveEvents];

    return (
        <div className="relative overflow-hidden bg-black/50 border-y border-white/5 py-3">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/80 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/80 to-transparent z-10" />
            
            <div className="flex items-center">
                <div className="flex items-center gap-2 px-4 mr-4">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-red-500">Live</span>
                </div>
                
                <motion.div
                    className="flex items-center gap-8 whitespace-nowrap"
                    style={{ transform: `translateX(${offset}px)` }}
                >
                    {events.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <item.icon className="h-3 w-3 text-primary" />
                            <span className="font-medium">{item.event}</span>
                            <span className="text-white/30">•</span>
                            <span>{item.date}</span>
                            <span className="text-white/30">•</span>
                            <span className="text-primary">{item.type}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
