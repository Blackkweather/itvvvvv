'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { ChevronDown, Search, ThumbsUp, ThumbsDown } from 'lucide-react';

const faqs = [
    {
        question: 'What is streaming and how does StreamPro work?',
        answer: 'Streaming delivers TV content over the internet instead of traditional satellite or cable. StreamPro uses advanced streaming servers to deliver live channels and on-demand content directly to your devices through our app or compatible players.',
        category: 'General',
    },
    {
        question: 'Which devices are compatible with StreamPro?',
        answer: 'StreamPro works on virtually any device: Smart TVs (Samsung, LG, Sony, Android TV), Amazon Fire Stick & Fire TV, Roku, Apple TV, iOS & Android phones and tablets, Windows & macOS computers, and any device that supports streaming apps.',
        category: 'Devices',
    },
    {
        question: 'What is anti-freeze technology?',
        answer: 'Our proprietary anti-freeze technology uses adaptive bitrate streaming, intelligent CDN routing, and pre-buffering algorithms to eliminate freezing and buffering. Even on connections as low as 10 Mbps, you\'ll enjoy smooth, uninterrupted streaming.',
        category: 'Technical',
    },
    {
        question: 'How many devices can I use at the same time?',
        answer: 'Each StreamPro subscription supports up to 4 simultaneous connections. This means your family can watch different channels on different devices at the same time — all from one account.',
        category: 'Account',
    },
    {
        question: 'Do you offer a free trial?',
        answer: 'Yes! We offer a 24-hour free trial so you can test the service quality, channel selection, and streaming performance before committing. No credit card required for the trial. Simply sign up and start watching.',
        category: 'Billing',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, cryptocurrency (Bitcoin, Ethereum), and bank transfers. All transactions are encrypted and secure.',
        category: 'Billing',
    },
    {
        question: 'What happens if a channel goes down?',
        answer: 'We monitor all channels 24/7 with automated health checks. If a channel experiences issues, our system automatically switches to a backup source. Our team typically resolves channel issues within minutes. You can also report issues through our support for priority handling.',
        category: 'Technical',
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [helpful, setHelpful] = useState<Record<number, 'yes' | 'no' | null>>({});

    const categories = useMemo(() => {
        const cats = [...new Set(faqs.map(f => f.category))];
        return cats;
    }, []);

    const filteredFaqs = useMemo(() => {
        if (!searchQuery) return faqs;
        const query = searchQuery.toLowerCase();
        return faqs.filter(faq => 
            faq.question.toLowerCase().includes(query) || 
            faq.answer.toLowerCase().includes(query) ||
            faq.category.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const handleHelpful = (index: number, type: 'yes' | 'no') => {
        setHelpful(prev => ({ ...prev, [index]: type }));
    };

    return (
        <section id="faq" className="relative py-24 md:py-32">
            <div className="section-padding relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4"
                    >
                        FAQ
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30, scale: 1.05, filter: 'blur(20px)' }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-5"
                    >
                        Got Questions? <span className="gradient-text">We&apos;ve Got Answers.</span>
                    </motion.h2>
                </div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto mb-12"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                             className="w-full pl-10 pr-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>
                    {searchQuery && (
                        <p className="text-sm text-muted-foreground mt-3 text-center">
                            Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </motion.div>

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto space-y-3">
                    {filteredFaqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="rounded-xl glass overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-3 pr-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-primary/10">
                                        {faq.category}
                                    </span>
                                    <span className="font-medium text-sm md:text-[15px] text-foreground">
                                        {faq.question}
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-primary' : ''
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 md:px-6 pb-5 md:pb-6">
                                            <p className="text-sm text-secondary-foreground leading-relaxed mb-4">
                                                {faq.answer}
                                            </p>
                                            {/* Helpful rating */}
                                            <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                                                <span className="text-xs text-muted-foreground">Was this helpful?</span>
                                                <button
                                                    onClick={() => handleHelpful(i, 'yes')}
                                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                                        helpful[i] === 'yes' 
                                                            ? 'bg-success/20 text-success' 
                                                            : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                                                    }`}
                                                >
                                                    <ThumbsUp className="h-3 w-3" />
                                                    Yes
                                                </button>
                                                <button
                                                    onClick={() => handleHelpful(i, 'no')}
                                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                                        helpful[i] === 'no' 
                                                            ? 'bg-rose-500/20 text-rose-500' 
                                                            : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                                                    }`}
                                                >
                                                    <ThumbsDown className="h-3 w-3" />
                                                    No
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
