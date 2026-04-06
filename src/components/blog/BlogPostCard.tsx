'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    dateDisplay: string;
    gradient: string;
    image: string;
    metaDescription: string;
    relatedPosts: string[];
}

interface BlogPostCardProps {
    post: BlogPost;
    index: number;
}

export function BlogPostCard({ post, index }: BlogPostCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
        >
            <Link
                href={`/blog/${post.slug}`}
                className="block group rounded-2xl glass card-hover overflow-hidden h-full"
            >
                <div className="h-44 bg-gradient-to-br relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <Image 
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-80`} />
                </div>

                <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/[0.1]">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
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
                        <span className="text-xs text-muted-foreground">{post.dateDisplay}</span>
                        <span className="text-xs font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read <ArrowRight className="h-3 w-3" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
