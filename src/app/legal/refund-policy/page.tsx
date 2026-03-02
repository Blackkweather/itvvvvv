'use client';

import React from 'react';

export default function RefundPolicy() {
    return (
        <div className="section-padding py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text-gold">Refund Policy</h1>
                <div className="prose prose-invert max-w-none space-y-6 text-secondary-foreground font-light leading-relaxed">
                    <p className="text-xl text-foreground/80 mb-12">
                        Confidence in Every Stream.
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Our Guarantee</h2>
                        <p>
                            At StreamPro, we pride ourselves on providing the industry's most stable and premium IPTV experience. We want you to be completely satisfied with your subscription.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">7-Day Satisfaction Period</h2>
                        <p>
                            If you experience technical issues that we cannot resolve within 48 hours of your report, you are eligible for a full refund within the first 7 days of your initial subscription.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Non-Refundable Items</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Renewal payments (unless requested before the renewal date).</li>
                            <li>Promotional or discounted "Limited Time" bundles.</li>
                            <li>Accounts that have violated our Terms of Service.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">How to Request a Refund</h2>
                        <p>
                            To initiate a refund request, please contact our billing department through the "Live Support" dashboard. Please include your transaction ID and a brief description of the technical issues encountered.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
