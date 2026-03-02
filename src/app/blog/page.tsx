'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

const blogPosts = [
    {
        slug: 'what-is-iptv-complete-guide',
        title: 'What is IPTV? The Complete Guide for Beginners',
        excerpt: 'Everything you need to know about IPTV technology, how it works, and why it\'s the future of television entertainment.',
        category: 'Guides',
        readTime: '8 min',
        date: 'Feb 28, 2026',
        gradient: 'from-primary/20 to-blue-600/20',
    },
    {
        slug: 'how-to-setup-iptv-fire-stick',
        title: 'How to Set Up IPTV on Amazon Fire Stick in 5 Minutes',
        excerpt: 'Step-by-step guide to installing and configuring StreamPro on your Amazon Fire TV Stick for the best streaming experience.',
        category: 'Tutorials',
        readTime: '5 min',
        date: 'Feb 25, 2026',
        gradient: 'from-accent/20 to-purple-600/20',
    },
    {
        slug: 'best-iptv-players-2026',
        title: 'Best IPTV Players in 2026: Top 5 Apps Compared',
        excerpt: 'A comprehensive comparison of the top IPTV player apps — TiviMate, IPTV Smarters, OTT Navigator, and more.',
        category: 'Reviews',
        readTime: '6 min',
        date: 'Feb 20, 2026',
        gradient: 'from-emerald-500/20 to-green-600/20',
    },
    {
        slug: 'iptv-vs-cable-tv',
        title: 'IPTV vs Cable TV: Which is Better in 2026?',
        excerpt: 'A detailed comparison of IPTV and traditional cable TV services, covering cost, features, quality, and flexibility.',
        category: 'Comparison',
        readTime: '7 min',
        date: 'Feb 15, 2026',
        gradient: 'from-rose-500/20 to-pink-600/20',
    },
    {
        slug: 'how-to-fix-iptv-buffering',
        title: 'How to Fix IPTV Buffering: 10 Proven Solutions',
        excerpt: 'Experiencing buffering issues? Learn the top 10 proven methods to eliminate freezing and buffering for good.',
        category: 'Troubleshooting',
        readTime: '6 min',
        date: 'Feb 10, 2026',
        gradient: 'from-amber-500/20 to-orange-600/20',
    },
    {
        slug: 'vpn-for-iptv-guide',
        title: 'Do You Need a VPN for IPTV? Everything Explained',
        excerpt: 'Understanding VPN usage with IPTV services — benefits, recommendations, and how to set it up correctly.',
        category: 'Security',
        readTime: '5 min',
        date: 'Feb 5, 2026',
        gradient: 'from-sky-500/20 to-cyan-600/20',
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative pt-20 md:pt-28 pb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.05] rounded-full blur-[150px]" />
                </div>

                <div className="section-padding relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4"
                    >
                        StreamPro Blog
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-5"
                    >
                        Tips, Guides & <span className="gradient-text">News</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary-foreground max-w-xl mx-auto text-lg"
                    >
                        Stay up to date with the latest IPTV tutorials, setup guides, and streaming tips.
                    </motion.p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section-padding pb-24 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post, i) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                className="block group rounded-2xl glass card-hover overflow-hidden h-full"
                            >
                                {/* Thumbnail area */}
                                <div className={`h-44 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-grid opacity-30" />
                                    <span className="relative z-10 text-4xl font-bold text-white/20 select-none">SP</span>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/[0.1]">
                                            {post.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h2 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">{post.date}</span>
                                        <span className="text-xs font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Read <ArrowRight className="h-3 w-3" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
}
