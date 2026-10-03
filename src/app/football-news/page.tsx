import type { Metadata } from 'next';
import Link from 'next/link';
import { getFootballNews } from '@/lib/football-news';
import { FootballNewsFeed } from '@/components/home/FootballNewsFeed';

// Regenerate every 5 minutes so the page (and its structured data) stays current 24/7.
export const revalidate = 300;

const PAGE_URL = 'https://streampro.space/football-news';
// The root layout's title template appends "| StreamPro".
const TITLE = 'Live Football News 24/7 — Premier League, Champions League & Transfers';
const DESCRIPTION =
  'Live football news updated every 5 minutes from BBC Sport, Sky Sports, ESPN and The Guardian: Premier League, Champions League, La Liga, transfers, results and hot breaking stories.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'football news', 'live football news', 'soccer news today', 'Premier League news',
    'Champions League news', 'La Liga news', 'transfer news', 'football results',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: PAGE_URL,
    images: [{ url: 'https://streampro.space/og-image.png', width: 1200, height: 630, alt: 'StreamPro live football news' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://streampro.space/og-image.png'],
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
};

const FAQS = [
  {
    q: 'How often is this football news page updated?',
    a: 'Every 5 minutes, 24 hours a day. Stories are pulled automatically from BBC Sport, Sky Sports, ESPN and The Guardian, and the page refreshes itself while you read it.',
  },
  {
    q: 'What do the HOT and LIVE labels mean?',
    a: 'LIVE marks an ongoing live blog or match coverage. HOT marks the biggest stories right now — breaking news, confirmed transfers, managerial changes and big results.',
  },
  {
    q: 'Which leagues and teams are covered?',
    a: 'The Premier League, Champions League, Europa League, La Liga, Serie A, Bundesliga, Ligue 1, the World Cup and Nations League, plus clubs such as Real Madrid, Barcelona, Manchester City, Liverpool, Arsenal and PSG.',
  },
  {
    q: 'Where can I watch these matches live?',
    a: 'StreamPro includes beIN Sports, Sky Sports, DAZN, ESPN and every major league in one plan, in up to 4K on Smart TV, Fire Stick, phone and more.',
  },
];

export default async function FootballNewsPage() {
  const items = await getFootballNews(40).catch(() => []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${PAGE_URL}#page`,
        url: PAGE_URL,
        name: 'Live Football News 24/7',
        description: DESCRIPTION,
        inLanguage: 'en',
        dateModified: items[0]?.publishedAt ?? new Date().toISOString(),
        isPartOf: { '@type': 'WebSite', name: 'StreamPro', url: 'https://streampro.space' },
        about: { '@type': 'Thing', name: 'Association football' },
        mainEntity: { '@id': `${PAGE_URL}#list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${PAGE_URL}#list`,
        numberOfItems: items.length,
        itemListElement: items.slice(0, 20).map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'NewsArticle',
            headline: item.title.slice(0, 110),
            url: item.link,
            datePublished: item.publishedAt,
            ...(item.image ? { image: item.image } : {}),
            publisher: { '@type': 'Organization', name: item.source },
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://streampro.space' },
          { '@type': 'ListItem', position: 2, name: 'Football News', item: PAGE_URL },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        // Escape "<" so a headline can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <FootballNewsFeed initialItems={items} variant="page" />

      {/* Answer-first copy: gives search and AI engines plain text to quote. */}
      <section className="section-padding mx-auto max-w-4xl pb-20">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">About this football news feed</h2>
          <p className="mb-6 text-sm leading-relaxed text-[#c4c4c4] sm:text-base">
            StreamPro&apos;s football news page gathers the latest stories from BBC Sport, Sky Sports, ESPN and
            The Guardian in one place, updated every 5 minutes, 24/7. Stories are sorted by time and tagged by
            league, club and player, so you can filter to the Premier League, Champions League or your team in
            one tap. Live blogs are marked <strong className="text-red-400">LIVE</strong> and the biggest
            breaking stories are marked <strong className="text-orange-400">HOT</strong>. Every headline links
            to the original publisher.
          </p>

          <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">Frequently asked questions</h2>
          <dl className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q}>
                <dt className="mb-1 text-sm font-semibold text-white sm:text-base">{f.q}</dt>
                <dd className="text-sm leading-relaxed text-[#a0a0a0]">{f.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary/90"
            >
              Watch every match live
            </Link>
            <Link
              href="/best-iptv-live-sports-subscription-plan"
              className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-primary/60 hover:text-primary"
            >
              Live sports plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
