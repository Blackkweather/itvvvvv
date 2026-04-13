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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!zoneId) return;
    
    const loadAd = async () => {
      try {
        const hostname = window.location.hostname;
        
        if (!(window as any).AdCash) {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://adcash.com/script/showad/ct/?h=${encodeURIComponent(hostname)}&sid=${siteId || ''}`;
          script.async = true;
          script.onload = () => console.log('AdCash script loaded');
          script.onerror = () => {
            console.error('AdCash script failed to load');
            setHasError(true);
          };
          document.head.appendChild(script);
        }

        if (adRef.current) {
          adRef.current.innerHTML = '';
          
          const adFrame = document.createElement('iframe');
          adFrame.style.width = '100%';
          adFrame.style.minHeight = '280px';
          adFrame.style.border = 'none';
          adFrame.src = `https://adcash.com/script/showad/ct/?h=${encodeURIComponent(hostname)}&z=${zoneId}&sid=${siteId || ''}`;
          adFrame.setAttribute('loading', 'lazy');
          
          adRef.current.appendChild(adFrame);
          setIsLoaded(true);
        }
      } catch (err) {
        console.error('AdCash error:', err);
        setHasError(true);
      }
    };

    loadAd();
  }, [zoneId, siteId]);

  if (!zoneId) return null;
  if (hasError) return null;

  return (
    <div
      ref={adRef}
      className={`ad-cash-slot ${className}`}
      data-ad-status={isLoaded ? 'filled' : 'unfilled'}
      aria-label={label}
      style={style}
    >
      {!isLoaded && (
        <div className="ad-placeholder flex items-center justify-center py-8 text-xs text-muted-foreground border border-dashed border-border/30 rounded-lg bg-muted/10">
          <span>Advertisement</span>
        </div>
      )}
    </div>
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
