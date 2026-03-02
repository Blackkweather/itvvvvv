'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Play, Info, ChevronRight, Star, Zap, Globe, Smartphone, Film, Tv } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

// Real movie posters from TMDB (reliable CDN)
// Sports images from reliable Unsplash sources
const contentRows = [
    {
        title: "Trending Movies 2026",
        posters: [
            { id: 1, img: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", title: "Avatar: Fire and Ash", quality: "4K HDR" },
            { id: 2, img: "https://image.tmdb.org/t/p/w500/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg", title: "Gladiator II", quality: "4K" },
            { id: 3, img: "https://image.tmdb.org/t/p/w500/1E5baAAmy5wZM39luzAVqJA9lAh.jpg", title: "Mickey 17", quality: "4K" },
            { id: 4, img: "https://image.tmdb.org/t/p/w500/m0R5oK4QlP4DEzOgonjsvX0UPOJ.jpg", title: "The Batman Part II", quality: "4K" },
            { id: 5, img: "https://image.tmdb.org/t/p/w500/3Umzhenq2qh4A3SPNWckGqGKacS.jpg", title: "Jurassic World Rebirth", quality: "4K" },
            { id: 6, img: "https://image.tmdb.org/t/p/w500/4amnMHHImmKih8A6b7E77JNNRuF.jpg", title: "Fantastic Four", quality: "4K" },
            { id: 7, img: "https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg", title: "Transformers", quality: "4K" },
            { id: 8, img: "https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg", title: "Paddington in Peru", quality: "HD" },
        ]
    },
    {
        title: "Popular TV Series",
        posters: [
            { id: 9, img: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyve4z0wH0Hl.jpg", title: "House of the Dragon", quality: "4K" },
            { id: 10, img: "https://image.tmdb.org/t/p/w500/uDgy6hyPd82kOhh6Ns334yMacYm.jpg", title: "Wednesday", quality: "4K" },
            { id: 11, img: "https://image.tmdb.org/t/p/w500/wZechQMU6r2LJLkqjJrjV0Q1O6P.jpg", title: "Squid Game S2", quality: "4K" },
            { id: 12, img: "https://image.tmdb.org/t/p/w500/hiHGRbyTVam2S98ba3d17KbbgQh.jpg", title: "Stranger Things", quality: "4K" },
            { id: 13, img: "https://image.tmdb.org/t/p/w500/tc2ebG4R8O7F8X6x2i5R3K7gN6H.jpg", title: "The Last of Us", quality: "4K" },
            { id: 14, img: "https://image.tmdb.org/t/p/w500/ca3x0OfIKRJppZh8S8A8VLc3ByG.jpg", title: "The Witcher", quality: "4K" },
            { id: 15, img: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg", title: "The Mandalorian", quality: "4K" },
            { id: 16, img: "https://image.tmdb.org/t/p/w500/lJA2RCM1Wnk5STJBFccW3NNVjtb.jpg", title: "Foundation", quality: "4K" },
        ]
    },
    {
        title: "Live Sports",
        posters: [
            { id: 17, img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&h=1200&fit=crop", title: "FIFA World Cup 2026", quality: "Live 4K" },
            { id: 18, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=1200&fit=crop", title: "Champions League", quality: "Live" },
            { id: 19, img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=1200&fit=crop", title: "NFL Football", quality: "Live 4K" },
            { id: 20, img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=1200&fit=crop", title: "NBA Finals", quality: "Live" },
            { id: 21, img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=1200&fit=crop", title: "UFC Fight Night", quality: "Live HD" },
            { id: 22, img: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800&h=1200&fit=crop", title: "Tennis Grand Slam", quality: "Live" },
            { id: 23, img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=1200&fit=crop", title: "Boxing Championship", quality: "4K" },
            { id: 24, img: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=800&h=1200&fit=crop", title: "Formula 1", quality: "Live" },
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
    { 
        name: "Netflix", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    { 
        name: "Disney+", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    },
    { 
        name: "HBO Max", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/5a/HBO_Max_Logo.svg",
    },
    { 
        name: "Prime Video", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Prime_Video_logo.jpg",
    },
    { 
        name: "Apple TV+", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Apple_TV%2B_logo.svg",
    },
    { 
        name: "Hulu", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg",
    },
    { 
        name: "Paramount+", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Paramount%2B_logo.svg",
    },
    { 
        name: "Peacock", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Peacock_Logo.svg",
    },
    { 
        name: "Discovery+", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Discovery%2B_logo.svg",
    },
    { 
        name: "YouTube TV", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_TV_Logo.svg",
    },
];

export function ContentExplorer() {
    return (
        <section id="browse" className="relative py-24 bg-background overflow-hidden">
            <div className="section-padding relative z-10">

                {/* Netflix Style Poster Rows - Now Infinite Auto-Scrolling */}
                <div className="space-y-24">
                    {contentRows.map((row, rowIndex) => (
                        <div key={row.title} className="relative">
                            <div className="flex items-center justify-between mb-8 px-layout">
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white/90">
                                    {row.title}
                                </h2>
                                <div className="flex items-center gap-2 text-primary text-[10px] font-black tracking-widest cursor-pointer hover:underline uppercase">
                                    Browse All <ChevronRight className="h-3 w-3" />
                                </div>
                            </div>

                            <div className="relative overflow-hidden -mx-layout py-4">
                                <motion.div
                                    animate={{
                                        x: rowIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"]
                                    }}
                                    transition={{
                                        duration: 40,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="flex gap-6 whitespace-nowrap w-max px-layout"
                                >
                                    {[...row.posters, ...row.posters].map((poster, i) => (
                                        <div key={`${poster.id}-${i}`} className="flex-none">
                                            <PosterCard poster={poster} index={i} />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Secondary Brand Marquee - Inserted after the first content row (Trending) */}
                            {rowIndex === 0 && (
                                <div className="mt-24 relative overflow-hidden -mx-layout py-10 bg-gradient-to-r from-black via-black/95 to-black border-y border-white/5">
                                    {/* Gradient glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                                    
                                    <motion.div
                                        animate={{ x: ["-50%", "0%"] }}
                                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                                        className="flex gap-8 whitespace-nowrap w-max px-layout items-center relative z-10"
                                    >
                                        {[...brandCards, ...brandCards].map((card, i) => (
                                            <motion.div
                                                key={`${card.name}-${i}`}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/8 hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer group"
                                            >
                                                {/* Logo container */}
                                                <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-lg">
                                                    <Image
                                                        src={card.logo}
                                                        alt={card.name}
                                                        width={36}
                                                        height={36}
                                                        className="object-contain w-full h-full p-1"
                                                        unoptimized={true}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold tracking-wider text-white/70 group-hover:text-white transition-colors">
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
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
    const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
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
            onMouseEnter={() => setIsHovered(true)}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="poster-card flex-none w-[160px] md:w-[220px] group relative"
        >
            {/* Loading skeleton */}
            {isLoading && !hasError && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] animate-pulse rounded-lg z-10" />
            )}
            
            {/* Error fallback - gradient placeholder */}
            {hasError ? (
                <div className={`w-full h-full rounded-lg bg-gradient-to-br ${fallbackGradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <Film className="h-12 w-12 text-white/30" />
                </div>
            ) : (
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                        src={poster.img}
                        alt={poster.title || 'Movie Poster'}
                        fill
                        sizes="(max-width: 768px) 160px, 220px"
                        className={`object-cover transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'} group-hover:scale-110`}
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(false);
                            setHasError(true);
                        }}
                        unoptimized={true}
                    />
                </div>
            )}
            
            {/* Quality badge */}
            {!hasError && (
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black text-white border border-white/10 uppercase tracking-widest z-20">
                    {poster.quality || '4K'}
                </div>
            )}
            
            {/* Hover Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-end z-30 ${isHovered ? 'opacity-100' : ''}`}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex gap-3"
                >
                    <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                        <Info className="h-4 w-4" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
