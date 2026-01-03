import { Router } from 'express';
import passport from 'passport';
import { z } from 'zod';
import { registerWithEmail, loginWithEmail } from '../controllers/email-auth.controller';
import { sendPhoneOTP, verifyPhoneOTP } from '../controllers/phone-auth.controller';
import { googleAuthCallback } from '../controllers/google-auth.controller';
import { refreshToken, logout, getCurrentUser } from '../controllers/common-auth.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Validation schemas
const emailRegisterSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    role: z.enum(['super_admin', 'client_admin', 'driver', 'passenger', 'tourist']).optional(),
  }),
});

const emailLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const phoneOTPSchema = z.object({
  body: z.object({
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  }),
});

const verifyOTPSchema = z.object({
  body: z.object({
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    otp: z.string().length(6),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    role: z.enum(['super_admin', 'client_admin', 'driver', 'passenger', 'tourist']).optional(),
  }),
});

const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});

// Email Authentication Routes
router.post('/register/email', validate(emailRegisterSchema), registerWithEmail);
router.post('/login/email', validate(emailLoginSchema), loginWithEmail);

// Phone Authentication Routes
router.post('/register/phone/send-otp', validate(phoneOTPSchema), sendPhoneOTP);
router.post('/register/phone/verify-otp', validate(verifyOTPSchema), verifyPhoneOTP);

// Google OAuth Routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/google/failure' }),
  googleAuthCallback
);

// Common Routes
router.post('/refresh', validate(refreshTokenSchema), refreshToken);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);

export default router;
