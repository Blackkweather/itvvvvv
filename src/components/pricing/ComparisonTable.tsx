'use client';

import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Tv, Info } from 'lucide-react';

const features = [
    { name: '4K Ultra HD Quality', streampro: true, generic: 'Partial', cable: 'Extra Cost' },
    { name: 'Anti-Freeze Technology 2.0', streampro: true, generic: false, cable: true },
    { name: '15,000+ Live Channels', streampro: true, generic: 'Limited', cable: 'Expensive' },
    { name: 'No Contracts / Cancel Anytime', streampro: true, generic: true, cable: false },
    { name: 'PPV & Sports Events', streampro: true, generic: 'Unstable', cable: '$$$' },
    { name: '7-Day Catch Up', streampro: true, generic: false, cable: 'Extra' },
    { name: 'VPN Compatible', streampro: true, generic: 'Risky', cable: 'N/A' },
];

export default function ComparisonTable() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-24 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                    The <span className="gradient-text">StreamPro</span> Advantage
                </h2>
                <p className="text-secondary-foreground max-w-2xl mx-auto">
                    Why settle for mediocre streaming when you can have the absolute peak of television technology?
                </p>
            </div>

            <div className="relative overflow-x-auto rounded-3xl border border-white/10 glass">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="p-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Feature</th>
                            <th className="p-6 text-sm font-bold uppercase tracking-wider text-primary text-center bg-primary/5">StreamPro</th>
                            <th className="p-6 text-sm font-bold uppercase tracking-wider text-muted-foreground text-center">Generic IPTV</th>
                            <th className="p-6 text-sm font-bold uppercase tracking-wider text-muted-foreground text-center">Cable TV</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {features.map((feature, i) => (
                            <motion.tr
                                key={feature.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="p-6 font-medium text-foreground flex items-center gap-3">
                                    {feature.name}
                                    <Info className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-help" />
                                </td>
                                <td className="p-6 text-center bg-primary/[0.02]">
                                    <div className="flex justify-center">
                                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Check className="h-4 w-4 text-primary" />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-center text-sm text-secondary-foreground">
                                    {typeof feature.generic === 'boolean' ? (
                                        feature.generic ? (
                                            <Check className="h-4 w-4 text-muted-foreground mx-auto" />
                                        ) : (
                                            <X className="h-4 w-4 text-destructive/50 mx-auto" />
                                        )
                                    ) : (
                                        feature.generic
                                    )}
                                </td>
                                <td className="p-6 text-center text-sm text-secondary-foreground">
                                    {typeof feature.cable === 'boolean' ? (
                                        feature.cable ? (
                                            <Check className="h-4 w-4 text-muted-foreground mx-auto" />
                                        ) : (
                                            <X className="h-4 w-4 text-destructive/50 mx-auto" />
                                        )
                                    ) : (
                                        feature.cable
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Psychological Reassurance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="flex items-center gap-4 p-6 rounded-2xl border border-white/5 glass shadow-sm">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Escrow Secure</h4>
                        <p className="text-xs text-muted-foreground">Transactions are fully encrypted.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-2xl border border-white/5 glass shadow-sm">
                    <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                        <Zap className="h-5 w-5 text-success" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Elite Performance</h4>
                        <p className="text-xs text-muted-foreground">99.9% Uptime SLA Guaranteed.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-2xl border border-white/5 glass shadow-sm">
                    <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Tv className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Ultra Logistics</h4>
                        <p className="text-xs text-muted-foreground">Instant digital activation.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
