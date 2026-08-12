'use client';

import { useSyncExternalStore } from 'react';

export type Currency = 'USD' | 'EUR';

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
};

// The IP-detected result is cached per browser session so navigating between
// pages doesn't re-hit the lookup API on every mount.
const SESSION_KEY = 'sp_currency_ip';

function readStored(): Currency | null {
  try {
    const v = sessionStorage.getItem(SESSION_KEY);
    return v === 'USD' || v === 'EUR' ? v : null;
  } catch {
    return null;
  }
}

function detectFromTimezone(): Currency {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return timeZone.startsWith('Europe/') ? 'EUR' : 'USD';
  } catch {
    return 'USD';
  }
}

/* ------------------------------------------------------------------ *
 * Module-level store. Kept outside React so the lookup runs once per
 * page load no matter how many components read the currency.
 * ------------------------------------------------------------------ */

let current: Currency | null = null;
let lookupStarted = false;
const listeners = new Set<() => void>();

function getSnapshot(): Currency {
  // Resolved lazily on first client read: session cache, else timezone guess.
  if (current === null) {
    current = readStored() ?? detectFromTimezone();
  }
  return current;
}

// The server — and the first client render — always say USD, so the markup
// matches and hydration never mismatches. React swaps in the real client
// snapshot immediately after.
function getServerSnapshot(): Currency {
  return 'USD';
}

function set(next: Currency) {
  if (next === current) return;
  current = next;
  listeners.forEach((l) => l());
}

function startLookup() {
  if (lookupStarted) return;
  lookupStarted = true;

  // Already known for this session — no network call needed.
  if (readStored()) return;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 3000);

  fetch('https://ipapi.co/json/', { signal: controller.signal })
    .then((res) => (res.ok ? res.json() : null))
    .then((data: { continent_code?: string } | null) => {
      if (!data) return;
      const detected: Currency = data.continent_code === 'EU' ? 'EUR' : 'USD';
      try {
        sessionStorage.setItem(SESSION_KEY, detected);
      } catch {
        // ignore storage errors (private browsing, etc.)
      }
      set(detected);
    })
    .catch(() => {
      // Offline, rate-limited, blocked by an ad/privacy extension, or timed
      // out — silently keep the timezone guess. Nothing depends on this.
    })
    .finally(() => window.clearTimeout(timeout));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  startLookup();
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Currency is detected, never chosen — there is no toggle anywhere in the UI.
 *
 * It resolves instantly from the browser timezone (Europe/* -> EUR), then
 * upgrades to a real client-side IP lookup. Only the symbol changes by
 * region: the price numbers are identical everywhere, so a wrong guess is
 * purely cosmetic.
 */
export function useCurrency(): { currency: Currency; symbol: string } {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { currency, symbol: CURRENCY_SYMBOL[currency] };
}
