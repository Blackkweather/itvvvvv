import jwt, { SignOptions } from 'jsonwebtoken';
import argon2 from 'argon2';
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

// Fail fast if JWT_SECRET is not set - no silent fallbacks
if (!JWT_SECRET) {
  const errorMsg = 'JWT_SECRET environment variable is required. Set it in your .env.local or .env file.';
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`[FATAL] ${errorMsg}`);
  }
  // In development, fail immediately rather than using insecure fallback
  console.error(`[FATAL] ${errorMsg}`);
  throw new Error(`[FATAL] ${errorMsg}`);
}

const effectiveSecret: string = JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const COOKIE_NAME = process.env.COOKIE_NAME || 'streampro_session';

// ==================== PASSWORD HASHING (Argon2id) ====================

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536, // 64 MB
    timeCost: 3,
    parallelism: 4,
    hashLength: 32,
  });
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch {
    return false;
  }
}

// ==================== BRUTE FORCE PROTECTION ====================

export async function checkAccountLockout(userId: string): Promise<{ locked: boolean; reason?: string }> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { lockedUntil: true, failedAttempts: true },
  });

  if (!user) return { locked: false };

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return { locked: true, reason: 'Account temporarily locked due to too many failed attempts' };
  }

  if (user.failedAttempts >= 10) {
    // Lock for 30 minutes
    await db.user.update({
      where: { id: userId },
      data: { 
        lockedUntil: new Date(Date.now() + 30 * 60 * 1000),
        failedAttempts: { increment: 1 },
      },
    });
    return { locked: true, reason: 'Account locked due to repeated failed login attempts' };
  }

  return { locked: false };
}

export async function recordFailedAttempt(userId: string): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: { failedAttempts: { increment: 1 } },
  });
}

export async function clearFailedAttempts(userId: string): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: { 
      failedAttempts: 0,
      lockedUntil: null,
    },
  });
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
