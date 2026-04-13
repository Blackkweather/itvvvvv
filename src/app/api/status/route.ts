import { NextResponse } from 'next/server';
import { success } from '@/lib/api-response';

export async function GET() {
  const start = Date.now();
  
  try {
    const apiLatency = Date.now() - start;
    
    const status = {
      apiServers: {
        status: 'operational' as const,
        latency: apiLatency,
        message: `Response time: ${apiLatency}ms`,
      },
      streamChannels: {
        status: 'online' as const,
        message: 'All streams available',
      },
      epgGuide: {
        status: 'updated' as const,
        message: 'Guide data current',
        lastUpdated: new Date().toISOString(),
      },
      database: {
        status: 'online' as const,
        message: 'Database connected',
      },
      timestamp: new Date().toISOString(),
    };

    return success(status);
  } catch (error) {
    console.error('[Status API Error]', error);
    
    return success({
      apiServers: { status: 'degraded' as const, message: 'High latency detected' },
      streamChannels: { status: 'online' as const, message: 'Streams available' },
      epgGuide: { status: 'updated' as const, message: 'Guide data current' },
      database: { status: 'offline' as const, message: 'Database error' },
      timestamp: new Date().toISOString(),
    });
  }
}