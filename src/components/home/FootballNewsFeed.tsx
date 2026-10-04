'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Flame, Newspaper, Radio, ArrowUpRight } from 'lucide-react';
import type { NewsItem } from '@/lib/football-news';

const POLL_MS = 120_000;
const ALL = 'All';
const HOT = 'Hot';

// Minute-resolution clock. The server snapshot is null so relative times only
// render on the client and hydration never mismatches.
function subscribeClock(onTick: () => void) {
  const id = window.setInterval(onTick, 30_000);
  return () => window.clearInterval(id);
}
const getMinute = () => Math.floor(Date.now() / 60_000) * 60_000;
const getServerMinute = () => null;

function timeAgo(iso: string, now: number | null): string {
  // `now` is null until mount so server and client markup match.
  if (now === null) return '';
  const mins = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60_000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

// BBC's ichef CDN serves any width, so let the browser pick a sharp one for its slot.
const BBC_WIDTH = /(ichef\.bbci\.co\.uk\/ace\/standard\/)\d+\//;
const BBC_IC = /(ichef\.bbci\.co\.uk\/images\/ic\/)\d+x\d+\//;
function srcSetFor(src: string): string | undefined {
  const widths = [480, 800, 1024, 1536, 2048];
  if (BBC_WIDTH.test(src)) return widths.map((w) => `${src.replace(BBC_WIDTH, `$1${w}/`)} ${w}w`).join(', ');
  if (BBC_IC.test(src)) return widths.map((w) => `${src.replace(BBC_IC, `$1${w}x${Math.round((w * 9) / 16)}/`)} ${w}w`).join(', ');
  return undefined;
}

function NewsImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
}: {
  src: string | null;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-primary/15 via-white/[0.03] to-transparent`}>
        <Newspaper className="h-8 w-8 text-primary/40" />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote RSS hosts vary, skip the optimizer
    <img
      src={src}
      srcSet={srcSetFor(src)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${className} object-cover`}
    />
  );
}

function Badges({ item }: { item: NewsItem }) {
  if (item.live) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        Live
      </span>
    );
  }
  if (item.hot) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
        <Flame className="h-2.5 w-2.5" />
        Hot
      </span>
    );
  }
  return null;
}

