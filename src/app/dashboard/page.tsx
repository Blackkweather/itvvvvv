'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import Link from 'next/link';
import { 
  CreditCard, 
  Shield, 
  Zap, 
  Headphones,
  Calendar,
  Monitor,
  CheckCircle,
  Activity,
  Users,
  FileText
} from 'lucide-react';
import { IconLoader } from '@/components/ui/Icons';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { user, subscription } = useAuth();

  const planFeatures: Record<string, { label: string; value: string }[]> = {
    '1D_1M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '1' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '1D_3M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '1' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '1D_6M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '1' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '1D_12M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '1' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '2D_1M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '2' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '2D_3M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '2' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '2D_6M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '2' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '2D_12M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '2' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '3D_1M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '3' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '3D_3M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '3' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '3D_6M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '3' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
    '3D_12M': [
      { label: 'Channels', value: '30,000+' },
      { label: 'Devices', value: '3' },
      { label: 'Quality', value: '4K' },
      { label: 'Support', value: '24/7' },
    ],
  };

  const quickActions = [
    {
      href: '/dashboard/subscription',
      icon: CreditCard,
      title: 'Subscription',
      description: 'Manage your plan',
    },
    {
      href: '/dashboard/profile',
      icon: Users,
      title: 'Profile',
      description: 'Account settings',
    },
    {
      href: '/dashboard/settings',
      icon: FileText,
      title: 'Settings',
      description: 'Preferences',
    },
  ];

  const [statusItems, setStatusItems] = useState<{ label: string; status: string; icon: typeof Activity }[]>([
    { label: 'API Servers', status: 'loading', icon: Activity },
    { label: 'Stream Channels', status: 'loading', icon: Monitor },
    { label: 'EPG Guide', status: 'loading', icon: FileText },
  ]);
  const [isStatusLoading, setIsStatusLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setIsStatusLoading(true);
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      if (data.success) {
        setStatusItems([
          { label: 'API Servers', status: data.data.apiServers?.status || 'unknown', icon: Activity },
          { label: 'Stream Channels', status: data.data.streamChannels?.status || 'unknown', icon: Monitor },
          { label: 'EPG Guide', status: data.data.epgGuide?.status || 'unknown', icon: FileText },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch status:', error);
      setStatusItems([
        { label: 'API Servers', status: 'error', icon: Activity },
        { label: 'Stream Channels', status: 'error', icon: Monitor },
        { label: 'EPG Guide', status: 'error', icon: FileText },
      ]);
    } finally {
      setIsStatusLoading(false);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">Manage your account</p>
        </div>
        <Link 
          href="/dashboard/subscription"
          className="inline-flex items-center justify-center gap-2 bg-primary text-black px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          <Zap className="h-4 w-4" />
          <span className="hidden sm:inline">Upgrade Plan</span>
          <span className="sm:hidden">Upgrade</span>
        </Link>
      </div>

      {/* Subscription Card */}
      <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-white">Your Subscription</h2>
              {subscription && (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  subscription.status === 'ACTIVE' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {subscription.status}
                </span>
              )}
            </div>
            
            {subscription ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Plan</p>
                    <p className="text-lg font-bold text-primary truncate">{subscription.plan}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Devices</p>
                    <p className="text-lg font-bold text-white">{subscription.devicesUsed}/{subscription.deviceLimit}</p>
                  </div>
                  {subscription.endDate && (
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Expires</p>
                      <p className="text-sm font-medium text-white truncate">
                        {new Date(subscription.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">VOD</p>
                    <p className="text-lg font-bold text-green-400">120,000+</p>
                  </div>
                </div>

                {subscription.status === 'ACTIVE' && (
                  <div className="p-4 bg-black/40 rounded-lg">
                    <p className="text-sm text-gray-400">
                      Streaming credentials sent to your email after payment.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="text-gray-400">No active subscription.</p>
                <Link 
                  href="/dashboard/subscription" 
                  className="inline-flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-primary/90 whitespace-nowrap"
                >
                  <CreditCard className="h-4 w-4" />
                  Choose a Plan
                </Link>
              </div>
            )}
          </div>
          
          {subscription && (
            <div className="hidden lg:flex items-center justify-center w-28 h-28 rounded-full border-4 border-primary/30 bg-black/30">
              <Zap className="h-12 w-12 text-primary" />
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link 
              key={action.href}
              href={action.href}
              className="flex items-start gap-4 bg-black/40 border border-white/5 p-4 sm:p-5 rounded-xl hover:border-primary/30 hover:bg-white/5 transition-all duration-200 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-semibold truncate">{action.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-1">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Plan Features & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Details */}
        {subscription && (
          <div className="bg-black/40 border border-white/5 rounded-xl p-5 sm:p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Plan Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {planFeatures[subscription.plan]?.map((feature, index) => (
                <div key={index} className="flex items-center justify-between bg-black/30 rounded-lg p-3">
                  <span className="text-sm text-gray-400">{feature.label}</span>
                  <span className="text-sm font-semibold text-white">{feature.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Status */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-5 sm:p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            System Status
          </h3>
          <div className="space-y-3">
            {statusItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                  <span className="text-green-400 text-sm font-medium capitalize">{item.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}