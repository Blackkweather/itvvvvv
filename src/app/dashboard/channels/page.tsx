'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconSearch,
  IconTv,
  IconLoader,
  IconCheck,
  IconDownload,
  IconMenu,
  IconX,
  IconHd,
  Icon4k
} from '@/components/ui/Icons';

interface Channel {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  channelNumber: number | null;
  isHd: boolean;
  is4k: boolean;
  category: {
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function ChannelsPage() {
  const { subscription } = useAuth();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/channels');
      const data = await res.json();
      if (data.success) {
        setChannels(data.data);
        const uniqueCategories = [...new Map(data.data.map((c: Channel) => [c.category.slug, c.category])).values()] as Category[];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Failed to fetch channels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPlaylist = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch('/api/m3u');
      if (!res.ok) throw new Error('Failed to download');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'streampro_playlist.m3u';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const filteredChannels = channels.filter(channel => {
    const matchesCategory = selectedCategory === 'all' || channel.category.slug === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.category.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const hasActiveSubscription = subscription?.status === 'ACTIVE';

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Channels</h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Browse {channels.length} channels across {categories.length} categories
          </p>
        </div>
        
        {hasActiveSubscription && (
          <button
            onClick={downloadPlaylist}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-2 bg-primary text-black px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isDownloading ? (
              <IconLoader className="h-4 w-4 animate-spin" />
            ) : (
              <IconDownload className="h-4 w-4" />
            )}
            <span>Download M3U</span>
          </button>
        )}
      </div>

      {!hasActiveSubscription && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <p className="text-yellow-400 text-sm">
            Active subscription required to download playlists.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
        
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors lg:hidden"
        >
          <IconMenu className="h-5 w-5" />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`lg:col-span-1 ${filterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-2">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Categories</h3>
            
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              All Channels
              <span className="ml-2 text-gray-500">({channels.length})</span>
            </button>
            
            {categories.map((category) => {
              const count = channels.filter(c => c.category.slug === category.slug).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-gray-500">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <IconLoader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredChannels.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <IconTv className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No channels found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              <AnimatePresence mode="popLayout">
                {filteredChannels.map((channel) => (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-black/40 border border-white/5 rounded-xl p-3 hover:border-primary/30 hover:bg-white/5 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {channel.logoUrl ? (
                        <img 
                          src={channel.logoUrl} 
                          alt={channel.name}
                          className="w-8 h-8 rounded object-contain bg-black/20"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <IconTv className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        {channel.is4k && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs">
                            <Icon4k className="h-3 w-3 mr-0.5" />
                          </span>
                        )}
                        {channel.isHd && !channel.is4k && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 text-xs">
                            <IconHd className="h-3 w-3 mr-0.5" />
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs font-medium text-white truncate">{channel.name}</p>
                    <p className="text-xs text-gray-500 truncate">{channel.category.name}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}