function HotTicker({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;
  // Repeat so the -50% loop in .ticker-track never shows a gap.
  const loop = items.length < 4 ? [...items, ...items, ...items, ...items] : [...items, ...items];

  return (
    <div className="relative mb-8 overflow-hidden rounded-xl border border-orange-500/25 bg-gradient-to-r from-red-950/40 via-black/60 to-orange-950/30 py-3">
      <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black/80 to-transparent" />
      <div className="flex items-center">
        <div className="z-20 flex shrink-0 items-center gap-2 bg-black/70 px-4 py-1">
          <Flame className="h-4 w-4 animate-pulse text-orange-500" />
          <span className="text-xs font-black uppercase tracking-widest text-orange-400">Hot now</span>
        </div>
        <div className="ticker-track">
          {loop.map((item, i) => (
            <a
              key={`${item.id}-${i}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex shrink-0 items-center gap-2 text-xs text-white/85 hover:text-primary"
            >
              {item.live ? (
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              ) : (
                <Flame className="h-3 w-3 text-orange-500" />
              )}
              <span className="font-medium">{item.title}</span>
              <span className="text-white/30">•</span>
              <span className="text-primary">{item.source}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FootballNewsFeedProps {
  initialItems: NewsItem[];
  /** 'page' = the full /football-news page (h1, every story); 'teaser' = home page preview. */
  variant?: 'page' | 'teaser';
}

export function FootballNewsFeed({ initialItems, variant = 'teaser' }: FootballNewsFeedProps) {
  const isPage = variant === 'page';
  const Heading = isPage ? 'h1' : 'h2';
  const reduceMotion = useReducedMotion();
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState(ALL);
  const now = useSyncExternalStore(subscribeClock, getMinute, getServerMinute);

  // Poll for fresh stories; pause while the tab is hidden.
  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      if (document.visibilityState !== 'visible') return;
      try {
        const res = await fetch('/api/football-news', { cache: 'no-store' });
        const json = await res.json();
        const next: NewsItem[] | undefined = json?.data?.items;
        if (!cancelled && next && next.length > 0) setItems(next);
      } catch {
        // Network hiccup — keep showing what we have.
      }
    };

    if (initialItems.length === 0) refresh();

    const poll = window.setInterval(refresh, POLL_MS);
    const onVisible = () => document.visibilityState === 'visible' && refresh();
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [initialItems.length]);

  const hotItems = useMemo(
    () => items.filter((i) => i.hot).sort((a, b) => Number(b.live) - Number(a.live) || b.score - a.score),
    [items]
  );

  // Most-mentioned keywords become filter chips.
  const chips = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((i) => i.keywords.forEach((k) => counts.set(k, (counts.get(k) ?? 0) + 1)));
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k]) => k);
    return [ALL, ...(hotItems.length ? [HOT] : []), ...top];
  }, [items, hotItems.length]);

  const visible = useMemo(() => {
    if (filter === HOT) return hotItems;
    if (filter === ALL) return items;
    return items.filter((i) => i.keywords.includes(filter));
  }, [filter, items, hotItems]);

  const featured = filter === ALL ? hotItems[0] ?? items[0] : visible[0];
  const rest = visible.filter((i) => i !== featured).slice(0, isPage ? 40 : 5);

  if (items.length === 0) return null;

  return (
    <section
      id="football-news"
      className={`relative overflow-hidden ${isPage ? 'pb-16 pt-28 sm:pt-32' : 'py-16 sm:py-20 md:py-24'}`}
      aria-label="Football news"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(239,68,68,0.06),transparent_45%)]" />

      <div className="section-padding relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <Radio className="h-3.5 w-3.5 animate-pulse text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80">
                Football news · 24/7
              </span>
            </div>
            <Heading className="text-3xl font-black uppercase leading-[0.9] tracking-tighter sm:text-4xl md:text-5xl">
              {isPage ? (
                <>Football news <span className="text-primary">live, 24/7</span></>
              ) : (
                <>The latest from <span className="text-primary">the pitch</span></>
              )}
            </Heading>
          </div>
          <p className="text-xs text-[#a0a0a0]">BBC Sport · Sky Sports · ESPN · The Guardian</p>
        </div>

        <HotTicker items={hotItems.slice(0, 10)} />

        {/* Keyword filters */}
        <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => setFilter(chip)}
              aria-pressed={filter === chip}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === chip
                  ? chip === HOT
                    ? 'border-orange-500 bg-orange-500/15 text-orange-400'
                    : 'border-primary/70 bg-primary/10 text-primary'
                  : 'border-white/10 bg-white/[0.03] text-[#d4d4d4] hover:border-white/25'
              }`}
            >
              {chip === HOT && <Flame className="h-3 w-3" />}
              {chip}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid gap-4 lg:grid-cols-3"
          >
            {/* Featured story */}
            {featured && (
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`group relative overflow-hidden rounded-2xl border bg-white/[0.02] lg:col-span-2 lg:row-span-3 lg:min-h-[440px] ${
                  featured.hot ? 'border-orange-500/40 shadow-[0_20px_60px_-30px_rgba(249,115,22,0.5)]' : 'border-white/10'
                }`}
              >
                <NewsImage
                  src={featured.image}
                  alt={featured.title}
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  priority
                  className="aspect-[16/9] w-full transition-transform duration-700 group-hover:scale-[1.03] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                />
                <div className="relative p-5 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-gradient-to-t lg:from-black lg:via-black/85 lg:to-transparent lg:p-7 lg:pt-24">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badges item={featured} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">{featured.source}</span>
                    <span className="text-[11px] text-[#a0a0a0]">{timeAgo(featured.publishedAt, now)}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold leading-tight text-white group-hover:text-primary sm:text-2xl lg:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-[#c4c4c4]">{featured.summary}</p>
                </div>
              </a>
            )}

            {/* The rest */}
            {rest.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`group flex gap-3 rounded-xl border bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04] ${
                  item.hot ? 'border-orange-500/30' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <NewsImage src={item.image} alt="" sizes="160px" className="h-24 w-32 shrink-0 rounded-lg" />
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    <Badges item={item} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">{item.source}</span>
                    <span className="text-[10px] text-[#a0a0a0]">{timeAgo(item.publishedAt, now)}</span>
                  </div>
                  <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-white group-hover:text-primary">
                    {item.title}
                  </h3>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/20 group-hover:text-primary" />
              </a>
            ))}

            {visible.length === 0 && (
              <p className="py-10 text-center text-sm text-[#a0a0a0] lg:col-span-3">No stories for this filter right now.</p>
            )}
          </motion.div>
        </AnimatePresence>

        {!isPage && (
          <div className="mt-8 text-center">
            <Link
              href="/football-news"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-primary/60 hover:text-primary"
            >
              All football news
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
