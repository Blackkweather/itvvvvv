'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Play, Info, ChevronRight, Star, Zap, Globe, Smartphone, Film, Tv } from 'lucide-react';
import { useRef, useEffect } from 'react';

const contentRows = [
    {
        title: "Trending Worldwide",
        posters: [
            { id: 1, img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", quality: "4K" },
            { id: 2, img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop", quality: "HDR" },
            { id: 3, img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop", quality: "4K" },
            { id: 4, img: "https://images.unsplash.com/photo-1621955964441-c173e01c115a?w=400&h=600&fit=crop", quality: "UHD" },
            { id: 5, img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&h=600&fit=crop", quality: "4K" },
            { id: 6, img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop", quality: "HDR" },
        ]
    },
    {
        title: "Live Sports Premium",
        posters: [
            { id: 7, img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=400&h=600&fit=crop", quality: "4K" },
            { id: 8, img: "https://images.unsplash.com/photo-1517603951035-17d4b2c27b0b?w=400&h=600&fit=crop", quality: "UHD" },
            { id: 9, img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=600&fit=crop", quality: "Live" },
            { id: 10, img: "https://images.unsplash.com/photo-1461896756913-647eeef2e75e?w=400&h=600&fit=crop", quality: "4K" },
            { id: 11, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=600&fit=crop", quality: "HDR" },
            { id: 12, img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=600&fit=crop", quality: "Live" },
        ]
    }
];

const brandCards = [
    { name: "LIVE TV", icon: Tv, gradient: "from-[#1a1a2e] to-[#16213e]" },
    { name: "MOVIES", icon: Film, gradient: "from-[#1b262c] to-[#0f4c75]" },
    { name: "SPORTS", icon: Zap, gradient: "from-[#222831] to-[#393e46]" },
    { name: "KIDS", icon: Globe, gradient: "from-[#2d3436] to-[#636e72]" },
    { name: "PREMIUM", icon: Star, gradient: "from-[#000000] to-[#1a1a1a]" },
];

export function ContentExplorer() {
    return (
        <section id="browse" className="relative py-24 bg-background overflow-hidden">
            <div className="section-padding relative z-10">

                {/* Disney Style Brand Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-24">
                    {brandCards.map((card, i) => (
                        <motion.div
                            key={card.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.4, ease: "easeOut" }
                            }}
                            className="brand-card group h-32 md:h-40 bg-white/[0.01] border-white/5"
                        >
                            {/* Animated background gradient pulse */}
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.5, 0.3],
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} blur-2xl`}
                            />

                            <div className="relative h-full flex flex-col items-center justify-center gap-3 backdrop-blur-3xl">
                                <card.icon strokeWidth={1} className="h-8 w-8 text-white/40 group-hover:text-primary transition-all duration-500" />
                                <span className="text-[9px] font-bold tracking-[0.4em] text-white/20 group-hover:text-white transition-colors">{card.name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* Netflix Style Poster Rows */}
                <div className="space-y-16">
                    {contentRows.map((row) => (
                        <div key={row.title} className="relative">
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white/90">
                                    {row.title}
                                </h2>
                                <div className="flex items-center gap-2 text-primary text-[10px] font-bold tracking-widest cursor-pointer hover:underline uppercase">
                                    Explore All <ChevronRight className="h-3 w-3" />
                                </div>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide px-2">
                                {row.posters.map((poster) => (
                                    <PosterCard key={poster.id} poster={poster} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

function PosterCard({ poster }: { poster: any }) {
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
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="poster-card flex-none w-[160px] md:w-[220px] group relative"
        >
            <img
                src={poster.img}
                alt="Content Poster"
                className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black text-white border border-white/10 uppercase tracking-widest">
                {poster.quality}
            </div>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-end">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="flex gap-3"
                >
                    <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:scale-110 transition-transform">
                        <Info className="h-4 w-4" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
