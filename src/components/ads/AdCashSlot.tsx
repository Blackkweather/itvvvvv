'use client';

import { useEffect, useRef, useState } from 'react';

interface AdCashSlotProps {
  zoneId: string;
  siteId?: string;
  className?: string;
  label?: string;
  style?: React.CSSProperties;
}

export function AdCashSlot({ zoneId, siteId, className = '', label = 'Advertisement', style }: AdCashSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!zoneId) return;
    
    const loadAd = () => {
      const container = adRef.current;
      if (!container) return;

      // Use the AutoTag method directly
      if ((window as any).aclib) {
        try {
          (window as any).aclib.runAutoTag({ zoneId: zoneId });
          setIsLoaded(true);
        } catch (e) {
          console.error('AdCash AutoTag error:', e);
        }
      } else {
        // Load the anti-adblock library from CDN
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.aclibintelligence.com/lib.js';
        script.async = true;
        script.onload = () => {
          if ((window as any).aclib) {
            (window as any).aclib.runAutoTag({ zoneId: zoneId });
            setIsLoaded(true);
          }
        };
        script.onerror = () => {
          console.error('Failed to load AdCash library');
        };
        document.head.appendChild(script);
      }
    };

    // Delay slightly to ensure page is ready
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, [zoneId, siteId]);

  if (!zoneId) return null;

  return (
    <div
      ref={adRef}
      className={`ad-cash-slot ${className}`}
      data-ad-status={isLoaded ? 'filled' : 'unfilled'}
      aria-label={label}
      style={style}
    />
  );
}

export function AdCashInArticleAd({ zoneId, siteId }: { zoneId: string; siteId?: string }) {
  return (
    <div className="my-8 not-prose">
      <AdCashSlot
        zoneId={zoneId}
        siteId={siteId}
        className="max-w-2xl mx-auto"
        label="In-article advertisement"
      />
    </div>
  );
}

export function AdCashSidebarAd({ zoneId, siteId }: { zoneId: string; siteId?: string }) {
  return (
    <div className="bg-muted/5 border border-border/20 rounded-lg p-4">
      <AdCashSlot
        zoneId={zoneId}
        siteId={siteId}
        className="w-full"
        label="Sidebar advertisement"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}
