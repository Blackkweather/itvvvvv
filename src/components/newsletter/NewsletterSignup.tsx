'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, X, Loader2 } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'popup' | 'sidebar';
  onClose?: () => void;
}

export function NewsletterSignup({ variant = 'inline', onClose }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (variant === 'popup') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass rounded-2xl p-8 border border-primary/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close newsletter"
            >
              <X className="h-5 w-5" />
            </button>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">You&apos;re In!</h3>
                <p className="text-gray-300">Check your inbox for a confirmation email.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Get the Free Streaming Guide</h3>
                  <p className="text-sm text-gray-300">
                    Join 5,000+ cord-cutters. Get our free guide to saving $200/month on streaming.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="popup-email" className="sr-only">Email address</label>
                    <input
                      id="popup-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      disabled={status === 'loading'}
                    />
                    {status === 'error' && (
                      <p className="text-xs text-red-400 mt-1">{errorMessage}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3 px-6 rounded-xl bg-primary text-background font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      'Get Free Guide'
                    )}
                  </button>
                  <p className="text-xs text-gray-300 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className={`w-full ${variant === 'sidebar' ? 'max-w-sm' : 'max-w-xl mx-auto'}`}>
      {status === 'success' ? (
        <div className="text-center py-6">
          <Check className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="font-medium">Thanks for subscribing!</p>
        </div>
      ) : (
        <div className="glass rounded-2xl p-6 border border-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Stay Updated</h3>
              <p className="text-xs text-gray-300">Get the latest streaming tips & guides</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <label htmlFor={`newsletter-email-${variant}`} className="sr-only">Email address</label>
              <input
                id={`newsletter-email-${variant}`}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-muted/50 border border-border/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2.5 rounded-xl bg-primary text-background font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
              >
                {status === 'loading' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-xs text-red-400">{errorMessage}</p>
            )}
            <p className="text-xs text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
