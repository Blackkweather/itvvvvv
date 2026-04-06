import Link from 'next/link';
import { Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const footerSections = [
    {
        title: 'Product',
        links: [
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Affiliate Program', href: '/affiliate' },
            { label: 'Reseller Program', href: '/reseller' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Resources', href: '/blog' },
            { label: 'Setup Guide', href: '#faq' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Refund Policy', href: '/legal/refund-policy' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '/#' },
            { label: 'Contact', href: 'mailto:support@streampro.space' },
            { label: 'Privacy Policy', href: '/legal/privacy-policy' },
            { label: 'Terms of Service', href: '/legal/terms-of-service' },
        ],
    },
];

const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/streampro', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/streampro', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@streampro', label: 'Youtube' },
    { icon: Mail, href: 'mailto:support@streampro.space', label: 'Email' },
];

export function Footer() {
    return (
        <footer className="relative border-t border-white/[0.06] bg-[#020208]">
            {/* Gradient line at top */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="section-padding-wide py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="mb-6 inline-block group">
                            <Logo />
                        </Link>
                        <p className="text-white text-sm leading-relaxed max-w-sm mb-8">
                            Professional streaming consultation and technical support services.
                            Expert solutions for all your entertainment needs.
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
                                <div className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">Secure SSL</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">Premium Quality</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="h-10 w-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-semibold text-sm text-white mb-5 uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} StreamPro. All rights reserved. Professional Grade Entertainment.
                    </p>
                    <div className="flex items-center gap-4 grayscale opacity-40">
                        {/* Payment icons placeholder or text labels for simplicity/cleanliness */}
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Visa</span>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Mastercard</span>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Crypto</span>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">PayPal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
