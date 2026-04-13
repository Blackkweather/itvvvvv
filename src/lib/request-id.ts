import { randomBytes } from 'crypto';

let requestIdCounter = 0;

/**
 * Generate a unique request ID for tracing
 * Format: [timestamp]-[random]-[counter]
 */
export function generateRequestId(): string {
  const timestamp = Date.now().toString(36);
  const random = randomBytes(4).toString('hex');
  requestIdCounter = (requestIdCounter + 1) % 10000;
  return `req_${timestamp}_${random}_${requestIdCounter}`;
}

/**
 * Get request ID from headers or generate new one
 */
export function getRequestId(headers: Headers): string {
  const existing = headers.get('x-request-id');
  if (existing) return existing;
  return generateRequestId();
}

/**
 * Create a log context with request ID
 */
export function createLogContext(requestId: string, extra?: Record<string, unknown>) {
  return {
    requestId,
    timestamp: new Date().toISOString(),
    ...extra,
  };
}

/**
 * Format log message with context
 */
export function formatLog(
  level: 'debug' | 'info' | 'warn' | 'error',
  message: string,
  context?: Record<string, unknown>
): string {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp.toUpperCase()}] ${level.toUpperCase()}: ${message}${contextStr}`;
}

// Simple logging wrapper with request ID support
export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    console.debug(formatLog('debug', message, context));
  },
  info: (message: string, context?: Record<string, unknown>) => {
    console.info(formatLog('info', message, context));
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    console.warn(formatLog('warn', message, context));
  },
  error: (message: string, context?: Record<string, unknown>) => {
    console.error(formatLog('error', message, context));
  },
};