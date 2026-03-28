import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { db } from './db';
import { Prisma } from '@prisma/client';

// ==================== TYPES ====================

export interface JWTPayload {
  userId: string;
  email: string;
  role: string; // USER, ADMIN, RESELLER, AFFILIATE
  iat?: number;
  exp?: number;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  phone: string | null;
  whatsapp: string | null;
  telegram: string | null;
}

// ==================== CONFIG ====================

const JWT_SECRET = process.env.JWT_SECRET as string | undefined;

// Throw error if JWT_SECRET is not set in production
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}

// Use a temporary secret only in development - should never happen in production
// WARNING: This fallback is ONLY for development. In production, JWT_SECRET MUST be set.
const effectiveSecret: string = JWT_SECRET || 'dev-only-secret-do-not-use-in-prod';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const COOKIE_NAME = process.env.COOKIE_NAME || 'streampro_session';

// Log warning if using dev secret in non-production environment
if (!JWT_SECRET && process.env.NODE_ENV !== 'production') {
  console.warn('[Auth Warning] Using development JWT secret. Set JWT_SECRET environment variable for production.');
}

// ==================== PASSWORD HASHING ====================

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// ==================== TOKEN GENERATION ====================

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, effectiveSecret, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, effectiveSecret) as JWTPayload;
  } catch {
    return null;
  }
}

// ==================== COOKIE MANAGEMENT ====================

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function getSessionCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value || null;
}

export async function removeSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ==================== SESSION MANAGEMENT ====================

export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  const user = await db.user.findUnique({ where: { id: userId } });
  
  if (!user) {
    throw new Error('User not found');
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // Store session in database
  await db.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      ipAddress,
      userAgent,
    },
  });

  // Set cookie
  await setSessionCookie(token);

  return token;
}

export async function getSession(): Promise<SessionUser | null> {
  const token = await getSessionCookie();
  
  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  
  if (!payload) {
    await removeSessionCookie();
    return null;
  }

  // Verify session exists in database
  const session = await db.session.findUnique({
    where: { token },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await db.session.delete({ where: { token } });
    }
    await removeSessionCookie();
    return null;
  }

  // Update last used (optional - skip if field doesn't exist)
  // await db.session.update({
  //   where: { token },
  //   data: { lastUsed: new Date() },
  // });

  const user = await db.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      whatsapp: true,
      telegram: true,
      isActive: true,
    },
  });

  if (!user || !user.isActive) {
    await removeSessionCookie();
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
    whatsapp: user.whatsapp,
    telegram: user.telegram,
  };
}

export async function destroySession(): Promise<void> {
  const token = await getSessionCookie();
  
  if (token) {
    await db.session.deleteMany({ where: { token } });
  }
  
  await removeSessionCookie();
}

// ==================== AUTH MIDDLEWARE ====================

export async function requireAuth(): Promise<SessionUser> {
  const user = await getSession();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}

export async function requireRole(...roles: string[]): Promise<SessionUser> {
  const user = await requireAuth();
  
  if (!roles.includes(user.role)) {
    throw new Error('Forbidden');
  }
  
  return user;
}

// ==================== USER HELPERS ====================

export async function findUserByEmail(email: string): Promise<Prisma.UserGetPayload<{ select: { id: true; email: true; name: true; phone: true; password: true; role: true; isActive: true; createdAt: true; updatedAt: true; } }> | null> {
  return db.user.findUnique({ where: { email } });
}

export async function findUserById(id: string): Promise<Prisma.UserGetPayload<{ select: { id: true; email: true; name: true; phone: true; password: true; role: true; isActive: true; createdAt: true; updatedAt: true; } }> | null> {
  return db.user.findUnique({ where: { id } });
}

export async function createUser(data: {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}): Promise<Prisma.UserGetPayload<{ select: { id: true; email: true; name: true; phone: true; password: true; role: true; isActive: true; createdAt: true; updatedAt: true; } }>> {
  const hashedPassword = await hashPassword(data.password);
  
  return db.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      phone: data.phone,
    },
  });
}
