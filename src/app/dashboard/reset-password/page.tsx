'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Lock, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setError(data.error?.message || 'Failed to reset password');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Password Reset!</h2>
          <p className="text-gray-400 text-sm">
            Your password has been successfully reset.
          </p>
        </div>
        <Link 
          href="/dashboard/login"
          className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm font-medium flex items-start gap-3">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {!token ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-lg text-sm">
          Invalid or missing reset token. Please request a new password reset.
        </div>
      ) : (
        <>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-yellow-400" />
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all disabled:opacity-50 pr-12"
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-yellow-400" />
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !token}
            className="w-full bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Resetting...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </>
      )}

      <div className="text-center">
        <Link href="/dashboard/login" className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
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
            New Password
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Enter your new password
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-300" />
          
          <div className="relative bg-black/50 border border-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-10">
            <Suspense fallback={<div className="text-center text-gray-400">Loading...</div>}>
              <ResetPasswordForm />
            </Suspense>
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