'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, X, Search, Filter, ChevronRight, Star, Eye, Clock } from 'lucide-react';
import Link from 'next/link';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';

// Fallback static videos when API key is not configured
const FALLBACK_VIDEOS = [
  {
    id: { videoId: 'dQw4w9WgXcQ' },
    snippet: {
      title: 'StreamPro - Your Ultimate Streaming Experience',
      description: 'Discover premium IPTV streaming with thousands of channels worldwide.',
      thumbnails: { high: { url: 'https://images.unsplash.com/photo-1574375927938-d5a98e8efe85?w=640&q=80' } },
      channelTitle: 'StreamPro',
      publishedAt: '2026-01-15T00:00:00Z',
    },
  },
  {
    id: { videoId: '9bZkp7q19f0' },
    snippet: {
      title: 'Live Sports - Premier League Highlights',
      description: 'Watch the best moments from Premier League matches.',
      thumbnails: { high: { url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=640&q=80' } },
      channelTitle: 'StreamPro Sports',
      publishedAt: '2026-02-20T00:00:00Z',
    },
  },
  {
    id: { videoId: '3tmd-ClpJxR' },
    snippet: {
      title: 'Latest Blockbuster Movies 2026',
      description: 'Coming soon to StreamPro - the biggest movies of the year.',
      thumbnails: { high: { url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=640&q=80' } },
      channelTitle: 'StreamPro Movies',
      publishedAt: '2026-03-01T00:00:00Z',
    },
  },
  {
    id: { videoId: 'hT_nvWreIhg' },
    snippet: {
      title: 'UFC Fight Night - Highlights & Preview',
      description: 'All the action from the latest UFC events.',
      thumbnails: { high: { url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=640&q=80' } },
      channelTitle: 'StreamPro UFC',
      publishedAt: '2026-02-28T00:00:00Z',
    },
  },
  {
    id: { videoId: '2vjPBrBU-TM' },
    snippet: {
      title: 'NBA Finals 2026 - Game Highlights',
      description: 'Relive the best moments from the NBA Finals.',
      thumbnails: { high: { url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=640&q=80' } },
      channelTitle: 'StreamPro NBA',
      publishedAt: '2026-02-15T00:00:00Z',
    },
  },
  {
    id: { videoId: '7b9nflnz3wQ' },
    snippet: {
      title: 'F1 2026 Season Preview',
      description: 'Everything you need to know about the new F1 season.',
      thumbnails: { high: { url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=640&q=80' } },
      channelTitle: 'StreamPro F1',
      publishedAt: '2026-03-10T00:00:00Z',
    },
  },
  {
    id: { videoId: 'lXMskKTw3Bc' },
    snippet: {
      title: 'Netflix Originals - Coming Soon',
      description: 'Exclusive Netflix content streaming on StreamPro.',
      thumbnails: { high: { url: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=640&q=80' } },
      channelTitle: 'StreamPro TV',
      publishedAt: '2026-03-05T00:00:00Z',
    },
  },
  {
    id: { videoId: 'G8F7N8b1J8M' },
    snippet: {
      title: 'NFL Super Bowl 2026 Highlights',
      description: 'Watch the best moments from Super Bowl LXI.',
      thumbnails: { high: { url: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=640&q=80' } },
      channelTitle: 'StreamPro NFL',
      publishedAt: '2026-02-10T00:00:00Z',
    },
  },
];

// Category-based search queries for trailers
const CATEGORIES = [
  { id: 'movies', label: 'Movies', query: 'latest movie trailer 2026 official' },
  { id: 'sports', label: 'Sports', query: 'NFL highlights 2026' },
  { id: 'ufc', label: 'UFC', query: 'UFC highlights 2026' },
  { id: 'football', label: 'Football', query: 'Premier League highlights 2026' },
  { id: 'nba', label: 'NBA', query: 'NBA highlights 2026' },
  { id: 'f1', label: 'F1', query: 'Formula 1 highlights 2026' },
];

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { high: { url: string } };
    channelTitle: string;
    publishedAt: string;
  };
}

export default function TrailersPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('movies');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Video[]>([]);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim() && videos.length > 0) {
      const filtered = videos.filter(video => 
        video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.snippet.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setFilteredSuggestions(filtered);
      setShowSearchDropdown(filtered.length > 0);
    } else {
      setShowSearchDropdown(false);
      setFilteredSuggestions([]);
    }
  }, [searchQuery, videos]);

  // Fetch videos from YouTube API
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const category = CATEGORIES.find(c => c.id === activeCategory);
      const query = searchQuery || category?.query || 'trailer 2026';
      
      // Guard: Don't fetch if no API key configured - use fallback videos
      if (!YOUTUBE_API_KEY) {
        console.warn('YouTube API key not configured - using fallback videos');
        let fallbackVideos = [...FALLBACK_VIDEOS];
        
        // Apply category filter
        const category = CATEGORIES.find(c => c.id === activeCategory);
        if (category) {
          // Filter by category (simplified matching)
          fallbackVideos = fallbackVideos.filter(v => {
            const title = v.snippet.title.toLowerCase();
            const desc = v.snippet.description.toLowerCase();
            const cat = category.label.toLowerCase();
            return title.includes(cat) || desc.includes(cat) || 
                   (category.id === 'movies' && (title.includes('movie') || desc.includes('movie'))) ||
                   (category.id === 'sports' && (title.includes('sport') || desc.includes('sport'))) ||
                   (category.id === 'ufc' && title.includes('ufc')) ||
                   (category.id === 'football' && (title.includes('premier') || title.includes('league'))) ||
                   (category.id === 'nba' && title.includes('nba')) ||
                   (category.id === 'f1' && title.includes('f1'));
          });
          
          // If category filter results in empty, show all
          if (fallbackVideos.length === 0) {
            fallbackVideos = [...FALLBACK_VIDEOS];
          }
        }
        
        // Apply search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          fallbackVideos = fallbackVideos.filter(v => 
            v.snippet.title.toLowerCase().includes(query) ||
            v.snippet.description.toLowerCase().includes(query) ||
            v.snippet.channelTitle.toLowerCase().includes(query)
          );
        }
        
        setVideos(fallbackVideos);
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        if (data.items) {
          setVideos(data.items);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [activeCategory, searchQuery]);

  // Handle video selection
  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    // Force instant show and scroll to top
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close player
  const closePlayer = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.05] rounded-full blur-[150px]" />
        </div>
        
        <div className="section-padding relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
              StreamPro Trailers
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
              Watch <span className="gradient-text">Trailers</span>
            </h1>
            <p className="text-secondary-foreground max-w-xl mx-auto text-lg mb-8">
              Experience the latest movie trailers and sports highlights in our premium player. No buffering. Pure entertainment.
            </p>
            
            {/* Search Bar with Dropdown */}
            <div className="relative max-w-xl mx-auto">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search trailers, movies, sports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && filteredSuggestions.length > 0 && setShowSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                   className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-10 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/70 focus:bg-white/10 transition-all duration-300 shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              
              {/* Search Dropdown */}
              <AnimatePresence>
                {showSearchDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]"
                  >
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground px-3 mb-2 uppercase tracking-wider font-semibold">Suggestions</p>
                      {filteredSuggestions.map((video) => (
                        <button
                          key={video.id.videoId}
                          onClick={() => handleVideoSelect(video)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                        >
                          <img
                            src={video.snippet.thumbnails.high.url}
                            alt={video.snippet.title}
                            className="w-20 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-foreground text-sm font-medium truncate">{video.snippet.title}</p>
                            <p className="text-muted-foreground text-xs truncate">{video.snippet.channelTitle}</p>
                          </div>
                          <Play className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding pb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => { setActiveCategory(category.id); setSearchQuery(''); }}
              className={`px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-black'
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Videos Grid with Filtering */}
      <section className="section-padding pb-24">
        {/* Filter Info Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">Showing</span>
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">{videos.length}</span>
            <span className="text-muted-foreground text-sm">videos</span>
            {searchQuery && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  filtered by <span className="text-foreground font-medium">&quot;{searchQuery}&quot;</span>
                </span>
              </>
            )}
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <X className="h-4 w-4" /> Clear filter
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-white/5 rounded-xl mb-4" />
                <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video.id.videoId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
                onClick={() => handleVideoSelect(video)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="h-8 w-8 text-black ml-1" fill="black" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-medium">
                    <Clock className="h-3 w-3 inline mr-1" />
                    10:32
                  </div>
                </div>
                
                {/* Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {video.snippet.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{video.snippet.channelTitle}</span>
                    <span>{formatDate(video.snippet.publishedAt)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Custom Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={closePlayer}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Player Container */}
            <div className="w-full max-w-7xl mx-4 relative">
              {/* Video Player */}
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  ref={playerRef}
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.id.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="mt-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {selectedVideo.snippet.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {selectedVideo.snippet.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    StreamPro Player
                  </span>
                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    HD Quality
                  </span>
                  <span>{formatDate(selectedVideo.snippet.publishedAt)}</span>
                </div>
              </div>

              {/* Related Videos */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Up Next</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {videos.slice(0, 4).filter(v => v.id.videoId !== selectedVideo.id.videoId).map((video) => (
                    <div
                      key={video.id.videoId}
                      onClick={() => handleVideoSelect(video)}
                      className="cursor-pointer group"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                        <img
                          src={video.snippet.thumbnails.high.url}
                          alt={video.snippet.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <p className="text-sm text-white line-clamp-2 group-hover:text-primary transition-colors">
                        {video.snippet.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
