'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { Eye, EyeOff, Loader2, ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020205] relative overflow-hidden flex items-center justify-center py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="w-full max-w-md px-4 md:px-0 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="text-xl font-black inline-block mb-4">
            <span className="text-white">STREAM</span>
            <span className="text-yellow-400">PRO</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Sign in to access your streaming account
          </p>
        </div>

        {/* Login Card */}
        <div className="relative group">
          {/* Card Background with Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-300" />
          
          <div className="relative bg-black/50 border border-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm font-medium flex items-start gap-3">
                  <div>⚠️</div>
                  <span>{error}</span>
                </div>
              )}

              {/* Email Field */}
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

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="password" className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-yellow-400" />
                    Password
                  </label>
                  <Link href="/dashboard/forgot-password" className="text-xs text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all pr-12 disabled:opacity-50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs text-gray-500 font-medium">NEW USER</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/dashboard/register" className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors inline-flex items-center gap-1">
                  Create one
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-xs text-gray-500 space-y-2">
          <p>
            <Link href="/about" className="hover:text-gray-400 transition-colors">About</Link>
            {' '} • {' '}
            <Link href="/legal/terms-of-service" className="hover:text-gray-400 transition-colors">Terms</Link>
            {' '} • {' '}
            <Link href="/legal/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy</Link>
          </p>
          <p>© 2026 StreamPro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
