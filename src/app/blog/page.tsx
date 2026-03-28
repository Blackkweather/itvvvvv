'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { useState } from 'react';

const blogPosts = [
    {
        slug: 'cord-cutting-bible-2026',
        title: 'The 2026 Cord-Cutting Bible: How to Build a 4K Home Cinema for Under $50',
        excerpt: 'The ultimate guide to cutting cable TV forever. Build a complete 4K home cinema system with IPTV for under $50/month and access 15,000+ channels worldwide.',
        category: 'Ultimate Guide',
        readTime: '15 min',
        date: 'Mar 15, 2026',
        gradient: 'from-emerald-500/20 to-green-600/20',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'h265-vs-av1-codec-comparison',
        title: 'H.265 vs. AV1: Why Your Streaming Quality Depends on Codec Efficiency',
        excerpt: 'A technical deep-dive into video codecs. Learn why H.265 and AV1 are revolutionizing streaming quality and how they impact your IPTV experience.',
        category: 'Technical Deep-Dive',
        readTime: '12 min',
        date: 'Mar 12, 2026',
        gradient: 'from-violet-500/20 to-purple-600/20',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'best-iptv-players-android-tv-benchmark',
        title: 'Top 10 IPTV Players for Android TV: A Performance Benchmarking Study',
        excerpt: 'We benchmarked the top 10 IPTV players on Android TV. See which apps deliver the best performance, lowest buffering, and smoothest 4K playback.',
        category: 'Comparison Matrix',
        readTime: '14 min',
        date: 'Mar 14, 2026',
        gradient: 'from-amber-500/20 to-orange-600/20',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'traffic-creator-review',
        title: 'Traffic Creator Review 2026: Boost Your SEO with Quality Backlinks',
        excerpt: 'Discover how Traffic Creator can help you build high-authority backlinks and increase your website traffic. A complete review of this SEO tool.',
        category: 'Reviews',
        readTime: '8 min',
        date: 'Mar 10, 2026',
        gradient: 'from-primary/20 to-blue-600/20',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'best-iptv-service-2026',
        title: 'Best IPTV Service 2026: Complete Comparison & Reviews',
        excerpt: 'Discover the top IPTV providers in 2026. StreamPro leads with 15,000+ 4K channels, 60,000+ VODs, and zero buffering technology.',
        category: 'Reviews',
        readTime: '10 min',
        date: 'Mar 8, 2026',
        gradient: 'from-primary/20 to-blue-600/20',
        image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'what-is-iptv-complete-guide',
        title: 'What is IPTV? The Complete Guide for Beginners',
        excerpt: 'Everything you need to know about IPTV technology, how it works, and why it\'s the future of television entertainment.',
        category: 'Guides',
        readTime: '8 min',
        date: 'Feb 28, 2026',
        gradient: 'from-primary/20 to-blue-600/20',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: '4k-iptv-ultimate-guide',
        title: '4K IPTV: The Ultimate Streaming Experience in 2026',
        excerpt: 'Experience crystal-clear 4K streaming with StreamPro. Learn about 4K IPTV benefits, requirements, and best practices.',
        category: 'Technology',
        readTime: '7 min',
        date: 'Mar 5, 2026',
        gradient: 'from-sky-500/20 to-cyan-600/20',
        image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'how-to-setup-iptv-fire-stick',
        title: 'How to Set Up IPTV on Amazon Fire Stick in 5 Minutes',
        excerpt: 'Step-by-step guide to installing and configuring StreamPro on your Amazon Fire TV Stick for the best streaming experience.',
        category: 'Tutorials',
        readTime: '5 min',
        date: 'Feb 25, 2026',
        gradient: 'from-accent/20 to-purple-600/20',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'premium-iptv-subscription',
        title: 'Premium IPTV Subscription: Worth the Investment?',
        excerpt: 'Is a premium IPTV subscription worth it? We analyze costs, features, channel selection, and compare to cable alternatives.',
        category: 'Guides',
        readTime: '6 min',
        date: 'Mar 3, 2026',
        gradient: 'from-amber-500/20 to-orange-600/20',
        image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8d7e28?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'best-iptv-players-2026',
        title: 'Best IPTV Players in 2026: Top 5 Apps Compared',
        excerpt: 'A comprehensive comparison of the top IPTV player apps — TiviMate, IPTV Smarters, OTT Navigator, and more.',
        category: 'Reviews',
        readTime: '6 min',
        date: 'Feb 20, 2026',
        gradient: 'from-emerald-500/20 to-green-600/20',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'iptv-vs-cable-tv',
        title: 'IPTV vs Cable TV: Which is Better in 2026?',
        excerpt: 'A detailed comparison of IPTV and traditional cable TV services, covering cost, features, quality, and flexibility.',
        category: 'Comparison',
        readTime: '7 min',
        date: 'Feb 15, 2026',
        gradient: 'from-rose-500/20 to-pink-600/20',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'live-sports-streaming-iptv',
        title: 'Live Sports Streaming: Best IPTV for Sports Fans 2026',
        excerpt: 'Watch NFL, NBA, Champions League, UFC and more live in 4K. Discover the best IPTV service for sports enthusiasts.',
        category: 'Sports',
        readTime: '8 min',
        date: 'Mar 1, 2026',
        gradient: 'from-red-500/20 to-orange-600/20',
        image: 'https://images.unsplash.com/photo-1461896836934-eba09c2a1c06?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'how-to-fix-iptv-buffering',
        title: 'How to Fix IPTV Buffering: 10 Proven Solutions',
        excerpt: 'Experiencing buffering issues? Learn the top 10 proven methods to eliminate freezing and buffering for good.',
        category: 'Troubleshooting',
        readTime: '6 min',
        date: 'Feb 10, 2026',
        gradient: 'from-amber-500/20 to-orange-600/20',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'iptv-smart-tv-setup',
        title: 'How to Set Up IPTV on Samsung & LG Smart TVs',
        excerpt: 'Complete guide to installing IPTV on Samsung Smart TV, LG TV, Android TV, and Apple TV. Step-by-step instructions.',
        category: 'Tutorials',
        readTime: '7 min',
        date: 'Feb 22, 2026',
        gradient: 'from-indigo-500/20 to-purple-600/20',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'vpn-for-iptv-guide',
        title: 'Do You Need a VPN for IPTV? Everything Explained',
        excerpt: 'Understanding VPN usage with IPTV services — benefits, recommendations, and how to set it up correctly.',
        category: 'Security',
        readTime: '5 min',
        date: 'Feb 5, 2026',
        gradient: 'from-sky-500/20 to-cyan-600/20',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=675&fit=crop&v=2',
    },
    {
        slug: 'future-of-television',
        title: 'The Future of Television: IPTV Revolution 2026',
        excerpt: 'Explore how IPTV is transforming the television industry. From 8K streaming to AI-powered recommendations.',
        category: 'Industry',
        readTime: '9 min',
        date: 'Mar 7, 2026',
        gradient: 'from-violet-500/20 to-purple-600/20',
        image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&h=675&fit=crop&v=2',
    },
];

