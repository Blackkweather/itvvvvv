import { getFootballNews } from '@/lib/football-news';
import { FootballNewsFeed } from '@/components/home/FootballNewsFeed';

/**
 * Server wrapper: renders the first batch of stories into the HTML (good for
 * SEO and first paint), then the client feed keeps polling for fresh ones.
 */
export async function FootballNewsSection() {
  const items = await getFootballNews().catch(() => []);
  return <FootballNewsFeed initialItems={items} />;
}
