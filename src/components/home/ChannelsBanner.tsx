import Image from 'next/image';
import Link from 'next/link';
import { Tv, Trophy, Film } from 'lucide-react';

const LOGO_DIR = '/images/streaming-logos';

const SPORTS = [
  { name: 'beIN Sports', file: 'bein-sports-logo.png' },
  { name: 'Sky Sports', file: 'sky-sports-logo.png' },
  { name: 'Premier League', file: 'new-premier-league-2016-17-seeklogo.png' },
  { name: 'UEFA Champions League', file: 'uefa-champions-league-seeklogo.png' },
  { name: 'UEFA Europa League', file: 'uefa-europa-league-logo.png', tall: true },
  { name: 'FIFA', file: 'fifa-logo.png' },
  { name: 'LaLiga', file: 'laliga-seeklogo.png' },
  { name: 'Serie A', file: 'serie-a-logo.png', tall: true },
  { name: 'Bundesliga', file: 'bundesliga-logo.png', tall: true },
  { name: 'Ligue 1', file: 'ligue-1-logo.png', tall: true },
  { name: 'DAZN', file: 'dazn-logo.png', tall: true },
  { name: 'ESPN', file: 'espn-seeklogo.png' },
  { name: 'NBA', file: 'nba-seeklogo.png' },
  { name: 'NFL', file: 'nfl-seeklogo.png', tall: true },
  { name: 'NHL', file: 'nhl-logo.png', tall: true },
  { name: 'MLB', file: 'major-league-baseball-seeklogo.png' },
  { name: 'MLS', file: 'mls-logo.png', tall: true },
  { name: 'NCAA', file: 'ncaa-logo.png', tall: true },
  { name: 'UFC', file: 'ufc-seeklogo.png' },
  { name: 'PFL', file: 'pfl-logo.png', tall: true },
  { name: 'WWE', file: 'wwe-logo.png', tall: true },
  { name: 'Top Rank Boxing', file: 'top-rank-logo.png' },
  { name: 'Formula 1', file: 'formula-1-seeklogo.png' },
  { name: 'MotoGP', file: 'motogp-2007-seeklogo.png' },
  { name: 'ATP Tour', file: 'atp-tour-logo.png' },
  { name: 'PGA Tour', file: 'pga-tour-logo.png', tall: true },
  { name: 'ICC Cricket', file: 'icc-logo.png' },
  { name: 'Six Nations Rugby', file: 'six-nations-logo.png' },
];

const ENTERTAINMENT = [
  { name: 'Netflix', file: 'netflix-seeklogo.png' },
  { name: 'HBO', file: 'hbo-seeklogo.png' },
  { name: 'Prime Video', file: 'amazon-prime-video-seeklogo.png' },
  { name: 'Apple TV', file: 'apple-tv-seeklogo.png' },
  { name: 'Disney Channel', file: 'disney-channel-seeklogo.png' },
  { name: 'Hulu', file: 'hulu-seeklogo.png' },
  { name: 'Paramount', file: 'paramount-seeklogo.png' },
  { name: 'Discovery', file: 'discovery-channel-seeklogo.png' },
  { name: 'National Geographic', file: 'national-geographic-logo.png' },
  { name: 'CNN', file: 'cnn-seeklogo.png' },
  { name: 'BBC News', file: 'bbc-news-seeklogo.png' },
  { name: 'fuboTV', file: 'fubotv-seeklogo.png' },
  { name: 'CuriosityStream', file: 'curiositystream-logo.png' },
];

const STATS = [
  { icon: Tv, value: '30,000+', label: 'Live channels' },
  { icon: Trophy, value: 'Every', label: 'League & PPV' },
  { icon: Film, value: '120,000+', label: 'Movies & series' },
];

function LogoRow({ logos, reverse = false }: { logos: typeof SPORTS; reverse?: boolean }) {
  // Duplicated so the -50% ticker loop is seamless.
  const loop = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
      <div
        className="ticker-track py-2"
        // Scale duration with logo count so every row scrolls at the same speed
        style={{ animationDuration: `${logos.length * 4}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {loop.map((logo, i) => (
          <div
            key={`${logo.file}-${i}`}
            className="flex h-16 w-36 shrink-0 items-center justify-center px-4 sm:h-20 sm:w-44"
            aria-hidden={i >= logos.length}
          >
            <Image
              src={`${LOGO_DIR}/${logo.file}`}
              alt={i < logos.length ? logo.name : ''}
              width={140}
              height={56}
              className={`w-auto max-w-full object-contain ${logo.tall ? 'h-12 sm:h-14' : 'h-9 sm:h-11'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChannelsBanner() {
  return (
    <section id="channels" className="relative overflow-hidden py-16 sm:py-20" aria-label="Channels included">
      <div className="section-padding relative z-10 mx-auto mb-10 max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter sm:text-4xl md:text-5xl">
              Every channel. <span className="text-primary">One plan.</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-6 sm:gap-10">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <s.icon className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-lg font-bold leading-none tabular-nums text-white">{s.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#a0a0a0]">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <LogoRow logos={SPORTS} />
        <LogoRow logos={ENTERTAINMENT} reverse />
      </div>

      <div className="section-padding mt-10 text-center">
        <Link
          href="#pricing"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-primary/90"
        >
          Get all channels
        </Link>
      </div>
    </section>
  );
}
