import { z } from 'zod';

// ==================== AUTH VALIDATION ====================

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// ==================== PROFILE VALIDATION ====================

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  telegram: z.string().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// ==================== SUBSCRIPTION VALIDATION ====================

// Valid plans - should match database enum
const VALID_PLANS = ['STARTER', 'STANDARD', 'PREMIUM', 'ELITE'] as const;

// Valid payment methods
const VALID_PAYMENT_METHODS = ['STRIPE', 'PAYPAL', 'CRYPTO', 'BANK_TRANSFER', 'WHATSAPP', 'TELEGRAM'] as const;

export const createSubscriptionSchema = z.object({
  plan: z.enum(VALID_PLANS, {
    message: `Invalid plan. Must be one of: ${VALID_PLANS.join(', ')}`
  }),
  paymentMethod: z.enum(VALID_PAYMENT_METHODS, {
    message: `Invalid payment method. Must be one of: ${VALID_PAYMENT_METHODS.join(', ')}`
  }),
  deviceLimit: z.number().min(1).max(10).optional(),
});

export const updateSubscriptionSchema = z.object({
  plan: z.enum(VALID_PLANS).optional(),
  autoRenew: z.boolean().optional(),
  deviceLimit: z.number().min(1).max(10).optional(),
});

// ==================== PAYMENT VALIDATION ====================

export const createPaymentSchema = z.object({
  subscriptionId: z.string().optional(),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3, 'Currency must be 3 characters').default('USD'),
  method: z.enum(VALID_PAYMENT_METHODS),
  description: z.string().optional(),
});

// ==================== API KEY VALIDATION ====================

export const createApiKeySchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  expiresAt: z.string().datetime().optional(),
});

// ==================== CONTACT VALIDATION ====================

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// ==================== TYPE EXPORTS ====================

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
