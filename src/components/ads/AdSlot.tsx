'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'fluid';
  layout?: 'in-article' | 'in-feed' | 'responsive';
  className?: string;
  label?: string;
}

export function AdSlot({ slot, format = 'auto', layout = 'responsive', className = '', label }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      if ((window as any).adsbygoogle && adRef.current && !isLoaded) {
        (window as any).adsbygoogle.push({});
        setIsLoaded(true);
      }
    } catch (err) {
      setHasError(true);
    }
  }, [isLoaded]);

  if (hasError) return null;

  return (
    <div
      ref={adRef}
      className={`ad-slot ${className}`}
      data-ad-status={isLoaded ? 'filled' : 'unfilled'}
      aria-label={label || 'Advertisement'}
    >
      {!isLoaded && (
        <div className="ad-placeholder flex items-center justify-center py-8 text-xs text-muted-foreground border border-dashed border-border/30 rounded-lg bg-muted/10">
          <span>Advertisement</span>
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={layout === 'responsive' ? 'true' : 'false'}
      />
    </div>
  );
}

export function InArticleAd({ slot }: { slot: string }) {
  return (
    <div className="my-8 not-prose">
      <AdSlot
        slot={slot}
        format="auto"
        layout="in-article"
        className="max-w-2xl mx-auto"
        label="In-article advertisement"
      />
    </div>
  );
}

export function InFeedAd({ slot }: { slot: string }) {
  return (
    <div className="my-4">
      <AdSlot
        slot={slot}
        format="fluid"
        layout="in-feed"
        className="rounded-xl overflow-hidden"
        label="Sponsored content"
      />
    </div>
  );
}

export function StickyAd({ slot }: { slot: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-background/95 backdrop-blur-sm border-t border-border/20">
        <AdSlot
          slot={slot}
          format="fluid"
          layout="responsive"
          className="max-w-lg mx-auto px-4 py-2"
          label="Advertisement"
        />
      </div>
    </div>
  );
}
