'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { Eye, EyeOff, Loader2, Check, ArrowRight, Mail, Lock, User, Phone } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(formData.password), text: 'One lowercase letter' },
    { met: /[0-9]/.test(formData.password), text: 'One number' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!passwordRequirements.every((req) => req.met)) {
      setError('Please meet all password requirements');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
      });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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

      <div className="w-full max-w-md px-4 md:px-0 relative z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="text-xl font-black inline-block mb-4">
            <span className="text-white">STREAM</span>
            <span className="text-yellow-400">PRO</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Join StreamPro and start streaming today
          </p>
        </div>

        {/* Register Card */}
        <div className="relative group">
          {/* Card Background with Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-300" />
          
          <div className="relative bg-black/50 border border-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm font-medium flex items-start gap-3">
                  <div>⚠️</div>
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-yellow-400" />
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-yellow-400" />
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-yellow-400" />
                  Phone Number <span className="text-xs text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all disabled:opacity-50"
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-yellow-400" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                
                {/* Password requirements */}
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div className={`${req.met ? 'text-green-400' : 'text-gray-500'}`}>
                        {req.met ? <Check className="h-3 w-3" /> : <div className="h-1.5 w-1.5 rounded-full border border-gray-500" />}
                      </div>
                      <span className={req.met ? 'text-gray-300' : 'text-gray-500'}>{req.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-yellow-400" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                    <Check className="h-3 w-3" />
                    <span>Passwords match</span>
                  </div>
                )}
              </div>

              {/* Terms & Privacy */}
              <div className="text-xs text-gray-400 text-center">
                By creating an account, you agree to our{' '}
                <Link href="/legal/terms-of-service" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/legal/privacy-policy" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                  Privacy Policy
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !passwordRequirements.every(req => req.met)}
                className="w-full bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs text-gray-500 font-medium">EXISTING USER</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link href="/dashboard/login" className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors inline-flex items-center gap-1">
                  Sign in
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