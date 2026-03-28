'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import Link from 'next/link';
import { 
  CreditCard, 
  Clock, 
  Shield, 
  Zap, 
  Play,
  ExternalLink,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function DashboardPage() {
  const { user, subscription } = useAuth();

  const planFeatures: Record<string, string[]> = {
    STARTER: ['4K Quality', '10,000+ Channels', '1 Device', 'Basic Support'],
    STANDARD: ['4K Quality', '15,000+ Channels', '2 Devices', 'Priority Support', 'Anti-Freeze'],
    PREMIUM: ['4K HDR', '20,000+ Channels', '3 Devices', '24/7 Support', 'Anti-Freeze', 'Multi-Screen'],
    ELITE: ['4K HDR', '35,000+ Channels', '4 Devices', '24/7 Priority', 'Anti-Freeze 2.0', 'Multi-Screen', '8K Trial'],
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name || 'User'}!</h1>
        <p className="text-gray-400 mt-1">Manage your account and subscription</p>
      </div>

      {/* Subscription Status Card */}
      <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Your Subscription</h2>
            {subscription ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    subscription.status === 'ACTIVE' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {subscription.status}
                  </span>
                  <span className="text-2xl font-bold text-primary">{subscription.plan}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Devices Used</p>
                    <p className="text-white font-medium">{subscription.devicesUsed} / {subscription.deviceLimit}</p>
                  </div>
                  {subscription.endDate && (
                    <div>
                      <p className="text-gray-500">Expires</p>
                      <p className="text-white font-medium">{new Date(subscription.endDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                {/* Connection Info - Removed for security. Credentials provided via email after payment */}
                {subscription.status === 'ACTIVE' && (
                  <div className="mt-6 p-4 bg-black/40 rounded-lg">
                    <p className="text-sm text-gray-400">
                      Streaming credentials are sent to your email after payment confirmation.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-4">
                <p className="text-gray-400 mb-4">You don&apos;t have an active subscription yet.</p>
                <Link 
                  href="/dashboard/subscription" 
                  className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-lg font-bold hover:bg-primary/90"
                >
                  <CreditCard className="h-5 w-5" />
                  Choose a Plan
                </Link>
              </div>
            )}
          </div>
          
          {subscription && (
            <div className="hidden sm:block">
              <div className="w-24 h-24 rounded-full border-4 border-primary/30 flex items-center justify-center">
                <Zap className="h-10 w-10 text-primary" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link 
          href="/dashboard/subscription"
          className="bg-black/40 border border-white/5 p-6 rounded-xl hover:border-primary/30 transition-colors group"
        >
          <CreditCard className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-white font-bold mb-1">Manage Plan</h3>
          <p className="text-sm text-gray-400">Upgrade or change your subscription</p>
        </Link>

        <Link 
          href="/dashboard/profile"
          className="bg-black/40 border border-white/5 p-6 rounded-xl hover:border-primary/30 transition-colors group"
        >
          <Shield className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-white font-bold mb-1">Profile Settings</h3>
          <p className="text-sm text-gray-400">Update your personal information</p>
        </Link>

        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black/40 border border-white/5 p-6 rounded-xl hover:border-primary/30 transition-colors group"
        >
          <Play className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-white font-bold mb-1">Need Help?</h3>
          <p className="text-sm text-gray-400">Contact support on WhatsApp</p>
        </a>
      </div>

      {/* Plan Features */}
      {subscription && (
        <div className="bg-black/40 border border-white/5 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Your Plan Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {planFeatures[subscription.plan]?.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* System Status */}
      <div className="bg-black/40 border border-white/5 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-gray-300">API Servers</span>
            </div>
            <span className="text-green-400 text-sm">Operational</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-gray-300">Stream Channels</span>
            </div>
            <span className="text-green-400 text-sm">Online</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-gray-300">EPG Guide</span>
            </div>
            <span className="text-green-400 text-sm">Updated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
