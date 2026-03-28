/**
 * Environment validation for production deployment
 * Run this at application startup to catch missing configuration
 */

export interface EnvConfig {
  DATABASE_URL: string;
  JWT_SECRET: string;
  NODE_ENV: string;
}

export interface EnvValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate required environment variables
 */
export function validateEnv(): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required in all environments
  if (!process.env.DATABASE_URL) {
    errors.push('DATABASE_URL is required');
  }

  // Required in production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET) {
      errors.push('JWT_SECRET is required in production');
    }
    
    if (process.env.JWT_SECRET === 'dev-only-secret-do-not-use-in-prod') {
      errors.push('JWT_SECRET must be changed from default development value');
    }

    // Warn about missing optional but recommended vars
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      warnings.push('NEXT_PUBLIC_APP_URL not set - using default');
    }
  }

  // Warn about SQLite in production (not recommended)
  if (process.env.DATABASE_URL?.includes('sqlite')) {
    warnings.push('SQLite database detected - not recommended for production. Consider PostgreSQL or MySQL.');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Call this at module initialization to validate env
 * Will throw in production if critical vars are missing
 */
export function initEnvValidation(): void {
  const result = validateEnv();
  
  // Log warnings
  for (const warning of result.warnings) {
    console.warn(`[Env Warning] ${warning}`);
  }

  // Throw on errors in production
  if (!result.valid && process.env.NODE_ENV === 'production') {
    console.error('[Env Error] Production environment validation failed:');
    for (const error of result.errors) {
      console.error(`  - ${error}`);
    }
    throw new Error(`Environment validation failed: ${result.errors.join(', ')}`);
  }
}
