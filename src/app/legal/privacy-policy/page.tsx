'use client';

import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="section-padding py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text-gold">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none space-y-6 text-secondary-foreground font-light leading-relaxed">
                    <p className="text-xl text-foreground/80 mb-12">
                        Last Updated: March 2, 2026
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                        <p>
                            StreamPro ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our IPTV services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information Collection</h2>
                        <p>
                            We collect information that you provide directly to us when you register for an account, make a purchase, or communicate with our support team. This may include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Contact information (email address, name)</li>
                            <li>Payment information (processed securely through our encrypted gateways)</li>
                            <li>Device information and usage data</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">3. Use of Information</h2>
                        <p>
                            We use the collected information to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide, maintain, and improve our services.</li>
                            <li>Process transactions and send related information.</li>
                            <li>Send technical notices, updates, and support messages.</li>
                            <li>Respond to your comments and questions.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
                        <p>
                            We implement industry-standard security measures, including SSL encryption and secure server infrastructure, to protect your personal information from unauthorized access or disclosure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact our 24/7 global support team via the live chat or our official contact channels.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
