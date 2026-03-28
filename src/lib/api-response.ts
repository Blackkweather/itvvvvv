import { NextResponse } from 'next/server';
import { ZodError, ZodIssue } from 'zod';

// ==================== RESPONSE TYPES ====================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// ==================== SUCCESS RESPONSES ====================

export function success<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function created<T>(data: T): NextResponse<ApiResponse<T>> {
  return success(data, 201);
}

export function deleted(): NextResponse<ApiResponse> {
  return NextResponse.json({ success: true }, { status: 204 });
}

// ==================== ERROR RESPONSES ====================

export function error(
  message: string,
  status = 400,
  code?: string,
  details?: unknown
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        details,
      },
    },
    { status }
  );
}

export function badRequest(message: string = 'Bad Request', details?: unknown): NextResponse<ApiResponse> {
  return error(message, 400, 'BAD_REQUEST', details);
}

export function unauthorized(message: string = 'Unauthorized'): NextResponse<ApiResponse> {
  return error(message, 401, 'UNAUTHORIZED');
}

export function forbidden(message: string = 'Forbidden'): NextResponse<ApiResponse> {
  return error(message, 403, 'FORBIDDEN');
}

export function notFound(message: string = 'Not Found'): NextResponse<ApiResponse> {
  return error(message, 404, 'NOT_FOUND');
}

export function conflict(message: string = 'Conflict'): NextResponse<ApiResponse> {
  return error(message, 409, 'CONFLICT');
}

export function validationError(details: unknown): NextResponse<ApiResponse> {
  return error('Validation failed', 422, 'VALIDATION_ERROR', details);
}

export function tooManyRequests(message: string = 'Too Many Requests'): NextResponse<ApiResponse> {
  return error(message, 429, 'RATE_LIMITED');
}

export function serverError(message: string = 'Internal Server Error'): NextResponse<ApiResponse> {
  return error(message, 500, 'INTERNAL_ERROR');
}

// ==================== PAGINATED RESPONSE ====================

export function paginated<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): NextResponse<ApiResponse<T[]>> {
  return NextResponse.json({
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// ==================== VALIDATION ERROR HANDLER ====================

export function handleZodError(error: ZodError): NextResponse<ApiResponse> {
  const details = error.issues.map((err: ZodIssue) => ({
    path: err.path.join('.'),
    message: err.message,
  }));
  
  return validationError(details);
}

// ==================== TRY-CATCH WRAPPER ====================

export async function withErrorHandler(
  handler: () => Promise<NextResponse>,
  onError?: (error: Error) => NextResponse<ApiResponse>
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof Error) {
      // Handle known error types
      if (error.message === 'Unauthorized') {
        return unauthorized();
      }
      if (error.message === 'Forbidden') {
        return forbidden();
      }
      if (error.message === 'Not Found') {
        return notFound();
      }
      
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        return handleZodError(error);
      }
      
      if (onError) {
        return onError(error);
      }
      
      return serverError(error.message);
    }
    
    return serverError();
  }
}

// ==================== REQUEST PARSING ====================

export async function getJsonBody<T>(request: Request): Promise<T> {
  try {
    const body = await request.json();
    return body as T;
  } catch {
    throw badRequest('Invalid JSON body');
  }
}

export function getIpAddress(request: Request): string | undefined {
  return request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    undefined;
}

export function getUserAgent(request: Request): string | undefined {
  return request.headers.get('user-agent') || undefined;
}
