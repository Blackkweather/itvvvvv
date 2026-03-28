import { PrismaClient } from '@prisma/client';
import { initEnvValidation } from './env-validation';

// Initialize environment validation
initEnvValidation();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

export default db;
