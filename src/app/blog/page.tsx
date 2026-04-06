import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { BlogPostCard } from '@/components/blog/BlogPostCard';

export const metadata: Metadata = {
  title: 'StreamPro Blog - Streaming Guides, Tips & News',
  description: 'Stay up to date with the latest streaming tutorials, setup guides, cord-cutting tips, and entertainment news from StreamPro.',
  openGraph: {
    title: 'StreamPro Blog - Streaming Guides, Tips & News',
    description: 'Stay up to date with the latest streaming tutorials, setup guides, cord-cutting tips, and entertainment news from StreamPro.',
    type: 'website',
    url: 'https://streampro.space/blog',
    images: [
      {
        url: 'https://streampro.space/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StreamPro Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreamPro Blog - Streaming Guides, Tips & News',
    description: 'Latest streaming tutorials, setup guides, cord-cutting tips.',
    images: ['https://streampro.space/og-image.png'],
  },
  alternates: {
    canonical: 'https://streampro.space/blog',
  },
};

const blogPosts = [
    {
        slug: '4k-home-cinema-blueprint-2026',
        title: '4K Home Cinema Blueprint 2026: Build Your Ultimate Setup',
        excerpt: 'Build a stunning 4K home cinema for under $100 using the latest streaming technology. Step-by-step guide with equipment recommendations and setup tips.',
        category: 'Home Cinema',
        readTime: '18 min',
        date: '2026-04-02',
        dateDisplay: 'Apr 2, 2026',
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
        date: '2026-03-30',
        dateDisplay: 'Mar 30, 2026',
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
        date: '2026-03-28',
        dateDisplay: 'Mar 28, 2026',
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
        date: '2026-03-26',
        dateDisplay: 'Mar 26, 2026',
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
        date: '2026-03-24',
        dateDisplay: 'Mar 24, 2026',
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
        date: '2026-03-22',
        dateDisplay: 'Mar 22, 2026',
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
        date: '2026-03-20',
        dateDisplay: 'Mar 20, 2026',
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
        date: '2026-03-18',
        dateDisplay: 'Mar 18, 2026',
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
        date: '2026-03-16',
        dateDisplay: 'Mar 16, 2026',
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
        date: '2026-03-14',
        dateDisplay: 'Mar 14, 2026',
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
        date: '2026-03-12',
        dateDisplay: 'Mar 12, 2026',
        gradient: 'from-violet-500/20 to-fuchsia-600/20',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop&v=2',
        metaDescription: 'AI-powered program guides are revolutionizing live TV in 2026. Discover how machine learning makes channel discovery smarter and viewing personalized.',
        relatedPosts: ['tivimate-vs-ott-navigator-2026', 'smart-tv-streaming-slow-2026'],
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen">
            <section className="relative pt-20 md:pt-28 pb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.05] rounded-full blur-[150px]" />
                </div>

                <div className="section-padding relative z-10 text-center">
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                        StreamPro Blog
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
                        Tips, Guides & <span className="gradient-text">News</span>
                    </h1>
                    <p className="text-secondary-foreground max-w-xl mx-auto text-lg">
                        Stay up to date with the latest streaming tutorials, setup guides, and entertainment tips.
                    </p>
                </div>
            </section>

            <section className="section-padding pb-24 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {blogPosts.map((post, i) => (
                        <BlogPostCard key={post.slug} post={post} index={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}
