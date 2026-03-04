'use client';

import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { Play, Info, ChevronRight, Star, Zap, Globe, Smartphone, Film, Tv } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Local movie posters from geniustv-v2 repo
const contentRows = [
    {
        title: "Trending Movies 2026",
        posters: [
            { id: 1, img: "/images/posters/House-of-dragon.png", title: "House of the Dragon", quality: "4K HDR" },
            { id: 2, img: "/images/posters/Squid-game.png", title: "Squid Game", quality: "4K" },
            { id: 3, img: "/images/posters/The-witcher.png", title: "The Witcher", quality: "4K" },
            { id: 4, img: "/images/posters/Champions-league.png", title: "Champions League", quality: "Live 4K" },
            { id: 5, img: "/images/posters/premier-league.png", title: "Premier League", quality: "Live" },
            { id: 6, img: "/images/posters/NFL.png", title: "NFL", quality: "Live 4K" },
            { id: 7, img: "/images/posters/UFC.png", title: "UFC", quality: "Live" },
            { id: 8, img: "/images/posters/Netflix.png", title: "Netflix Originals", quality: "4K" },
        ]
    },
    {
        title: "Popular TV Series",
        posters: [
            { id: 9, img: "/images/posters/House-of-dragon.png", title: "House of the Dragon", quality: "4K" },
            { id: 10, img: "/images/posters/Squid-game.png", title: "Squid Game S2", quality: "4K" },
            { id: 11, img: "/images/posters/The-witcher.png", title: "The Witcher", quality: "4K" },
            { id: 12, img: "/images/posters/Carry-on.png", title: "Carry-On", quality: "4K" },
            { id: 13, img: "/images/posters/Messi-Lamin-yamal.png", title: "Messi", quality: "4K" },
            { id: 14, img: "/images/posters/Jordan.png", title: "Jordan", quality: "HD" },
            { id: 15, img: "/images/posters/James-Lebron.png", title: "LeBron James", quality: "4K" },
            { id: 16, img: "/images/posters/Champions-league.png", title: "Champions League", quality: "Live" },
        ]
    },
    {
        title: "Live Sports",
        posters: [
            { id: 17, img: "/images/posters/premier-league.png", title: "Premier League", quality: "Live 4K" },
            { id: 18, img: "/images/posters/Champions-league.png", title: "Champions League", quality: "Live" },
            { id: 19, img: "/images/posters/NFL.png", title: "NFL Football", quality: "Live 4K" },
            { id: 20, img: "/images/posters/UFC.png", title: "UFC Fight Night", quality: "Live HD" },
            { id: 21, img: "/images/posters/Champions-league.png", title: "UEFA", quality: "Live" },
            { id: 22, img: "/images/posters/premier-league.png", title: "Premier League", quality: "Live" },
            { id: 23, img: "/images/posters/NFL.png", title: "Super Bowl", quality: "4K" },
            { id: 24, img: "/images/posters/UFC.png", title: "UFC", quality: "Live" },
        ]
    }
];

// Fallback gradient colors for each poster
const gradientFallbacks = [
    'from-blue-900 to-purple-900',
    'from-red-900 to-orange-900',
    'from-yellow-900 to-amber-900',
    'from-green-900 to-teal-900',
    'from-pink-900 to-rose-900',
    'from-indigo-900 to-blue-900',
    'from-purple-900 to-pink-900',
    'from-cyan-900 to-blue-900',
];

const brandCards = [
    { name: "Netflix", logo: "/images/streaming-logos/netflix-seeklogo.png" },
    { name: "Disney+", logo: "/images/streaming-logos/disney-channel-seeklogo.png" },
    { name: "HBO", logo: "/images/streaming-logos/hbo-seeklogo.png" },
    { name: "Prime Video", logo: "/images/streaming-logos/amazon-prime-video-seeklogo.png" },
    { name: "Apple TV+", logo: "/images/streaming-logos/apple-tv-seeklogo.png" },
    { name: "Hulu", logo: "/images/streaming-logos/hulu-seeklogo.png" },
    { name: "Paramount+", logo: "/images/streaming-logos/paramount-seeklogo.png" },
    { name: "ESPN", logo: "/images/streaming-logos/espn-seeklogo.png" },
    { name: "DAZN", logo: "/images/streaming-logos/dazn-seeklogo.png" },
    { name: "UFC", logo: "/images/streaming-logos/ufc-seeklogo.png" },
    { name: "NBA", logo: "/images/streaming-logos/nba-seeklogo.png" },
    { name: "NFL", logo: "/images/streaming-logos/nfl-seeklogo.png" },
];