export default function BlogPage() {
    // BlogPosting schema for each blog post
    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "StreamPro Blog",
      "description": "Stay up to date with the latest streaming tutorials, setup guides, and entertainment tips.",
      "publisher": {
        "@type": "Organization",
        "name": "StreamPro",
        "logo": {
          "@type": "ImageObject",
          "url": "https://streampro.space/logo.png"
        }
      },
      "url": "https://streampro.space/blog",
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": post.date,
        "author": {
          "@type": "Organization",
          "name": "StreamPro"
        },
        "publisher": {
          "@type": "Organization",
          "name": "StreamPro"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://streampro.space/blog/${post.slug}`
        },
        "section": post.category
      }))
    };

    return (
        <div className="min-h-screen">
          {/* Blog Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
          />
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
                        Stay up to date with the latest streaming tutorials, setup guides, and entertainment tips.
                    </motion.p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section-padding pb-24 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                                {/* Thumbnail area with real image */}
                                <div className="h-44 bg-gradient-to-br relative overflow-hidden">
                                    <div className="absolute inset-0 bg-grid opacity-30" />
                                    <Image 
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwYI/8QAJBAAAgEDAwQDAQAAAAAAAAAAAQIDBAURABIhMRIGE1EHMmH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABsRAQACAgMAAAAAAAAAAAAAAAEAAgMREiEx/9oADAMBAAIRAxEAPwCw6d6d6fvOm6S+aipKmaWnjjeRJJGVSxUEk4HjJ/tbN06F6a9P6SK26co6Gioo/uWCGOEH34Uf2k0n9z/9k="
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-80`} />
                                </div>

                                {/* Content */}
                                <div className="p-6 text-center">
                                    <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/[0.1]">
                                            {post.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h2 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 text-center">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 text-center">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-center gap-4">
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
