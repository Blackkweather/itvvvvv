'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'What is IPTV and how does StreamPro work?',
        answer: 'IPTV (Internet Protocol Television) delivers TV content over the internet instead of traditional satellite or cable. StreamPro uses advanced streaming servers to deliver 10,000+ live channels and on-demand content directly to your devices through our app or compatible players like TiviMate, IPTV Smarters, or VLC.',
    },
    {
        question: 'Which devices are compatible with StreamPro?',
        answer: 'StreamPro works on virtually any device: Smart TVs (Samsung, LG, Sony, Android TV), Amazon Fire Stick & Fire TV, Roku, Apple TV, iOS & Android phones and tablets, Windows & macOS computers, MAG boxes, Formuler, Buzz TV, and any device that supports M3U playlists or Xtream Codes.',
    },
    {
        question: 'What is anti-freeze technology?',
        answer: 'Our proprietary anti-freeze technology uses adaptive bitrate streaming, intelligent CDN routing, and pre-buffering algorithms to eliminate freezing and buffering. Even on connections as low as 10 Mbps, you\'ll enjoy smooth, uninterrupted streaming.',
    },
    {
        question: 'How many devices can I use at the same time?',
        answer: 'Each StreamPro subscription supports up to 4 simultaneous connections. This means your family can watch different channels on different devices at the same time — all from one account.',
    },
    {
        question: 'Do you offer a free trial?',
        answer: 'Yes! We offer a 24-hour free trial so you can test the service quality, channel selection, and streaming performance before committing. No credit card required for the trial. Simply sign up and start watching.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, cryptocurrency (Bitcoin, Ethereum), and bank transfers. All transactions are encrypted and secure.',
    },
    {
        question: 'What happens if a channel goes down?',
        answer: 'We monitor all channels 24/7 with automated health checks. If a channel experiences issues, our system automatically switches to a backup source. Our team typically resolves channel issues within minutes. You can also report issues through our support for priority handling.',
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, i) => (
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
                                <span className="font-medium text-sm md:text-[15px] text-foreground pr-4">
                                    {faq.question}
                                </span>
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
                                        <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-secondary-foreground leading-relaxed">
                                            {faq.answer}
                                        </p>
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
