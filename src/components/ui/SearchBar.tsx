'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({ 
  placeholder = 'Search for content...',
  onSearch,
  className = ''
}: { 
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsSearching(false);
  };

  return (
    <div className={`relative w-full max-w-xl ${className}`}>
      <form 
        onSubmit={handleSubmit}
        className="flex items-center space-x-2"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground/50">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`block w-full pl-10 pr-4 py-3 
              bg-background/60 backdrop-blur-sm 
              border border-white/10 
              rounded-xl 
              text-primary 
              placeholder-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-primary/20
              focus:border-transparent
              transition-all duration-300
              ${isFocused ? 'shadow-lg' : ''}
              ${isSearching ? 'animate-pulse' : ''}
            `}
          />
          {query.trim() && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-primary/70 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {!isSearching && (
          <button
            type="submit"
            disabled={!query.trim()}
            className={`ml-2 px-4 py-3 bg-primary/90 backdrop-blur-sm 
              text-primary-foreground 
              rounded-xl 
              hover:bg-primary/80 
              transition-all duration-300
              flex items-center justify-center
              ${!query.trim() ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            Search
          </button>
        )}
        {isSearching && (
          <div className="ml-2 h-8 w-8 flex items-center justify-center">
            <div className="h-4 w-4 border-2 border-primary/50 border-t-transparent rounded-full animate-spin duration-1000" />
          </div>
        )}
      </form>
    </div>
  );
}