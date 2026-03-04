'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

export default function SupportFloat() {
    const contacts = [
        {
            name: 'WhatsApp',
            icon: <MessageCircle className="h-6 w-6" />,
            color: 'bg-[#25D366]',
            link: 'https://wa.me/+447853402172?text=Hello%2C%20I%20want%20free%20trial%20please.',
        },
        {
            name: 'Telegram',
            icon: <Send className="h-6 w-6" />,
            color: 'bg-[#0088cc]',
            link: 'https://t.me/streamprospace',
        },
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3">
            {/* Social Icons - Golden Style */}
            <div className="flex gap-3">
                {contacts.map((contact, i) => (
                    <motion.a
                        key={contact.name}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-12 w-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black shadow-2xl hover:shadow-xl transition-shadow duration-300"
                        aria-label={contact.name}
                    >
                        {contact.icon}
                    </motion.a>
                ))}
            </div>
        </div>
    );
}
