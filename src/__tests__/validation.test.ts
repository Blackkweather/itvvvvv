import { describe, it, expect } from 'vitest';
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  createSubscriptionSchema,
  updateSubscriptionSchema,
  contactSchema,
} from '@/lib/validation';

describe('Validation Schemas', () => {
  describe('registerSchema', () => {
    it('should validate a correct registration input', () => {
      const validInput = {
        email: 'test@example.com',
        password: 'Password123',
        name: 'Test User',
      };
      expect(() => registerSchema.parse(validInput)).not.toThrow();
    });

    it('should reject invalid email', () => {
      const invalidInput = {
        email: 'not-an-email',
        password: 'Password123',
      };
      expect(() => registerSchema.parse(invalidInput)).toThrow();
    });

    it('should reject weak password (too short)', () => {
      const invalidInput = {
        email: 'test@example.com',
        password: 'Pass1',
      };
      expect(() => registerSchema.parse(invalidInput)).toThrow();
    });

    it('should reject password without uppercase', () => {
      const invalidInput = {
        email: 'test@example.com',
        password: 'password123',
      };
      expect(() => registerSchema.parse(invalidInput)).toThrow();
    });

    it('should reject password without lowercase', () => {
      const invalidInput = {
        email: 'test@example.com',
        password: 'PASSWORD123',
      };
      expect(() => registerSchema.parse(invalidInput)).toThrow();
    });

    it('should reject password without number', () => {
      const invalidInput = {
        email: 'test@example.com',
        password: 'PasswordABC',
      };
      expect(() => registerSchema.parse(invalidInput)).toThrow();
    });

    it('should accept optional fields', () => {
      const validInput = {
        email: 'test@example.com',
        password: 'Password123',
        name: 'Test User',
        phone: '+1234567890',
      };
      expect(() => registerSchema.parse(validInput)).not.toThrow();
    });
  });

  describe('loginSchema', () => {
    it('should validate correct login input', () => {
      const validInput = {
        email: 'test@example.com',
        password: 'password123',
      };
      expect(() => loginSchema.parse(validInput)).not.toThrow();
    });

    it('should reject invalid email', () => {
      const invalidInput = {
        email: 'not-email',
        password: 'password',
      };
      expect(() => loginSchema.parse(invalidInput)).toThrow();
    });

    it('should reject empty password', () => {
      const invalidInput = {
        email: 'test@example.com',
        password: '',
      };
      expect(() => loginSchema.parse(invalidInput)).toThrow();
    });
  });

  describe('updateProfileSchema', () => {
    it('should validate correct profile update', () => {
      const validInput = {
        name: 'Updated Name',
        phone: '+1234567890',
        whatsapp: '+0987654321',
        telegram: '@username',
      };
      expect(() => updateProfileSchema.parse(validInput)).not.toThrow();
    });

    it('should accept partial updates', () => {
      const validInput = {
        name: 'Updated Name',
      };
      expect(() => updateProfileSchema.parse(validInput)).not.toThrow();
    });

    it('should reject name shorter than 2 characters', () => {
      const invalidInput = {
        name: 'A',
      };
      expect(() => updateProfileSchema.parse(invalidInput)).toThrow();
    });
  });

  describe('changePasswordSchema', () => {
    it('should validate correct password change', () => {
      const validInput = {
        currentPassword: 'OldPassword123',
        newPassword: 'NewPassword456',
        confirmPassword: 'NewPassword456',
      };
      expect(() => changePasswordSchema.parse(validInput)).not.toThrow();
    });

    it('should reject mismatched passwords', () => {
      const invalidInput = {
        currentPassword: 'OldPassword123',
        newPassword: 'NewPassword456',
        confirmPassword: 'DifferentPassword',
      };
      expect(() => changePasswordSchema.parse(invalidInput)).toThrow();
    });

    it('should reject weak new password', () => {
      const invalidInput = {
        currentPassword: 'OldPassword123',
        newPassword: 'weak',
        confirmPassword: 'weak',
      };
      expect(() => changePasswordSchema.parse(invalidInput)).toThrow();
    });
  });

  describe('createSubscriptionSchema', () => {
    it('should validate correct subscription creation', () => {
      const validInput = {
        plan: 'STARTER',
        paymentMethod: 'STRIPE',
        deviceLimit: 4,
      };
      expect(() => createSubscriptionSchema.parse(validInput)).not.toThrow();
    });

    it('should reject invalid plan', () => {
      const invalidInput = {
        plan: 'INVALID_PLAN',
        paymentMethod: 'STRIPE',
      };
      expect(() => createSubscriptionSchema.parse(invalidInput)).toThrow();
    });

    it('should reject invalid payment method', () => {
      const invalidInput = {
        plan: 'STARTER',
        paymentMethod: 'INVALID_METHOD',
      };
      expect(() => createSubscriptionSchema.parse(invalidInput)).toThrow();
    });

    it('should reject device limit below minimum', () => {
      const invalidInput = {
        plan: 'STARTER',
        paymentMethod: 'STRIPE',
        deviceLimit: 0,
      };
      expect(() => createSubscriptionSchema.parse(invalidInput)).toThrow();
    });

    it('should reject device limit above maximum', () => {
      const invalidInput = {
        plan: 'STARTER',
        paymentMethod: 'STRIPE',
        deviceLimit: 11,
      };
      expect(() => createSubscriptionSchema.parse(invalidInput)).toThrow();
    });
  });

  describe('updateSubscriptionSchema', () => {
    it('should validate correct subscription update', () => {
      const validInput = {
        plan: 'PREMIUM',
        autoRenew: true,
        deviceLimit: 6,
      };
      expect(() => updateSubscriptionSchema.parse(validInput)).not.toThrow();
    });

    it('should accept partial updates', () => {
      const validInput = {
        autoRenew: false,
      };
      expect(() => updateSubscriptionSchema.parse(validInput)).not.toThrow();
    });
  });

  describe('contactSchema', () => {
    it('should validate correct contact form', () => {
      const validInput = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      };
      expect(() => contactSchema.parse(validInput)).not.toThrow();
    });

    it('should reject short name', () => {
      const invalidInput = {
        name: 'A',
        email: 'john@example.com',
        subject: 'Test',
        message: 'Test message content here',
      };
      expect(() => contactSchema.parse(invalidInput)).toThrow();
    });

    it('should reject short subject', () => {
      const invalidInput = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Hi',
        message: 'Test message content here',
      };
      expect(() => contactSchema.parse(invalidInput)).toThrow();
    });

    it('should reject short message', () => {
      const invalidInput = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Short',
      };
      expect(() => contactSchema.parse(invalidInput)).toThrow();
    });
  });
});