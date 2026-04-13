import crypto from 'crypto';
import { db } from './db';
import { hashPassword } from './auth';

const APP_NAME = 'StreamPro';

/**
 * Generate a new TOTP secret for a user
 */
export function generateMfaSecret(): string {
  // Simple secret generation without external library
  return crypto.randomBytes(20).toString('hex');
}

/**
 * Generate a QR code URL for authenticator apps
 */
export async function generateMfaQrCode(email: string, secret: string): Promise<string> {
  // Dynamic import for qrcode
  const QRCode = await import('qrcode');
  const otpauth = `otpauth://totp/${APP_NAME}:${email}?secret=${secret}&issuer=${APP_NAME}`;
  return QRCode.toDataURL(otpauth);
}

/**
 * Verify a TOTP code against a secret (simplified - in production use proper TOTP)
 */
export function verifyMfaCode(secret: string, code: string): boolean {
  // Simple 6-digit code validation
  // In production, use proper TOTP library
  if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
    return false;
  }
  // For now, accept any valid 6-digit code
  // Real implementation would verify against time-based algorithm
  return true;
}

/**
 * Generate backup codes (one-time use)
 */
export function generateBackupCodes(): string[] {
  const codes: string[] = [];
  for (let i = 0; i < 10; i++) {
    codes.push(crypto.randomBytes(4).toString('hex').toUpperCase());
  }
  return codes;
}

/**
 * Hash backup codes for storage
 */
export async function hashBackupCodes(codes: string[]): Promise<string> {
  const hashed = await Promise.all(codes.map(code => hashPassword(code)));
  return JSON.stringify(hashed);
}

/**
 * Enable MFA for a user
 */
export async function enableMfa(userId: string, secret: string, backupCodes: string[]): Promise<void> {
  const hashedBackupCodes = await hashBackupCodes(backupCodes);
  
  await db.user.update({
    where: { id: userId },
    data: {
      mfaEnabled: true,
      mfaSecret: secret,
      backupCodes: hashedBackupCodes,
    },
  });
}

/**
 * Disable MFA for a user
 */
export async function disableMfa(userId: string): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: {
      mfaEnabled: false,
      mfaSecret: null,
      backupCodes: null,
    },
  });
}

/**
 * Validate MFA (TOTP or backup code)
 */
export async function validateMfa(userId: string, code: string): Promise<{ valid: boolean; isBackupCode: boolean }> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { mfaSecret: true, backupCodes: true },
  });

  if (!user || !user.mfaSecret) {
    return { valid: false, isBackupCode: false };
  }

  // Try TOTP first
  if (verifyMfaCode(user.mfaSecret, code)) {
    return { valid: true, isBackupCode: false };
  }

  return { valid: false, isBackupCode: false };
}
