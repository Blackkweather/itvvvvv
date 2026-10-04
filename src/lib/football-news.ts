/**
 * Football news aggregator.
 *
 * Pulls several public football RSS feeds, keeps the stories that match our
 * keyword list (leagues, clubs, players the site sells), and flags "hot"
 * stories — live blogs, breaking news, big results — so the UI can surface
 * them in a fire strip. Fetches are cached by Next for NEWS_REVALIDATE
 * seconds, so the feed refreshes around the clock without a cron job.
 */

export const NEWS_REVALIDATE = 300; // 5 minutes

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  link: string;
  image: string | null;
  source: string;
  publishedAt: string; // ISO
  keywords: string[];
  hot: boolean;
  live: boolean;
  score: number;
}

const FEEDS: { source: string; url: string }[] = [
  { source: 'BBC Sport', url: 'https://feeds.bbci.co.uk/sport/football/rss.xml' },
  { source: 'Sky Sports', url: 'https://www.skysports.com/rss/11095' },
  { source: 'ESPN', url: 'https://www.espn.com/espn/rss/soccer/news' },
  { source: 'The Guardian', url: 'https://www.theguardian.com/football/rss' },
];

// Overridable with a comma-separated FOOTBALL_NEWS_KEYWORDS env var.
const DEFAULT_KEYWORDS = [
  'Premier League', 'Champions League', 'Europa League', 'La Liga', 'Serie A',
  'Bundesliga', 'Ligue 1', 'World Cup', 'Nations League', 'Euro 2028', 'FA Cup',
  'Carabao Cup', 'Club World Cup', 'MLS',
  'Real Madrid', 'Barcelona', 'Atletico', 'Man City', 'Manchester City',
  'Man Utd', 'Manchester United', 'Liverpool', 'Arsenal', 'Chelsea', 'Tottenham',
  'Newcastle', 'Aston Villa', 'PSG', 'Bayern', 'Dortmund', 'Juventus', 'Inter',
  'AC Milan', 'Napoli', 'Inter Miami',
  'Messi', 'Ronaldo', 'Mbappe', 'Mbappé', 'Haaland', 'Yamal', 'Salah',
  'Bellingham', 'Kane', 'Vinicius', 'Saka', 'Palmer',
  'England', 'Spain', 'France', 'Brazil', 'Argentina', 'Portugal', 'Morocco',
];

// Words that make a story "hot". Weighted: live/breaking count the most.
const HOT_TERMS: { term: RegExp; weight: number }[] = [
  { term: /\blive\b|\bas it happened\b/i, weight: 4 },
  { term: /\bbreaking\b|\bhere we go\b|\bconfirmed\b|\bofficial\b/i, weight: 3 },
  { term: /\bsacked\b|\bsacking\b|\bresigns?\b|\bappointed\b|\bnew (?:boss|manager|head coach)\b/i, weight: 3 },
  { term: /\bsigns?\b|\bsigning\b|\btransfer\b|\bdeal agreed\b|\bbid\b/i, weight: 2 },
  { term: /\bthrash(?:ed|es)?\b|\bstunning\b|\bhistoric\b|\brecord\b|\brampant\b|\bshock\b|\bupset\b|\bthriller\b|\bcomeback\b|\bhat-?trick\b/i, weight: 2 },
  { term: /\bfinal\b|\bderby\b|\bclasico\b|\bclásico\b|\btitle race\b/i, weight: 2 },
  { term: /\bred card\b|\bpenalty\b|\binjury\b|\binjured\b|\bruled out\b|\bVAR\b/i, weight: 1 },
  { term: /\d+-\d+/, weight: 1 }, // a scoreline in the headline
];

const HOT_THRESHOLD = 4;
const HOT_MAX_AGE_H = 12;
const FETCH_TIMEOUT_MS = 8000;

function getKeywords(): string[] {
  const fromEnv = process.env.FOOTBALL_NEWS_KEYWORDS;
  if (!fromEnv) return DEFAULT_KEYWORDS;
  return fromEnv.split(',').map((k) => k.trim()).filter(Boolean);
}

/* ------------------------------ RSS parsing ------------------------------ */

const ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  ndash: '–', mdash: '—', hellip: '…',
};

function decodeEntities(s: string): string {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[code.toLowerCase()] ?? m;
  });
}

function stripCdata(s: string): string {
  return s.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1');
}

function tag(xml: string, name: string): string {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? stripCdata(m[1]).trim() : '';
}

function attr(xml: string, tagName: string, attrName: string): string | null {
  const m = xml.match(new RegExp(`<${tagName}\\b[^>]*\\b${attrName}=["']([^"']+)["']`, 'i'));
  return m ? decodeEntities(m[1]) : null;
}

