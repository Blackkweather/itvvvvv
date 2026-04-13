'use client';

import { useEffect, useRef, useState } from 'react';

interface AdCashSlotProps {
  zoneId: string;
  className?: string;
  label?: string;
  style?: React.CSSProperties;
}

export function AdCashSlot({ zoneId, className = '', label = 'Advertisement', style }: AdCashSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      // Load AdCash script if not already loaded
      if (!(window as any).AdCash) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://adcash.com/script/showad/ct/?h=' + encodeURIComponent(window.location.hostname);
        script.async = true;
        script.onerror = () => setHasError(true);
        document.head.appendChild(script);
      }

      // Display the ad
      if (adRef.current) {
        const adScript = document.createElement('script');
        adScript.type = 'text/javascript';
        adScript.innerHTML = `
          if (typeof AdCash !== 'undefined') {
            AdCash.showAd({
              zoneId: ${zoneId},
              type: 'banner'
            });
          }
        `;
        adRef.current.appendChild(adScript);
        setIsLoaded(true);
      }
    } catch (err) {
      console.error('AdCash error:', err);
      setHasError(true);
    }
  }, [zoneId]);

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

export function AdCashInArticleAd({ zoneId }: { zoneId: string }) {
  return (
    <div className="my-8 not-prose">
      <AdCashSlot
        zoneId={zoneId}
        className="max-w-2xl mx-auto"
        label="In-article advertisement"
      />
    </div>
  );
}

export function AdCashSidebarAd({ zoneId }: { zoneId: string }) {
  return (
    <div className="bg-muted/5 border border-border/20 rounded-lg p-4">
      <AdCashSlot
        zoneId={zoneId}
        className="w-full"
        label="Sidebar advertisement"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}
