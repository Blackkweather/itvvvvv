import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

const COOKIE_NAME = process.env.COOKIE_NAME || 'streampro_session';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized', code: 'UNAUTHORIZED' } },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid token', code: 'UNAUTHORIZED' } },
        { status: 401 }
      );
    }

    const subscription = await db.subscription.findUnique({
      where: { userId: payload.userId },
    });

    if (!subscription || subscription.status !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, error: { message: 'No active subscription', code: 'FORBIDDEN' } },
        { status: 403 }
      );
    }

    const channels = await db.channel.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: [
        { category: { order: 'asc' } },
        { order: 'asc' },
        { name: 'asc' },
      ],
    });

    if (channels.length === 0) {
      return NextResponse.json(
        { success: false, error: { message: 'No channels available', code: 'NOT_FOUND' } },
        { status: 404 }
      );
    }

    const m3uContent = generateM3U(channels, subscription);

    return new NextResponse(m3uContent, {
      headers: {
        'Content-Type': 'audio/x-mpegurl',
        'Content-Disposition': `attachment; filename="streampro_playlist.m3u"`,
      },
    });
  } catch (error) {
    console.error('[M3U DOWNLOAD ERROR]', error);
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}

function generateM3U(channels: any[], subscription: any): string {
  const lines: string[] = ['#EXTM3U'];

  const categories = new Map<string, typeof channels>();
  
  for (const channel of channels) {
    const catName = channel.category.name;
    if (!categories.has(catName)) {
      categories.set(catName, []);
    }
    categories.get(catName)!.push(channel);
  }

  for (const [, catChannels] of categories) {
    for (const channel of catChannels) {
      const quality = channel.is4k ? '4K' : channel.isHd ? 'HD' : 'SD';
      const tvgId = channel.slug;
      const tvgName = channel.name;
      const tvgLogo = channel.logoUrl || '';
      
      lines.push(`#EXTINF:-1 tvg-id="${tvgId}" tvg-name="${tvgName}" tvg-logo="${tvgLogo}" group-title="${channel.category.name}",${channel.name}`);
      
      if (subscription.m3uUrl) {
        lines.push(`${subscription.m3uUrl}/${channel.slug}`);
      } else if (subscription.xtreamUsername && subscription.xtreamPassword) {
        const serverUrl = process.env.XTREAM_SERVER_URL || 'http://localhost:8000';
        lines.push(`${serverUrl}/${subscription.xtreamUsername}/${subscription.xtreamPassword}/${channel.slug}`);
      } else {
        lines.push('#EXTVLCOPT:network-caching=1000');
        lines.push(`${process.env.STREAM_BASE_URL || 'http://localhost:8080'}/live/${channel.slug}.m3u8`);
      }
    }
  }

  return lines.join('\n');
}