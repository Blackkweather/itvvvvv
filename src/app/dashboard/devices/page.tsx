'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconMonitor,
  IconSmartphone,
  IconTablet,
  IconTv,
  IconTrash2,
  IconLoader,
  IconAlertTriangle,
  IconCheckCircle,
  IconGlobe,
  IconClock
} from '@/components/ui/Icons';

interface Session {
  id: string;
  deviceName: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

function getDeviceIcon(userAgent: string | null): typeof IconMonitor {
  if (!userAgent) return IconMonitor;
  const ua = userAgent.toLowerCase();
  if (ua.includes('mobile') || ua.includes('android')) return IconSmartphone;
  if (ua.includes('tablet') || ua.includes('ipad')) return IconTablet;
  if (ua.includes('tv') || ua.includes('smarttv')) return IconTv;
  return IconMonitor;
}

function parseDeviceName(userAgent: string | null): string {
  if (!userAgent) return 'Unknown Device';
  if (userAgent.includes('Chrome')) return 'Chrome Browser';
  if (userAgent.includes('Firefox')) return 'Firefox Browser';
  if (userAgent.includes('Safari')) return 'Safari Browser';
  if (userAgent.includes('Edge')) return 'Edge Browser';
  if (userAgent.includes('Android')) return 'Android Device';
  if (userAgent.includes('iPhone')) return 'iPhone';
  if (userAgent.includes('iPad')) return 'iPad';
  if (userAgent.includes('SmartTV')) return 'Smart TV';
  return 'Unknown Device';
}

export default function DevicesPage() {
  const { subscription } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceLimit, setDeviceLimit] = useState(1);
  const [devicesUsed, setDevicesUsed] = useState(0);
  const [disconnectingId, setDisconnectingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/devices');
      const data = await res.json();
      if (data.success) {
        setSessions(data.data.sessions);
        setDeviceLimit(data.data.deviceLimit);
        setDevicesUsed(data.data.devicesUsed);
      }
    } catch (error) {
      console.error('Failed to fetch devices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectDevice = async (sessionId: string) => {
    setDisconnectingId(sessionId);
    setMessage(null);
    
    try {
      const res = await fetch(`/api/devices?id=${sessionId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Device disconnected successfully' });
        await fetchDevices();
      } else {
        setMessage({ type: 'error', text: data.error?.message || 'Failed to disconnect device' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setDisconnectingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Devices</h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">Manage your connected devices</p>
        </div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg text-sm ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          <div className="flex items-center gap-3">
            {message.type === 'success' ? (
              <IconCheckCircle className="h-5 w-5" />
            ) : (
              <IconAlertTriangle className="h-5 w-5" />
            )}
            <span>{message.text}</span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <IconMonitor className="h-5 w-5 text-primary" />
            </div>
            <span className="text-gray-400 text-sm">Devices Used</span>
          </div>
          <p className="text-2xl font-bold text-white">{devicesUsed} / {deviceLimit}</p>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <IconCheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <span className="text-gray-400 text-sm">Available</span>
          </div>
          <p className="text-2xl font-bold text-white">{Math.max(0, deviceLimit - devicesUsed)}</p>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <IconAlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <span className="text-gray-400 text-sm">Device Limit</span>
          </div>
          <p className="text-2xl font-bold text-white">{deviceLimit}</p>
        </div>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-lg font-bold text-white">Connected Devices</h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <IconLoader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <IconMonitor className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No devices connected</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            <AnimatePresence>
              {sessions.map((session) => {
                const DeviceIcon = getDeviceIcon(session.userAgent);
                const deviceName = session.deviceName || parseDeviceName(session.userAgent);
                const isCurrentSession = true;
                
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 sm:p-5 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                          <DeviceIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white flex items-center gap-2">
                            {deviceName}
                            {isCurrentSession && (
                              <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs">
                                Current
                              </span>
                            )}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                            {session.ipAddress && (
                              <span className="flex items-center gap-1">
                                <IconGlobe className="h-3 w-3" />
                                {session.ipAddress}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <IconClock className="h-3 w-3" />
                              {formatDate(session.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {!isCurrentSession && (
                        <button
                          onClick={() => disconnectDevice(session.id)}
                          disabled={disconnectingId === session.id}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400 disabled:opacity-50"
                        >
                          {disconnectingId === session.id ? (
                            <IconLoader className="h-5 w-5 animate-spin" />
                          ) : (
                            <IconTrash2 className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}