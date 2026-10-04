'use client';

import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';

// Must match the key read by the inline consent script in app/layout.tsx
const STORAGE_KEY = 'cookie_consent';
const OPEN_EVENT = 'open-cookie-settings';

type Choice = 'granted' | 'denied';

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {}
}

type QueueFn = ((...args: unknown[]) => void) & { q?: unknown[] };

type TrackingWindow = Window & {
  dataLayer?: unknown[];
  gtag?: QueueFn;
  clarity?: QueueFn;
  aclib?: { runAutoTag: (opts: { zoneId: string }) => void };
};

function updateGoogleConsent(choice: Choice) {
  const w = window as TrackingWindow;
  const dataLayer = (w.dataLayer = w.dataLayer || []);
  // gtag must push the Arguments object itself, not an array
  // eslint-disable-next-line prefer-rest-params
  const gtag = w.gtag || function () { dataLayer.push(arguments); };
  gtag('consent', 'update', {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
  dataLayer.push({ event: choice === 'granted' ? 'cookie_consent_granted' : 'cookie_consent_denied' });
}

function injectScript(id: string, src: string, attrs: Record<string, string> = {}, onLoad?: () => void) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  if (onLoad) script.onload = onLoad;
  document.head.appendChild(script);
}

// Third-party scripts that don't follow Google Consent Mode: only loaded after the user accepts
function loadConsentedScripts() {
  const w = window as TrackingWindow;

  // Microsoft Clarity (queue stub from the official snippet)
  if (!w.clarity) {
    const clarity: QueueFn = function () {
      // eslint-disable-next-line prefer-rest-params
      (clarity.q = clarity.q || []).push(arguments);
    };
    w.clarity = clarity;
  }
  injectScript('clarity-script', 'https://www.clarity.ms/tag/vtt176g0uw');

  // Google AdSense
  injectScript(
    'adsense-script',
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7398682838063782',
    { crossorigin: 'anonymous' },
  );

  // Autotag Library
  injectScript('aclib-script', 'https://aclib.acintelligence.com/aclib-min.js', {}, () => {
    w.aclib?.runAutoTag({ zoneId: 'zusoe0fva9' });
  });
}

const noopSubscribe = () => () => {};

export function CookieConsent() {
  // false during SSR and hydration, true afterwards, so localStorage is only read on the client
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [decided, setDecided] = useState(false);
  const [reopened, setReopened] = useState(false);

  const open = reopened || (hydrated && !decided && readChoice() === null);

  useEffect(() => {
    if (readChoice() === 'granted') loadConsentedScripts();

    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = (choice: Choice) => {
    const previous = readChoice();
    saveChoice(choice);
    updateGoogleConsent(choice);
    if (choice === 'granted') {
      loadConsentedScripts();
    } else if (previous === 'granted') {
      // Scripts already loaded can't be unloaded; reload so they stop running
      window.location.reload();
    }
    setDecided(true);
    setReopened(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[110] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/[0.08] bg-[#0a0a0f]/95 p-5 shadow-2xl backdrop-blur-md sm:flex sm:items-center sm:gap-6">
        <div className="flex-1">
          <h2 id="cookie-consent-title" className="text-sm font-semibold text-[#f0f0f0]">
            We value your privacy
          </h2>
          <p id="cookie-consent-desc" className="mt-1 text-xs leading-relaxed text-[#a0a0a0]">
            We use cookies for analytics and advertising to improve your experience. You can accept or reject
            non-essential cookies.{' '}
            <Link href="/legal/privacy-policy" className="inline min-h-0 underline underline-offset-2 hover:text-[#f0f0f0]">
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="mt-4 flex gap-3 sm:mt-0 sm:shrink-0">
          <button
            type="button"
            onClick={() => decide('denied')}
            className="flex-1 rounded-lg border border-white/[0.12] px-4 py-2 text-sm font-medium text-[#f0f0f0] transition-colors hover:bg-white/[0.06] sm:flex-none"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className="flex-1 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#1e1b15] transition-opacity hover:opacity-90 sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Cookie Settings
    </button>
  );
}
