'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconCreditCard,
  IconDownload,
  IconCheckCircle,
  IconAlertTriangle,
  IconClock,
  IconLoader,
  IconDollarSign
} from '@/components/ui/Icons';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  description: string;
  createdAt: string;
}

export default function BillingPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/billing');
      const data = await res.json();
      if (data.success) {
        setPayments(data.data.payments);
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      COMPLETED: 'bg-green-500/20 text-green-400',
      PENDING: 'bg-yellow-500/20 text-yellow-400',
      PROCESSING: 'bg-blue-500/20 text-blue-400',
      FAILED: 'bg-red-500/20 text-red-400',
      REFUNDED: 'bg-gray-500/20 text-gray-400',
    };
    return styles[status] || 'bg-gray-500/20 text-gray-400';
  };

  const getMethodIcon = (method: string) => {
    return <IconCreditCard className="h-5 w-5" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalSpent = payments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Billing</h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">Manage your payments and invoices</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <IconDollarSign className="h-5 w-5 text-primary" />
            </div>
            <span className="text-gray-400 text-sm">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-white">${totalSpent.toFixed(2)}</p>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <IconCheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <span className="text-gray-400 text-sm">Completed</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {payments.filter(p => p.status === 'COMPLETED').length}
          </p>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <IconClock className="h-5 w-5 text-yellow-400" />
            </div>
            <span className="text-gray-400 text-sm">Pending</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {payments.filter(p => p.status === 'PENDING').length}
          </p>
        </div>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-lg font-bold text-white">Payment History</h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <IconLoader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <IconCreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No payment history yet</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            <AnimatePresence>
              {payments.map((payment) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 sm:p-5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        {getMethodIcon(payment.method)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">{payment.description || 'Payment'}</p>
                        <p className="text-sm text-gray-400">
                          {payment.method.replace('_', ' ')} • {formatDate(payment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-white">
                          ${payment.amount.toFixed(2)} {payment.currency}
                        </p>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                      {payment.status === 'COMPLETED' && (
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                          <IconDownload className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}