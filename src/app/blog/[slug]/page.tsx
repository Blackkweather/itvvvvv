'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { useParams } from 'next/navigation';

const blogContent: Record<string, {
    title: string;
    category: string;
    readTime: string;
    date: string;
    content: string[];
}> = {
    'what-is-iptv-complete-guide': {
        title: 'What is IPTV? The Complete Guide for Beginners',
        category: 'Guides',
        readTime: '8 min read',
        date: 'February 28, 2026',
        content: [
            'IPTV, or Internet Protocol Television, is a system where television services are delivered using the internet protocol suite over a packet-switched network such as a LAN or the internet, instead of being delivered through traditional terrestrial, satellite, or cable television formats.',
            'Unlike traditional TV that broadcasts content in real-time, IPTV gives you the power to stream your favorite content on demand. Think of it like Netflix or Hulu, but with access to thousands of live TV channels from around the world in addition to on-demand movies and series.',
            '## How Does IPTV Work?',
            'IPTV works by sending video content in small packets over the internet. When you select a channel or video, the content is fetched from the server and delivered to your device in real-time. The key difference from traditional TV is that content is sent only when requested, using a unicast (one-to-one) delivery method rather than broadcasting everything simultaneously.',
            'StreamPro uses advanced CDN (Content Delivery Network) technology with servers strategically placed around the world. This ensures minimal latency and buffer-free streaming regardless of your location.',
            '## Types of IPTV Services',
            '**Live Television** — Watch live TV channels in real-time, just like traditional TV but over the internet. StreamPro offers 10,000+ live channels from 100+ countries.',
            '**Video on Demand (VOD)** — Browse and watch movies and TV shows whenever you want. New content is added daily to our library of thousands of titles.',
            '**Time-Shifted TV (Catch-Up)** — Missed a show? No problem. Our EPG with 7-14 day catch-up lets you go back and watch programs that have already aired.',
            '## Why Choose IPTV Over Cable?',
            'The advantages of IPTV over traditional cable or satellite TV are significant: lower cost (often 80% cheaper), more channels, better picture quality with 4K support, multi-device compatibility, no contracts, and global access. With StreamPro, you get all of this plus our proprietary anti-freeze technology that ensures smooth playback at all times.',
        ],
    },
    'how-to-setup-iptv-fire-stick': {
        title: 'How to Set Up IPTV on Amazon Fire Stick in 5 Minutes',
        category: 'Tutorials',
        readTime: '5 min read',
        date: 'February 25, 2026',
        content: [
            'Setting up StreamPro on your Amazon Fire Stick is incredibly simple. Follow these 5 easy steps and you\'ll be streaming in no time.',
            '## Step 1: Enable Apps from Unknown Sources',
            'Go to Settings > My Fire TV > Developer Options and enable "Apps from Unknown Sources". This allows you to install the StreamPro app directly.',
            '## Step 2: Install the Downloader App',
            'From the Fire Stick home screen, go to the Search icon and type "Downloader". Install the Downloader app by AFTVnews — it\'s free and safe to use.',
            '## Step 3: Download StreamPro',
            'Open the Downloader app and enter the StreamPro download URL provided in your welcome email. The app will download and install automatically.',
            '## Step 4: Enter Your Credentials',
            'Launch the StreamPro app and enter your username and password (sent to your email after purchase). The app will connect to our servers and load your channel list.',
            '## Step 5: Start Watching!',
            'That\'s it! Browse the channel categories, select a channel, and enjoy crystal-clear streaming. We recommend connecting your Fire Stick via ethernet for the best 4K experience.',
            '## Troubleshooting Tips',
            'If you experience any issues during setup, try restarting your Fire Stick, clearing the app cache, or contacting our 24/7 support team. We\'re always happy to help with remote setup assistance.',
        ],
    },
};

const defaultContent = {
    title: 'Coming Soon',
    category: 'Blog',
    readTime: '3 min read',
    date: 'March 2026',
    content: [
        'This article is currently being written by our team. Check back soon for the full content!',
        'In the meantime, browse our other articles or visit our FAQ section for answers to common questions about StreamPro and IPTV services.',
    ],
};

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const post = blogContent[slug] || { ...defaultContent, title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) };

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative pt-20 md:pt-28 pb-12 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.04] rounded-full blur-[150px]" />
                </div>

                <div className="section-padding relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back to Blog
                        </Link>

                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/[0.1]">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {post.date}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
                            {post.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding pb-24 md:pb-32">
                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl prose-custom"
                >
                    {post.content.map((paragraph, i) => {
                        if (paragraph.startsWith('## ')) {
                            return (
                                <h2 key={i} className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
                                    {paragraph.replace('## ', '')}
                                </h2>
                            );
                        }
                        if (paragraph.startsWith('**')) {
                            return (
                                <p key={i} className="text-secondary-foreground leading-relaxed mb-4 text-[15px]">
                                    <strong className="text-foreground">{paragraph.split('**')[1]}</strong>
                                    {paragraph.split('**')[2]}
                                </p>
                            );
                        }
                        return (
                            <p key={i} className="text-secondary-foreground leading-relaxed mb-4 text-[15px]">
                                {paragraph}
                            </p>
                        );
                    })}

                    {/* CTA at bottom */}
                    <div className="mt-16 rounded-2xl glass p-8 text-center">
                        <h3 className="text-xl font-bold text-foreground mb-3">Ready to Try StreamPro?</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Start your free 24-hour trial today. No credit card required.
                        </p>
                        <Link href="/pricing" className="btn-primary">
                            View Plans
                        </Link>
                    </div>
                </motion.article>
            </section>
        </div>
    );
}
