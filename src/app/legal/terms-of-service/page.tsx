'use client';

import React from 'react';

export default function TermsOfService() {
    return (
        <div className="section-padding py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text-gold">Terms of Service</h1>
                <div className="prose prose-invert max-w-none space-y-6 text-secondary-foreground font-light leading-relaxed">
                    <p className="text-xl text-foreground/80 mb-12">
                        Last Updated: March 2, 2026
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using StreamPro, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Provision</h2>
                        <p>
                            StreamPro provides a premium digital streaming interface. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Obligations</h2>
                        <p>
                            Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account. You agree to use the service only for lawful purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
                        <p>
                            All content, features, and functionality on the StreamPro platform are the exclusive property of StreamPro and its licensors.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">5. Governing Law</h2>
                        <p>
                            These terms are governed by and construed in accordance with international digital commerce standards.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