function cleanText(s: string): string {
  // Descriptions are HTML that may itself be entity-encoded (Guardian).
  return decodeEntities(decodeEntities(s).replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

// JS can't parse UK/European zone abbreviations, which Sky Sports uses.
const TZ_OFFSETS: Record<string, string> = {
  BST: '+0100', CET: '+0100', CEST: '+0200', IST: '+0100', WEST: '+0100',
};

function parseDate(raw: string): Date | null {
  if (!raw) return null;
  const fixed = raw.replace(/\b(BST|CEST|CET|IST|WEST)\b/, (z) => TZ_OFFSETS[z]);
  const d = new Date(fixed);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Feeds like the Guardian list several media:content sizes — take the widest.
function largestMediaContent(item: string): string | null {
  const tags = item.match(/<media:content\b[^>]*>/gi) ?? [];
  let best: { url: string; width: number } | null = null;
  for (const t of tags) {
    const url = attr(t, 'media:content', 'url');
    if (!url) continue;
    const width = Number(t.match(/\bwidth=["'](\d+)["']/i)?.[1] ?? 0);
    if (!best || width > best.width) best = { url, width };
  }
  return best?.url ?? null;
}

function pickImage(item: string): string | null {
  const url =
    largestMediaContent(item) ??
    attr(item, 'media:thumbnail', 'url') ??
    attr(item, 'enclosure', 'url') ??
    attr(item, 'img', 'src');
  if (!url || !/^https:\/\//.test(url)) return null;
  // BBC thumbnails come at 240px; ichef serves any width, the client picks via srcset.
  return url
    .replace(/(ichef\.bbci\.co\.uk\/ace\/standard\/)\d+\//, '$11024/')
    .replace(/(ichef\.bbci\.co\.uk\/images\/ic\/)\d+x\d+\//, '$11024x576/');
}

// ESPN's feed has no images — read the article's og:image (1296px) instead.
// Cached for a day per article, so this only runs once per new story.
async function fetchOgImage(link: string): Promise<string | null> {
  try {
    const res = await fetch(link, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StreamProNews/1.0)' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: 86_400, tags: ['football-news-og'] },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const m =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    const url = m ? decodeEntities(m[1]) : null;
    // Skip generic logo fallbacks.
    if (!url || !/^https:\/\//.test(url) || /espn_logos|\/logo/i.test(url)) return null;
    return url;
  } catch {
    return null;
  }
}

function parseFeed(xml: string, source: string) {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  return items.map((item) => {
    const title = cleanText(tag(item, 'title'));
    const link = decodeEntities(tag(item, 'link') || tag(item, 'guid'));
    const summary = cleanText(tag(item, 'description')).replace(/\s*Continue reading\.{3}$/, '');
    return {
      title,
      link,
      summary: summary.length > 220 ? `${summary.slice(0, 217).trimEnd()}…` : summary,
      image: pickImage(item),
      source,
      date: parseDate(tag(item, 'pubDate') || tag(item, 'dc:date')),
    };
  });
}

/* ------------------------------ Scoring ------------------------------ */

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchKeywords(text: string, keywords: string[]): string[] {
  return keywords.filter((k) => new RegExp(`\\b${escapeRe(k)}\\b`, 'i').test(text));
}

function hotScore(title: string, summary: string): number {
  // Headline terms count fully, summary terms at half weight.
  return HOT_TERMS.reduce((sum, { term, weight }) => {
    if (term.test(title)) return sum + weight;
    if (term.test(summary)) return sum + weight / 2;
    return sum;
  }, 0);
}

async function fetchFeed(source: string, url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StreamProNews/1.0)' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    next: { revalidate: NEWS_REVALIDATE, tags: ['football-news'] },
  });
  if (!res.ok) throw new Error(`${source} feed returned ${res.status}`);
  return parseFeed(await res.text(), source);
}

/**
 * Returns keyword-matched football stories, newest first, with hot stories
 * flagged. A failing feed is skipped rather than failing the whole list.
 */
export async function getFootballNews(limit = 24): Promise<NewsItem[]> {
  const keywords = getKeywords();
  const results = await Promise.allSettled(FEEDS.map((f) => fetchFeed(f.source, f.url)));

  const now = Date.now();
  const seen = new Set<string>();
  const items: NewsItem[] = [];

  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.warn(`[football-news] ${FEEDS[i].source} failed:`, r.reason);
      return;
    }
    for (const raw of r.value) {
      if (!raw.title || !raw.link || !raw.date) continue;
      // Sky's football feed occasionally includes other sports.
      if (/\b(darts|snooker|cricket|rugby|golf|tennis|f1|boxing|nfl)\b/i.test(raw.title)) continue;

      const dedupeKey = raw.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);

      const matched = matchKeywords(`${raw.title} ${raw.summary}`, keywords);
      const ageH = (now - raw.date.getTime()) / 36e5;
      const heat = hotScore(raw.title, raw.summary) + (matched.length ? 1 : 0);
      const live = /\blive\b/i.test(raw.title) && ageH < 6;

      items.push({
        id: dedupeKey,
        title: raw.title,
        summary: raw.summary,
        link: raw.link,
        image: raw.image,
        source: raw.source,
        publishedAt: raw.date.toISOString(),
        keywords: matched.slice(0, 3),
        live,
        hot: live || (heat >= HOT_THRESHOLD && ageH < HOT_MAX_AGE_H),
        score: heat,
      });
    }
  });

  items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  // Keyword matches first; top up with general football news if too few.
  const matched = items.filter((i) => i.keywords.length > 0);
  const rest = items.filter((i) => i.keywords.length === 0);
  const selected = [...matched, ...rest]
    .slice(0, limit)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  // Fill in missing images only for the stories we actually show.
  await Promise.all(
    selected.map(async (item) => {
      if (!item.image) item.image = await fetchOgImage(item.link);
    })
  );
  return selected;
}
