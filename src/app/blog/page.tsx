'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { useState } from 'react';

const blogPosts = [
    {
        slug: '4k-home-cinema-blueprint-2026',
        title: '4K Home Cinema Blueprint 2026: Build Your Ultimate Setup',
        excerpt: 'Build a stunning 4K home cinema for under $100 using the latest streaming technology. Step-by-step guide with equipment recommendations and setup tips.',
        category: 'Home Cinema',
        readTime: '18 min',
        date: 'Apr 2, 2026',
        gradient: 'from-blue-500/20 to-indigo-600/20',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'Build a stunning 4K home cinema for under $100 in 2026. Step-by-step blueprint with equipment recommendations, network optimization, and setup tips.',
        relatedPosts: ['budget-4k-home-cinema-2026', 'av1-codec-streaming-2026'],
    },
    {
        slug: 'cord-cutting-manifesto-2026',
        title: 'The 2026 Cord-Cutting Guide: Watch Local Sports Without Cable',
        excerpt: 'Learn how to watch local sports without expensive cable packages. Complete guide to streaming local games and saving money in 2026.',
        category: 'Cord Cutting',
        readTime: '12 min',
        date: 'Mar 30, 2026',
        gradient: 'from-emerald-500/20 to-green-600/20',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'Learn how to watch local sports without expensive cable packages in 2026. Complete cord-cutting guide to save money and never miss a game.',
        relatedPosts: ['cord-cutting-mistakes-2026', 'international-streaming-2026'],
    },
    {
        slug: 'tivimate-vs-ott-navigator-2026',
        title: 'TiviMate vs. OTT Navigator: Best Streaming App Comparison 2026',
        excerpt: 'We tested both streaming apps on real devices. See which one loads faster, has better features, and delivers smoother playback in 2026.',
        category: 'Comparison',
        readTime: '14 min',
        date: 'Mar 28, 2026',
        gradient: 'from-violet-500/20 to-purple-600/20',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'TiviMate vs OTT Navigator comparison 2026. We tested both streaming apps on real devices to see which delivers better performance and features.',
        relatedPosts: ['smart-tv-streaming-slow-2026', '4k-home-cinema-blueprint-2026'],
    },
    {
        slug: 'fix-iptv-buffering-2026',
        title: 'How to Fix Streaming Buffering Forever: Network Optimization Guide',
        excerpt: 'Buffering ruining your stream? This guide covers DNS settings, router optimization, and bandwidth tricks to eliminate buffering forever.',
        category: 'Troubleshooting',
        readTime: '10 min',
        date: 'Mar 26, 2026',
        gradient: 'from-amber-500/20 to-orange-600/20',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'Fix streaming buffering forever with this network optimization guide. Learn DNS settings, router tricks, and bandwidth allocation strategies.',
        relatedPosts: ['av1-codec-streaming-2026', '4k-home-cinema-blueprint-2026'],
    },
    {
        slug: 'av1-codec-streaming-2026',
        title: 'The Rise of AV1: Why Your 4K Stream Needs Less Bandwidth',
        excerpt: 'AV1 codec is changing streaming. Learn how it delivers 50% better compression than older codecs, enabling true 4K on limited connections.',
        category: 'Technology',
        readTime: '8 min',
        date: 'Mar 24, 2026',
        gradient: 'from-sky-500/20 to-cyan-600/20',
        image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'AV1 codec is revolutionizing streaming in 2026. Learn how it delivers 50% better compression than H.265, enabling true 4K on limited bandwidth.',
        relatedPosts: ['4k-home-cinema-blueprint-2026', 'fix-iptv-buffering-2026'],
    },
    {
        slug: 'cord-cutting-mistakes-2026',
        title: 'Top 5 Cord-Cutting Mistakes to Avoid in 2026 (Save $200/mo)',
        excerpt: 'Avoid these common mistakes that cost cord-cutters hundreds per month. Learn the right way to switch from cable and maximize savings.',
        category: 'Guides',
        readTime: '7 min',
        date: 'Mar 22, 2026',
        gradient: 'from-primary/20 to-blue-600/20',
        image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'Avoid these 5 common cord-cutting mistakes that cost hundreds per month. Learn the right way to switch from cable and save $200/mo in 2026.',
        relatedPosts: ['cord-cutting-manifesto-2026', 'budget-4k-home-cinema-2026'],
    },
    {
        slug: 'budget-4k-home-cinema-2026',
        title: 'Setting Up Your 4K Home Cinema for Under $100: 2026 Blueprint',
        excerpt: 'Build a professional 4K home cinema without breaking the bank. Step-by-step guide covering equipment, audio, and streaming setup.',
        category: 'DIY',
        readTime: '15 min',
        date: 'Mar 20, 2026',
        gradient: 'from-rose-500/20 to-pink-600/20',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'Build a professional 4K home cinema for under $100 in 2026. Step-by-step blueprint covering equipment selection, audio setup, and streaming.',
        relatedPosts: ['4k-home-cinema-blueprint-2026', 'cord-cutting-mistakes-2026'],
    },
    {
        slug: 'smart-tv-streaming-slow-2026',
        title: 'Why Your Smart TV Apps Are Slowing Down Your Streaming',
        excerpt: 'Smart TV processors are often the bottleneck. Discover why dedicated streaming devices outperform TV apps and which devices work best.',
        category: 'Hardware',
        readTime: '6 min',
        date: 'Mar 18, 2026',
        gradient: 'from-red-500/20 to-orange-600/20',
        image: 'https://images.unsplash.com/photo-1461896836934-eba09c2a1c06?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'Smart TV apps slowing down your streaming? Discover why dedicated streaming devices outperform TV apps and which devices deliver best performance.',
        relatedPosts: ['tivimate-vs-ott-navigator-2026', '4k-home-cinema-blueprint-2026'],
    },
    {
        slug: 'legal-landscape-streaming-2026',
        title: 'The Legal Landscape of Streaming in 2026: What You Need to Know',
        excerpt: 'Navigate the complex legal landscape of streaming services. Understand the difference between licensed services and how to stay compliant.',
        category: 'Legal',
        readTime: '9 min',
        date: 'Mar 16, 2026',
        gradient: 'from-indigo-500/20 to-purple-600/20',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'Navigate the legal landscape of streaming in 2026. Understand the difference between licensed services and how to stay compliant with regulations.',
        relatedPosts: ['cord-cutting-manifesto-2026', 'international-streaming-2026'],
    },
    {
        slug: 'international-streaming-2026',
        title: 'International Streaming: Access Global Content from Anywhere',
        excerpt: 'Access your favorite shows from back home while traveling. Learn about geo-unlocking tools and the best ways to watch global content.',
        category: 'Travel',
        readTime: '8 min',
        date: 'Mar 14, 2026',
        gradient: 'from-teal-500/20 to-emerald-600/20',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'Access global content from anywhere in 2026. Learn about geo-unlocking tools, international streaming services, and how to watch shows abroad.',
        relatedPosts: ['cord-cutting-manifesto-2026', 'legal-landscape-streaming-2026'],
    },
    {
        slug: 'ai-powered-epg-2026',
        title: 'The Future of Live TV: How AI Is Changing Channel Guides',
        excerpt: 'AI-powered program guides are revolutionizing live TV. Discover how machine learning makes channel discovery smarter and viewing more personalized.',
        category: 'AI & Tech',
        readTime: '7 min',
        date: 'Mar 12, 2026',
        gradient: 'from-violet-500/20 to-fuchsia-600/20',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'AI-powered program guides are revolutionizing live TV in 2026. Discover how machine learning makes channel discovery smarter and viewing personalized.',
        relatedPosts: ['tivimate-vs-ott-navigator-2026', 'smart-tv-streaming-slow-2026'],
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
        "description": post.metaDescription,
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
