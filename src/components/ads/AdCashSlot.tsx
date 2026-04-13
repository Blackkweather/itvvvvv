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
    if (!zoneId || !siteId) return;
    
    const loadAd = () => {
      try {
        const hostname = window.location.hostname;
        
        // Load AdCash script
        if (!(window as any).AdCashScriptLoaded) {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://adcash.com/script/showad/ct/?h=${encodeURIComponent(hostname)}&sid=${siteId}`;
          script.async = true;
          script.onload = () => {
            (window as any).AdCashScriptLoaded = true;
          };
          script.onerror = () => {
            console.error('AdCash script failed to load');
          };
          document.head.appendChild(script);
        }

        // Create ad container
        if (adRef.current && !adRef.current.querySelector('.adcash-container')) {
          const container = document.createElement('div');
          container.className = 'adcash-container';
          container.setAttribute('data-adcash-zone', zoneId);
          adRef.current.appendChild(container);
          
          // Trigger ad display after script loads
          setTimeout(() => {
            if ((window as any).AdCash) {
              try {
                (window as any).AdCash.showAd({
                  zoneId: zoneId,
                  container: container
                });
                setIsLoaded(true);
              } catch (e) {
                console.error('AdCash showAd error:', e);
              }
            }
          }, 500);
        }
      } catch (err) {
        console.error('AdCash error:', err);
      }
    };

    loadAd();
  }, [zoneId, siteId]);

  if (!zoneId || !siteId) return null;

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
