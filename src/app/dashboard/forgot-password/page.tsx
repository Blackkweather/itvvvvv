'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError(data.error?.message || 'Failed to send reset email');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020205] relative overflow-hidden flex items-center justify-center py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="w-full max-w-md px-4 md:px-0 relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="text-xl font-black inline-block mb-4">
            <span className="text-white">STREAM</span>
            <span className="text-yellow-400">PRO</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Reset Password
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Enter your email to receive a reset link
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-300" />
          
          <div className="relative bg-black/50 border border-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-10">
            {isSubmitted ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Check Your Email</h2>
                  <p className="text-gray-400 text-sm">
                    If an account exists with this email, you will receive a password reset link shortly.
                  </p>
                </div>
                <Link 
                  href="/dashboard/login"
                  className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm font-medium flex items-start gap-3">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-yellow-400" />
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all disabled:opacity-50"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>

                <div className="text-center">
                  <Link href="/dashboard/login" className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 space-y-2">
          <p>
            <Link href="/legal/terms-of-service" className="hover:text-gray-400 transition-colors">Terms</Link>
            {' • '}
            <Link href="/legal/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy</Link>
          </p>
          <p>© 2026 StreamPro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}