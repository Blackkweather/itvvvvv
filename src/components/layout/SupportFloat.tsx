'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SupportFloat() {
    const [isVisible, setIsVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Immediate visibility for reliability
    }, []);

    const contacts = [
        {
            name: 'WhatsApp Support',
            icon: <MessageCircle className="h-5 w-5" />,
            color: 'bg-[#25D366]',
            link: 'https://wa.me/+447400706005?text=Hello%2C%20I%20want%20free%20trial%20please.',
            status: 'Instant Response',
        },
        {
            name: 'Telegram Channel',
            icon: <Send className="h-5 w-5" />,
            color: 'bg-[#0088cc]',
            link: 'https://t.me/geniustvstore',
            status: 'Global Updates',
        },
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-5">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-2 flex flex-col gap-3"
                    >
                        {contacts.map((contact, i) => (
                            <motion.a
                                key={contact.name}
                                href={contact.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group flex items-center gap-5 p-2 pl-5 pr-7 rounded-[22px] glass border-white/5 hover:border-primary/30 transition-all duration-500 shadow-3xl bg-black/40 backdrop-blur-xl"
                            >
                                <div className="text-right">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-1">{contact.status}</p>
                                    <p className="text-[13px] font-medium tracking-wide text-foreground/90 uppercase">{contact.name}</p>
                                </div>
                                <div className={`h-12 w-12 rounded-xl bg-white/[0.03] border border-white/10 text-white flex items-center justify-center transition-all duration-700 group-hover:bg-primary group-hover:text-background shadow-inner`}>
                                    {contact.icon}
                                </div>
                            </motion.a>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                            className="flex items-center gap-4 p-4 rounded-[22px] border border-white/5 bg-white/[0.02] backdrop-blur-md"
                        >
                            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Agents Active: 14</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className={`relative h-14 w-14 rounded-[18px] flex items-center justify-center transition-all duration-700 overflow-hidden shadow-2xl ${isOpen ? 'bg-background border border-white/10' : 'bg-primary border-none'
                            }`}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -45 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 45 }}
                                >
                                    <X className="h-5 w-5 text-foreground" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="support"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="relative flex items-center justify-center"
                                >
                                    <MessageCircle strokeWidth={1.5} className="h-6 w-6 text-background" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
