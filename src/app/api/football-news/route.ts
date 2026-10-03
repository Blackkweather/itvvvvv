import { success } from '@/lib/api-response';
import { getFootballNews } from '@/lib/football-news';

// Feeds are cached for 5 minutes inside getFootballNews; the route itself
// re-runs on every request so clients polling it always get the latest cache.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const items = await getFootballNews();
    return success({ items, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error('[Football News API Error]', error);
    return success({ items: [], updatedAt: new Date().toISOString() });
  }
}