export function ContentExplorer() {
    const shouldReduceMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section 
            id="browse" 
            className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#030308] overflow-hidden"
            aria-label="Content browser"
        >
            <div className="section-padding relative z-10">
                {/* Netflix Style Poster Rows - Infinite Auto-Scrolling */}
                <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
                    {contentRows.map((row, rowIndex) => (
                        <div key={row.title}>
                            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8 px-4 md:px-layout">
                                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tighter text-white/90">
                                    {row.title}
                                </h2>
                                <button className="flex items-center gap-1 sm:gap-2 text-primary text-[9px] sm:text-[10px] font-black tracking-widest cursor-pointer hover:underline uppercase transition-all">
                                    Browse All 
                                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                </button>
                            </div>

                            <div className="relative overflow-hidden -mx-4 md:-mx-layout py-2 sm:py-4">
                                <motion.div
                                    animate={shouldReduceMotion ? {} : {
                                        x: rowIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"]
                                    }}
                                    transition={shouldReduceMotion ? {} : {
                                        duration: isMobile ? 25 : 40,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 whitespace-nowrap w-max px-4 md:px-layout"
                                >
                                    {[...row.posters, ...row.posters].map((poster, i) => (
                                        <div 
                                            key={`${poster.id}-${i}`} 
                                            className="flex-none w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px] xl:w-[220px]"
                                        >
                                            <PosterCard poster={poster} index={i} />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Secondary Brand Marquee - Inserted after the first content row */}
                            {rowIndex === 0 && (
                                <div className="mt-10 sm:mt-14 md:mt-16 lg:mt-20 relative overflow-hidden -mx-4 md:-mx-layout py-4 sm:py-6 md:py-8 lg:py-10 bg-gradient-to-r from-black via-[#0a0a0a] to-black border-y border-white/5">
                                    {/* Gradient glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                                    
                                    <motion.div
                                        animate={shouldReduceMotion ? {} : { x: ["-50%", "0%"] }}
                                        transition={shouldReduceMotion ? {} : { duration: isMobile ? 25 : 35, repeat: Infinity, ease: "linear" }}
                                        className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-8 whitespace-nowrap w-max px-4 md:px-layout items-center relative z-10"
                                    >
                                        {[...brandCards, ...brandCards].map((card, i) => (
                                            <motion.div
                                                key={`${card.name}-${i}`}
                                                whileHover={isMobile ? {} : { scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg md:rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer group flex-shrink-0"
                                            >
                                                {/* Logo container */}
                                                <div className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-md sm:rounded-lg flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 overflow-hidden shadow-lg border border-white/10">
                                                    <Image
                                                        src={card.logo}
                                                        alt={card.name}
                                                        width={24}
                                                        height={24}
                                                        className="object-contain w-full h-full p-0.5 sm:p-1 brightness-110 contrast-125"
                                                        unoptimized={true}
                                                    />
                                                </div>
                                                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wider text-white/70 group-hover:text-white transition-colors hidden sm:inline">
                                                    {card.name}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PosterCard({ poster, index }: { poster: any; index: number }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
    const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    const fallbackGradient = gradientFallbacks[index % gradientFallbacks.length];

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onClick={() => isMobile && setIsHovered(!isHovered)}
            style={shouldReduceMotion || isMobile ? {} : { rotateX, rotateY }}
            whileHover={isMobile ? {} : { scale: 1.05, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
            className="poster-card flex-none w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px] xl:w-[220px] group relative cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`${poster.title} - ${poster.quality}`}
        >
            {/* Loading skeleton */}
            {isLoading && !hasError && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] animate-pulse rounded-lg z-10" />
            )}
            
            {/* Error fallback - gradient placeholder */}
            {hasError ? (
                <div className={`w-full h-full rounded-lg bg-gradient-to-br ${fallbackGradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <Film className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white/30" />
                </div>
            ) : (
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                        src={poster.img}
                        alt={poster.title || 'Movie Poster'}
                        fill
                        sizes="(max-width: 640px) 100px, (max-width: 768px) 130px, (max-width: 1024px) 160px, (max-width: 1280px) 200px, 220px"
                        className={`object-cover transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} group-hover:scale-110`}
                        onLoad={() => setIsLoading(false)}
                        onError={() => { setHasError(true); setIsLoading(false); }}
                        priority={index < 4}
                    />
                    
                    {/* Quality Badge */}
                    <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 z-20">
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[7px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white/90 rounded">
                            {poster.quality}
                        </span>
                    </div>
                    
                    {/* Hover Overlay with Actions */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-2 sm:p-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <h3 className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white mb-1 sm:mb-2 line-clamp-2 leading-tight">
                            {poster.title}
                        </h3>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <button 
                                className="flex-1 h-6 sm:h-7 md:h-8 bg-white text-black rounded flex items-center justify-center text-[8px] sm:text-[9px] font-bold uppercase tracking-wider hover:bg-white/90 transition-colors"
                                aria-label="Play"
                            >
                                <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" fill="currentColor" />
                                Play
                            </button>
                            <button 
                                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                aria-label="More info"
                            >
                                <Info className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
